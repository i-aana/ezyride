// import React from 'react';
// import { CalendarDays, MapPin } from 'lucide-react';
// import { BookingLocation, LocationOption } from '../types';
// import { locations } from '../data/mockData';
// import { DateRange } from './types';

// interface HeroProps {
//   dateRange: DateRange;
//   location: BookingLocation;
//   onDateChange: (field: keyof DateRange, value: Date | null) => void;
//   onLocationChange: (field: keyof BookingLocation, value: LocationOption | null) => void;
//   onSubmit: () => void;
// }

// const Hero: React.FC<HeroProps> = ({ 
//   dateRange, 
//   location, 
//   onDateChange, 
//   onLocationChange, 
//   onSubmit 
// }) => {

//   //format date for input 
//   const formatDateForInput = (date: Date | null) => {
//     if (!date) return '';
//     return date.toISOString().split('T')[0];
//   };
  
//   // Format date for display
//   const formatDate = (date: Date | null) => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };
//   {/* Location Selection */}
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
//                   <select 
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={location.pickup?.id || ''}
//                     onChange={(e) => {
//                       const selected = locations.find(loc => loc.id === e.target.value) || null;
//                       onLocationChange('pickup', selected);
//                     }}
//                   >
//                     <option value="">Select pickup location</option>
//                     {locations.map(loc => (
//                       <option key={loc.id} value={loc.id}>
//                         {loc.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div> */}
              
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Return Location</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
//                   <select 
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={location.dropoff?.id || ''}
//                     onChange={(e) => {
//                       const selected = locations.find(loc => loc.id === e.target.value) || null;
//                       onLocationChange('dropoff', selected);
//                     }}
//                   >
//                     <option value="">Select return location</option>
//                     {locations.map(loc => (
//                       <option key={loc.id} value={loc.id}>
//                         {loc.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div> */}
              
//               {/* Date Selection */}

//   return (
// <div className="relative min-h-screen flex">
// {/* Background Image with Overlay */}
//       <div className="absolute inset-0 z-0">
//         <div 
//           className="absolute inset-0 bg-gradient-to-b from-black/70 to-blue-900/60 mix-blend-multiply z-10"
//           aria-hidden="true"
//         ></div>
//         <img 
//           src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1400" 
//           alt="Luxury cars" 
//           className="object-cover w-full h-full"
//         />
//       </div>
      
//       {/* Content Container */}
//       <div className="container mx-auto px-5 z-10 pt-16 flex justify-center items-center min-h-screen">
//       <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl w-full p-8 rounded-xl">
//       {/* Left Column - Text */}
          
          
//           {/* Right Column - Booking Form */}
//           <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-slide-up h-auto flex flex-col">
//           <div className="p-6 bg-blue-900 text-white">
//               <h2 className="text-xl font-semibold">Book Your EzyRide</h2>
//               {/* <p className="text-blue-100 text-sm">PICKUP POINT:               DROP POINT            </p> */}
//             </div>
      

            
//             <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">            <div className="flex justify-between">
//               <span><strong>Location:</strong> 231 Morgantown Rd</span>
//             </div>
//               {/* <div>
//               <span><strong>Drop Point:</strong> location B</span>

