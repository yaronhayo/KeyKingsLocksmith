import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send notification email to business
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: process.env.BUSINESS_EMAIL || 'keykingslocksmithsc@gmail.com',
        replyTo: data.email,
        subject: `📧 New Contact Message: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${data.message.replace(/\n/g, '<br>')}</blockquote>
          <hr>
          <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Continue anyway - don't fail the request
    }

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: 'Key Kings Locksmith <noreply@keykingslocksmithsc.com>',
        to: data.email,
        subject: 'Message Received - Key Kings Locksmith',
        html: `
          <h2>Thank You for Contacting Us!</h2>
          <p>Hi ${data.name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <p><strong>Your Message:</strong></p>
          <blockquote>${data.message.replace(/\n/g, '<br>')}</blockquote>
          <hr>
          <p>Key Kings Locksmith<br>
          (864) 900-9597<br>
          keykingslocksmithsc@gmail.com</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    console.log('Contact submission processed:', submissionId);

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        submissionId,
        message: 'Message sent successfully',
        redirectUrl: '/thank-you'
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
