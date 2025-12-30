from datetime import datetime
from fastapi import APIRouter, HTTPException, Header, Depends
from typing import Optional
from app.models.schemas import ManualBlock, CreateManualBlock, SyncResponse, SourceStatus
from app.repos.units_repo import UnitsRepository
from app.repos.blocks_repo import BlocksRepository
from app.repos.cache_repo import CacheRepository
from app.services.ical_fetcher import ICSFetcher
import os


router = APIRouter()

# Initialize dependencies
units_repo = UnitsRepository()
blocks_repo = BlocksRepository()
cache_repo = CacheRepository()
ics_fetcher = ICSFetcher(timeout=5.0)

# Admin token (in production, use environment variable)
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "dev-admin-token-123")


def verify_admin_token(x_admin_token: Optional[str] = Header(None)):
    """Verify admin token from header"""
    if not x_admin_token or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Invalid or missing admin token")


@router.post("/units/{unit_id}/blocks")
async def create_manual_block(
    unit_id: str,
    block_data: CreateManualBlock
):
    """
    Create a manual block for a unit
    
    This allows manual control of availability, useful for maintenance,
    personal use, or other reasons to block dates.
    """
    # Verify unit exists
    unit = units_repo.get_unit(unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail=f"Unit not found: {unit_id}")
    
    # Validate dates
    if block_data.end < block_data.start:
        raise HTTPException(status_code=400, detail="End date must be after start date")
    
    # Create manual block
    manual_block = ManualBlock(
        unit_id=unit_id,
        start=block_data.start,
        end=block_data.end,
        reason=block_data.reason
    )
    
    # Save to repository
    blocks_repo.add_block(manual_block)
    
    # Invalidate cache for this unit
    cache_key = f"calendar:{unit_id}"
    cache_repo.delete(cache_key)
    
    return manual_block


@router.post("/units/{unit_id}/sync", response_model=SyncResponse, dependencies=[Depends(verify_admin_token)])
async def sync_unit_calendar(unit_id: str):
    """
    Force sync calendar for a unit (admin only)
    
    This endpoint clears the cache and forces a fresh fetch from all sources.
    Useful for testing or when you need immediate updates.
    
    Requires X-ADMIN-TOKEN header.
    """
    # Verify unit exists
    unit = units_repo.get_unit(unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail=f"Unit not found: {unit_id}")
    
    # Clear cache for this unit
    cache_key = f"calendar:{unit_id}"
    cache_repo.delete(cache_key)
    
    # Fetch fresh data from sources
    sources_to_fetch = {
        "airbnb": unit.airbnb_ics_url,
        "booking": unit.booking_ics_url
    }
    
    fetch_results = await ics_fetcher.fetch_multiple(sources_to_fetch)
    
    # Build sources status
    sources_status = {}
    for source_name, (ics_content, error, fetched_at) in fetch_results.items():
        if error:
            sources_status[source_name] = SourceStatus(
                ok=False,
                fetched_at=fetched_at,
                error=error
            )
        else:
            sources_status[source_name] = SourceStatus(
                ok=True,
                fetched_at=fetched_at
            )
    
    synced_at = datetime.utcnow()
    
    return SyncResponse(
        unit_id=unit_id,
        success=all(status.ok for status in sources_status.values()),
        synced_at=synced_at,
        sources=sources_status
    )
