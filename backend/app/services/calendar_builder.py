from datetime import date, datetime
from typing import List, Dict, Set
from app.models.schemas import DayStatus, CalendarResponse, DateRange, SourceStatus
from app.services.calendar_merge import CalendarMerge
from app.services.pricing.base import PricingProvider


class CalendarBuilder:
    """Service for building calendar responses"""
    
    def __init__(self, pricing_provider: PricingProvider):
        self.pricing_provider = pricing_provider
    
    def build_calendar_response(
        self,
        unit_id: str,
        timezone: str,
        start_date: date,
        end_date: date,
        blocked_by_day: Dict[date, Set[str]],
        sources_status: Dict[str, SourceStatus],
        last_sync: datetime
    ) -> CalendarResponse:
        """
        Build a complete calendar response
        
        Args:
            unit_id: Unit identifier
            timezone: Timezone string
            start_date: Start date for the calendar
            end_date: End date for the calendar
            blocked_by_day: Map of date -> set of blocking sources
            sources_status: Status of each calendar source
            last_sync: When the data was last synced
        
        Returns:
            CalendarResponse object
        """
        # Generate all dates in range
        all_dates = CalendarMerge.generate_date_range(start_date, end_date)
        
        # Build day status for each date
        days: List[DayStatus] = []
        for current_date in all_dates:
            blocked_sources = blocked_by_day.get(current_date, set())
            
            # Get pricing info
            pricing_info = self.pricing_provider.get_day_pricing(unit_id, current_date)
            
            day_status = DayStatus(
                date=current_date,
                status="blocked" if blocked_sources else "available",
                blocked_by=sorted(list(blocked_sources)),  # Sort for consistent output
                price=pricing_info.get("price"),
                currency=pricing_info.get("currency", "BRL"),
                min_nights=pricing_info.get("min_nights")
            )
            days.append(day_status)
        
        return CalendarResponse(
            unit_id=unit_id,
            timezone=timezone,
            range=DateRange(start=start_date, end=end_date),
            last_sync=last_sync,
            sources=sources_status,
            days=days
        )
