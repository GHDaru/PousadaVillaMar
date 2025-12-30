from datetime import date
from typing import Dict, Optional
from app.services.pricing.base import PricingProvider


class RulesV1PricingProvider(PricingProvider):
    """
    Simple rule-based pricing provider
    Currently returns None for all prices (future implementation)
    """
    
    def get_day_pricing(self, unit_id: str, target_date: date) -> Dict[str, Optional[any]]:
        """
        Get pricing information for a specific day
        
        For now, returns null prices (to be implemented later)
        Future: implement weekend pricing, high season, holidays, etc.
        """
        return {
            "price": None,  # Future: implement pricing logic
            "currency": "BRL",
            "min_nights": 2  # Default minimum nights
        }
