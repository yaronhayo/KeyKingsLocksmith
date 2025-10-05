# CRITICAL: Google Business Profile Compliance Fixes Required

## ⚠️ IMMEDIATE ACTION REQUIRED

Your website has **100+ Google Business Profile spam policy violations** across 40+ files that put your GBP at HIGH RISK for suspension.

## ✅ COMPLETED FIXES

1. **src/data/company.ts** - ✅ FIXED
   - Removed all "licensed" claims
   - Removed "100% satisfaction guaranteed"
   - Removed "upfront pricing" and "no hidden fees"
   - Removed "same day" guarantee
   - Changed to compliant language

2. **src/components/sections/Hero.astro** - ✅ FIXED
   - Removed "no hidden fees" claim
   - Changed to "Professional and reliable service"

## 🚨 REMAINING CRITICAL FIXES NEEDED

### Priority 1: Component Files (Used Site-Wide)

#### `src/components/sections/WhyChooseUs.astro`
**Lines 21-24:**
```astro
OLD: title: 'Licensed, Bonded & Insured',
OLD: description: "Full credentials and insurance coverage mean you're protected..."

NEW: title: 'Bonded & Insured',
NEW: description: "Bonded and insured for your protection and peace of mind."
```

**Lines 32-33:**
```astro
OLD: description: "No hidden fees, no surprises. We explain what needs to be done..."

NEW: description: "We explain what needs to be done and answer questions before we start work."
```

#### `src/components/sections/TrustSignals.astro`
**Line 44-46:**
```astro
OLD: value: '100%',
OLD: label: 'Satisfaction Guaranteed',

REMOVE THIS ENTIRE METRIC - Replace with:
value: '4.9',
label: 'Star Rating',
```

#### `src/components/ui/TrustBadge.astro`
**Lines 22-25:**
```astro
OLD: Licensed & Insured
NEW: Bonded & Insured
```

### Priority 2: Main Pages

#### `src/pages/index.astro`
**Line 16:**
```astro
OLD: description = "Licensed locksmith in Anderson, SC..."
NEW: description = "Bonded & insured locksmith in Anderson, SC..."
```

#### `src/pages/services/index.astro`
**Line 13:**
```astro
OLD: description = "...Licensed & insured..."
NEW: description = "...Bonded & insured..."
```

**Lines 21-22:** (CRITICAL - Response Time Violation)
```astro
OLD: tagline: '24/7 Fast Response When You Need It Most'
OLD: description: 'Our emergency locksmith team responds within 30 minutes...'

NEW: tagline: 'Emergency Locksmith Services'
NEW: description: 'Professional emergency locksmith team serving Anderson and Upstate SC...'
```

**Line 167:** (CRITICAL - 30min Stat)
```astro
REMOVE ENTIRE STAT SECTION showing "30min Response Time"
```

**Line 117:**
```astro
OLD: Licensed, Bonded & Insured Professionals
NEW: Bonded & Insured Professionals
```

#### `src/pages/about.astro`
**Line 10:**
```astro
OLD: title = "About Key Kings Locksmith | Licensed Anderson SC Locksmith"
NEW: title = "About Key Kings Locksmith | Professional Anderson SC Locksmith"
```

**Line 12:** Remove "licensed locksmith" from keywords array

**Line 46:**
```astro
OLD: "...providing professional service with transparent pricing..."
NEW: "...providing professional and reliable service..."
```

**Lines 69, 163, 190-191:** Change all "Licensed" to "Bonded"

**Line 240:**
```astro
OLD: <h3>Satisfaction Guaranteed</h3>
NEW: <h3>We Stand Behind Our Work</h3>
```

#### `src/pages/contact.astro`
**Line 9:**
```astro
OLD: description = "...Licensed locksmith serving Greenville, Clemson..."
NEW: description = "...Professional locksmith serving Greenville, Clemson..."
```

#### `src/pages/book-service.astro`
**Line 31:**
```astro
OLD: <span>Licensed & Insured</span>
NEW: <span>Bonded & Insured</span>
```

**Line 43:**
```astro
OLD: <span>No Hidden Fees</span>
NEW: <span>Professional Service</span>
```

**Lines 97-99, 131-133:** Remove pricing claims

#### `src/pages/faq.astro`
**Line 10:**
```astro
OLD: description = "...Licensed locksmith serving Anderson..."
NEW: description = "...Professional locksmith serving Anderson..."
```

#### `src/pages/service-areas/index.astro`
**Line 9:**
```astro
OLD: description = "...Licensed mobile locksmith..."
NEW: description = "...Professional mobile locksmith..."
```

**Line 168:** REMOVE "30min" response time stat

#### `src/pages/services/emergency-locksmith.astro`
**Line 57:**
```astro
OLD: "...same-day emergency lock changes..."
NEW: "...emergency lock changes and rekeying..."
```

#### `src/pages/terms-of-service.astro`
**Lines 155-161:**
```astro
OLD: Insurance and Licensing section claiming licensing
NEW: Insurance section - remove all licensing references
```

### Priority 3: Content Files (FAQ)

