// src/components/admin/HeaderHost.tsx
import React from 'react';
import { Calendar, DollarSign, FileText, LogOut } from 'lucide-react';

interface HeaderHostProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const HeaderHost: React.FC<HeaderHostProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src="/EzyRide.png"
                alt="EzyRide Logo"
                className="h-8 w-auto sm:h-11 mr-3"
              />
            </div>
          </div>
         
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'calendar'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              CALENDAR
            </button>
       
            <button
              onClick={() => setActiveTab('price-update')}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'price-update'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              PRICE UPDATE
            </button>
            
            <button
              onClick={() => setActiveTab('requests')}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'requests'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              REQUESTS
            </button>
           
            <button
              onClick={onLogout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md"
            >
              <LogOut className="w-4 h-4 mr-2" />
              LOGOUT
            </button>
          </nav>

          {/* Mobile Navigation - Icon Only */}
          <nav className="flex md:hidden space-x-4">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`p-2 rounded-md ${
                activeTab === 'calendar'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Calendar"
            >
              <Calendar className="w-5 h-5" />
            </button>
       
            <button
              onClick={() => setActiveTab('price-update')}
              className={`p-2 rounded-md ${
                activeTab === 'price-update'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Price Update"
            >
              <DollarSign className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setActiveTab('requests')}
              className={`p-2 rounded-md ${
                activeTab === 'requests'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Requests"
            >
              <FileText className="w-5 h-5" />
            </button>
           
            <button
              onClick={onLogout}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-md"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderHost;