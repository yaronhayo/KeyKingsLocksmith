# API Keys Setup Guide

This guide will help you set up all the required API keys for the Key Kings Locksmith website.

## Overview

The website requires the following API keys to function fully:
1. **Google Maps API Key** (for address autocomplete)
2. **Google reCAPTCHA Keys** (for spam protection)
3. **Resend API Key** (for email notifications)

---

## 1. Google Maps API Key

**Purpose**: Enables address autocomplete in booking forms

### Steps to Get Your Key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Places API** and **Maps JavaScript API**:
   - In the sidebar, go to **APIs & Services** → **Library**
   - Search for "Places API" and click **Enable**
   - Search for "Maps JavaScript API" and click **Enable**
4. Create credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
   - Copy your new API key
5. Restrict your API key (recommended):
   - Click on your API key to edit it
   - Under **Application restrictions**, select **HTTP referrers**
   - Add your domains:
     - `http://localhost:4321/*` (for development)
     - `https://keykingslocksmithsc.com/*` (for production)
     - `https://*.vercel.app/*` (for Vercel preview deployments)
   - Under **API restrictions**, select **Restrict key**
   - Check only: **Places API** and **Maps JavaScript API**
   - Click **Save**

### Add to .env file:

```env
PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Note**: The `PUBLIC_` prefix is required because this key is used in the browser.

---

## 2. Google reCAPTCHA Keys

**Purpose**: Protects forms from spam and bot submissions

### Steps to Get Your Keys:

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **+** to create a new site
3. Fill in the form:
   - **Label**: Key Kings Locksmith
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**:
     - `localhost` (for development)
     - `keykingslocksmithsc.com` (for production)
     - `*.vercel.app` (for Vercel deployments)
   - Accept the terms and click **Submit**
4. Copy both keys:
   - **Site Key** (used in the browser)
   - **Secret Key** (used on the server)

### Add to .env file:

```env
PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your_site_key_here
GOOGLE_RECAPTCHA_SECRET_KEY=your_secret_key_here
```

---

## 3. Resend API Key

**Purpose**: Sends email notifications when forms are submitted

### Steps to Get Your Key:

1. Go to [Resend](https://resend.com/) and sign up
2. Verify your email address
3. Go to **API Keys** in the dashboard
4. Click **Create API Key**
5. Give it a name (e.g., "Key Kings Production")
6. Copy the API key (you won't be able to see it again!)

### Add Domain (Required):

Before emails will work, you need to add and verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `keykingslocksmithsc.com`
4. Follow the instructions to add DNS records to your domain registrar
5. Wait for verification (usually takes a few minutes)

### Add to .env file:

```env
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=noreply@keykingslocksmithsc.com
TO_EMAIL=yaron@gettmarketing.com
```

---

## Complete .env File

After getting all your API keys, your `.env` file should look like this:

```env
# Site Configuration
SITE_URL=http://localhost:4321
PUBLIC_SITE_NAME="Key Kings Locksmith"
NODE_ENV=development

# Google Services
PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...your_actual_key_here
PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=6Lf...your_site_key_here
GOOGLE_RECAPTCHA_SECRET_KEY=6Lf...your_secret_key_here

# Email Service (Resend)
RESEND_API_KEY=re_...your_actual_key_here
FROM_EMAIL=noreply@keykingslocksmithsc.com
TO_EMAIL=yaron@gettmarketing.com

# Business Contact Information
BUSINESS_PHONE=+18649009597
BUSINESS_EMAIL=keykingslocksmithsc@gmail.com
BUSINESS_ADDRESS="4105 Liberty Highway Unit B, Anderson, SC 29621"

# Development Settings
DEBUG=true
LOG_LEVEL=debug
```

---

## Vercel Deployment Configuration

When deploying to Vercel, you need to add these environment variables in the Vercel dashboard:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings** → **Environment Variables**
3. Add each variable:

### Production Variables:
```
PUBLIC_GOOGLE_MAPS_API_KEY = your_key_here
PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY = your_site_key_here
GOOGLE_RECAPTCHA_SECRET_KEY = your_secret_key_here
RESEND_API_KEY = your_key_here
FROM_EMAIL = noreply@keykingslocksmithsc.com
TO_EMAIL = yaron@gettmarketing.com
BUSINESS_PHONE = +18649009597
BUSINESS_EMAIL = keykingslocksmithsc@gmail.com
BUSINESS_ADDRESS = 4105 Liberty Highway Unit B, Anderson, SC 29621
SITE_URL = https://keykingslocksmithsc.com
NODE_ENV = production
```

4. Click **Save** after adding each variable
5. Redeploy your project for changes to take effect

---

## Testing

### Test Address Autocomplete:
1. Open http://localhost:4321
2. Click on the booking form
3. Start typing an address in the "Street Address" field
4. You should see Google Places autocomplete suggestions appear

### Test reCAPTCHA:
1. The reCAPTCHA badge should NOT appear as a floating bubble
2. Instead, you should see an inline notice that says "Protected by reCAPTCHA"
3. Forms should submit successfully (reCAPTCHA works invisibly in the background)

### Test Email Notifications:
1. Fill out a form completely
2. Submit the form
3. Check the email at yaron@gettmarketing.com for the notification
4. Check the Resend dashboard for delivery status

---

## Troubleshooting

### Address autocomplete not working:
- Verify API key is correct in `.env`
- Check that Places API is enabled in Google Cloud Console
- Check browser console for any error messages
- Make sure the API key has proper restrictions set

### reCAPTCHA errors:
- Verify both site key and secret key are correct
- Check that domain is added to reCAPTCHA admin console
- For localhost, make sure "localhost" is in the domains list

### Email not sending:
- Verify Resend API key is correct
- Check that domain is verified in Resend dashboard
- Check Resend dashboard logs for error messages
- Verify FROM_EMAIL uses your verified domain

### Server not restarting after .env changes:
```bash
# Stop the dev server (Ctrl+C)
# Then restart it:
npm run dev
```

---

## Cost Information

- **Google Maps API**: Free tier includes $200/month credit (~28,000 autocomplete requests)
- **Google reCAPTCHA v3**: Completely free
- **Resend**: Free tier includes 3,000 emails/month

All services should stay within free tier for typical locksmith business usage.

---

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env` file to git (already in `.gitignore`)
- Always restrict API keys to specific domains
- Use separate API keys for development and production
- Regularly rotate API keys (every 6-12 months)
- Monitor API usage in respective dashboards

---

## Support

If you encounter any issues:
1. Check the browser console for errors (F12 → Console)
2. Check the server logs in the terminal
3. Verify all API keys are correct
4. Make sure all required APIs are enabled

For API-specific issues:
- **Google Maps**: [Google Maps Platform Support](https://developers.google.com/maps/support)
- **reCAPTCHA**: [reCAPTCHA Help Center](https://support.google.com/recaptcha/)
- **Resend**: [Resend Support](https://resend.com/docs)
