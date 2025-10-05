# Production Deployment Guide

This guide provides step-by-step instructions for deploying the Key Kings Locksmith website to production on Vercel.

## Pre-Deployment Checklist

Before deploying to production, ensure all previous tasks are complete:

- [x] Task 30.1: Vercel project configured
- [x] Task 30.2: Environment variables set in Vercel
- [x] Task 30.3: Custom domain configured
- [x] Task 30.4: Pre-deployment testing completed

## Deployment Methods

You have two options for deploying to production:

### Method 1: Promote Preview Deployment (Recommended)

This method promotes a tested preview deployment to production.

**Advantages**:
- Deploy exactly what you've tested
- No surprises
- Instant deployment
- Can rollback easily

**Steps**:
1. Log in to Vercel: https://vercel.com
2. Navigate to your Key Kings Locksmith project
3. Go to the **Deployments** tab
4. Find the latest successful preview deployment that you've tested
5. Click the three dots menu (⋯) next to the deployment
6. Select **Promote to Production**
7. Confirm the promotion

### Method 2: Deploy from Git Branch

This method triggers a new production deployment from your main branch.

**Advantages**:
- Fresh build from source
- Follows standard Git workflow
- Automatic on every push to main

**Steps**:
1. Ensure all changes are committed to your repository
2. Push to your main/production branch:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```
3. Vercel automatically detects the push and starts deployment
4. Monitor deployment progress in Vercel dashboard

---

## Production Deployment Steps

### Step 1: Final Pre-Deployment Verification

Before deploying, run final checks:

```bash
# Run the pre-deployment check script
node scripts/pre-deployment-check.js

# Run a fresh build
npm run build

# Check for any errors
# Review the output carefully
```

**Verify**:
- [ ] Build completes without errors
- [ ] No critical issues in pre-deployment check
- [ ] All environment variables are set in Vercel
- [ ] Domain is configured and DNS is propagated
- [ ] Preview deployment has been thoroughly tested

### Step 2: Deploy to Production

Choose your deployment method (Method 1 or Method 2 above) and execute.

**Monitor Deployment**:
1. Watch the deployment progress in Vercel dashboard
2. Check for any build errors
3. Wait for "Deployment Ready" status
4. Note the deployment URL and time

**Typical Deployment Time**: 1-3 minutes

### Step 3: Immediate Post-Deployment Verification

As soon as deployment completes, immediately test the live site:

#### 3.1 Basic Functionality Check

Visit: https://keykingslocksmithsc.com

**Critical Checks** (Do these first):
- [ ] Site loads successfully
- [ ] SSL certificate is valid (padlock icon visible)
- [ ] Homepage displays correctly
- [ ] No console errors (open DevTools)
- [ ] Images load properly
- [ ] Navigation works

#### 3.2 Test Forms

**Contact Form**:
1. Go to /contact
2. Fill out and submit the form
3. Verify:
   - [ ] Form submits successfully
   - [ ] Success message displays
   - [ ] Email received at keykingslocksmithsc@gmail.com
   - [ ] No errors in console

**Booking Form**:
1. Go to /book-service
2. Fill out and submit the form
3. Verify:
   - [ ] Form submits successfully
   - [ ] Redirects to thank you page
   - [ ] Email received at keykingslocksmithsc@gmail.com

**Newsletter Form**:
1. Find newsletter form (typically in footer)
2. Submit with test email
3. Verify:
   - [ ] Form submits successfully
   - [ ] Success message displays

#### 3.3 Test Key Pages

Visit and verify each page loads correctly:
- [ ] Homepage (/)
- [ ] Services (/services)
- [ ] Emergency Locksmith (/services/emergency-locksmith)
- [ ] Residential Locksmith (/services/residential-locksmith)
- [ ] Commercial Locksmith (/services/commercial-locksmith)
- [ ] Automotive Locksmith (/services/automotive-locksmith)
- [ ] Service Areas (/service-areas)
- [ ] FAQ (/faq)
- [ ] Reviews (/reviews)
- [ ] About (/about)
- [ ] Contact (/contact)

#### 3.4 Test Google Maps

- [ ] Service Areas page map loads
- [ ] Contact page map loads
- [ ] Maps are interactive
- [ ] No API errors in console

#### 3.5 Test Mobile

Use your phone or DevTools device emulation:
- [ ] Site is responsive
- [ ] Click-to-call works on phone number
- [ ] Forms work on mobile
- [ ] Navigation menu works
- [ ] No horizontal scrolling

### Step 4: Monitor Performance

#### 4.1 Check Vercel Analytics

1. Go to Vercel dashboard → Your project → **Analytics**
2. Verify data is being collected
3. Check for any error spikes

#### 4.2 Run Lighthouse Audit

Run a quick Lighthouse audit on production:

```bash
# Option 1: Chrome DevTools
# 1. Open https://keykingslocksmithsc.com in Chrome
# 2. Open DevTools (F12)
# 3. Go to Lighthouse tab
# 4. Run audit

