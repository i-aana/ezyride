// import React, { useEffect, useState } from 'react';
// import { CalendarDays, MapPin } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { BookingLocation, LocationOption } from '../types';
// import { locations } from '../data/mockData';
// import { DateRange } from './types';
// import { supabase } from '../utils/supabaseClient'; // adjust path if needed

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
//   const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchUnavailableDates = async () => {
//       const { data, error } = await supabase
//         .from('calendar_prices')
//         .select('date, status')
//         .in('status', ['blocked', 'booked']);

//       if (error) {
//         console.error('Error fetching dates:', error);
//       } else {
//         const formatted = data.map((entry) => entry.date);
//         setUnavailableDates(formatted);
//       }
//     };

//     fetchUnavailableDates();
//   }, []);

//   const isDateUnavailable = (date: Date) => {
//     // Use local date string to avoid timezone issues
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     const dateStr = `${year}-${month}-${day}`;
//     return unavailableDates.includes(dateStr);
//   };

//   const formatDateForInput = (date: Date | null) => {
//     if (!date) return '';
//     // Use local date components to avoid timezone issues
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const formatDate = (date: Date | null) => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   const formatDateDisplay = (date: Date | null) => {
//     if (!date) return '';
//     const year = date.getFullYear().toString().slice(-2);
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}/${month}/${day}`;
//   };

//   const CustomInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder }, ref) => (
//     <div className="relative">
//       <CalendarDays className="absolute left-3 top-3 text-gray-400 z-10" size={18} />
//       <input
//         ref={ref}
//         value={value}
//         onClick={onClick}
//         placeholder={placeholder}
//         readOnly
//         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
//       />
//     </div>
//   ));

//   const handlePickupDateChange = (date: Date | null) => {
//     onDateChange('pickupDate', date);
//     if (date) localStorage.setItem('pickupDate', date.toISOString());
//   };

//   const handleReturnDateChange = (date: Date | null) => {
//     onDateChange('returnDate', date);
//     if (date) localStorage.setItem('returnDate', date.toISOString());
//   };

//   const getMinReturnDate = () => {
//     if (dateRange.pickupDate) {
//       const nextDay = new Date(dateRange.pickupDate);
//       nextDay.setDate(nextDay.getDate() + 1);
//       return nextDay;
//     }
//     return new Date();
//   };

//   return (
//     <>
//       <style jsx global>{`
//         .react-datepicker-wrapper {
//           width: 100%;
//         }
        
//         .react-datepicker__input-container {
//           width: 100%;
//         }
        
//         .react-datepicker-popper {
//           z-index: 9999 !important;
//         }
        
//         .react-datepicker {
//           font-family: inherit;
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//         }
        
//         .react-datepicker__header {
//           background-color: #1e3a8a;
//           border-bottom: 1px solid #e5e7eb;
//           border-radius: 0.5rem 0.5rem 0 0;
//         }
        
//         .react-datepicker__current-month {
//           color: white;
//           font-weight: 600;
//         }
        
//         .react-datepicker__navigation {
//           top: 13px;
//         }
        
//         .react-datepicker__navigation--previous {
//           border-right-color: white;
//         }
        
//         .react-datepicker__navigation--next {
//           border-left-color: white;
//         }
        
//         .react-datepicker__day-names {
//           background-color: #f9fafb;
//         }
        
//         .react-datepicker__day-name {
//           color: #6b7280;
//           font-weight: 600;
//         }
        
//         .react-datepicker__day {
//           color: #374151;
//           border-radius: 0.25rem;
//           transition: all 0.2s;
//         }
        
//         .react-datepicker__day:hover {
//           background-color: #dbeafe;
//           color: #1e40af;
//         }
        
//         .react-datepicker__day--selected {
//           background-color: #ef4444 !important;
//           color: white !important;
//         }
        
//         .react-datepicker__day--selected:hover {
//           background-color: #dc2626 !important;
//         }
        
//         .react-datepicker__day--keyboard-selected {
//           background-color: #fef2f2;
//           color: #ef4444;
//         }
        
