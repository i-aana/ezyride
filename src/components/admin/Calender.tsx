// // src/components/admin/CalendarComponent.tsx
// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface CalendarData {
//   [key: string]: {
//     status: 'blocked' | 'available' | 'booked' | 'request';
//     price: number;
//   };
// }

// interface CalendarDay {
//   date: number;
//   isCurrentMonth: boolean;
//   fullDate: string;
//   data?: {
//     status: string;
//     price: number;
//   };
// }

// const CalendarComponent: React.FC = () => {
//     const [currentDate, setCurrentDate] = useState(new Date()); // today's date
//     // June 2025
  
//   // Mock data - in real app, this would come from props or API
//   const calendarData: CalendarData = {
//     '2025-06-01': { status: 'blocked', price: 250 },
//     '2025-06-02': { status: 'blocked', price: 200 },
//     '2025-06-03': { status: 'available', price: 200 },
//     '2025-06-04': { status: 'request', price: 200 },
//     '2025-06-05': { status: 'booked', price: 200 },
//     '2025-06-06': { status: 'booked', price: 200 },
//     '2025-06-07': { status: 'available', price: 200 },
//     '2025-06-08': { status: 'available', price: 220 },
//   };

//   const getDaysInMonth = (date: Date): CalendarDay[] => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days: CalendarDay[] = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
//       days.push({
//         date: prevDate.getDate(),
//         isCurrentMonth: false,
//         fullDate: prevDate.toISOString().split('T')[0]
//       });
//     }
    
//     // Add days of the current month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const fullDate = new Date(year, month, day).toISOString().split('T')[0];
//       days.push({
//         date: day,
//         isCurrentMonth: true,
//         fullDate,
//         data: calendarData[fullDate]
//       });
//     }
    
//     return days;
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case 'blocked': return 'bg-red-500 text-white';
//       case 'booked': return 'bg-green-500 text-white';
//       case 'request': return 'bg-pink-300 text-gray-800';
//       case 'available': return 'bg-white text-gray-800 border border-gray-200';
//       default: return 'bg-gray-100 text-gray-400';
//     }
//   };

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const navigateMonth = (direction: number): void => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           {/* Legend */}
//           <div className="mb-6 flex flex-wrap gap-4">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-red-500 rounded"></div>
//               <span className="text-sm">Block</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-pink-300 rounded"></div>
//               <span className="text-sm">Request</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-green-500 rounded"></div>
//               <span className="text-sm">Booked</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
//               <span className="text-sm">Available</span>
//             </div>
//           </div>

//           {/* Calendar Header */}
//           <div className="flex items-center justify-between mb-6">
//             <button
//               onClick={() => navigateMonth(-1)}
//               className="p-2 hover:bg-gray-100 rounded"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <h2 className="text-xl font-semibold">
//               {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//             </h2>
//             <button
//               onClick={() => navigateMonth(1)}
//               className="p-2 hover:bg-gray-100 rounded"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Calendar Grid */}
//           <div className="grid grid-cols-7 gap-1">
//             {/* Day headers */}
//             {dayNames.map(day => (
//               <div key={day} className="p-3 text-center font-medium text-gray-500">
//                 {day}
//               </div>
//             ))}
            
//             {/* Calendar days */}
//             {getDaysInMonth(currentDate).map((day, index) => (
//               <div
//                 key={index}
//                 className={`p-2 text-center min-h-[60px] flex flex-col justify-center items-center rounded cursor-pointer hover:opacity-80 ${
//                   day.isCurrentMonth 
//                     ? day.data ? getStatusColor(day.data.status) : 'bg-gray-50 text-gray-400'
//                     : 'bg-gray-50 text-gray-300'
//                 }`}
//               >
//                 <div className="font-medium">{day.date}</div>
//                 {day.data && (
//                   <div className="text-xs mt-1">${day.data.price}</div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 text-sm text-gray-500">
//             Only able to update price for Available Dates
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarComponent;
// src/components/admin/CalendarComponent.tsx
// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useEffect } from 'react';
// import { supabase } from '@/lib/supabaseClient'; // adjust path


