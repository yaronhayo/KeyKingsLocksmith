import type { VercelRequest, VercelResponse } from '@vercel/node';

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

    // TODO: Verify reCAPTCHA
    // TODO: Add to mailing list
    // TODO: Send welcome email

    // For now, just log and return success
    console.log('Newsletter subscription:', {
      email: data.email,
      source: data.source || 'website'
    });

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        subscriptionId: `newsletter_${Date.now()}`,
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
