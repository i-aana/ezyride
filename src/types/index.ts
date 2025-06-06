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