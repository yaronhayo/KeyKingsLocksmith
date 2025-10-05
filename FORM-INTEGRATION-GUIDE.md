# Form Integration Complete Guide

This guide provides step-by-step instructions for setting up and testing the complete form integration system.

## Overview

The Key Kings Locksmith website includes three forms:
1. **Booking Form** - Service booking requests
2. **Contact Form** - General inquiries
3. **Newsletter Form** - Email subscriptions

Each form includes:
- Client-side validation (real-time feedback)
- Server-side validation (security)
- reCAPTCHA v3 (spam protection)
- Email notifications via Resend
- Rate limiting (abuse prevention)
- Honeypot fields (bot detection)

## Setup Steps

### Step 1: Install Dependencies

All dependencies should already be installed. If not:

```bash
npm install
```

### Step 2: Configure Resend

1. **Create Resend Account**
   - Go to [resend.com](https://resend.com)
   - Sign up for an account
   - Verify your email

2. **Add Your Domain**
   - In Resend dashboard, go to **Domains**
   - Click **Add Domain**
   - Enter: `keykingslocksmithsc.com`
   - Add the provided DNS records to your domain
   - Wait for verification (5-10 minutes)

3. **Generate API Key**
   - Go to **API Keys** in Resend dashboard
   - Click **Create API Key**
   - Name it: "Key Kings Production"
   - Copy the key (starts with `re_`)

4. **Configure Environment Variables**
   
   Create or update `.env` file:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   FROM_EMAIL=noreply@keykingslocksmithsc.com
   TO_EMAIL=keykingslocksmithsc@gmail.com
   ```

5. **Test Email Configuration**
   ```bash
   node scripts/test-resend.js
   ```
   
   You should receive a test email at the TO_EMAIL address.

### Step 3: Configure reCAPTCHA

1. **Register Site**
   - Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - Click **+** to create new site
   - Fill in:
     - Label: `Key Kings Locksmith`
     - reCAPTCHA type: **reCAPTCHA v3**
     - Domains:
       - `keykingslocksmithsc.com`
       - `www.keykingslocksmithsc.com`
       - `localhost` (for development)
   - Accept terms and submit

2. **Get Your Keys**
   - Copy the **Site Key** (public)
   - Copy the **Secret Key** (private)

3. **Configure Environment Variables**
   
   Add to `.env` file:
   ```bash
   GOOGLE_RECAPTCHA_SITE_KEY=6Lc...your_site_key
   GOOGLE_RECAPTCHA_SECRET_KEY=6Lc...your_secret_key
   PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=6Lc...your_site_key
   ```

### Step 4: Start Development Server

```bash
npm run dev
```

The site should be available at `http://localhost:4321`

### Step 5: Test Forms

#### Quick Test (Automated)

```bash
# Test all forms
node scripts/test-forms.js

# Test specific form
node scripts/test-forms.js booking
```

#### Manual Test

1. **Booking Form**
   - Navigate to `http://localhost:4321/book-service`
   - Fill in the form with valid data
   - Submit
   - Check for success message and redirect
   - Check email inbox for notifications

2. **Contact Form**
   - Navigate to `http://localhost:4321/contact`
   - Fill in the form
   - Submit
   - Check for success message
   - Check email inbox

3. **Newsletter Form**
   - Scroll to footer on any page
   - Enter email address
   - Submit
   - Check for success message
   - Check email inbox for welcome email

## Architecture

### Client-Side Flow

```
User Input
    ↓
Real-time Validation (on blur/input)
    ↓
Visual Feedback (errors/success)
    ↓
Form Submit
    ↓
Generate reCAPTCHA Token
    ↓
Send to API Endpoint
    ↓
Show Loading State
    ↓
Handle Response (success/error)
```

### Server-Side Flow

```
API Request
    ↓
Parse JSON Body
    ↓
Verify reCAPTCHA Token
    ↓
Sanitize Input Data
    ↓
Validate Data
    ↓
Check Honeypot
    ↓
Check Rate Limit
    ↓
Send Emails (business + customer)
    ↓
Log Submission
    ↓
Return Response
```

## File Structure

```
src/
├── components/
│   └── forms/
│       ├── BookingForm.astro       # Booking form component
│       ├── ContactForm.astro       # Contact form component
│       └── NewsletterForm.astro    # Newsletter form component
├── pages/
│   └── api/
│       └── forms/
│           ├── booking.ts          # Booking API endpoint
│           ├── contact.ts          # Contact API endpoint
│           └── newsletter.ts       # Newsletter API endpoint
├── lib/
│   ├── api/
│   │   └── client.ts               # Client-side API utilities
│   ├── email/
│   │   ├── resend.ts               # Email service (Resend)
│   │   └── README.md               # Email setup guide
│   ├── recaptcha/
│   │   ├── verify.ts               # reCAPTCHA verification
│   │   └── README.md               # reCAPTCHA setup guide
│   └── validation/
│       ├── forms.ts                # Validation utilities
│       └── README.md               # Validation guide
└── types/
    └── index.ts                    # TypeScript types

scripts/
├── test-resend.js                  # Test Resend configuration
└── test-forms.js                   # Test form submissions

FORM-TESTING-CHECKLIST.md          # Manual testing checklist
FORM-INTEGRATION-GUIDE.md           # This file
```

## API Endpoints

### POST /api/forms/booking

Submit a service booking request.

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "(864) 900-9597",
  "email": "john@example.com",
  "address": "123 Main St, Anderson, SC 29621",
  "serviceType": "Car Lockout",
  "urgency": "asap",
  "notes": "Locked keys in trunk",
  "recaptchaToken": "token_from_recaptcha",
  "timestamp": "2025-01-01T12:00:00Z",
  "requestId": "booking_123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "submissionId": "booking_123456_abc",
    "message": "Booking request received successfully"
  }
}
```

### POST /api/forms/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(864) 555-0123",
  "subject": "Question about services",
  "message": "I need help with my locks",
  "recaptchaToken": "token_from_recaptcha",
  "timestamp": "2025-01-01T12:00:00Z",
  "requestId": "contact_123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "submissionId": "contact_123456_abc",
    "message": "Message sent successfully"
  }
}
```

