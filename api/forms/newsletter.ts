import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions
interface NewsletterData {
  email: string;
  source?: string;
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

    // Send notification to business
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: process.env.BUSINESS_EMAIL || 'keykingslocksmithsc@gmail.com',
        subject: '📰 New Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Subscription ID:</strong> ${subscriptionId}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Source:</strong> ${data.source || 'website'}</p>
          <hr>
          <p><em>Subscribed at: ${new Date().toLocaleString()}</em></p>
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
