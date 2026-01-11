// API configuration
// In development, this should point to your local backend
// In production, update this to your production API URL

// @ts-ignore - Vite env vars
export const API_BASE_URL = (typeof window !== 'undefined' && (window as any).VITE_API_BASE_URL) || 'http://localhost:8000';
