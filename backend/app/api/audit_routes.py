from datetime import date, datetime, timezone
from typing import Dict, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.repos.units_repo import UnitsRepository
from app.services.ical_fetcher import ICSFetcher
from app.services.ical_parser import ICSParser


router = APIRouter()

# Initialize dependencies
units_repo = UnitsRepository()
ics_fetcher = ICSFetcher(timeout=10.0)
ics_parser = ICSParser()


class SourceData(BaseModel):
    """Raw and parsed data from a calendar source"""
    source_name: str
    url: Optional[str]
    raw_ics: Optional[str] = None
    error: Optional[str] = None
    fetched_at: Optional[datetime] = None
    events_count: Optional[int] = None
    parsed_events: Optional[list] = None


class AuditResponse(BaseModel):
    """Response for audit endpoint"""
    unit_id: str
    unit_name: str
    sources: Dict[str, SourceData]
    fetched_at: datetime


@router.get("/units/{unit_id}/audit", response_model=AuditResponse)
async def get_calendar_audit(unit_id: str):
    """
    Get audit information for a unit's calendar sources
    
    This endpoint fetches raw ICS data from all sources and provides
    both raw and parsed data for auditing purposes.
    """
    # Get unit
    unit = units_repo.get_unit(unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail=f"Unit not found: {unit_id}")
    
    # Prepare sources to fetch
    sources_to_fetch = {}
    source_urls = {}
    
    if unit.airbnb_ics_url:
        sources_to_fetch["airbnb"] = unit.airbnb_ics_url
        source_urls["airbnb"] = unit.airbnb_ics_url
    
    if unit.booking_ics_url:
        sources_to_fetch["booking"] = unit.booking_ics_url
        source_urls["booking"] = unit.booking_ics_url
    
    # Fetch ICS files
    fetch_results = await ics_fetcher.fetch_multiple(sources_to_fetch)
    
    # Process results
    sources_data = {}
    
    for source_name, (ics_content, error, fetched_at) in fetch_results.items():
        source_data = SourceData(
            source_name=source_name,
            url=source_urls.get(source_name),
            fetched_at=fetched_at
        )
        
        if error:
            source_data.error = error
        else:
            source_data.raw_ics = ics_content
            
            # Parse the ICS content
            try:
                blocked_ranges = ics_parser.parse_ics(ics_content, source_name)
                source_data.events_count = len(blocked_ranges)
                
                # Convert blocked ranges to a serializable format
                parsed_events = []
                for br in blocked_ranges:
                    parsed_events.append({
                        "start": br.start.isoformat(),
                        "end": br.end.isoformat(),
                        "source": br.source
                    })
                source_data.parsed_events = parsed_events
            except Exception as e:
                source_data.error = f"Parse error: {str(e)}"
        
        sources_data[source_name] = source_data
    
    return AuditResponse(
        unit_id=unit.id,
        unit_name=unit.name,
        sources=sources_data,
        fetched_at=datetime.now(timezone.utc)
    )
