"""
API routes for evaluations.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.google_sheets_service import google_sheets_service


router = APIRouter()


class Evaluation(BaseModel):
    """Evaluation model."""
    overallRating: int
    cleanlinessRating: int
    comfortRating: int
    locationRating: int
    valueRating: int
    comment: str = ""
    submittedAt: str


@router.post("/evaluations/submit")
async def submit_evaluation(evaluation: Evaluation):
    """
    Submit an anonymous evaluation and save to Google Sheets.
    
    Args:
        evaluation: Evaluation data
        
    Returns:
        Success message
    """
    try:
        # Convert evaluation to dict format
        evaluation_data = evaluation.model_dump()
        
        # Save to Google Sheets
        success = google_sheets_service.append_evaluation(evaluation_data)
        
        if success:
            return {
                "success": True,
                "message": "Evaluation submitted successfully"
            }
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to save evaluation to Google Sheets"
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error submitting evaluation: {str(e)}"
        )
