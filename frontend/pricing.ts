import pricingConfig from './pricing-config.json';

export interface RoomPricing {
  name: string;
  weekdayPrice: number;
  weekendPrice: number;
}

export interface PricingConfig {
  rooms: {
    [roomId: string]: RoomPricing;
  };
  specialDates: {
    [year: string]: {
      [month: string]: number[];
    };
  };
}

export const PRICING_CONFIG: PricingConfig = pricingConfig as PricingConfig;

/**
 * Check if a date is a weekend (Friday or Saturday)
 */
export const isWeekend = (dateStr: string): boolean => {
  const date = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 || dayOfWeek === 6; // Friday (5) or Saturday (6)
};

/**
 * Check if a date is a special date (holiday/commemorative date)
 */
export const isSpecialDate = (dateStr: string): boolean => {
  const date = new Date(dateStr + 'T00:00:00');
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate();

  const specialDates = PRICING_CONFIG.specialDates[year];
  if (!specialDates) return false;

  const monthDates = specialDates[month];
  if (!monthDates) return false;

  return monthDates.includes(day);
};

/**
 * Get the price for a room on a specific date
 */
export const getRoomPrice = (roomId: string, dateStr: string): number | null => {
  const roomPricing = PRICING_CONFIG.rooms[roomId];
  if (!roomPricing) return null;

  // Special dates and weekends use weekend pricing
  if (isSpecialDate(dateStr) || isWeekend(dateStr)) {
    return roomPricing.weekendPrice;
  }

  return roomPricing.weekdayPrice;
};

/**
 * Format price in BRL currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
