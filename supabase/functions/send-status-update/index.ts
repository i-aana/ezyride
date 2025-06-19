import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const { email, fullName, status } = await req.json();

    const subject =
      status === 'confirmed'
        ? 'Your Booking Has Been Confirmed 🎉'
        : 'Your Booking Was Rejected 😞';

    const body =
      status === 'confirmed'
        ? `Hi ${fullName},\n\nYour booking has been confirmed. Thank you for choosing us!\n\n- EzyRide KY`
        : `Hi ${fullName},\n\nWe’re sorry to inform you that your booking request has been rejected.\n\n- EzyRide KY`;

    const apiKey = Deno.env.get('SENDGRID_API_KEY');

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }], subject }],
        from: { email: 'booking@ezyrideky.com', name: 'EzyRide KY' },
        content: [{ type: 'text/plain', value: body }],
      }),
    });

    const responseBody = await res.text();

    return new Response(
      JSON.stringify({
        ok: res.ok,
        status: res.status,
        responseBody,
      }),
      {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: err.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});
