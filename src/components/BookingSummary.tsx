// import React from 'react';
// import { DateRange } from '../types';

// interface BookingSummaryProps {
//   formData: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     specialRequest: string;
//     agreeTerms: boolean;
//     paymentMethod: string;
//     cardholderName: string;
//     cardNumber: string;
//     expirationMonth: string;
//     expirationYear: string;
//     securityCode: string;
//     voucherCode: string;
//     pickupDate: string;
//     returnDate: string;
//   };
//   dateRange: DateRange;
// }

// const BookingSummary: React.FC<BookingSummaryProps> = ({ formData, dateRange }) => (
//   <div className="bg-gray-50 p-6 rounded-lg">
//     <h3 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h3>
//     <div className="space-y-4">
//       <div className="flex justify-between">
//         <span>Pickup Date</span>
//         <span>{dateRange.pickupDate instanceof Date ? dateRange.pickupDate.toLocaleDateString() : 'Not selected'}</span>
//       </div>
//       <div className="flex justify-between">
//         <span>Return Date</span>
//         <span>{dateRange.returnDate instanceof Date ? dateRange.returnDate.toLocaleDateString() : 'Not selected'}</span>
//       </div>
//       <div><strong>Pickup Location:</strong> 231 Morgantown Rd</div>
//       <div className="border-t pt-4">
//         <h4 className="font-medium mb-2 text-gray-700">Cost Details</h4>
//         {/* Cost breakdown (static for now) */}
//         <div className="flex justify-between"><span>$200.00 x 2 nights</span><span>$400.00</span></div>
//         <div className="flex justify-between"><span>$210.00 x 2 nights</span><span>$420.00</span></div>
//         <div className="flex justify-between"><span>Insurance Coverage</span><span>$120.00</span></div>
//         <div className="flex justify-between"><span>Service Fee</span><span>$50.00</span></div>
//         <div className="flex justify-between"><span>800 miles included</span><span>$0.00</span></div>
//         <div className="text-xs text-gray-500">* Additional Miles 0.50/mile</div>
//         <div className="flex justify-between border-t pt-2"><span>Deposit</span><span>$200.00</span></div>
//         <div className="flex justify-between font-semibold text-lg border-t pt-2"><span>Total Cost</span><span>$1190.00</span></div>
//       </div>
//     </div>
//   </div>
// );

// export default BookingSummary;
import React, { useEffect, useState } from 'react';
import { DateRange } from '../types';
import { supabase } from '../utils/supabaseClient';
// import { eachDayOfInterval, format } from 'date-fns';
import { fetchTotalPrice } from '../utils/priceCalculator';


interface BookingSummaryProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequest: string;
    agreeTerms: boolean;
    paymentMethod: string;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    securityCode: string;
    voucherCode: string;
    pickupDate: string;
    returnDate: string;
  };
  dateRange: DateRange;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ formData, dateRange }) => {
  const [costDetails, setCostDetails] = useState({
    baseTotal: 0,
    insurance: 0,
    serviceFee: 0,
    extraMilesFee: 0,
    deposit: 0,
    total: 0,
    baseRate: 0,
    baseDays: 0
  });

  useEffect(() => {
    const loadCosts = async () => {
      if (!dateRange.pickupDate || !dateRange.returnDate) return;
      const result = await fetchTotalPrice(dateRange.pickupDate, dateRange.returnDate);
      if (result) setCostDetails(result);
    };

    loadCosts();
  }, [dateRange]);
  if (!costDetails) return <p className="text-sm text-gray-500">Loading cost details...</p>;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Pickup Date</span>
          <span>{dateRange.pickupDate instanceof Date ? dateRange.pickupDate.toLocaleDateString() : 'Not selected'}</span>
        </div>
        <div className="flex justify-between">
          <span>Return Date</span>
          <span>{dateRange.returnDate instanceof Date ? dateRange.returnDate.toLocaleDateString() : 'Not selected'}</span>
        </div>
        <div><strong>Pickup Location:</strong> 231 Morgantown Rd</div>
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2 text-gray-700">Cost Details</h4>
          <div className="flex justify-between">
          <span>Base Price ({`$${costDetails.baseRate.toFixed(2)} x ${costDetails.baseDays} nights`})</span>
          <span>${costDetails.baseTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Insurance Coverage</span>
            <span>${costDetails.insurance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>${costDetails.serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>{costDetails.milesIncluded} miles included</span>
            <span>$0.00</span>
          </div>
          <div className="text-xs text-gray-500">* Additional Miles {costDetails.extraMilesFee.toFixed(2)}/mile</div>
          <div className="flex justify-between border-t pt-2">
            <span>Deposit</span>
            <span>${costDetails.deposit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total Cost</span>
            <span>${costDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
