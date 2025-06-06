import { NextRequest, NextResponse } from 'next/server';
import {supabase} from '../../src/utils/supabaseClient';
import { sendBookingEmail } from '../../src/utils/sendEmails';

export async function POST(req: NextRequest) {
    try{
    const data = await req.json();
    
    console.log('Received booking data:', data);
    const { error } = await supabase.from('bookings').insert([data]);

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await sendBookingEmail(data);
  return NextResponse.json({ message: 'Booking submitted and email sent.' });
}
catch (err) {
  console.error('API handler error:', err);
  return NextResponse.json({ error: 'Server error' }, { status: 500 });
}

}
