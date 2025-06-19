import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHost from './HeaderHost';
import CalendarComponent from './Calender';
import PriceUpdateComponent from './PriceUpdate';
import RequestsComponent from './Request';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendar');

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
      <HeaderHost activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <main className="py-6">{renderActiveComponent()}</main>
    </div>
  );
};

export default AdminDashboard;
