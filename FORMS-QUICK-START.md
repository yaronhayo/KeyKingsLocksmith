# Forms Quick Start Guide

Quick reference for setting up and using the form system.

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create `.env` file:
```bash
# Copy example file
cp .env.example .env

# Edit and add your keys
RESEND_API_KEY=re_your_key_here
FROM_EMAIL=noreply@keykingslocksmithsc.com
TO_EMAIL=keykingslocksmithsc@gmail.com
GOOGLE_RECAPTCHA_SITE_KEY=6Lc_your_site_key
GOOGLE_RECAPTCHA_SECRET_KEY=6Lc_your_secret_key
PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=6Lc_your_site_key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test Forms
```bash
# Test email configuration
node scripts/test-resend.js

# Test all forms
node scripts/test-forms.js
```

## 📋 Forms Available

| Form | URL | Purpose |
|------|-----|---------|
| Booking | `/book-service` | Service requests |
| Contact | `/contact` | General inquiries |
| Newsletter | Footer (all pages) | Email subscriptions |

## 🔑 Get API Keys

### Resend (Email)
1. Go to [resend.com](https://resend.com)
2. Sign up and verify email
3. Add domain: `keykingslocksmithsc.com`
4. Add DNS records (provided by Resend)
5. Generate API key
6. Copy key to `.env`

### reCAPTCHA (Spam Protection)
1. Go to [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Click **+** to create site
3. Select **reCAPTCHA v3**
4. Add domains: `keykingslocksmithsc.com`, `localhost`
5. Copy site key and secret key to `.env`

## ✅ Quick Test

### Test Booking Form
1. Go to `http://localhost:4321/book-service`
2. Fill in:
   - Name: `John Smith`
   - Phone: `(864) 900-9597`
   - Email: `test@example.com`
   - Address: `123 Main St, Anderson, SC`
   - Service: `Car Lockout`
   - Urgency: `As soon as possible`
3. Submit
4. Check email inbox

### Test Contact Form
1. Go to `http://localhost:4321/contact`
2. Fill in all fields
3. Submit
4. Check email inbox

### Test Newsletter
1. Scroll to footer on any page
2. Enter email
3. Submit
4. Check email inbox

## 🐛 Troubleshooting

### Emails not sending?
```bash
# Test Resend configuration
node scripts/test-resend.js

# Check:
# - API key is correct
# - Domain is verified
# - FROM_EMAIL uses verified domain
```

### Forms not submitting?
```bash
# Check browser console for errors
# Check network tab for failed requests
# Verify environment variables are set
```

### reCAPTCHA errors?
```bash
# Check:
# - Site key is correct
# - Domain is registered
# - HTTPS is enabled (production)
```

## 📚 Documentation

- **Complete Setup**: `FORM-INTEGRATION-GUIDE.md`
- **Testing Checklist**: `FORM-TESTING-CHECKLIST.md`
- **Email Setup**: `src/lib/email/README.md`
- **reCAPTCHA Setup**: `src/lib/recaptcha/README.md`
- **Validation**: `src/lib/validation/README.md`

## 🚢 Deploy to Production

### 1. Configure Vercel Environment Variables
Add in Vercel dashboard:
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `TO_EMAIL`
- `GOOGLE_RECAPTCHA_SITE_KEY`
- `GOOGLE_RECAPTCHA_SECRET_KEY`
- `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY`

### 2. Deploy
```bash
git push origin main
# Vercel auto-deploys
```

### 3. Test Production
- Submit test forms
- Verify emails arrive
- Check Resend dashboard
- Monitor logs

## 💡 Tips

- Use test email addresses during development
- Check spam folder if emails don't arrive
- Monitor Resend dashboard for delivery status
- Check reCAPTCHA dashboard for spam scores
- Review server logs for errors

## 🆘 Need Help?

1. Check troubleshooting section above
2. Review documentation files
3. Check external service dashboards
4. Review server logs
5. Test with automated scripts

## 📞 Support Resources

- **Resend**: [resend.com/docs](https://resend.com/docs)
- **reCAPTCHA**: [developers.google.com/recaptcha](https://developers.google.com/recaptcha/docs/v3)
- **Project Docs**: See README files in `src/lib/`
