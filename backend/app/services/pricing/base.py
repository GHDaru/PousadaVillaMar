from abc import ABC, abstractmethod
from datetime import date
from typing import Dict, Optional


class PricingProvider(ABC):
    """Base interface for pricing providers"""
    
    @abstractmethod
    def get_day_pricing(self, unit_id: str, target_date: date) -> Dict[str, Optional[any]]:
        """
        Get pricing information for a specific day
        
        Args:
            unit_id: Unit identifier
            target_date: The date to get pricing for
        
        Returns:
            Dictionary with keys: price, currency, min_nights
        """
        pass
