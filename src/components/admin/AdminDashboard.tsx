import React, { useState } from 'react';
import HeaderHost from './HeaderHost';
import CalendarComponent from './Calender';
import PriceUpdateComponent from './PriceUpdate';
import RequestsComponent from './Request';

import { Calendar, DollarSign, FileText, LogOut, ChevronLeft, ChevronRight, Edit, Eye, Check, X } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    const handleLogout = () => {
      setIsLoggedIn(false);
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
  
    if (!isLoggedIn) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-600 mb-2">EzyRide</h1>
              <p className="text-gray-600">Welcome HOST</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username*
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password*
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
              
              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password
                </a>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-3xl font-bold text-blue-600">EzyRide</div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderHost 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout}
        />
        
        <main className="py-6">
          {renderActiveComponent()}
        </main>
      </div>
    );
  };
  
  export default AdminDashboard;