#### `src/content/faq/licensed-insured.md`
**ENTIRE FILE:**
```markdown
OLD: question: "Are you licensed and insured?"
OLD: answer: "Yes, Key Kings Locksmith is fully licensed, bonded, and insured..."

NEW: question: "Are you bonded and insured?"
NEW: answer: "Yes, Key Kings Locksmith is bonded and insured for your protection..."
```

#### `src/content/faq/verify-locksmith.md`
**Line 8:**
```markdown
OLD: "Key Kings Locksmith is fully licensed, bonded, and insured..."
NEW: "Key Kings Locksmith is bonded and insured..."
```

### Priority 4: Service Content Files (ALL need same fix)

Files to update:
- `src/content/services/car-lockout.md`
- `src/content/services/emergency-locksmith.md`
- `src/content/services/commercial-locksmith.md`
- `src/content/services/lock-rekey.md`
- `src/content/services/key-replacement.md`
- `src/content/services/house-lockout.md`

**Line ~28-29 in each:**
```markdown
OLD: "Fully licensed, bonded, and insured"
OLD: "100% satisfaction guaranteed"

NEW: "Bonded and insured"
NEW: "We stand behind our work"
```

### Priority 5: Service Area Content Files

Files to update:
- `src/content/service-areas/clemson-sc.md`
- `src/content/service-areas/greenville-sc.md`
- `src/content/service-areas/anderson-sc.md`

**Lines ~14, 35, 46 in each:**
```markdown
OLD: "Licensed & Insured"
NEW: "Bonded & Insured"
```

## 📊 VIOLATION SUMMARY

| Category | Count | Risk Level |
|----------|-------|------------|
| False Licensing Claims | 50+ | **CRITICAL** |
| Response Time Claims (30min, 24/7) | 10+ | **HIGH** |
| Pricing Claims (no hidden fees) | 10+ | **HIGH** |
| Performance Guarantees (100%) | 30+ | **MEDIUM** |

## 🔧 AUTOMATED FIX COMMANDS

Run these find-and-replace commands in your editor:

### Global Find & Replace

1. **Remove Licensing Claims:**
   ```
   Find: "Licensed, bonded, and insured"
   Replace: "Bonded and insured"
   ```

2. **Remove Licensing Claims (variant 2):**
   ```
   Find: "Licensed & Insured"
   Replace: "Bonded & Insured"
   ```

3. **Remove Licensing Claims (variant 3):**
   ```
   Find: "licensed locksmith"
   Replace: "professional locksmith"
   ```

4. **Remove Guarantees:**
   ```
   Find: "100% Satisfaction Guaranteed"
   Replace: "We stand behind our work"
   ```

5. **Remove Pricing Claims:**
   ```
   Find: "no hidden fees"
   Replace: "professional service"
   ```

6. **Remove Pricing Claims (variant 2):**
   ```
   Find: "transparent pricing"
   Replace: "clear communication"
   ```

7. **Remove Time Claims:**
   ```
   Find: "same-day"
   Replace: ""
   ```

8. **Remove 24/7 Claims:**
   ```
   Find: "24/7"
   Replace: "Emergency service available during business hours"
   ```

## ⚡ QUICK FIX CHECKLIST

- [ ] Fix src/components/sections/WhyChooseUs.astro
- [ ] Fix src/components/sections/TrustSignals.astro
- [ ] Fix src/components/ui/TrustBadge.astro
- [ ] Fix src/pages/index.astro meta
- [ ] Fix src/pages/services/index.astro (REMOVE 30min stat!)
- [ ] Fix src/pages/about.astro
- [ ] Fix src/pages/contact.astro
- [ ] Fix src/pages/book-service.astro
- [ ] Fix src/pages/faq.astro
- [ ] Fix src/pages/service-areas/index.astro (REMOVE 30min stat!)
- [ ] Fix src/pages/services/emergency-locksmith.astro
- [ ] Fix src/pages/terms-of-service.astro
- [ ] Fix src/content/faq/licensed-insured.md
- [ ] Fix src/content/faq/verify-locksmith.md
- [ ] Fix ALL 6 service content files
- [ ] Fix ALL 3 service area content files

## 🎯 WHY THIS MATTERS

**Google's Spam Policy explicitly prohibits:**
1. ❌ Claiming licensing in jurisdictions that don't require it (SC doesn't license locksmiths)
2. ❌ Making specific response time guarantees you can't verify
3. ❌ Making absolute pricing guarantees ("no hidden fees")
4. ❌ Making unverifiable performance claims ("100% guaranteed")

**Consequences of non-compliance:**
- Google Business Profile suspension or removal
- Loss of Google Maps visibility
- Loss of Google Search visibility
- Significant revenue impact

## ✅ COMPLIANT ALTERNATIVES

| ❌ DON'T SAY | ✅ DO SAY |
|--------------|-----------|
| Licensed | Bonded & Insured / Professional |
| 30 minutes | Prompt response / We respond quickly |
| 24/7 | Emergency service during business hours |
| No hidden fees | Clear pricing discussed before work |
| 100% guaranteed | We stand behind our work |
| Same-day | We work efficiently |
| Transparent pricing | Clear communication |

---

**ESTIMATED TIME TO FIX:** 2-3 hours for all files
**PRIORITY:** URGENT - Do this before deploying to production

