// File: supabase/functions/send-confirmation/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Replace this with your SendGrid API key from Supabase env vars
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");

serve(async (req: Request) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const {
      fullName,
      email,
      bookingId,
      totalPrice,
      pickupDate,
      returnDate,
      carName,
    } = await req.json();

    if (!SENDGRID_API_KEY) {
      throw new Error("Missing SendGrid API key");
    }

    // ✅ Call SendGrid API directly
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "aanal.s.patel1705@gmail.com" }],
            subject: `New Booking Request - ${bookingId}`,
          },
        ],
        from: { email: "aanal.creativetime@gmail.com" },
        content: [
          {
            type: "text/html",
            value: `
              <h2>New Booking Request</h2>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Car:</strong> ${carName}</p>
              <p><strong>Pickup Date:</strong> ${pickupDate}</p>
              <p><strong>Return Date:</strong> ${returnDate}</p>
              <p><strong>Total Price:</strong> $${totalPrice}</p>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
            `,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`SendGrid error: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent" }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
});
