// import React, { useEffect, useState } from 'react';
// import { X, Printer } from 'lucide-react';
// import { supabase } from '../../utils/supabaseClient';
// import { fetchTotalPrice } from '../../utils/PriceCalculator.ts';
// import { parseISO } from 'date-fns';

// interface BookingRequest {
//   id: string;
//   full_name: string;
//   email: string;
//   phone: string;
//   special_requests: string;
//   pickup_date: string;
//   return_date: string;
//   total_days: number;
//   total_price: number;
//   status: 'pending' | 'confirmed' | 'rejected';
//   pickup_location?: string;
// }

// interface BookingDetailsModalProps {
//   request: BookingRequest | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onStatusUpdate?: () => void;
// }

// const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
//   request,
//   isOpen,
//   onClose,
//   onStatusUpdate,
// }) => {
//   const [costDetails, setCostDetails] = useState({
//     baseTotal: 0,
//     insurance: 0,
//     serviceFee: 0,
//     deposit: 0,
//     extraMilesFee: 0,
//     total: 0,
//     baseRate: 0,
//     baseDays: 0,
//   });

//   useEffect(() => {
//     const loadCostDetails = async () => {
//       if (!request?.pickup_date || !request?.return_date) return;
//       try {
//         const pickupDate = parseISO(request.pickup_date);
//         const returnDate = parseISO(request.return_date);
//         const cost = await fetchTotalPrice(pickupDate, returnDate);
//         setCostDetails(cost);
//       } catch (err) {
//         console.error('Error loading cost details:', err);
//       }
//     };
//     loadCostDetails();
//   }, [request]);

//   const handlePrint = () => {
//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Booking Details - ${request?.full_name}</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               margin: 20px;
//               color: #333;
//             }
//             .header {
//               text-align: center;
//               border-bottom: 2px solid #333;
//               padding-bottom: 20px;
//               margin-bottom: 30px;
//             }
//             .section {
//               margin-bottom: 30px;
//             }
//             .section-title {
//               font-size: 18px;
//               font-weight: bold;
//               margin-bottom: 15px;
//               color: #2563eb;
//             }
//             .info-row {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 8px;
//               padding: 5px 0;
//             }
//             .info-label {
//               font-weight: 600;
//             }
//             .cost-breakdown {
//               border: 1px solid #ddd;
//               padding: 15px;
//               border-radius: 5px;
//               background-color: #f9f9f9;
//             }
//             .cost-row {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 5px;
//             }
//             .total-row {
//               border-top: 2px solid #333;
//               padding-top: 10px;
//               margin-top: 10px;
//               font-weight: bold;
//               font-size: 16px;
//             }
//             .status-badge {
//               display: inline-block;
//               padding: 4px 12px;
//               border-radius: 20px;
//               font-size: 12px;
//               font-weight: bold;
//               text-transform: uppercase;
//             }
//             .status-pending { background-color: #fef3c7; color: #92400e; }
//             .status-confirmed { background-color: #d1fae5; color: #065f46; }
//             .status-rejected { background-color: #fee2e2; color: #991b1b; }
//             @media print {
//               body { margin: 0; }
//               .no-print { display: none; }
//             }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>Booking Request Details</h1>
//             <p>Booking ID: ${request?.id}</p>
//             <span class="status-badge status-${request?.status}">${request?.status}</span>
//           </div>
          
//           <div class="section">
//             <div class="section-title">Customer Information</div>
//             <div class="info-row">
//               <span class="info-label">Full Name:</span>
//               <span>${request?.full_name}</span>
//             </div>
//             <div class="info-row">
//               <span class="info-label">Email:</span>
//               <span>${request?.email}</span>
//             </div>
//             <div class="info-row">
//               <span class="info-label">Phone:</span>
//               <span>${request?.phone}</span>
//             </div>
//             <div class="info-row">
//               <span class="info-label">Special Request:</span>
//               <span>${request?.special_requests?.trim() ? request.special_requests : 'None'}</span>
//             </div>
//           </div>

