# Form Testing Checklist

This document provides a comprehensive checklist for manually testing all forms on the Key Kings Locksmith website.

## Prerequisites

Before testing, ensure:
- [ ] Development server is running (`npm run dev`)
- [ ] Environment variables are configured (`.env` file)
- [ ] Resend API key is set up
- [ ] reCAPTCHA keys are configured
- [ ] Email recipient is set to a test email you can access

## Automated Testing

Run the automated test suite first:

```bash
# Test all forms
node scripts/test-forms.js

# Test specific form
node scripts/test-forms.js booking
node scripts/test-forms.js contact
node scripts/test-forms.js newsletter
```

## Manual Testing

### 1. Booking Form (`/book-service`)

#### Valid Submission Test
- [ ] Navigate to `/book-service`
- [ ] Fill in all required fields with valid data:
  - Name: `John Smith`
  - Phone: `(864) 900-9597`
  - Email: `john@example.com` (optional)
  - Address: `123 Main St, Anderson, SC 29621`
  - Service Type: Select `Car Lockout`
  - Urgency: Select `As soon as possible`
  - Notes: `Test booking submission` (optional)
- [ ] Click "Request Service"
- [ ] Verify success message appears
- [ ] Verify redirect to `/thank-you` page
- [ ] Check email inbox for:
  - [ ] Business notification email
  - [ ] Customer confirmation email (if email provided)

#### Validation Tests
- [ ] Try submitting with empty name → Should show error
- [ ] Try submitting with 1-character name → Should show error
- [ ] Try submitting with invalid phone (e.g., "123") → Should show error
- [ ] Try submitting with invalid email format → Should show error
- [ ] Try submitting without selecting service type → Should show error
- [ ] Try submitting without selecting urgency → Should show error
- [ ] Try submitting with very long notes (>1000 chars) → Should truncate or show error

#### Real-time Validation
- [ ] Type invalid name, then blur field → Error should appear
- [ ] Correct the name → Error should disappear
- [ ] Type invalid email, then blur → Error should appear
- [ ] Correct the email → Error should disappear
- [ ] Type invalid phone, then blur → Error should appear
- [ ] Correct the phone → Error should disappear

#### Edge Cases
- [ ] Submit without email (optional field) → Should succeed
- [ ] Submit without notes (optional field) → Should succeed
- [ ] Submit with special characters in name (e.g., "O'Brien") → Should succeed
- [ ] Submit with international phone format (e.g., "+1-864-900-9597") → Should succeed

#### Error Handling
- [ ] Disconnect internet, try to submit → Should show network error
- [ ] Submit twice rapidly → Second should be rate-limited
- [ ] Fill honeypot field (inspect element, unhide, fill) → Should be rejected as spam

---

### 2. Contact Form (`/contact`)

#### Valid Submission Test
- [ ] Navigate to `/contact`
- [ ] Fill in all required fields:
  - Name: `Jane Doe`
  - Email: `jane@example.com`
  - Phone: `(864) 555-0123` (optional)
  - Subject: `Question about services`
  - Message: `I need help with my home locks. Can you provide a quote?`
- [ ] Click "Send Message"
- [ ] Verify success message appears
- [ ] Check email inbox for:
  - [ ] Business notification email
  - [ ] Customer confirmation email

#### Validation Tests
- [ ] Try submitting with empty name → Should show error
- [ ] Try submitting with invalid email → Should show error
- [ ] Try submitting with subject < 5 characters → Should show error
- [ ] Try submitting with message < 10 characters → Should show error
- [ ] Try submitting with very long message (>2000 chars) → Should show error

#### Real-time Validation
- [ ] Type invalid email, blur → Error appears
- [ ] Correct email → Error disappears
- [ ] Type short subject, blur → Error appears
- [ ] Lengthen subject → Error disappears

#### Edge Cases
- [ ] Submit without phone (optional) → Should succeed
- [ ] Submit with very long subject (200 chars) → Should succeed
- [ ] Submit with line breaks in message → Should succeed

#### Error Handling
- [ ] Submit multiple times rapidly → Should be rate-limited after 5 submissions

---

### 3. Newsletter Form (Footer)

#### Valid Submission Test
- [ ] Scroll to footer on any page
- [ ] Enter valid email: `subscriber@example.com`
- [ ] Click "Subscribe"
- [ ] Verify success message appears
- [ ] Check email inbox for welcome email

#### Validation Tests
- [ ] Try submitting empty email → Should show error
- [ ] Try submitting invalid email (e.g., "notanemail") → Should show error
- [ ] Try submitting email without domain (e.g., "user@") → Should show error

#### Edge Cases
- [ ] Submit with uppercase email → Should convert to lowercase
- [ ] Submit with spaces around email → Should trim spaces
- [ ] Submit same email twice → Second should succeed (idempotent)

#### Error Handling
- [ ] Submit same email 3 times rapidly → Should be rate-limited

---

## Cross-Browser Testing

Test all forms in multiple browsers:

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet

### Things to Check
- [ ] Forms display correctly
- [ ] Validation messages appear properly
- [ ] Submit buttons work
- [ ] Success/error messages display
- [ ] Keyboard navigation works
- [ ] Touch interactions work (mobile)

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all form fields in order
- [ ] Focus indicators are visible
- [ ] Can submit form with Enter key
- [ ] Can navigate with arrow keys in dropdowns

### Screen Reader Testing
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] All labels are read correctly
- [ ] Error messages are announced
- [ ] Success messages are announced
- [ ] Required fields are indicated

