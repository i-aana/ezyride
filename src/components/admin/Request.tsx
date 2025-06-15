// import React, { useEffect, useState, useRef } from 'react';
// import { Edit } from 'lucide-react';
// import { supabase } from '../../utils/supabaseClient.ts';
// import BookingDetailsModal from './BookingDetailsModal';

// interface BookingRequest {
//   id: string;
//   full_name: string;
//   email: string;
//   phone: string;
//   special_request: string;
//   pickup_date: string;
//   return_date: string;
//   total_days: number;
//   total_price: number;
//   status: 'pending' | 'confirmed' | 'rejected';
// }

// const RequestsComponent = () => {
//   const [requests, setRequests] = useState<BookingRequest[]>([]);
//   const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'rejected'>('all');

//   const nonPendingRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     const { data, error } = await supabase
//       .from('bookings1')
//       .select('*')
//       .order('pickup_date', { ascending: false });

//     if (error) {
//       console.error('Error fetching bookings:', error);
//     } else {
//       setRequests(data as BookingRequest[]);
//     }
//   };

//   const handleViewDetails = (request: BookingRequest) => {
//     setSelectedRequest(request);
//     setShowModal(true);
//   };

//   const handleFilterChange = (status: 'all' | 'confirmed' | 'rejected') => {
//     setFilterStatus(status);
//     setTimeout(() => {
//       if (nonPendingRef.current) {
//         nonPendingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     }, 0);
//   };

//   const filteredRequests = filterStatus === 'all'
//     ? requests.filter((request) => request.status !== 'pending')
//     : requests.filter((request) => request.status === filterStatus);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Full Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Phone</th>
//               <th className="border px-4 py-2">Pickup Date</th>
//               <th className="border px-4 py-2">Return Date</th>
//               <th className="border px-4 py-2">Total Price</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests
//               .filter((request) => request.status === 'pending')
//               .map((request) => (
//                 <tr key={request.id}>
//                   <td className="border px-4 py-2">{request.full_name}</td>
//                   <td className="border px-4 py-2">{request.email}</td>
//                   <td className="border px-4 py-2">{request.phone}</td>
//                   <td className="border px-4 py-2">{request.pickup_date}</td>
//                   <td className="border px-4 py-2">{request.return_date}</td>
//                   <td className="border px-4 py-2">{request.total_price}</td>
//                   <td className="border px-4 py-2">
//                     <span className={`px-2 py-1 rounded text-white ${
//                       request.status === 'pending'
//                         ? 'bg-yellow-500'
//                         : request.status === 'confirmed'
//                         ? 'bg-green-500'
//                         : 'bg-red-500'
//                     }`}>
//                       {request.status}
//                     </span>
//                   </td>
//                   <td className="border px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleViewDetails(request)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <Edit className="inline w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Dropdown for filtering confirmed/rejected */}
//       <div className="mt-8">
//         <label className="font-medium mr-2">Filter:</label>
//         <select
//           value={filterStatus}
//           onChange={(e) => handleFilterChange(e.target.value as 'all' | 'confirmed' | 'rejected')}
//           className="border rounded px-2 py-1"
//         >
//           <option value="all">All</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>

//       <div className="mt-6 overflow-x-auto" ref={nonPendingRef}>
//         <table className="min-w-full table-auto border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Full Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Phone</th>
//               <th className="border px-4 py-2">Pickup Date</th>
//               <th className="border px-4 py-2">Return Date</th>
//               <th className="border px-4 py-2">Total Price</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRequests.map((request) => (
//               <tr key={request.id}>
//                 <td className="border px-4 py-2">{request.full_name}</td>
//                 <td className="border px-4 py-2">{request.email}</td>
//                 <td className="border px-4 py-2">{request.phone}</td>
//                 <td className="border px-4 py-2">{request.pickup_date}</td>
//                 <td className="border px-4 py-2">{request.return_date}</td>
//                 <td className="border px-4 py-2">{request.total_price}</td>
//                 <td className="border px-4 py-2">
//                   <span className={`px-2 py-1 rounded text-white ${
//                     request.status === 'pending'
//                       ? 'bg-yellow-500'
//                       : request.status === 'confirmed'
//                       ? 'bg-green-500'
//                       : 'bg-red-500'
//                   }`}>
//                     {request.status}
//                   </span>
//                 </td>
//                 <td className="border px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleViewDetails(request)}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     <Edit className="inline w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <BookingDetailsModal
//         request={selectedRequest}
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//       />
//     </div>
//   );
// };

// export default RequestsComponent;


import React, { useEffect, useState, useRef } from 'react';
import { Edit } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient.ts';
import BookingDetailsModal from './BookingDetailsModal';

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
}

const RequestsComponent = () => {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'rejected'>('all');
  const nonPendingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('bookings1')
      .select('*')
      .order('pickup_date', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
    } else {
      setRequests(data as BookingRequest[]);
    }
  };

  const handleViewDetails = (request: BookingRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleFilterChange = (status: 'all' | 'confirmed' | 'rejected') => {
    setFilterStatus(status);
    setTimeout(() => {
      if (nonPendingRef.current) {
        nonPendingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const handleStatusUpdate = (id: string, newStatus: 'confirmed' | 'rejected') => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const filteredRequests = filterStatus === 'all'
    ? requests.filter((request) => request.status !== 'pending')
    : requests.filter((request) => request.status === filterStatus);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>

      {/* Pending Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Pickup Date</th>
              <th className="border px-4 py-2">Return Date</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests
              .filter((request) => request.status === 'pending')
              .map((request) => (
                <tr key={request.id}>
                  <td className="border px-4 py-2">{request.full_name}</td>
                  <td className="border px-4 py-2">{request.email}</td>
                  <td className="border px-4 py-2">{request.phone}</td>
                  <td className="border px-4 py-2">{request.pickup_date}</td>
                  <td className="border px-4 py-2">{request.return_date}</td>
                  <td className="border px-4 py-2">{request.total_price}</td>
                  <td className="border px-4 py-2">
                    <span className={`px-2 py-1 rounded text-white ${
                      request.status === 'pending'
                        ? 'bg-yellow-500'
                        : request.status === 'confirmed'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="inline w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Filter Dropdown */}
      <div className="mt-8">
        <label className="font-medium mr-2">Filter:</label>
        <select
          value={filterStatus}
          onChange={(e) => handleFilterChange(e.target.value as 'all' | 'confirmed' | 'rejected')}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Filtered Confirmed/Rejected Table */}
      <div className="mt-6 overflow-x-auto" ref={nonPendingRef}>
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Pickup Date</th>
              <th className="border px-4 py-2">Return Date</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td className="border px-4 py-2">{request.full_name}</td>
                <td className="border px-4 py-2">{request.email}</td>
                <td className="border px-4 py-2">{request.phone}</td>
                <td className="border px-4 py-2">{request.pickup_date}</td>
                <td className="border px-4 py-2">{request.return_date}</td>
                <td className="border px-4 py-2">{request.total_price}</td>
                <td className="border px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white ${
                    request.status === 'pending'
                      ? 'bg-yellow-500'
                      : request.status === 'confirmed'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="inline w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingDetailsModal
        request={selectedRequest}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onStatusUpdate={fetchRequests}
      />
    </div>
  );
};

export default RequestsComponent;
