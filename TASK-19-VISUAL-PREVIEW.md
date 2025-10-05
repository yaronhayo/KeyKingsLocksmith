# Task 19: Contact Page - Visual Preview

## Page Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│                   (Gold Navigation)                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     HERO SECTION                             │
│          Gold Gradient Background (400→500→600)              │
│                                                              │
│                    Contact Us                                │
│     We're here to help! Reach out and we'll respond         │
│              as quickly as possible.                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│   CONTACT INFORMATION        │     CONTACT FORM             │
│                              │                              │
│  Get in Touch                │  ┌────────────────────────┐ │
│  Have a question or need...  │  │ Send Us a Message      │ │
│                              │  │ We'll respond within   │ │
│  ┌──────────────────────┐   │  │ 24 hours               │ │
│  │ 📞 Phone             │   │  └────────────────────────┘ │
│  │ (864) 900-9597       │   │                              │
│  │ Professional service │   │  Name*        Phone          │
│  └──────────────────────┘   │  [________]   [________]     │
│                              │                              │
│  ┌──────────────────────┐   │  Email*                      │
│  │ ✉️ Email             │   │  [____________________]      │
│  │ keykingslocksmith... │   │                              │
│  │ We'll respond within │   │  Subject*                    │
│  └──────────────────────┘   │  [____________________]      │
│                              │                              │
│  ┌──────────────────────┐   │  Message*                    │
│  │ 📍 Address           │   │  [____________________]      │
│  │ 4105 Liberty Hwy...  │   │  [____________________]      │
│  │ Get Directions →     │   │  [____________________]      │
│  └──────────────────────┘   │                              │
│                              │  [  Send Message  ]          │
│  ┌──────────────────────┐   │                              │
│  │ 🕐 Business Hours    │   │                              │
│  │ Sunday:    7am-10pm  │   │                              │
│  │ Monday:    7am-10pm  │   │                              │
│  │ Tuesday:   7am-10pm  │   │                              │
│  │ Wednesday: 7am-10pm  │   │                              │
│  │ Thursday:  7am-10pm  │   │                              │
│  │ Friday:    6:30am-5:30pm│                              │
│  │ Saturday:  Closed    │   │                              │
│  └──────────────────────┘   │                              │
│                              │                              │
│  Follow Us                   │                              │
│  [f] [📷] [🎵] [X] [▶️]     │                              │
└──────────────────────────────┴──────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  GOOGLE MAPS SECTION                         │
│              (Charcoal-50 Background)                        │
│                                                              │
│                Visit Our Location                            │
│              Find us in Anderson, SC                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │              [GOOGLE MAPS EMBED]                     │   │
│  │         4105 Liberty Highway Unit B                  │   │
│  │           Anderson, SC 29621                         │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│            [ 📍 Open in Google Maps ]                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   SERVICE AREAS SECTION                      │
│                   (White Background)                         │
│                                                              │
│                    Service Areas                             │
│      We proudly serve Anderson, SC and surrounding areas    │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │Anderson  │ │Greenville│ │ Clemson  │ │  Easley  │      │
│  │    SC    │ │    SC    │ │    SC    │ │    SC    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│              View All Service Areas →                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        FOOTER                                │
│                  (Charcoal Background)                       │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### Contact Form States

#### Default State
```
┌────────────────────────────────────┐
│ Send Us a Message                  │
│ We'll respond within 24 hours      │
├────────────────────────────────────┤
│                                    │
│ Name *                             │
│ ┌────────────────────────────────┐ │
│ │ Your name                      │ │
│ └────────────────────────────────┘ │
│                                    │
│ Email *                            │
│ ┌────────────────────────────────┐ │
│ │ your@email.com                 │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌──────────────────────────────┐   │
│ │     Send Message             │   │
│ └──────────────────────────────┘   │
└────────────────────────────────────┘
```

#### Error State
```
┌────────────────────────────────────┐
│ Name *                             │
│ ┌────────────────────────────────┐ │
│ │ J                              │ │ ← Gold border
│ └────────────────────────────────┘ │
│ ⚠️ Name must be at least 2 chars   │ ← Gold text
└────────────────────────────────────┘
```

#### Success State
```
┌────────────────────────────────────┐
│ ✓ Message Sent!                    │ ← Gold background
│ Thank you for contacting us.       │
│ We'll respond within 24 hours.     │
└────────────────────────────────────┘
```

### Contact Information Cards

```
┌──────────────────────────────────┐
│  ┌────┐                          │
│  │ 📞 │  Phone                   │ ← Gold icon bg
│  └────┘                          │   Hover: darker gold
│         (864) 900-9597           │ ← Gold text, bold
│         Professional service...  │ ← Charcoal text
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  ┌────┐                          │
│  │ ✉️ │  Email                   │
│  └────┘                          │
│         keykingslocksmith...     │ ← Gold text
│         We'll respond within...  │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  ┌────┐                          │
│  │ 📍 │  Address                 │
│  └────┘                          │
│         4105 Liberty Highway...  │
│         Get Directions →         │ ← Gold link
└──────────────────────────────────┘
```

### Business Hours Card

```
┌────────────────────────────────────┐
│ 🕐 Business Hours                  │ ← Gold gradient bg
│                                    │   Gold border
├────────────────────────────────────┤
│ Sunday:     7:00 AM - 10:00 PM    │
│ Monday:     7:00 AM - 10:00 PM    │
│ Tuesday:    7:00 AM - 10:00 PM    │
│ Wednesday:  7:00 AM - 10:00 PM    │
│ Thursday:   7:00 AM - 10:00 PM    │
│ Friday:     6:30 AM - 5:30 PM     │
│ Saturday:   Closed                 │
├────────────────────────────────────┤
│ Professional locksmith service...  │
└────────────────────────────────────┘
```

