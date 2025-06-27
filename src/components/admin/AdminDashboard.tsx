import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHost from './HeaderHost';
import CalendarComponent from './Calender';
import PriceUpdateComponent from './PriceUpdate';
import RequestsComponent from './Request';
import { Menu } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendar');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isHostLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isHostLoggedIn');
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
        <HeaderHost activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
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
              setActiveTab('calendar');
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
              setActiveTab('price-update');
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
              setActiveTab('requests');
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
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import HeaderHost from './HeaderHost';
// import CalendarComponent from './Calender';
// import PriceUpdateComponent from './PriceUpdate';
// import RequestsComponent from './Request';
// import { Menu } from 'lucide-react';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('calendar');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isHostLoggedIn');
//     if (isLoggedIn !== 'true') {
//       navigate('/admin-login');
//     }
//   }, [navigate]);

//   const handleLogout = () => {
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
//         <HeaderHost activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
//       </div>

//       {/* Mobile Menu Toggle */}
//       <div className="md:hidden p-4 bg-white border-b flex justify-between items-center">
//         <span className="font-semibold">Admin Dashboard</span>
//         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//           <Menu className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-lg border-b">
//           <button
//             className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
//               activeTab === 'calendar' ? 'bg-gray-100 font-semibold' : ''
//             }`}
//             onClick={() => {
//               setActiveTab('calendar');
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
//               setActiveTab('price-update');
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
//               setActiveTab('requests');
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

//       <main className="py-6">{renderActiveComponent()}</main>
//     </div>
//   );
// };

// export default AdminDashboard;
