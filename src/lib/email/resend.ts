// Resend email service integration
import type { BookingFormData, ContactFormData } from '../../types';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'noreply@keykingslocksmithsc.com';
const TO_EMAIL = import.meta.env.TO_EMAIL || 'keykingslocksmithsc@gmail.com';

export interface EmailOptions {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

class ResendEmailService {
  private apiKey: string;
  private baseURL = 'https://api.resend.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }

      return { success: true, id: data.id };
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async sendBookingNotification(data: BookingFormData, submissionId: string): Promise<{ success: boolean; error?: string }> {
    const html = this.generateBookingEmail(data, submissionId);
    const text = this.generateBookingEmailText(data);

    return this.sendEmail({
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `🔑 New Booking Request - ${data.urgency === 'asap' ? 'EMERGENCY' : data.urgency.toUpperCase()}`,
      html,
      text,
      replyTo: data.email || undefined,
    });
  }

  async sendBookingConfirmation(data: BookingFormData): Promise<{ success: boolean; error?: string }> {
    if (!data.email) {
      return { success: true }; // Skip if no email provided
    }

    const html = this.generateBookingConfirmationEmail(data);
    const text = this.generateBookingConfirmationText(data);

    return this.sendEmail({
      to: data.email,
      from: FROM_EMAIL,
      subject: '✓ Booking Confirmation - Key Kings Locksmith',
      html,
      text,
    });
  }

  async sendContactNotification(data: ContactFormData, submissionId: string): Promise<{ success: boolean; error?: string }> {
    const html = this.generateContactEmail(data, submissionId);
    const text = this.generateContactEmailText(data);

    return this.sendEmail({
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `📧 New Contact Form: ${data.subject}`,
      html,
      text,
      replyTo: data.email,
    });
  }

  async sendContactConfirmation(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    const html = this.generateContactConfirmationEmail(data);
    const text = this.generateContactConfirmationText(data);

    return this.sendEmail({
      to: data.email,
      from: FROM_EMAIL,
      subject: '✓ Message Received - Key Kings Locksmith',
      html,
      text,
    });
  }

  async sendNewsletterWelcome(email: string): Promise<{ success: boolean; error?: string }> {
    const html = this.generateNewsletterWelcomeEmail();
    const text = 'Thank you for subscribing to Key Kings Locksmith newsletter!';

    return this.sendEmail({
      to: email,
      from: FROM_EMAIL,
      subject: '🔐 Welcome to Key Kings Locksmith Newsletter',
      html,
      text,
    });
  }

  // Email template generators
  private generateBookingEmail(data: BookingFormData, submissionId: string): string {
    const urgencyBadge = data.urgency === 'asap'
      ? '<span style="background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold;">🚨 EMERGENCY</span>'
      : `<span style="background: #f3f4f6; color: #374151; padding: 4px 12px; border-radius: 4px;">${data.urgency.toUpperCase()}</span>`;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #DC143C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">🔑 New Booking Request</h1>
  </div>

  <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <div style="margin-bottom: 15px;">
        <strong>Urgency:</strong> ${urgencyBadge}
      </div>

      <h2 style="color: #DC143C; margin-top: 20px; margin-bottom: 15px;">Customer Information</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
        ${data.email ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Address:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.address}</td>
        </tr>
      </table>

      <h2 style="color: #DC143C; margin-top: 20px; margin-bottom: 15px;">Service Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Service Type:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Urgency:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.urgency}</td>
        </tr>
        ${data.notes ? `
        <tr>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Notes:</strong></td>
          <td style="padding: 8px 0;">${data.notes}</td>
        </tr>
        ` : ''}
      </table>

      <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <strong>Submission ID:</strong> ${submissionId}<br>
        <strong>Received:</strong> ${new Date().toLocaleString()}
      </div>
    </div>

    <div style="text-align: center; padding: 15px;">
      <a href="tel:${data.phone}" style="display: inline-block; background: #DC143C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Call Customer Now</a>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>Key Kings Locksmith - Professional Locksmith Services<br>
    (864) 900-9597 | keykingslocksmithsc@gmail.com</p>
  </div>
</body>
</html>
    `;
  }

  private generateBookingEmailText(data: BookingFormData): string {
    return `
New Booking Request - ${data.urgency.toUpperCase()}

Customer Information:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Address: ${data.address}

Service Details:
Service Type: ${data.serviceType}
Urgency: ${data.urgency}
${data.notes ? `Notes: ${data.notes}` : ''}

Please contact the customer as soon as possible.
    `;
  }

  private generateBookingConfirmationEmail(data: BookingFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #DC143C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">✓ Booking Confirmed</h1>
  </div>

  <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <p>Hi ${data.name},</p>

      <p>Thank you for choosing Key Kings Locksmith! We've received your service request and will contact you shortly at <strong>${data.phone}</strong>.</p>

      <div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <strong>What happens next?</strong><br>
        • Our team will review your request<br>
        • We'll call you promptly during business hours<br>
        • We'll confirm the service details and provide an estimate<br>
        • A professional technician will be dispatched to your location
      </div>

      <h3 style="color: #DC143C;">Your Service Request:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Service Type:</strong></td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Location:</strong></td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.address}</td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Urgency:</strong></td>
          <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.urgency}</td>
        </tr>
      </table>

      <p>If you need immediate assistance, please call us at <strong>(864) 900-9597</strong>.</p>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p><strong>Key Kings Locksmith</strong><br>
    Professional Locksmith Services<br>
    (864) 900-9597 | keykingslocksmithsc@gmail.com<br>
    4105 Liberty Highway Unit B, Anderson, SC 29621</p>
  </div>
</body>
</html>
    `;
  }

