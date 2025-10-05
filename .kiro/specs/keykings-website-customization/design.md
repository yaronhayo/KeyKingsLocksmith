# Design Document

## Overview

This design document outlines the technical approach for customizing the Key Kings Locksmith website using the existing Astro 5.0 locksmith template. The design prioritizes minimal code changes by leveraging existing template components with style modifications, ensuring maintainability while creating a unique brand identity.

The approach focuses on:
- Configuration-driven customization through `src/data/company.ts`
- Style modifications using Tailwind CSS utility classes and CSS variables
- Content updates to remove emojis, pricing, and ETA promises
- Component reuse with prop-based customization
- Static site generation for optimal performance

## Architecture

### Technology Stack

- **Framework**: Astro 5.0 (Static Site Generation)
- **Styling**: Tailwind CSS 3.4+ with custom configuration
- **Type Safety**: TypeScript 5.6+
- **Content Management**: Astro Content Collections
- **Deployment**: Vercel with optimized static output
- **Forms**: Resend API for email delivery
- **Analytics**: Vercel Analytics + Speed Insights
- **Maps**: Google Maps API for service area visualization

### Site Structure

```
Key Kings Website
├── Home (/)
├── Services (/services) - Main services overview
│   ├── Emergency Locksmith (/services/emergency)
│   │   Lists: Car Lockout, House Lockout, Business Lockout, Storage Unit Lockout
│   ├── Residential Locksmith (/services/residential)
│   │   Lists: Lock Replacement, Lock Rekey, Lock Repair, Gate Locks
│   ├── Commercial Locksmith (/services/commercial)
│   │   Lists: Lock Replacement, Master Key Systems, Access Control, Emergency Exit Devices
│   └── Automotive Locksmith (/services/automotive)
│       Lists: Car Key Replacement, Key Fob Programming, Car Key Duplicate, Ignition Repair
├── Service Areas (/service-areas) - Single page with all areas (no individual area pages)
├── FAQ (/faq)
├── Reviews (/reviews)
├── About (/about)
├── Contact (/contact)
├── Book Service (/book-service)
├── Thank You (/thank-you)
└── Legal
    ├── Terms and Conditions
    ├── Privacy Policy
    └── Accessibility Policy
```

## Components and Interfaces

### Existing Template Components (To Be Reused)

#### Layout Components
- `src/components/layout/Header.astro` - Navigation header with sticky behavior
- `src/components/layout/Footer.astro` - Site footer with links and contact info

#### Section Components
- `src/components/sections/Hero.astro` - Homepage hero section
- `src/components/sections/ServicesGrid.astro` - Service showcase grid
- `src/components/sections/FAQ.astro` - Accordion-style FAQ section
- `src/components/sections/Reviews.astro` - Customer testimonials carousel

#### UI Components
- `src/components/ui/Button.astro` - Reusable button with variants
- `src/components/ui/Card.astro` - Content card component
- `src/components/ui/Modal.astro` - Modal dialog system
- `src/components/ui/Toast.astro` - Notification toasts
- `src/components/ui/TrustBadge.astro` - Credential display badges
- `src/components/ui/LoadingStates.astro` - Skeleton loaders

#### Form Components
- `src/components/forms/ContactForm.astro` - General contact form
- `src/components/forms/BookingForm.astro` - Service booking form
- `src/components/forms/NewsletterForm.astro` - Email signup form

#### SEO Components
- `src/components/seo/MetaTags.astro` - Meta tag management
- `src/components/seo/SchemaMarkup.astro` - Structured data injection

### Component Customization Strategy

All existing components will be customized through:

1. **Props and Configuration**: Pass custom data via component props
2. **Tailwind Classes**: Override default styles with utility classes
3. **CSS Variables**: Define brand colors and spacing in global styles
4. **Content Collections**: Manage all content through markdown files

### New Components (Minimal Addition)

Only create new components if absolutely necessary. Candidates for new components:

