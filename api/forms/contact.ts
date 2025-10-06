import type { VercelRequest, VercelResponse } from '@vercel/node';

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
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
    const data: ContactFormData = req.body;

    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // TODO: Verify reCAPTCHA
    // TODO: Send email via Resend
    // TODO: Store in database

    // For now, just log and return success
    console.log('Contact submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject
    });

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        submissionId: `contact_${Date.now()}`,
        message: 'Message sent successfully'
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
