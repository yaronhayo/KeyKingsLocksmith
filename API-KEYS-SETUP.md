# API Keys Setup Guide

This guide explains how to configure all API keys in Vercel's project settings to enable full functionality including address autocomplete, reCAPTCHA, and email notifications.

## Required API Keys

### 1. Google Maps API (Address Autocomplete)

**Purpose**: Enables address autocomplete in the booking form

**Steps to obtain:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API** and **Maps JavaScript API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Places API" and click "Enable"
   - Search for "Maps JavaScript API" and click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key
5. **Important**: Restrict your API key for security:
   - Click on the API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domains:
     - `https://keykingslocksmithsc.com/*`
     - `https://*.vercel.app/*` (for preview deployments)
     - `http://localhost:3000/*` (for local development)
   - Under "API restrictions", select "Restrict key"
   - Choose: "Places API" and "Maps JavaScript API"
   - Save changes

**Vercel Environment Variable:**
```
PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Note**: The `PUBLIC_` prefix makes this key accessible client-side (required for Google Places).

---

### 2. Google reCAPTCHA v3

**Purpose**: Protects forms from spam and bot submissions

**Steps to obtain:**
1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click the "+" button to register a new site
3. Fill in the form:
   - **Label**: Key Kings Locksmith
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**:
     - `keykingslocksmithsc.com`
     - `vercel.app` (for preview deployments)
     - `localhost` (for local development)
4. Accept the terms and submit
5. Copy both keys:
   - **Site Key** (used in the frontend)
   - **Secret Key** (used in the backend)

**Vercel Environment Variables:**
```
PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your_site_key_here
GOOGLE_RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Note**: The site key has `PUBLIC_` prefix (client-side), secret key doesn't (server-side only).

---

### 3. Resend API (Email Service)

**Purpose**: Sends form submissions and notifications via email