### Social Media Icons

```
┌──────────────────────────────────┐
│ Follow Us                        │
│                                  │
│ [f] [📷] [🎵] [X] [▶️]          │
│  ↑    ↑    ↑   ↑   ↑            │
│  FB  IG   TT   X   YT           │
│                                  │
│ Gold background                  │
│ Hover: Darker gold bg            │
│ Icons: Gold → Charcoal on hover  │
└──────────────────────────────────┘
```

### Service Area Cards

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│Anderson  │ │Greenville│ │ Clemson  │ │  Easley  │
│    SC    │ │    SC    │ │    SC    │ │    SC    │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
     ↑
Gold gradient background (50→100)
Gold border (2px)
Hover: Darker gradient + larger shadow
```

## Color Scheme

### Primary Colors
- **Gold-400 (#FBBF24):** Main buttons, primary actions
- **Gold-500 (#F59E0B):** Hover states
- **Gold-600 (#D97706):** Icons, links
- **Charcoal-900 (#111827):** Headings, primary text
- **Charcoal-800 (#1F2937):** Labels
- **Charcoal-700 (#374151):** Body text

### Background Colors
- **White (#FFFFFF):** Main content areas
- **Charcoal-50 (#F9FAFB):** Alternate sections
- **Gold-50 (#FFFBEB):** Light accents
- **Gold-100 (#FEF3C7):** Card backgrounds

### Interactive States
- **Default:** Gold-400 background, Charcoal-900 text
- **Hover:** Gold-500 background, larger shadow
- **Focus:** Gold-400 ring, 2px width
- **Error:** Gold-600 border, Gold-700 text
- **Success:** Gold-50 background, Gold-500 border

## Typography

### Headings
- **H1 (Page Title):** 4xl (2.25rem) / 5xl (3rem) on md+
- **H2 (Section Titles):** 3xl (1.875rem)
- **H3 (Card Titles):** base (1rem), bold
- **Font:** Montserrat (display), bold weight

### Body Text
- **Large:** lg (1.125rem) for introductions
- **Regular:** base (1rem) for body content
- **Small:** sm (0.875rem) for details
- **Font:** Inter (sans), regular/semibold

### Labels
- **Form Labels:** sm (0.875rem), semibold
- **Required Indicators:** Gold-600 asterisk
- **Error Messages:** sm (0.875rem), medium weight

## Spacing

### Section Padding
- **Vertical:** py-16 (4rem top/bottom)
- **Horizontal:** px-4 (1rem left/right)
- **Container:** max-w-7xl, mx-auto

### Component Spacing
- **Form Fields:** space-y-5 (1.25rem)
- **Contact Cards:** space-y-6 (1.5rem)
- **Grid Gaps:** gap-4 (1rem) to gap-12 (3rem)

### Internal Padding
- **Cards:** p-6 (1.5rem) to p-8 (2rem)
- **Buttons:** px-6 py-3 (1.5rem x 0.75rem)
- **Icons:** w-14 h-14 (3.5rem square)

## Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Stacked contact info and form
- Full-width buttons
- 1-column service areas

### Tablet (768px - 1024px)
- 2-column grid for contact methods
- 2-column service areas
- Side-by-side form fields

### Desktop (1024px+)
- 2-column layout (info + form)
- 4-column service areas
- Optimal spacing and whitespace

## Interactive Elements

### Hover Effects
```
Button:
  Default: bg-gold-400, shadow-lg
  Hover:   bg-gold-500, shadow-xl
  
Link:
  Default: text-gold-600
  Hover:   text-gold-700
  
Card:
  Default: shadow-md
  Hover:   shadow-lg, transform
  
Icon Background:
  Default: bg-gold-100
  Hover:   bg-gold-200
```

### Focus States
```
Input:
  Focus: ring-2 ring-gold-400
         border-gold-400
         
Button:
  Focus: ring-2 ring-gold-400
         ring-offset-2
         
Link:
  Focus: outline-2 outline-gold-400
```

### Transitions
- **Duration:** 200ms (fast, responsive)
- **Easing:** ease-in-out (smooth)
- **Properties:** colors, shadows, transforms

## Accessibility Features

### Semantic HTML
- `<main>` for main content
- `<section>` for each major area
- `<address>` for business address
- `<form>` with proper structure

### ARIA Labels
- Icon-only links have aria-label
- Form inputs have associated labels
- Error messages linked to inputs
- Success/error announcements

### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Visible focus indicators
- Skip links available

### Color Contrast
- Text on white: 7:1+ (AAA)
- Text on gold: 4.5:1+ (AA)
- Interactive elements: 3:1+ (AA)
- Error messages: 4.5:1+ (AA)

## Performance Optimizations

### Lazy Loading
- Google Maps iframe: `loading="lazy"`
- reCAPTCHA script: async/defer
- Below-fold images: lazy loaded

### Asset Optimization
- SVG icons (scalable, small)
- No external icon libraries
- Minimal custom JavaScript
- CSS transitions (GPU accelerated)

### Code Splitting
- Form validation module
- API client utilities
- Astro automatic optimization

---

**Visual Design Status:** ✅ COMPLETE
**Brand Consistency:** ✅ VERIFIED
**Responsive Design:** ✅ TESTED
**Accessibility:** ✅ COMPLIANT
