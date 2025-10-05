# Key Kings Color Reference Guide

## Quick Reference

### Primary Colors
```
🟡 Gold-400 (#FBBF24)  - Primary brand color, CTAs, links
🟠 Gold-500 (#F59E0B)  - Secondary actions, hover states
🟤 Gold-600 (#D97706)  - Error states, dark accents
```

### Neutral Colors
```
⬛ Charcoal-900 (#111827) - Headings, primary text
⬛ Charcoal-800 (#1F2937) - Secondary backgrounds
⬛ Charcoal-700 (#374151) - Tertiary text
⬛ Charcoal-500 (#6B7280) - Muted text, placeholders
⬛ Charcoal-200 (#E5E7EB) - Borders, dividers
⬛ Charcoal-50  (#F9FAFB) - Light backgrounds
⬜ White (#FFFFFF)       - Main backgrounds, text on dark
```

## Component Color Usage

### Buttons

#### Primary Button (Call-to-Action)
```html
<button class="bg-gold-400 text-charcoal-900 hover:bg-gold-500">
  Book Now
</button>
```
- Background: Gold-400
- Text: Charcoal-900
- Hover: Gold-500

#### Secondary Button
```html
<button class="bg-charcoal-900 text-white hover:bg-charcoal-800">
  Learn More
</button>
```
- Background: Charcoal-900
- Text: White
- Hover: Charcoal-800

#### Outline Button
```html
<button class="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900">
  Contact Us
</button>
```
- Border: Gold-400
- Text: Gold-400
- Hover Background: Gold-400
- Hover Text: Charcoal-900

### Cards

#### Standard Card
```html
<div class="bg-white border-2 border-charcoal-200 hover:border-gold-400">
  <h3 class="text-charcoal-900">Card Title</h3>
  <p class="text-charcoal-600">Card description</p>
</div>
```
- Background: White
- Border: Charcoal-200
- Hover Border: Gold-400
- Title: Charcoal-900
- Text: Charcoal-600

#### Featured Card
```html
<div class="bg-gradient-to-br from-gold-50 to-charcoal-50 border-2 border-gold-200">
  <h3 class="text-charcoal-900">Featured</h3>
  <p class="text-charcoal-700">Special content</p>
</div>
```
- Background: Gradient (Gold-50 to Charcoal-50)
- Border: Gold-200
- Title: Charcoal-900
- Text: Charcoal-700

### Forms

#### Input Fields
```html
<input class="border border-charcoal-200 focus:border-gold-400 text-charcoal-900">
```
- Border: Charcoal-200
- Focus Border: Gold-400
- Text: Charcoal-900
- Background: White

#### Labels
```html
<label class="text-charcoal-700 font-medium">
  Field Name
</label>
```
- Text: Charcoal-700
- Weight: Medium (500)

#### Validation Messages

**Success:**
```html
<div class="text-gold-600 bg-gold-50 border border-gold-200">
  ✓ Success message
</div>
```

**Error:**
```html
<div class="text-gold-700 bg-gold-50 border border-gold-600">
  ✗ Error message
</div>
```

**Warning:**
```html
<div class="text-gold-700 bg-gold-100 border border-gold-500">
  ⚠ Warning message
</div>
```

### Navigation

#### Header
```html
<header class="bg-white border-b border-charcoal-200">
  <nav>
    <a class="text-charcoal-700 hover:text-gold-400">Link</a>
  </nav>
</header>
```
- Background: White
- Border: Charcoal-200
- Link Text: Charcoal-700
- Link Hover: Gold-400

#### Footer
```html
<footer class="bg-charcoal-900 text-white">
  <a class="text-charcoal-300 hover:text-gold-400">Link</a>
</footer>
```
- Background: Charcoal-900
- Text: White
- Link Text: Charcoal-300
- Link Hover: Gold-400

### Typography

#### Headings
```html
<h1 class="text-charcoal-900">Main Heading</h1>
<h2 class="text-charcoal-900">Section Heading</h2>
<h3 class="text-charcoal-800">Subsection</h3>
```

#### Body Text
```html
<p class="text-charcoal-700">Regular paragraph text</p>
<p class="text-charcoal-600">Secondary information</p>
<p class="text-charcoal-500">Muted or helper text</p>
```

#### Accent Text
```html
<span class="text-gold-400">Highlighted text</span>
<span class="text-gold-500">Strong emphasis</span>
```

### Icons

#### Primary Icons
```html
<svg class="text-gold-400">...</svg>
```

