import type { APIRoute } from 'astro';
import type { ContactFormData } from '../../../types';
import emailService from '../../../lib/email/resend';
import { verifyRecaptcha, getClientIP, RecaptchaConfig } from '../../../lib/recaptcha/verify';

// Disable prerendering for this API route (required for hybrid mode)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: ContactFormData & { timestamp: string; requestId: string } = await request.json();

    // Verify reCAPTCHA token
    if (data.recaptchaToken) {
      const clientIP = getClientIP(request);
      const recaptchaResult = await verifyRecaptcha({
        token: data.recaptchaToken,
        remoteip: clientIP,
        expectedAction: RecaptchaConfig.contact.action,
        scoreThreshold: RecaptchaConfig.contact.scoreThreshold,
      });

      if (!recaptchaResult.success) {
        console.warn('reCAPTCHA verification failed for contact form:', recaptchaResult.error_codes);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Security verification failed. Please try again.',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      console.log(`reCAPTCHA verified for contact (score: ${recaptchaResult.score})`);
    }

    // Validate and sanitize form data
    const { processContactForm } = await import('../../../lib/validation/forms');
    
    let validatedData: ContactFormData;
    try {
      validatedData = processContactForm(data);
    } catch (error) {
      console.error('Contact form validation error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : 'Invalid form data',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate submission ID
    const submissionId = data.requestId || `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send notification email to business
    const businessEmail = await emailService.sendContactNotification(validatedData, submissionId);

    if (!businessEmail.success) {
      console.error('Failed to send business notification:', businessEmail.error);
    }

    // Send confirmation email to customer
    const customerEmail = await emailService.sendContactConfirmation(validatedData);
    if (!customerEmail.success) {
      console.error('Failed to send customer confirmation:', customerEmail.error);
    }

    // Log submission
    console.log('Contact submission:', {
      id: submissionId,
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      timestamp: data.timestamp,
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          submissionId,
          message: 'Message sent successfully',
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process contact form',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