1. **ServiceCategorySection.astro** - If template doesn't support nested service categories
2. **ServiceAreaMap.astro** - Google Maps integration for service areas
3. **SocialMediaLinks.astro** - Social media icon links (if not in template)

## Data Models

### Company Configuration

The primary configuration file `src/data/company.ts` will be updated with Key Kings information:

```typescript
export const companyConfig = {
  name: "Key Kings Locksmith",
  tagline: "Professional Locksmith Services You Can Trust",
  
  contact: {
    phone: {
      primary: "(864) 900-9597",
      formatted: "+18649009597"
    },
    email: {
      primary: "keykingslocksmithsc@gmail.com"
    },
    address: {
      street: "4105 Liberty Highway Unit B",
      city: "Anderson",
      state: "SC",
      zipCode: "29621"
    }
  },
  
  hours: {
    sunday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    monday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    tuesday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    wednesday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    thursday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    friday: { open: "06:30", close: "17:30", label: "6:30 AM - 5:30 PM" },
    saturday: { open: null, close: null, label: "Closed" }
  },
  
  social: {
    tiktok: "https://www.tiktok.com/@keykingslcksmt",
    facebook: "https://www.facebook.com/profile.php?id=61580117602908",
    instagram: "https://www.instagram.com/keykingslcksmt",
    twitter: "https://x.com/keykingslcksmt",
    youtube: "https://www.youtube.com/@keykingslcksmt"
  },
  
  serviceAreas: {
    primary: [
      "Anderson, SC",
      "Greenville, SC",
      "Clemson, SC",
      "Easley, SC"
    ],
    secondary: [
      "Pendleton, SC",
      "Williamston, SC",
      "Belton, SC",
      "Liberty, SC",
      "Seneca, SC",
      "Pickens, SC"
    ],
    neighborhoods: {
      anderson: ["Homeland Park", "Honea Path", "Piedmont", "Powdersville", "West Pelzer", "Iva", "Star"],
      pickens: ["Central, SC", "Six Mile", "Dacusville", "Pumpkintown", "Holly Springs", "Slater-Marietta"]
    }
  }
}
```

### Content Collections Schema

#### Service Categories Collection

```typescript
{
  title: string; // e.g., "Emergency Locksmith"
  slug: string; // e.g., "emergency"
  description: string;
  icon: string; // SVG path or icon name (no emojis)
  services: Array<{
    name: string;
    description: string;
    icon: string;
  }>;
  featured: boolean;
  image: string;
  order: number;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
```

Note: Individual services are stored as data within each category, not as separate content collection items.

#### Service Areas Collection

```typescript
{
  title: string;
  city: string;
  state: string;
  zipCodes: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
  coverage: 'primary' | 'secondary' | 'extended';
  image?: string;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
```

#### FAQ Collection

```typescript
{
  question: string;
  category: 'General' | 'Emergency' | 'Residential' | 'Commercial' | 'Automotive' | 'Pricing';
  order: number;
  featured: boolean;
}
```

#### Reviews Collection

```typescript
{
  name: string;
  rating: number; // 1-5
  date: Date;
  service: string;
  location: string;
  verified: boolean;
  platform: 'google' | 'facebook' | 'yelp' | 'website';
  featured: boolean;
}
```

## Design System

### Brand Colors

Custom color palette for Key Kings (replacing template defaults):

```javascript
// tailwind.config.mjs
colors: {
  // Primary brand colors from logo
  gold: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24', // Main gold from logo
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  // Neutral/dark from logo
  charcoal: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827', // Dark from logo
  },
  // Trust/action colors
  trust: {
    blue: '#3B82F6',
    green: '#10B981',
  }
}
```

### Typography

```javascript
// tailwind.config.mjs
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Montserrat', 'system-ui', 'sans-serif'], // For headings
  serif: ['Georgia', 'serif'], // For elegant touches
}
```

### Spacing and Layout

Use Tailwind's default spacing scale with custom additions:

