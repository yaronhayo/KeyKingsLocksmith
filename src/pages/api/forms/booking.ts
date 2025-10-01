import type { APIRoute } from 'astro';
import type { BookingFormData } from '../../../types';
import emailService from '../../../lib/email/resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: BookingFormData & { timestamp: string; requestId: string } = await request.json();

    // Validate required fields
    if (!data.name || !data.phone || !data.address || !data.serviceType || !data.urgency) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate submission ID
    const submissionId = data.requestId || `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send notification email to business
    const businessEmail = await emailService.sendBookingNotification(data, submissionId);

    if (!businessEmail.success) {
      console.error('Failed to send business notification:', businessEmail.error);
      // Continue anyway - don't fail the request
    }

    // Send confirmation email to customer (if email provided)
    if (data.email) {
      const customerEmail = await emailService.sendBookingConfirmation(data);
      if (!customerEmail.success) {
        console.error('Failed to send customer confirmation:', customerEmail.error);
      }
    }

    // Log submission (in production, save to database)
    console.log('Booking submission:', {
      id: submissionId,
      name: data.name,
      phone: data.phone,
      serviceType: data.serviceType,
      urgency: data.urgency,
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
