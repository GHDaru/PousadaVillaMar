from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import calendar_routes, blocks_routes


# Create FastAPI app
app = FastAPI(
    title="Pousada Villa & Mar Calendar API",
    description="Calendar availability API for managing room bookings from multiple sources",
    version="1.0.0"
)

# Configure CORS
# In production, restrict to your actual frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://pousadavillamar.vercel.app",  # Add your production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(calendar_routes.router, prefix="/api", tags=["calendar"])
app.include_router(blocks_routes.router, prefix="/api", tags=["blocks"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "Pousada Villa & Mar Calendar API",
        "version": "1.0.0",
        "endpoints": {
            "calendar": "/api/units/{unit_id}/calendar?start=YYYY-MM-DD&end=YYYY-MM-DD",
            "sync": "/api/units/{unit_id}/sync (POST, requires X-ADMIN-TOKEN)",
            "blocks": "/api/units/{unit_id}/blocks (POST)",
            "docs": "/docs"
        }
    }


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}
