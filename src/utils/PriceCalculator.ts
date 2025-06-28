import { format, eachDayOfInterval } from 'date-fns';
import { supabase } from './supabaseClient';

export const fetchTotalPrice = async (pickupDate: Date, returnDate: Date) => {
  const dateList = eachDayOfInterval({ start: pickupDate, end: returnDate }).map(d => format(d, 'yyyy-MM-dd'));

  const { data: basePrices, error: baseError } = await supabase
    .from('calendar_prices')
    .select('base_price')
    .in('date', dateList);

  if (baseError) throw new Error(baseError.message);

  const baseTotal = basePrices.reduce((sum, row) => sum + (row.base_price || 0), 0);

  const { data: costData, error: costError } = await supabase
    .from('extra_costs')
    .select('*')
    .single();

  if (costError) throw new Error(costError.message);

  const total = baseTotal + (costData.insurance_fee || 0) + (costData.service_fee || 0);

  return {
    total,
    baseTotal,
    insurance: costData.insurance_fee,
    serviceFee: costData.service_fee,
    deposit: costData.deposit,
    extraMilesFee: costData.extra_miles_fee,
    baseRate: basePrices.length ? baseTotal / basePrices.length : 0,
    baseDays: basePrices.length,
    milesIncluded: costData.miles_included
  };
};
