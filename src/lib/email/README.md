# Email Service Configuration

This directory contains the email service integration using [Resend](https://resend.com).

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address

### 2. Add and Verify Your Domain

1. In the Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `keykingslocksmithsc.com`
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)

### 3. Generate an API Key

1. In the Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Key Kings Production")
4. Select the appropriate permissions (Send emails)
5. Copy the API key (starts with `re_`)

### 4. Configure Environment Variables

Add the following to your `.env` file:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=noreply@keykingslocksmithsc.com
TO_EMAIL=keykingslocksmithsc@gmail.com
```

**Important Notes:**
- `FROM_EMAIL` must use your verified domain
- `TO_EMAIL` is where form submissions will be sent (business email)
- Never commit your `.env` file to version control

### 5. Test the Configuration

Run the test script to verify everything is working:

```bash
node scripts/test-resend.js
```

This will send a test email to verify your configuration.

## Email Templates

The service includes pre-built email templates for:

### 1. Booking Notifications
- **To Business**: Detailed booking request with customer info
- **To Customer**: Confirmation email with next steps

### 2. Contact Form
- **To Business**: Contact form submission with message
- **To Customer**: Confirmation that message was received

### 3. Newsletter
- **To Subscriber**: Welcome email with first tip

## Email Features

- ✅ HTML and plain text versions
- ✅ Responsive design
- ✅ Brand colors and styling
- ✅ Reply-to headers for easy responses
- ✅ Submission tracking with unique IDs
- ✅ Error handling and logging

## Customization

To customize email templates, edit the generator methods in `resend.ts`:

- `generateBookingEmail()` - Booking notification to business
- `generateBookingConfirmationEmail()` - Booking confirmation to customer
- `generateContactEmail()` - Contact form to business
- `generateContactConfirmationEmail()` - Contact confirmation to customer
- `generateNewsletterWelcomeEmail()` - Newsletter welcome

## Troubleshooting

### Email not sending

1. **Check API key**: Verify `RESEND_API_KEY` is correct
2. **Check domain**: Ensure domain is verified in Resend dashboard
3. **Check FROM email**: Must use verified domain
4. **Check logs**: Look for error messages in console

### Email going to spam

1. **Verify domain**: Complete all DNS records (SPF, DKIM, DMARC)
2. **Warm up domain**: Start with low volume, gradually increase
3. **Check content**: Avoid spam trigger words
4. **Test spam score**: Use mail-tester.com

### Rate limits

Resend has the following limits:
- **Free tier**: 100 emails/day, 3,000 emails/month
- **Pro tier**: Higher limits available

If you hit rate limits, consider:
- Upgrading your Resend plan
- Implementing email queuing
- Batching notifications

## API Reference

### ResendEmailService

```typescript
class ResendEmailService {
  // Send booking notification to business
  async sendBookingNotification(
    data: BookingFormData,
    submissionId: string
  ): Promise<{ success: boolean; error?: string }>

  // Send booking confirmation to customer
  async sendBookingConfirmation(
    data: BookingFormData
  ): Promise<{ success: boolean; error?: string }>

  // Send contact form notification to business
  async sendContactNotification(
    data: ContactFormData,
    submissionId: string
  ): Promise<{ success: boolean; error?: string }>

  // Send contact confirmation to customer
  async sendContactConfirmation(
    data: ContactFormData
  ): Promise<{ success: boolean; error?: string }>

  // Send newsletter welcome email
  async sendNewsletterWelcome(
    email: string
  ): Promise<{ success: boolean; error?: string }>
}
```

## Production Checklist

Before going live:

- [ ] Domain verified in Resend
- [ ] All DNS records added (SPF, DKIM, DMARC)
- [ ] API key configured in production environment
- [ ] Test email sent successfully
- [ ] FROM_EMAIL uses verified domain
- [ ] TO_EMAIL set to correct business email
- [ ] Email templates reviewed and approved
- [ ] Spam score tested (mail-tester.com)
- [ ] Rate limits understood and monitored

## Support

- **Resend Documentation**: https://resend.com/docs
- **Resend Support**: support@resend.com
- **Status Page**: https://status.resend.com