# Option 2: PageSpeed Insights
# Visit: https://pagespeed.web.dev
# Enter: keykingslocksmithsc.com
# Click Analyze
```

**Target Scores**:
- [ ] Performance: 95+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

**If scores are below target**:
- Note the issues
- Plan fixes for next deployment
- Don't rollback unless critical

#### 4.3 Check Core Web Vitals

Monitor Core Web Vitals in:
- Vercel Speed Insights
- PageSpeed Insights
- Chrome DevTools

**Target Metrics**:
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] TBT (Total Blocking Time): < 150ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Step 5: Test from Different Locations

If possible, test from different geographic locations:

**Methods**:
1. Use VPN to test from different regions
2. Ask team members in different locations to test
3. Use online testing tools:
   - https://www.webpagetest.org (test from multiple locations)
   - https://tools.pingdom.com (test from different servers)

**Verify**:
- [ ] Site loads globally
- [ ] Performance is acceptable worldwide
- [ ] No regional issues

### Step 6: Verify Analytics Tracking

If analytics are configured:

#### Google Tag Manager
1. Visit the site
2. Open GTM Preview mode
3. Navigate through a few pages
4. Verify tags are firing correctly

#### Google Analytics
1. Go to Google Analytics
2. Check Real-Time reports
3. Navigate through the site
4. Verify page views are tracked

#### Facebook Pixel
1. Install Facebook Pixel Helper extension
2. Visit the site
3. Verify pixel fires correctly

### Step 7: Monitor Error Logs

For the first hour after deployment:

1. Go to Vercel dashboard → Your project → **Logs**
2. Monitor for any errors
3. Check both:
   - Build logs
   - Runtime logs
   - Function logs (API routes)

**Look for**:
- API route errors
- Form submission errors
- Missing environment variables
- 404 errors
- 500 errors

**If errors appear**:
- Investigate immediately
- Check if they're critical
- Fix and redeploy if necessary

---

## Post-Deployment Monitoring (First 24 Hours)

### Hour 1: Active Monitoring

**Every 15 minutes**:
- [ ] Check Vercel error logs
- [ ] Monitor analytics for traffic
- [ ] Test forms periodically
- [ ] Check email delivery

### Hours 2-6: Regular Monitoring

**Every hour**:
- [ ] Check error logs
- [ ] Review analytics
- [ ] Test one form
- [ ] Check performance metrics

### Hours 6-24: Periodic Monitoring

**Every 3-4 hours**:
- [ ] Check error logs
- [ ] Review analytics
- [ ] Check Core Web Vitals
- [ ] Monitor form submissions

### What to Watch For

**Red Flags** (Require immediate action):
- High error rate (>5% of requests)
- Forms not working
- Site not loading
- SSL certificate issues
- Database/API connection errors

**Yellow Flags** (Monitor closely):
- Slower than expected performance
- Occasional errors
- Lower than expected traffic
- Analytics not tracking properly

**Green Flags** (All good):
- Error rate <1%
- Forms working consistently
- Performance metrics in target range
- Analytics tracking correctly
- Positive user feedback

---

## Rollback Procedure

If critical issues are discovered after deployment:

### Quick Rollback (Instant)

1. Go to Vercel dashboard → **Deployments**
2. Find the previous working deployment
3. Click three dots menu (⋯)
4. Select **Promote to Production**
5. Confirm

**This instantly reverts to the previous version.**

### Investigate and Fix

After rolling back:
1. Identify the issue
2. Fix in development
3. Test thoroughly in preview
4. Redeploy when ready

---

## Success Criteria

The deployment is considered successful when:

- [ ] Site loads correctly on production domain
- [ ] SSL certificate is valid and working
- [ ] All forms submit and send emails
- [ ] Google Maps loads correctly
- [ ] No critical errors in logs
- [ ] Lighthouse scores meet targets (95+)
- [ ] Core Web Vitals are in good range
- [ ] Analytics tracking works (if configured)
- [ ] Mobile experience is good
- [ ] No user-reported issues

---

## Post-Deployment Tasks

After successful deployment and initial monitoring:

### Immediate Tasks (Within 24 Hours)

1. **Notify Stakeholders**
   - Inform client that site is live
   - Provide production URL
   - Share initial performance metrics

2. **Update Documentation**
   - Document deployment date and time
   - Note any issues encountered
   - Update README with production URL

3. **Set Up Monitoring Alerts**
   - Configure Vercel deployment notifications
   - Set up error rate alerts
   - Configure uptime monitoring (optional)

### Short-Term Tasks (Within 1 Week)

1. **Submit to Search Engines** (Task 31.1)
   - Submit sitemap to Google Search Console
   - Submit sitemap to Bing Webmaster Tools
   - Verify site ownership

2. **Set Up Google My Business** (Task 31.2)
   - Verify business listing
   - Add website URL
   - Ensure NAP consistency
   - Upload photos

3. **Monitor and Optimize**
   - Review analytics data
   - Check for any patterns in errors
   - Optimize based on real user data
   - Gather client feedback

### Ongoing Tasks

1. **Weekly Monitoring**
   - Check analytics for traffic patterns
   - Review error logs
   - Monitor form submission rates
   - Check Core Web Vitals

2. **Monthly Maintenance**
   - Update dependencies (security patches)
   - Review and respond to any issues
   - Check for broken links
   - Update content if needed

3. **Quarterly Reviews**
   - Comprehensive performance review
   - Content refresh
   - SEO performance analysis
   - Competitor analysis

---

## Troubleshooting Production Issues

### Issue: Site Not Loading

**Symptoms**: 404, 502, or 503 errors

**Possible Causes**:
- Deployment failed
- DNS issues
- Vercel service issue

**Solutions**:
1. Check Vercel status page: https://www.vercel-status.com
2. Check deployment logs for errors
3. Verify DNS is pointing to Vercel
4. Try clearing browser cache
5. Rollback to previous deployment if needed

### Issue: Forms Not Working

**Symptoms**: Form submissions fail or emails not received

**Possible Causes**:
- Environment variables not set
- Resend API key invalid
- reCAPTCHA configuration issue
- API route error

**Solutions**:
1. Check Vercel environment variables
2. Verify Resend API key is active
3. Check Resend dashboard for delivery logs
4. Review API route logs in Vercel
5. Test reCAPTCHA configuration
6. Check browser console for errors

### Issue: Google Maps Not Loading

**Symptoms**: Maps don't display or show errors

**Possible Causes**:
- API key not set or invalid
- API not enabled in Google Cloud
- Billing not set up
- Domain restrictions too strict

**Solutions**:
1. Verify GOOGLE_MAPS_API_KEY is set in Vercel
2. Check Google Cloud Console:
   - Maps JavaScript API is enabled
   - Geocoding API is enabled
   - Billing is set up
3. Check API key restrictions
4. Review browser console for specific errors

### Issue: SSL Certificate Error

**Symptoms**: "Not Secure" warning or certificate errors

**Possible Causes**:
- Certificate not provisioned yet
- DNS not fully propagated
- Mixed content (HTTP resources on HTTPS page)

**Solutions**:
1. Wait for certificate provisioning (can take up to 24 hours)
2. Check DNS propagation at https://dnschecker.org
3. Verify all resources use HTTPS
4. Check for mixed content warnings in console
5. Remove and re-add domain in Vercel if needed

### Issue: Poor Performance

**Symptoms**: Slow loading, low Lighthouse scores

**Possible Causes**:
- Large images not optimized
- Too much JavaScript
- Render-blocking resources
- Server response time

**Solutions**:
1. Run Lighthouse audit to identify issues
2. Optimize images (compress, use WebP)
3. Review JavaScript bundle size
4. Check for render-blocking resources
5. Enable caching (already configured in vercel.json)
6. Consider using Vercel Edge Network features

### Issue: Analytics Not Tracking

**Symptoms**: No data in analytics dashboards

**Possible Causes**:
- Environment variables not set
- Analytics code not loading
- Ad blockers
- Configuration errors

**Solutions**:
1. Verify analytics environment variables are set
2. Check browser console for analytics errors
3. Test with ad blockers disabled
4. Use browser extensions to verify tracking:
   - Google Tag Assistant
   - Facebook Pixel Helper
5. Check Real-Time reports in analytics platforms

---

## Emergency Contacts

Keep these contacts handy during deployment:

**Vercel Support**:
- Dashboard: https://vercel.com/support
- Status Page: https://www.vercel-status.com
- Documentation: https://vercel.com/docs

**Service Providers**:
- Resend Support: https://resend.com/support
- Google Cloud Support: https://cloud.google.com/support
- Domain Registrar: [Your registrar's support]

**Internal Contacts**:
- Project Lead: [Name and contact]
- Technical Lead: [Name and contact]
- Client Contact: [Name and contact]

---

## Deployment Completion Checklist

Mark each item as complete:

### Pre-Deployment
- [x] All environment variables set
- [x] Domain configured and DNS propagated
- [x] Preview deployment tested
- [x] Lighthouse scores meet targets
- [x] All forms tested
- [x] Cross-browser testing complete

### Deployment
- [ ] Production deployment initiated
- [ ] Deployment completed successfully
- [ ] No build errors
- [ ] Deployment time recorded

### Post-Deployment Verification
- [ ] Site loads on production domain
- [ ] SSL certificate valid
- [ ] All forms work
- [ ] Google Maps loads
- [ ] No console errors
- [ ] Mobile experience verified

### Monitoring
- [ ] Vercel Analytics collecting data
- [ ] Error logs reviewed (no critical errors)
- [ ] Performance metrics acceptable
- [ ] Analytics tracking verified (if configured)

### Documentation
- [ ] Deployment documented
- [ ] Issues logged (if any)
- [ ] Stakeholders notified
- [ ] README updated

### Next Steps
- [ ] Continue monitoring for 24 hours
- [ ] Schedule Task 31 (Post-launch tasks)
- [ ] Plan first maintenance window

---

## Congratulations! 🎉

If all checks are complete, the Key Kings Locksmith website is successfully deployed to production!

**What's Next**:
1. Continue monitoring for the first 24-48 hours
2. Complete Task 31: Post-launch tasks
3. Set up regular maintenance schedule
4. Gather feedback from client and users
5. Plan future enhancements

**Remember**: Deployment is not the end—it's the beginning of the website's lifecycle. Regular monitoring, updates, and optimization will ensure the site continues to perform well and serve the business effectively.

---

## Deployment Log Template

Use this template to document your deployment:

```markdown
# Production Deployment Log