//         .react-datepicker__day--disabled {
//           color: #d1d5db !important;
//           background-color: #f9fafb !important;
//           cursor: not-allowed !important;
//           text-decoration: line-through;
//         }
        
//         .react-datepicker__day--disabled:hover {
//           background-color: #f9fafb !important;
//           color: #d1d5db !important;
//         }
        
//         .react-datepicker__day--today {
//           font-weight: 700;
//           color: #1e40af;
//         }
        
//         .react-datepicker__day--in-range {
//           background-color: #fef2f2;
//           color: #ef4444;
//         }
        
//         .react-datepicker__day--range-start,
//         .react-datepicker__day--range-end {
//           background-color: #ef4444 !important;
//           color: white !important;
//         }
        
//         @media (max-width: 768px) {
//           .react-datepicker {
//             font-size: 0.875rem;
//           }
          
//           .react-datepicker__day {
//             width: 2rem;
//             height: 2rem;
//             line-height: 2rem;
//           }
          
//           .react-datepicker__header {
//             padding: 0.5rem 0;
//           }
//         }
        
//         .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
//           border-bottom-color: #1e3a8a;
//         }
        
//         .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
//           border-bottom-color: #e5e7eb;
//         }
//       `}</style>
      
//       <div className="relative min-h-screen flex">
//         <div className="absolute inset-0 z-0">
//           <div 
//             className="absolute inset-0 bg-gradient-to-b from-black/70 to-blue-900/60 mix-blend-multiply z-10"
//             aria-hidden="true"
//           ></div>
//           <img 
//             src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1400" 
//             alt="Luxury cars" 
//             className="object-cover w-full h-full"
//           />
//         </div>
        
//         <div className="container mx-auto px-5 z-10 pt-16 flex justify-center items-center min-h-screen">
//           <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl w-full p-8 rounded-xl">
            
//             <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-slide-up h-auto flex flex-col">
//               <div className="p-6 bg-blue-900 text-white">
//                 <h2 className="text-xl font-semibold">Book Your EzyRide</h2>
//               </div>

//               <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
//                 <div className="flex justify-between">
//                   <span><strong>Location:</strong> 231 Morgantown Rd</span>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
//                     <DatePicker
//                       selected={dateRange.pickupDate}
//                       onChange={handlePickupDateChange}
//                       minDate={new Date()}
//                       filterDate={(date) => !isDateUnavailable(date)}
//                       dateFormat="yy/MM/dd"
//                       placeholderText="Select pickup date"
//                       customInput={<CustomInput />}
//                       popperPlacement="bottom"
//                       popperModifiers={[
//                         {
//                           name: "offset",
//                           options: {
//                             offset: [0, 8],
//                           },
//                         },
//                         {
//                           name: "preventOverflow",
//                           options: {
//                             boundary: "viewport",
//                           },
//                         },
//                         {
//                           name: "flip",
//                           options: {
//                             fallbackPlacements: ["top"],
//                           },
//                         },
//                       ]}
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
//                     <DatePicker
//                       selected={dateRange.returnDate}
//                       onChange={handleReturnDateChange}
//                       minDate={dateRange.pickupDate ? new Date(dateRange.pickupDate.getTime() + 86400000) : new Date()}
//                       filterDate={(date) => !isDateUnavailable(date)}
//                       dateFormat="yy/MM/dd"
//                       placeholderText="Select return date"
//                       customInput={<CustomInput />}
//                       popperPlacement="bottom"
//                       popperModifiers={[
//                         {
//                           name: "offset",
//                           options: {
//                             offset: [0, 8],
//                           },
//                         },
//                         {
//                           name: "preventOverflow",
//                           options: {
//                             boundary: "viewport",
//                           },
//                         },
//                         {
//                           name: "flip",
//                           options: {
//                             fallbackPlacements: ["top"],
//                           },
//                         },
//                       ]}
//                     />
//                   </div>
//                 </div>
                
