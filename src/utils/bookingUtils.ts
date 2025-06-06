export const calculateTotalDays = (pickupDate: Date | null, returnDate: Date | null): number => {
    if (!pickupDate || !returnDate) return 0;
    const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  export const calculateTotalPrice = (days: number, dailyRate: number): number => {
    return days * dailyRate;
  };
  