//               </div> */}
              
              
//               <div className="grid grid-cols-2 gap-4">
              

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
//                   <div className="relative">
//                     <CalendarDays className="absolute left-3 top-3 text-gray-400" size={18} />
//                     <input 
//                       type="date" 
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       min={new Date().toISOString().split('T')[0]}
//                       value={formatDateForInput(dateRange.pickupDate)}
//                       onChange={(e) => {
//                         const date = e.target.value ? new Date(e.target.value) : null;
//                         onDateChange('pickupDate', date);
//                       }}
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
//                   <div className="relative">
//                     <CalendarDays className="absolute left-3 top-3 text-gray-400" size={18} />
//                     <input 
//                       type="date" 
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       min={dateRange.pickupDate ? new Date(dateRange.pickupDate.getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
//                       value={formatDateForInput(dateRange.returnDate)}
//                       onChange={(e) => {
//                         const date = e.target.value ? new Date(e.target.value) : null;
//                         onDateChange('returnDate', date);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <button 
//               type="button"
//               className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//               onClick={onSubmit}
//               disabled={!dateRange.pickupDate || !dateRange.returnDate}
//             >
//               Check Avaibility
//             </button>
//             </div>
            
//           </div>
//           <div className="text-white max-w-lg">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in">
//               Ready For Next <span className="text-red-500">Ride</span>
//             </h1>
//             <p className="text-xl opacity-90 mb-8 animate-fade-in-delay">
//               Premium car rental with free delivery and pickup. 
//               Choose from our fleet of luxury, economy, and specialty vehicles.
//             </p>
//             <div className="flex space-x-4 animate-fade-in-delay-2">
//               {/* <div className="flex items-center text-sm">
//                 <span className="bg-red-500 rounded-full p-1 mr-2">
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                 </span>
//                 No hidden charges
//               </div>
//               <div className="flex items-center text-sm">
//                 <span className="bg-red-500 rounded-full p-1 mr-2">
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                 </span>
//                 Free cancellation
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React, { useEffect, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { BookingLocation, LocationOption } from '../types';
import { locations } from '../data/mockData';
import { DateRange } from './types';
import { supabase } from '../utils/supabaseClient'; // adjust path if needed

interface HeroProps {
  dateRange: DateRange;
  location: BookingLocation;
  onDateChange: (field: keyof DateRange, value: Date | null) => void;
  onLocationChange: (field: keyof BookingLocation, value: LocationOption | null) => void;
  onSubmit: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  dateRange, 
  location, 
  onDateChange, 
  onLocationChange, 
  onSubmit 
}) => {
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      const { data, error } = await supabase
        .from('calendar_prices')
        .select('date, status')
        .in('status', ['blocked', 'booked']);

      if (error) {
        console.error('Error fetching dates:', error);
      } else {
        const formatted = data.map((entry) => entry.date);
        setUnavailableDates(formatted);
      }
    };

    fetchUnavailableDates();
  }, []);

  const isDateUnavailable = (dateStr: string) => {
    return unavailableDates.includes(dateStr);
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative min-h-screen flex">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-blue-900/60 mix-blend-multiply z-10"
          aria-hidden="true"
        ></div>
        <img 
          src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1400" 
          alt="Luxury cars" 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="container mx-auto px-5 z-10 pt-16 flex justify-center items-center min-h-screen">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl w-full p-8 rounded-xl">
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-slide-up h-auto flex flex-col">
            <div className="p-6 bg-blue-900 text-white">
              <h2 className="text-xl font-semibold">Book Your EzyRide</h2>
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="flex justify-between">
                <span><strong>Location:</strong> 231 Morgantown Rd</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                      value={formatDateForInput(dateRange.pickupDate)}
                      onChange={(e) => {
                        const dateStr = e.target.value;
                        if (isDateUnavailable(dateStr)) {
                          alert('This pickup date is unavailable.');
                          return;
                        }
                        const date = dateStr ? new Date(dateStr) : null;
                        onDateChange('pickupDate', date);
                        if (date) localStorage.setItem('pickupDate', date.toISOString());
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={dateRange.pickupDate ? new Date(dateRange.pickupDate.getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                      value={formatDateForInput(dateRange.returnDate)}
                      onChange={(e) => {
                        const dateStr = e.target.value;
                        if (isDateUnavailable(dateStr)) {
                          alert('This return date is unavailable.');
                          return;
                        }
                        const date = dateStr ? new Date(dateStr) : null;
                        onDateChange('returnDate', date);
                        if (date) localStorage.setItem('returnDate', date.toISOString());
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <button 
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={onSubmit}
                disabled={!dateRange.pickupDate || !dateRange.returnDate}
              >
                Check Avaibility
              </button>
            </div>
          </div>

          <div className="text-white max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in">
              Ready For Next <span className="text-red-500">Ride</span>
            </h1>
            <p className="text-xl opacity-90 mb-8 animate-fade-in-delay">
              Premium car rental with free delivery and pickup. 
              Choose from our fleet of luxury, economy, and specialty vehicles.
            </p>
            <div className="flex space-x-4 animate-fade-in-delay-2">
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
