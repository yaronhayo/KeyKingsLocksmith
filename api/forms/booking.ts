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
  apartment?: string;
  gateCode?: string;
  notes?: string;
  description?: string;  // Keep for backward compatibility
  recaptchaToken?: string;
  timestamp?: string;
  requestId?: string;
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

    // Build full address with apartment and gate code
    const fullAddress = [
      data.address,
      data.apartment ? `Apt/Unit: ${data.apartment}` : '',
      data.gateCode ? `Gate Code: ${data.gateCode}` : ''
    ].filter(Boolean).join(', ');

    // Use notes or description field
    const customerNotes = data.notes || data.description;

    // Extract session information
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referer = req.headers['referer'] || 'Direct';
    const ipAddress = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown';
    const submittedAt = new Date();
    const formattedDateTime = submittedAt.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Send notification email to business
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: 'yaron@gettmarketing.com',
        cc: process.env.BUSINESS_EMAIL || 'keykingslocksmithsc@gmail.com',
        subject: `🔐 New Booking Request - ${data.urgency} - ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">New Booking Request</h2>

            <h3 style="color: #2C3E50; margin-top: 25px;">📋 Lead Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Submission ID:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${submissionId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Name:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${data.name}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><a href="tel:${data.phone}">${data.phone}</a></td>
              </tr>
              ${data.email ? `
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              ` : ''}
              <tr style="background-color: #fff3cd;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Service Type:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>${data.serviceType}</strong></td>
              </tr>
              <tr style="background-color: ${data.urgency === 'asap' || data.urgency === 'Emergency' ? '#f8d7da' : '#f8f9fa'};">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Urgency:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>${data.urgency}</strong></td>
              </tr>
              ${fullAddress ? `
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Location:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${fullAddress}</td>
              </tr>
              ` : ''}
              ${customerNotes ? `
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6; vertical-align: top;"><strong>Notes:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${customerNotes}</td>
              </tr>
              ` : ''}
            </table>

            <h3 style="color: #2C3E50; margin-top: 25px;">🌐 Session Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Submitted:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${formattedDateTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>IP Address:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${ipAddress}</td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Referrer:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${referer}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>User Agent:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6; font-size: 11px;">${userAgent}</td>
              </tr>
              ${data.timestamp ? `
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Client Timestamp:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'long' })}</td>
              </tr>
              ` : ''}
              ${data.requestId ? `
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Request ID:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${data.requestId}</td>
              </tr>
              ` : ''}
            </table>

            <div style="margin-top: 25px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #2196F3;">
              <strong>⚡ Quick Actions:</strong><br>
              <a href="tel:${data.phone}" style="color: #2196F3; text-decoration: none;">📞 Call ${data.name}</a><br>
              ${data.email ? `<a href="mailto:${data.email}" style="color: #2196F3; text-decoration: none;">📧 Email ${data.email}</a><br>` : ''}
              ${fullAddress ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}" style="color: #2196F3; text-decoration: none;">📍 View Location</a>` : ''}
            </div>

            <hr style="margin: 25px 0; border: none; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 12px; text-align: center;">
              Key Kings Locksmith - Lead Notification System<br>
              <em>${submittedAt.toISOString()}</em>
            </p>
          </div>
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
