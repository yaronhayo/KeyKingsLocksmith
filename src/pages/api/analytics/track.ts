import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: {
      event: string;
      properties: Record<string, any>;
    } = await request.json();

    // Validate event name
    if (!data.event) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Event name is required',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log analytics event (in production, send to analytics service)
    console.log('Analytics event:', {
      event: data.event,
      properties: data.properties,
      timestamp: new Date().toISOString(),
    });

    // In production, you would integrate with analytics services:
    // - Google Analytics 4
    // - Mixpanel
    // - Segment
    // - Custom analytics platform

    // Example: Send to multiple analytics services
    // await Promise.all([
    //   sendToGoogleAnalytics(data),
    //   sendToMixpanel(data),
    //   sendToCustomService(data),
    // ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Event tracked successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Analytics tracking error:', error);

    // Don't fail analytics requests - fail silently
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to track event',
      }),
      {
        status: 200, // Return 200 to avoid client-side errors
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
