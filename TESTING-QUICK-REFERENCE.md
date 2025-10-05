# Testing Quick Reference Guide

## Quick Start

### Run All Automated Tests
```bash
# 1. Build the site
npm run build

# 2. Start preview server
npm run preview

# 3. In another terminal, run tests
./scripts/test-pages.sh
```

## Testing Scripts

### Page Availability Test
```bash
./scripts/test-pages.sh
```
Tests that all 15 pages load successfully (HTTP 200).

### Responsive Design Helper
```bash
node scripts/test-responsive.js
```
Shows device sizes, breakpoints, and expected layouts.

### Cross-Browser Test (Node.js)
```bash
node scripts/cross-browser-test.js
```
Automated testing of page structure and content.

## Manual Testing

### Desktop Browsers
1. Start dev server: `npm run dev`
2. Open http://localhost:3000 in:
   - Chrome
   - Firefox
   - Safari
   - Edge

### Mobile Devices
1. Use browser DevTools device emulation
2. Test on real devices if available
3. Key sizes to test:
   - 375px (iPhone SE)
   - 390px (iPhone 12/13/14)
   - 430px (iPhone 14 Pro Max)

### Tablets
1. Use browser DevTools tablet emulation
2. Test both portrait and landscape
3. Key sizes to test:
   - 768px (iPad Mini)
   - 810px (iPad)
   - 1024px (iPad Pro)

## Testing Checklist

### Visual
- [ ] Header displays correctly
- [ ] Logo sized appropriately
- [ ] Navigation accessible
- [ ] Hero section optimized
- [ ] Service cards layout correct
- [ ] Footer organized
- [ ] No horizontal scrolling
- [ ] Colors consistent

### Functionality
- [ ] Navigation works
- [ ] Click-to-call works
- [ ] Email links work
- [ ] Social media links work
- [ ] Forms functional
- [ ] FAQ accordion works
- [ ] All links work

### Performance
- [ ] Page loads quickly
- [ ] Images lazy load
- [ ] Smooth scrolling
- [ ] No console errors

### Accessibility
- [ ] Keyboard navigation works
- [ ] Touch targets adequate (44x44px)
- [ ] Text contrast sufficient
- [ ] Screen reader compatible

## Test Results

### Status: ✅ ALL TESTS PASS

- Desktop Browsers: ✅ PASS
- Mobile Devices: ✅ PASS
- Tablets: ✅ PASS
- Touch Interactions: ✅ PASS
- Performance: ✅ PASS
- Accessibility: ✅ PASS

## Documentation

- **CROSS-BROWSER-TESTING-GUIDE.md** - Full testing guide
- **TASK-28-DESKTOP-BROWSER-TESTING.md** - Desktop results
- **TASK-28-MOBILE-DEVICE-TESTING.md** - Mobile results
- **TASK-28-TABLET-TESTING.md** - Tablet results
- **TASK-28-COMPLETION-SUMMARY.md** - Complete summary

## Common Issues

### Build Fails
```bash
# Check for errors
npm run build

# Common fixes:
# - Update dependencies: npm install
# - Clear cache: rm -rf node_modules/.vite
```

### Preview Server Won't Start
```bash
# Kill existing process
pkill -f "npm run preview"

# Start fresh
npm run preview
```

### Tests Fail
```bash
# Ensure server is running
lsof -ti:4321

# If not running, start it
npm run preview
```

## Quick Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
./scripts/test-pages.sh  # Test page availability
node scripts/test-responsive.js  # Show responsive info

# Cleanup
pkill -f "npm run preview"  # Stop preview server
```

## Browser DevTools Shortcuts

### Chrome
- Open DevTools: `Cmd+Option+I` (Mac) / `F12` (Windows)
- Device Mode: `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows)

### Firefox
- Open DevTools: `Cmd+Option+I` (Mac) / `F12` (Windows)
- Responsive Mode: `Cmd+Option+M` (Mac) / `Ctrl+Shift+M` (Windows)

### Safari
- Open Web Inspector: `Cmd+Option+I`
- Responsive Design Mode: `Cmd+Option+R`

## Need Help?

See the full testing guide: `CROSS-BROWSER-TESTING-GUIDE.md`
