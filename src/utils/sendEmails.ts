import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendBookingEmail(data: any) {
  const msg = {
    to: process.env.BOOKING_NOTIFY_EMAIL!,
    from: 'aanal.creativetime@gmail.com',
    subject: 'New Booking Request',
    html: `
      <h2>New Booking Details</h2>
      <p><strong>Name:</strong> ${data.full_name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Pickup:</strong> ${data.pickup_date}</p>
      <p><strong>Return:</strong> ${data.return_date}</p>
      <p><strong>Total Days:</strong> ${data.total_days}</p>
      <p><strong>Total Price:</strong> $${data.total_price}</p>
      <p><strong>Special Requests:</strong> ${data.special_requests || 'None'}</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <br/>
      <a href="mailto:${process.env.BOOKING_NOTIFY_EMAIL}?subject=Confirm Booking&body=Yes">✅ Confirm</a>
      &nbsp;&nbsp;
      <a href="mailto:${process.env.BOOKING_NOTIFY_EMAIL}?subject=Confirm Booking&body=No">❌ Reject</a>
    `,
  };

  await sgMail.send(msg);
}
