from datetime import date, timedelta
from typing import List, Dict, Set
from app.services.ical_parser import BlockedRange


class CalendarMerge:
    """Service for merging blocked ranges from multiple sources"""
    
    @staticmethod
    def merge_blocked_ranges(blocked_ranges: List[BlockedRange]) -> Dict[date, Set[str]]:
        """
        Merge blocked ranges from multiple sources into a day-by-day map
        
        Args:
            blocked_ranges: List of BlockedRange objects from various sources
        
        Returns:
            Dictionary mapping each blocked date to set of source names
        """
        blocked_by_day: Dict[date, Set[str]] = {}
        
        for blocked_range in blocked_ranges:
            # Iterate through all dates in the range (start inclusive, end exclusive)
            current_date = blocked_range.start
            while current_date < blocked_range.end:
                if current_date not in blocked_by_day:
                    blocked_by_day[current_date] = set()
                blocked_by_day[current_date].add(blocked_range.source)
                current_date += timedelta(days=1)
        
        return blocked_by_day
    
    @staticmethod
    def generate_date_range(start: date, end: date) -> List[date]:
        """
        Generate a list of dates between start and end (inclusive)
        
        Args:
            start: Start date (inclusive)
            end: End date (inclusive)
        
        Returns:
            List of dates
        """
        dates = []
        current = start
        while current <= end:
            dates.append(current)
            current += timedelta(days=1)
        return dates
