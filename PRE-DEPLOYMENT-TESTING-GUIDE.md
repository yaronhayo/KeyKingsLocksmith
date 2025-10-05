# Pre-Deployment Testing Guide

This guide provides comprehensive testing procedures to ensure the Key Kings Locksmith website is ready for production deployment.

## Build Verification ✅

### Local Build Test

**Status**: ✅ PASSED

The production build completed successfully with:
- 19 pages built
- No build errors
- Sitemap generated successfully
- All static files processed
- Build time: 11.90s

**Build Output Summary**:
```
✓ Homepage (/)
✓ About page (/about)
✓ Accessibility page (/accessibility)
✓ Book Service page (/book-service)
✓ Contact page (/contact)
✓ FAQ page (/faq)
✓ Privacy Policy (/privacy-policy)
✓ Reviews page (/reviews)
✓ Terms of Service (/terms-of-service)
✓ Thank You page (/thank-you)
✓ Services main page (/services)
✓ Emergency Locksmith (/services/emergency-locksmith)
✓ Residential Locksmith (/services/residential-locksmith)
✓ Commercial Locksmith (/services/commercial-locksmith)
✓ Automotive Locksmith (/services/automotive-locksmith)
✓ Service Areas main page (/service-areas)
✓ Anderson SC (/service-areas/anderson-sc)
✓ Clemson SC (/service-areas/clemson-sc)
✓ Greenville SC (/service-areas/greenville-sc)
✓ API routes (4 endpoints)
```

**Notes**:
- API route warnings are expected (GET requests on POST-only endpoints)
- Blog and legal content directories warnings are expected (not using those collections)

---

## Testing Checklist

Use this checklist to systematically test the website before production deployment.

### Phase 1: Local Testing

#### 1.1 Build and Preview

```bash
# Build the site
npm run build

# Start preview server
npm run preview
```

Visit: http://localhost:4321

- [ ] Build completes without errors
- [ ] Preview server starts successfully
- [ ] No console errors on startup

#### 1.2 Homepage Testing

Visit: http://localhost:4321

**Visual Checks**:
- [ ] Hero section displays correctly
- [ ] Logo is visible and properly sized
- [ ] All sections load in correct order
- [ ] Images load and are optimized
- [ ] Colors match brand guidelines (gold and charcoal)
- [ ] Typography is consistent

**Functionality Checks**:
- [ ] Phone number is clickable (click-to-call)
- [ ] "Book Service" button works
- [ ] Navigation menu opens/closes
- [ ] All internal links work
- [ ] Smooth scrolling works (if implemented)
- [ ] Animations play smoothly

**Content Checks**:
- [ ] No emojis present
- [ ] No pricing information displayed
- [ ] No ETA or time promises
- [ ] No staff information
- [ ] Business hours are correct
- [ ] Contact information is accurate

#### 1.3 Services Pages Testing

**Main Services Page** (/services):
- [ ] Page loads correctly
- [ ] All 4 service categories display
- [ ] Service cards are styled correctly
- [ ] Hover effects work
- [ ] Links to category pages work

**Emergency Locksmith** (/services/emergency-locksmith):
- [ ] Page loads correctly
- [ ] Hero section displays
- [ ] Service list is complete
- [ ] No "24/7" or time promises
- [ ] FAQ section works
- [ ] CTA buttons function

**Residential Locksmith** (/services/residential-locksmith):
- [ ] Page loads correctly
- [ ] All residential services listed
- [ ] Prevention tips section displays
- [ ] Images load correctly
- [ ] Forms are accessible

**Commercial Locksmith** (/services/commercial-locksmith):
- [ ] Page loads correctly
- [ ] Commercial services listed
- [ ] Business-focused content displays
- [ ] Trust signals present

**Automotive Locksmith** (/services/automotive-locksmith):
- [ ] Page loads correctly
- [ ] Automotive services listed
- [ ] Car key services detailed
- [ ] Relevant FAQs display

#### 1.4 Service Areas Testing

**Main Service Areas Page** (/service-areas):
- [ ] Page loads correctly
- [ ] All service areas listed
- [ ] Areas organized by region
- [ ] Map placeholder or component displays
- [ ] No "24/7" references

**Individual Area Pages**:
- [ ] Anderson SC page loads
- [ ] Clemson SC page loads
- [ ] Greenville SC page loads
- [ ] Each page has unique content
- [ ] Local references are accurate
- [ ] No time-based promises

