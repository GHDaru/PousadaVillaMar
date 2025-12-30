# Frontend-Backend Integration Guide

This guide shows how to integrate the frontend with the backend calendar API.

## API Base URL

In production, set your API base URL:

**Development:**
```
http://localhost:8000/api
```

**Production:**
```
https://your-backend-domain.com/api
```

## Example Integration

### 1. Fetch Calendar for a Unit

```typescript
// Example: Fetch calendar for a room
async function fetchCalendar(unitId: string, startDate: string, endDate: string) {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
  
  const response = await fetch(
    `${apiUrl}/units/${unitId}/calendar?start=${startDate}&end=${endDate}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch calendar: ${response.statusText}`);
  }
  
  return await response.json();
}

// Usage
const calendar = await fetchCalendar('suite-premium', '2025-12-01', '2025-12-31');

// calendar.days will contain:
// [
//   {
//     date: "2025-12-01",
//     status: "available", // or "blocked"
//     blocked_by: [], // ["airbnb", "booking", "manual"]
//     price: null,
//     currency: "BRL",
//     min_nights: 2
//   },
//   ...
// ]
```

### 2. Display Calendar in Component

```typescript
import React, { useState, useEffect } from 'react';

interface Day {
  date: string;
  status: 'available' | 'blocked';
  blocked_by: string[];
  price: number | null;
  currency: string;
  min_nights: number | null;
}

interface CalendarProps {
  unitId: string;
}

function RoomCalendar({ unitId }: CalendarProps) {
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCalendar() {
      try {
        setLoading(true);
        const today = new Date();
        const endDate = new Date(today);
        endDate.setMonth(endDate.getMonth() + 2);
        
        const startStr = today.toISOString().split('T')[0];
        const endStr = endDate.toISOString().split('T')[0];
        
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
        const response = await fetch(
          `${apiUrl}/units/${unitId}/calendar?start=${startStr}&end=${endStr}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to load calendar');
        }
        
        const data = await response.json();
        setDays(data.days);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    
    loadCalendar();
  }, [unitId]);

  if (loading) {
    return <div>Loading calendar...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="calendar-grid">
      {days.map((day) => (
        <div
          key={day.date}
          className={`calendar-day ${day.status === 'blocked' ? 'blocked' : 'available'}`}
        >
          <div className="date">{day.date}</div>
          <div className="status">
            {day.status === 'blocked' ? (
              <span>❌ Bloqueado</span>
            ) : (
              <span>✅ Disponível</span>
            )}
          </div>
          {day.price && (
            <div className="price">
              {day.currency} {day.price.toFixed(2)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RoomCalendar;
```

### 3. Create Manual Block (Admin)

```typescript
async function createManualBlock(
  unitId: string,
  startDate: string,
  endDate: string,
  reason: string
) {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
  
  const response = await fetch(`${apiUrl}/units/${unitId}/blocks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start: startDate,
      end: endDate,
      reason: reason,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create block');
  }
  
  return await response.json();
}

// Usage
await createManualBlock(
  'suite-premium',
  '2025-12-24',
  '2025-12-26',
  'Manutenção'
);
```

### 4. Force Sync (Admin Only)

```typescript
async function syncCalendar(unitId: string, adminToken: string) {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
  
  const response = await fetch(`${apiUrl}/units/${unitId}/sync`, {
    method: 'POST',
    headers: {
      'X-ADMIN-TOKEN': adminToken,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to sync calendar');
  }
  
  return await response.json();
}

// Usage
const result = await syncCalendar('suite-premium', 'your-admin-token');
console.log('Sync result:', result);
```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8000/api
VITE_API_URL=http://localhost:8000/api
```

For Vite projects, use:

```typescript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

## Available Units

The backend comes pre-configured with these units:

- `suite-premium` - Suíte Premium
- `quarto-familia` - Quarto Família
- `quarto-duplo` - Quarto com Duas Camas
- `quarto-casal` - Quarto Casal
- `quarto-standard` - Quarto Standard
- `casa-completa` - Casa Completa (for testing)

## Calendar Display Ideas

### Monthly Calendar View

Display a traditional calendar grid showing availability:

```typescript
function MonthlyCalendar({ days }: { days: Day[] }) {
  // Group days by week and display in a grid
  // Show available/blocked status with colors
  // Add hover tooltips with details (blocked_by, price, etc.)
}
```

### List View

Show availability as a list with date ranges:

```typescript
function AvailabilityList({ days }: { days: Day[] }) {
  // Group consecutive available/blocked days
  // Display as "Available: Dec 1-5", "Blocked: Dec 6-8", etc.
}
```

### Booking Widget

Integrate with a date picker to check availability:

```typescript
function BookingWidget({ unitId }: { unitId: string }) {
  // Let users select check-in and check-out dates
  // Query the API to check if dates are available
  // Show price and minimum nights
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad request (invalid dates, etc.)
- `403` - Forbidden (invalid admin token)
- `404` - Unit not found
- `500` - Server error

Always handle errors gracefully:

```typescript
try {
  const calendar = await fetchCalendar(unitId, start, end);
  // Use calendar data
} catch (error) {
  // Show user-friendly error message
  console.error('Failed to load calendar:', error);
}
```

## Caching

The backend caches calendar data for 10 minutes. This means:

- Multiple requests within 10 minutes return cached data (fast)
- After 10 minutes, data is refreshed from Airbnb/Booking
- Manual blocks invalidate the cache immediately

For real-time updates, use the admin sync endpoint to force a refresh.

## Next Steps

1. Add calendar component to your room pages
2. Integrate with your existing booking form
3. Create admin panel for manual blocks
4. Add price display when pricing is implemented
5. Consider adding a booking request form that checks availability first
