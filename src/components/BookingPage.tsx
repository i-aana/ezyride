import React, { useState } from 'react';
import { ArrowLeft, Calendar, Phone, Mail, CreditCard, Check, X } from 'lucide-react';
import RiderInfoStep from './RiderInfoStep';
import PaymentMethodStep from './PaymentStep';
import FinalReviewStep from './FinalReviewStep';
import { BookingState, CustomerInfo, DateRange } from '../types'; // Adjust import based on your structure
import BookingSummary from './BookingSummary';
import { useNavigate } from 'react-router-dom';
import { supabase} from '../utils/supabaseClient.ts';

interface BookingPageProps {
 
  bookingState: BookingState;
  handleCustomerFormSubmit: () => Promise<void>;
  handleCustomerInfoChange: (info: Partial<CustomerInfo>) => void;
  onDateChange: (field: keyof DateRange, value: Date | null) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({
  bookingState,
  handleCustomerFormSubmit,
  handleCustomerInfoChange,
  onDateChange,
}) => {
  
  const { dateRange } = bookingState;
  const navigate = useNavigate();


const handleDateChange = (field: keyof DateRange, value: Date | null) => {
  const updatedRange = { ...bookingState.dateRange, [field]: value };
  // This will update in parent (BookingPageWrapper)
  setBookingState(prev => ({
    ...prev,
    dateRange: updatedRange,
  }));
};


  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequest: '',
    agreeTerms: false,
    paymentMethod: 'credit',
    cardholderName: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
    voucherCode: '',
    pickupDate: '',
    returnDate: ''
  });

  const [confirmationData, setConfirmationData] = useState({
    requestId: '1234567',
    phone: '123-456-7890',
    email: 'booking@ezyrideky.com'
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmitBooking = async () => {
    const fullName = `${formData.firstName} ${formData.lastName}`;
  
    handleCustomerInfoChange({
      fullName,
      email: formData.email,
      phone: formData.phone,
      specialRequests: formData.specialRequest,
      pickupDate: dateRange.pickupDate,
      returnDate: dateRange.returnDate,
    });
  
    await handleCustomerFormSubmit();
    console.log("handleCustomerInfoChange in BookingPage:", handleCustomerInfoChange);
  
    // 👇 New: Update calendar_prices for selected date range
    if (dateRange.pickupDate && dateRange.returnDate) {
      const start = new Date(dateRange.pickupDate);
      const end = new Date(dateRange.returnDate);
      const datesToUpdate: string[] = [];
  
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        datesToUpdate.push(d.toISOString().split("T")[0]); // format: yyyy-mm-dd
      }
  
      const { error: updateError } = await supabase
        .from("calendar_prices")
        .update({ status: "request"})
        .in("date", datesToUpdate);
  
      if (updateError) {
        console.error("Failed to update calendar_prices:", updateError);
        alert("Failed to reserve selected dates.");
      } else {
        console.log("calendar_prices updated successfully for requested dates");
      }
    } else {
      console.warn("Date range is incomplete, skipping calendar update");
    }
  
    const newRequestId = Math.floor(Math.random() * 9000000) + 1000000;
    setConfirmationData((prev) => ({
      ...prev,
      requestId: newRequestId.toString(),
    }));
  
    setShowConfirmationModal(true);
  };
  

  // const BookingSummary: React.FC<{ formData: typeof formData; dateRange: DateRange }> = ({ formData, dateRange }) => (
    // <div className="bg-gray-50 p-6 rounded-lg">
    //   <h3 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h3>
    //   <div className="space-y-4">
    //     <div className="flex justify-between">
    //       <span>Pickup Date</span>
    //       <span>{dateRange.pickupDate instanceof Date ? dateRange.pickupDate.toLocaleDateString() : 'Not selected'}</span>
    //     </div>
    //     <div className="flex justify-between">
    //       <span>Return Date</span>
    //       <span>{dateRange.returnDate instanceof Date ? dateRange.returnDate.toLocaleDateString() : 'Not selected'}</span>
    //     </div>
    //     <div><strong>Pickup Location:</strong> 231 Morgantown Rd</div>
    //     <div className="border-t pt-4">
    //       <h4 className="font-medium mb-2 text-gray-700">Cost Details</h4>
    //       {/* Cost breakdown (static for now) */}
    //       <div className="flex justify-between"><span>$200.00 x 2 nights</span><span>$400.00</span></div>
    //       <div className="flex justify-between"><span>$210.00 x 2 nights</span><span>$420.00</span></div>
    //       <div className="flex justify-between"><span>Insurance Coverage</span><span>$120.00</span></div>
    //       <div className="flex justify-between"><span>Service Fee</span><span>$50.00</span></div>
    //       <div className="flex justify-between"><span>800 miles included</span><span>$0.00</span></div>
    //       <div className="text-xs text-gray-500">* Additional Miles 0.50/mile</div>
    //       <div className="flex justify-between border-t pt-2"><span>Deposit</span><span>$200.00</span></div>
    //       <div className="flex justify-between font-semibold text-lg border-t pt-2"><span>Total Cost</span><span>$1190.00</span></div>
    //     </div>
    //   </div>
    // </div>
  // );

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Booking Confirmation</h3>
          {/* <button onClick={() => { setShowConfirmationModal(false); window.location.reload(); }} */}
          <button onClick={() => navigate('/')}

           className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-700">Thank you for your interest! The host will reach out shortly.</p>
          <p className="font-medium">Request Confirmation # {confirmationData.requestId}</p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Phone className="w-4 h-4" />
            <span>{confirmationData.phone}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Mail className="w-4 h-4" />
            <span>{confirmationData.email}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <RiderInfoStep
                // formData={formData}
                // handleInputChange={handleInputChange}
                handleNextStep={handleNextStep}
                handleBackStep={handleBackStep}
                setCurrentStep={setCurrentStep}
                dateRange={dateRange}
                onDateChange={onDateChange}
                formData={bookingState.customerInfo}
                handleInputChange={(field, value) => handleCustomerInfoChange({ [field]: value })}
                // onDateRangeChange={setDateRange}
                // customerInfo={bookingState.customerInfo}
                // onCustomerInfoChange={handleCustomerInfoChange}
              />
            )}
            {currentStep === 2 && (
              <PaymentMethodStep
                formData={formData}
                handleInputChange={handleInputChange}
                handleBackStep={handleBackStep}
                handleNextStep={handleNextStep}
                dateRange={dateRange}
                onDateChange={onDateChange}
              />
            )}
            {currentStep === 3 && (
              <FinalReviewStep
                formData={formData}
                handleInputChange={handleInputChange}
                handleBackStep={handleBackStep}
                handleNextStep={handleNextStep}
                handleSubmitBooking={handleSubmitBooking}
                handleCustomerInfoChange={handleCustomerInfoChange}
                dateRange={dateRange}
                onDateChange={onDateChange}
              />
            )}
          </div>
          <div className="lg:col-span-1">
          <div className="mt-16">
            <BookingSummary formData={formData} dateRange={dateRange} />
          </div>
          </div>
        </div>
      </div>

      {showConfirmationModal && <ConfirmationModal />}
    </div>
  );
};

export default BookingPage;
