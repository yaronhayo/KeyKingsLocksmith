# Key Kings Locksmith - Astro Website

Professional Astro 5.0 website for Key Kings Locksmith, serving Anderson, SC and the Upstate South Carolina region.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your actual API keys and credentials.

3. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 📁 Project Structure

```
/
├── public/              # Static assets (images, fonts, favicon)
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── layout/      # Header, Footer, etc.
│   │   ├── sections/    # Hero, Services, etc.
│   │   ├── ui/          # Buttons, Cards, etc.
│   │   └── forms/       # Contact, Booking forms
│   ├── data/            # Company configuration
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities and helpers
│   ├── pages/           # File-based routing
│   ├── styles/          # Global styles
│   └── types/           # TypeScript definitions
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS configuration
└── package.json         # Dependencies
```

## 🔧 Configuration

### Company Information
Edit `src/data/company.ts` to customize:
- Business name and contact details
- Service areas
- Business hours
- Services offered
- SEO settings
- Brand colors and fonts

### Environment Variables
Required variables in `.env`:
- `RESEND_API_KEY` - For email functionality
- `GOOGLE_MAPS_API_KEY` - For location features
- `GOOGLE_RECAPTCHA_SITE_KEY` - For form protection

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type-check TypeScript
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## 🎨 Customization

### Brand Colors
Update in `src/data/company.ts`:
```typescript
colors: {
  primary: "#DC143C",    // Main brand color
  secondary: "#FF4500",  // Accent color
  accent: "#1C1C1C",     // Dark accent
}
```

### Add New Services
1. Create content in `src/content/services/`
2. Add service details to `src/data/company.ts`
3. Create service page template if needed

### Add Service Areas
1. Add cities to `serviceAreas` in `src/data/company.ts`
2. Create area pages in `src/content/service-areas/`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy on Vercel**
- Connect your GitHub repository at [vercel.com](https://vercel.com)
- Configure environment variables
- Deploy!

### Other Platforms
- **Netlify**: `npm run deploy:netlify`
- **Cloudflare Pages**: Connect via dashboard
- **AWS Amplify**: Connect repository

## 📊 Performance

This template is optimized for:
- ✅ 100/100 Lighthouse scores
- ✅ Core Web Vitals
- ✅ SEO best practices
- ✅ Accessibility standards

## 🔒 Security Features

- reCAPTCHA v3 integration
- Rate limiting on API endpoints
- Secure headers configuration
- XSS protection
- CSRF protection

## 📧 Contact Form Setup

The contact forms use Resend for email delivery. To set up:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env`: `RESEND_API_KEY=re_xxxx`
4. Verify your domain for production use

## 🆘 Support

For issues or questions:
- Check the [Astro documentation](https://docs.astro.build)
- Review the template documentation in `/docs`
- Contact your developer

## 📄 License

This project is configured for Key Kings Locksmith.
