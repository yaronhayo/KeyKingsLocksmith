import type { APIRoute } from 'astro';
import emailService from '../../../lib/email/resend';
import { verifyRecaptcha, getClientIP, RecaptchaConfig } from '../../../lib/recaptcha/verify';

// Disable prerendering for this API route (required for hybrid mode)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: { email: string; source?: string; timestamp: string; recaptchaToken?: string } = await request.json();

    // Verify reCAPTCHA token (if provided)
    if (data.recaptchaToken) {
      const clientIP = getClientIP(request);
      const recaptchaResult = await verifyRecaptcha({
        token: data.recaptchaToken,
        remoteip: clientIP,
        expectedAction: RecaptchaConfig.newsletter.action,
        scoreThreshold: RecaptchaConfig.newsletter.scoreThreshold,
      });

      if (!recaptchaResult.success) {
        console.warn('reCAPTCHA verification failed for newsletter:', recaptchaResult.error_codes);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Security verification failed. Please try again.',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      console.log(`reCAPTCHA verified for newsletter (score: ${recaptchaResult.score})`);
    }

    // Validate and sanitize email
    const { validateEmail, sanitizeEmail } = await import('../../../lib/validation/forms');
    
    const emailError = validateEmail(data.email, true);
    if (emailError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: emailError,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sanitizedEmail = sanitizeEmail(data.email);

    // Generate subscription ID
    const subscriptionId = `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send welcome email
    const welcomeEmail = await emailService.sendNewsletterWelcome(sanitizedEmail);

    if (!welcomeEmail.success) {
      console.error('Failed to send welcome email:', welcomeEmail.error);
      // Continue anyway
    }

    // Log subscription (in production, save to database/mailing list service)
    console.log('Newsletter subscription:', {
      id: subscriptionId,
      email: sanitizedEmail,
      source: data.source || 'website',
      timestamp: data.timestamp,
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          subscriptionId,
          message: 'Successfully subscribed to newsletter',
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process newsletter subscription',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
