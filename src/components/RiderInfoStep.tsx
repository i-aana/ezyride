import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BookingState ,DateRange } from '../types';
import { useNavigate } from 'react-router-dom';



interface RiderInfoStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleBackStep: () => void;
  handleNextStep: () => void;
  setCurrentStep: (step: number) => void;
  // customerInfo: CustomerInfo;
  // onCustomerInfoChange: (info: Partial<CustomerInfo>) => void;
  dateRange: DateRange;
  onDateRangeChange:(range: DateRange) => void;
  onDateChange: (field: keyof DateRange, value: Date) => void;
}

const RiderInfoStep: React.FC<RiderInfoStepProps> = ({
  formData,
  handleInputChange,
  handleBackStep,
  handleNextStep,
  setCurrentStep,
  dateRange,
  onDateRangeChange,
}) => {
  const navigate = useNavigate();

  const emailError = formData.email && !/^\S+@\S+\.\S+$/.test(formData.email);
  const phoneError = formData.phone && !/^\d{10,}$/.test(formData.phone);
  const nameError = (name: string) => name && /[^a-zA-Z]/.test(name);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => navigate('/')}
         className="flex items-center text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-6">Rider Info</h2>

      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              nameError(formData.firstName) ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            required
          />
          {nameError(formData.firstName) && (
            <p className="text-red-500 text-xs mt-1">Only letters are allowed</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              nameError(formData.lastName) ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            required
          />
          {nameError(formData.lastName) && (
            <p className="text-red-500 text-xs mt-1">Only letters are allowed</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            required
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">Enter a valid email address</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value.replace(/[^0-9]/g, ''))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              phoneError ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            required
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1">Enter at least 10 digits</p>
          )}
        </div>

        {/* Special Request */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Request (Optional)</label>
          <textarea
            value={formData.specialRequest}
            onChange={(e) => handleInputChange('specialRequest', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-2 mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={formData.agreeTerms}
            onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I certify that I'm at least 25 years old and have a valid driver’s license.
          </label>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          By selecting "I agree — Next", I agree to the EzyRide Terms of Service, Privacy Policy, and to receiving booking-related texts.
        </p>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Pickup Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
          <input
            type="date"
            value={dateRange.pickupDate ? dateRange.pickupDate.toISOString().split('T')[0] : ''}
            onChange={e => onDateChange('pickupDate', new Date(e.target.value))}
          />
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
          <input
            type="date"
            value={dateRange.returnDate ? dateRange.returnDate.toISOString().split('T')[0] : ''}
            onChange={e => onDateChange('returnDate', new Date(e.target.value))}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={handleBackStep}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleNextStep}
          disabled={
            !formData.agreeTerms ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phone ||
            emailError ||
            phoneError ||
            nameError(formData.firstName) ||
            nameError(formData.lastName)
          }
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          I agree - Next
        </button>
      </div>
    </div>
  );
};

export default RiderInfoStep;
