from typing import Optional, Dict
from app.models.schemas import Unit


# In-memory storage for units
# In production, this would be a database
UNITS_DB: Dict[str, Unit] = {
    "suite-premium": Unit(
        id="suite-premium",
        name="Suíte Premium",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,  # To be configured
        booking_ics_url="https://ical.booking.com/v1/export/t/c9bdd689-d2ce-4a8a-a390-11867aa6b349.ics",
        currency="BRL"
    ),
    "quarto-familia": Unit(
        id="quarto-familia",
        name="Quarto Família",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,
        booking_ics_url=None,
        currency="BRL"
    ),
    "quarto-duplo": Unit(
        id="quarto-duplo",
        name="Quarto com Duas Camas",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,
        booking_ics_url=None,
        currency="BRL"
    ),
    "quarto-casal": Unit(
        id="quarto-casal",
        name="Quarto Casal",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,
        booking_ics_url=None,
        currency="BRL"
    ),
    "quarto-standard": Unit(
        id="quarto-standard",
        name="Quarto Standard",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,
        booking_ics_url=None,
        currency="BRL"
    ),
    # For testing - whole house
    "casa-completa": Unit(
        id="casa-completa",
        name="Casa Completa",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,
        booking_ics_url="https://ical.booking.com/v1/export/t/c9bdd689-d2ce-4a8a-a390-11867aa6b349.ics",
        currency="BRL"
    )
}


class UnitsRepository:
    """Repository for managing units"""
    
    def get_unit(self, unit_id: str) -> Optional[Unit]:
        """Get a unit by ID"""
        return UNITS_DB.get(unit_id)
    
    def list_units(self) -> list[Unit]:
        """List all units"""
        return list(UNITS_DB.values())
