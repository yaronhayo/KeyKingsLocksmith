# Task 11: FAQ Preview Section - Visual Preview

## Homepage FAQ Section Design

### Section Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              Frequently Asked Questions                       │
│     Find answers to common questions about our services       │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  How long does it take to unlock a car?              [▼]     │  ← Collapsed
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  What areas do you serve?                            [▲]     │  ← Expanded
├─────────────────────────────────────────────────────────────┤
│  We serve Anderson, Greenville, Clemson, Easley, and         │
│  surrounding Upstate South Carolina areas. Call us to        │
│  confirm service in your area.                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  How much does locksmith service cost?               [▼]     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Are you licensed and insured?                       [▼]     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  What payment methods do you accept?                 [▼]     │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────────────┐
                    │  View All FAQs    →  │  ← Gold button
                    └──────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              Still have questions?                            │
│   Our team is here to help. Contact us and we'll answer      │
│              any questions you have.                          │
│                                                               │
│   ┌──────────────────────┐  ┌──────────────────────┐        │
│   │ 📞 Call: (864) 900-  │  │  Send a Message      │        │
│   │      9597            │  │                      │        │
│   └──────────────────────┘  └──────────────────────┘        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Color Scheme

### FAQ Items
- **Background**: White (#FFFFFF)
- **Border**: Charcoal-200 (#E5E7EB) → Gold-400 (#FBBF24) on hover
- **Text**: Charcoal-900 (#111827)
- **Icon**: Gold-400 (#FBBF24)
- **Hover Background**: Gold-50 (#FFFBEB)

### View All Button
- **Background**: Gold-400 (#FBBF24)
- **Text**: Charcoal-900 (#111827)
- **Hover**: Gold-500 (#F59E0B) with lift effect

### CTA Section
- **Background**: Gradient from Gold-50 to Charcoal-50
- **Border**: Gold-200 (#FDE68A)
- **Primary Button**: Gold-400 background
- **Secondary Button**: Charcoal-300 border

## Animation Behavior

### Expand Animation (300ms)
```
State: Collapsed → Expanded

1. Icon rotates 180° (chevron points up)
2. Answer section slides down
3. Opacity fades in (0 → 1)
4. Content translates up (-10px → 0)
5. Border color changes to gold-400
```

### Collapse Animation (300ms)
```
State: Expanded → Collapsed

1. Icon rotates back 0° (chevron points down)
2. Answer section slides up
3. Opacity fades out (1 → 0)
4. Content translates down (0 → -10px)
5. Border color returns to charcoal-200
```

### Hover Effects
```
FAQ Item Hover:
- Border: charcoal-200 → gold-400 (300ms)
- Background: white → gold-50 (300ms)

View All Button Hover:
- Background: gold-400 → gold-500 (300ms)
- Transform: translateY(0) → translateY(-2px)
- Shadow: none → large shadow

CTA Button Hover:
- Background: gold-400 → gold-500 (300ms)
- Transform: translateY(0) → translateY(-2px)
- Shadow: none → large shadow
```

## Interactive States

### Default State
```
┌─────────────────────────────────────────────┐
│  Question text                        [▼]   │  ← Charcoal-200 border
└─────────────────────────────────────────────┘
```

### Hover State
```
┌═════════════════════════════════════════════┐
│  Question text                        [▼]   │  ← Gold-400 border
└═════════════════════════════════════════════┘  ← Gold-50 background
```

### Expanded State
```
┌═════════════════════════════════════════════┐
│  Question text                        [▲]   │  ← Gold-400 border
├─────────────────────────────────────────────┤
│  Answer content appears here with smooth    │
│  slide-down animation and fade-in effect.   │
└─────────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (1024px+)
- Max width: 1024px (4xl container)
- Full padding: 24px
- Two-column CTA buttons

### Tablet (768px - 1023px)
- Max width: 768px
- Medium padding: 16px
- Two-column CTA buttons

### Mobile (< 768px)
- Full width with padding
- Reduced padding: 12px
- Stacked CTA buttons
- Smaller text sizes

## Accessibility Features

### Keyboard Navigation
- Tab through questions
- Enter/Space to expand/collapse
- Focus indicators visible
- Proper tab order

### Screen Reader Support
- `aria-expanded` attribute updates
- `aria-controls` links question to answer
- Semantic HTML structure
- Descriptive button labels

### Reduced Motion
- Animations disabled when `prefers-reduced-motion: reduce`
- Instant expand/collapse
- No icon rotation animation
- Maintains functionality

## Content Structure

### 5 Featured FAQs
1. **Emergency**: How long does it take to unlock a car?
2. **General**: What areas do you serve?
3. **Pricing**: How much does locksmith service cost?
4. **General**: Are you licensed and insured?
5. **General**: What payment methods do you accept?

### CTA Section
- **Headline**: "Still have questions?"
- **Subtext**: Encouraging message
- **Primary CTA**: Call button with phone number
- **Secondary CTA**: Contact form link

## Brand Consistency

### Typography
- **Headings**: Montserrat (display font)
- **Body**: Inter (sans-serif)
- **Weights**: 
  - Questions: 600 (semibold)
  - Answers: 400 (regular)
  - Buttons: 600 (semibold)

### Spacing
- Section padding: 64px vertical
- Item spacing: 16px between FAQs
- Internal padding: 24px
- Button gap: 16px

### Border Radius
- FAQ items: 8px (rounded-lg)
- Buttons: 8px (rounded-lg)
- CTA section: 12px (rounded-xl)

## Performance Metrics

### Animation Performance
- 60fps smooth animations
- GPU-accelerated transforms
- Optimized CSS transitions
- No layout thrashing

### Load Performance
- Minimal JavaScript
- CSS-only animations
- No external dependencies
- Fast initial render

### Accessibility Score
- WCAG 2.1 AA compliant
- Keyboard accessible
- Screen reader friendly
- Color contrast ratios met

---

## Implementation Notes

The FAQ preview section successfully integrates Key Kings brand identity while maintaining excellent usability and accessibility. The gold and charcoal color scheme creates a professional, trustworthy appearance that differentiates the site from generic locksmith templates.

The smooth animations enhance user experience without sacrificing performance, and the "View All FAQs" link encourages deeper engagement with the site content.
