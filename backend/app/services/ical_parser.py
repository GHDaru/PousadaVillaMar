from datetime import date, datetime
from typing import List, Optional, Tuple
from icalendar import Calendar
from dateutil import parser as date_parser


class BlockedRange:
    """Represents a blocked date range from a calendar source"""
    def __init__(self, start: date, end: date, source: str):
        self.start = start
        self.end = end
        self.source = source
    
    def __repr__(self):
        return f"BlockedRange({self.start} to {self.end}, source={self.source})"


class ICSParser:
    """Parser for iCalendar (ICS) files"""
    
    @staticmethod
    def _parse_date(dt_value) -> Optional[date]:
        """Parse a datetime/date value to date"""
        if dt_value is None:
            return None
        
        # Handle icalendar date/datetime objects
        if isinstance(dt_value, datetime):
            return dt_value.date()
        elif isinstance(dt_value, date):
            return dt_value
        elif isinstance(dt_value, str):
            try:
                parsed = date_parser.parse(dt_value)
                return parsed.date()
            except:
                return None
        
        # Try to get dt attribute (icalendar types)
        if hasattr(dt_value, 'dt'):
            dt = dt_value.dt
            if isinstance(dt, datetime):
                return dt.date()
            elif isinstance(dt, date):
                return dt
        
        return None
    
    def parse_ics(self, ics_content: str, source: str) -> List[BlockedRange]:
        """
        Parse ICS content and extract blocked date ranges
        
        Args:
            ics_content: The ICS file content
            source: Source name (e.g., 'airbnb', 'booking')
        
        Returns:
            List of BlockedRange objects
        """
        if not ics_content:
            return []
        
        try:
            cal = Calendar.from_ical(ics_content)
        except Exception as e:
            print(f"Error parsing ICS from {source}: {e}")
            return []
        
        blocked_ranges = []
        
        for component in cal.walk():
            if component.name == "VEVENT":
                try:
                    dtstart = component.get('DTSTART')
                    dtend = component.get('DTEND')
                    
                    start_date = self._parse_date(dtstart)
                    end_date = self._parse_date(dtend)
                    
                    if start_date and end_date:
                        # ICS DTEND is typically exclusive (last day is checkout day)
                        # We want to mark all nights as blocked, so end_date is exclusive
                        blocked_ranges.append(BlockedRange(start_date, end_date, source))
                except Exception as e:
                    # Skip malformed events
                    print(f"Error parsing event from {source}: {e}")
                    continue
        
        return blocked_ranges
