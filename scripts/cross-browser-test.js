/**
 * Cross-Browser Testing Script
 * 
 * This script performs basic automated checks on all pages
 * to ensure they load correctly and contain expected elements.
 * 
 * Usage:
 *   node scripts/cross-browser-test.js
 *   TEST_URL=https://your-site.com node scripts/cross-browser-test.js
 */

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services Main' },
  { path: '/services/emergency-locksmith', name: 'Emergency Locksmith' },
  { path: '/services/residential-locksmith', name: 'Residential Locksmith' },
  { path: '/services/commercial-locksmith', name: 'Commercial Locksmith' },
  { path: '/services/automotive-locksmith', name: 'Automotive Locksmith' },
  { path: '/service-areas', name: 'Service Areas' },
  { path: '/faq', name: 'FAQ' },
  { path: '/reviews', name: 'Reviews' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/book-service', name: 'Book Service' },
  { path: '/privacy-policy', name: 'Privacy Policy' },
  { path: '/terms-of-service', name: 'Terms of Service' },
  { path: '/accessibility', name: 'Accessibility' }
];

const requiredElements = {
  title: /<title>.*<\/title>/,
  h1: /<h1[^>]*>.*<\/h1>/,
  nav: /<nav[^>]*>/,
  footer: /<footer[^>]*>/,
  header: /<header[^>]*>/,
  main: /<main[^>]*>/
};

async function testPage(baseUrl, page) {
  const url = `${baseUrl}${page.path}`;
  const results = {
    name: page.name,
    path: page.path,
    url: url,
    status: null,
    loads: false,
    elements: {},
    errors: [],
    warnings: []
  };

  try {
    const response = await fetch(url);
    results.status = response.status;
    results.loads = response.ok;

    if (!response.ok) {
      results.errors.push(`HTTP ${response.status}: ${response.statusText}`);
      return results;
    }

    const html = await response.text();

    // Check for required elements
    for (const [element, pattern] of Object.entries(requiredElements)) {
      results.elements[element] = pattern.test(html);
      if (!results.elements[element]) {
        results.warnings.push(`Missing or malformed <${element}>`);
      }
    }

    // Check for common issues
    if (html.includes('404') || html.includes('Not Found')) {
      results.errors.push('Page contains 404 or Not Found text');
    }

    if (html.includes('error') && !html.includes('error-message')) {
      results.warnings.push('Page contains "error" text');
    }

    // Check for emojis (should not be present)
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    if (emojiRegex.test(html)) {
      results.errors.push('Page contains emoji characters');
    }

    // Check for pricing information (should not be present)
    const pricingRegex = /\$\d+|\d+\s*dollars?/i;
    if (pricingRegex.test(html)) {
      results.warnings.push('Page may contain pricing information');
    }

    // Check for meta description
    if (!html.includes('<meta name="description"')) {
      results.warnings.push('Missing meta description');
    }

    // Check for viewport meta tag
    if (!html.includes('<meta name="viewport"')) {
      results.errors.push('Missing viewport meta tag');
    }

    // Check for phone number
    if (!html.includes('864-900-9597') && !html.includes('8649009597')) {
      results.warnings.push('Phone number not found on page');
    }

  } catch (error) {
    results.errors.push(`Fetch error: ${error.message}`);
  }

  return results;
}

function printResults(results) {
  const statusIcon = results.loads ? '✅' : '❌';
  const errorCount = results.errors.length;
  const warningCount = results.warnings.length;

  console.log(`\n${statusIcon} ${results.name} (${results.path})`);
  console.log(`   Status: ${results.status || 'N/A'}`);
  
  if (results.loads) {
    const elementChecks = Object.entries(results.elements)
      .map(([el, present]) => `${present ? '✓' : '✗'} ${el}`)
      .join(', ');
    console.log(`   Elements: ${elementChecks}`);
  }

  if (errorCount > 0) {
    console.log(`   ❌ Errors (${errorCount}):`);
    results.errors.forEach(err => console.log(`      - ${err}`));
  }

  if (warningCount > 0) {
    console.log(`   ⚠️  Warnings (${warningCount}):`);
    results.warnings.forEach(warn => console.log(`      - ${warn}`));
  }
}

function printSummary(allResults) {
  const total = allResults.length;
  const passed = allResults.filter(r => r.loads && r.errors.length === 0).length;
  const failed = allResults.filter(r => !r.loads || r.errors.length > 0).length;
  const warnings = allResults.reduce((sum, r) => sum + r.warnings.length, 0);

  console.log('\n' + '='.repeat(60));
  console.log('TESTING SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Pages: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Total Warnings: ${warnings}`);
  console.log('='.repeat(60));

  if (failed > 0) {
    console.log('\n❌ FAILED PAGES:');
    allResults
      .filter(r => !r.loads || r.errors.length > 0)
      .forEach(r => {
        console.log(`   - ${r.name} (${r.path})`);
        r.errors.forEach(err => console.log(`     • ${err}`));
      });
  }

  return failed === 0;
}

async function runTests() {
  const baseUrl = process.env.TEST_URL || 'http://localhost:4321';

  console.log('='.repeat(60));
  console.log('CROSS-BROWSER TESTING SCRIPT');
  console.log('='.repeat(60));
  console.log(`Testing site at: ${baseUrl}`);
  console.log(`Total pages to test: ${pages.length}`);
  console.log('='.repeat(60));

  const allResults = [];

  for (const page of pages) {
    const results = await testPage(baseUrl, page);
    allResults.push(results);
    printResults(results);
  }

  const success = printSummary(allResults);

  if (!success) {
    process.exit(1);
  }
}

// Run the tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
