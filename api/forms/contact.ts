import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
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
    const data: ContactFormData = req.body;

    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
        replyTo: data.email,
        subject: `📧 New Contact Message: ${data.subject} - ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">New Contact Form Submission</h2>

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
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><a href="tel:${data.phone}">${data.phone}</a></td>
              </tr>
              ` : ''}
              <tr style="background-color: #fff3cd;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Subject:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>${data.subject}</strong></td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${data.message.replace(/\n/g, '<br>')}</td>
              </tr>
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
              <a href="mailto:${data.email}" style="color: #2196F3; text-decoration: none;">📧 Reply to ${data.name}</a><br>
              ${data.phone ? `<a href="tel:${data.phone}" style="color: #2196F3; text-decoration: none;">📞 Call ${data.phone}</a>` : ''}
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

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: data.email,
        subject: 'Message Received - Key Kings Locksmith',
        html: `
          <h2>Thank You for Contacting Us!</h2>
          <p>Hi ${data.name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <p><strong>Your Message:</strong></p>
          <blockquote>${data.message.replace(/\n/g, '<br>')}</blockquote>
          <hr>
          <p>Key Kings Locksmith<br>
          (864) 900-9597<br>
          keykingslocksmithsc@gmail.com</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    console.log('Contact submission processed:', submissionId);

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        submissionId,
        message: 'Message sent successfully',
        redirectUrl: '/thank-you'
      }
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process contact form'
    });
  }
}