//                 <button 
//                   type="button"
//                   className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                   onClick={onSubmit}
//                   disabled={!dateRange.pickupDate || !dateRange.returnDate}
//                 >
//                   Check Avaibility
//                 </button>
//               </div>
//             </div>

//             <div className="text-white max-w-lg">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in">
//                 Ready For Next <span className="text-red-500">Ride</span>
//               </h1>
//               <p className="text-xl opacity-90 mb-8 animate-fade-in-delay">
//                 Premium car rental with free delivery and pickup. 
//                 Choose from our fleet of luxury, economy, and specialty vehicles.
//               </p>
//               <div className="flex space-x-4 animate-fade-in-delay-2">
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;
// import React, { useEffect, useState } from 'react';
// import { CalendarDays, MapPin } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { BookingLocation, LocationOption } from '../types';
// import { locations } from '../data/mockData';
// import { DateRange } from './types';
// import { supabase } from '../utils/supabaseClient'; // adjust path if needed

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
//   const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchUnavailableDates = async () => {
//       const { data, error } = await supabase
//         .from('calendar_prices')
//         .select('date, status')
//         .in('status', ['blocked', 'booked']);

//       if (error) {
//         console.error('Error fetching dates:', error);
//       } else {
//         const formatted = data.map((entry) => entry.date);
//         setUnavailableDates(formatted);
//       }
//     };

//     fetchUnavailableDates();
//   }, []);

//   const isDateUnavailable = (date: Date) => {
//     // Use local date string to avoid timezone issues
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     const dateStr = `${year}-${month}-${day}`;
//     return unavailableDates.includes(dateStr);
//   };

//   const formatDateForInput = (date: Date | null) => {
//     if (!date) return '';
//     // Use local date components to avoid timezone issues
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const formatDate = (date: Date | null) => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   const formatDateDisplay = (date: Date | null) => {
//     if (!date) return '';
//     const year = date.getFullYear().toString().slice(-2);
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}/${month}/${day}`;
//   };

//   const CustomInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder }, ref) => (
//     <div className="relative">
//       <CalendarDays className="absolute left-3 top-3 text-gray-400 z-10" size={18} />
//       <input
//         ref={ref}
//         value={value}
//         onClick={onClick}
//         placeholder={placeholder}
//         readOnly
//         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
//       />
//     </div>
//   ));

//   const handlePickupDateChange = (date: Date | null) => {
//     onDateChange('pickupDate', date);
//     if (date) localStorage.setItem('pickupDate', date.toISOString());
//   };

//   const handleReturnDateChange = (date: Date | null) => {
//     onDateChange('returnDate', date);
//     if (date) localStorage.setItem('returnDate', date.toISOString());
//   };

//   const getMinReturnDate = () => {
//     if (dateRange.pickupDate) {
//       const nextDay = new Date(dateRange.pickupDate);
//       nextDay.setDate(nextDay.getDate() + 1);
//       return nextDay;
//     }
//     return new Date();
//   };

//   // Simplified popper modifiers - this fixes the computePosition error
//   const popperModifiers = [
//     {
//       name: 'offset',
//       options: {
//         offset: [0, 8],
//       },
//     },
//     {
//       name: 'preventOverflow',
//       options: {
//         rootBoundary: 'viewport',
//         tether: false,
//         altAxis: true,
//       },
//     },
//   ];

//   return (
//     <>
//       <style jsx global>{`
//         .react-datepicker-wrapper {
//           width: 100%;
//         }
        
//         .react-datepicker__input-container {
//           width: 100%;
//         }
        
//         .react-datepicker-popper {
//           z-index: 9999 !important;
//         }
        
//         .react-datepicker {
//           font-family: inherit;
//           border: 1px solid #e5e7eb;
//           border-radius: 0.5rem;
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
//         }
        
//         .react-datepicker__header {
//           background-color: #1e3a8a;
//           border-bottom: 1px solid #e5e7eb;
//           border-radius: 0.5rem 0.5rem 0 0;
//         }
        
