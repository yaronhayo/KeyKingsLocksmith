# Deployment Checklist for Key Kings Locksmith Website

This document provides step-by-step instructions for deploying the Key Kings Locksmith website to Vercel.

## Prerequisites

Before starting deployment, ensure you have:

- [ ] Vercel account created (https://vercel.com)
- [ ] GitHub repository with the website code
- [ ] Domain name (keykingslocksmithsc.com) ready for configuration
- [ ] All required API keys and credentials (see below)

## Required API Keys and Services

You'll need to obtain the following before deployment:

### 1. Resend API Key (Email Service)
- Sign up at https://resend.com
- Create an API key from the dashboard
- Verify your domain (keykingslocksmithsc.com) or use Resend's test domain for initial testing
- **Required for**: Contact forms, booking forms, newsletter signups

### 2. Google Maps API Key
- Go to https://console.cloud.google.com
- Create a new project or select existing
- Enable "Maps JavaScript API" and "Geocoding API"
- Create credentials (API Key)
- Restrict the key to your domain for security
- **Required for**: Service area maps, contact page map

### 3. Google reCAPTCHA Keys
- Go to https://www.google.com/recaptcha/admin
- Register a new site with reCAPTCHA v3
- Add your domain: keykingslocksmithsc.com
- Get both Site Key (public) and Secret Key (private)
- **Required for**: Form spam protection

### 4. Google Analytics & Tag Manager (Optional but Recommended)
- **Google Tag Manager**: https://tagmanager.google.com
  - Create a container
  - Get Container ID (format: GTM-XXXXXXX)
- **Google Analytics 4**: https://analytics.google.com
  - Create a property
  - Get Measurement ID (format: G-XXXXXXXXXX)
- **Required for**: Website analytics and conversion tracking

### 5. Facebook Pixel (Optional)
- Go to https://business.facebook.com/events_manager
- Create a pixel
- Get Pixel ID
- **Required for**: Facebook ad tracking

---

## Task 30.2: Set Environment Variables in Vercel

### Step 1: Connect Repository to Vercel

1. Log in to Vercel (https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository containing the Key Kings website
5. Vercel will auto-detect it as an Astro project

### Step 2: Configure Environment Variables

Before deploying, add all environment variables in the Vercel project settings:

1. In your Vercel project, go to **Settings** → **Environment Variables**
2. Add each variable below with the appropriate value
3. Select which environments to apply to: **Production**, **Preview**, and **Development**

#### Required Environment Variables

| Variable Name | Value | Environment | Notes |
|--------------|-------|-------------|-------|
| `SITE_URL` | `https://keykingslocksmithsc.com` | Production | Update after domain is configured |
| `SITE_URL` | `https://your-preview-url.vercel.app` | Preview | Use Vercel preview URL |
| `PUBLIC_SITE_NAME` | `Key Kings Locksmith` | All | Public variable |
| `NODE_ENV` | `production` | Production | |
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxxxxxx` | All | Get from Resend dashboard |
| `FROM_EMAIL` | `noreply@keykingslocksmithsc.com` | All | Must be verified in Resend |
| `TO_EMAIL` | `keykingslocksmithsc@gmail.com` | All | Business email for notifications |
| `GOOGLE_MAPS_API_KEY` | `your_google_maps_api_key` | All | Get from Google Cloud Console |
| `GOOGLE_RECAPTCHA_SITE_KEY` | `your_recaptcha_site_key` | All | Public key from reCAPTCHA |
| `GOOGLE_RECAPTCHA_SECRET_KEY` | `your_recaptcha_secret_key` | All | Secret key from reCAPTCHA |
| `PUBLIC_GTM_CONTAINER_ID` | `GTM-XXXXXXX` | Production | Optional: Google Tag Manager |
| `PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production | Optional: Google Analytics 4 |
| `PUBLIC_FB_PIXEL_ID` | `your_facebook_pixel_id` | Production | Optional: Facebook Pixel |
| `BUSINESS_PHONE` | `+18649009597` | All | Business phone number |
| `BUSINESS_EMAIL` | `keykingslocksmithsc@gmail.com` | All | Business email |
| `BUSINESS_ADDRESS` | `4105 Liberty Highway Unit B, Anderson, SC 29621` | All | Business address |
| `ENABLE_ANALYTICS` | `true` | Production | Feature flag |
| `ENABLE_BOOKING` | `true` | All | Feature flag |
| `ENABLE_BLOG` | `true` | All | Feature flag |

#### Optional Environment Variables

| Variable Name | Default Value | Notes |
|--------------|---------------|-------|
| `DEBUG` | `false` | Set to `true` for verbose logging |
| `LOG_LEVEL` | `info` | Options: error, warn, info, debug |
| `MICROSOFT_CLARITY_ID` | - | Optional: Microsoft Clarity tracking |
| `SESSION_SECRET` | - | Generate a random string for security |
| `CORS_ORIGIN` | `https://keykingslocksmithsc.com` | CORS configuration |
| `RATE_LIMIT_MAX` | `100` | API rate limiting |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit window (1 minute) |

### Step 3: Verify Environment Variables

After adding all variables:

1. Review the list to ensure all required variables are present
2. Check that sensitive keys (API keys, secrets) are not exposed in public variables
3. Verify that `PUBLIC_*` prefixed variables are intentionally public
4. Save all changes

### Step 4: Test with Preview Deployment

1. Vercel will automatically create a preview deployment
2. Wait for the build to complete
3. Visit the preview URL
4. Test the following:
   - [ ] Forms submit successfully
   - [ ] Email notifications are received
   - [ ] Google Maps loads correctly
   - [ ] reCAPTCHA works on forms
   - [ ] No console errors related to missing environment variables

---

## Task 30.3: Configure Custom Domain

### Step 1: Add Domain to Vercel

1. In your Vercel project, go to **Settings** → **Domains**
2. Click "Add Domain"
3. Enter: `keykingslocksmithsc.com`
4. Also add: `www.keykingslocksmithsc.com` (recommended)
5. Vercel will provide DNS configuration instructions

### Step 2: Configure DNS Settings

You have two options for DNS configuration:

#### Option A: Use Vercel Nameservers (Recommended)

1. Vercel will provide nameserver addresses (e.g., ns1.vercel-dns.com)
2. Go to your domain registrar (where you purchased the domain)
3. Update the nameservers to Vercel's nameservers
4. Wait for DNS propagation (can take up to 48 hours, usually much faster)

#### Option B: Use Custom DNS Records

If you want to keep your current nameservers:

1. Add an **A record** for the root domain:
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21` (Vercel's IP)
   - TTL: `3600` (or automatic)

2. Add a **CNAME record** for www subdomain:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `3600` (or automatic)

### Step 3: Verify Domain Configuration

1. Wait for DNS propagation (check status at https://dnschecker.org)
2. Vercel will automatically provision an SSL certificate (Let's Encrypt)
3. Verify HTTPS is working: https://keykingslocksmithsc.com
4. Check that www redirects to non-www (or vice versa, based on your preference)

### Step 4: Update SITE_URL Environment Variable

1. Go to **Settings** → **Environment Variables**
2. Update `SITE_URL` for Production environment:
   - Change from preview URL to: `https://keykingslocksmithsc.com`
3. Save and redeploy

---

## Task 30.4: Pre-Deployment Testing

### Step 1: Local Build Test

Run a production build locally to catch any errors:

```bash
# Install dependencies (if not already done)
npm install

# Run production build
npm run build

# Preview the production build
npm run preview
```

Visit http://localhost:4321 and verify:
- [ ] No build errors in console
- [ ] All pages load correctly
- [ ] No broken links
- [ ] Images load properly
- [ ] Forms are functional

### Step 2: Test Preview Deployment

Use the Vercel preview URL to test with production-like environment:

1. Get the preview URL from Vercel dashboard
2. Test all pages systematically:

#### Homepage Testing
- [ ] Hero section displays correctly
- [ ] All sections load properly
- [ ] CTAs are clickable and functional
- [ ] Phone number click-to-call works on mobile
- [ ] Images are optimized and load quickly

#### Services Pages Testing
- [ ] Main services page loads
- [ ] All 4 category pages load (emergency, residential, commercial, automotive)
- [ ] Service cards display correctly
- [ ] Navigation between services works

#### Service Areas Testing
- [ ] Service areas page loads
- [ ] Google Maps displays correctly
- [ ] All service areas are listed
- [ ] Map markers are visible

#### Forms Testing
- [ ] Contact form submits successfully
- [ ] Booking form submits successfully
- [ ] Newsletter form submits successfully
- [ ] reCAPTCHA challenges appear
- [ ] Email notifications are received at keykingslocksmithsc@gmail.com
- [ ] Success messages display after submission
- [ ] Error handling works for invalid inputs

#### Other Pages Testing
- [ ] FAQ page loads and accordions work
- [ ] Reviews page displays testimonials
- [ ] About page loads correctly
- [ ] Contact page with map works
- [ ] Thank you page displays after form submission
- [ ] Legal pages (Terms, Privacy, Accessibility) load

### Step 3: Run Lighthouse Audits

Test performance, accessibility, SEO, and best practices:

```bash
# Option 1: Use Chrome DevTools
# 1. Open preview URL in Chrome
# 2. Open DevTools (F12)
# 3. Go to Lighthouse tab
# 4. Run audit for Mobile and Desktop

# Option 2: Use CLI (requires local preview)
npm run lighthouse
```

Target scores (all should be 95+):
- [ ] Performance: 95+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

If scores are below target:
1. Review Lighthouse recommendations
2. Fix issues (common: image optimization, unused JavaScript, accessibility)
3. Rebuild and retest

### Step 4: Cross-Browser Testing

Test on multiple browsers and devices:

#### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, macOS)
- [ ] Edge (latest)

#### Mobile Devices
- [ ] iOS Safari (iPhone)
- [ ] Chrome Mobile (Android)
- [ ] Various screen sizes (use DevTools device emulation)

#### Tablet Testing
- [ ] iPad (Safari)
- [ ] Android tablet (Chrome)

### Step 5: Verify All Links

Check for broken links:
- [ ] All internal links work
- [ ] All external links open correctly
- [ ] Social media links go to correct profiles
- [ ] Phone and email links work
- [ ] No 404 errors

### Step 6: Test Analytics Integration

If analytics are configured:
- [ ] Google Tag Manager fires correctly (use GTM Preview mode)
- [ ] Google Analytics tracks page views
- [ ] Facebook Pixel fires (use Facebook Pixel Helper extension)
- [ ] Vercel Analytics is collecting data

---

## Task 30.5: Deploy to Production

### Step 1: Final Pre-Deployment Checklist

Before deploying to production, verify:

- [ ] All environment variables are set correctly
- [ ] Domain is configured and SSL is active
- [ ] Preview deployment testing is complete
- [ ] Lighthouse scores meet targets (95+)
- [ ] All forms are tested and working
- [ ] Google Maps integration works
- [ ] Analytics tracking is configured
- [ ] No console errors on any page
- [ ] All content is reviewed and approved
- [ ] Legal pages are up to date

### Step 2: Deploy to Production

1. In Vercel dashboard, go to your project
2. Go to the **Deployments** tab
3. Find the latest successful preview deployment
4. Click the three dots menu → **Promote to Production**
   
   OR
   
   Push to your main/production branch to trigger automatic deployment

### Step 3: Verify Production Deployment

Once deployed, immediately test the live site:

1. Visit https://keykingslocksmithsc.com
2. Verify SSL certificate is valid (padlock icon in browser)
3. Test critical functionality:
   - [ ] Homepage loads correctly
   - [ ] Forms submit and send emails
   - [ ] Phone click-to-call works
   - [ ] Google Maps loads
   - [ ] All pages are accessible
   - [ ] No console errors

### Step 4: Monitor Performance

#### Immediate Monitoring (First 24 Hours)

1. **Vercel Analytics Dashboard**
   - Monitor page views and user sessions
   - Check for any error spikes
   - Review performance metrics

2. **Error Logs**
   - Go to Vercel project → **Logs** tab
   - Monitor for any runtime errors
   - Check API route errors

3. **Form Submissions**
   - Test each form type
   - Verify emails are received
   - Check spam folder if emails are missing

4. **Core Web Vitals**
   - Monitor in Vercel Speed Insights
   - Check Google Search Console (after setup)
   - Target: LCP <2.5s, TBT <150ms, CLS <0.1

#### Set Up Alerts

1. **Vercel Notifications**
   - Go to project **Settings** → **Notifications**
   - Enable deployment failure alerts
   - Enable error rate alerts

2. **Email Monitoring**
   - Check Resend dashboard for delivery rates
   - Monitor bounce rates
   - Set up alerts for delivery failures

### Step 5: Post-Deployment Tasks

After successful deployment:

1. **Update DNS Records** (if needed)
   - Ensure all DNS records point to production
   - Remove any old/test records

2. **Test from Different Locations**
   - Use VPN or ask team members in different locations to test
   - Verify site loads globally

3. **Mobile Testing**
   - Test on actual mobile devices (not just emulators)
   - Verify touch interactions work
   - Test click-to-call functionality

4. **Document Deployment**
   - Record deployment date and time
   - Note any issues encountered
   - Document any configuration changes made

---

## Post-Launch Tasks (Task 31)

After production deployment is stable, complete these tasks:

### 31.1 Submit Sitemap to Search Engines

1. **Google Search Console**
   - Go to https://search.google.com/search-console
   - Add property: keykingslocksmithsc.com
   - Verify ownership (DNS or HTML file method)
   - Submit sitemap: https://keykingslocksmithsc.com/sitemap-index.xml

2. **Bing Webmaster Tools**
   - Go to https://www.bing.com/webmasters
   - Add site: keykingslocksmithsc.com
   - Verify ownership
   - Submit sitemap: https://keykingslocksmithsc.com/sitemap-index.xml

### 31.2 Set Up Google My Business

1. Go to https://business.google.com
2. Verify business listing at: 4105 Liberty Highway Unit B, Anderson SC 29621
3. Add website URL: https://keykingslocksmithsc.com
4. Ensure NAP (Name, Address, Phone) matches website exactly:
   - Name: Key Kings Locksmith
   - Address: 4105 Liberty Highway Unit B, Anderson, SC 29621
   - Phone: (864) 900-9597
5. Add business hours (match website):
   - Sunday: 7:00 AM - 10:00 PM
   - Monday: 7:00 AM - 10:00 PM
   - Tuesday: 7:00 AM - 10:00 PM
   - Wednesday: 7:00 AM - 10:00 PM
   - Thursday: 7:00 AM - 10:00 PM
   - Friday: 6:30 AM - 5:30 PM
   - Saturday: Closed
6. Upload photos and logo
7. Add services offered
8. Encourage customers to leave reviews

### 31.3 Monitor and Optimize

1. **Weekly Monitoring**
   - Check Vercel Analytics for traffic patterns
   - Review form submission rates
   - Monitor Core Web Vitals
   - Check for any errors in logs

2. **Monthly Tasks**
   - Review and respond to customer reviews
   - Update content if needed
   - Check for broken links
   - Update dependencies (security patches)

3. **Quarterly Tasks**
   - Content refresh and updates
   - SEO performance review
   - Competitor analysis
   - Performance optimization review

---

## Troubleshooting Common Issues

### Issue: Forms Not Sending Emails

**Possible Causes:**
- Resend API key is incorrect or expired
- FROM_EMAIL is not verified in Resend
- TO_EMAIL is incorrect
- reCAPTCHA is blocking submissions

**Solutions:**
1. Verify Resend API key in environment variables
2. Check Resend dashboard for delivery logs
3. Verify domain in Resend settings
4. Test with Resend's test domain first
5. Check browser console for errors

### Issue: Google Maps Not Loading

**Possible Causes:**
- Google Maps API key is incorrect
- API key restrictions are too strict
- Maps JavaScript API is not enabled
- Billing is not set up in Google Cloud

**Solutions:**
1. Verify API key in environment variables
2. Check Google Cloud Console for API status
3. Enable Maps JavaScript API and Geocoding API
4. Add domain to API key restrictions
5. Ensure billing is enabled (required even for free tier)

### Issue: Low Lighthouse Scores

**Common Issues and Fixes:**
- **Performance**: Optimize images, reduce JavaScript, enable caching
- **Accessibility**: Add alt text, improve color contrast, fix ARIA labels
- **SEO**: Add meta descriptions, fix heading hierarchy, improve internal linking
- **Best Practices**: Enable HTTPS, fix console errors, update dependencies

### Issue: SSL Certificate Not Working

**Possible Causes:**
- DNS not fully propagated
- Domain not properly configured in Vercel
- Certificate provisioning failed

**Solutions:**
1. Wait for DNS propagation (up to 48 hours)
2. Check DNS configuration at https://dnschecker.org
3. Remove and re-add domain in Vercel
4. Contact Vercel support if issue persists

### Issue: Environment Variables Not Working

**Possible Causes:**
- Variables not set for correct environment
- Typo in variable name
- Need to redeploy after adding variables
- PUBLIC_ prefix missing for client-side variables

**Solutions:**
1. Verify variable names match exactly (case-sensitive)
2. Check that variables are set for correct environment
3. Redeploy after adding/changing variables
4. Use PUBLIC_ prefix for variables needed in browser

---

## Support and Resources

### Vercel Documentation
- Vercel Docs: https://vercel.com/docs
- Environment Variables: https://vercel.com/docs/environment-variables
- Custom Domains: https://vercel.com/docs/custom-domains
- Astro on Vercel: https://vercel.com/docs/frameworks/astro

### Service Documentation
- Resend: https://resend.com/docs
- Google Maps API: https://developers.google.com/maps/documentation
- reCAPTCHA: https://developers.google.com/recaptcha/docs/v3
- Google Analytics: https://support.google.com/analytics

### Testing Tools
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- PageSpeed Insights: https://pagespeed.web.dev
- DNS Checker: https://dnschecker.org
- SSL Checker: https://www.sslshopper.com/ssl-checker.html
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

---

## Deployment Complete! 🎉

Once all tasks are complete and the site is live:

1. Celebrate the successful launch! 🎊
2. Monitor the site closely for the first 24-48 hours
3. Gather feedback from the client
4. Make any necessary adjustments
5. Set up regular maintenance schedule

**Remember**: Deployment is not the end—it's the beginning of the website's lifecycle. Regular monitoring, updates, and optimization will ensure the site continues to perform well and serve the business effectively.
