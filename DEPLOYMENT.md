# Deployment Guide

This guide covers deploying both the frontend and backend to production.

## Backend Deployment

### Option 1: Vercel (Serverless - Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Create `vercel.json` in the backend directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app/main.py"
    }
  ],
  "env": {
    "ADMIN_TOKEN": "@admin-token"
  }
}
```

3. Deploy:
```bash
cd backend
vercel --prod
```

4. Set environment variables in Vercel dashboard:
- `ADMIN_TOKEN` - Your secure admin token

### Option 2: Railway

1. Create account at railway.app
2. Create new project from GitHub repo
3. Set root directory to `backend/`
4. Railway auto-detects Python and uses `requirements.txt`
5. Set environment variables:
   - `ADMIN_TOKEN` - Your secure admin token
6. Deploy automatically on push

### Option 3: Render

1. Create account at render.com
2. Create new Web Service from GitHub repo
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set environment variables:
   - `ADMIN_TOKEN` - Your secure admin token
5. Deploy

### Option 4: Docker (Self-hosted)

1. Create `Dockerfile` in backend directory:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. Build and run:
```bash
cd backend
docker build -t pousada-api .
docker run -p 8000:8000 -e ADMIN_TOKEN=your-token pousada-api
```

### Post-Deployment Backend Setup

1. Note your backend API URL (e.g., `https://your-api.vercel.app`)
2. Test the API:
```bash
curl https://your-api.vercel.app/health
```

3. Configure ICS URLs in `backend/app/repos/units_repo.py`:
```python
"suite-premium": Unit(
    id="suite-premium",
    name="Suíte Premium",
    airbnb_ics_url="https://www.airbnb.com/calendar/ical/...",
    booking_ics_url="https://ical.booking.com/v1/export/t/...",
)
```

4. Update CORS origins in `backend/app/main.py`:
```python
allow_origins=[
    "https://your-frontend-domain.vercel.app",
]
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Create `vercel.json` in the frontend directory:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "https://your-api.vercel.app/api"
  }
}
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

### Option 2: Netlify

1. Create `netlify.toml` in frontend directory:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://your-api.vercel.app/api"
```

2. Deploy via Netlify CLI or connect GitHub repo

### Option 3: GitHub Pages

1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/PousadaVillaMar/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
gh-pages -d dist
```

## Environment Variables

### Backend
- `ADMIN_TOKEN` - Secure token for admin endpoints (required)
- `PORT` - Port number (default: 8000, some platforms set this)

### Frontend
- `VITE_API_URL` - Backend API URL (e.g., `https://your-api.vercel.app/api`)

## SSL/HTTPS

All recommended platforms (Vercel, Railway, Render, Netlify) provide free SSL certificates automatically.

## Monitoring

### Backend Health Check
```bash
curl https://your-api-domain.com/health
```

Should return:
```json
{"status": "healthy"}
```

### API Documentation
Access interactive API docs at:
```
https://your-api-domain.com/docs
```

## Updating ICS URLs

### Getting Airbnb ICS URL:
1. Go to your Airbnb listing
2. Click "Availability" or "Calendar"
3. Look for "Export calendar" or "Sync calendar"
4. Copy the iCal/ICS URL

### Getting Booking.com ICS URL:
1. Go to your Booking.com extranet
2. Navigate to Calendar
3. Look for "Sync calendars" or "Export calendar"
4. Copy the iCal URL

### Adding URLs to Backend:
Update `backend/app/repos/units_repo.py`:
```python
UNITS_DB = {
    "suite-premium": Unit(
        id="suite-premium",
        name="Suíte Premium",
        airbnb_ics_url="https://www.airbnb.com/calendar/ical/YOUR_CODE.ics",
        booking_ics_url="https://ical.booking.com/v1/export/t/YOUR_CODE.ics",
        currency="BRL"
    ),
}
```

Redeploy after updating.

## Testing Production

1. Test calendar endpoint:
```bash
curl "https://your-api-domain.com/api/units/suite-premium/calendar?start=2025-12-01&end=2025-12-31"
```

2. Test manual block (from frontend):
```bash
curl -X POST "https://your-api-domain.com/api/units/suite-premium/blocks" \
  -H "Content-Type: application/json" \
  -d '{"start":"2025-12-24","end":"2025-12-26","reason":"Test"}'
```

3. Test sync (admin):
```bash
curl -X POST "https://your-api-domain.com/api/units/suite-premium/sync" \
  -H "X-ADMIN-TOKEN: your-admin-token"
```

## Scaling Considerations

### Cache
Currently uses in-memory cache. For production with multiple instances:
- Use Redis (Upstash is Vercel-friendly)
- Update `backend/app/repos/cache_repo.py` to use Redis client

### Database
Currently uses in-memory storage. For production:
- Use PostgreSQL (Neon, Supabase, or Railway)
- Implement database models
- Update repositories to use database

### Rate Limiting
Consider adding rate limiting for production:
```bash
pip install slowapi
```

## Troubleshooting

### CORS Errors
- Ensure frontend domain is in `allow_origins` in `backend/app/main.py`
- Check that API URL in frontend matches backend URL

### ICS Fetch Failures
- Verify ICS URLs are correct
- Check that URLs are accessible from your server
- Some platforms may block certain domains

### Cache Not Working
- In serverless environments (Vercel), cache is per-instance
- Consider using Redis for persistent cache
- Check TTL settings in cache repository

## Security Checklist

- [ ] Set strong `ADMIN_TOKEN` environment variable
- [ ] Use HTTPS for both frontend and backend
- [ ] Restrict CORS to your actual frontend domain
- [ ] Keep ICS URLs secret (never expose in frontend)
- [ ] Monitor API usage for abuse
- [ ] Consider rate limiting for production
- [ ] Use environment variables for all secrets
- [ ] Regularly update dependencies (`pip list --outdated`, `npm outdated`)

## Next Steps

1. Deploy backend to your chosen platform
2. Deploy frontend to your chosen platform
3. Configure environment variables
4. Add real ICS URLs to backend
5. Test all endpoints in production
6. Monitor logs and performance
7. Consider adding analytics (Google Analytics, Plausible, etc.)
