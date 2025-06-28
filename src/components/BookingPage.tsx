import React, { useState, useCallback } from 'react';
import { ArrowLeft, Calendar, Phone, Mail, CreditCard, Check, X } from 'lucide-react';
import RiderInfoStep from './RiderInfoStep';
import PaymentMethodStep from './PaymentStep';
import FinalReviewStep from './FinalReviewStep';
import { BookingState, CustomerInfo, DateRange } from '../types';
import BookingSummary from './BookingSummary';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient.ts';

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

  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 🔥 Prevent multiple submissions
  const [submitAttempted, setSubmitAttempted] = useState(false); // 🔥 Track if already submitted

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

  const handleInputChange = useCallback((field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
  }, [currentStep]);

  const handleBackStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  // 🔥 Optimized submission with proper loading states and duplicate prevention
  const handleSubmitBooking = useCallback(async () => {
    // Prevent multiple submissions
    if (isSubmitting || submitAttempted) {
      console.log('Submission already in progress or completed');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitAttempted(true);

      const fullName = `${formData.firstName} ${formData.lastName}`;

      // Update customer info
      handleCustomerInfoChange({
        fullName,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequest,
        pickupDate: dateRange.pickupDate,
        returnDate: dateRange.returnDate,
      });

      // Submit the booking
      await handleCustomerFormSubmit();

      // 🔥 Batch calendar updates for better performance
      if (dateRange.pickupDate && dateRange.returnDate) {
        const start = new Date(dateRange.pickupDate);
        const end = new Date(dateRange.returnDate);
        const datesToUpdate: string[] = [];

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          datesToUpdate.push(d.toISOString().split("T")[0]);
        }

        // Single batch update instead of multiple queries
        const { error: updateError } = await supabase
          .from("calendar_prices")
          .update({ status: "request" })
          .in("date", datesToUpdate);

        if (updateError) {
          console.error("Failed to update calendar_prices:", updateError);
          // Don't alert here, just log - the booking was still created
        }
      }

      // 🔥 If you need to store booking data in a separate table, add it here
      // Example: Store complete booking data with additional_miles set to 0
      const bookingData = {
        full_name: fullName,
        email: formData.email,
        phone: formData.phone,
        special_requests: formData.specialRequest,
        pickup_date: dateRange.pickupDate,
        return_date: dateRange.returnDate,
        additional_miles: 0, // 🔥 Always set to 0 for new bookings
        payment_method: formData.paymentMethod,
        voucher_code: formData.voucherCode,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Uncomment and modify table name as needed
      // const { error: bookingError } = await supabase
      //   .from("bookings") // Replace with your actual bookings table name
      //   .insert([bookingData]);

      // if (bookingError) {
      //   console.error("Failed to store booking data:", bookingError);
      // }

      // Generate confirmation ID
      const newRequestId = Math.floor(Math.random() * 9000000) + 1000000;
      setConfirmationData((prev) => ({
        ...prev,
        requestId: newRequestId.toString(),
      }));

      setShowConfirmationModal(true);

    } catch (error) {
      console.error('Booking submission error:', error);
      // Reset states on error to allow retry
      setIsSubmitting(false);
      setSubmitAttempted(false);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    submitAttempted,
    formData,
    dateRange,
    handleCustomerInfoChange,
    handleCustomerFormSubmit
  ]);

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Booking Confirmation</h3>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600"
          >
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
                handleNextStep={handleNextStep}
                handleBackStep={handleBackStep}
                setCurrentStep={setCurrentStep}
                dateRange={dateRange}
                onDateChange={onDateChange}
                formData={bookingState.customerInfo}
                handleInputChange={(field, value) => handleCustomerInfoChange({ [field]: value })}
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
                isSubmitting={isSubmitting} // 🔥 Pass loading state
                submitAttempted={submitAttempted} // 🔥 Pass submit state
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


// import React, { useState, useCallback } from 'react';
// import { ArrowLeft, Calendar, Phone, Mail, CreditCard, Check, X } from 'lucide-react';
// import RiderInfoStep from './RiderInfoStep';
// import PaymentMethodStep from './PaymentStep';
// import FinalReviewStep from './FinalReviewStep';
// import { BookingState, CustomerInfo, DateRange } from '../types';
// import BookingSummary from './BookingSummary';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../utils/supabaseClient.ts';

// interface BookingPageProps {
//   bookingState: BookingState;
//   handleCustomerFormSubmit: () => Promise<void>;
//   handleCustomerInfoChange: (info: Partial<CustomerInfo>) => void;
//   onDateChange: (field: keyof DateRange, value: Date | null) => void;
// }

// const BookingPage: React.FC<BookingPageProps> = ({
//   bookingState,
//   handleCustomerFormSubmit,
//   handleCustomerInfoChange,
//   onDateChange,
// }) => {
//   const { dateRange } = bookingState;
//   const navigate = useNavigate();

//   const [currentStep, setCurrentStep] = useState(1);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false); // 🔥 Prevent multiple submissions
//   const [submitAttempted, setSubmitAttempted] = useState(false); // 🔥 Track if already submitted

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     specialRequest: '',
//     agreeTerms: false,
//     paymentMethod: 'credit',
//     cardholderName: '',
//     cardNumber: '',
//     expirationMonth: '',
//     expirationYear: '',
//     securityCode: '',
//     voucherCode: '',
//     pickupDate: '',
//     returnDate: ''
//   });

//   const [confirmationData, setConfirmationData] = useState({
//     requestId: '1234567',
//     phone: '123-456-7890',
//     email: 'booking@ezyrideky.com'
//   });

//   const handleInputChange = useCallback((field: string, value: string | boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   const handleNextStep = useCallback(() => {
//     if (currentStep < 4) setCurrentStep(prev => prev + 1);
//   }, [currentStep]);

//   const handleBackStep = useCallback(() => {
//     if (currentStep > 1) setCurrentStep(prev => prev - 1);
//   }, [currentStep]);

//   // 🔥 Optimized submission with proper loading states and duplicate prevention
//   const handleSubmitBooking = useCallback(async () => {
//     // Prevent multiple submissions
//     if (isSubmitting || submitAttempted) {
//       console.log('Submission already in progress or completed');
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       setSubmitAttempted(true);

//       const fullName = `${formData.firstName} ${formData.lastName}`;

//       // Update customer info
//       handleCustomerInfoChange({
//         fullName,
//         email: formData.email,
//         phone: formData.phone,
//         specialRequests: formData.specialRequest,
//         pickupDate: dateRange.pickupDate,
//         returnDate: dateRange.returnDate,
//       });

//       // Submit the booking
//       await handleCustomerFormSubmit();

//       // 🔥 Batch calendar updates for better performance
//       if (dateRange.pickupDate && dateRange.returnDate) {
//         const start = new Date(dateRange.pickupDate);
//         const end = new Date(dateRange.returnDate);
//         const datesToUpdate: string[] = [];

//         for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//           datesToUpdate.push(d.toISOString().split("T")[0]);
//         }

//         // Single batch update instead of multiple queries
//         const { error: updateError } = await supabase
//           .from("calendar_prices")
//           .update({ status: "request" })
//           .in("date", datesToUpdate);

//         if (updateError) {
//           console.error("Failed to update calendar_prices:", updateError);
//           // Don't alert here, just log - the booking was still created
//         }
//       }

//       // Generate confirmation ID
//       const newRequestId = Math.floor(Math.random() * 9000000) + 1000000;
//       setConfirmationData((prev) => ({
//         ...prev,
//         requestId: newRequestId.toString(),
//       }));

//       setShowConfirmationModal(true);

//     } catch (error) {
//       console.error('Booking submission error:', error);
//       // Reset states on error to allow retry
//       setIsSubmitting(false);
//       setSubmitAttempted(false);
//       alert('Failed to submit booking. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [
//     isSubmitting,
//     submitAttempted,
//     formData,
//     dateRange,
//     handleCustomerInfoChange,
//     handleCustomerFormSubmit
//   ]);

//   const ConfirmationModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-md w-full p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Booking Confirmation</h3>
//           <button 
//             onClick={() => navigate('/')}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="text-center space-y-4">
//           <div className="flex justify-center mb-4">
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//               <Check className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//           <p className="text-gray-700">Thank you for your interest! The host will reach out shortly.</p>
//           <p className="font-medium">Request Confirmation # {confirmationData.requestId}</p>
//           <div className="flex items-center justify-center gap-2 text-blue-600">
//             <Phone className="w-4 h-4" />
//             <span>{confirmationData.phone}</span>
//           </div>
//           <div className="flex items-center justify-center gap-2 text-blue-600">
//             <Mail className="w-4 h-4" />
//             <span>{confirmationData.email}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             {currentStep === 1 && (
//               <RiderInfoStep
//                 handleNextStep={handleNextStep}
//                 handleBackStep={handleBackStep}
//                 setCurrentStep={setCurrentStep}
//                 dateRange={dateRange}
//                 onDateChange={onDateChange}
//                 formData={bookingState.customerInfo}
//                 handleInputChange={(field, value) => handleCustomerInfoChange({ [field]: value })}
//               />
//             )}
//             {currentStep === 2 && (
//               <PaymentMethodStep
//                 formData={formData}
//                 handleInputChange={handleInputChange}
//                 handleBackStep={handleBackStep}
//                 handleNextStep={handleNextStep}
//                 dateRange={dateRange}
//                 onDateChange={onDateChange}
//               />
//             )}
//             {currentStep === 3 && (
//               <FinalReviewStep
//                 formData={formData}
//                 handleInputChange={handleInputChange}
//                 handleBackStep={handleBackStep}
//                 handleNextStep={handleNextStep}
//                 handleSubmitBooking={handleSubmitBooking}
//                 handleCustomerInfoChange={handleCustomerInfoChange}
//                 dateRange={dateRange}
//                 onDateChange={onDateChange}
//                 isSubmitting={isSubmitting} // 🔥 Pass loading state
//                 submitAttempted={submitAttempted} // 🔥 Pass submit state
//               />
//             )}
//           </div>
//           <div className="lg:col-span-1">
//             <div className="mt-16">
//               <BookingSummary formData={formData} dateRange={dateRange} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {showConfirmationModal && <ConfirmationModal />}
//     </div>
//   );
// };

// export default BookingPage;