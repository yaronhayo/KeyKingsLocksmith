import type { APIRoute } from 'astro';
import type { ContactFormData } from '../../../types';
import emailService from '../../../lib/email/resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: ContactFormData & { timestamp: string; requestId: string } = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate submission ID
    const submissionId = data.requestId || `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send notification email to business
    const businessEmail = await emailService.sendContactNotification(data, submissionId);

    if (!businessEmail.success) {
      console.error('Failed to send business notification:', businessEmail.error);
    }

    // Send confirmation email to customer
    const customerEmail = await emailService.sendContactConfirmation(data);
    if (!customerEmail.success) {
      console.error('Failed to send customer confirmation:', customerEmail.error);
    }

    // Log submission
    console.log('Contact submission:', {
      id: submissionId,
      name: data.name,
      email: data.email,
      subject: data.subject,
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
