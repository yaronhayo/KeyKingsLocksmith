# Address Autocomplete - Quick Fix Guide

## Current Issue

Address autocomplete is **NOT working** because the Google Maps API key in `.env` is still a placeholder.

## Error You're Seeing

```
Cannot read properties of undefined (reading 'Autocomplete')
```

This error means the Google Maps API script either:
1. Hasn't loaded yet (timing issue)
2. Failed to load due to invalid/missing API key
3. Failed to load due to API restrictions

## Solution - Step by Step

### Step 1: Get Your Google Maps API Key

If you already have one, skip to Step 2.

1. Go to: https://console.cloud.google.com/
2. Select your project (or create a new one)
3. Go to **APIs & Services** → **Credentials**
4. Look for an existing API key OR click **Create Credentials** → **API Key**
5. Copy the API key

### Step 2: Enable Required APIs

Your API key MUST have these APIs enabled:
1. **Places API** - For address autocomplete
2. **Maps JavaScript API** - For the maps library

To enable them:
1. Go to **APIs & Services** → **Library**
2. Search for "Places API" → Click **Enable**
3. Search for "Maps JavaScript API" → Click **Enable**

### Step 3: Add API Key to .env

1. Open the `.env` file in the project root
2. Find this line:
   ```
   PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
3. Replace `your_google_maps_api_key_here` with your actual API key:
   ```
   PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAbc123YourActualKeyHere
   ```

### Step 4: Restart the Development Server

**IMPORTANT:** After changing `.env`, you MUST restart the server!

```bash
# Press Ctrl+C to stop the current server
# Then restart:
npm run dev
```

### Step 5: Test Address Autocomplete

1. Open http://localhost:3000 in your browser
2. Scroll to the booking form
3. Click on the "Street Address" field
4. Start typing an address (e.g., "123 Main")
5. You should see Google autocomplete suggestions appear

## Troubleshooting

### Still Not Working? Check These:

#### 1. Check Browser Console for Errors
Open browser DevTools (F12) → Console tab

**Look for these messages:**

✅ **Good (API key working):**
- No errors about Google Maps
- Address field shows suggestions when typing

❌ **Bad (API key issues):**
- "Google Maps API key not found or not configured"
- "RefererNotAllowedMapError" → Your API key has domain restrictions
- "ApiNotActivatedMapError" → Places API or Maps JavaScript API not enabled

#### 2. API Key Restrictions

If your API key has domain restrictions:
1. Go to Google Cloud Console → **Credentials**
2. Click on your API key
3. Under **Application restrictions** → **HTTP referrers**
4. Add these domains:
   - `http://localhost:3000/*`
   - `http://localhost:4321/*`
   - `http://127.0.0.1:3000/*`
   - `http://127.0.0.1:4321/*`

#### 3. Verify API Key in Browser

Open browser console and type:
```javascript
console.log(import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY)
```

If it shows:
- `undefined` → Server wasn't restarted after changing .env
- `"your_google_maps_api_key_here"` → API key not updated in .env
- `"AIzaSy..."` → API key is loaded correctly ✓

## Quick Test Without Restarting

Want to test if your API key works WITHOUT restarting the server?

1. Open http://localhost:3000
2. Open browser console (F12)
3. Paste this code:

```javascript
// Test Google Maps API Key
const testApiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual key
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${testApiKey}&libraries=places&callback=testGoogleMaps`;
window.testGoogleMaps = () => {
  console.log('✅ Google Maps API loaded successfully!');
  console.log('✅ Places library:', typeof google.maps.places.Autocomplete);
  if (typeof google.maps.places.Autocomplete !== 'undefined') {
    console.log('✅ Autocomplete is available! Your API key works!');
  }
};
document.head.appendChild(script);
```

If you see "✅ Autocomplete is available!" → Your API key works!

## Still Having Issues?

### Check API Usage/Billing

1. Go to Google Cloud Console
2. Click **Billing** in the left sidebar
3. Make sure:
   - Billing is enabled for your project
   - You haven't exceeded your free tier limits

Google Maps Platform free tier includes:
- $200 credit per month
- ~28,000 autocomplete requests

### Contact for Help

If you've tried everything above and it still doesn't work:

1. Check the browser console for the EXACT error message
2. Check the terminal (where npm run dev is running) for errors
3. Take a screenshot of any error messages

## Summary Checklist

- [ ] Got valid Google Maps API key from Google Cloud Console
- [ ] Enabled "Places API" in Google Cloud Console
- [ ] Enabled "Maps JavaScript API" in Google Cloud Console
- [ ] Added API key to `.env` file as `PUBLIC_GOOGLE_MAPS_API_KEY=`
- [ ] Restarted development server (`Ctrl+C` then `npm run dev`)
- [ ] Opened http://localhost:3000 in browser
- [ ] Clicked on address field in booking form
- [ ] Started typing an address
- [ ] Saw Google autocomplete suggestions

If all checkboxes are checked, address autocomplete should work! ✅