### Visual Testing
- [ ] Error messages have sufficient color contrast
- [ ] Focus indicators are visible
- [ ] Form works with 200% zoom
- [ ] Form works with dark mode (if applicable)

---

## Performance Testing

### Load Time
- [ ] Forms load quickly (<2 seconds)
- [ ] reCAPTCHA script loads asynchronously
- [ ] No layout shift when forms load

### Submission Speed
- [ ] Form submits within 3 seconds
- [ ] Loading state is shown during submission
- [ ] No double submissions possible

---

## Security Testing

### reCAPTCHA
- [ ] reCAPTCHA badge appears on forms
- [ ] Token is generated on submission
- [ ] Server verifies token
- [ ] Low scores are rejected

### Honeypot
- [ ] Honeypot field is hidden
- [ ] Filling honeypot rejects submission
- [ ] No false positives

### Input Sanitization
- [ ] HTML tags in input are removed
- [ ] Script tags are removed
- [ ] SQL injection attempts are sanitized
- [ ] XSS attempts are prevented

### Rate Limiting
- [ ] Rapid submissions are blocked
- [ ] Rate limit resets after time window
- [ ] Different forms have different limits

---

## Email Delivery Testing

### Business Notifications
- [ ] Email arrives at business email
- [ ] Subject line is descriptive
- [ ] All form data is included
- [ ] Formatting is correct
- [ ] Links work (phone, email)
- [ ] Reply-to is set correctly

### Customer Confirmations
- [ ] Email arrives at customer email
- [ ] Subject line is friendly
- [ ] Content is helpful
- [ ] Branding is consistent
- [ ] Contact info is included

### Email Clients
Test emails in:
- [ ] Gmail
- [ ] Outlook
- [ ] Apple Mail
- [ ] Yahoo Mail
- [ ] Mobile email apps

---

## Error Scenarios

### Network Errors
- [ ] Offline submission shows error
- [ ] Timeout shows error
- [ ] Server error shows error
- [ ] All errors are user-friendly

### API Errors
- [ ] Invalid API key shows error (check logs)
- [ ] Rate limit shows error
- [ ] Validation error shows specific message

### Email Errors
- [ ] Failed email send doesn't crash form
- [ ] Error is logged
- [ ] User still sees success (email failure is silent)

---

## Integration Testing

### Form → Email → Inbox
- [ ] Submit booking form
- [ ] Verify email sent via Resend
- [ ] Check Resend dashboard for delivery
- [ ] Verify email arrives in inbox
- [ ] Verify email content is correct

### Form → Validation → Error
- [ ] Submit invalid data
- [ ] Verify validation runs
- [ ] Verify error message shows
- [ ] Verify no email sent
- [ ] Verify no data saved

### Form → reCAPTCHA → Verification
- [ ] Submit form
- [ ] Verify reCAPTCHA token generated
- [ ] Verify token sent to server
- [ ] Verify server validates token
- [ ] Check reCAPTCHA dashboard for stats

---

## Production Checklist

Before deploying to production:

### Configuration
- [ ] Production Resend API key configured
- [ ] Production reCAPTCHA keys configured
- [ ] Correct business email set
- [ ] Correct FROM email set (verified domain)
- [ ] All environment variables set in Vercel

### Testing
- [ ] All automated tests pass
- [ ] All manual tests pass
- [ ] Cross-browser testing complete
- [ ] Mobile testing complete
- [ ] Accessibility testing complete

### Monitoring
- [ ] Error logging configured
- [ ] Email delivery monitoring set up
- [ ] Form submission tracking configured
- [ ] Rate limiting tested

### Documentation
- [ ] README files updated
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Troubleshooting guide available

---

## Test Results Template

Use this template to record test results:

```
Date: _______________
Tester: _______________
Environment: [ ] Development [ ] Staging [ ] Production

Booking Form:
- Valid submission: [ ] Pass [ ] Fail
- Validation: [ ] Pass [ ] Fail
- Email delivery: [ ] Pass [ ] Fail
- Notes: _______________________________

Contact Form:
- Valid submission: [ ] Pass [ ] Fail
- Validation: [ ] Pass [ ] Fail
- Email delivery: [ ] Pass [ ] Fail
- Notes: _______________________________

Newsletter Form:
- Valid submission: [ ] Pass [ ] Fail
- Validation: [ ] Pass [ ] Fail
- Email delivery: [ ] Pass [ ] Fail
- Notes: _______________________________

Overall Status: [ ] All Pass [ ] Some Failures
Action Items: _______________________________
```

---

## Troubleshooting

### Forms not submitting
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check network tab for failed requests
4. Verify environment variables are set

### Emails not arriving
1. Check Resend dashboard for delivery status
2. Verify API key is correct
3. Check spam folder
4. Verify FROM email domain is verified
5. Check email service logs

### Validation not working
1. Verify validation functions are imported
2. Check for JavaScript errors
3. Test with different browsers
4. Verify validation rules are correct

### reCAPTCHA not loading
1. Check site key is correct
2. Verify domain is registered in reCAPTCHA console
3. Check for script loading errors
4. Verify HTTPS is enabled (required for reCAPTCHA)

---

## Support

For issues or questions:
- Check README files in `src/lib/email/`, `src/lib/recaptcha/`, `src/lib/validation/`
- Review API route code in `src/pages/api/forms/`
- Check Resend documentation: https://resend.com/docs
- Check reCAPTCHA documentation: https://developers.google.com/recaptcha