#### 1.5 Other Pages Testing

**FAQ Page** (/faq):
- [ ] Page loads correctly
- [ ] All FAQs display
- [ ] Accordion functionality works
- [ ] Questions are organized by category
- [ ] Answers are complete and accurate
- [ ] No pricing information in answers

**Reviews Page** (/reviews):
- [ ] Page loads correctly
- [ ] All reviews display
- [ ] Star ratings show correctly
- [ ] Review cards are styled properly
- [ ] No suspicious or fake-looking reviews

**About Page** (/about):
- [ ] Page loads correctly
- [ ] Company information is accurate
- [ ] No team member details
- [ ] Credentials and certifications display
- [ ] Mission and values are clear

**Contact Page** (/contact):
- [ ] Page loads correctly
- [ ] Contact form displays
- [ ] Business information is accurate
- [ ] Map placeholder displays
- [ ] Social media links present
- [ ] Business hours are correct

**Book Service Page** (/book-service):
- [ ] Page loads correctly
- [ ] Booking form displays
- [ ] Service selection dropdown works
- [ ] All form fields are present
- [ ] Form validation works

**Thank You Page** (/thank-you):
- [ ] Page loads correctly
- [ ] Thank you message displays
- [ ] Next steps are clear
- [ ] Links to other pages work

**Legal Pages**:
- [ ] Terms of Service loads
- [ ] Privacy Policy loads
- [ ] Accessibility Policy loads
- [ ] Content is readable and formatted
- [ ] No "24/7" references in Terms

#### 1.6 Navigation Testing

**Header Navigation**:
- [ ] Logo links to homepage
- [ ] All menu items work
- [ ] Dropdowns work (if applicable)
- [ ] Mobile menu opens/closes
- [ ] Sticky header works on scroll
- [ ] Active page is highlighted

**Footer Navigation**:
- [ ] All footer links work
- [ ] Social media links are correct
- [ ] Contact information is accurate
- [ ] Legal links work
- [ ] Footer displays on all pages

#### 1.7 Form Testing (Local - Limited)

Note: Full form testing requires API keys and will be done on preview deployment.

**Contact Form**:
- [ ] Form displays correctly
- [ ] All fields are present
- [ ] Required field validation works
- [ ] Field labels are clear
- [ ] Submit button is styled correctly

**Booking Form**:
- [ ] Form displays correctly
- [ ] Service selection dropdown works
- [ ] Date/time fields work (if present)
- [ ] Validation works

**Newsletter Form**:
- [ ] Form displays correctly
- [ ] Email field validation works
- [ ] Submit button works

---

### Phase 2: Preview Deployment Testing

After deploying to Vercel preview environment:

#### 2.1 Get Preview URL

1. Push code to GitHub
2. Vercel automatically creates preview deployment
3. Get preview URL from Vercel dashboard (e.g., `https://key-kings-abc123.vercel.app`)

#### 2.2 Environment Variables Check

Before testing, verify all environment variables are set:

```bash
# In Vercel dashboard, check that these are set for Preview environment:
- RESEND_API_KEY
- GOOGLE_MAPS_API_KEY
- GOOGLE_RECAPTCHA_SITE_KEY
- GOOGLE_RECAPTCHA_SECRET_KEY
- FROM_EMAIL
- TO_EMAIL
- SITE_URL (set to preview URL)
```

#### 2.3 Full Site Testing on Preview

Repeat all tests from Phase 1 on the preview URL, plus:

#### 2.4 Form Submission Testing

**Contact Form**:
1. Fill out form with test data:
   - Name: Test User
   - Email: your-test-email@example.com
   - Phone: (555) 123-4567
   - Message: This is a test submission
2. Complete reCAPTCHA
3. Submit form
4. Verify:
   - [ ] Form submits successfully
   - [ ] Success message displays
   - [ ] Email received at keykingslocksmithsc@gmail.com
   - [ ] Email contains all form data
   - [ ] No errors in browser console

**Booking Form**:
1. Fill out form with test data:
   - Name: Test Booking
   - Email: your-test-email@example.com
   - Phone: (555) 123-4567
   - Service: Select a service
   - Message: Test booking request
