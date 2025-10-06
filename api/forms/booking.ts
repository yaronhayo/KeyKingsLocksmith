import type { VercelRequest, VercelResponse } from '@vercel/node';

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

    // TODO: Verify reCAPTCHA
    // TODO: Send email via Resend
    // TODO: Store in database

    // For now, just log and return success
    console.log('Booking submission:', {
      name: data.name,
      phone: data.phone,
      serviceType: data.serviceType,
      urgency: data.urgency
    });

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        submissionId: `booking_${Date.now()}`,
        message: 'Booking request received successfully'
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
