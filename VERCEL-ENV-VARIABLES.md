# ⚙️ Vercel Environment Variables Setup

## 🚨 IMPORTANT: Add These to Vercel After Deployment

After deploying your site to Vercel, you **must** add these environment variables for the site to work properly.

---

## 📋 Environment Variables to Add

Go to your Vercel project → **Settings** → **Environment Variables** and add:

### 1. Google Maps API Key (Required for Address Autocomplete)
```
Name: PUBLIC_GOOGLE_MAPS_API_KEY
Value: AIzaSyDW5O_4hPO0A2iFhLj73Rz8S6LSBUQGatA
```

### 2. Google reCAPTCHA Keys (Required for Form Spam Protection)
```
Name: PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
Value: [Your reCAPTCHA Site Key - get from https://www.google.com/recaptcha/admin]

Name: GOOGLE_RECAPTCHA_SECRET_KEY
Value: [Your reCAPTCHA Secret Key - get from same place]
```

### 3. Resend API Key (Required for Email Notifications)
```
Name: RESEND_API_KEY
Value: [Your Resend API Key - get from https://resend.com/api-keys]
```

### 4. Email Configuration
```
Name: TO_EMAIL
Value: keykingslocksmithsc@gmail.com

Name: FROM_EMAIL
Value: noreply@keykingslocksmithsc.com
```
**Note**: The FROM_EMAIL domain must be verified in Resend.

### 5. Business Information (Optional but Recommended)
```
Name: BUSINESS_PHONE
Value: +18649009597

Name: BUSINESS_EMAIL
Value: keykingslocksmithsc@gmail.com

Name: BUSINESS_ADDRESS
Value: 4105 Liberty Highway Unit B, Anderson, SC 29621
```

---

## 🔧 How to Add Environment Variables to Vercel

### Step 1: Go to Your Project Settings
1. Log in to https://vercel.com
2. Select your project: **KeyKingsKiro** or **keykingslocksmithsc**
3. Click **Settings** (top navigation)

### Step 2: Add Environment Variables
1. Click **Environment Variables** (left sidebar)
2. Click **Add New** button
3. Enter the **Name** (e.g., `PUBLIC_GOOGLE_MAPS_API_KEY`)
4. Enter the **Value** (e.g., `AIzaSyDW5O_4hPO0A2iFhLj73Rz8S6LSBUQGatA`)
5. Select which environments to apply to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
6. Click **Save**
7. Repeat for all variables above

### Step 3: Redeploy Your Site
After adding all environment variables:
1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**
4. The site will rebuild with your environment variables

---

## ✅ Verification Checklist

After deployment with environment variables:

- [ ] Visit https://keykingslocksmithsc.com
- [ ] Go to the booking form on homepage
- [ ] Start typing an address in the location field
- [ ] **Address autocomplete suggestions should appear** ✨
- [ ] Fill out the form and submit
- [ ] Check that you receive email notification (if Resend is set up)

---

## 🔐 Security Notes

### ⚠️ Important Security Information:

1. **PUBLIC_GOOGLE_MAPS_API_KEY** - This key is public (exposed in browser)
   - ✅ Restrict it in Google Cloud Console to your domain only
   - ✅ Add application restrictions: `keykingslocksmithsc.com`

2. **GOOGLE_RECAPTCHA_SECRET_KEY** - This is a secret key
   - ❌ Never expose in client-side code
   - ✅ Only used server-side

3. **RESEND_API_KEY** - This is a secret key
   - ❌ Never expose in client-side code
   - ✅ Only used server-side

4. **.env file** - Local development only
   - ❌ Never commit to Git (already in .gitignore)
   - ✅ Only for your local machine

---

## 🚨 If You Don't Have These Keys Yet

### Google reCAPTCHA (Recommended - prevents spam)
1. Go to: https://www.google.com/recaptcha/admin
2. Click **+** to create a new site
3. Choose **reCAPTCHA v3**
4. Add domain: `keykingslocksmithsc.com`
5. Copy the **Site Key** and **Secret Key**

### Resend API (Required for email notifications)
1. Go to: https://resend.com
2. Sign up for free account
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `re_`)
6. Add and verify your domain: `keykingslocksmithsc.com`

---

## 📱 Testing Locally First

Before deploying, test locally:

1. Make sure `.env` has all keys
2. Restart your dev server: `npm run dev`
3. Test address autocomplete on http://localhost:3000
4. If it works locally, it will work on Vercel (after adding env vars there)

---

## 🎯 Priority Order

If you don't have all keys yet, add them in this order:

### Must Have (Site Won't Work Without):
1. ✅ `PUBLIC_GOOGLE_MAPS_API_KEY` - Already added!
2. `RESEND_API_KEY` - For email notifications

### Important (Prevents Spam):
3. `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY`
4. `GOOGLE_RECAPTCHA_SECRET_KEY`

### Nice to Have:
5. Email configuration
6. Business information

---

## 🆘 Troubleshooting

### Address Autocomplete Not Working?
- Check Google Maps API key is added to Vercel
- Check Places API is enabled in Google Cloud Console
- Check API key restrictions allow your domain
- Check browser console for errors

### Forms Not Sending Email?
- Check Resend API key is added to Vercel
- Check FROM_EMAIL domain is verified in Resend
- Check email quota hasn't been exceeded

### reCAPTCHA Badge Not Showing?
- This is intentional - we use an inline notice instead
- Check `PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY` is set

---

**Need help?** See `API-KEYS-SETUP-GUIDE.md` for detailed instructions on getting each API key.
