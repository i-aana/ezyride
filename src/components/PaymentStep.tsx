import React from 'react';
import { ArrowLeft, CreditCard } from 'lucide-react';

interface PaymentMethodStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleBackStep: () => void;
  handleNextStep: () => void;
  setCurrentStep: (step: number) => void;
}

const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({
  formData,
  handleInputChange,
  handleBackStep,
  handleNextStep,
  setCurrentStep
}) => {
  const isCardholderNameInvalid = formData.cardholderName && /[^a-zA-Z\s]/.test(formData.cardholderName);
  const isCardNumberInvalid = formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber);
  const isCvvInvalid = formData.securityCode && !/^\d{3,4}$/.test(formData.securityCode);
  const isVoucherInvalid = formData.paymentMethod === 'voucher' && !formData.voucherCode;

  const isFormInvalid = () => {
    if (formData.paymentMethod === 'credit') {
      return (
        !formData.cardholderName ||
        isCardholderNameInvalid ||
        !formData.cardNumber ||
        isCardNumberInvalid ||
        !formData.expirationMonth ||
        !formData.expirationYear ||
        !formData.securityCode ||
        isCvvInvalid
      );
    }
    if (formData.paymentMethod === 'voucher') {
      return isVoucherInvalid;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={handleBackStep} className="flex items-center text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

        <div className="space-y-6">
          {/* Credit Card Option */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                checked={formData.paymentMethod === 'credit'}
                onChange={() => handleInputChange('paymentMethod', 'credit')}
              />
              <label htmlFor="creditCard" className="font-medium">Credit Card</label>
              <CreditCard className="w-4 h-4 ml-2" />
            </div>

            {formData.paymentMethod === 'credit' && (
              <div className="ml-6 space-y-4">
                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name*</label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      isCardholderNameInvalid ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {isCardholderNameInvalid && (
                    <p className="text-red-500 text-xs mt-1">Only letters and spaces are allowed.</p>
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    maxLength={16}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\D/g, ''))}
                    placeholder="1234567812345678"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      isCardNumberInvalid ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {isCardNumberInvalid && (
                    <p className="text-red-500 text-xs mt-1">Card number must be 16 digits.</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                    <select
                      value={formData.expirationMonth}
                      onChange={(e) => handleInputChange('expirationMonth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <select
                      value={formData.expirationYear}
                      onChange={(e) => handleInputChange('expirationYear', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={2025 + i} value={2025 + i}>{2025 + i}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      value={formData.securityCode}
                      maxLength={4}
                      onChange={(e) => handleInputChange('securityCode', e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        isCvvInvalid ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {isCvvInvalid && (
                      <p className="text-red-500 text-xs mt-1">CVV must be 3–4 digits.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cash Voucher Option */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="radio"
                id="cashVoucher"
                name="paymentMethod"
                checked={formData.paymentMethod === 'voucher'}
                onChange={() => handleInputChange('paymentMethod', 'voucher')}
              />
              <label htmlFor="cashVoucher" className="font-medium">Cash Voucher</label>
            </div>

            {formData.paymentMethod === 'voucher' && (
              <div className="ml-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  value={formData.voucherCode}
                  onChange={(e) => handleInputChange('voucherCode', e.target.value)}
                  placeholder="123456BCD"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    isVoucherInvalid ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {isVoucherInvalid && (
                  <p className="text-red-500 text-xs mt-1">Voucher code cannot be empty.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={handleBackStep}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleNextStep}
          disabled={isFormInvalid()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
