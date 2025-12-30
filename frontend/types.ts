
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
}

export interface Amenity {
  icon: React.ReactNode;
  title: string;
  description: string;
}