//           <div class="section">
//             <div class="section-title">Booking Details</div>
//             <div class="info-row">
//               <span class="info-label">Pickup Date:</span>
//               <span>${request?.pickup_date}</span>
//             </div>
//             <div class="info-row">
//               <span class="info-label">Return Date:</span>
//               <span>${request?.return_date}</span>
//             </div>
//             <div class="info-row">
//               <span class="info-label">Pickup Location:</span>
//               <span>231 Morgantown Road</span>
//             </div>
//             <div class="info-row">
//               <span class="info-label">Total Days:</span>
//               <span>${costDetails.baseDays} nights</span>
//             </div>
//           </div>

//           <div class="section">
//             <div class="section-title">Cost Breakdown</div>
//             <div class="cost-breakdown">
//               <div class="cost-row">
//                 <span>$${costDetails.baseRate.toFixed(2)} x ${costDetails.baseDays} nights</span>
//                 <span>$${costDetails.baseTotal.toFixed(2)}</span>
//               </div>
//               <div class="cost-row">
//                 <span>Insurance Coverage</span>
//                 <span>$${costDetails.insurance.toFixed(2)}</span>
//               </div>
//               <div class="cost-row">
//                 <span>Service Fee</span>
//                 <span>$${costDetails.serviceFee.toFixed(2)}</span>
//               </div>
//               <div class="cost-row">
//                 <span>Deposit</span>
//                 <span>$${costDetails.deposit.toFixed(2)}</span>
//               </div>
//               <div class="cost-row">
//                 <span style="font-size: 12px; color: #666;">Additional Miles: $${costDetails.extraMilesFee.toFixed(2)}/mile</span>
//                 <span></span>
//               </div>
//               <div class="cost-row total-row">
//                 <span>Total Cost</span>
//                 <span>$${costDetails.total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div class="section">
//             <p style="text-align: center; color: #666; font-size: 12px;">
//               Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
//             </p>
//           </div>
//         </body>
//       </html>
//     `;

//     const printWindow = window.open('', '_blank');
//     if (printWindow) {
//       printWindow.document.write(printContent);
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//     }
//   };

//   if (!isOpen || !request) return null;

//   const handleUpdateStatus = async (newStatus: 'confirmed' | 'rejected') => {
//     try {
//       const { error } = await supabase
//         .from('bookings1')
//         .update({ status: newStatus })
//         .eq('id', request.id);

//       if (error) {
//         console.error('Error updating status:', error.message);
//         alert('Failed to update request status');
//         return;
//       }

//       const pickupDate = new Date(request.pickup_date);
//       const returnDate = new Date(request.return_date);
//       const datesToUpdate: string[] = [];

//       for (let d = new Date(pickupDate); d <= returnDate; d.setDate(d.getDate() + 1)) {
//         datesToUpdate.push(d.toISOString().split('T')[0]);
//       }

//       if (newStatus === 'confirmed') {
//         const { error: calError } = await supabase
//           .from('calendar_prices')
//           .update({ status: 'booked', is_available: false })
//           .in('date', datesToUpdate);

//         if (calError) {
//           console.error('Error updating calendar:', calError.message);
//           alert('Failed to update calendar');
//           return;
//         }
//       }

//       if (newStatus === 'rejected') {
//         const { data: overlappingBookings, error: bookingError } = await supabase
//           .from('bookings1')
//           .select('id, pickup_date, return_date, status')
//           .or('status.eq.pending,status.eq.confirmed')
//           .neq('id', request.id);

//         if (bookingError) {
//           console.error('Error checking bookings:', bookingError.message);
//         } else {
//           const hasOtherRequests = datesToUpdate.some((dateStr) =>
//             overlappingBookings.some((booking) => {
//               const start = new Date(booking.pickup_date);
//               const end = new Date(booking.return_date);
//               const current = new Date(dateStr);
//               return current >= start && current <= end;
//             })
//           );

//           if (!hasOtherRequests) {
//             const { error: calendarUpdateError } = await supabase
//               .from('calendar_prices')
//               .update({ is_available: true, status: 'available' })
//               .in('date', datesToUpdate);

