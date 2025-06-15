import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { DateRange, CustomerInfo } from '../types';

interface FinalReviewStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleBackStep: () => void;
  handleNextStep: () => void;
  handleSubmitBooking: () => void;
  handleCustomerInfoChange: (info: Partial<CustomerInfo>) => void;
  dateRange: DateRange;
  setCurrentStep: (step: number) => void;
}

const FinalReviewStep: React.FC<FinalReviewStepProps> = ({
  formData,
  handleInputChange,
  handleBackStep,
  handleSubmitBooking,
  setCurrentStep,
  dateRange,
}) => {
  const formattedPickup = dateRange?.pickupDate instanceof Date
    ? dateRange.pickupDate.toLocaleDateString()
    : 'Not selected';

  const formattedReturn = dateRange?.returnDate instanceof Date
    ? dateRange.returnDate.toLocaleDateString()
    : 'Not selected';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={handleBackStep}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Final Review</h2>

        <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Credit Card</h3>
            <button
              onClick={handleBackStep}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Cardholder Name:</span>
              <div className="mt-1 px-3 py-2 bg-white border rounded">
                {formData.cardholderName || 'Not provided'}
              </div>
            </div>

            <div>
              <span className="font-medium">Card Number:</span>
              <div className="mt-1 px-3 py-2 bg-white border rounded">
                {formData.cardNumber
                  ? `**** **** **** ${formData.cardNumber.slice(-4)}`
                  : 'Not provided'}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="font-medium block">Expiration Month</span>
                <div className="mt-1 px-3 py-2 bg-white border rounded text-center">
                  {formData.expirationMonth || 'MM'}
                </div>
              </div>
              <div>
                <span className="font-medium block">Expiration Year</span>
                <div className="mt-1 px-3 py-2 bg-white border rounded text-center">
                  {formData.expirationYear || 'YYYY'}
                </div>
              </div>
              <div>
                <span className="font-medium block">Security Code</span>
                <div className="mt-1 px-3 py-2 bg-white border rounded text-center">
                  {formData.securityCode ? '***' : 'CVV'}
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Pickup and Return Dates */}
          <div className="mt-6 space-y-2 text-sm">
            <div>
              <span className="font-medium">Pickup Date:</span>
              <div className="mt-1 px-3 py-2 bg-white border rounded">
                {formattedPickup}
              </div>
            </div>
            <div>
              <span className="font-medium">Return Date:</span>
              <div className="mt-1 px-3 py-2 bg-white border rounded">
                {formattedReturn}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          onClick={handleBackStep}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmitBooking}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default FinalReviewStep;
