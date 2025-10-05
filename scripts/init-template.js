#!/usr/bin/env node

/**
 * Template Initialization Script
 * Generates all remaining placeholder files and sample content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Initializing Key Kings Locksmith template...\n');

// Sample service content
const sampleServices = [
  {
    slug: 'car-lockout',
    title: 'Car Lockout Service',
    category: 'automotive',
    icon: '🚗',
    description: 'Fast and professional car lockout service. We can unlock any vehicle without damage.',
  },
  {
    slug: 'house-lockout',
    title: 'House Lockout Service',
    category: 'residential',
    icon: '🏠',
    description: 'Locked out of your home? We provide quick residential lockout services.',
  },
  {
    slug: 'lock-rekey',
    title: 'Lock Rekey Service',
    category: 'residential',
    icon: '🔑',
    description: 'Professional lock rekeying for enhanced home security.',
  },
  {
    slug: 'commercial-locksmith',
    title: 'Commercial Locksmith',
    category: 'commercial',
    icon: '🏢',
    description: 'Complete commercial locksmith services for businesses.',
  },
  {
    slug: 'emergency-locksmith',
    title: '24/7 Emergency Service',
    category: 'emergency',
    icon: '🚨',
    description: 'Emergency locksmith service available around the clock.',
  },
  {
    slug: 'key-replacement',
    title: 'Key Replacement',
    category: 'automotive',
    icon: '🔐',
    description: 'Car key replacement and programming services.',
  },
];

// Sample service areas
const sampleServiceAreas = [
  {
    slug: 'anderson-sc',
    city: 'Anderson',
    state: 'SC',
    coverage: 'primary',
    zipCodes: ['29621', '29622', '29624', '29625'],
    lat: 34.5034,
    lng: -82.6501,
  },
  {
    slug: 'greenville-sc',
    city: 'Greenville',
    state: 'SC',
    coverage: 'primary',
    zipCodes: ['29601', '29605', '29607', '29609'],
    lat: 34.8526,
    lng: -82.3940,
  },
  {
    slug: 'clemson-sc',
    city: 'Clemson',
    state: 'SC',
    coverage: 'primary',
    zipCodes: ['29631', '29633'],
    lat: 34.6834,
    lng: -82.8374,
  },
];

// Sample FAQ
const sampleFAQ = [
  {
    slug: 'how-long-lockout',
    category: 'Emergency',
    question: 'How long does it take to unlock a car?',
    order: 1,
  },
  {
    slug: 'service-areas',
    category: 'General',
    question: 'What areas do you serve?',
    order: 2,
  },
  {
    slug: 'pricing',
    category: 'Pricing',
    question: 'How much does locksmith service cost?',
    order: 3,
  },
];

// Sample reviews
const sampleReviews = [
  {
    slug: 'review-john-anderson',
    name: 'John D.',
    rating: 5,
    date: '2024-12-01',
    service: 'Car Lockout',
    location: 'Anderson, SC',
    platform: 'google',
    verified: true,
  },
  {
    slug: 'review-sarah-greenville',
    name: 'Sarah M.',
    rating: 5,
    date: '2024-11-28',
    service: 'House Lockout',
    location: 'Greenville, SC',
    platform: 'google',
    verified: true,
  },
];

// Create sample service files
console.log('📝 Creating sample service content...');
sampleServices.forEach(service => {
  const content = `---
title: "${service.title}"
description: "${service.description}"
icon: "${service.icon}"
category: ${service.category}
featured: ${service.slug === 'car-lockout' || service.slug === 'house-lockout'}
price: "Starting at $75"
image: "/images/services/${service.slug}.jpg"
order: ${sampleServices.indexOf(service) + 1}
seo:
  title: "${service.title} - Anderson, SC"
  description: "${service.description} Available throughout Anderson and Upstate SC."
  keywords:
    - "${service.slug.replace('-', ' ')}"
    - "locksmith ${service.category}"
    - "Anderson SC locksmith"
---

## ${service.title}

${service.description}

### What We Offer

- Fast response time (average 30 minutes)
- Professional certified technicians
- Upfront pricing with no hidden fees
- Fully licensed, bonded, and insured
- 100% satisfaction guaranteed

### Service Areas

We provide ${service.title.toLowerCase()} throughout:
- Anderson, SC
- Greenville, SC
- Clemson, SC
- And surrounding Upstate SC areas

### Why Choose Key Kings Locksmith?

With over 9 years of experience and 5,000+ satisfied customers, we're the trusted choice for ${service.title.toLowerCase()} in the Upstate South Carolina region.

**Call now: (864) 900-9597**
`;

  const filePath = path.join(__dirname, '..', 'src', 'content', 'services', `${service.slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Created ${service.slug}.md`);
});

// Create sample service area files
console.log('\n📍 Creating sample service area content...');
sampleServiceAreas.forEach(area => {
  const content = `---
title: "Locksmith Service in ${area.city}, ${area.state}"
city: "${area.city}"
state: "${area.state}"
zipCodes: ${JSON.stringify(area.zipCodes)}
coordinates:
  lat: ${area.lat}
  lng: ${area.lng}
featured: ${area.coverage === 'primary'}
responseTime: "30 minutes average"
coverage: ${area.coverage}
image: "/images/service-areas/${area.slug}.jpg"
seo:
  title: "Professional Locksmith in ${area.city}, ${area.state} | Key Kings"
  description: "Licensed locksmith services in ${area.city}, SC. Car lockouts, house lockouts, key replacement & more. Fast 30-min response. Call (864) 900-9597"
  keywords:
    - "locksmith ${area.city} ${area.state}"
    - "${area.city} locksmith"
    - "emergency locksmith ${area.city}"
---

# Professional Locksmith Services in ${area.city}, ${area.state}

Key Kings Locksmith provides comprehensive locksmith services throughout ${area.city} and surrounding areas. Our mobile locksmith team serves all ZIP codes: ${area.zipCodes.join(', ')}.

## Services Available in ${area.city}

- 🚗 Automotive Locksmith Services
- 🏠 Residential Locksmith Services
- 🏢 Commercial Locksmith Services
- 🚨 24/7 Emergency Lockout Service
- 🔑 Key Duplication & Replacement

## Why Choose Us in ${area.city}?

- **Fast Response**: Average 30-minute arrival time
- **Licensed & Insured**: Fully certified professionals
- **Local Expertise**: Serving ${area.city} since 2016
- **Upfront Pricing**: No hidden fees or surprises
- **5,000+ Happy Customers**: Trusted throughout Upstate SC

## Contact Us

**Phone**: (864) 900-9597
**Email**: keykingslocksmithsc@gmail.com
**Service Area**: All of ${area.city}, ${area.state}

*Average response time: 30 minutes | Licensed, Bonded & Insured*
`;

  const filePath = path.join(__dirname, '..', 'src', 'content', 'service-areas', `${area.slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Created ${area.slug}.md`);
});

// Create sample FAQ files
console.log('\n❓ Creating sample FAQ content...');
sampleFAQ.forEach(faq => {
  const answers = {
    'how-long-lockout': 'Most car lockouts can be resolved in 5-15 minutes once our technician arrives. Our average response time is 30 minutes.',
    'service-areas': 'We serve Anderson, Greenville, Clemson, Easley, and surrounding Upstate South Carolina areas. Call us to confirm service in your area.',
    'pricing': 'Pricing varies by service type. Car lockouts start at $75, house lockouts at $85. We provide upfront estimates with no hidden fees.',
  };

  const content = `---
question: "${faq.question}"
category: ${faq.category}
order: ${faq.order}
featured: ${faq.order <= 3}
---

${answers[faq.slug]}
`;

  const filePath = path.join(__dirname, '..', 'src', 'content', 'faq', `${faq.slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Created ${faq.slug}.md`);
});

// Create sample review files
console.log('\n⭐ Creating sample review content...');
sampleReviews.forEach(review => {
  const content = `---
name: "${review.name}"
rating: ${review.rating}
date: ${review.date}
service: "${review.service}"
location: "${review.location}"
verified: ${review.verified}
platform: ${review.platform}
featured: true
---

Excellent service! The technician arrived quickly and was very professional. Would highly recommend Key Kings Locksmith to anyone needing locksmith services in the Upstate SC area.
`;

  const filePath = path.join(__dirname, '..', 'src', 'content', 'reviews', `${review.slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`  ✅ Created ${review.slug}.md`);
});

// Create placeholder image README files
console.log('\n🖼️  Creating image placeholder documentation...');
const imageDirectories = [
  'services',
  'team',
  'certifications',
  'og',
  'hero',
  'brand',
  'placeholders',
  'icons',
];

imageDirectories.forEach(dir => {
  const readmePath = path.join(__dirname, '..', 'public', 'images', dir, 'README.md');
  const content = `# ${dir.charAt(0).toUpperCase() + dir.slice(1)} Images

Place your ${dir} images in this directory.

## Recommended Specifications

- Format: WebP (with JPG/PNG fallbacks)
- Optimization: Use image compression tools
- Naming: Use kebab-case (e.g., car-lockout-service.jpg)

## Required Images for ${dir}:

${dir === 'services' ? `
- car-lockout.jpg
- house-lockout.jpg
- lock-rekey.jpg
- commercial-locksmith.jpg
- emergency-locksmith.jpg
- key-replacement.jpg
` : dir === 'brand' ? `
- logo-text.svg (full logo with text)
- logo-icon.svg (icon only)
- apple-touch-icon.png (180x180)
` : dir === 'og' ? `
- og-default.jpg (1200x630)
- og-services.jpg (1200x630)
- og-contact.jpg (1200x630)
` : `
- Add images as needed for ${dir}
`}
`;

  fs.writeFileSync(readmePath, content);
  console.log(`  ✅ Created ${dir}/README.md`);
});

console.log('\n✨ Template initialization complete!');
console.log('\n📋 Next steps:');
console.log('  1. Run: npm install');
console.log('  2. Copy .env.example to .env and add your API keys');
console.log('  3. Add your logo and images to public/images/');
console.log('  4. Run: npm run dev');
console.log('  5. Customize content in src/content/');
console.log('\n🎉 Happy building!\n');