2. Complete reCAPTCHA
3. Submit form
4. Verify:
   - [ ] Form submits successfully
   - [ ] Redirects to thank you page
   - [ ] Email received at keykingslocksmithsc@gmail.com
   - [ ] Email contains booking details

**Newsletter Form**:
1. Enter test email
2. Complete reCAPTCHA
3. Submit
4. Verify:
   - [ ] Form submits successfully
   - [ ] Success message displays
   - [ ] Email received (if newsletter signup sends confirmation)

#### 2.5 Google Maps Testing

**Service Areas Page**:
- [ ] Map loads correctly
- [ ] Service area markers display
- [ ] Map is interactive (zoom, pan)
- [ ] No API errors in console
- [ ] Map styling matches brand

**Contact Page**:
- [ ] Business location map loads
- [ ] Marker shows correct address
- [ ] Map is interactive
- [ ] No API errors

#### 2.6 reCAPTCHA Testing

On each form:
- [ ] reCAPTCHA badge appears in bottom-right
- [ ] reCAPTCHA challenge works (if triggered)
- [ ] Form submission blocked without reCAPTCHA
- [ ] No console errors related to reCAPTCHA

---

### Phase 3: Performance Testing

#### 3.1 Lighthouse Audits

Run Lighthouse audits on preview URL for key pages:

**Pages to Test**:
1. Homepage (/)
2. Services main page (/services)
3. Service Areas page (/service-areas)
4. Contact page (/contact)

**How to Run**:

**Option 1: Chrome DevTools**
1. Open preview URL in Chrome
2. Open DevTools (F12 or Cmd+Option+I)
3. Go to "Lighthouse" tab
4. Select categories: Performance, Accessibility, Best Practices, SEO
5. Select device: Mobile
6. Click "Analyze page load"
7. Review results
8. Repeat for Desktop

**Option 2: PageSpeed Insights**
1. Go to https://pagespeed.web.dev
2. Enter preview URL
3. Click "Analyze"
4. Review Mobile and Desktop results

**Target Scores** (All should be 95+):
- [ ] Performance: 95+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

**If Scores Are Below Target**:

**Performance Issues**:
- Check image optimization
- Review JavaScript bundle size
- Check for render-blocking resources
- Verify lazy loading is working

**Accessibility Issues**:
- Check color contrast ratios
- Verify alt text on images
- Check form labels
- Test keyboard navigation

**Best Practices Issues**:
- Check for console errors
- Verify HTTPS is used
- Check for deprecated APIs
- Review security headers

**SEO Issues**:
- Check meta descriptions
- Verify heading hierarchy
- Check for broken links
- Verify robots.txt and sitemap

#### 3.2 Core Web Vitals Testing

Test Core Web Vitals on preview deployment:

**Metrics to Check**:
- **LCP (Largest Contentful Paint)**: Target < 2.5s
- **TBT (Total Blocking Time)**: Target < 150ms
- **CLS (Cumulative Layout Shift)**: Target < 0.1

**How to Test**:
1. Use Lighthouse (includes Core Web Vitals)
2. Use PageSpeed Insights
3. Check Vercel Speed Insights (if enabled)

**Pages to Test**:
- [ ] Homepage
- [ ] Services page
- [ ] Service Areas page
- [ ] Contact page

#### 3.3 Load Time Testing

Test page load times:

**Tools**:
- Chrome DevTools Network tab
- WebPageTest: https://www.webpagetest.org

**Metrics**:
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Total page size < 1MB
- [ ] Number of requests < 50

#### 3.4 Image Optimization Verification

Check that images are optimized:
- [ ] Images use modern formats (WebP, AVIF)
- [ ] Images have appropriate dimensions
- [ ] Images are compressed
- [ ] Lazy loading is implemented
- [ ] Alt text is present on all images

---

### Phase 4: Cross-Browser Testing

Test on multiple browsers and devices:

#### 4.1 Desktop Browsers

**Chrome (Latest)**:
- [ ] All pages load correctly
- [ ] Forms work
- [ ] Animations are smooth
- [ ] No console errors

**Firefox (Latest)**:
- [ ] All pages load correctly
- [ ] Forms work
- [ ] Styling is consistent
- [ ] No console errors

**Safari (Latest - macOS)**:
- [ ] All pages load correctly
- [ ] Forms work
- [ ] Webkit-specific features work
- [ ] No console errors

**Edge (Latest)**:
- [ ] All pages load correctly
- [ ] Forms work
- [ ] Styling is consistent
- [ ] No console errors

