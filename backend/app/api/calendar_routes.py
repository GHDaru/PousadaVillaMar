from datetime import date, datetime, timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Depends
from app.models.schemas import CalendarResponse, SourceStatus
from app.repos.units_repo import UnitsRepository
from app.repos.blocks_repo import BlocksRepository
from app.repos.cache_repo import CacheRepository
from app.services.ical_fetcher import ICSFetcher
from app.services.ical_parser import ICSParser, BlockedRange
from app.services.calendar_merge import CalendarMerge
from app.services.calendar_builder import CalendarBuilder
from app.services.pricing.rules_v1 import RulesV1PricingProvider


router = APIRouter()

# Initialize dependencies
units_repo = UnitsRepository()
blocks_repo = BlocksRepository()
cache_repo = CacheRepository()
ics_fetcher = ICSFetcher(timeout=5.0)
ics_parser = ICSParser()
pricing_provider = RulesV1PricingProvider()
calendar_builder = CalendarBuilder(pricing_provider)


def parse_date(date_str: str) -> date:
    """Parse date string in YYYY-MM-DD format"""
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Invalid date format: {date_str}. Use YYYY-MM-DD")


@router.get("/units/{unit_id}/calendar", response_model=CalendarResponse)
async def get_calendar(
    unit_id: str,
    start: str = Query(..., description="Start date in YYYY-MM-DD format"),
    end: str = Query(..., description="End date in YYYY-MM-DD format")
):
    """
    Get calendar availability for a unit
    
    This endpoint fetches ICS calendars from Airbnb and Booking.com,
    merges them with manual blocks, and returns availability by day.
    
    Results are cached for 10 minutes to reduce external API calls.
    """
    # Parse dates
    start_date = parse_date(start)
    end_date = parse_date(end)
    
    if end_date < start_date:
        raise HTTPException(status_code=400, detail="End date must be after start date")
    
    # Get unit
    unit = units_repo.get_unit(unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail=f"Unit not found: {unit_id}")
    
    # Try to get from cache
    cache_key = f"calendar:{unit_id}"
    cached_data = cache_repo.get(cache_key)
    
    if cached_data:
        # Return cached data, but filter to requested range
        return _filter_calendar_to_range(cached_data, start_date, end_date)
    
    # Fetch and parse calendars
    calendar_data = await _fetch_and_build_calendar(unit, start_date, end_date)
    
    # Cache for 10 minutes
    cache_repo.set(cache_key, calendar_data, ttl_seconds=600)
    
    return calendar_data


async def _fetch_and_build_calendar(unit, start_date: date, end_date: date) -> CalendarResponse:
    """Fetch ICS calendars, parse, merge and build response"""
    
    # Fetch ICS files in parallel
    sources_to_fetch = {
        "airbnb": unit.airbnb_ics_url,
        "booking": unit.booking_ics_url
    }
    
    fetch_results = await ics_fetcher.fetch_multiple(sources_to_fetch)
    
    # Parse ICS content
    all_blocked_ranges: list[BlockedRange] = []
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
            # Parse the ICS content
            blocked_ranges = ics_parser.parse_ics(ics_content, source_name)
            all_blocked_ranges.extend(blocked_ranges)
    
    # Get manual blocks for this unit
    manual_blocks = blocks_repo.get_blocks_for_unit(unit.id, start_date, end_date)
    
    # Convert manual blocks to BlockedRange objects
    for manual_block in manual_blocks:
        all_blocked_ranges.append(
            BlockedRange(manual_block.start, manual_block.end, "manual")
        )
    
    # Merge all blocked ranges
    blocked_by_day = CalendarMerge.merge_blocked_ranges(all_blocked_ranges)
    
    # Build calendar response
    last_sync = datetime.utcnow()
    calendar_response = calendar_builder.build_calendar_response(
        unit_id=unit.id,
        timezone=unit.timezone,
        start_date=start_date,
        end_date=end_date,
        blocked_by_day=blocked_by_day,
        sources_status=sources_status,
        last_sync=last_sync
    )
    
    return calendar_response


def _filter_calendar_to_range(calendar_data: CalendarResponse, start_date: date, end_date: date) -> CalendarResponse:
    """Filter cached calendar data to requested date range"""
    filtered_days = [
        day for day in calendar_data.days
        if start_date <= day.date <= end_date
    ]
    
    # Update the range in the response
    calendar_data.range.start = start_date
    calendar_data.range.end = end_date
    calendar_data.days = filtered_days
    
    return calendar_data
