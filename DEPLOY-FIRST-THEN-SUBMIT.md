# ⚠️ IMPORTANT: Deploy Before Submitting to Search Engines

## The Issue

You're getting "couldn't fetch" errors when trying to submit the sitemap to Google Search Console because:

**The site hasn't been deployed yet!**

Sitemaps are generated during the build process and only exist on the live production site, not in development mode.

---

## ✅ Correct Order of Operations

### Step 1: Deploy to Vercel (Do This First!)

1. **Commit all changes to Git:**
   ```bash
   git add .
   git commit -m "Add sitemap configuration and SEO optimizations"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Vercel will automatically build and deploy
   - **OR** if already connected, just push to GitHub and Vercel auto-deploys

3. **Wait for deployment to complete** (usually 2-3 minutes)

4. **Verify your site is live:**
   - Visit: https://keykingslocksmithsc.com
   - Check sitemap: https://keykingslocksmithsc.com/sitemap.xml
   - Check robots.txt: https://keykingslocksmithsc.com/robots.txt

### Step 2: Add Environment Variables to Vercel

Before the site works fully, add your API keys to Vercel:

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   ```
   PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_google_maps_key
   PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   GOOGLE_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   RESEND_API_KEY=your_resend_api_key
   TO_EMAIL=keykingslocksmithsc@gmail.com
   ```
4. Click **Save**
5. Redeploy the site (Vercel → Deployments → Redeploy)

### Step 3: THEN Submit to Search Engines

**Only after the site is live and deployed**, submit to search engines:

1. **Google Search Console:**
   - URL: https://search.google.com/search-console
   - Submit sitemap: `https://keykingslocksmithsc.com/sitemap.xml`

2. **Bing Webmaster Tools:**
   - URL: https://www.bing.com/webmasters
   - Submit sitemap: `https://keykingslocksmithsc.com/sitemap.xml`

3. **Google Business Profile:**
   - URL: https://www.google.com/business/
   - Complete your business listing

---

## 🔍 Why This Happens

- **Development mode** (`npm run dev`): Site runs locally, no sitemap generated
- **Production build**: Astro generates sitemap during `astro build`
- **Vercel deployment**: Runs build automatically and serves the sitemap

The sitemap **only exists** on your deployed production site, not in local development.

---

## 📋 Quick Deployment Checklist

- [ ] All changes committed to Git
- [ ] Pushed to GitHub (main branch)
- [ ] Vercel deployment triggered
- [ ] Deployment successful (check Vercel dashboard)
- [ ] Site accessible at https://keykingslocksmithsc.com
- [ ] Sitemap accessible at https://keykingslocksmithsc.com/sitemap.xml
- [ ] Environment variables added to Vercel
- [ ] Site redeployed after adding env vars
- [ ] Forms tested and working
- [ ] THEN submit to Google Search Console
- [ ] THEN submit to Bing Webmaster Tools

---

## 🚨 Common Mistakes

❌ **Don't submit to search engines before deploying**
✅ Deploy first, verify sitemap exists, then submit

❌ **Don't try to submit localhost URLs**
✅ Only submit the live production domain

❌ **Don't forget environment variables**
✅ Add API keys to Vercel before testing forms

---

## 🎯 Next Steps

1. **Right now**: Deploy to Vercel
2. **After deployment**: Verify sitemap exists at https://keykingslocksmithsc.com/sitemap.xml
3. **Then**: Submit to Google Search Console and Bing
4. **Finally**: Follow the rest of `SEARCH-ENGINE-SUBMISSION-GUIDE.md`

---

## Need Help with Deployment?

See `DEPLOYMENT-GUIDE.md` (if exists) or follow these resources:
- Vercel Deployment Docs: https://vercel.com/docs
- Astro Deployment Guide: https://docs.astro.build/en/guides/deploy/vercel/
- Connect GitHub to Vercel: https://vercel.com/docs/concepts/git

---

**Remember: Deploy → Verify → Submit** 🚀
