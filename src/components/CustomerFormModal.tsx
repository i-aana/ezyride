import React, { useState } from 'react'; //child component of booking page
import { CustomerInfo, DateRange, Car } from '../types';
import { Calendar, Car as CarIcon, X } from 'lucide-react';
import { calculateTotalDays, calculateTotalPrice } from '../utils/bookingUtils';

interface CustomerFormModalProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: Partial<CustomerInfo>) => void;
  onSubmit: () => void;   // this will be async function passed from parent
  onClose: () => void;
  dateRange: DateRange;
  selectedCar: Car;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ 
  customerInfo,
  onCustomerInfoChange,
  onSubmit,
  onClose,
  dateRange,
  selectedCar,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  //remove... const calculateTotalDays = () => {
  //   if (!dateRange.pickupDate || !dateRange.returnDate) return 0;
  //   const diffTime = Math.abs(dateRange.returnDate.getTime() - dateRange.pickupDate.getTime());
  //   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // };
  
  // const totalDays = calculateTotalDays();
  // const totalPrice = totalDays * selectedCar.price;...remove
  

  const totalDays = calculateTotalDays(dateRange.pickupDate, dateRange.returnDate);
  const totalPrice = calculateTotalPrice(totalDays, selectedCar.price);
  
  // Rename internal validation submit handler so it does not clash with onSubmit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submit Triggered');
    
    const newErrors: Record<string, string> = {};
    
    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form passed validation, calling parent onSubmit...');
      onSubmit();  // call the async submit function from parent
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 bg-blue-900 text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold">Complete Your Booking</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mt-1">
                      <CarIcon size={16} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Selected Vehicle</p>
                      <p className="font-medium">{selectedCar.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{selectedCar.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mt-1">
                      <Calendar size={16} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rental Period</p>
                      <p className="font-medium">{formatDate(dateRange.pickupDate)} - {formatDate(dateRange.returnDate)}</p>
                      <p className="text-sm text-gray-500">{totalDays} days</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Daily Rate</span>
                      <span>${selectedCar.price}/day</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Duration</span>
                      <span>{totalDays} days</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleFormSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) => onCustomerInfoChange({ fullName: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => onCustomerInfoChange({ email: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => onCustomerInfoChange({ phone: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      value={customerInfo.specialRequests}
                      onChange={(e) => onCustomerInfoChange({ specialRequests: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Any special requirements or requests..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
                    onClick={() => console.log('Submit button clicked')}
                  >
                    Complete Booking
                    
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormModal;
