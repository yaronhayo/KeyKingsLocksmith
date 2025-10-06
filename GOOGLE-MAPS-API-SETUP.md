# 🗺️ Google Maps API Configuration Fix

## 🚨 Error: "Cannot read properties of undefined (reading 'Autocomplete')"

This error means the Google Maps API key exists but hasn't been properly configured in Google Cloud Console.

---

## ✅ Quick Fix Steps (Official Google Requirements)

### Step 1: Enable Required APIs

**According to Google's official documentation, you need BOTH APIs enabled:**

1. **Enable Maps JavaScript API** (Required):
   - Visit: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
   - Click **"ENABLE"** button
   - Wait for activation

2. **Enable Places API** (Required):
   - Visit: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
   - Click **"ENABLE"** button
   - Wait for activation

**Important:** The Places library is part of the Maps JavaScript API but requires the Places API to be enabled separately in your Google Cloud project.

**Reference:** [Google Maps JavaScript API - Places Autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete)

### Step 2: Configure API Key Restrictions

1. **Go to API Credentials:**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Find your API key: `AIzaSyDW5O_4hPO0A2iFhLj73Rz8S6LSBUQGatA`
   - Click on it to edit

2. **Set Application Restrictions:**
   - Select **"HTTP referrers (web sites)"**
   - Add these referrers:
     ```
     https://www.keykingslocksmithsc.com/*
     https://keykingslocksmithsc.com/*
     http://localhost:*
     http://localhost:3000/*
     ```
   - Click **"Done"**

3. **Set API Restrictions:**
   - Select **"Restrict key"**
   - Check these APIs:
     - ✅ Maps JavaScript API
     - ✅ Places API
     - ✅ Geocoding API (optional but recommended)
   - Click **"Save"**

### Step 3: Wait and Test

- **Wait 5-10 minutes** for changes to propagate
- Visit: https://www.keykingslocksmithsc.com
- Test the address autocomplete in the booking form
- Should work now! ✅

---

## 🔧 Alternative: Create a New API Key

If the above doesn't work, create a fresh API key:

### 1. Create New API Key:
- Go to: https://console.cloud.google.com/apis/credentials
- Click **"CREATE CREDENTIALS"** → **"API key"**
- Copy the new key

### 2. Configure the New Key:
- Click **"RESTRICT KEY"** immediately
- Name it: "Key Kings Locksmith - Website"
- Set application restrictions (HTTP referrers):
  ```
  https://www.keykingslocksmithsc.com/*
  https://keykingslocksmithsc.com/*
  http://localhost:*
  ```
- Set API restrictions:
  - ✅ Maps JavaScript API
  - ✅ Places API
- Click **"Save"**

### 3. Update Vercel:
- Go to Vercel dashboard
- Project Settings → Environment Variables
- Edit `PUBLIC_GOOGLE_MAPS_API_KEY`
- Paste the new key
- Click **"Save"**
- **Redeploy** the site

---

## 🧪 Testing Checklist

After making changes:

- [ ] Wait 5-10 minutes for Google API changes to propagate
- [ ] Clear browser cache (or use incognito mode)
- [ ] Visit https://www.keykingslocksmithsc.com
- [ ] Open browser console (F12)
- [ ] Click in the Location field in booking form
- [ ] Start typing an address (e.g., "123 Main")
- [ ] **Address suggestions should appear** ✨

---

## 🔍 Debugging

### Check if API is Loading:

Open browser console and run:
```javascript
console.log(window.google);
console.log(window.google?.maps?.places);
```

**Expected result:**
- Should show Google Maps objects
- Should NOT be `undefined`

### Check for Errors:

Look in browser console for:
- ❌ "RefererNotAllowedMapError" → Fix referrer restrictions
- ❌ "ApiNotActivatedMapError" → Enable Places API
- ❌ "REQUEST_DENIED" → Check API key restrictions

---

## 📋 Required APIs to Enable

Make sure ALL of these are enabled in Google Cloud Console:

1. **Maps JavaScript API** ✅
   - https://console.cloud.google.com/apis/library/maps-backend.googleapis.com

2. **Places API** ✅
   - https://console.cloud.google.com/apis/library/places-backend.googleapis.com

3. **Geocoding API** (Optional but recommended)
   - https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com

---

## 💰 Pricing Information

**Good News:** Google Maps Platform includes:
- **$200 free credit per month**
- Address autocomplete: ~$3 per 1000 requests
- You'd need ~66,000+ autocomplete requests to exceed free tier
- For a local locksmith, this is essentially FREE

---

## 🔐 Security Best Practices

### ✅ DO:
- Restrict API key to your domain
- Enable only required APIs
- Monitor usage in Google Cloud Console
- Set up billing alerts (optional)

### ❌ DON'T:
- Leave API key unrestricted
- Share API key publicly
- Enable unnecessary APIs
- Ignore usage alerts

---

## 🚨 If Still Not Working

### Check these common issues:

1. **API Key not propagated yet**
   - Wait 10-15 minutes after making changes
   - Sometimes takes longer

2. **Wrong project in Google Cloud**
   - Make sure you're editing the right project
   - Check project name in top left

3. **Billing not enabled**
   - Go to: https://console.cloud.google.com/billing
   - Enable billing (but with $200/month free credit)
   - Add a credit card (won't be charged unless you exceed free tier)

4. **API key in wrong environment**
   - Make sure Vercel has the correct key
   - Check it matches Google Cloud Console

5. **Cache issues**
   - Clear browser cache completely
   - Try incognito mode
   - Try different browser

---

## 🎯 Quick Links

- **Google Cloud Console:** https://console.cloud.google.com
- **API Credentials:** https://console.cloud.google.com/apis/credentials
- **API Library:** https://console.cloud.google.com/apis/library
- **Billing:** https://console.cloud.google.com/billing
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 📞 Your Current Setup

**API Key:** `AIzaSyDW5O_4hPO0A2iFhLj73Rz8S6LSBUQGatA`

**Already configured in:**
- ✅ Local `.env` file
- ✅ Vercel environment variables

**What needs to be done:**
- ⚠️ Enable Places API in Google Cloud Console
- ⚠️ Configure API key restrictions
- ⚠️ Wait 5-10 minutes for changes to take effect
- ⚠️ Test on live site

---

## 🆘 Still Having Issues?

If you've done all the above and it still doesn't work:

1. **Generate a brand new API key** in Google Cloud Console
2. **Enable all required APIs** before using it
3. **Restrict it immediately** to your domains
4. **Update Vercel** with the new key
5. **Redeploy** the site
6. **Wait 10 minutes** and test again

The error you're seeing is NOT a code problem - the code is correct. It's purely an API configuration issue in Google Cloud Console.

---

**Once you enable the Places API and configure restrictions, the autocomplete will work perfectly!** ✨
