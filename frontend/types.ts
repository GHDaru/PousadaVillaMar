
// Fix: Import React to resolve 'React' namespace for React.ReactNode
import React from 'react';

export interface Room {
  id: string;
  name: string;
  description: string;
  price?: string;
  features: string[];
  imageUrl: string;
  images?: string[];
  isSuite: boolean;
  bookingUrl?: string;
  airbnbUrl?: string;
  calendarUrl?: string;
  bookingCalendarUrl?: string;
}

export interface Amenity {
  icon: React.ReactNode;
  title: string;
  description: string;
}
