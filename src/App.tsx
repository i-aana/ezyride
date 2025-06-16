import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CarDetails from './components/CarDetails';
import CustomerFormModal from './components/CustomerFormModal';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import { BookingState, CustomerInfo, DateRange } from './types';
import { car } from './data/mockData';
import { calculateTotalDays, calculateTotalPrice } from './utils/bookingUtils';
import { supabase } from './utils/supabaseClient';
import './utils/animations.css';
import BookingPage from './components/BookingPage';
import { useNavigate } from 'react-router-dom';
import RiderInfoStep from './components/RiderInfoStep';


const sendEmailToHost = async ({
  fullName,
  email,
  bookingId,
  totalPrice,
  pickupDate,
  returnDate,
  carName,
}: {
  fullName: string;
  email: string;
  bookingId: string;
  totalPrice: number;
  pickupDate: string;
  returnDate: string;
  carName: string;
}) => {
  try {
    const res = await fetch('https://znujbwmnpanlhwxgwlhm.supabase.co/functions/v1/send-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        fullName,
        email,
        bookingId,
        totalPrice,
        pickupDate,
        returnDate,
        carName,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Email send failed:', error);
    } else {
      console.log('Host notified successfully.');
    }
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

function App() {
  // const [dateRange, setDateRange] = useState<DateRange>({
  //   pickupDate: null,
  //   returnDate: null,
  // });

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

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
    navigate('/booking');
  };

  const handleCustomerFormSubmit = async () => {
    try {
      const { pickupDate, returnDate } = bookingState.dateRange;
      const totalDays = calculateTotalDays(pickupDate, returnDate);
      const totalPrice = calculateTotalPrice(totalDays, bookingState.selectedCar.price);
      const pickupDateStr = pickupDate?.toISOString() ?? '';
      const returnDateStr = returnDate?.toISOString() ?? '';

      const { error } = await supabase.from('bookings1').insert([
        {
          full_name: bookingState.customerInfo.fullName,
          email: bookingState.customerInfo.email,
          phone: bookingState.customerInfo.phone,
          special_requests: bookingState.customerInfo.specialRequests,
          pickup_date: pickupDateStr,
          return_date: returnDateStr,
          total_days: totalDays,
          total_price: totalPrice,
          status: 'pending',
        },
      ]);

      if (error) {
        console.error('Supabase insert error:', error);
        alert('Error saving booking: ' + error.message);
        return;
      }

      const newBookingId = `DR${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(newBookingId);

      await sendEmailToHost({
        fullName: bookingState.customerInfo.fullName,
        email: bookingState.customerInfo.email,
        bookingId: newBookingId,
        totalPrice,
        pickupDate: pickupDateStr,
        returnDate: returnDateStr,
        carName: bookingState.selectedCar.name,
      });

      setShowModal(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);

      resetBooking();
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Failed to submit booking. Please try again.');
    }
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
  console.log("handleCustomerInfoChange in App:", handleCustomerInfoChange);
  console.log('typeof handleCustomerInfoChange:', typeof handleCustomerInfoChange);


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero
        dateRange={bookingState.dateRange}
        onDateChange={(field, value) =>
          setBookingState(prev => ({
            ...prev,
            dateRange: {
              ...prev.dateRange,
              [field]: value,
            },
          }))
        }        onSubmit={handleInitialSubmit}
      />

      {/* <RiderInfoStep
        formData={bookingState.customerInfo}
        handleInputChange={(field, value) =>
          setBookingState(prev => ({
            ...prev,
            customerInfo: {
              ...prev.customerInfo,
              [field]: value,
            },
          }))
        }
        dateRange={bookingState.dateRange}
        onDateChange={(field, value) =>
          setBookingState(prev => ({
            ...prev,
            dateRange: {
              ...prev.dateRange,
              [field]: value,
            },
          }))
        }
        
      /> */}

      <CarDetails car={car} />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />

      {/* <BookingPage
        bookingState={bookingState}
        handleCustomerFormSubmit={handleCustomerFormSubmit}
        handleCustomerInfoChange={handleCustomerInfoChange}
        onDateChange={(field, value) =>
          setBookingState(prev => ({
            ...prev,
            dateRange: { ...prev.dateRange, [field]: value },
          }))
        }
      /> */}

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