// interface CalendarData {
//   [key: string]: {
//     status: 'blocked' | 'available' | 'booked' | 'request';
//     price: number;
//   };
// }

// interface CalendarDay {
//   date: number;
//   isCurrentMonth: boolean;
//   fullDate: string;
//   data?: {
//     status: string;
//     price: number;
//   };
// }

// const CalendarComponent: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   // Mock data - in real app, this would come from props or API
//   const calendarData: CalendarData = {
//     '2025-06-01': { status: 'blocked', price: 250 },
//     '2025-06-02': { status: 'blocked', price: 200 },
//     '2025-06-03': { status: 'available', price: 200 },
//     '2025-06-04': { status: 'request', price: 200 },
//     '2025-06-05': { status: 'booked', price: 200 },
//     '2025-06-06': { status: 'booked', price: 200 },
//     '2025-06-07': { status: 'available', price: 200 },
//     '2025-06-08': { status: 'available', price: 220 },
//     '2025-06-12': { status: 'available', price: 200 },
//     '2025-06-13': { status: 'available', price: 200 },
//     '2025-06-14': { status: 'available', price: 200 },
//   };

//   const getDaysInMonth = (date: Date): CalendarDay[] => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days: CalendarDay[] = [];

//     // Add empty cells before the first of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
//       days.push({
//         date: prevDate.getDate(),
//         isCurrentMonth: false,
//         fullDate: prevDate.toISOString().split('T')[0],
//       });
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const fullDate = new Date(year, month, day).toISOString().split('T')[0];
//       const currentDayDate = new Date(year, month, day);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       const isPast = currentDayDate < today;
//       const data = calendarData[fullDate];
//       const isPastAvailable = isPast && data?.status === 'available';

//       days.push({
//         date: day,
//         isCurrentMonth: true,
//         fullDate,
//         data: isPastAvailable ? { status: 'pastAvailable', price: data?.price ?? 0 } : data,
//       });
//     }

//     return days;
//   };

//   const getStatusColor = (status: string): string => {
//     switch (status) {
//       case 'blocked': return 'bg-red-500 text-white';
//       case 'booked': return 'bg-green-500 text-white';
//       case 'request': return 'bg-pink-300 text-gray-800';
//       case 'available': return 'bg-white text-gray-800 border border-gray-200';
//       case 'pastAvailable': return 'bg-gray-100 text-gray-400 italic';
//       default: return 'bg-gray-50 text-gray-300';
//     }
//   };

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const navigateMonth = (direction: number): void => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           {/* Legend */}
//           <div className="mb-6 flex flex-wrap gap-4">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-red-500 rounded"></div>
//               <span className="text-sm">Blocked</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-pink-300 rounded"></div>
//               <span className="text-sm">Request</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-green-500 rounded"></div>
//               <span className="text-sm">Booked</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
//               <span className="text-sm">Available</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
//               <span className="text-sm text-gray-500 italic">Past Available</span>
//             </div>
//           </div>

//           {/* Calendar Header */}
//           <div className="flex items-center justify-between mb-6">
//             <button
//               onClick={() => navigateMonth(-1)}
//               className="p-2 hover:bg-gray-100 rounded"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <h2 className="text-xl font-semibold">
//               {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//             </h2>
//             <button
//               onClick={() => navigateMonth(1)}
//               className="p-2 hover:bg-gray-100 rounded"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Calendar Grid */}
//           <div className="grid grid-cols-7 gap-1">
//             {dayNames.map(day => (
//               <div key={day} className="p-3 text-center font-medium text-gray-500">
//                 {day}
//               </div>
//             ))}

