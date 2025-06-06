import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CarDetails from './components/CarDetails';
import CustomerFormModal from './components/CustomerFormModal';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import { BookingState, DateRange, Car, CustomerInfo } from './types';
import { car } from './data/mockData';
import './utils/animations.css';

function App() {
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1,
    dateRange: {
      pickupDate: null,
      returnDate: null,
    },
    selectedCar: car,
    customerInfo: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  const handleDateChange = (field: keyof DateRange, value: Date | null) => {
    setBookingState(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value,
      },
    }));
  };

  const handleCustomerInfoChange = (info: Partial<CustomerInfo>) => {
    setBookingState(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        ...info,
      },
    }));
  };

  const handleInitialSubmit = () => {
    setShowModal(true);
  };

  const handleCustomerFormSubmit = () => {
    const newBookingId = `DR${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(newBookingId);
    setShowModal(false);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const resetBooking = () => {
    setBookingState({
      step: 1,
      dateRange: {
        pickupDate: null,
        returnDate: null,
      },
      selectedCar: car,
      customerInfo: {
        fullName: '',
        email: '',
        phone: '',
        specialRequests: '',
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <Hero 
        dateRange={bookingState.dateRange}
        onDateChange={handleDateChange}
        onSubmit={handleInitialSubmit}
      />
      <CarDetails car={car} />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />

      {/* Customer Form Modal */}
      {showModal && (
        <CustomerFormModal
          customerInfo={bookingState.customerInfo}
          onCustomerInfoChange={handleCustomerInfoChange}
          onSubmit={handleCustomerFormSubmit}
          onClose={() => setShowModal(false)}
          dateRange={bookingState.dateRange}
          selectedCar={car}
        />
      )}

      {/* Booking Confirmation Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-slide-up z-50">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-medium">Booking Confirmed!</p>
              <p className="text-sm">Booking ID: {bookingId}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;