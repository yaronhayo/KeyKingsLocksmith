/**
 * Responsive Design Testing Helper
 * 
 * This script helps test responsive breakpoints by generating
 * a report of common device sizes and their expected layouts.
 * 
 * Usage:
 *   node scripts/test-responsive.js
 */

const devices = {
  mobile: {
    'iPhone SE': { width: 375, height: 667 },
    'iPhone 12/13/14': { width: 390, height: 844 },
    'iPhone 14 Pro Max': { width: 430, height: 932 },
    'Samsung Galaxy S21': { width: 360, height: 800 },
    'Google Pixel 5': { width: 393, height: 851 },
    'Small Android': { width: 320, height: 568 }
  },
  tablet: {
    'iPad Mini': { width: 768, height: 1024 },
    'iPad': { width: 810, height: 1080 },
    'iPad Pro 11"': { width: 834, height: 1194 },
    'iPad Pro 12.9"': { width: 1024, height: 1366 },
    'Android Tablet 7"': { width: 600, height: 960 },
    'Android Tablet 10"': { width: 800, height: 1280 }
  },
  desktop: {
    'Laptop (13")': { width: 1280, height: 800 },
    'Laptop (15")': { width: 1440, height: 900 },
    'Desktop (1080p)': { width: 1920, height: 1080 },
    'Desktop (1440p)': { width: 2560, height: 1440 },
    'Desktop (4K)': { width: 3840, height: 2160 }
  }
};

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

function getBreakpoint(width) {
  if (width < breakpoints.sm) return 'xs (< 640px)';
  if (width < breakpoints.md) return 'sm (640px - 767px)';
  if (width < breakpoints.lg) return 'md (768px - 1023px)';
  if (width < breakpoints.xl) return 'lg (1024px - 1279px)';
  if (width < breakpoints['2xl']) return 'xl (1280px - 1535px)';
  return '2xl (≥ 1536px)';
}

function getExpectedLayout(width) {
  if (width < 640) {
    return {
      columns: 1,
      navigation: 'Mobile menu (hamburger)',
      hero: 'Stacked layout, full-width',
      services: '1 column grid',
      footer: 'Stacked sections',
      fontSize: 'Base (16px)',
      spacing: 'Compact'
    };
  } else if (width < 768) {
    return {
      columns: 1,
      navigation: 'Mobile menu (hamburger)',
      hero: 'Stacked layout, full-width',
      services: '1-2 column grid',
      footer: 'Stacked sections',
      fontSize: 'Base (16px)',
      spacing: 'Comfortable'
    };
  } else if (width < 1024) {
    return {
      columns: 2,
      navigation: 'Horizontal menu or hamburger',
      hero: 'Side-by-side or stacked',
      services: '2-3 column grid',
      footer: '2-3 column layout',
      fontSize: 'Base (16px)',
      spacing: 'Comfortable'
    };
  } else if (width < 1280) {
    return {
      columns: 3,
      navigation: 'Full horizontal menu',
      hero: 'Side-by-side layout',
      services: '3-4 column grid',
      footer: '4 column layout',
      fontSize: 'Base (16px)',
      spacing: 'Spacious'
    };
  } else {
    return {
      columns: 4,
      navigation: 'Full horizontal menu',
      hero: 'Side-by-side layout',
      services: '4 column grid',
      footer: '4 column layout',
      fontSize: 'Base to Large (16-18px)',
      spacing: 'Spacious'
    };
  }
}

function printDeviceReport() {
  console.log('='.repeat(80));
  console.log('RESPONSIVE DESIGN TESTING GUIDE');
  console.log('='.repeat(80));
  console.log('\nTailwind CSS Breakpoints:');
  Object.entries(breakpoints).forEach(([name, width]) => {
    console.log(`  ${name}: ${width}px`);
  });
  console.log('\n');

  for (const [category, deviceList] of Object.entries(devices)) {
    console.log('='.repeat(80));
    console.log(`${category.toUpperCase()} DEVICES`);
    console.log('='.repeat(80));

    for (const [deviceName, dimensions] of Object.entries(deviceList)) {
      const breakpoint = getBreakpoint(dimensions.width);
      const layout = getExpectedLayout(dimensions.width);

      console.log(`\n📱 ${deviceName}`);
      console.log(`   Dimensions: ${dimensions.width}x${dimensions.height}px`);
      console.log(`   Breakpoint: ${breakpoint}`);
      console.log(`   Expected Layout:`);
      console.log(`     - Columns: ${layout.columns}`);
      console.log(`     - Navigation: ${layout.navigation}`);
      console.log(`     - Hero: ${layout.hero}`);
      console.log(`     - Services: ${layout.services}`);
      console.log(`     - Footer: ${layout.footer}`);
      console.log(`     - Font Size: ${layout.fontSize}`);
      console.log(`     - Spacing: ${layout.spacing}`);
    }
    console.log('\n');
  }
}

