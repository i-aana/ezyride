import React, { useEffect, useState, useRef } from 'react';
import { Edit, Search, Calendar, X } from 'lucide-react';
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
  const [searchName, setSearchName] = useState('');
  const [pickupDateFrom, setPickupDateFrom] = useState('');
  const [pickupDateTo, setPickupDateTo] = useState('');
  const [returnDateFrom, setReturnDateFrom] = useState('');
  const [returnDateTo, setReturnDateTo] = useState('');
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

  const clearFilters = () => {
    setSearchName('');
    setPickupDateFrom('');
    setPickupDateTo('');
    setReturnDateFrom('');
    setReturnDateTo('');
    setFilterStatus('all');
  };

  // Filter function for both pending and non-pending requests
  const filterRequests = (requestList: BookingRequest[]) => {
    return requestList.filter((request) => {
      // Name search filter
      const matchesName = searchName === '' || 
        request.full_name.toLowerCase().includes(searchName.toLowerCase());

      // Pickup date filter
      const matchesPickupDate = 
        (pickupDateFrom === '' || new Date(request.pickup_date) >= new Date(pickupDateFrom)) &&
        (pickupDateTo === '' || new Date(request.pickup_date) <= new Date(pickupDateTo));

      // Return date filter
      const matchesReturnDate = 
        (returnDateFrom === '' || new Date(request.return_date) >= new Date(returnDateFrom)) &&
        (returnDateTo === '' || new Date(request.return_date) <= new Date(returnDateTo));

      return matchesName && matchesPickupDate && matchesReturnDate;
    });
  };

  const filteredPendingRequests = filterRequests(
    requests.filter((request) => request.status === 'pending')
  );

  const filteredNonPendingRequests = filterRequests(
    filterStatus === 'all'
      ? requests.filter((request) => request.status !== 'pending')
      : requests.filter((request) => request.status === filterStatus)
  );

  const TableRow = ({ request }: { request: BookingRequest }) => (
    <tr key={request.id} className="hover:bg-gray-50">
      <td className="border px-4 py-2">{request.full_name}</td>
      <td className="border px-4 py-2 text-sm">{request.email}</td>
      <td className="border px-4 py-2">{request.phone}</td>
      <td className="border px-4 py-2">{request.pickup_date}</td>
      <td className="border px-4 py-2">{request.return_date}</td>
      <td className="border px-4 py-2">${request.total_price}</td>
      <td className="border px-4 py-2">
        <span className={`px-2 py-1 rounded text-white text-xs ${
          request.status === 'pending'
            ? 'bg-yellow-500'
            : request.status === 'confirmed'
            ? 'bg-green-500'
            : 'bg-red-500'
        }`}>
          {request.status.toUpperCase()}
        </span>
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          onClick={() => handleViewDetails(request)}
          className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
          title="View Details"
        >
          <Edit className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Booking Requests</h2>
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <X className="w-4 h-4" />
          Clear Filters
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Filters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Name Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search by Name
            </label>
            <input
              type="text"
              placeholder="Enter full name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pickup Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date From
            </label>
            <input
              type="date"
              value={pickupDateFrom}
              onChange={(e) => setPickupDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pickup Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date To
            </label>
            <input
              type="date"
              value={pickupDateTo}
              onChange={(e) => setPickupDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Return Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date From
            </label>
            <input
              type="date"
              value={returnDateFrom}
              onChange={(e) => setReturnDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Return Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date To
            </label>
            <input
              type="date"
              value={returnDateTo}
              onChange={(e) => setReturnDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Filter
            </label>
            <select
              value={filterStatus}
              onChange={(e) => handleFilterChange(e.target.value as 'all' | 'confirmed' | 'rejected')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pending Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-500" />
            Pending Requests ({filteredPendingRequests.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Full Name</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Pickup Date</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Return Date</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Total Price</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="border-b px-4 py-3 text-center text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPendingRequests.length > 0 ? (
                filteredPendingRequests.map((request) => (
                  <TableRow key={request.id} request={request} />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No pending requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmed/Rejected Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200" ref={nonPendingRef}>
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            {filterStatus === 'all' ? 'Processed' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Requests ({filteredNonPendingRequests.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Full Name</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Pickup Date</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Return Date</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Total Price</th>
                <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="border-b px-4 py-3 text-center text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNonPendingRequests.length > 0 ? (
                filteredNonPendingRequests.map((request) => (
                  <TableRow key={request.id} request={request} />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No {filterStatus === 'all' ? 'processed' : filterStatus} requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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

//   const handleStatusUpdate = (id: string, newStatus: 'confirmed' | 'rejected') => {
//     setRequests(prev =>
//       prev.map(req =>
//         req.id === id ? { ...req, status: newStatus } : req
//       )
//     );
//   };

//   const filteredRequests = filterStatus === 'all'
//     ? requests.filter((request) => request.status !== 'pending')
//     : requests.filter((request) => request.status === filterStatus);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>

//       {/* Pending Requests Table */}
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

//       {/* Filter Dropdown */}
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

//       {/* Filtered Confirmed/Rejected Table */}
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
//         onStatusUpdate={fetchRequests}
//       />
//     </div>
//   );
// };

// export default RequestsComponent;