  private generateBookingConfirmationText(data: BookingFormData): string {
    return `
Booking Confirmed - Key Kings Locksmith

Hi ${data.name},

Thank you for choosing Key Kings Locksmith! We've received your service request and will contact you shortly at ${data.phone}.

Your Service Request:
- Service Type: ${data.serviceType}
- Location: ${data.address}
- Urgency: ${data.urgency}

We'll call you promptly during business hours to confirm details.

For immediate assistance: (864) 900-9597

Key Kings Locksmith
4105 Liberty Highway Unit B, Anderson, SC 29621
    `;
  }

  private generateContactEmail(data: ContactFormData, submissionId: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #DC143C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h1>
  </div>

  <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <h2 style="color: #DC143C; margin-top: 0;">${data.subject}</h2>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
        ` : ''}
      </table>

      <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <strong>Message:</strong><br>
        <div style="margin-top: 10px; white-space: pre-wrap;">${data.message}</div>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; font-size: 12px;">
        <strong>Submission ID:</strong> ${submissionId}<br>
        <strong>Received:</strong> ${new Date().toLocaleString()}
      </div>
    </div>

    <div style="text-align: center; padding: 15px;">
      <a href="mailto:${data.email}" style="display: inline-block; background: #DC143C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">Reply via Email</a>
      ${data.phone ? `<a href="tel:${data.phone}" style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Call Customer</a>` : ''}
    </div>
  </div>
</body>
</html>
    `;
  }

  private generateContactEmailText(data: ContactFormData): string {
    return `
New Contact Form Submission

Subject: ${data.subject}

From: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}

Message:
${data.message}
    `;
  }

  private generateContactConfirmationEmail(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #DC143C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">✓ Message Received</h1>
  </div>

  <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <p>Hi ${data.name},</p>

      <p>Thank you for contacting Key Kings Locksmith! We've received your message and will respond within 24 hours.</p>

      <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <strong>Your Message:</strong><br>
        <div style="margin-top: 10px; color: #0c4a6e;">"${data.message.substring(0, 150)}${data.message.length > 150 ? '...' : ''}"</div>
      </div>

      <p>For urgent matters, please call us directly at <strong>(864) 900-9597</strong>.</p>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p><strong>Key Kings Locksmith</strong><br>
    (864) 900-9597 | keykingslocksmithsc@gmail.com<br>
    4105 Liberty Highway Unit B, Anderson, SC 29621</p>
  </div>
</body>
</html>
    `;
  }

  private generateContactConfirmationText(data: ContactFormData): string {
    return `
Message Received - Key Kings Locksmith

Hi ${data.name},

Thank you for contacting us! We've received your message and will respond within 24 hours.

For urgent matters, please call: (864) 900-9597

Key Kings Locksmith
4105 Liberty Highway Unit B, Anderson, SC 29621
    `;
  }

  private generateNewsletterWelcomeEmail(): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #DC143C; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">🔐 Welcome to Our Newsletter!</h1>
  </div>

  <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <p>Thank you for subscribing to the Key Kings Locksmith newsletter!</p>

      <p>You'll receive:</p>
      <ul style="list-style-type: none; padding: 0;">
        <li style="padding: 8px 0;">✓ Security tips and best practices</li>
        <li style="padding: 8px 0;">✓ Special offers and promotions</li>
        <li style="padding: 8px 0;">✓ Local news and updates</li>
        <li style="padding: 8px 0;">✓ Emergency locksmith tips</li>
      </ul>

      <div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <strong>💡 First Tip:</strong> Always keep a spare key with a trusted neighbor or family member to avoid lockout situations!
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="tel:8649009597" style="display: inline-block; background: #DC143C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Save Our Number: (864) 900-9597</a>
      </div>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p><strong>Key Kings Locksmith</strong><br>
    Professional Locksmith Services Since 2016<br>
    4105 Liberty Highway Unit B, Anderson, SC 29621</p>
  </div>
</body>
</html>
    `;
  }
}

// Create and export singleton instance
const emailService = new ResendEmailService(RESEND_API_KEY || '');

export default emailService;
export { ResendEmailService };
