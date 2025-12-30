# Quick Start Guide

Get the Pousada Villa & Mar system running in 5 minutes.

## Prerequisites

- **Frontend**: Node.js 18+ and npm
- **Backend**: Python 3.11+ and pip

## Start Backend (API)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

### Optional: Set Admin Token

```bash
export ADMIN_TOKEN=your-secure-token-here
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Start Frontend (Website)

```bash
# 1. Navigate to frontend directory (in a new terminal)
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## Test the Backend API

### 1. Check API Health
```bash
curl http://localhost:8000/health
```

Expected: `{"status":"healthy"}`

### 2. Get Calendar for a Unit
```bash
curl "http://localhost:8000/api/units/suite-premium/calendar?start=2025-12-01&end=2025-12-31"
```

### 3. Create a Manual Block
```bash
curl -X POST "http://localhost:8000/api/units/suite-premium/blocks" \
  -H "Content-Type: application/json" \
  -d '{"start":"2025-12-24","end":"2025-12-26","reason":"Test block"}'
```

### 4. Force Sync (Admin)
```bash
curl -X POST "http://localhost:8000/api/units/suite-premium/sync" \
  -H "X-ADMIN-TOKEN: dev-admin-token-123"
```

## Configure ICS URLs

To integrate with real Airbnb and Booking.com calendars:

1. Open `backend/app/repos/units_repo.py`
2. Add your ICS URLs:

```python
"suite-premium": Unit(
    id="suite-premium",
    name="Suíte Premium",
    airbnb_ics_url="https://www.airbnb.com/calendar/ical/YOUR_CODE.ics",
    booking_ics_url="https://ical.booking.com/v1/export/t/YOUR_CODE.ics",
    currency="BRL"
)
```

3. Restart the backend server

### How to Get ICS URLs

**Airbnb:**
1. Go to your listing → Calendar
2. Click "Availability settings" or "Import/Export calendars"
3. Copy the "Export calendar" URL

**Booking.com:**
1. Go to Extranet → Calendar
2. Look for "Calendar sync" or "Import/Export"
3. Copy the iCal URL

## Project Structure

```
.
├── frontend/           # React website
│   ├── components/     # UI components
│   ├── public/         # Static assets
│   └── package.json
├── backend/            # FastAPI server
│   ├── app/
│   │   ├── api/        # API endpoints
│   │   ├── services/   # Business logic
│   │   ├── repos/      # Data storage
│   │   └── models/     # Data schemas
│   └── requirements.txt
└── README.md
```

## Next Steps

1. **Configure Real ICS URLs**: Add your Airbnb and Booking.com calendar URLs
2. **Test Integration**: Verify calendars are syncing correctly
3. **Customize Frontend**: Integrate calendar display with your existing pages
4. **Deploy to Production**: See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions

## Common Issues

### Backend won't start
- Check Python version: `python --version` (should be 3.11+)
- Ensure all dependencies are installed: `pip install -r requirements.txt`

### Frontend won't start
- Check Node version: `node --version` (should be 18+)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Can't access from other devices
- Backend: Use `--host 0.0.0.0` flag
- Frontend: Vite already binds to 0.0.0.0
- Check firewall settings

### ICS fetch fails
- Verify ICS URLs are correct and accessible
- Check for network/firewall issues
- Review error messages in `sources` field of API response

## Documentation

- **Full README**: [README.md](README.md)
- **Backend API**: [backend/README.md](backend/README.md)
- **Frontend Integration**: [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Implementation Details**: [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

## Support

For issues or questions:
1. Check the documentation above
2. Review API docs at `http://localhost:8000/docs`
3. Inspect browser console for frontend errors
4. Check backend logs for API errors

## Development Commands

### Backend
```bash
# Run server
uvicorn app.main:app --reload

# Run with custom port
uvicorn app.main:app --reload --port 8080

# Run in production mode (no reload)
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Happy coding! 🚀
