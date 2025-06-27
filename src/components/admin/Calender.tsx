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

  // Helper function to format date without timezone issues
  const formatDateLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

    // Use local date formatting to avoid timezone issues
    const today = new Date();
    const todayStr = formatDateLocal(today);
    const days: CalendarDay[] = [];

    // Padding from previous month
    for (let i = 0; i < startPadding; i++) {
      const prevDate = new Date(year, month, -startPadding + i + 1);
      const fullDate = formatDateLocal(prevDate);
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
      const fullDate = formatDateLocal(thisDate);
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

// src/components/admin/CalendarComponent.tsx
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { supabase } from '../../utils/supabaseClient';

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
//   isPast: boolean;
// }

// const CalendarComponent: React.FC = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [calendarData, setCalendarData] = useState<CalendarData>({});

//   useEffect(() => {
//     const fetchCalendarData = async () => {
//       const { data, error } = await supabase.from('calendar_prices').select('*');
//       if (error) {
//         console.error('Failed to fetch calendar data:', error);
//         return;
//       }

//       const mapped: CalendarData = {};
//       data.forEach((item: any) => {
//         mapped[item.date] = {
//           status: item.status,
//           price: item.base_price,
//         };
//       });
//       setCalendarData(mapped);
//     };

//     fetchCalendarData();
//   }, []);

//   const getDaysInMonth = (date: Date): CalendarDay[] => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startPadding = firstDay.getDay();

//     const todayStr = new Date().toISOString().split('T')[0];
//     const days: CalendarDay[] = [];

//     // Padding from previous month
//     for (let i = 0; i < startPadding; i++) {
//       const prevDate = new Date(year, month, -startPadding + i + 1);
//       const fullDate = prevDate.toISOString().split('T')[0];
//       days.push({
//         date: prevDate.getDate(),
//         isCurrentMonth: false,
//         fullDate,
//         isPast: true,
//       });
//     }

//     // Current month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const thisDate = new Date(year, month, day);
//       const fullDate = thisDate.toISOString().split('T')[0];
//       const isPast = fullDate < todayStr;
//       const data = calendarData[fullDate];
//       days.push({
//         date: day,
//         isCurrentMonth: true,
//         fullDate,
//         data,
//         isPast,
//       });
//     }

//     return days;
//   };

//   const getStatusColor = (status: string | undefined, isPast: boolean): string => {
//     let base = '';
//     switch (status) {
//       case 'blocked':
//         base = 'bg-red-500 text-white';
//         break;
//       case 'booked':
//         base = 'bg-green-500 text-white';
//         break;
//       case 'request':
//         base = 'bg-pink-300 text-gray-800';
//         break;
//       case 'available':
//         base = 'bg-white text-gray-800 border border-gray-300';
//         break;
//       default:
//         base = 'bg-gray-50 text-gray-300';
//         break;
//     }

//     return isPast ? `${base} opacity-50 cursor-not-allowed` : `${base} hover:opacity-80 cursor-pointer`;
//   };

//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December',
//   ];

//   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const navigateMonth = (dir: number) => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           {/* Legend */}
//           <div className="mb-6 flex flex-wrap gap-4">
//             <LegendBox color="bg-red-500" label="Blocked" />
//             <LegendBox color="bg-pink-300" label="Request" />
//             <LegendBox color="bg-green-500" label="Booked" />
//             <LegendBox color="bg-white border border-gray-300" label="Available" />
//             <LegendBox color="bg-gray-100 border border-gray-300" label="Past / Not Available" />
//           </div>

//           {/* Calendar Header */}
//           <div className="flex items-center justify-between mb-6">
//             <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded">
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <h2 className="text-xl font-semibold">
//               {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//             </h2>
//             <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded">
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Calendar Grid */}
//           <div className="grid grid-cols-7 gap-1">
//             {dayNames.map((day) => (
//               <div key={day} className="p-3 text-center font-medium text-gray-500">
//                 {day}
//               </div>
//             ))}

//             {getDaysInMonth(currentDate).map((day, idx) => {
//               const status = day.data?.status;
//               const colorClass = getStatusColor(status, day.isPast);

//               return (
//                 <div
//                   key={idx}
//                   className={`p-2 text-center min-h-[60px] flex flex-col justify-center items-center rounded ${colorClass}`}
//                 >
//                   <div className="font-medium">{day.date}</div>
//                   {day.data && (
//                     <div className="text-xs mt-1">${day.data.price}</div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-6 text-sm text-gray-500">
//             You can only update prices for <span className="font-medium">future available dates</span>.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LegendBox = ({ color, label }: { color: string; label: string }) => (
//   <div className="flex items-center gap-2">
//     <div className={`w-4 h-4 rounded ${color}`}></div>
//     <span className="text-sm">{label}</span>
//   </div>
// );

// export default CalendarComponent;
