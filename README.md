<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Pousada Villa & Mar

Website and calendar management system for Pousada Villa & Mar in Ubatuba, São Francisco do Sul - SC.

## 🚀 Quick Start

Get started in 5 minutes! See [QUICKSTART.md](QUICKSTART.md) for detailed instructions.

**Backend (API):**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend (Website):**
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

This repository contains two main components:

### Frontend (`frontend/`)
React website built with Vite and TypeScript showcasing:
- Room information and gallery
- Amenities and location
- Contact information
- Responsive design with Tailwind CSS

### Backend (`backend/`)
FastAPI calendar API for managing room availability:
- Multi-source calendar aggregation (Airbnb, Booking.com)
- ICS feed parsing and merging
- Manual block management
- Smart caching (10-minute TTL)
- RESTful API with automatic documentation

## 🎯 Features

### Backend API
- **Multi-source Integration**: Automatically fetches and merges calendars from Airbnb and Booking.com
- **Smart Caching**: 10-minute cache reduces API calls while keeping data fresh
- **Manual Blocks**: Create custom unavailability periods for maintenance or personal use
- **Admin Controls**: Force sync with protected endpoints
- **Graceful Degradation**: Returns partial data if sources fail
- **Explainability**: See which sources are blocking each date

### Frontend Website
- **Modern Design**: Clean, responsive interface with custom Pousada branding
- **Room Showcase**: Detailed information about each room type
- **Gallery**: Photo gallery of the property
- **Location**: Embedded map and directions
- **Contact Integration**: Direct WhatsApp and booking links

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get running in 5 minutes
- **[Backend README](backend/README.md)** - API documentation and architecture
- **[Frontend README](frontend/README.md)** - Frontend setup and development
- **[Integration Guide](INTEGRATION_GUIDE.md)** - How to connect frontend to backend
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Technical details

## 🔧 Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **httpx** - Async HTTP client for ICS fetching
- **icalendar** - ICS parsing library
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🌐 API Endpoints

### Get Calendar
```bash
GET /api/units/{unit_id}/calendar?start=YYYY-MM-DD&end=YYYY-MM-DD
```

Returns availability status for each day in the date range.

### Create Manual Block
```bash
POST /api/units/{unit_id}/blocks
Content-Type: application/json

{
  "start": "2025-12-31",
  "end": "2026-01-02",
  "reason": "Manutenção"
}
```

### Force Sync (Admin)
```bash
POST /api/units/{unit_id}/sync
X-ADMIN-TOKEN: your-admin-token
```

Interactive API docs: `http://localhost:8000/docs`

## 🏠 Pre-configured Units

- `suite-premium` - Suíte Premium
- `quarto-familia` - Quarto Família  
- `quarto-duplo` - Quarto com Duas Camas
- `quarto-casal` - Quarto Casal
- `quarto-standard` - Quarto Standard
- `casa-completa` - Casa Completa

## 🔐 Configuration

### Add ICS URLs

Edit `backend/app/repos/units_repo.py`:

```python
"suite-premium": Unit(
    id="suite-premium",
    name="Suíte Premium",
    airbnb_ics_url="https://www.airbnb.com/calendar/ical/...",
    booking_ics_url="https://ical.booking.com/v1/export/t/...",
    currency="BRL"
)
```

### Set Admin Token

```bash
export ADMIN_TOKEN=your-secure-token
```

## 🚀 Deployment

The system can be deployed to various platforms:

- **Vercel** - Recommended for both frontend and backend
- **Railway** - Good for backend with automatic Python detection
- **Render** - Free tier available
- **Docker** - Self-hosted option

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📝 Example Response

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
      "blocked_by": ["airbnb", "booking"],
      "price": null,
      "currency": "BRL",
      "min_nights": 2
    }
  ]
}
```

## ✅ Implementation Status

All features implemented and tested:
- ✅ Repository reorganized (frontend/ and backend/)
- ✅ FastAPI backend with complete calendar API
- ✅ ICS fetching and parsing from multiple sources
- ✅ Calendar merging with explainability
- ✅ Smart caching with TTL
- ✅ Manual block management
- ✅ Admin endpoints with authentication
- ✅ CORS configuration
- ✅ Comprehensive documentation
- ✅ All tests passing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Contact

**Pousada Villa & Mar**
- Address: Rua Jaguaruna, 244, Ubatuba, São Francisco do Sul - SC
- Contact: Susana Moreira
- Phone: (47) 99715-8173
- Email: contato@villamarenseada.com.br

## 📄 License

This project is private and proprietary to Pousada Villa & Mar.
