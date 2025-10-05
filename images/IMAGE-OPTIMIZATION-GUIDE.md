# Image Optimization Guide for Key Kings Locksmith

## Overview
This guide ensures all images on the Key Kings website are optimized for performance, SEO, and accessibility.

## Astro Image Optimization (Already Configured)

The site uses Astro's built-in image optimization with the following settings:

- **Formats**: AVIF and WebP with automatic fallbacks
- **Sizes**: 320px, 640px, 768px, 1024px, 1280px, 1536px
- **Service**: Sharp (high-quality image processing)
- **Lazy Loading**: Enabled by default

## Image Requirements

### 1. File Formats
- **Source files**: Use high-quality JPG or PNG
- **Logos/Icons**: Use SVG when possible
- **Photos**: JPG for photographs, PNG for graphics with transparency

### 2. Image Sizes (Before Upload)
- **Hero images**: 1920x1080px (16:9 ratio)
- **Service images**: 800x600px (4:3 ratio)
- **Team photos**: 400x400px (1:1 ratio)
- **Thumbnails**: 300x200px
- **Icons**: 64x64px or SVG

### 3. Compression
- **JPG**: 80-85% quality
- **PNG**: Use tools like TinyPNG
- **Target**: < 200KB per image

## Alt Text Guidelines

### Required Alt Text for All Images

#### Service Images
```astro
<Image 
  src="/images/services/car-lockout.jpg"
  alt="Professional locksmith unlocking car door in Anderson SC"
  width={800}
  height={600}
  loading="lazy"
/>
```

#### Team/Business Photos
```astro
<Image 
  src="/images/team/technician.jpg"
  alt="Licensed locksmith technician with Key Kings branded vehicle"
  width={400}
  height={400}
  loading="lazy"
/>
```

#### Location/Area Photos
```astro
<Image 
  src="/images/areas/anderson-downtown.jpg"
  alt="Downtown Anderson SC - Key Kings Locksmith service area"
  width={800}
  height={600}
  loading="lazy"
/>
```

#### Decorative Images
```astro
<Image 
  src="/images/decorative/pattern.jpg"
  alt=""
  role="presentation"
  width={100}
  height={100}
/>
```

## Alt Text Best Practices

### DO:
- ✅ Be specific and descriptive
- ✅ Include location when relevant (Anderson SC, Greenville SC, etc.)
- ✅ Mention the service being performed
- ✅ Keep under 125 characters
- ✅ Include keywords naturally

### DON'T:
- ❌ Start with "Image of..." or "Picture of..."
- ❌ Use generic descriptions like "locksmith"
- ❌ Stuff keywords unnaturally
- ❌ Leave alt text empty (unless decorative)
- ❌ Repeat the same alt text

## Example Alt Text by Category

### Emergency Services
- "Emergency car lockout service in Anderson SC parking lot"
- "Locksmith opening residential door lock in Greenville SC"
- "Commercial locksmith installing access control system"

### Service Types
- "Locksmith rekeying deadbolt lock on residential door"
- "Car key fob programming for Toyota vehicle"
- "Master key system installation for office building"

### Equipment/Tools
- "Professional locksmith tools and key cutting equipment"
- "High-security lock installation on commercial door"
- "Electronic keypad lock system for business"

### Locations
- "Key Kings Locksmith service vehicle in Anderson SC"
- "Locksmith serving Clemson University area"
- "Mobile locksmith truck in Greenville downtown"

## Lazy Loading Implementation

### Above the Fold (Hero Images)
```astro
<Image 
  src="/images/hero/locksmith-hero.jpg"
  alt="Professional locksmith services in Anderson SC"
  width={1920}
  height={1080}
  loading="eager"
  fetchpriority="high"
/>
```

### Below the Fold (All Other Images)
```astro
<Image 
  src="/images/services/service-image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
/>
```

## Image Naming Conventions

### File Names Should Be:
- Lowercase
- Hyphen-separated
- Descriptive
- Include location when relevant

### Examples:
- ✅ `car-lockout-anderson-sc.jpg`
- ✅ `residential-lock-rekey-service.jpg`
- ✅ `key-kings-service-vehicle.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `photo.jpg`
- ❌ `locksmith.jpg`

## Directory Structure

```
public/images/
├── brand/              # Logos, icons, branding
├── hero/               # Hero section images
├── services/           # Service-specific images
│   ├── emergency/
│   ├── residential/
│   ├── commercial/
│   └── automotive/
├── areas/              # Service area photos
├── team/               # Team photos (if needed)
├── certifications/     # Badges, certifications
├── og/                 # Open Graph images
└── placeholders/       # Placeholder images
```

## Open Graph Images

### Requirements:
- **Size**: 1200x630px
- **Format**: JPG or PNG
- **File size**: < 300KB
- **Alt text**: Not needed (handled by meta tags)

### Example:
```
public/images/og/
├── og-default.jpg          # Homepage
├── og-emergency.jpg        # Emergency services
├── og-residential.jpg      # Residential services
├── og-commercial.jpg       # Commercial services
└── og-automotive.jpg       # Automotive services
```

## Performance Checklist

- [ ] All images have descriptive alt text
- [ ] Hero images use `loading="eager"`
- [ ] Below-fold images use `loading="lazy"`
- [ ] Images are compressed before upload
- [ ] File names are descriptive and SEO-friendly
- [ ] Images are in appropriate directories
- [ ] Open Graph images are 1200x630px
- [ ] No images exceed 500KB
- [ ] SVG used for logos and icons
- [ ] Responsive images use srcset (handled by Astro)

## Testing

### Tools to Use:
1. **Google PageSpeed Insights**: Check image optimization
2. **Lighthouse**: Verify lazy loading and formats
3. **WebPageTest**: Measure image load times
4. **WAVE**: Check alt text accessibility

### Target Metrics:
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- All images have alt text
- Images use modern formats (WebP/AVIF)

## Maintenance

### Regular Tasks:
1. Audit images quarterly for optimization
2. Update alt text as services change
3. Remove unused images
4. Compress new images before upload
5. Test on mobile devices

## Resources

- [Astro Image Documentation](https://docs.astro.build/en/guides/images/)
- [WebP Converter](https://squoosh.app/)
- [TinyPNG](https://tinypng.com/)
- [Alt Text Best Practices](https://www.w3.org/WAI/tutorials/images/)
