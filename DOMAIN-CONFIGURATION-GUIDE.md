# Domain Configuration Guide for keykingslocksmithsc.com

This guide provides step-by-step instructions for configuring the custom domain `keykingslocksmithsc.com` with Vercel.

## Prerequisites

- [ ] Domain name `keykingslocksmithsc.com` is registered
- [ ] You have access to the domain registrar account
- [ ] Vercel project is created and ready for deployment

## Overview

You'll be configuring:
- **Primary domain**: `keykingslocksmithsc.com` (root domain)
- **WWW subdomain**: `www.keykingslocksmithsc.com` (optional but recommended)
- **SSL/TLS certificate**: Automatically provisioned by Vercel (Let's Encrypt)

## Step-by-Step Instructions

### Step 1: Add Domain to Vercel

1. Log in to your Vercel account: https://vercel.com
2. Navigate to your Key Kings Locksmith project
3. Click on **Settings** in the top navigation
4. Click on **Domains** in the left sidebar
5. In the "Add Domain" field, enter: `keykingslocksmithsc.com`
6. Click **Add**

Vercel will check if the domain is available and provide configuration instructions.

### Step 2: Add WWW Subdomain (Recommended)

After adding the root domain:

1. In the same Domains section, click **Add** again
2. Enter: `www.keykingslocksmithsc.com`
3. Click **Add**

**Why add www?**
- Provides flexibility for users who type "www"
- Vercel will automatically redirect www to non-www (or vice versa)
- Better for SEO and user experience

### Step 3: Choose DNS Configuration Method

Vercel offers two methods for DNS configuration:

#### Method A: Vercel Nameservers (Recommended) ⭐

**Pros:**
- Simplest setup
- Automatic SSL certificate management
- Fastest DNS propagation
- Vercel handles all DNS records

**Cons:**
- Transfers DNS management to Vercel
- May need to migrate other DNS records (email, etc.)

**When to use:**
- If you don't have other services using this domain
- If you want the simplest setup
- If you're comfortable with Vercel managing DNS

#### Method B: Custom DNS Records (A Record + CNAME)

**Pros:**
- Keep your current DNS provider
- Maintain control over all DNS records
- Good if you have email or other services on the domain

**Cons:**
- Slightly more complex setup
- Need to manually configure records
- May take longer for DNS propagation

**When to use:**
- If you have email hosted on this domain
- If you have other services (subdomains) on this domain
- If you prefer to keep DNS with your registrar

---

## Method A: Using Vercel Nameservers (Recommended)

### Step 1: Get Vercel Nameservers

After adding your domain in Vercel:

1. Vercel will display nameserver addresses, typically:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
2. Copy these nameserver addresses

### Step 2: Update Nameservers at Your Registrar

The exact steps vary by registrar. Here are instructions for common registrars:

#### GoDaddy
1. Log in to GoDaddy: https://account.godaddy.com
2. Go to **My Products** → **Domains**
3. Click on `keykingslocksmithsc.com`
4. Scroll to **Additional Settings** → **Manage DNS**
5. Scroll to **Nameservers** section
6. Click **Change**
7. Select **Custom**
8. Enter Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
9. Click **Save**

#### Namecheap
1. Log in to Namecheap: https://www.namecheap.com
2. Go to **Domain List**
3. Click **Manage** next to `keykingslocksmithsc.com`
4. Find **Nameservers** section
5. Select **Custom DNS**
6. Enter Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
7. Click the green checkmark to save

#### Google Domains
1. Log in to Google Domains: https://domains.google.com
2. Click on `keykingslocksmithsc.com`
3. Click **DNS** in the left menu
4. Scroll to **Name servers**
5. Click **Use custom name servers**
6. Enter Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
7. Click **Save**

#### Other Registrars
Look for:
- "DNS Settings" or "DNS Management"
- "Nameservers" or "Name Servers"
- Option to use "Custom Nameservers"
- Enter Vercel's nameservers provided in your dashboard

### Step 3: Wait for DNS Propagation

1. DNS changes can take **up to 48 hours** to propagate globally
2. Usually completes within **1-4 hours**
3. Check propagation status at: https://dnschecker.org
   - Enter: `keykingslocksmithsc.com`
   - Select: NS (Nameserver) record type
   - Look for Vercel's nameservers appearing globally

### Step 4: Verify in Vercel

1. Return to Vercel → **Settings** → **Domains**
2. Wait for the domain status to change from "Pending" to "Active"
3. Vercel will automatically provision an SSL certificate
4. Once active, you'll see a green checkmark ✓

---

## Method B: Using Custom DNS Records

If you prefer to keep your current DNS provider:

### Step 1: Add A Record for Root Domain

1. Log in to your DNS provider (domain registrar)
2. Go to DNS Management or DNS Settings
3. Add a new **A Record**:
   - **Type**: A
   - **Name**: `@` (or leave blank, or enter `keykingslocksmithsc.com`)
   - **Value/Points to**: `76.76.21.21` (Vercel's IP address)
   - **TTL**: `3600` (or 1 hour, or automatic)
4. Save the record

### Step 2: Add CNAME Record for WWW Subdomain

1. In the same DNS Management area
2. Add a new **CNAME Record**:
   - **Type**: CNAME
   - **Name**: `www`
   - **Value/Points to**: `cname.vercel-dns.com`
   - **TTL**: `3600` (or 1 hour, or automatic)
3. Save the record

### Step 3: Verify DNS Records

Use a DNS lookup tool to verify your records are set correctly:

```bash
# Check A record (root domain)
dig keykingslocksmithsc.com A

# Expected result: 76.76.21.21

# Check CNAME record (www subdomain)
dig www.keykingslocksmithsc.com CNAME

# Expected result: cname.vercel-dns.com
```

Or use online tools:
- https://dnschecker.org
- https://mxtoolbox.com/SuperTool.aspx

### Step 4: Wait for DNS Propagation

1. DNS changes typically take **1-4 hours**
2. Can take up to **48 hours** in rare cases
3. Check status at https://dnschecker.org

### Step 5: Verify in Vercel

1. Return to Vercel → **Settings** → **Domains**
2. Vercel will detect the DNS records
3. SSL certificate will be automatically provisioned
4. Domain status will change to "Active" with green checkmark ✓

---

## SSL Certificate Configuration

Vercel automatically provisions and manages SSL certificates using Let's Encrypt.

### What Happens Automatically

1. **Certificate Provisioning**: Vercel requests an SSL certificate from Let's Encrypt
2. **Domain Validation**: Vercel validates domain ownership via DNS
3. **Certificate Installation**: Certificate is installed and activated
4. **Auto-Renewal**: Certificates are automatically renewed before expiration

### Verify SSL Certificate

Once the domain is active:

1. Visit: `https://keykingslocksmithsc.com`
2. Check for the padlock icon 🔒 in the browser address bar
3. Click the padlock to view certificate details
4. Verify:
   - Certificate is issued by "Let's Encrypt"
   - Certificate is valid (not expired)
   - Domain name matches

### Test SSL Configuration

Use SSL testing tools:

1. **SSL Labs**: https://www.ssllabs.com/ssltest/
   - Enter: `keykingslocksmithsc.com`
   - Target grade: A or A+

2. **SSL Checker**: https://www.sslshopper.com/ssl-checker.html
   - Verify certificate is properly installed
   - Check for any warnings

---

## Domain Redirect Configuration

### Configure WWW Redirect

Decide which version should be primary:

**Option 1: Non-WWW as Primary (Recommended)**
- Primary: `keykingslocksmithsc.com`
- Redirect: `www.keykingslocksmithsc.com` → `keykingslocksmithsc.com`

**Option 2: WWW as Primary**
- Primary: `www.keykingslocksmithsc.com`
- Redirect: `keykingslocksmithsc.com` → `www.keykingslocksmithsc.com`

### Set Primary Domain in Vercel

1. Go to **Settings** → **Domains**
2. Find the domain you want as primary
3. Click the three dots menu (⋯)
4. Select **Set as Primary Domain**
5. Vercel will automatically redirect the other version

**Recommendation**: Use non-WWW (`keykingslocksmithsc.com`) as primary for cleaner URLs.

---

## Update Environment Variables

After domain is configured and active:

### Update SITE_URL for Production

1. Go to **Settings** → **Environment Variables**
2. Find `SITE_URL` variable
3. Update the value for **Production** environment:
   - Old: `https://your-preview-url.vercel.app`
   - New: `https://keykingslocksmithsc.com`
4. Save changes
5. **Redeploy** the site for changes to take effect

### Update Other Domain-Specific Variables

If you have any other variables that reference the domain:

- `CORS_ORIGIN`: Update to `https://keykingslocksmithsc.com`
- Any callback URLs or webhook URLs
- Analytics configuration (if domain-specific)

---

## Verification Checklist

After completing domain configuration, verify:

### DNS Verification
- [ ] A record points to `76.76.21.21` (if using custom DNS)
- [ ] CNAME record points to `cname.vercel-dns.com` (if using custom DNS)
- [ ] DNS propagation is complete (check at dnschecker.org)
- [ ] Domain shows as "Active" in Vercel dashboard

### SSL Verification
- [ ] HTTPS works: `https://keykingslocksmithsc.com`
- [ ] Padlock icon appears in browser
- [ ] Certificate is valid and not expired
- [ ] No SSL warnings or errors
- [ ] SSL Labs test shows A or A+ grade

### Redirect Verification
- [ ] WWW redirects to non-WWW (or vice versa)
- [ ] HTTP redirects to HTTPS
- [ ] Redirect is 301 (permanent) not 302 (temporary)
- [ ] No redirect loops

### Functionality Verification
- [ ] Homepage loads correctly
- [ ] All pages are accessible
- [ ] Forms submit successfully
- [ ] Images and assets load
- [ ] No mixed content warnings (HTTP resources on HTTPS page)

### SEO Verification
- [ ] Canonical URLs use the primary domain
- [ ] Sitemap is accessible: `https://keykingslocksmithsc.com/sitemap-index.xml`
- [ ] Robots.txt is accessible: `https://keykingslocksmithsc.com/robots.txt`
- [ ] Meta tags reference correct domain

---

## Troubleshooting Common Issues

### Issue: Domain Shows "Pending" in Vercel

**Possible Causes:**
- DNS records not configured correctly
- DNS propagation not complete
- Nameservers not updated at registrar

**Solutions:**
1. Verify DNS records are correct
2. Check DNS propagation at dnschecker.org
3. Wait longer (up to 48 hours)
4. Clear your local DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### Issue: SSL Certificate Not Provisioning

**Possible Causes:**
- DNS not pointing to Vercel
- Domain validation failed
- CAA records blocking Let's Encrypt

**Solutions:**
1. Verify DNS is correctly configured
2. Check for CAA records that might block Let's Encrypt:
   ```bash
   dig keykingslocksmithsc.com CAA
   ```
3. If CAA records exist, add Let's Encrypt:
   ```
   0 issue "letsencrypt.org"
   ```
4. Remove and re-add domain in Vercel
5. Contact Vercel support if issue persists

### Issue: "Too Many Redirects" Error

**Possible Causes:**
- Redirect loop between www and non-www
- Conflicting redirect rules
- CDN or proxy configuration issue

**Solutions:**
1. Check which domain is set as primary in Vercel
2. Verify only one redirect rule exists
3. Clear browser cache and cookies
4. Test in incognito/private browsing mode
5. Check for conflicting rules in vercel.json

### Issue: Mixed Content Warnings

**Possible Causes:**
- HTTP resources loaded on HTTPS page
- Hardcoded HTTP URLs in code
- External resources not using HTTPS

**Solutions:**
1. Check browser console for specific resources
2. Update all URLs to use HTTPS or protocol-relative URLs
3. Ensure all external resources support HTTPS
4. Update environment variables to use HTTPS

### Issue: Domain Works But WWW Doesn't (or vice versa)

**Possible Causes:**
- Only one domain added to Vercel
- DNS record missing for www subdomain
- Redirect not configured

**Solutions:**
1. Add both domains in Vercel (root and www)
2. Verify CNAME record exists for www subdomain
3. Set one as primary domain in Vercel
4. Test both URLs after DNS propagation

---

## DNS Propagation Timeline

Understanding DNS propagation:

### Typical Timeline
- **Local ISP**: 1-4 hours
- **Regional**: 4-12 hours
- **Global**: 12-48 hours

### Factors Affecting Speed
- TTL (Time To Live) settings
- DNS provider infrastructure
- Geographic location
- ISP caching policies

### Checking Propagation Status

Use these tools to monitor:

1. **DNS Checker**: https://dnschecker.org
   - Shows propagation across multiple global locations
   - Check both A and CNAME records

2. **What's My DNS**: https://www.whatsmydns.net
   - Alternative DNS propagation checker
   - Visual map of propagation

3. **Command Line**:
   ```bash
   # Check from your location
   nslookup keykingslocksmithsc.com
   
   # Check specific DNS server (Google DNS)
   nslookup keykingslocksmithsc.com 8.8.8.8
   ```

---

## Post-Configuration Tasks

After domain is fully configured and active:

### 1. Update Google Services

If using Google services, update domain references:

- **Google Search Console**: Add new property for keykingslocksmithsc.com
- **Google Analytics**: Update property settings
- **Google My Business**: Update website URL
- **Google Ads**: Update destination URLs

### 2. Update Social Media

Update website links on:
- Facebook business page
- Instagram profile
- TikTok profile
- Twitter/X profile
- YouTube channel

### 3. Update Business Listings

Update domain on:
- Yelp
- Yellow Pages
- Local directories
- Industry-specific listings

### 4. Update Email Signatures

If team members have email signatures with website link:
- Update to new domain
- Ensure HTTPS is used

### 5. Monitor for Issues

For the first week after domain configuration:
- Check analytics for traffic patterns
- Monitor error logs in Vercel
- Test forms and functionality daily
- Check SSL certificate status

---

## Security Best Practices

### Enable Security Headers

Already configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Additional Security Measures

1. **HSTS (HTTP Strict Transport Security)**
   - Automatically enabled by Vercel
   - Forces HTTPS for all connections

2. **CAA Records** (Optional but recommended)
   - Specifies which Certificate Authorities can issue certificates
   - Add to DNS:
     ```
     keykingslocksmithsc.com. CAA 0 issue "letsencrypt.org"
     ```

3. **DNSSEC** (Optional)
   - Adds cryptographic signatures to DNS records
   - Check if your registrar supports DNSSEC
   - Enable in registrar settings if available

---

## Maintenance and Monitoring

### Regular Checks (Monthly)

- [ ] Verify SSL certificate is valid and not expiring soon
- [ ] Check domain registration expiration date
- [ ] Test HTTPS and redirects
- [ ] Monitor DNS record integrity
- [ ] Review Vercel deployment logs

### Annual Tasks

- [ ] Renew domain registration (set auto-renew if possible)
- [ ] Review and update DNS records
- [ ] Audit security headers and SSL configuration
- [ ] Test disaster recovery procedures

---

## Support Resources

### Vercel Documentation
- Custom Domains: https://vercel.com/docs/custom-domains
- DNS Configuration: https://vercel.com/docs/custom-domains#dns-configuration
- SSL Certificates: https://vercel.com/docs/custom-domains#ssl

### DNS Tools
- DNS Checker: https://dnschecker.org
- DNS Lookup: https://mxtoolbox.com
- SSL Test: https://www.ssllabs.com/ssltest/

### Getting Help
- Vercel Support: https://vercel.com/support
- Vercel Community: https://github.com/vercel/vercel/discussions
- Domain Registrar Support: Contact your registrar

---

## Completion Checklist

Before marking task 30.3 as complete:

- [ ] Domain added to Vercel
- [ ] WWW subdomain added to Vercel
- [ ] DNS configured (nameservers or A/CNAME records)
- [ ] DNS propagation complete
- [ ] SSL certificate active and valid
- [ ] HTTPS working correctly
- [ ] Redirects configured (www → non-www or vice versa)
- [ ] HTTP → HTTPS redirect working
- [ ] SITE_URL environment variable updated
- [ ] Domain shows as "Active" in Vercel
- [ ] All verification checks passed
- [ ] Documentation updated with domain info

Once all items are checked, the domain configuration is complete! ✅
