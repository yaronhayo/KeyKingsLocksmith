import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions
interface NewsletterData {
  email: string;
  source?: string;
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
    const data: NewsletterData = req.body;

    // Basic validation
    if (!data.email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    const subscriptionId = `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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

    // Send notification to business
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: 'yaron@gettmarketing.com',
        cc: process.env.BUSINESS_EMAIL || 'keykingslocksmithsc@gmail.com',
        subject: '📰 New Newsletter Subscription',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">New Newsletter Subscriber</h2>

            <h3 style="color: #2C3E50; margin-top: 25px;">📋 Subscription Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Subscription ID:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${subscriptionId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Source:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${data.source || 'website'}</td>
              </tr>
            </table>

            <h3 style="color: #2C3E50; margin-top: 25px;">🌐 Session Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Subscribed:</strong></td>
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
              <strong>💡 Tip:</strong> Add this subscriber to your email marketing list for updates and promotions.
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
    }

    // Send welcome email to subscriber
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: data.email,
        subject: 'Welcome to Key Kings Locksmith Newsletter!',
        html: `
          <h2>Welcome to Our Newsletter!</h2>
          <p>Thank you for subscribing to Key Kings Locksmith updates.</p>
          <p>You'll receive:</p>
          <ul>
            <li>Security tips and advice</li>
            <li>Special offers and promotions</li>
            <li>News about our services</li>
            <li>Emergency locksmith tips</li>
          </ul>
          <hr>
          <p>Key Kings Locksmith<br>
          (864) 900-9597<br>
          keykingslocksmithsc@gmail.com</p>
          <p><small>To unsubscribe, reply to this email with "UNSUBSCRIBE"</small></p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    console.log('Newsletter subscription processed:', subscriptionId);

    // Return success response (no redirect for newsletter)
    return res.status(200).json({
      success: true,
      data: {
        subscriptionId,
        message: 'Successfully subscribed to newsletter'
      }
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process newsletter subscription'
    });
  }
}