### POST /api/forms/newsletter

Subscribe to newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "source": "website",
  "recaptchaToken": "token_from_recaptcha",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "subscriptionId": "newsletter_123456_abc",
    "message": "Successfully subscribed to newsletter"
  }
}
```

## Email Templates

### Booking Notification (to Business)

**Subject:** 🔑 New Booking Request - [URGENCY]

**Content:**
- Customer information (name, phone, email, address)
- Service details (type, urgency, notes)
- Submission ID and timestamp
- Call-to-action button to contact customer

### Booking Confirmation (to Customer)

**Subject:** ✓ Booking Confirmed - Key Kings Locksmith

**Content:**
- Confirmation message
- Service request summary
- What happens next
- Contact information

### Contact Notification (to Business)

**Subject:** 📧 New Contact Form: [SUBJECT]

**Content:**
- Customer information
- Message content
- Reply-to buttons

### Contact Confirmation (to Customer)

**Subject:** ✓ Message Received - Key Kings Locksmith

**Content:**
- Confirmation message
- Copy of their message
- Response time expectation
- Contact information

### Newsletter Welcome

**Subject:** 🔐 Welcome to Our Newsletter!

**Content:**
- Welcome message
- What to expect
- First security tip
- Contact information

## Security Features

### 1. reCAPTCHA v3

- **Purpose**: Detect bots and spam
- **Implementation**: Invisible, runs in background
- **Score**: 0.0 (bot) to 1.0 (human)
- **Thresholds**:
  - Booking: 0.5
  - Contact: 0.5
  - Newsletter: 0.3

### 2. Honeypot Fields

- **Purpose**: Catch simple bots
- **Implementation**: Hidden field that bots fill
- **Action**: Reject submission if filled

### 3. Rate Limiting

- **Purpose**: Prevent abuse
- **Implementation**: In-memory store (Redis in production)
- **Limits**:
  - Booking: 3 per 5 minutes per phone
  - Contact: 5 per 10 minutes per email
  - Newsletter: 2 per day per email

### 4. Input Sanitization

- **Purpose**: Prevent XSS and injection attacks
- **Implementation**: Remove dangerous characters
- **Applied to**: All text inputs

### 5. Server-Side Validation

- **Purpose**: Ensure data integrity
- **Implementation**: Comprehensive validation rules
- **Applied to**: All form fields

## Validation Rules

### Name
- Required: Yes
- Min: 2 characters
- Max: 100 characters
- Pattern: Letters, spaces, hyphens, apostrophes, periods

### Email
- Required: Yes (contact), Optional (booking)
- Max: 254 characters
- Pattern: Standard email format

### Phone
- Required: Yes (booking), Optional (contact)
- Min: 10 digits
- Max: 15 digits
- Pattern: International format allowed

### Address
- Required: Yes (booking)
- Min: 5 characters
- Max: 200 characters

### Subject
- Required: Yes (contact)
- Min: 5 characters
- Max: 200 characters

### Message
- Required: Yes (contact)
- Min: 10 characters
- Max: 2000 characters

### Service Type
- Required: Yes (booking)
- Valid: Predefined list only

### Urgency
- Required: Yes (booking)
- Valid: asap, same-day, few-days, few-weeks, other

## Monitoring

### Resend Dashboard

Monitor email delivery:
- Go to [resend.com/emails](https://resend.com/emails)
- View sent emails
- Check delivery status
- View bounce/complaint rates

### reCAPTCHA Dashboard

Monitor spam protection:
- Go to [reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
- View request volume
- Check score distribution
- Identify suspicious activity

### Server Logs

Monitor form submissions:
```bash
# Development
npm run dev
# Watch console for logs

