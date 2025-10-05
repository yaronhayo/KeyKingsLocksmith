# Task 6 Visual Preview: Problems We Solve Section

## Section Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                     PROBLEMS WE SOLVE SECTION                    │
│                    (Light Gray Background)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│              How Can We Help You Today?                          │
│     Whatever your locksmith needs, we're here to solve           │
│           your problem quickly and professionally                │
│                                                                   │
├──────────────┬──────────────┬──────────────┬──────────────┐
│              │              │              │              │
│   [CAR 🚗]   │  [HOME 🏠]   │ [SHIELD 🛡️]  │ [BUILDING 🏢] │
│   (Blue)     │   (Green)    │   (Gold)     │  (Charcoal)  │
│              │              │              │              │
│  Locked Out  │  Locked Out  │    Need      │   Business   │
│  of Your     │  of Your     │   Better     │   Security   │
│    Car?      │    Home?     │  Security?   │  Concerns?   │
│              │              │              │              │
│ Keys locked  │ Standing     │ Worried      │ Protect your │
│ inside? Lost │ outside your │ about your   │ business,    │
│ your only    │ house with   │ home or      │ employees,   │
│ key? We      │ no way in?   │ business     │ and assets   │
│ understand   │ Don't panic. │ security?    │ with         │
│ the stress.  │ We provide   │ From lock    │ professional │
│ Our auto...  │ fast, pro... │ rekeying...  │ commercial...│
│              │              │              │              │
│ Learn More → │ Learn More → │ Learn More → │ Learn More → │
│              │              │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
│                                                                   │
│     Don't see your specific problem? We handle all               │
│                  locksmith needs.                                 │
│                                                                   │
│     [Call (864) 900-9597]  [View All Services →]                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (lg: 1024px+)
- 4 columns in a row
- Cards have equal height
- Hover effects fully visible
- Icons at 56px (w-14 h-14)

### Tablet (md: 768px - 1023px)
- 2 columns, 2 rows
- Cards maintain equal height within rows
- Touch-friendly hover states
- Icons at 56px (w-14 h-14)

### Mobile (< 768px)
- 1 column, stacked vertically
- Full-width cards
- Touch-optimized spacing
- Icons at 48px (w-12 h-12)

## Color Scheme

### Card 1: Car Lockout
- **Border**: Trust Blue (#3B82F6) at 30% opacity, 100% on hover
- **Icon**: Trust Blue
- **Background**: White

### Card 2: Home Lockout
- **Border**: Trust Green (#10B981) at 30% opacity, 100% on hover
- **Icon**: Trust Green
- **Background**: White

### Card 3: Security Upgrade
- **Border**: Gold (#FBBF24) at 30% opacity, 100% on hover
- **Icon**: Gold (#F59E0B)
- **Background**: White

### Card 4: Business Security
- **Border**: Charcoal (#4B5563) at 30% opacity, 100% on hover
- **Icon**: Charcoal (#374151)
- **Background**: White

## Hover States

### Before Hover
```
┌─────────────────────────┐
│                         │
│      [ICON]             │  ← Normal size
│      (Color)            │
│                         │
│   Problem Title         │  ← Charcoal-900
│                         │
│   Description text...   │
│                         │
│                         │  ← "Learn More" hidden
└─────────────────────────┘
   Border: 30% opacity
   Shadow: sm
```

### On Hover
```
┌─────────────────────────┐
│                         │
│      [ICON]             │  ← Scaled 110%
│      (Color)            │
│                         │
│   Problem Title         │  ← Gold-600
│                         │
│   Description text...   │
│                         │
│   Learn More →          │  ← Visible, arrow moves
└─────────────────────────┘
   Border: 100% opacity
   Shadow: xl
```

## Animation Timeline

### Page Load (Entrance)
```
0.0s: Section appears
0.0s: Card 1 fades in from bottom
0.1s: Card 2 fades in from bottom
0.2s: Card 3 fades in from bottom
0.3s: Card 4 fades in from bottom
```

### Hover Interaction
```
0.0s: User hovers over card
0.0s: Border opacity increases (300ms transition)
0.0s: Shadow elevates (300ms transition)
0.0s: Icon scales to 110% (300ms transition)
0.0s: Title color changes to gold (300ms transition)
0.0s: "Learn More" fades in (300ms transition)
0.0s: Arrow translates right (300ms transition)
```

## Typography

### Section Heading
- **Font**: Montserrat (display font)
- **Size**: 
  - Mobile: 3xl (1.875rem)
  - Tablet: 4xl (2.25rem)
  - Desktop: 5xl (3rem)
- **Weight**: Bold (700)
- **Color**: Charcoal-900 with Gold-500 accent

### Section Subheading
- **Font**: Inter (sans font)
- **Size**: 
  - Mobile: lg (1.125rem)
  - Tablet/Desktop: xl (1.25rem)
- **Weight**: Normal (400)
- **Color**: Charcoal-600

### Card Titles
- **Font**: Montserrat (display font)
- **Size**: 
  - Mobile: xl (1.25rem)
  - Tablet/Desktop: 2xl (1.5rem)
- **Weight**: Bold (700)
- **Color**: Charcoal-900 (Gold-600 on hover)

### Card Descriptions
- **Font**: Inter (sans font)
- **Size**: Base (1rem)
- **Weight**: Normal (400)
- **Color**: Charcoal-600
- **Line Height**: Relaxed (1.625)

## Spacing

### Section Padding
- **Mobile**: py-16 (4rem top/bottom)
- **Desktop**: py-24 (6rem top/bottom)

### Card Padding
- **All Sizes**: p-8 (2rem all sides)

### Grid Gap
- **Mobile/Tablet**: gap-6 (1.5rem)
- **Desktop**: gap-8 (2rem)

### Internal Card Spacing
- Icon to Title: mb-6 (1.5rem)
- Title to Description: space-y-3 (0.75rem)
- Description to "Learn More": mt-6 (1.5rem)

## Accessibility Features

### Keyboard Navigation
- All cards are focusable
- Focus indicators visible (2px gold outline)
- Tab order follows visual order

### Screen Readers
- Icons marked as `aria-hidden="true"`
- Semantic HTML (section, h2, h3, p)
- Descriptive text for all content

### Reduced Motion
- Animations disabled when `prefers-reduced-motion: reduce`
- Hover effects still work but without transforms
- Content remains fully accessible

## Performance Optimizations

### GPU Acceleration
- `will-change: transform` on animated elements
- `translate3d` for smooth animations
- Transform and opacity for 60fps animations

### CSS Optimization
- Tailwind utility classes (purged in production)
- Minimal custom CSS
- Reusable component patterns

## SEO Benefits

### Semantic Structure
```html
<section> (Problems We Solve)
  <h2> (Main heading with keyword)
  <p> (Supporting text)
  <div> (Grid container)
    <h3> (Problem title - 4x)
    <p> (Problem description - 4x)
```

### Keywords Naturally Integrated
- "locksmith services"
- "automotive locksmith"
- "residential lockout"
- "commercial locksmith"
- "security upgrades"
- "master key systems"
- "access control"

### Content Quality
- Addresses user pain points
- Provides clear solutions
- Builds trust and empathy
- Encourages action (CTAs)

---

**Implementation Complete**: ✅
**Ready for Review**: ✅
**Meets All Requirements**: ✅