//             if (calendarUpdateError) {
//               console.error('Failed to update calendar:', calendarUpdateError.message);
//             }
//           }
//         }
//       }

//       const res = await fetch('https://znujbwmnpanlhwxgwlhm.supabase.co/functions/v1/send-status-update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
//         },
//         body: JSON.stringify({
//           fullName: request.full_name,
//           email: request.email,
//           status: newStatus,
//         }),
//       });

//       if (!res.ok) {
//         console.error('Failed to send status email:', await res.text());
//       }

//       alert(`Request ${newStatus}!`);
//       onClose();
//       if (onStatusUpdate) onStatusUpdate();

//     } catch (err) {
//       console.error('Unexpected error:', err);
//       alert('Something went wrong');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Request Details</h2>
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={handlePrint}
//                 className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
//                 title="Print booking details"
//               >
//                 <Printer className="w-5 h-5" />
//               </button>
//               <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Rider Info</h3>
//               <div className="space-y-3">
//                 {[{ label: 'Full Name', value: request.full_name }, { label: 'Email', value: request.email }, { label: 'Phone', value: request.phone }].map(({ label, value }) => (
//                   <div key={label}>
//                     <label className="block text-sm font-medium text-gray-700">{label}</label>
//                     <input
//                       type="text"
//                       value={value}
//                       readOnly
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                     />
//                   </div>
//                 ))}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Special Request</label>
//                   <textarea
//                     value={request.special_requests?.trim() ? request.special_requests : 'none'}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                     rows={3}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
//               <div className="space-y-3">
//                 {[['Pickup Date', request.pickup_date], ['Return Date', request.return_date], ['Pickup Location', '231 Morgantown Road']].map(([label, value]) => (
//                   <div className="flex justify-between" key={label}>
//                     <span>{label}</span>
//                     <span>{value}</span>
//                   </div>
//                 ))}
//                 <hr />
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <div className="flex justify-between">
//                     <span>${costDetails.baseRate.toFixed(2)} x {costDetails.baseDays} nights</span>
//                     <span>${costDetails.baseTotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Insurance Coverage</span>
//                     <span>${costDetails.insurance.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Service Fee</span>
//                     <span>${costDetails.serviceFee.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Deposit</span>
//                     <span>${costDetails.deposit.toFixed(2)}</span>
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     * Additional Miles {costDetails.extraMilesFee.toFixed(2)}/mile
//                   </div>
//                   <hr />
//                   <div className="flex justify-between font-semibold text-black">
//                     <span>Total Cost</span>
//                     <span>${costDetails.total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               onClick={() => handleUpdateStatus('rejected')}
//               className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
//             >
//               Decline
//             </button>
//             <button
//               onClick={() => handleUpdateStatus('confirmed')}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Accept
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsModal;
import React, { useEffect, useState } from 'react';
import { X, Printer, Plus, Minus } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { fetchTotalPrice } from '../../utils/PriceCalculator.ts';
import { parseISO } from 'date-fns';

interface BookingRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  special_requests: string;
  pickup_date: string;
  return_date: string;
  total_days: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'rejected';
  pickup_location?: string;
  additional_miles?: number;
}

interface BookingDetailsModalProps {
  request: BookingRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate?: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  request,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  const [costDetails, setCostDetails] = useState({
    baseTotal: 0,
    insurance: 0,
    serviceFee: 0,
    deposit: 0,
    extraMilesFee: 0,
    total: 0,
    baseRate: 0,
    baseDays: 0,
  });

  const [showMilesSetter, setShowMilesSetter] = useState(false);
  const [additionalMiles, setAdditionalMiles] = useState(0);
  const [databaseMiles, setDatabaseMiles] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [extraMilesCost, setExtraMilesCost] = useState(0); // 🔥 State for extra miles cost from DB

  // Company logo URL - replace with your actual logo URL
  const COMPANY_LOGO_URL = "EzyRide.png";

