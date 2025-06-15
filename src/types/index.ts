export interface DateRange {
  pickupDate: Date | null;
  returnDate: Date | null;
}

export interface Car {
  id: string;
  name: string;
  category: 'economy' | 'standard' | 'luxury' | 'suv' | 'van';
  price: number;
  seats: number;
  transmission: 'automatic' | 'manual';
  image: string;
  features: string[];
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface BookingState {
  step: number;
  dateRange: DateRange;
  selectedCar: Car;
  customerInfo: CustomerInfo;
}

// src/types/index.ts
export interface BookingRequest {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  status: 'pending' | 'confirmed' | 'declined';
  totalCost: number;
  specialRequest?: string;
  pickupLocation: string;
  deposit?: number;
  insurance?: number;
  serviceFee?: number;
  baseRate?: number;
  nights?: number;
  milesIncluded?: number;
}

export interface CalendarData {
  [key: string]: {
    status: 'blocked' | 'available' | 'booked' | 'request';
    price: number;
  };
}

export interface CostSettings {
  depositPerTrip: number;
  insurancePerTrip: number;
  additionalMilesCharge: number;
  serviceFees: number;
}

export interface PriceUpdateData {
  dateStart: string;
  dateEnd: string;
  action: 'block' | 'unblock' | 'price-update';
  price?: number;
}