//         .react-datepicker__current-month {
//           color: white;
//           font-weight: 600;
//         }
        
//         .react-datepicker__navigation {
//           top: 13px;
//         }
        
//         .react-datepicker__navigation--previous {
//           border-right-color: white;
//         }
        
//         .react-datepicker__navigation--next {
//           border-left-color: white;
//         }
        
//         .react-datepicker__day-names {
//           background-color: #f9fafb;
//         }
        
//         .react-datepicker__day-name {
//           color: #6b7280;
//           font-weight: 600;
//         }
        
//         .react-datepicker__day {
//           color: #374151;
//           border-radius: 0.25rem;
//           transition: all 0.2s;
//         }
        
//         .react-datepicker__day:hover {
//           background-color: #dbeafe;
//           color: #1e40af;
//         }
        
//         .react-datepicker__day--selected {
//           background-color: #ef4444 !important;
//           color: white !important;
//         }
        
//         .react-datepicker__day--selected:hover {
//           background-color: #dc2626 !important;
//         }
        
//         .react-datepicker__day--keyboard-selected {
//           background-color: #fef2f2;
//           color: #ef4444;
//         }
        
//         .react-datepicker__day--disabled {
//           color: #d1d5db !important;
//           background-color: #f9fafb !important;
//           cursor: not-allowed !important;
//           text-decoration: line-through;
//         }
        
//         .react-datepicker__day--disabled:hover {
//           background-color: #f9fafb !important;
//           color: #d1d5db !important;
//         }
        
//         .react-datepicker__day--today {
//           font-weight: 700;
//           color: #1e40af;
//         }
        
//         .react-datepicker__day--in-range {
//           background-color: #fef2f2;
//           color: #ef4444;
//         }
        
//         .react-datepicker__day--range-start,
//         .react-datepicker__day--range-end {
//           background-color: #ef4444 !important;
//           color: white !important;
//         }
        
//         @media (max-width: 768px) {
//           .react-datepicker {
//             font-size: 0.875rem;
//           }
          
//           .react-datepicker__day {
//             width: 2rem;
//             height: 2rem;
//             line-height: 2rem;
//           }
          
//           .react-datepicker__header {
//             padding: 0.5rem 0;
//           }
//         }
        
//         .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
//           border-bottom-color: #1e3a8a;
//         }
        
//         .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before {
//           border-bottom-color: #e5e7eb;
//         }
//       `}</style>
      
//       <div className="relative min-h-screen flex">
//         <div className="absolute inset-0 z-0">
//           <div 
//             className="absolute inset-0 bg-gradient-to-b from-black/70 to-blue-900/60 mix-blend-multiply z-10"
//             aria-hidden="true"
//           ></div>
//           <img 
//             src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1400" 
//             alt="Luxury cars" 
//             className="object-cover w-full h-full"
//           />
//         </div>
        
//         <div className="container mx-auto px-5 z-10 pt-16 flex justify-center items-center min-h-screen">
//           <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl w-full p-8 rounded-xl">
            
//             <div className="bg-white rounded-lg shadow-xl overflow-hidden animate-slide-up h-auto flex flex-col">
//               <div className="p-6 bg-blue-900 text-white">
//                 <h2 className="text-xl font-semibold">Book Your EzyRide</h2>
//               </div>

//               <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
//                 <div className="flex justify-between">
//                   <span><strong>Location:</strong> 231 Morgantown Rd</span>
//                 </div>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
//                     <DatePicker
//                       selected={dateRange.pickupDate}
//                       onChange={handlePickupDateChange}
//                       minDate={new Date()}
//                       filterDate={(date) => !isDateUnavailable(date)}
//                       dateFormat="yy/MM/dd"
//                       placeholderText="Select pickup date"
//                       customInput={<CustomInput />}
//                       popperPlacement="bottom-start"
//                       popperModifiers={popperModifiers}
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
//                     <DatePicker
//                       selected={dateRange.returnDate}
//                       onChange={handleReturnDateChange}
//                       minDate={dateRange.pickupDate ? new Date(dateRange.pickupDate.getTime() + 86400000) : new Date()}
//                       filterDate={(date) => !isDateUnavailable(date)}
//                       dateFormat="yy/MM/dd"
//                       placeholderText="Select return date"
//                       customInput={<CustomInput />}
//                       popperPlacement="bottom-start"
//                       popperModifiers={popperModifiers}
//                     />
//                   </div>
//                 </div>
                