**Date**: [Date and Time]
**Deployed By**: [Name]
**Deployment Method**: [Promote Preview / Git Push]
**Vercel Deployment ID**: [ID from Vercel]

## Pre-Deployment Status
- Build Status: [Success/Failed]
- Tests Passed: [Yes/No]
- Environment Variables: [All Set/Missing: X]
- Domain Status: [Active/Pending]

## Deployment Details
- Start Time: [Time]
- End Time: [Time]
- Duration: [Minutes]
- Build Errors: [None/List errors]
- Warnings: [None/List warnings]

## Post-Deployment Verification
- Site Loads: [Yes/No]
- SSL Valid: [Yes/No]
- Forms Working: [Yes/No]
- Maps Loading: [Yes/No]
- Console Errors: [None/List errors]

## Performance Metrics
- Lighthouse Performance: [Score]/100
- Lighthouse Accessibility: [Score]/100
- Lighthouse Best Practices: [Score]/100
- Lighthouse SEO: [Score]/100
- LCP: [Time]s
- TBT: [Time]ms
- CLS: [Score]

## Issues Encountered
1. [Issue description] - [Resolution]
2. [Issue description] - [Resolution]

## Monitoring Plan
- Active monitoring: [Duration]
- Check frequency: [Every X minutes/hours]
- Alert contacts: [Names]

## Notes
[Any additional notes or observations]

## Status
- [ ] Deployment Successful
- [ ] Monitoring Active
- [ ] Stakeholders Notified
- [ ] Documentation Updated

**Deployed By**: [Signature/Name]
**Date**: [Date]
```

---

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Astro Documentation**: https://docs.astro.build
- **Deployment Checklist**: See DEPLOYMENT-CHECKLIST.md
- **Testing Guide**: See PRE-DEPLOYMENT-TESTING-GUIDE.md
- **Domain Configuration**: See DOMAIN-CONFIGURATION-GUIDE.md
- **Environment Variables**: See VERCEL-ENV-SETUP.md

**Good luck with your deployment!** 🚀
