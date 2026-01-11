from typing import Optional, Dict
from app.models.schemas import Unit


# In-memory storage for units
# In production, this would be a database
UNITS_DB: Dict[str, Unit] = {
    "suite-premium": Unit(
        id="suite-premium",
        name="Suíte Premium (Quarto 05)",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,  # To be configured
        booking_ics_url="https://ical.booking.com/v1/export/t/b84506ba-e419-4889-9954-ee8ef44d81fc.ics",
        currency="BRL"
    ),
    "quarto-familia": Unit(
        id="quarto-familia",
        name="Quarto Família (Quarto 04)",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,  # To be configured
        booking_ics_url="https://ical.booking.com/v1/export?t=ad77d862-1714-4393-96ae-13631b97b4cb",
        currency="BRL"
    ),
    "quarto-duplo": Unit(
        id="quarto-duplo",
        name="Quarto com Duas Camas (Quarto 03)",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,  # To be configured
        booking_ics_url="https://ical.booking.com/v1/export/t/d1e4f8de-3767-4266-aa37-d09b88aaafd2.ics",
        currency="BRL"
    ),
    "quarto-casal": Unit(
        id="quarto-casal",
        name="Quarto Casal (Quarto 02)",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,  # To be configured
        booking_ics_url="https://ical.booking.com/v1/export/t/6088b75e-dfef-424c-a2da-87532f072500.ics",
        currency="BRL"
    ),
    "quarto-standard": Unit(
        id="quarto-standard",
        name="Quarto Standard (Quarto 01)",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,  # To be configured
        booking_ics_url="https://ical.booking.com/v1/export/t/5d7051ab-b226-4e57-8042-a2a95cbc8173.ics",
        currency="BRL"
    ),
    # For testing - whole house
    "casa-completa": Unit(
        id="casa-completa",
        name="Casa Completa",
        timezone="America/Sao_Paulo",
        airbnb_ics_url=None,  # To be configured
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
