<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Pousada Villa & Mar

Website and calendar management system for Pousada Villa & Mar.

## Project Structure

This repository contains two main components:

- **`frontend/`** - React website built with Vite and TypeScript
- **`backend/`** - FastAPI calendar API for managing room availability

## Run Locally

### Frontend

**Prerequisites:** Node.js

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend

**Prerequisites:** Python 3.11+

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the API server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

## Documentation

- [Frontend README](frontend/README.md) - Frontend setup and development
- [Backend README](backend/README.md) - API documentation and architecture

## Features

### Frontend
- Responsive website showcasing rooms and amenities
- Gallery and location information
- Contact integration

### Backend
- Multi-source calendar aggregation (Airbnb, Booking.com)
- ICS feed parsing and merging
- Manual block management
- Smart caching (10-minute TTL)
- RESTful API with automatic documentation
