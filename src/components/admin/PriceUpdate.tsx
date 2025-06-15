// src/components/admin/PriceUpdateComponent.tsx
import React, { useState } from 'react';
import CalendarComponent from './Calender';
import { supabase } from '../../utils/supabaseClient.ts';
import { eachDayOfInterval, parseISO, format } from 'date-fns';

interface PriceUpdateState {
  dateStart: string;
  dateEnd: string;
  action: 'block' | 'unblock' | 'price-update';
  price: string;
  depositTrips: string;
  insuranceTrips: string;
  additionalMiles: string;
  serviceFees: string;
}

const PriceUpdateComponent: React.FC = () => {
  const [formData, setFormData] = useState<PriceUpdateState>({
    dateStart: '2025-06-15',
    dateEnd: '2025-06-15',
    action: 'block',
    price: '220',
    depositTrips: '220',
    insuranceTrips: '220',
    additionalMiles: '220',
    serviceFees: '220',
  });

  const handleInputChange = (field: keyof PriceUpdateState, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateUpdate = async () => {
    const { dateStart, dateEnd, action, price } = formData;

    const dateRange = eachDayOfInterval({
      start: parseISO(dateStart),
      end: parseISO(dateEnd)
    });

    const updates = dateRange.map(date => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      return {
        date: formattedDate,
        base_price: action === 'price-update' ? Number(price) : 0,
        is_available: action === 'block' ? false : true,
        status: action === 'block' ? 'blocked' : 'available'
      };
    });

    for (const update of updates) {
      const { error } = await supabase
        .from('calendar_prices')
        .upsert(update, { onConflict: ['date'] });

      if (error) {
        console.error('Error updating date:', update.date, error.message);
        alert(`Failed on ${update.date}: ${error.message}`);
        return;
      }
    }

    alert(`Dates updated successfully! Action: ${action}`);
  };

  const handleCostUpdate = async () => {
    const { dateStart, dateEnd, depositTrips, insuranceTrips, additionalMiles, serviceFees } = formData;

    const dateRange = eachDayOfInterval({
      start: parseISO(dateStart),
      end: parseISO(dateEnd)
    });

    const updates = dateRange.map(date => ({
      date: format(date, 'yyyy-MM-dd'),
      deposit: Number(depositTrips),
      insurance_fee: Number(insuranceTrips),
      extra_miles_fee: Number(additionalMiles),
      service_fee: Number(serviceFees)
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('calendar_prices')
        .upsert(update, { onConflict: ['date'] });

      if (error) {
        console.error('Error updating cost for:', update.date, error.message);
        alert(`Failed on ${update.date}: ${error.message}`);
        return;
      }
    }

    alert('Cost settings updated successfully!');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <CalendarComponent />

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Price & Availability Update</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Start
              </label>
              <input
                type="date"
                value={formData.dateStart}
                onChange={(e) => handleInputChange('dateStart', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={today}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date End
              </label>
              <input
                type="date"
                value={formData.dateEnd}
                onChange={(e) => handleInputChange('dateEnd', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={formData.dateStart || today}
              />
            </div>
          </div>

          {formData.dateStart && formData.dateEnd && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
              Selected Range: {formatDate(formData.dateStart)} - {formatDate(formData.dateEnd)}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Action</label>
            <div className="flex flex-wrap gap-4 items-center">
              {['block', 'unblock', 'price-update'].map((act) => (
                <label key={act} className="flex items-center">
                  <input
                    type="radio"
                    name="action"
                    value={act}
                    checked={formData.action === act}
                    onChange={(e) => handleInputChange('action', e.target.value as any)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  {act.replace('-', ' ').toUpperCase()}
                </label>
              ))}
              {formData.action === 'price-update' && (
                <div className="flex items-center ml-4">
                  <span className="mr-2 text-sm">$</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Price"
                    min="0"
                    step="1"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleDateUpdate}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mb-8"
          >
            Update Dates
          </button>

          <hr className="mb-6" />

          <h3 className="text-lg font-semibold mb-4">Other Cost Updates</h3>
          <div className="space-y-4">
            {[
              { key: 'depositTrips', label: 'Deposit per Trip' },
              { key: 'insuranceTrips', label: 'Insurance per Trip' },
              { key: 'additionalMiles', label: 'Additional Miles Charge' },
              { key: 'serviceFees', label: 'Service Fees' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">$</span>
                  <input
                    type="number"
                    value={formData[key as keyof PriceUpdateState]}
                    onChange={(e) => handleInputChange(key as keyof PriceUpdateState, e.target.value)}
                    className="px-3 py-2 border rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step={key === 'additionalMiles' ? '0.01' : '1'}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCostUpdate}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mt-6"
          >
            Update Costs
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceUpdateComponent;
        