**Steps to obtain:**
1. Go to [Resend](https://resend.com/)
2. Sign up or log in
3. Go to [API Keys page](https://resend.com/api-keys)
4. Click "Create API Key"
5. Give it a name (e.g., "Key Kings Production")
6. Copy the API key (starts with `re_`)
7. **Verify your sending domain**:
   - Go to "Domains" in Resend dashboard
   - Add domain: `keykingslocksmithsc.com`
   - Add the DNS records provided by Resend to your domain registrar
   - Wait for verification (usually takes a few minutes to 24 hours)

**Vercel Environment Variables:**
```
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=noreply@keykingslocksmithsc.com
TO_EMAIL=keykingslocksmithsc@gmail.com
```

**Important Notes:**
- `FROM_EMAIL` must use your verified domain
- `TO_EMAIL` is where form submissions will be sent
- Resend free tier includes 100 emails/day, 3,000 emails/month

---

## Setting Environment Variables in Vercel

### Via Vercel Dashboard (Recommended)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project (keykingslocksmith)
3. Go to "Settings" tab
4. Click "Environment Variables" in the left sidebar
5. Add each variable:
   - **Key**: The variable name (e.g., `PUBLIC_GOOGLE_MAPS_API_KEY`)
   - **Value**: Your actual API key
   - **Environment**: Select all environments (Production, Preview, Development)
6. Click "Save"

### Via Vercel CLI

```bash
vercel env add PUBLIC_GOOGLE_MAPS_API_KEY
vercel env add PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
vercel env add GOOGLE_RECAPTCHA_SECRET_KEY
vercel env add RESEND_API_KEY
vercel env add FROM_EMAIL
vercel env add TO_EMAIL
```

**After adding variables, redeploy your project:**
```bash
vercel --prod
```

Or trigger a redeploy from the Vercel dashboard.

---

## Testing Your Configuration

### 1. Test Google Maps Autocomplete
- Go to your booking form
- Click on the "Service Address" field
- Start typing an address
- You should see autocomplete suggestions dropdown

### 2. Test reCAPTCHA
- Open browser DevTools → Console
- Submit any form
- Check for reCAPTCHA token in console logs
- No errors should appear related to reCAPTCHA

### 3. Test Resend Email
- Submit a test booking through the form
- Check the `TO_EMAIL` inbox for the notification
- Check spam folder if not received
- Verify email contains all form data

---

## Troubleshooting

### Google Maps Autocomplete Not Working

**Symptoms**: No dropdown appears when typing address

**Common causes:**
1. API key not set or incorrect
   - Check Vercel environment variables
   - Verify `PUBLIC_GOOGLE_MAPS_API_KEY` is set
2. API not enabled in Google Cloud Console
   - Ensure "Places API" is enabled
   - Ensure "Maps JavaScript API" is enabled
3. API key restrictions too strict
   - Check HTTP referrer restrictions include your domain
   - Temporarily remove restrictions to test
4. Billing not enabled on Google Cloud
   - Google requires billing enabled even for free tier
   - No charges for low usage

**Check browser console for errors:**
```
Failed to load Google Maps script: ...
Google Maps API key not configured
```

### reCAPTCHA Not Working

**Symptoms**: Form submission fails with "reCAPTCHA verification failed"

**Common causes:**
1. Site key not set
   - Check `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` in Vercel
2. Secret key not set
   - Check `GOOGLE_RECAPTCHA_SECRET_KEY` in Vercel (no PUBLIC_ prefix)
3. Domain not registered
   - Add your domain in reCAPTCHA admin console
4. Using wrong reCAPTCHA version
   - Ensure using v3, not v2

### Resend Email Not Sending

**Symptoms**: Form submits successfully but no email received

**Common causes:**
1. API key not set or invalid
   - Check `RESEND_API_KEY` in Vercel
   - Verify key is active in Resend dashboard
2. Domain not verified
   - Check domain verification status in Resend
   - Add DNS records if not verified
3. FROM_EMAIL using unverified domain
   - Must use verified domain in FROM_EMAIL
4. Rate limit reached
   - Check Resend dashboard for usage limits
5. Email in spam folder
   - Check spam/junk folders
   - Add SPF/DKIM records to improve deliverability

---

## Environment Variables Checklist

Copy this checklist to ensure all variables are set:

- [ ] `PUBLIC_GOOGLE_MAPS_API_KEY` - For address autocomplete
- [ ] `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` - For form protection (client-side)
- [ ] `GOOGLE_RECAPTCHA_SECRET_KEY` - For form protection (server-side)
- [ ] `RESEND_API_KEY` - For sending emails
- [ ] `FROM_EMAIL` - Email "from" address (must be verified domain)
- [ ] `TO_EMAIL` - Where to send form submissions

**Optional but recommended:**
- [ ] `PUBLIC_GTM_CONTAINER_ID` - Google Tag Manager
- [ ] `PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- [ ] `PUBLIC_FB_PIXEL_ID` - Facebook Pixel

---

## Security Best Practices

1. **Never commit API keys to git**
   - Keys should only be in Vercel environment variables
   - The `.env` file is gitignored

2. **Restrict API keys**
   - Use HTTP referrer restrictions for Google Maps
   - Use domain restrictions for reCAPTCHA
   - Regularly rotate keys if compromised

3. **Use PUBLIC_ prefix correctly**
   - Only use for client-side keys (Maps, reCAPTCHA site key)
   - Never use PUBLIC_ for secret keys (reCAPTCHA secret, Resend API)

4. **Monitor usage**
   - Check Google Cloud Console for API usage
   - Check Resend dashboard for email quotas
   - Set up billing alerts

---

## Cost Estimates

### Google Maps API
- **Free tier**: $200 credit per month
- **Address Autocomplete**: $2.83 per 1,000 requests
- **Estimated cost**: Free for typical locksmith website traffic

### Google reCAPTCHA v3
- **Cost**: Completely free
- **No limits** on requests

### Resend
- **Free tier**: 3,000 emails/month, 100 emails/day
- **Paid plan**: $20/month for 50,000 emails/month
- **Estimated cost**: Free tier sufficient for most locksmith businesses

---

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all environment variables in Vercel dashboard
3. Test each service independently
4. Check service status pages:
   - [Google Cloud Status](https://status.cloud.google.com/)
   - [Resend Status](https://status.resend.com/)
   - [Vercel Status](https://www.vercel-status.com/)

For additional help, consult:
- [Google Maps Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Resend Documentation](https://resend.com/docs)
