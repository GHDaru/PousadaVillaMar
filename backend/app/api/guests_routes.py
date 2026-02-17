"""
API routes for guest registration.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.google_sheets_service import google_sheets_service


router = APIRouter()


class Guest(BaseModel):
    """Guest model."""
    name: str
    phone: str
    origin: str
    birthDate: str


class GuestRegistrationRequest(BaseModel):
    """Request model for guest registration."""
    guests: List[Guest]


@router.post("/guests/register")
async def register_guests(request: GuestRegistrationRequest):
    """
    Register guests and save to Google Sheets.
    
    Args:
        request: Guest registration request containing list of guests
        
    Returns:
        Success message
    """
    try:
        # Convert guests to dict format
        guests_data = [guest.model_dump() for guest in request.guests]
        
        # Save to Google Sheets
        success = google_sheets_service.append_guest_registration(guests_data)
        
        if success:
            return {
                "success": True,
                "message": f"{len(guests_data)} guest(s) registered successfully"
            }
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to save guest registration to Google Sheets"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error registering guests: {str(e)}"
        )