  // 🔥 Fetch extra miles cost from extracosts table
  useEffect(() => {
    const fetchExtraMilesCost = async () => {
      try {
        const { data, error } = await supabase
          .from('extra_costs')
          .select('extra_miles_fee')
          .single(); // Assuming there's only one row

        if (error) {
          console.error('Error fetching extra miles cost:', error);
          return;
        }

        const cost = data?.extra_miles_fee || 0;
        setExtraMilesCost(cost);
      } catch (err) {
        console.error('Error fetching extra miles cost:', err);
      }
    };

    fetchExtraMilesCost();
  }, []);

  // 🔥 Fetch additional miles from database when modal opens
  useEffect(() => {
    const fetchAdditionalMiles = async () => {
      if (!request?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('bookings1')
          .select('additional_miles')
          .eq('id', request.id)
          .single();

        if (error) {
          console.error('Error fetching additional miles:', error);
          return;
        }

        const miles = data?.additional_miles || 0;
        setDatabaseMiles(miles);
        setAdditionalMiles(miles);
      } catch (err) {
        console.error('Error fetching additional miles:', err);
      }
    };

    if (isOpen && request) {
      fetchAdditionalMiles();
    }
  }, [request?.id, isOpen]);

  useEffect(() => {
    const loadCostDetails = async () => {
      if (!request?.pickup_date || !request?.return_date) return;
      try {
        const pickupDate = parseISO(request.pickup_date);
        const returnDate = parseISO(request.return_date);
        const cost = await fetchTotalPrice(pickupDate, returnDate);
        
        // 🔥 Update cost details with extraMilesCost from database
        const updatedCostDetails = {
          ...cost,
          extraMilesFee: extraMilesCost // Use the cost from extracosts table
        };
        
        setCostDetails(updatedCostDetails);
        
        // Calculate final total including additional miles from database
        const milesTotal = databaseMiles * extraMilesCost;
        setFinalTotal(updatedCostDetails.total + milesTotal);
      } catch (err) {
        console.error('Error loading cost details:', err);
      }
    };
    
    // Only load cost details if we have the extra miles cost
    if (extraMilesCost > 0) {
      loadCostDetails();
    }
  }, [request, databaseMiles, extraMilesCost]);

  const handleAdditionalMilesUpdate = async () => {
    try {
      const { error } = await supabase
        .from('bookings1')
        .update({ additional_miles: additionalMiles })
        .eq('id', request?.id);

      if (error) {
        console.error('Error updating additional miles:', error.message);
        alert('Failed to update additional miles');
        return;
      }

      // Update local state to reflect database change
      setDatabaseMiles(additionalMiles);
      alert('Additional miles updated successfully!');
      setShowMilesSetter(false);
      if (onStatusUpdate) onStatusUpdate();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong');
    }
  };

