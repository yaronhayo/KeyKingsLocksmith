#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const reviewsDir = '/Users/yaronhayo/Desktop/KeyKingsKiro/src/content/reviews';

// Service to category mapping
const categoryMap = {
  // Residential
  'Lock Rekey': 'residential',
  'Deadbolt Installation': 'residential',
  'Smart Lock Installation': 'residential',
  'Lock Repair': 'residential',
  'House Lockout': 'residential',
  'Lock Replacement': 'residential',
  'Key Duplication': 'residential',
  'Mailbox Lock Replacement': 'residential',
  'Safe Opening': 'residential',

  // Commercial
  'Master Key System': 'commercial',
  'Access Control': 'commercial',
  'Panic Bar': 'commercial',
  'Commercial Lockout': 'commercial',
  'Business Lockout': 'commercial',
  'Commercial Locksmith': 'commercial',

  // Automotive
  'Car Lockout': 'automotive',
  'Key Fob Programming': 'automotive',
  'Car Key Fob Programming': 'automotive',
  'Transponder Key': 'automotive',
  'Car Key Replacement': 'automotive',
  'Ignition Repair': 'automotive',

  // Emergency
  'Emergency Lockout': 'emergency',
  '24/7 Locksmith': 'emergency',
  'Late Night Service': 'emergency',
  'Weekend Service': 'emergency',
  'Emergency Locksmith': 'emergency'
};

// For ambiguous services, check context
function determineCategory(service, content, location) {
  // If service is in map, return it
  if (categoryMap[service]) {
    return categoryMap[service];
  }

  // Handle generic services by context
  if (service === 'Lock Installation' || service === 'Key Replacement') {
    // Check content for business/commercial keywords
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('business') || lowerContent.includes('office') ||
        lowerContent.includes('commercial') || lowerContent.includes('store') ||
        lowerContent.includes('shop')) {
      return 'commercial';
    }
    // Check for car/automotive keywords
    if (lowerContent.includes('car') || lowerContent.includes('vehicle') ||
        lowerContent.includes('auto')) {
      return 'automotive';
    }
    // Default to residential
    return 'residential';
  }

  // Default to residential for unknown services
  return 'residential';
}

function processReviewFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  // Check if category already exists
  if (content.includes('\ncategory:')) {
    return null; // Already has category
  }

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.warn(`Warning: Could not parse frontmatter in ${filePath}`);
    return null;
  }

  const [, frontmatter, body] = frontmatterMatch;

  // Extract service
  const serviceMatch = frontmatter.match(/^service:\s*"([^"]+)"/m);
  if (!serviceMatch) {
    console.warn(`Warning: No service field found in ${filePath}`);
    return null;
  }

  const service = serviceMatch[1];
  const category = determineCategory(service, body, frontmatter);

  // Add category right after service
  const newFrontmatter = frontmatter.replace(
    /^(service:\s*"[^"]+")$/m,
    `$1\ncategory: ${category}`
  );

  const newContent = `---\n${newFrontmatter}\n---\n${body}`;

  writeFileSync(filePath, newContent, 'utf-8');

  return category;
}

// Main execution
console.log('Processing review files...\n');

const files = readdirSync(reviewsDir).filter(f => f.endsWith('.md'));
const stats = {
  residential: 0,
  commercial: 0,
  automotive: 0,
  emergency: 0,
  skipped: 0
};

for (const file of files) {
  const filePath = join(reviewsDir, file);
  const category = processReviewFile(filePath);

  if (category) {
    stats[category]++;
    console.log(`✓ ${file} → ${category}`);
  } else {
    stats.skipped++;
  }
}

console.log('\n' + '='.repeat(50));
console.log('Summary:');
console.log('='.repeat(50));
console.log(`Residential: ${stats.residential} files`);
console.log(`Commercial:  ${stats.commercial} files`);
console.log(`Automotive:  ${stats.automotive} files`);
console.log(`Emergency:   ${stats.emergency} files`);
console.log(`Skipped:     ${stats.skipped} files (already had category)`);
console.log(`Total:       ${files.length} files`);
console.log('='.repeat(50));
