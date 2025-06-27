// components/BookingPageWrapper.tsx
import React, { useState, useEffect } from 'react';
import BookingPage from './BookingPage';
import { useNavigate } from 'react-router-dom';
import { BookingState, CustomerInfo } from '../types';
import { car } from '../data/mockData';
import { calculateTotalDays, calculateTotalPrice } from '../utils/bookingUtils';
import { supabase } from '../utils/supabaseClient';
import { fetchTotalPrice } from '../utils/PriceCalculator.ts';

const sendEmailToHost = async ({
  fullName,
  email,
  bookingId,
  totalPrice,
  pickupDate,
  returnDate,
  carName,
}: any) => {
  try {
    const res = await fetch('https://znujbwmnpanlhwxgwlhm.supabase.co/functions/v1/send-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ fullName, email, bookingId, totalPrice, pickupDate, returnDate, carName }),
    });

    if (!res.ok) {
      console.error('Email send failed:', await res.json());
    } else {
      console.log('Host notified successfully.');
    }
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

const BookingPageWrapper = () => {
  const navigate = useNavigate();

  const [bookingId, setBookingId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1,
    dateRange: { pickupDate: null, returnDate: null },
    selectedCar: car,
    customerInfo: { firstName: '', lastName: '', email: '', phone: '', specialRequests: '' },
  });

  // Load dates from localStorage
  useEffect(() => {
    const storedPickup = localStorage.getItem('pickupDate');
    const storedReturn = localStorage.getItem('returnDate');

    if (storedPickup || storedReturn) {
      setBookingState(prev => ({
        ...prev,
        dateRange: {
          pickupDate: storedPickup ? new Date(storedPickup) : null,
          returnDate: storedReturn ? new Date(storedReturn) : null,
        },
      }));
    }
  }, []);

  const handleCustomerInfoChange = (info: Partial<CustomerInfo>) => {
    setBookingState(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, ...info },
    }));
  };

  const handleCustomerFormSubmit = async () => {
    try {
      const { pickupDate, returnDate } = bookingState.dateRange;
      const totalDays = calculateTotalDays(pickupDate, returnDate);
      const costBreakdown = await fetchTotalPrice(pickupDate, returnDate);
      const totalPrice = costBreakdown.total;

      const pickupDateStr = pickupDate?.toISOString() ?? '';
      const returnDateStr = returnDate?.toISOString() ?? '';
      console.log("Customer Info before insert:", bookingState.customerInfo);
      const fullName = [bookingState.customerInfo.firstName, bookingState.customerInfo.lastName]
      .filter(Boolean)
      .join(' ')
      .trim();

      // Insert into Supabase
      const { error } = await supabase.from('bookings1').insert([
        {
          full_name: `${bookingState.customerInfo.firstName} ${bookingState.customerInfo.lastName}`.trim(),
          email: bookingState.customerInfo.email,
          phone: bookingState.customerInfo.phone,
          special_requests: bookingState.customerInfo.specialRequests?.trim() || 'none',
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
      console.log("Sending to Edge Function:", {
        fullName,
        email: bookingState.customerInfo.email,
        bookingId: newBookingId,
        totalPrice,
        pickupDate: pickupDateStr,
        returnDate: returnDateStr,
        carName: bookingState.selectedCar.name,
      });

      await sendEmailToHost({
        fullName,
        email: bookingState.customerInfo.email,
        bookingId: newBookingId,
        totalPrice,
        pickupDate: pickupDateStr,
        returnDate: returnDateStr,
        carName: bookingState.selectedCar.name,
      });

      // Cleanup
      localStorage.removeItem('pickupDate');
      localStorage.removeItem('returnDate');

      setShowConfirmation(true); // Show confirmation modal
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  return (
    <>
      <BookingPage
        bookingState={bookingState}
        handleCustomerInfoChange={handleCustomerInfoChange}
        handleCustomerFormSubmit={handleCustomerFormSubmit}
        onDateChange={(field, value) =>
          setBookingState(prev => ({
            ...prev,
            dateRange: { ...prev.dateRange, [field]: value },
          }))
        }
      />

      {/* {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold text-green-700 mb-4">Booking Confirmed!</h2>
            <p className="mb-2">Booking ID:</p>
            <p className="font-mono text-blue-600 mb-4">{bookingId}</p>
            <button
              onClick={() => {
                setShowConfirmation(false);
                navigate('/');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Home
            </button> */}
          {/* </div> */}
        {/* // </div> */}
      {/* )} */}
    </>
  );
};

export default BookingPageWrapper;