  const handlePrint = () => {
    const currentAdditionalMiles = databaseMiles;
    const additionalMilesTotal = currentAdditionalMiles * extraMilesCost; // 🔥 Use extraMilesCost from DB
    const printTotal = costDetails.total + additionalMilesTotal;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Details - ${request?.full_name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .company-logo {
              max-width: 200px;
              max-height: 80px;
              margin-bottom: 20px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              color: #2563eb;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              padding: 5px 0;
            }
            .info-label {
              font-weight: 600;
            }
            .cost-breakdown {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .cost-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .total-row {
              border-top: 2px solid #333;
              padding-top: 10px;
              margin-top: 10px;
              font-weight: bold;
              font-size: 16px;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
            }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .status-confirmed { background-color: #d1fae5; color: #065f46; }
            .status-rejected { background-color: #fee2e2; color: #991b1b; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${COMPANY_LOGO_URL}" alt="Company Logo" class="company-logo" />
            <h1>Booking Request Details</h1>
            <p>Booking ID: ${request?.id}</p>
            <span class="status-badge status-${request?.status}">${request?.status}</span>
          </div>
          
          <div class="section">
            <div class="section-title">Customer Information</div>
            <div class="info-row">
              <span class="info-label">Full Name:</span>
              <span>${request?.full_name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span>${request?.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span>${request?.phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Special Request:</span>
              <span>${request?.special_requests?.trim() ? request.special_requests : 'None'}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Booking Details</div>
            <div class="info-row">
              <span class="info-label">Pickup Date:</span>
              <span>${request?.pickup_date}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Return Date:</span>
              <span>${request?.return_date}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Pickup Location:</span>
              <span>231 Morgantown Road</span>
            </div>
            <div class="info-row">
              <span class="info-label">Total Days:</span>
              <span>${costDetails.baseDays} nights</span>
            </div>
            ${currentAdditionalMiles > 0 ? `
            <div class="info-row">
              <span class="info-label">Additional Miles:</span>
              <span>${currentAdditionalMiles} miles</span>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <div class="section-title">Cost Breakdown</div>
            <div class="cost-breakdown">
              <div class="cost-row">
                <span>$${costDetails.baseRate.toFixed(2)} x ${costDetails.baseDays} nights</span>
                <span>$${costDetails.baseTotal.toFixed(2)}</span>
              </div>
              <div class="cost-row">
                <span>Insurance Coverage</span>
                <span>$${costDetails.insurance.toFixed(2)}</span>
              </div>
              <div class="cost-row">
                <span>Service Fee</span>
                <span>$${costDetails.serviceFee.toFixed(2)}</span>
              </div>
              <div class="cost-row">
                <span>Deposit</span>
                <span>$${costDetails.deposit.toFixed(2)}</span>
              </div>
              ${currentAdditionalMiles > 0 ? `
              <div class="cost-row">
                <span>Additional Miles (${currentAdditionalMiles} x $${extraMilesCost.toFixed(2)})</span>
                <span>$${additionalMilesTotal.toFixed(2)}</span>
              </div>
              ` : `
              <div class="cost-row">
                <span style="font-size: 12px; color: #666;">Additional Miles Rate: $${extraMilesCost.toFixed(2)}/mile</span>
                <span></span>
              </div>
              `}
              <div class="cost-row total-row">
                <span>Total Cost</span>
                <span>$${printTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="section">
            <p style="text-align: center; color: #666; font-size: 12px;">
              Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  if (!isOpen || !request) return null;

  const handleUpdateStatus = async (newStatus: 'confirmed' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('bookings1')
        .update({ status: newStatus })
        .eq('id', request.id);

      if (error) {
        console.error('Error updating status:', error.message);
        alert('Failed to update request status');
        return;
      }

      const pickupDate = new Date(request.pickup_date);
      const returnDate = new Date(request.return_date);
      const datesToUpdate: string[] = [];

      for (let d = new Date(pickupDate); d <= returnDate; d.setDate(d.getDate() + 1)) {
        datesToUpdate.push(d.toISOString().split('T')[0]);
      }

      if (newStatus === 'confirmed') {
        const { error: calError } = await supabase
          .from('calendar_prices')
          .update({ status: 'booked', is_available: false })
          .in('date', datesToUpdate);

        if (calError) {
          console.error('Error updating calendar:', calError.message);
          alert('Failed to update calendar');
          return;
        }
      }

      if (newStatus === 'rejected') {
        const { data: overlappingBookings, error: bookingError } = await supabase
          .from('bookings1')
          .select('id, pickup_date, return_date, status')
          .or('status.eq.pending,status.eq.confirmed')
          .neq('id', request.id);

        if (bookingError) {
          console.error('Error checking bookings:', bookingError.message);
        } else {
          const hasOtherRequests = datesToUpdate.some((dateStr) =>
            overlappingBookings.some((booking) => {
              const start = new Date(booking.pickup_date);
              const end = new Date(booking.return_date);
              const current = new Date(dateStr);
              return current >= start && current <= end;
            })
          );

          if (!hasOtherRequests) {
            const { error: calendarUpdateError } = await supabase
              .from('calendar_prices')
              .update({ is_available: true, status: 'available' })
              .in('date', datesToUpdate);

            if (calendarUpdateError) {
              console.error('Failed to update calendar:', calendarUpdateError.message);
            }
          }
        }
      }

      const res = await fetch('https://znujbwmnpanlhwxgwlhm.supabase.co/functions/v1/send-status-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          fullName: request.full_name,
          email: request.email,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        console.error('Failed to send status email:', await res.text());
      }

      alert(`Request ${newStatus}!`);
      onClose();
      if (onStatusUpdate) onStatusUpdate();

    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong');
    }
  };

  // 🔥 Use extraMilesCost from database for all calculations
  const currentAdditionalMiles = databaseMiles;
  const additionalMilesTotal = currentAdditionalMiles * extraMilesCost;
  const displayTotal = costDetails.total + additionalMilesTotal;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Request Details</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrint}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                title="Print booking details"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Rider Info</h3>
              <div className="space-y-3">
                {[{ label: 'Full Name', value: request.full_name }, { label: 'Email', value: request.email }, { label: 'Phone', value: request.phone }].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type="text"
                      value={value}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Request</label>
                  <textarea
                    value={request.special_requests?.trim() ? request.special_requests : 'none'}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-3">
                {[['Pickup Date', request.pickup_date], ['Return Date', request.return_date], ['Pickup Location', '231 Morgantown Road']].map(([label, value]) => (
                  <div className="flex justify-between" key={label}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
                
                {/* Additional Miles Display - Show for all confirmed bookings */}
                {request.status === 'confirmed' && (
                  <div className="flex justify-between items-center">
                    <span>Additional Miles</span>
                    <div className="flex items-center space-x-2">
                      <span>{currentAdditionalMiles} miles</span>
                      <button
                        onClick={() => {setAdditionalMiles(currentAdditionalMiles); setShowMilesSetter(true);}}
                        className="text-blue-500 hover:text-blue-700 text-sm underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                )}

                <hr />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>${costDetails.baseRate.toFixed(2)} x {costDetails.baseDays} nights</span>
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
                    <span>Deposit</span>
                    <span>${costDetails.deposit.toFixed(2)}</span>
                  </div>
                  
                  {/* Additional Miles Cost */}
                  {currentAdditionalMiles > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Miles ({currentAdditionalMiles} x ${extraMilesCost.toFixed(2)})</span>
                      <span>${additionalMilesTotal.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {currentAdditionalMiles === 0 && (
                    <div className="text-xs text-gray-500">
                      * Additional Miles Rate: ${extraMilesCost.toFixed(2)}/mile
                    </div>
                  )}
                  
                  <hr />
                  <div className="flex justify-between font-semibold text-black">
                    <span>Total Cost</span>
                    <span>${displayTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Miles Setter Modal */}
          {showMilesSetter && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Set Additional Miles</h3>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <button
                    onClick={() => setAdditionalMiles(Math.max(0, additionalMiles - 1))}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <input
                      type="number"
                      value={additionalMiles}
                      onChange={(e) => setAdditionalMiles(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-20 text-center text-xl font-semibold border border-gray-300 rounded px-2 py-1"
                      min="0"
                    />
                    <p className="text-sm text-gray-500 mt-1">miles</p>
                  </div>
                  <button
                    onClick={() => setAdditionalMiles(additionalMiles + 1)}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Cost: ${(additionalMiles * extraMilesCost).toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold">
                    New Total: ${(costDetails.total + (additionalMiles * extraMilesCost)).toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowMilesSetter(false)}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdditionalMilesUpdate}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            {/* Show Accept/Decline for both pending AND rejected status */}
            {(request.status === 'pending') && (
              <>
                <button
                  onClick={() => handleUpdateStatus('rejected')}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleUpdateStatus('confirmed')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Accept
                </button>
              </>
            )}
            {request.status === 'rejected' && (
              <button
                onClick={() => handleUpdateStatus('confirmed')}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Accept
              </button>
            )}
            
            {/* Show Additional Miles and Decline for confirmed bookings */}
            {request.status === 'confirmed' && (
              <>
                <button
                  onClick={() => handleUpdateStatus('rejected')}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Decline
                </button>
                <button
                  onClick={() => {setAdditionalMiles(currentAdditionalMiles); setShowMilesSetter(true);}}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Additional Miles
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;