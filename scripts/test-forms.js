#!/usr/bin/env node

/**
 * Form Submission Test Script
 * 
 * Tests all form endpoints with various scenarios:
 * - Valid submissions
 * - Invalid data
 * - Missing fields
 * - Spam detection
 * 
 * Usage: node scripts/test-forms.js [form-type]
 * form-type: booking, contact, newsletter, all (default)
 */

const BASE_URL = process.env.SITE_URL || 'http://localhost:4321';

// Test data
const VALID_BOOKING = {
  name: 'John Smith',
  phone: '(864) 900-9597',
  email: 'john.smith@example.com',
  address: '123 Main St, Anderson, SC 29621',
  serviceType: 'Car Lockout',
  urgency: 'asap',
  notes: 'Locked keys in trunk, need help ASAP',
  timestamp: new Date().toISOString(),
  requestId: `test_booking_${Date.now()}`,
};

const VALID_CONTACT = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '(864) 555-0123',
  subject: 'Question about residential services',
  message: 'I recently moved into a new home and want to rekey all the locks. Can you help?',
  timestamp: new Date().toISOString(),
  requestId: `test_contact_${Date.now()}`,
};

const VALID_NEWSLETTER = {
  email: 'subscriber@example.com',
  source: 'test-script',
  timestamp: new Date().toISOString(),
};

// Invalid test data
const INVALID_BOOKING = {
  name: 'J', // Too short
  phone: '123', // Too short
  email: 'notanemail', // Invalid format
  address: 'ABC', // Too short
  serviceType: 'Invalid Service', // Not in list
  urgency: 'invalid', // Not in list
};