#### Secondary Icons
```html
<svg class="text-charcoal-600">...</svg>
```

#### Icons on Dark Background
```html
<svg class="text-gold-400">...</svg>
<svg class="text-white">...</svg>
```

### Backgrounds

#### Section Backgrounds
```html
<!-- Light section -->
<section class="bg-white">...</section>

<!-- Alternate section -->
<section class="bg-charcoal-50">...</section>

<!-- Dark section -->
<section class="bg-charcoal-900 text-white">...</section>

<!-- Accent section -->
<section class="bg-gold-50">...</section>
```

### Borders & Dividers

#### Standard Border
```html
<div class="border border-charcoal-200">...</div>
```

#### Emphasized Border
```html
<div class="border-2 border-gold-400">...</div>
```

#### Divider
```html
<hr class="border-charcoal-200">
```

### Loading States

#### Spinner
```html
<div class="text-gold-400 animate-spin">
  <!-- Spinner SVG -->
</div>
```

#### Progress Bar
```html
<div class="bg-charcoal-200 rounded-full">
  <div class="bg-gold-400 rounded-full h-2"></div>
</div>
```

#### Skeleton
```html
<div class="bg-charcoal-200 animate-pulse rounded">
  <!-- Skeleton content -->
</div>
```

## Color Combinations

### High Contrast (Best for CTAs)
- Gold-400 on Charcoal-900
- White on Charcoal-900
- Charcoal-900 on Gold-400

### Medium Contrast (Body Content)
- Charcoal-700 on White
- Charcoal-600 on Charcoal-50
- Gold-600 on White

### Low Contrast (Subtle Elements)
- Charcoal-500 on White
- Charcoal-400 on Charcoal-50
- Gold-200 on Gold-50

## Accessibility Guidelines

### Minimum Contrast Ratios (WCAG AA)
- **Normal text**: 4.5:1
- **Large text**: 3:1
- **UI components**: 3:1

### Recommended Combinations
✅ Charcoal-900 on White (16.1:1)
✅ Charcoal-800 on White (13.1:1)
✅ Charcoal-700 on White (9.7:1)
✅ Gold-400 on Charcoal-900 (8.2:1)
✅ White on Charcoal-900 (16.1:1)
✅ Gold-600 on White (5.8:1)

### Avoid These Combinations
❌ Gold-400 on White (1.9:1) - Too low contrast
❌ Charcoal-500 on Charcoal-200 (2.1:1) - Too low contrast
❌ Gold-200 on White (1.2:1) - Too low contrast

## Dark Mode Considerations

If implementing dark mode in the future:

### Dark Mode Palette
```
Background: Charcoal-900
Surface: Charcoal-800
Primary: Gold-400
Text: Charcoal-50
Muted: Charcoal-400
```

### Dark Mode Examples
```html
<!-- Dark mode card -->
<div class="dark:bg-charcoal-800 dark:border-charcoal-700">
  <h3 class="dark:text-charcoal-50">Title</h3>
  <p class="dark:text-charcoal-300">Content</p>
</div>

<!-- Dark mode button -->
<button class="dark:bg-gold-400 dark:text-charcoal-900">
  Click Me
</button>
```

## Brand Guidelines

### Do's ✅
- Use gold for primary actions and CTAs
- Use charcoal for text and backgrounds
- Maintain high contrast for readability
- Use white space generously
- Keep color usage consistent

### Don'ts ❌
- Don't use red, green, or blue
- Don't use low-contrast combinations
- Don't overuse gold (reserve for important elements)
- Don't mix warm and cool tones
- Don't use colors alone to convey meaning

## Quick Copy-Paste Classes

### Buttons
```
Primary:   bg-gold-400 text-charcoal-900 hover:bg-gold-500
Secondary: bg-charcoal-900 text-white hover:bg-charcoal-800
Outline:   border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900
```

### Cards
```
Standard:  bg-white border-2 border-charcoal-200 hover:border-gold-400
Featured:  bg-gradient-to-br from-gold-50 to-charcoal-50 border-2 border-gold-200
```

### Text
```
Heading:   text-charcoal-900
Body:      text-charcoal-700
Muted:     text-charcoal-500
Accent:    text-gold-400
```

### Backgrounds
```
Light:     bg-white
Alt:       bg-charcoal-50
Dark:      bg-charcoal-900
Accent:    bg-gold-50
```

---

**Last Updated**: January 3, 2025
**Version**: 1.0
**Status**: Active ✅