//                 <button 
//                   type="button"
//                   className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                   onClick={onSubmit}
//                   disabled={!dateRange.pickupDate || !dateRange.returnDate}
//                 >
//                   Check Avaibility
//                 </button>
//               </div>
//             </div>

//             <div className="text-white max-w-lg">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in">
//                 Ready For Next <span className="text-red-500">Ride</span>
//               </h1>
//               <p className="text-xl opacity-90 mb-8 animate-fade-in-delay">
//                 Premium car rental with free delivery and pickup. 
//                 Choose from our fleet of luxury, economy, and specialty vehicles.
//               </p>
//               <div className="flex space-x-4 animate-fade-in-delay-2">
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;


import React, { useEffect, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './hero.css'; // Import our custom styles
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

  // Helper function to create date in local timezone (noon to avoid timezone issues)
  const createLocalDate = (year: number, month: number, day: number) => {
    return new Date(year, month - 1, day, 12, 0, 0, 0);
  };

  // Helper function to format date consistently for database storage
  const formatDateForDatabase = (date: Date | null) => {
    if (!date) return null;
    // Use local date components to avoid timezone issues
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to parse date string from database
  const parseDateFromDatabase = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return createLocalDate(year, month, day);
  };

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

  const isDateUnavailable = (date: Date) => {
    const dateStr = formatDateForDatabase(date);
    return unavailableDates.includes(dateStr);
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return '';
    return formatDateForDatabase(date) || '';
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const CustomInput = React.forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder }, ref) => (
    <div className="relative">
      <CalendarDays className="absolute left-3 top-3 text-gray-400 z-10" size={18} />
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
      />
    </div>
  ));

  const handlePickupDateChange = (date: Date | null) => {
    onDateChange('pickupDate', date);
    if (date) {
      // Store the date string consistently
      localStorage.setItem('pickupDate', formatDateForDatabase(date) || '');
    }
  };

  const handleReturnDateChange = (date: Date | null) => {
    onDateChange('returnDate', date);
    if (date) {
      // Store the date string consistently
      localStorage.setItem('returnDate', formatDateForDatabase(date) || '');
    }
  };

  const getMinReturnDate = () => {
    if (dateRange.pickupDate) {
      const nextDay = new Date(dateRange.pickupDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return new Date();
  };

  // Simplified popper modifiers - this fixes the computePosition error
  const popperModifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'viewport',
        tether: false,
        altAxis: true,
      },
    },
  ];

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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <DatePicker
                    selected={dateRange.pickupDate}
                    onChange={handlePickupDateChange}
                    minDate={new Date()}
                    filterDate={(date) => !isDateUnavailable(date)}
                    dateFormat="yy/MM/dd"
                    placeholderText="Select pickup date"
                    customInput={<CustomInput />}
                    popperPlacement="bottom-start"
                    popperModifiers={popperModifiers}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <DatePicker
                    selected={dateRange.returnDate}
                    onChange={handleReturnDateChange}
                    minDate={dateRange.pickupDate ? new Date(dateRange.pickupDate.getTime() + 86400000) : new Date()}
                    filterDate={(date) => !isDateUnavailable(date)}
                    dateFormat="yy/MM/dd"
                    placeholderText="Select return date"
                    customInput={<CustomInput />}
                    popperPlacement="bottom-start"
                    popperModifiers={popperModifiers}
                  />
                </div>
              </div>
              
              <button 
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={onSubmit}
                disabled={!dateRange.pickupDate || !dateRange.returnDate}
              >
                Check Availability
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