```javascript
spacing: {
  '18': '4.5rem',
  '88': '22rem',
  '128': '32rem',
}
```

### Component Styling Patterns

#### Buttons

```astro
<!-- Primary CTA -->
<Button variant="primary" size="lg" class="bg-gold-400 hover:bg-gold-500 text-charcoal-900">

<!-- Secondary -->
<Button variant="secondary" size="md" class="bg-charcoal-800 hover:bg-charcoal-700 text-white">

<!-- Outline -->
<Button variant="outline" size="md" class="border-gold-400 text-gold-400 hover:bg-gold-50">
```

#### Cards

```astro
<Card class="border-gold-200 hover:border-gold-400 hover:shadow-xl transition-all duration-300">
```

## Page Designs

### Homepage Design

#### Hero Section
- Full-width hero with custom background image (locksmith at work, branded vehicle)
- Logo prominently displayed
- Headline: "Locked Out? We're Here to Help"
- Subheadline: "Professional locksmith services you can trust in Anderson and Upstate SC"
- Primary CTA: "Call (864) 900-9597" (click-to-call on mobile)
- Secondary CTA: "Book Service Online"
- Trust badges below CTAs: Licensed, Bonded, Insured

#### Problems We Solve Section
Urgency-driven, empathetic copy addressing pain points:

**Locked Out of Your Car?**
"Keys locked inside? Lost your only key? We understand the stress. Our automotive locksmith services get you back on the road without damage to your vehicle."

**Locked Out of Your Home?**
"Standing outside your house with no way in? Don't panic. We provide fast, professional residential lockout services to get you back inside safely."

**Need Better Security?**
"Worried about your home or business security? From lock rekeying after moving in to complete security system upgrades, we help you sleep better at night."

**Business Security Concerns?**
"Protect your business, employees, and assets with professional commercial locksmith services. Master key systems, access control, and emergency exit devices."

#### Services Overview
- 4-column grid on desktop, 2 on tablet, 1 on mobile
- Service categories with custom SVG icons
- Each card includes:
  - Service category name
  - Brief benefit statement
  - "What we do" bullet points
  - Hover effects with subtle animations
  - Links to detailed service pages

#### Why Key Kings Section
Trust-building with specific, credible claims:

**Locally Owned & Operated**
"We're your neighbors in Anderson, SC. When you call us, you're supporting a local business that cares about this community."

**Licensed, Bonded & Insured**
"Full credentials and insurance coverage mean you're protected. We do this right, every time."

**Transparent & Honest**
"No hidden fees, no surprises. We explain what needs to be done and why before we start any work."

**Professional Service**
"Uniformed technicians, marked vehicles, and professional equipment. You'll know it's us when we arrive."

#### Prevention Tips Section
Value-added content that builds authority:

**"How to Avoid Lockouts"**
- Keep a spare key with a trusted neighbor
- Consider a keyless entry system
- Regular lock maintenance prevents failures
- Smart locks offer backup access options

**"Signs Your Locks Need Attention"**
- Key sticks or is hard to turn
- Lock feels loose or wobbly
- Visible rust or damage
- Recently moved into a new home or business

**"When to Rekey vs Replace"**
- Rekey: After moving, lost keys, employee turnover
- Replace: Damaged locks, outdated security, upgrading to smart locks

#### Service Areas
- Visual map or graphic representation
- "Serving Anderson, Greenville, Clemson & Upstate SC"
- List of primary service areas
- "See All Coverage Areas" link

#### Reviews Section
- Carousel of customer testimonials
- Star ratings with aggregate score
- Platform badges (Google, Facebook, etc.)
- Real customer names and locations
- Specific service mentioned in each review

#### FAQ Preview
- Top 5 most common questions with answers
- Accordion style for clean presentation
- Questions like:
  - "What areas do you serve?"
  - "Are you licensed and insured?"
  - "What payment methods do you accept?"
  - "Do you offer emergency services?"
  - "How do I know if I need to rekey or replace my locks?"
