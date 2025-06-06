import React, { useState } from 'react'; //parent component of customerformmodal
import CustomerFormModal from './CustomerFormModal';
import { CustomerInfo, DateRange } from '../types';
import { car as selectedCar } from '../data/mockData'; 
import { calculateTotalDays, calculateTotalPrice } from '../utils/bookingUtils';

const BookingPage = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [dateRange, setDateRange] = useState<DateRange>({
    pickupDate: null,
    returnDate: null,
  });

  // const [selectedCar, setSelectedCar] = useState<Car>({
  //   name: 'Toyota Camry',
  //   price: 50,
  // });

  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // const calculateTotalDays = () => {
  //   if (!dateRange.pickupDate || !dateRange.returnDate) return 0;
  //   const diffTime = Math.abs(dateRange.returnDate.getTime() - dateRange.pickupDate.getTime());
  //   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // };

  // const totalDays = calculateTotalDays();
  // const totalPrice = totalDays * selectedCar.price;
  const totalDays = calculateTotalDays(dateRange.pickupDate, dateRange.returnDate);
  const totalPrice = calculateTotalPrice(totalDays, selectedCar.price);

  const handleBookingSubmit = async () => {
    try {

      if (!dateRange.pickupDate || !dateRange.returnDate) {
        alert('Please select both pickup and return dates.');
        return;
      }
      
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: customerInfo.fullName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          special_requests: customerInfo.specialRequests,
          pickup_date: dateRange.pickupDate,
          return_date: dateRange.returnDate,
          total_days: totalDays,
          total_price: totalPrice,
          status: 'pending',
        }),
      });
      const responseData = await res.json();


      if (res.ok) {
        alert('Booking submitted successfully!');
        console.log('Server response:', responseData);
        setModalOpen(false);
        setModalOpen(false);
        // reset form if needed
      } else {
        const errorData = await res.json();
        console.error('Booking error:', errorData);
        alert('Error: ' + errorData.error);  // because you're returning { error: error.message }

        alert('Error submitting booking: ' + errorData.message);
      }
    } catch (error) {
      console.error('Network or code error:', error);
      alert('Failed to submit booking: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <>
      {/* Your page content and car/date selection UI here */}
      <button onClick={() => setModalOpen(true)} className="btn-primary">
        Book Now
      </button>

      {modalOpen && (
        <CustomerFormModal
          customerInfo={customerInfo}
          onCustomerInfoChange={(info) => setCustomerInfo((prev) => ({ ...prev, ...info }))}
          onSubmit={handleBookingSubmit}
          onClose={() => setModalOpen(false)}
          dateRange={dateRange}
          selectedCar={selectedCar}
        />
      )}
    </>
  );
};

export default BookingPage;
