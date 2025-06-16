// components/BookingPageWrapper.tsx
import React, { useState } from 'react';
import BookingPage from './BookingPage';
import { useNavigate } from 'react-router-dom';
import { BookingState, CustomerInfo } from '../types';
import { car } from '../data/mockData';
import { calculateTotalDays, calculateTotalPrice } from '../utils/bookingUtils';
import { supabase } from '../utils/supabaseClient';

const sendEmailToHost = async ({ fullName, email, bookingId, totalPrice, pickupDate, returnDate, carName }: any) => {
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
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1,
    dateRange: { pickupDate: null, returnDate: null },
    selectedCar: car,
    customerInfo: { fullName: '', email: '', phone: '', specialRequests: '' },
  });

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

      alert('Booking submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  return (
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
  );
};

export default BookingPageWrapper;
