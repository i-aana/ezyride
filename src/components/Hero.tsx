

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

// import React, { useEffect, useState } from 'react';
// import { CalendarDays, MapPin } from 'lucide-react';
// import { BookingLocation, LocationOption } from '../types';
// import { locations } from '../data/mockData';
// import { DateRange } from './types';
// import { supabase } from '../utils/supabaseClient';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

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
//   const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

//   useEffect(() => {
//     const fetchUnavailableDates = async () => {
//       const { data, error } = await supabase
//         .from('calendar_prices')
//         .select('date, status')
//         .in('status', ['blocked', 'booked']);

//       if (error) {
//         console.error('Error fetching dates:', error);
//       } else if (data) {
//         const dates = data.map((entry) => new Date(entry.date));
//         setUnavailableDates(dates);
//       }
//     };

//     fetchUnavailableDates();
//   }, []);

//   return (
//     <div className="relative min-h-screen flex">
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
      
//       <div className="container mx-auto px-5 z-10 pt-16 flex justify-center items-center min-h-screen">
//         <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl w-full p-8 rounded-xl">
          
//           <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-slide-up h-auto flex flex-col">
//             <div className="p-6 bg-blue-900 text-white">
//               <h2 className="text-xl font-semibold">Book Your EzyRide</h2>
//             </div>

//             <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
//               <div className="flex justify-between">
//                 <span><strong>Location:</strong> 231 Morgantown Rd</span>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
//                   <DatePicker
//                     selected={dateRange.pickupDate}
//                     onChange={(date) => onDateChange('pickupDate', date)}
//                     minDate={new Date()}
//                     excludeDates={unavailableDates}
//                     placeholderText="Select pickup date"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
//                   <DatePicker
//                     selected={dateRange.pickupDate}
//                     onChange={(date) => onDateChange('pickupDate', date)}
//                     minDate={new Date()}
//                     excludeDates={unavailableDates}
//                     placeholderText="Select pickup date"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                     portalId="root-portal"
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'preventOverflow',
//                         options: {
//                           boundary: 'viewport',
//                         },
//                       },
//                     ]}
//                   />

//                 </div>
//               </div>
              
//               <button 
//                 type="button"
//                 className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                 onClick={onSubmit}
//                 disabled={!dateRange.pickupDate || !dateRange.returnDate}
//               >
//                 Check Availability
//               </button>
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
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
