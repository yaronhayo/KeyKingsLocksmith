import type { APIRoute } from 'astro';
import type { BookingFormData } from '../../../types';
import emailService from '../../../lib/email/resend';
import { verifyRecaptcha, getClientIP, RecaptchaConfig } from '../../../lib/recaptcha/verify';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: BookingFormData & { timestamp: string; requestId: string } = await request.json();

    // Verify reCAPTCHA token
    if (data.recaptchaToken) {
      const clientIP = getClientIP(request);
      const recaptchaResult = await verifyRecaptcha({
        token: data.recaptchaToken,
        remoteip: clientIP,
        expectedAction: RecaptchaConfig.booking.action,
        scoreThreshold: RecaptchaConfig.booking.scoreThreshold,
      });

      if (!recaptchaResult.success) {
        console.warn('reCAPTCHA verification failed for booking form:', recaptchaResult.error_codes);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Security verification failed. Please try again.',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      console.log(`reCAPTCHA verified for booking (score: ${recaptchaResult.score})`);
    }

    // Validate and sanitize form data
    const { processBookingForm } = await import('../../../lib/validation/forms');
    
    let validatedData: BookingFormData;
    try {
      validatedData = processBookingForm(data);
    } catch (error) {
      console.error('Booking form validation error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : 'Invalid form data',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate submission ID
    const submissionId = data.requestId || `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send notification email to business
    const businessEmail = await emailService.sendBookingNotification(validatedData, submissionId);

    if (!businessEmail.success) {
      console.error('Failed to send business notification:', businessEmail.error);
      // Continue anyway - don't fail the request
    }

    // Send confirmation email to customer (if email provided)
    if (validatedData.email) {
      const customerEmail = await emailService.sendBookingConfirmation(validatedData);
      if (!customerEmail.success) {
        console.error('Failed to send customer confirmation:', customerEmail.error);
      }
    }

    // Log submission (in production, save to database)
    console.log('Booking submission:', {
      id: submissionId,
      name: validatedData.name,
      phone: validatedData.phone,
      serviceType: validatedData.serviceType,
      urgency: validatedData.urgency,
      timestamp: data.timestamp,
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          submissionId,
          message: 'Booking request received successfully',
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Booking API error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process booking request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