# Production (Vercel)
# View logs in Vercel dashboard
```

## Troubleshooting

### Emails Not Sending

**Symptoms**: Form submits successfully but no email arrives

**Solutions**:
1. Check Resend API key is correct
2. Verify domain is verified in Resend
3. Check FROM_EMAIL uses verified domain
4. Check spam folder
5. Review Resend dashboard for errors
6. Check server logs for email errors

### reCAPTCHA Failing

**Symptoms**: Form submission rejected with "Security verification failed"

**Solutions**:
1. Verify site key is correct
2. Check domain is registered in reCAPTCHA console
3. Ensure HTTPS is enabled (required in production)
4. Check reCAPTCHA dashboard for errors
5. Lower score threshold if too strict
6. Verify secret key is correct

### Validation Errors

**Symptoms**: Form shows validation errors for valid data

**Solutions**:
1. Check validation rules in `src/lib/validation/forms.ts`
2. Verify client and server validation match
3. Check for special characters causing issues
4. Review browser console for errors
5. Test with different browsers

### Rate Limiting Issues

**Symptoms**: "Too many requests" error

**Solutions**:
1. Wait for rate limit window to expire
2. Adjust rate limits in `src/lib/api/client.ts`
3. Clear rate limit store (restart server)
4. Use different email/phone for testing

### Form Not Submitting

**Symptoms**: Nothing happens when clicking submit

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify API endpoints are accessible
3. Check network tab for failed requests
4. Ensure reCAPTCHA script loaded
5. Verify form validation passes

## Production Deployment

### Pre-Deployment Checklist

- [ ] All tests pass (`node scripts/test-forms.js`)
- [ ] Manual testing complete
- [ ] Production Resend API key configured
- [ ] Production reCAPTCHA keys configured
- [ ] Domain verified in Resend
- [ ] Domain registered in reCAPTCHA
- [ ] Environment variables set in Vercel
- [ ] Email templates reviewed
- [ ] Error handling tested
- [ ] Rate limits configured appropriately

### Vercel Configuration

1. **Environment Variables**
   
   In Vercel dashboard, add:
   ```
   RESEND_API_KEY=re_production_key
   FROM_EMAIL=noreply@keykingslocksmithsc.com
   TO_EMAIL=keykingslocksmithsc@gmail.com
   GOOGLE_RECAPTCHA_SITE_KEY=6Lc...
   GOOGLE_RECAPTCHA_SECRET_KEY=6Lc...
   PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=6Lc...
   ```

2. **Deploy**
   ```bash
   git push origin main
   # Vercel auto-deploys
   ```

3. **Test Production**
   - Submit test forms on production site
   - Verify emails arrive
   - Check Resend dashboard
   - Check reCAPTCHA dashboard
   - Monitor error logs

### Post-Deployment

- [ ] Test all forms on production
- [ ] Verify email delivery
- [ ] Check reCAPTCHA is working
- [ ] Monitor error logs for 24 hours
- [ ] Set up alerts for failures
- [ ] Document any issues

## Maintenance

### Regular Tasks

**Daily**:
- Monitor email delivery rates
- Check for form submission errors
- Review spam scores

**Weekly**:
- Review reCAPTCHA analytics
- Check rate limit effectiveness
- Update validation rules if needed

**Monthly**:
- Review and update email templates
- Check for security updates
- Test all forms end-to-end
- Review error logs

### Updates

When updating forms:
1. Update validation rules in both client and server
2. Update email templates if needed
3. Test thoroughly before deploying
4. Update documentation
5. Notify team of changes

## Support Resources

- **Resend Docs**: https://resend.com/docs
- **reCAPTCHA Docs**: https://developers.google.com/recaptcha/docs/v3
- **Astro Docs**: https://docs.astro.build
- **Project README**: See `src/lib/email/README.md`, `src/lib/recaptcha/README.md`, `src/lib/validation/README.md`

## Contact

For issues or questions about form integration:
- Check the README files in `src/lib/`
- Review this guide
- Check troubleshooting section
- Review API route code
- Check external service documentation
