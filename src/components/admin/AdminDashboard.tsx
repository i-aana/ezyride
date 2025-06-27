// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HeaderHost from './HeaderHost';
// import CalendarComponent from './Calender';
// import PriceUpdateComponent from './PriceUpdate';
// import RequestsComponent from './Request';
// import { Menu } from 'lucide-react';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//     localStorage.setItem('adminActiveTab', tab);
//   };
//   const [activeTab, setActiveTab] = useState(() => {
//     return localStorage.getItem('adminActiveTab') || 'calendar';
//   });
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isHostLoggedIn');
//     if (isLoggedIn !== 'true') {
//       navigate('/admin-login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('adminActiveTab');
//     localStorage.removeItem('isHostLoggedIn');
//     navigate('/admin-login');
//   };

//   const renderActiveComponent = () => {
//     switch (activeTab) {
//       case 'calendar':
//         return <CalendarComponent />;
//       case 'price-update':
//         return <PriceUpdateComponent />;
//       case 'requests':
//         return <RequestsComponent />;
//       default:
//         return <CalendarComponent />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Desktop Header */}
//       <div className="hidden md:block">
//         <HeaderHost activeTab={activeTab} setActiveTab={handleTabChange} onLogout={handleLogout} />
//       </div>

//       {/* Mobile Menu Toggle - NOW FIXED */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-white border-b flex justify-between items-center">
//         <span className="font-semibold">Admin Dashboard</span>
//         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//           <Menu className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b">
//           <button
//             className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
//               activeTab === 'calendar' ? 'bg-gray-100 font-semibold' : ''
//             }`}
//             onClick={() => {
//               handleTabChange('calendar');
//               setMobileMenuOpen(false);
//             }}
//           >
//             Calendar
//           </button>
//           <button
//             className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
//               activeTab === 'price-update' ? 'bg-gray-100 font-semibold' : ''
//             }`}
//             onClick={() => {
//               handleTabChange('price-update');
//               setMobileMenuOpen(false);
//             }}
//           >
//             Price Update
//           </button>
//           <button
//             className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
//               activeTab === 'requests' ? 'bg-gray-100 font-semibold' : ''
//             }`}
//             onClick={() => {
//               handleTabChange('requests');
//               setMobileMenuOpen(false);
//             }}
//           >
//             Requests
//           </button>
//           <button
//             className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       )}

//       {/* Main content with padding only for mobile fixed header */}
//       <main className="pt-16 md:pt-16 py-6">
//         {renderActiveComponent()}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHost from './HeaderHost';
import CalendarComponent from './Calender';
import PriceUpdateComponent from './PriceUpdate';
import RequestsComponent from './Request';
import { Menu } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('adminActiveTab', tab);
  };
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminActiveTab') || 'calendar';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ SESSION + INACTIVITY CHECK
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isHostLoggedIn');
    const loginTime = parseInt(localStorage.getItem('hostLoginTime') || '0');
    const lastActivity = parseInt(localStorage.getItem('lastActivityTime') || '0');

    const now = Date.now();
    const sessionLimit = 3 * 60 * 1000; // 30 minutes
    const inactivityLimit = 1 * 60 * 1000; // 5 minutes

    if (isLoggedIn !== 'true') {
      navigate('/admin-login');
    }

    // Session expiry
    if (now - loginTime > sessionLimit) {
      localStorage.clear();
      alert('Session expired. Please log in again.');
      navigate('/admin-login');
    }

    // Inactivity auto logout
    if (now - lastActivity > inactivityLimit) {
      localStorage.clear();
      alert('Logged out due to inactivity.');
      navigate('/admin-login');
    }

    const activityHandler = () => {
      localStorage.setItem('lastActivityTime', Date.now().toString());
    };

    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keydown', activityHandler);

    return () => {
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminActiveTab');
    localStorage.removeItem('isHostLoggedIn');
    localStorage.removeItem('hostLoginTime');
    localStorage.removeItem('lastActivityTime');
    navigate('/admin-login');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'calendar':
        return <CalendarComponent />;
      case 'price-update':
        return <PriceUpdateComponent />;
      case 'requests':
        return <RequestsComponent />;
      default:
        return <CalendarComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <HeaderHost activeTab={activeTab} setActiveTab={handleTabChange} onLogout={handleLogout} />
      </div>

      {/* Mobile Menu Toggle - NOW FIXED */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-white border-b flex justify-between items-center">
        <span className="font-semibold">Admin Dashboard</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b">
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              activeTab === 'calendar' ? 'bg-gray-100 font-semibold' : ''
            }`}
            onClick={() => {
              handleTabChange('calendar');
              setMobileMenuOpen(false);
            }}
          >
            Calendar
          </button>
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              activeTab === 'price-update' ? 'bg-gray-100 font-semibold' : ''
            }`}
            onClick={() => {
              handleTabChange('price-update');
              setMobileMenuOpen(false);
            }}
          >
            Price Update
          </button>
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              activeTab === 'requests' ? 'bg-gray-100 font-semibold' : ''
            }`}
            onClick={() => {
              handleTabChange('requests');
              setMobileMenuOpen(false);
            }}
          >
            Requests
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {/* Main content with padding only for mobile fixed header */}
      <main className="pt-16 md:pt-16 py-6">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