- Link to full FAQ page

#### Trust Signals Bar
- Years in business
- Customers served
- Service areas covered
- Average rating
- All presented with icons and numbers

#### Final CTA Section
- Strong, action-oriented headline: "Need a Locksmith? We're Ready to Help"
- Subheadline: "Call now or book online for professional locksmith services"
- Phone number prominent with click-to-call
- Book service button
- Business hours displayed
- "Available for emergencies" messaging

### Services Page Design

#### Main Services Page (/services)

**Hero Section**
- Headline: "Complete Locksmith Services for Every Need"
- Subheadline: "From emergency lockouts to security upgrades, we've got you covered"
- CTA: Call or Book Service

**Problems We Solve**
Quick-scan section with problem-solution pairs:
- "Locked out? We'll get you back in"
- "Lost your keys? We'll make new ones"
- "Need better security? We'll upgrade your locks"
- "Business security concerns? We'll protect your assets"

**Service Categories Grid**
4 main category cards with persuasive copy:

**Emergency Locksmith**
- Icon: Emergency/urgent symbol
- Headline: "Locked Out? We're Here to Help"
- Copy: "Car, home, or business lockout? Don't panic. We provide fast, professional lockout services to get you back inside safely."
- Services listed: Car Lockout, House Lockout, Business Lockout, Storage Unit Lockout
- CTA: "Get Help Now"

**Residential Locksmith**
- Icon: House/home symbol
- Headline: "Protect Your Home & Family"
- Copy: "From lock repairs to complete security upgrades, we help you feel safe at home. Professional residential locksmith services you can trust."
- Services listed: Lock Replacement, Lock Rekey, Lock Repair, Gate Locks
- CTA: "Secure Your Home"

**Commercial Locksmith**
- Icon: Building/business symbol
- Headline: "Secure Your Business"
- Copy: "Protect your business, employees, and assets with professional commercial security solutions. From master key systems to access control."
- Services listed: Lock Replacement, Master Key Systems, Access Control, Emergency Exit Devices
- CTA: "Protect Your Business"

**Automotive Locksmith**
- Icon: Car/key symbol
- Headline: "Car Key Problems? Solved"
- Copy: "Lost car keys? Broken key fob? Ignition issues? We handle all automotive locksmith needs to get you back on the road."
- Services listed: Car Key Replacement, Key Fob Programming, Car Key Duplicate, Ignition Repair
- CTA: "Fix My Car Key"

**Why Choose Key Kings Section**
- Licensed, bonded, and insured
- Professional equipment and techniques
- Transparent service - no hidden fees
- Serving Anderson and Upstate SC

**Prevention Tips Section**
"How to Avoid Common Lock Problems"
- Regular maintenance tips
- When to upgrade locks
- Security best practices
- Signs you need professional help

**Final CTA**
- "Ready to Get Started?"
- Phone and book service options

#### Service Category Pages (4 pages)

Each category page includes:

**Hero Section**
- Category name and icon
- Problem-focused headline
- Subheadline with benefit
- Primary CTA

**When You Need This Service**
- Specific scenarios and pain points
- Empathetic, understanding tone
- Creates urgency without pressure

**Our Services in This Category**
Grid of individual services with:
- Service name
- Problem it solves
- Key benefits
- "Learn more" or action-oriented CTA

**How We Help**
- Our process explained
- What makes us different
- Professional approach
- No damage guarantees where applicable

**Prevention & Maintenance Tips**
Value-added content specific to category:
- How to avoid these problems
- Maintenance recommendations
- When to call for preventive service
- DIY tips vs when to call a pro

**Common Questions**
- Category-specific FAQ
- Addresses objections
- Builds confidence

**Service Areas**
- Coverage information
- Link to full service areas page

**Final CTA**
- Strong call-to-action
- Multiple contact methods
- Trust signals

### Service Areas Page Design (Single Page)