//             {getDaysInMonth(currentDate).map((day, index) => (
//               <div
//                 key={index}
//                 className={`p-2 text-center min-h-[60px] flex flex-col justify-center items-center rounded cursor-pointer hover:opacity-80 ${
//                   day.isCurrentMonth 
//                     ? day.data ? getStatusColor(day.data.status) : 'bg-gray-50 text-gray-400'
//                     : 'bg-gray-50 text-gray-300'
//                 }`}
//               >
//                 <div className="font-medium">{day.date}</div>
//                 {day.data && (
//                   <div className="text-xs mt-1">${day.data.price}</div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 text-sm text-gray-500">
//             Only able to update price for Available Dates
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarComponent;

// src/components/admin/CalendarComponent.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

interface CalendarData {
  [key: string]: {
    status: 'blocked' | 'available' | 'booked' | 'request';
    price: number;
  };
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  fullDate: string;
  data?: {
    status: string;
    price: number;
  };
  isPast: boolean;
}

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData>({});

  useEffect(() => {
    const fetchCalendarData = async () => {
      const { data, error } = await supabase.from('calendar_prices').select('*');
      if (error) {
        console.error('Failed to fetch calendar data:', error);
        return;
      }

      const mapped: CalendarData = {};
      data.forEach((item: any) => {
        mapped[item.date] = {
          status: item.status,
          price: item.base_price,
        };
      });
      setCalendarData(mapped);
    };

    fetchCalendarData();
  }, []);

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startPadding = firstDay.getDay();

    const todayStr = new Date().toISOString().split('T')[0];
    const days: CalendarDay[] = [];

    // Padding from previous month
    for (let i = 0; i < startPadding; i++) {
      const prevDate = new Date(year, month, -startPadding + i + 1);
      const fullDate = prevDate.toISOString().split('T')[0];
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate,
        isPast: true,
      });
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(year, month, day);
      const fullDate = thisDate.toISOString().split('T')[0];
      const isPast = fullDate < todayStr;
      const data = calendarData[fullDate];
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate,
        data,
        isPast,
      });
    }

    return days;
  };

  const getStatusColor = (status: string | undefined, isPast: boolean): string => {
    let base = '';
    switch (status) {
      case 'blocked':
        base = 'bg-red-500 text-white';
        break;
      case 'booked':
        base = 'bg-green-500 text-white';
        break;
      case 'request':
        base = 'bg-pink-300 text-gray-800';
        break;
      case 'available':
        base = 'bg-white text-gray-800 border border-gray-300';
        break;
      default:
        base = 'bg-gray-50 text-gray-300';
        break;
    }

    return isPast ? `${base} opacity-50 cursor-not-allowed` : `${base} hover:opacity-80 cursor-pointer`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (dir: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {/* Legend */}
          <div className="mb-6 flex flex-wrap gap-4">
            <LegendBox color="bg-red-500" label="Blocked" />
            <LegendBox color="bg-pink-300" label="Request" />
            <LegendBox color="bg-green-500" label="Booked" />
            <LegendBox color="bg-white border border-gray-300" label="Available" />
            <LegendBox color="bg-gray-100 border border-gray-300" label="Past / Not Available" />
          </div>

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="p-3 text-center font-medium text-gray-500">
                {day}
              </div>
            ))}

            {getDaysInMonth(currentDate).map((day, idx) => {
              const status = day.data?.status;
              const colorClass = getStatusColor(status, day.isPast);

              return (
                <div
                  key={idx}
                  className={`p-2 text-center min-h-[60px] flex flex-col justify-center items-center rounded ${colorClass}`}
                >
                  <div className="font-medium">{day.date}</div>
                  {day.data && (
                    <div className="text-xs mt-1">${day.data.price}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            You can only update prices for <span className="font-medium">future available dates</span>.
          </div>
        </div>
      </div>
    </div>
  );
};

const LegendBox = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 rounded ${color}`}></div>
    <span className="text-sm">{label}</span>
  </div>
);

export default CalendarComponent;
