# Key Kings Locksmith - Complete Setup Guide

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your actual API keys

# 3. Start development server
npm run dev

# Visit http://localhost:3000
```

## 📋 Detailed Setup Instructions

### 1. Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- Git (for version control)

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure the following:

#### Required Variables:
```env
# Email Service (REQUIRED for forms to work)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@keykingslocksmithsc.com
TO_EMAIL=keykingslocksmithsc@gmail.com

# Site Configuration
SITE_URL=https://keykingslocksmithsc.com
```

#### Recommended Variables:
```env
# Google Services (for maps, recaptcha, analytics)
GOOGLE_MAPS_API_KEY=your_key_here
GOOGLE_RECAPTCHA_SITE_KEY=your_key_here
GOOGLE_RECAPTCHA_SECRET_KEY=your_key_here
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 3. API Keys Setup

#### Resend (Email Service) - REQUIRED
1. Sign up at https://resend.com
2. Verify your sending domain
3. Generate API key
4. Add to .env as `RESEND_API_KEY`

#### Google Maps API - OPTIONAL
1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials (API key)
5. Restrict key to your domain
6. Add to .env as `GOOGLE_MAPS_API_KEY`

#### Google reCAPTCHA - RECOMMENDED
1. Go to https://www.google.com/recaptcha/admin
2. Register a new site (v3)
3. Add your domain
4. Get site key and secret key
5. Add both keys to .env

#### Google Analytics - RECOMMENDED
1. Go to https://analytics.google.com
2. Create a new GA4 property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to .env as `GOOGLE_ANALYTICS_ID`

### 4. Customize Company Information

Edit `src/data/company.ts` to update:
- Business name, phone, email
- Service areas
- Business hours
- Credentials and certifications
- Brand colors and fonts
- SEO settings

### 5. Add Your Branding

#### Logo Files:
Place in `public/images/brand/`:
- `logo-text.svg` - Full logo with text
- `logo-icon.svg` - Icon only
- `apple-touch-icon.png` - 180x180px icon

#### Service Images:
Place in `public/images/services/`:
- car-lockout.jpg
- house-lockout.jpg
- lock-rekey.jpg
- commercial-locksmith.jpg
- emergency-locksmith.jpg
- key-replacement.jpg

#### Hero Image:
Place in `public/images/hero/`:
- locksmith-service-hero.jpg (1920x1080 recommended)

#### Certification Badges:
Place in `public/images/certifications/`:
- aloa-logo.svg
- chamber-logo.svg
- scla-logo.svg

### 6. Content Customization

#### Services:
Edit files in `src/content/services/`:
- Customize service descriptions
- Update pricing information
- Add/remove services as needed

#### Service Areas:
Edit files in `src/content/service-areas/`:
- Update coverage areas
- Modify response times
- Add local information

#### Reviews:
Edit files in `src/content/reviews/`:
- Replace with actual customer reviews
- Add verified review platforms (Google, Yelp, etc.)

#### FAQ:
Edit files in `src/content/faq/`:
- Add common questions from customers
- Organize by category

### 7. Build and Deploy

#### Development:
```bash
npm run dev
```

#### Production Build:
```bash
npm run build
npm run preview
```

#### Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com
```

## 🔧 Configuration Files

### `astro.config.mjs`
- Site configuration
- Integrations (React, Tailwind, Sitemap)
- Vercel adapter settings

### `tailwind.config.mjs`
- Custom theme colors from company config
- Extended utilities
- Plugin configuration

### `tsconfig.json`
- TypeScript configuration
- Path aliases
- Type checking settings

### `vercel.json`
- Security headers
- Cache configuration
- Redirects and rewrites

## 📁 Project Structure

```
/
├── public/                 # Static assets
│   ├── images/            # All images organized by type
│   ├── robots.txt         # SEO robots file
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI components (Button, Card, etc.)
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Header, Footer, etc.
│   │   ├── sections/     # Page sections (Hero, Services)
│   │   ├── seo/          # SEO components
│   │   └── analytics/    # Analytics components
│   ├── content/          # Content collections
│   │   ├── services/     # Service pages
│   │   ├── service-areas/ # Location pages
│   │   ├── blog/         # Blog posts
│   │   ├── reviews/      # Customer reviews
│   │   ├── faq/          # FAQ items
│   │   └── legal/        # Legal pages
│   ├── data/             # Configuration data
│   │   └── company.ts    # Main company config
│   ├── layouts/          # Page layouts
│   │   └── BaseLayout.astro # Main layout
│   ├── lib/              # Utilities and services
│   │   ├── api/          # API client
│   │   ├── email/        # Email service
│   │   └── utils/        # Helper functions
│   ├── pages/            # File-based routing
│   │   ├── api/          # API endpoints
│   │   └── index.astro   # Homepage
│   ├── styles/           # Global styles
│   │   └── globals.css   # Main stylesheet
│   └── types/            # TypeScript types
│       └── index.ts      # Type definitions
├── scripts/              # Build scripts
│   └── init-template.js  # Template initialization
├── .env.example          # Environment variables template
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies
├── tailwind.config.mjs   # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vercel.json          # Vercel deployment config
```

## 🎨 Customization Guide

### Colors:
Edit `src/data/company.ts` → `brand.colors`:
```typescript
colors: {
  primary: "#DC143C",    // Main brand color
  secondary: "#FF4500",  // Accent color
  accent: "#1C1C1C",     // Dark accent
}
```

### Fonts:
Edit `src/data/company.ts` → `brand.fonts`:
```typescript
fonts: {
  primary: "'Montserrat', sans-serif",
  secondary: "'Inter', sans-serif",
}
```

### Services:
Add/edit service files in `src/content/services/`:
```markdown
---
title: "Your Service"
description: "Service description"
category: residential
featured: true
---

Your service content here...
```

## 🧪 Testing

### Type Checking:
```bash
npm run astro check
```

### Build Test:
```bash
npm run build
```

### Preview Production:
```bash
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended):
1. Push code to GitHub
2. Import project at vercel.com
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms:
- **Netlify**: Works with standard Astro build
- **Cloudflare Pages**: Compatible with adapter
- **AWS Amplify**: Connect GitHub repo

## 📊 Performance

This template is optimized for:
- ✅ 100/100 Lighthouse scores
- ✅ Core Web Vitals compliance
- ✅ Fast page load times
- ✅ SEO best practices
- ✅ Accessibility standards

## 🔒 Security

- Environment variables for sensitive data
- API rate limiting
- reCAPTCHA spam protection
- Secure headers (vercel.json)
- XSS protection
- CSRF protection

## 📞 Support

For issues or questions:
- Review documentation in `/docs`
- Check ENHANCED-TEMPLATE-GUIDE.md
- Check CONTENT-GUIDELINES.md
- Review Astro docs: https://docs.astro.build

## 📝 License

Configured for Key Kings Locksmith.

---

**Ready to launch!** 🎉

Follow the steps above, customize your content, add your API keys, and you're good to go!