const INVALID_CONTACT = {
  name: 'X', // Too short
  email: 'bademail', // Invalid format
  subject: 'Hi', // Too short
  message: 'Short', // Too short
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(endpoint, data, expectedSuccess = true) {
  try {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (expectedSuccess && result.success) {
      log(`  ✓ Test passed: ${endpoint}`, 'green');
      return true;
    } else if (!expectedSuccess && !result.success) {
      log(`  ✓ Test passed: ${endpoint} (expected failure)`, 'green');
      return true;
    } else {
      log(`  ✗ Test failed: ${endpoint}`, 'red');
      log(`    Expected success: ${expectedSuccess}, Got: ${result.success}`, 'red');
      if (result.error) {
        log(`    Error: ${result.error}`, 'red');
      }
      return false;
    }
  } catch (error) {
    log(`  ✗ Test error: ${endpoint}`, 'red');
    log(`    ${error.message}`, 'red');
    return false;
  }
}

async function testBookingForm() {
  log('\n📋 Testing Booking Form', 'cyan');
  log('─'.repeat(50), 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Valid submission
  log('\n1. Valid booking submission');
  if (await testEndpoint('/forms/booking', VALID_BOOKING, true)) {
    passed++;
  } else {
    failed++;
  }

  // Test 2: Missing required fields
  log('\n2. Missing required fields');
  const missingFields = { ...VALID_BOOKING };
  delete missingFields.name;
  delete missingFields.phone;
  if (await testEndpoint('/forms/booking', missingFields, false)) {
    passed++;
  } else {
    failed++;
  }

  // Test 3: Invalid data
  log('\n3. Invalid field data');
  if (await testEndpoint('/forms/booking', INVALID_BOOKING, false)) {
    passed++;
  } else {
    failed++;
  }

  // Test 4: Honeypot spam detection
  log('\n4. Honeypot spam detection');
  const spamData = { ...VALID_BOOKING, honeypot: 'spam' };
  if (await testEndpoint('/forms/booking', spamData, false)) {
    passed++;
  } else {
    failed++;
  }

  // Test 5: Optional email field
  log('\n5. Booking without email (optional)');
  const noEmail = { ...VALID_BOOKING };
  delete noEmail.email;
  if (await testEndpoint('/forms/booking', noEmail, true)) {
    passed++;
  } else {
    failed++;
  }

  log(`\n📊 Booking Form Results: ${passed} passed, ${failed} failed`, failed > 0 ? 'yellow' : 'green');
  return { passed, failed };
}

async function testContactForm() {
  log('\n📧 Testing Contact Form', 'cyan');
  log('─'.repeat(50), 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Valid submission
  log('\n1. Valid contact submission');
  if (await testEndpoint('/forms/contact', VALID_CONTACT, true)) {
    passed++;
  } else {
    failed++;
  }

  // Test 2: Missing required fields
  log('\n2. Missing required fields');
  const missingFields = { ...VALID_CONTACT };
  delete missingFields.email;
  delete missingFields.subject;
  if (await testEndpoint('/forms/contact', missingFields, false)) {
    passed++;
  } else {
    failed++;
  }

  // Test 3: Invalid data
  log('\n3. Invalid field data');
  if (await testEndpoint('/forms/contact', INVALID_CONTACT, false)) {
    passed++;
  } else {
    failed++;
  }

  // Test 4: Optional phone field
  log('\n4. Contact without phone (optional)');
  const noPhone = { ...VALID_CONTACT };
  delete noPhone.phone;
  if (await testEndpoint('/forms/contact', noPhone, true)) {
    passed++;
  } else {
    failed++;
  }

  log(`\n📊 Contact Form Results: ${passed} passed, ${failed} failed`, failed > 0 ? 'yellow' : 'green');
  return { passed, failed };
}

async function testNewsletterForm() {
  log('\n📬 Testing Newsletter Form', 'cyan');
  log('─'.repeat(50), 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Valid submission
  log('\n1. Valid newsletter subscription');
  if (await testEndpoint('/forms/newsletter', VALID_NEWSLETTER, true)) {
    passed++;
  } else {
    failed++;
  }

  // Test 2: Missing email
  log('\n2. Missing email field');
  if (await testEndpoint('/forms/newsletter', {}, false)) {
    passed++;
  } else {
    failed++;
  }

  // Test 3: Invalid email
  log('\n3. Invalid email format');
  if (await testEndpoint('/forms/newsletter', { email: 'notanemail' }, false)) {
    passed++;
  } else {
    failed++;
  }

  log(`\n📊 Newsletter Form Results: ${passed} passed, ${failed} failed`, failed > 0 ? 'yellow' : 'green');
  return { passed, failed };
}

async function runAllTests() {
  log('\n🧪 Form Submission Test Suite', 'blue');
  log('═'.repeat(50), 'blue');
  log(`Testing against: ${BASE_URL}`, 'blue');
  log(`Time: ${new Date().toLocaleString()}`, 'blue');

  const results = {
    booking: await testBookingForm(),
    contact: await testContactForm(),
    newsletter: await testNewsletterForm(),
  };

  // Summary
  const totalPassed = results.booking.passed + results.contact.passed + results.newsletter.passed;
  const totalFailed = results.booking.failed + results.contact.failed + results.newsletter.failed;
  const totalTests = totalPassed + totalFailed;

  log('\n' + '═'.repeat(50), 'blue');
  log('📊 FINAL RESULTS', 'blue');
  log('═'.repeat(50), 'blue');
  log(`Total Tests: ${totalTests}`);
  log(`Passed: ${totalPassed}`, 'green');
  log(`Failed: ${totalFailed}`, totalFailed > 0 ? 'red' : 'green');
  log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`, totalFailed > 0 ? 'yellow' : 'green');

  if (totalFailed === 0) {
    log('\n✅ All tests passed!', 'green');
  } else {
    log('\n⚠️  Some tests failed. Please review the output above.', 'yellow');
  }

  process.exit(totalFailed > 0 ? 1 : 0);
}

// Main execution
const formType = process.argv[2] || 'all';

(async () => {
  try {
    switch (formType.toLowerCase()) {
      case 'booking':
        await testBookingForm();
        break;
      case 'contact':
        await testContactForm();
        break;
      case 'newsletter':
        await testNewsletterForm();
        break;
      case 'all':
      default:
        await runAllTests();
        break;
    }
  } catch (error) {
    log(`\n❌ Test suite error: ${error.message}`, 'red');
    process.exit(1);
  }
})();
