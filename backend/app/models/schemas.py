from datetime import date, datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class Unit(BaseModel):
    """Represents a rentable unit (room/house)"""
    id: str
    name: str
    timezone: str = "America/Sao_Paulo"
    airbnb_ics_url: Optional[str] = None
    booking_ics_url: Optional[str] = None
    currency: str = "BRL"


class ManualBlock(BaseModel):
    """Manual block for a unit"""
    unit_id: str
    start: date
    end: date
    reason: str


class CreateManualBlock(BaseModel):
    """Request to create a manual block"""
    start: date
    end: date
    reason: str


class DayStatus(BaseModel):
    """Status of a single day in the calendar"""
    date: date
    status: Literal["available", "blocked"]
    blocked_by: List[str] = Field(default_factory=list)
    price: Optional[float] = None
    currency: str = "BRL"
    min_nights: Optional[int] = None


class SourceStatus(BaseModel):
    """Status of a calendar source"""
    ok: bool
    fetched_at: Optional[datetime] = None
    error: Optional[str] = None


class DateRange(BaseModel):
    """Date range"""
    start: date
    end: date


class CalendarResponse(BaseModel):
    """Response for calendar endpoint"""
    unit_id: str
    timezone: str
    range: DateRange
    last_sync: datetime
    sources: dict[str, SourceStatus]
    days: List[DayStatus]


class SyncResponse(BaseModel):
    """Response for sync endpoint"""
    unit_id: str
    success: bool
    synced_at: datetime
    sources: dict[str, SourceStatus]