#### Hero Section
- Headline: "Trusted Locksmith Services Across Anderson & Upstate SC"
- Subheadline: "Professional locksmith coverage throughout Anderson, Greenville, Clemson, and surrounding areas"
- CTA: Call or Book Service

#### Interactive Map Section
- Google Maps showing all service areas
- Highlighted coverage zones
- Visual representation of primary vs secondary areas

#### Service Areas List
Organized by region with trust-building copy:

**Primary Service Areas** (We're Local Here)
- Anderson, SC - Greenville, SC - Clemson, SC - Easley, SC

**Extended Coverage** (We Come to You)
- Pendleton, SC - Williamston, SC - Belton, SC - Liberty, SC - Seneca, SC - Pickens, SC

**Anderson County Neighborhoods**
- Homeland Park - Honea Path - Piedmont - Powdersville - West Pelzer - Iva - Star

**Pickens County Areas**
- Central, SC - Six Mile - Dacusville - Pumpkintown - Holly Springs - Slater-Marietta

#### Coverage Guarantee Section
- "If you're in Upstate SC, we can help"
- Clear messaging about service availability
- CTA to call for coverage confirmation

#### Why Choose Local Section
- Benefits of choosing a local locksmith
- Community involvement
- Fast response in covered areas

#### Service Availability
- Business hours display
- Emergency service messaging
- CTA to contact

### Other Pages

#### FAQ Page
- Searchable (if template supports)
- Category filters
- Accordion-style answers
- Schema markup for SEO

#### Reviews Page
- Grid of all reviews
- Filter by rating/platform
- Pagination
- CTA to leave a review

#### About Page
- Company story
- Values and mission
- Certifications and credentials
- Service area map
- No team member details

#### Contact Page
- Contact form
- Phone/email/address
- Business hours
- Map with location
- Social media links

#### Book Service Page
- Booking form
- Service selection dropdown
- Contact information fields
- reCAPTCHA
- Success redirect to thank you page

## Error Handling

### Form Validation
- Client-side validation with real-time feedback
- Server-side validation via API routes
- User-friendly error messages
- Accessibility-compliant error states

### API Error Handling
- Graceful degradation for form submissions
- Retry logic for transient failures
- User notification via Toast component
- Error logging for debugging

### 404 and Error Pages
- Custom 404 page with navigation
- Helpful links to main sections
- Search functionality
- Consistent branding

## Testing Strategy

### Content Audit
- Remove all emojis from content files
- Remove all pricing information
- Remove all ETA/response time promises
- Remove all staff information
- Verify NAP consistency

### Visual Testing
- Compare against template demo
- Verify 5+ visual differences in hero
- Test responsive breakpoints
- Verify color scheme consistency
- Test animations and interactions

### Performance Testing
- Lighthouse scores (target 95+)
- Core Web Vitals measurement
- Image optimization verification
- JavaScript bundle size check
- Mobile performance testing

### SEO Testing
- Meta tags verification
- Schema markup validation
- Sitemap generation
- Robots.txt configuration
- Internal linking audit

### Accessibility Testing
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader testing
- Color contrast verification
- Focus state visibility

### Cross-Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Tablet testing
- Different screen sizes

### Form Testing
- Contact form submission
- Booking form submission
- Newsletter signup
- reCAPTCHA functionality
- Email delivery via Resend API
- Error state handling

## Content Strategy and Copywriting Guidelines

### Tone and Voice

**Brand Voice**: Professional yet approachable, confident but not arrogant, helpful and empathetic

**Key Principles**:
- Speak directly to the customer's problem
- Use "you" and "we" language
- Be specific and concrete, not vague
- Build trust through transparency
- Create urgency without pressure
- Focus on benefits, not just features

### Copywriting Patterns

#### Problem-Agitate-Solve (PAS)
1. **Problem**: "Locked out of your car with no spare key?"
2. **Agitate**: "Standing in a parking lot, late for work, not sure who to call?"
3. **Solve**: "We're here to help. Professional car lockout service that gets you back on the road."

#### Before-After-Bridge
1. **Before**: "Worried about home security after moving in?"
2. **After**: "Imagine sleeping soundly knowing your locks are secure and only you have the keys."
3. **Bridge**: "Our lock rekeying service makes it happen. We'll rekey all your locks in one visit."

#### Features-Advantages-Benefits (FAB)
1. **Feature**: "Licensed and insured locksmith"
2. **Advantage**: "Full credentials and insurance coverage"
3. **Benefit**: "You're protected if anything goes wrong - though it won't"

### Content Sections for Every Page

#### Trust-Building Elements
- Credentials prominently displayed
- Real customer reviews with names and locations
- Specific numbers (years in business, customers served)
- Professional imagery (uniformed technicians, marked vehicles)
- Clear contact information
- Business hours transparency

#### Value-Added Content
- Prevention tips relevant to the page topic
- "How to" guides
- Common mistakes to avoid
- When to DIY vs when to call a pro
- Maintenance schedules
- Security best practices

#### SEO-Optimized Content
- Natural keyword integration
- Location-specific content
- Question-based headings (voice search optimization)
- Structured data markup
- Internal linking strategy
- Alt text for images

### Specific Content Types

#### "Problems We Solve" Sections
Format: Problem statement + Our solution + Benefit

Example:
"Locked out of your house at night? We provide residential lockout services throughout Anderson and Upstate SC. You'll be back inside safely, usually within the hour."

#### "Prevention Tips" Sections
Format: Tip + Why it matters + How to do it

Example:
"Keep a spare key with a trusted neighbor. If you get locked out, you won't need to wait for a locksmith. Choose someone reliable who's usually home."

#### "When to Call Us" Sections
Format: Situation + Why it's important + What we do

Example:
"Just moved into a new home? You don't know who has copies of your keys. We'll rekey all your locks so only you and your family have access."

#### "Common Questions" Sections
Format: Question + Direct answer + Additional context

Example:
"Are you licensed and insured? Yes, we're fully licensed, bonded, and insured. This protects you and gives you peace of mind that you're working with professionals."

### Urgency and Action Triggers

#### Appropriate Urgency (No False Scarcity)
- "Don't wait until you're locked out - save our number now"
- "The longer you wait, the more vulnerable your property becomes"
- "Call now while we're available"
- "Book online for your preferred time slot"

#### Clear Calls-to-Action
- "Call (864) 900-9597 Now"
- "Book Service Online"
- "Get Help Now"
- "Request a Quote"
- "Save Our Number"

### Content for Search Engines

#### Keyword Integration Strategy
Primary keywords naturally integrated into:
- H1 headings (one per page)
- H2 and H3 subheadings
- First paragraph of content
- Image alt text
- Meta descriptions
- URL slugs

#### Location-Based Content
Every page includes:
- Primary service area mention (Anderson, SC)
- Secondary areas where relevant
- "Serving [location]" statements
- Local landmarks or references where appropriate

#### Question-Based Content (Voice Search)
FAQ sections optimized for voice queries:
- "What does a locksmith do?"
- "How much does it cost to rekey locks?" (answer without specific pricing)
- "Can a locksmith make a key without the original?"
- "How do I know if I need to replace my locks?"
- "What areas do you serve?"

### Content Maintenance

#### Regular Updates
- Review and refresh service descriptions quarterly
- Update customer reviews monthly
- Add new FAQ items based on common questions
- Update service areas if coverage changes
- Refresh prevention tips seasonally

#### Content Quality Checks
- Remove any emojis
- Verify no pricing information
- Confirm no ETA/response time promises
- Check NAP consistency
- Validate all links
- Test all CTAs

## Implementation Approach

### Phase 1: Configuration and Content Cleanup
1. Update `src/data/company.ts` with Key Kings information
2. Remove emojis from all content files
3. Remove pricing information from services
4. Remove ETA/response time promises
5. Remove staff/team information
6. Update social media links

### Phase 2: Brand Customization
1. Update Tailwind config with custom colors
2. Add logo files to `public/images/brand/`
3. Update favicon and app icons
4. Modify global CSS variables
5. Test color scheme across all pages

### Phase 3: Component Styling
1. Customize Header component styling
2. Customize Footer component styling
3. Customize Hero section layout
4. Customize service cards
5. Customize CTA buttons
6. Add custom animations

### Phase 4: Content Creation
1. Create service content files (16 services)
2. Create service area content files
3. Create FAQ content
4. Create review content
5. Update legal pages

### Phase 5: Page Development
1. Customize homepage
2. Create main services page (/services)
3. Create 4 service category pages (emergency, residential, commercial, automotive)
4. Create service areas pages
5. Create FAQ page
6. Create reviews page
7. Create about page
8. Create contact page
9. Create book service page
10. Create thank you page

### Phase 6: Integration and Testing
1. Integrate Google Maps API
2. Configure Resend API for forms
3. Add reCAPTCHA to forms
4. Test all form submissions
5. Verify email delivery
6. Test responsive design
7. Run Lighthouse audits
8. Fix any issues

### Phase 7: SEO Optimization
1. Add schema markup to all pages
2. Optimize meta tags
3. Generate sitemap
4. Configure robots.txt
5. Add internal linking
6. Optimize images
7. Test Core Web Vitals

### Phase 8: Deployment
1. Configure Vercel project
2. Set environment variables
3. Deploy to staging
4. Final testing
5. Deploy to production
6. Monitor performance

## Technical Considerations

### Performance Optimization

#### Image Optimization
- Use WebP/AVIF formats with fallbacks
- Implement lazy loading for below-fold images
- Use appropriate image sizes for different viewports
- Compress images without quality loss
- Use Astro's built-in image optimization

#### Code Splitting
- Leverage Astro's automatic code splitting
- Lazy load non-critical JavaScript
- Minimize CSS bundle size
- Use Tailwind's purge feature

#### Caching Strategy
- Static assets cached with long TTL
- HTML pages cached with short TTL
- API responses not cached
- Service worker for offline support (optional)

### Security

#### Form Security
- reCAPTCHA v3 on all forms
- CSRF protection
- Input sanitization
- Rate limiting on API endpoints
- Secure headers configuration

#### Data Protection
- HTTPS only
- Secure cookie settings
- No sensitive data in client-side code
- Environment variables for API keys
- Regular dependency updates

### Accessibility

#### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios
- Alt text for images
- Form labels and error messages
- Skip navigation links

### SEO Best Practices

#### On-Page SEO
- H1 for main page topic
- H2/H3 for subsections
- Unique meta titles and descriptions
- Descriptive URLs
- Internal linking strategy
- Image alt text
- Fast loading times

#### Technical SEO
- XML sitemap
- Robots.txt
- Canonical URLs
- Schema markup (LocalBusiness, Service, FAQ)
- Mobile-friendly design
- Core Web Vitals optimization
- HTTPS
- Structured data validation

#### Local SEO
- Google My Business integration
- NAP consistency
- Local keywords in content
- Service area pages
- Local schema markup
- Location-specific content

### Analytics and Tracking

#### Vercel Analytics
- Page views
- User sessions
- Geographic data
- Device types
- Performance metrics

#### Conversion Tracking
- Form submissions
- Phone clicks
- Email clicks
- Button clicks
- Page scroll depth

## Maintenance and Updates

### Content Updates
- Service descriptions
- Service areas
- FAQ answers
- Reviews
- Business hours
- Contact information

### Regular Maintenance
- Dependency updates
- Security patches
- Performance monitoring
- Broken link checks
- Image optimization
- Content freshness

### Future Enhancements
- Blog system (template supports it)
- Live chat integration
- Online payment system
- Customer portal
- Appointment scheduling
- SMS notifications
