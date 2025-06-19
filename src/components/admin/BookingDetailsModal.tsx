// import React from 'react';
// import {
//   Calendar,
//   DollarSign,
//   FileText,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Edit,
//   Eye,
//   Check,
//   X,
// } from 'lucide-react';
// import { supabase } from '../../utils/supabaseClient.ts'; // Adjust path if needed

// const BookingDetailsModal = ({ request, isOpen, onClose }) => {
//   if (!isOpen || !request) return null;

//   const handleUpdateStatus = async (newStatus) => {
//     try {
//       const { error } = await supabase
//         .from('bookings1') // Table name in Supabase
//         .update({ status: newStatus })
//         .eq('id', request.id); // Assuming each request has a unique `id`

//       if (error) {
//         console.error('Error updating status:', error.message);
//         alert('Failed to update request status');
//         return;
//       }

//       alert(`Request ${newStatus}!`);
//       onClose();
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
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Left Side - Rider Info */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Rider Info</h3>
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={request.full_name}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email*
//                   </label>
//                   <input
//                     type="email"
//                     value={request.email || ''}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone*
//                   </label>
//                   <input
//                     type="tel"
//                     value={request.phone || ''}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Special Request (Optional)
//                   </label>
//                   <textarea
//                     value={request.special_request || ''}
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                     rows="3"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Booking Summary */}
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span>Pickup Date</span>
//                   <span>{request.pickup_date || '-'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Return Date</span>
//                   <span>{request.return_date || '-'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Pickup Location</span>
//                   <span>{request.pickup_location || '-'}</span>
//                 </div>
//                 <hr />
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>$200.00 x 2 nights</span>
//                     <span>$820.00</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>$210.00 x 2 nights</span>
//                     <span></span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Insurance Coverage</span>
//                     <span>$120.00</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Service Fee</span>
//                     <span>$50.00</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>800 miles included for this trip</span>
//                     <span>$0.00</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>**Additional Miles 0.50/mile at drop off</span>
//                     <span></span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Deposit</span>
//                     <span>$200.00</span>
//                   </div>
//                   <hr />
//                   <div className="flex justify-between font-semibold">
//                     <span>Total Cost</span>
//                     <span>
//                       $
//                       {request.total_price
//                         ? request.total_price.toFixed(2)
//                         : '0.00'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Accept / Decline Buttons */}
//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               onClick={() => handleUpdateStatus('rejected')}
//               className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
//             >
//               Decline
//             </button>
//             <button
//               onClick={() => handleUpdateStatus('accepted')}
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
import React from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

interface BookingRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  special_request: string;
  pickup_date: string;
  return_date: string;
  total_days: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'rejected';
  pickup_location?: string;
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

      // Send confirmation/rejection email via Supabase Edge Function
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
      } else {
        console.log('Status email sent successfully');
      }

      alert(`Request ${newStatus}!`);
      onClose();
      if (onStatusUpdate) onStatusUpdate();
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Request Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
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
                    value={request.special_request || ''}
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
                <hr />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>${request.total_price / request.total_days} x {request.total_days} nights</span>
                    <span>${request.total_price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Coverage</span>
                    <span>$120.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>$50.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deposit</span>
                    <span>$200.00</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-black">
                    <span>Total Cost</span>
                    <span>${request.total_price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