#### 4.2 Mobile Devices

**iOS Safari (iPhone)**:
- [ ] All pages load correctly
- [ ] Touch interactions work
- [ ] Click-to-call works
- [ ] Forms are usable
- [ ] Viewport is correct
- [ ] No horizontal scrolling

**Chrome Mobile (Android)**:
- [ ] All pages load correctly
- [ ] Touch interactions work
- [ ] Click-to-call works
- [ ] Forms are usable
- [ ] Viewport is correct

**Test Different Screen Sizes**:
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Android (various sizes)

#### 4.3 Tablet Testing

**iPad (Safari)**:
- [ ] All pages load correctly
- [ ] Layout adapts appropriately
- [ ] Touch interactions work
- [ ] Forms are usable

**Android Tablet (Chrome)**:
- [ ] All pages load correctly
- [ ] Layout adapts appropriately
- [ ] Touch interactions work

---

### Phase 5: Functionality Testing

#### 5.1 Link Testing

**Internal Links**:
- [ ] All navigation links work
- [ ] All footer links work
- [ ] All CTA buttons work
- [ ] All service links work
- [ ] All breadcrumb links work (if present)
- [ ] No broken internal links

**External Links**:
- [ ] Social media links open correct profiles
- [ ] External links open in new tab (if intended)
- [ ] No broken external links

**Special Links**:
- [ ] Phone number click-to-call works
- [ ] Email links open email client
- [ ] Map links work

#### 5.2 Interactive Elements

**Buttons**:
- [ ] All buttons are clickable
- [ ] Hover states work
- [ ] Focus states are visible
- [ ] Disabled states work (if applicable)

**Forms**:
- [ ] All form fields are functional
- [ ] Validation works correctly
- [ ] Error messages display
- [ ] Success messages display
- [ ] Required fields are enforced

**Accordions** (FAQ):
- [ ] Accordions expand/collapse
- [ ] Only one open at a time (if designed that way)
- [ ] Smooth animations
- [ ] Keyboard accessible

**Modals** (if present):
- [ ] Modals open correctly
- [ ] Modals close correctly
- [ ] Background is dimmed
- [ ] Keyboard accessible (ESC to close)

#### 5.3 Responsive Design

Test at various breakpoints:

**Mobile (< 640px)**:
- [ ] Layout stacks vertically
- [ ] Text is readable
- [ ] Images scale appropriately
- [ ] Navigation becomes hamburger menu
- [ ] Forms are usable

**Tablet (640px - 1024px)**:
- [ ] Layout adapts appropriately
- [ ] Content is readable
- [ ] Images scale well
- [ ] Navigation works

**Desktop (> 1024px)**:
- [ ] Full layout displays
- [ ] Content is well-spaced
- [ ] Images are high quality
- [ ] Navigation is horizontal

---

### Phase 6: SEO and Content Testing

#### 6.1 Meta Tags Verification

Check each page for proper meta tags:

**Homepage**:
- [ ] Title tag present and unique
- [ ] Meta description present and compelling
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL correct

**Service Pages**:
- [ ] Each page has unique title
- [ ] Each page has unique description
- [ ] Keywords are relevant
- [ ] Canonical URLs correct

**Other Pages**:
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] No duplicate content

#### 6.2 Structured Data (Schema Markup)

Verify schema markup using Google's Rich Results Test:
https://search.google.com/test/rich-results

**Pages to Test**:
- [ ] Homepage (LocalBusiness schema)
- [ ] Service pages (Service schema)
- [ ] FAQ page (FAQ schema)
- [ ] Service areas (LocalBusiness schema)

**Verify**:
- [ ] No errors in schema
- [ ] All required fields present
- [ ] Business information is accurate

#### 6.3 Sitemap and Robots.txt

**Sitemap**:
- [ ] Sitemap accessible at /sitemap-index.xml
- [ ] All pages included
- [ ] No broken URLs
- [ ] Proper XML format

**Robots.txt**:
- [ ] Robots.txt accessible at /robots.txt
- [ ] Allows crawling of main pages
- [ ] Blocks API routes
- [ ] References sitemap

#### 6.4 Content Quality Check

**Spelling and Grammar**:
- [ ] No spelling errors
- [ ] No grammar errors
- [ ] Professional tone throughout

