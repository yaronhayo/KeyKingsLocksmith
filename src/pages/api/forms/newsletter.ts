import type { APIRoute } from 'astro';
import emailService from '../../../lib/email/resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: { email: string; source?: string; timestamp: string } = await request.json();

    // Validate email
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Valid email address is required',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate subscription ID
    const subscriptionId = `newsletter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send welcome email
    const welcomeEmail = await emailService.sendNewsletterWelcome(data.email);

    if (!welcomeEmail.success) {
      console.error('Failed to send welcome email:', welcomeEmail.error);
      // Continue anyway
    }

    // Log subscription (in production, save to database/mailing list service)
    console.log('Newsletter subscription:', {
      id: subscriptionId,
      email: data.email,
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
