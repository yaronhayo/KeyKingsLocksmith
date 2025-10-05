#!/usr/bin/env node

/**
 * Core Web Vitals Testing Script
 * Tests performance metrics and generates a report
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const URLS_TO_TEST = [
  '/',
  '/services',
  '/services/emergency-locksmith',
  '/service-areas',
  '/contact',
];

const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
  },
};

console.log('🚀 Starting Core Web Vitals Testing...\n');

// Build the project
console.log('📦 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build complete\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Start preview server
console.log('🌐 Starting preview server...');
const previewProcess = execSync('npm run preview &', { stdio: 'pipe' });
console.log('✅ Preview server started\n');

// Wait for server to be ready
console.log('⏳ Waiting for server to be ready...');
await new Promise(resolve => setTimeout(resolve, 3000));

const results = [];

// Test each URL
for (const url of URLS_TO_TEST) {
  console.log(`\n📊 Testing: ${url}`);
  
  try {
    const fullUrl = `http://localhost:4321${url}`;
    
    // Run Lighthouse
    const output = execSync(
      `npx lighthouse ${fullUrl} --output=json --quiet --chrome-flags="--headless"`,
      { encoding: 'utf-8' }
    );
    
    const report = JSON.parse(output);
    const metrics = report.audits;
    
    // Extract Core Web Vitals
    const lcp = metrics['largest-contentful-paint']?.numericValue || 0;
    const tbt = metrics['total-blocking-time']?.numericValue || 0;
    const cls = metrics['cumulative-layout-shift']?.numericValue || 0;
    const fcp = metrics['first-contentful-paint']?.numericValue || 0;
    const si = metrics['speed-index']?.numericValue || 0;
    const tti = metrics['interactive']?.numericValue || 0;
    
    // Performance score
    const performanceScore = report.categories.performance.score * 100;
    
    const result = {
      url,
      performanceScore: Math.round(performanceScore),
      metrics: {
        LCP: Math.round(lcp),
        TBT: Math.round(tbt),
        CLS: cls.toFixed(3),
        FCP: Math.round(fcp),
        SI: Math.round(si),
        TTI: Math.round(tti),
      },
      passed: {
        LCP: lcp < 2500,
        TBT: tbt < 150,
        CLS: cls < 0.1,
        FCP: fcp < 1800,
        performance: performanceScore >= 95,
      },
    };
    
    results.push(result);
    
    // Log results
    console.log(`  Performance Score: ${result.performanceScore}/100`);
    console.log(`  LCP: ${result.metrics.LCP}ms ${result.passed.LCP ? '✅' : '❌'} (target: <2500ms)`);
    console.log(`  TBT: ${result.metrics.TBT}ms ${result.passed.TBT ? '✅' : '❌'} (target: <150ms)`);
    console.log(`  CLS: ${result.metrics.CLS} ${result.passed.CLS ? '✅' : '❌'} (target: <0.1)`);
    console.log(`  FCP: ${result.metrics.FCP}ms ${result.passed.FCP ? '✅' : '❌'} (target: <1800ms)`);
    
  } catch (error) {
    console.error(`  ❌ Failed to test ${url}:`, error.message);
  }
}

// Generate report
console.log('\n\n📋 Generating Report...\n');

const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalPages: results.length,
    averagePerformance: Math.round(
      results.reduce((sum, r) => sum + r.performanceScore, 0) / results.length
    ),
    allPassed: results.every(r => 
      r.passed.LCP && r.passed.TBT && r.passed.CLS && r.passed.performance
    ),
  },
  results,
};

// Save report
const reportPath = './web-vitals-report.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`✅ Report saved to: ${reportPath}\n`);

// Print summary
console.log('📊 Summary:');
console.log(`  Total Pages Tested: ${report.summary.totalPages}`);
console.log(`  Average Performance Score: ${report.summary.averagePerformance}/100`);
console.log(`  All Tests Passed: ${report.summary.allPassed ? '✅ YES' : '❌ NO'}\n`);

// Print recommendations
console.log('💡 Recommendations:');
const failedPages = results.filter(r => !r.passed.performance);
if (failedPages.length > 0) {
  console.log('  Pages needing optimization:');
  failedPages.forEach(page => {
    console.log(`    - ${page.url} (Score: ${page.performanceScore}/100)`);
  });
} else {
  console.log('  ✅ All pages meet performance targets!');
}

// Kill preview server
console.log('\n🛑 Stopping preview server...');
try {
  execSync('pkill -f "astro preview"');
} catch (error) {
  // Ignore errors
}

console.log('✅ Testing complete!\n');

// Exit with appropriate code
process.exit(report.summary.allPassed ? 0 : 1);
