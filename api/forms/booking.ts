import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions
interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  urgency: string;
  address?: string;
  description?: string;
  recaptchaToken?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const data: BookingFormData = req.body;

    // Basic validation
    if (!data.name || !data.phone || !data.serviceType || !data.urgency) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const submissionId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send notification email to business
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: process.env.BUSINESS_EMAIL || 'keykingslocksmithsc@gmail.com',
        subject: `🔐 New Booking Request - ${data.urgency}`,
        html: `
          <h2>New Booking Request</h2>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
          <p><strong>Service Type:</strong> ${data.serviceType}</p>
          <p><strong>Urgency:</strong> ${data.urgency}</p>
          ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ''}
          ${data.description ? `<p><strong>Description:</strong> ${data.description}</p>` : ''}
          <hr>
          <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Continue anyway - don't fail the request
    }

    // Send confirmation email to customer if email provided
    if (data.email) {
      try {
        await resend.emails.send({
          from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
          to: data.email,
          subject: 'Booking Confirmation - Key Kings Locksmith',
          html: `
            <h2>Thank You for Your Booking Request!</h2>
            <p>Hi ${data.name},</p>
            <p>We've received your booking request and will contact you shortly at ${data.phone}.</p>
            <p><strong>Service:</strong> ${data.serviceType}</p>
            <p><strong>Urgency:</strong> ${data.urgency}</p>
            <hr>
            <p>Key Kings Locksmith<br>
            (864) 900-9597<br>
            keykingslocksmithsc@gmail.com</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }
    }

    console.log('Booking submission processed:', submissionId);

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        submissionId,
        message: 'Booking request received successfully',
        redirectUrl: '/thank-you'
      }
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process booking request'
    });
  }
}
