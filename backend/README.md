# Pousada Villa & Mar - Backend API

Calendar availability API for managing room bookings from multiple sources (Airbnb, Booking.com, manual blocks).

## Features

- **Multi-source calendar aggregation**: Fetches and merges calendars from Airbnb and Booking.com ICS feeds
- **Manual blocking**: Add manual blocks for maintenance or personal use
- **Real-time updates**: Calendar data is fetched fresh on every page load (no caching)
- **Parallel fetching**: Fetches multiple ICS sources in parallel for fast responses
- **Graceful degradation**: Returns partial data if one source fails
- **Admin endpoints**: Force sync calendar data with protected endpoints

## API Endpoints

### Get Calendar Availability
```
GET /api/units/{unit_id}/calendar?start=YYYY-MM-DD&end=YYYY-MM-DD
```

Returns availability status for each day in the date range.

**Example Response:**
```json
{
  "unit_id": "suite-premium",
  "timezone": "America/Sao_Paulo",
  "range": {"start": "2025-12-01", "end": "2025-12-31"},
  "last_sync": "2025-12-29T16:20:12Z",
  "sources": {
    "airbnb": {"ok": true, "fetched_at": "2025-12-29T16:19:50Z"},
    "booking": {"ok": true, "fetched_at": "2025-12-29T16:19:51Z"}
  },
  "days": [
    {
      "date": "2025-12-24",
      "status": "blocked",
      "blocked_by": ["airbnb"],
      "price": null,
      "currency": "BRL",
      "min_nights": 2
    }
  ]
}
```

### Create Manual Block
```
POST /api/units/{unit_id}/blocks
Content-Type: application/json

{
  "start": "2025-12-31",
  "end": "2026-01-02",
  "reason": "Manutenção"
}
```

### Force Sync (Admin Only)
```
POST /api/units/{unit_id}/sync
X-ADMIN-TOKEN: your-admin-token
```

Forces immediate sync of calendar data, bypassing cache.

## Setup

### Prerequisites
- Python 3.11+
- pip

### Installation

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Set environment variables (optional):
```bash
export ADMIN_TOKEN=your-secure-token
```

3. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Architecture

```
app/
├── main.py                  # FastAPI app and CORS configuration
├── api/
│   ├── calendar_routes.py   # Calendar endpoints
│   └── blocks_routes.py     # Blocks and sync endpoints
├── services/
│   ├── ical_fetcher.py      # Fetch ICS from external sources
│   ├── ical_parser.py       # Parse ICS to blocked ranges
│   ├── calendar_merge.py    # Merge blocked ranges from sources
│   ├── calendar_builder.py  # Build calendar response
│   └── pricing/
│       ├── base.py          # Pricing provider interface
│       └── rules_v1.py      # Simple rule-based pricing
├── repos/
│   ├── units_repo.py        # Units storage
│   ├── blocks_repo.py       # Manual blocks storage
│   └── cache_repo.py        # In-memory cache with TTL
└── models/
    └── schemas.py           # Pydantic models
```

## Configuration

### Units Configuration

Units are configured in `app/repos/units_repo.py`. Each unit has:
- `id`: Unique identifier
- `name`: Display name
- `timezone`: Timezone (default: "America/Sao_Paulo")
- `airbnb_ics_url`: Airbnb calendar ICS URL (optional)
- `booking_ics_url`: Booking.com calendar ICS URL (optional)
- `currency`: Currency code (default: "BRL")

All units now have Booking.com ICS URLs pre-configured:

```python
"suite-premium": Unit(
    id="suite-premium",
    name="Suíte Premium (Quarto 05)",
    airbnb_ics_url=None,  # To be configured
    booking_ics_url="https://ical.booking.com/v1/export/t/b84506ba-e419-4889-9954-ee8ef44d81fc.ics",
)
```

### Admin Token

Set the `ADMIN_TOKEN` environment variable to secure admin endpoints:
```bash
export ADMIN_TOKEN=your-secure-random-token
```

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Configure `vercel.json` for serverless deployment
3. Deploy: `vercel --prod`

### Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app/ ./app/
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Development

### Adding a New Source

1. Add URL to unit configuration in `units_repo.py`
2. The system will automatically fetch and merge the new source

### Custom Pricing

Implement a new pricing provider:

```python
# app/services/pricing/custom_pricing.py
from app.services.pricing.base import PricingProvider

class CustomPricingProvider(PricingProvider):
    def get_day_pricing(self, unit_id: str, target_date: date):
        # Your custom logic
        return {
            "price": 150.00,
            "currency": "BRL",
            "min_nights": 2
        }
```

Then update `calendar_routes.py` to use your provider.

## Troubleshooting

### ICS Fetch Timeout
- Default timeout is 5 seconds
- Adjust in `calendar_routes.py`: `ICSFetcher(timeout=10.0)`

### No Caching
- Calendar data is fetched fresh on every request
- This ensures always up-to-date availability information
- For high-traffic scenarios, consider re-adding cache with shorter TTL

### CORS Issues
- Update allowed origins in `app/main.py`
- Add your production frontend domain
