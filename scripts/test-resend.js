#!/usr/bin/env node

/**
 * Test script for Resend API configuration
 * Usage: node scripts/test-resend.js
 */

import 'dotenv/config';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.TO_EMAIL || 'keykingslocksmithsc@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@keykingslocksmithsc.com';

async function testResendAPI() {
  console.log('🔍 Testing Resend API Configuration...\n');

  // Check if API key is configured
  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not configured in environment variables');
    console.log('   Please add RESEND_API_KEY to your .env file');
    process.exit(1);
  }

  console.log('✓ RESEND_API_KEY is configured');
  console.log(`✓ FROM_EMAIL: ${FROM_EMAIL}`);
  console.log(`✓ TO_EMAIL: ${TO_EMAIL}\n`);

  // Test API connection
  console.log('📧 Sending test email...\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: '✅ Resend API Test - Key Kings Locksmith',
        html: `
          <h1>Resend API Test Successful!</h1>
          <p>This is a test email from the Key Kings Locksmith website.</p>
          <p>If you're seeing this, your Resend API is configured correctly.</p>
          <hr>
          <p><small>Sent at: ${new Date().toISOString()}</small></p>
        `,
        text: 'Resend API Test Successful! This is a test email from the Key Kings Locksmith website.',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Failed to send test email');
      console.error('   Status:', response.status);
      console.error('   Error:', data.message || JSON.stringify(data));
      
      if (response.status === 401) {
        console.log('\n💡 Tip: Check that your RESEND_API_KEY is correct');
      } else if (response.status === 403) {
        console.log('\n💡 Tip: Verify that your domain is configured in Resend');
      }
      
      process.exit(1);
    }

    console.log('✅ Test email sent successfully!');
    console.log(`   Email ID: ${data.id}`);
    console.log(`\n📬 Check ${TO_EMAIL} for the test email\n`);

  } catch (error) {
    console.error('❌ Error testing Resend API:', error.message);
    process.exit(1);
  }
}

testResendAPI();