**Content Accuracy**:
- [ ] Business information is correct
- [ ] Service descriptions are accurate
- [ ] No outdated information
- [ ] Contact details are current

**Compliance Check**:
- [ ] No emojis anywhere
- [ ] No pricing information
- [ ] No ETA or time promises
- [ ] No staff information
- [ ] NAP consistency across all pages

---

### Phase 7: Security Testing

#### 7.1 HTTPS Verification

- [ ] All pages load over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate is valid
- [ ] No insecure resources loaded

#### 7.2 Security Headers

Check security headers using: https://securityheaders.com

Enter preview URL and verify:
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Content-Security-Policy (if implemented)

#### 7.3 Form Security

- [ ] reCAPTCHA is working
- [ ] Forms validate input
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] CSRF protection (if applicable)

---

### Phase 8: Analytics Testing (If Configured)

#### 8.1 Google Tag Manager

If GTM is configured:
- [ ] GTM container loads
- [ ] Use GTM Preview mode to verify tags fire
- [ ] Check dataLayer events

#### 8.2 Google Analytics

If GA4 is configured:
- [ ] Page views are tracked
- [ ] Check Real-Time reports
- [ ] Verify events fire (form submissions, clicks)

#### 8.3 Facebook Pixel

If Facebook Pixel is configured:
- [ ] Pixel loads correctly
- [ ] Use Facebook Pixel Helper extension
- [ ] Verify PageView event fires

#### 8.4 Vercel Analytics

- [ ] Vercel Analytics is collecting data
- [ ] Check Vercel dashboard for metrics

---

## Testing Results Template

Use this template to document testing results:

```markdown
# Pre-Deployment Testing Results

**Date**: [Date]
**Tester**: [Name]
**Preview URL**: [URL]

## Build Status
- [x] Local build successful
- [x] Preview deployment successful

## Lighthouse Scores

### Homepage
- Performance: [Score]/100
- Accessibility: [Score]/100
- Best Practices: [Score]/100
- SEO: [Score]/100

### Services Page
- Performance: [Score]/100
- Accessibility: [Score]/100
- Best Practices: [Score]/100
- SEO: [Score]/100

## Form Testing
- [x] Contact form works
- [x] Booking form works
- [x] Newsletter form works
- [x] Emails received successfully

## Cross-Browser Testing
- [x] Chrome - No issues
- [x] Firefox - No issues
- [x] Safari - No issues
- [x] Edge - No issues
- [x] Mobile Safari - No issues
- [x] Chrome Mobile - No issues

## Issues Found
1. [Issue description] - [Status: Fixed/Pending]
2. [Issue description] - [Status: Fixed/Pending]

## Recommendations
- [Any recommendations for improvement]

## Ready for Production?
- [ ] Yes, all tests passed
- [ ] No, issues need to be resolved first

**Notes**: [Any additional notes]
```

---

## Common Issues and Solutions

### Issue: Forms Not Submitting

**Check**:
- Environment variables are set correctly
- reCAPTCHA keys are valid
- Resend API key is active
- Network tab shows API call

### Issue: Google Maps Not Loading

**Check**:
- GOOGLE_MAPS_API_KEY is set
- API is enabled in Google Cloud Console
- Billing is set up (required)
- Domain is whitelisted in API restrictions

### Issue: Low Performance Scores

**Check**:
- Images are optimized
- JavaScript is minified
- No render-blocking resources
- Lazy loading is working

### Issue: Broken Links

**Check**:
- All internal links use correct paths
- No hardcoded URLs
- Relative paths are correct

---

## Final Pre-Deployment Checklist

Before proceeding to production deployment:

- [ ] All tests completed
- [ ] Lighthouse scores meet targets (95+)
- [ ] Forms tested and working
- [ ] Google Maps working
- [ ] Cross-browser testing complete
- [ ] Mobile testing complete
- [ ] No console errors
- [ ] No broken links
- [ ] Content reviewed and approved
- [ ] Security headers verified
- [ ] Analytics configured (if applicable)
- [ ] All issues resolved or documented

**If all items are checked, proceed to Task 30.5: Deploy to Production**

---

## Support and Resources

- Lighthouse Documentation: https://developers.google.com/web/tools/lighthouse
- PageSpeed Insights: https://pagespeed.web.dev
- WebPageTest: https://www.webpagetest.org
- Security Headers: https://securityheaders.com
- Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