function printTestingChecklist() {
  console.log('='.repeat(80));
  console.log('RESPONSIVE TESTING CHECKLIST');
  console.log('='.repeat(80));
  console.log('\nFor each device/screen size, verify:');
  console.log('  [ ] No horizontal scrolling');
  console.log('  [ ] All text is readable (min 16px)');
  console.log('  [ ] Touch targets are adequate (min 44x44px)');
  console.log('  [ ] Images scale properly');
  console.log('  [ ] Navigation is accessible');
  console.log('  [ ] Forms are usable');
  console.log('  [ ] Content hierarchy is clear');
  console.log('  [ ] White space is balanced');
  console.log('  [ ] CTAs are prominent');
  console.log('  [ ] Footer is organized');
  console.log('\n');
}

function printBrowserDevToolsInstructions() {
  console.log('='.repeat(80));
  console.log('BROWSER DEVTOOLS TESTING INSTRUCTIONS');
  console.log('='.repeat(80));
  console.log('\nChrome DevTools:');
  console.log('  1. Open DevTools (F12 or Cmd+Option+I)');
  console.log('  2. Click "Toggle device toolbar" (Cmd+Shift+M)');
  console.log('  3. Select device from dropdown or enter custom dimensions');
  console.log('  4. Test both portrait and landscape orientations');
  console.log('  5. Use "Responsive" mode to drag and resize');
  console.log('\nFirefox Developer Tools:');
  console.log('  1. Open Developer Tools (F12 or Cmd+Option+I)');
  console.log('  2. Click "Responsive Design Mode" (Cmd+Option+M)');
  console.log('  3. Select device preset or enter custom size');
  console.log('  4. Test touch simulation');
  console.log('\nSafari Web Inspector:');
  console.log('  1. Enable Developer menu (Preferences > Advanced)');
  console.log('  2. Develop > Enter Responsive Design Mode');
  console.log('  3. Select device from presets');
  console.log('  4. Test on actual iOS devices via Safari on Mac');
  console.log('\n');
}

function printTestingTips() {
  console.log('='.repeat(80));
  console.log('TESTING TIPS');
  console.log('='.repeat(80));
  console.log('\n1. Test on Real Devices:');
  console.log('   - Emulators are helpful but not perfect');
  console.log('   - Test on at least one iOS and one Android device');
  console.log('   - Borrow devices from friends/family if needed');
  console.log('\n2. Test Different Orientations:');
  console.log('   - Portrait mode (most common)');
  console.log('   - Landscape mode (especially for tablets)');
  console.log('   - Rotation transitions');
  console.log('\n3. Test Different Browsers:');
  console.log('   - iOS: Safari (primary), Chrome');
  console.log('   - Android: Chrome (primary), Firefox, Samsung Internet');
  console.log('\n4. Test Touch Interactions:');
  console.log('   - Tap targets (buttons, links)');
  console.log('   - Swipe gestures (carousels)');
  console.log('   - Pinch-to-zoom (maps)');
  console.log('   - Scroll behavior');
  console.log('\n5. Test Performance:');
  console.log('   - Throttle network to 3G/4G');
  console.log('   - Check page load times');
  console.log('   - Monitor memory usage');
  console.log('   - Test on older devices');
  console.log('\n6. Test Accessibility:');
  console.log('   - Zoom to 200%');
  console.log('   - Test with screen reader');
  console.log('   - Verify keyboard navigation');
  console.log('   - Check color contrast');
  console.log('\n');
}

function generateTestingScript() {
  console.log('='.repeat(80));
  console.log('AUTOMATED TESTING SCRIPT');
  console.log('='.repeat(80));
  console.log('\nTo test all breakpoints automatically, use Chrome DevTools Protocol:');
  console.log('\n```javascript');
  console.log('// Run in browser console');
  console.log('const sizes = [');
  console.log('  { name: "Mobile Small", width: 320, height: 568 },');
  console.log('  { name: "Mobile Medium", width: 375, height: 667 },');
  console.log('  { name: "Mobile Large", width: 414, height: 896 },');
  console.log('  { name: "Tablet Portrait", width: 768, height: 1024 },');
  console.log('  { name: "Tablet Landscape", width: 1024, height: 768 },');
  console.log('  { name: "Desktop Small", width: 1280, height: 800 },');
  console.log('  { name: "Desktop Large", width: 1920, height: 1080 }');
  console.log('];');
  console.log('');
  console.log('sizes.forEach(size => {');
  console.log('  console.log(`Testing ${size.name}: ${size.width}x${size.height}`);');
  console.log('  window.resizeTo(size.width, size.height);');
  console.log('  // Add your test assertions here');
  console.log('});');
  console.log('```');
  console.log('\n');
}

// Run the report
console.clear();
printDeviceReport();
printTestingChecklist();
printBrowserDevToolsInstructions();
printTestingTips();
generateTestingScript();

console.log('='.repeat(80));
console.log('For automated testing, run: node scripts/cross-browser-test.js');
console.log('For manual testing, follow the checklist in CROSS-BROWSER-TESTING-GUIDE.md');
console.log('='.repeat(80));
