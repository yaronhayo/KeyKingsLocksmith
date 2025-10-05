# Vercel Environment Variables Setup Guide

Quick reference for setting up environment variables in Vercel for the Key Kings Locksmith website.

## How to Add Environment Variables in Vercel

1. Log in to Vercel: https://vercel.com
2. Select your project (Key Kings Locksmith)
3. Go to **Settings** → **Environment Variables**
4. For each variable below:
   - Click "Add New"
   - Enter the variable name (exactly as shown)
   - Enter the value
   - Select environments: Production, Preview, Development (or as specified)
   - Click "Save"

## Required Variables Checklist

Copy this list and check off as you add each variable:

### Site Configuration
- [ ] `SITE_URL` = `https://keykingslocksmithsc.com` (Production only)
- [ ] `SITE_URL` = `https://your-preview-url.vercel.app` (Preview only)
- [ ] `PUBLIC_SITE_NAME` = `Key Kings Locksmith` (All environments)
- [ ] `NODE_ENV` = `production` (Production only)

### Email Service (Resend)
- [ ] `RESEND_API_KEY` = `re_xxxxxxxxxxxxxxxxxxxx` (All environments)
- [ ] `FROM_EMAIL` = `noreply@keykingslocksmithsc.com` (All environments)
- [ ] `TO_EMAIL` = `keykingslocksmithsc@gmail.com` (All environments)

### Google Services
- [ ] `GOOGLE_MAPS_API_KEY` = `your_google_maps_api_key` (All environments)
- [ ] `GOOGLE_RECAPTCHA_SITE_KEY` = `your_recaptcha_site_key` (All environments)
- [ ] `GOOGLE_RECAPTCHA_SECRET_KEY` = `your_recaptcha_secret_key` (All environments)

### Analytics (Optional but Recommended)
- [ ] `PUBLIC_GTM_CONTAINER_ID` = `GTM-XXXXXXX` (Production only)
- [ ] `PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX` (Production only)
- [ ] `PUBLIC_FB_PIXEL_ID` = `your_facebook_pixel_id` (Production only)

### Business Information
- [ ] `BUSINESS_PHONE` = `+18649009597` (All environments)
- [ ] `BUSINESS_EMAIL` = `keykingslocksmithsc@gmail.com` (All environments)
- [ ] `BUSINESS_ADDRESS` = `4105 Liberty Highway Unit B, Anderson, SC 29621` (All environments)

### Feature Flags
- [ ] `ENABLE_ANALYTICS` = `true` (Production only)
- [ ] `ENABLE_BOOKING` = `true` (All environments)
- [ ] `ENABLE_BLOG` = `true` (All environments)

## Where to Get API Keys

### Resend API Key
1. Sign up at https://resend.com
2. Go to **API Keys** in dashboard
3. Click "Create API Key"
4. Copy the key (starts with `re_`)
5. **Important**: Verify your domain (keykingslocksmithsc.com) in Resend before sending emails

### Google Maps API Key
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Go to **APIs & Services** → **Library**
4. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
5. Go to **Credentials** → **Create Credentials** → **API Key**
6. Copy the API key
7. **Restrict the key**:
   - Click on the key name
   - Under "Application restrictions", select "HTTP referrers"
   - Add: `keykingslocksmithsc.com/*` and `*.vercel.app/*`
   - Under "API restrictions", select "Restrict key"
   - Select: Maps JavaScript API, Geocoding API
   - Save

### Google reCAPTCHA Keys
1. Go to https://www.google.com/recaptcha/admin
2. Click "+" to register a new site
3. Fill in:
   - Label: Key Kings Locksmith
   - reCAPTCHA type: reCAPTCHA v3
   - Domains: 
     - `keykingslocksmithsc.com`
     - `your-preview-url.vercel.app` (add your actual preview domain)
4. Accept terms and submit
5. Copy both keys:
   - **Site Key** (public) → `GOOGLE_RECAPTCHA_SITE_KEY`
   - **Secret Key** (private) → `GOOGLE_RECAPTCHA_SECRET_KEY`

### Google Tag Manager Container ID
1. Go to https://tagmanager.google.com
2. Create a new account and container
3. Container name: Key Kings Locksmith
4. Target platform: Web
5. Copy the Container ID (format: `GTM-XXXXXXX`)

### Google Analytics Measurement ID
1. Go to https://analytics.google.com
2. Create a new property
3. Property name: Key Kings Locksmith
4. Select your timezone and currency
5. Go to **Admin** → **Data Streams** → **Add stream** → **Web**
6. Enter: keykingslocksmithsc.com
7. Copy the Measurement ID (format: `G-XXXXXXXXXX`)

### Facebook Pixel ID
1. Go to https://business.facebook.com/events_manager
2. Click "Connect Data Sources" → "Web"
3. Select "Facebook Pixel" → "Connect"
4. Name your pixel: Key Kings Locksmith
5. Copy the Pixel ID (numeric)

## Testing Environment Variables

After adding all variables, test them:

### Test Email Functionality
```bash
# Use Vercel preview deployment
# Submit a contact form
# Check if email arrives at keykingslocksmithsc@gmail.com
# Check Resend dashboard for delivery logs
```

### Test Google Maps
```bash
# Visit service areas page on preview deployment
# Verify map loads correctly
# Check browser console for any API errors
```

### Test reCAPTCHA
```bash
# Submit any form on preview deployment
# Verify reCAPTCHA badge appears in bottom-right
# Check browser console for reCAPTCHA errors
```

### Test Analytics (Production Only)
```bash
# After production deployment
# Visit site and navigate a few pages
# Check Google Analytics Real-Time reports
# Use Google Tag Manager Preview mode
# Use Facebook Pixel Helper browser extension
```

## Common Issues

### "Resend API key is invalid"
- Double-check the API key is copied correctly
- Ensure no extra spaces before/after the key
- Verify the key is active in Resend dashboard

### "Google Maps failed to load"
- Verify API key is correct
- Check that Maps JavaScript API is enabled
- Ensure billing is set up in Google Cloud (required even for free tier)
- Check API key restrictions aren't too strict

### "reCAPTCHA validation failed"
- Verify both site key and secret key are correct
- Ensure domain is added to reCAPTCHA admin console
- Check that keys match the correct site

### "Environment variable not found"
- Verify variable name is spelled exactly right (case-sensitive)
- Ensure variable is set for the correct environment
- Redeploy after adding new variables
- For client-side variables, ensure `PUBLIC_` prefix is used

## Security Best Practices

1. **Never commit API keys to Git**
   - Use `.env` file locally (already in `.gitignore`)
   - Only set keys in Vercel dashboard

2. **Restrict API keys**
   - Google Maps: Restrict to your domain
   - Resend: Use separate keys for dev/prod if possible

3. **Use environment-specific values**
   - Different `SITE_URL` for preview vs production
   - Consider separate analytics properties for dev/prod

4. **Rotate keys periodically**
   - Change API keys every 6-12 months
   - Immediately rotate if a key is exposed

5. **Monitor usage**
   - Check Resend dashboard for email usage
   - Monitor Google Cloud Console for API usage
   - Set up billing alerts to avoid surprises

## After Setup

Once all environment variables are configured:

1. ✅ Mark task 30.2 as complete
2. ➡️ Proceed to task 30.3 (Configure custom domain)
3. 🧪 Test preview deployment thoroughly
4. 🚀 Deploy to production when ready

## Need Help?

- Vercel Support: https://vercel.com/support
- Resend Support: https://resend.com/support
- Google Cloud Support: https://cloud.google.com/support
- Check DEPLOYMENT-CHECKLIST.md for detailed troubleshooting
