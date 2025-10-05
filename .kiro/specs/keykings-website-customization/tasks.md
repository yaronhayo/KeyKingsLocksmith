# Implementation Plan

**Last Updated**: October 5, 2025  
**Status**: 28 of 31 task groups completed (90%)  
**Remaining**: Content cleanup for ETA/time promises (5 sub-tasks), deployment preparation (4 sub-tasks), and post-launch tasks (5 sub-tasks)

- [x] 1. Configuration and content cleanup
  - Update company configuration with Key Kings business information
  - Remove emojis from all generated content files
  - Remove pricing and ETA information from content
  - Remove staff/team information
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 14.1, 14.2_

- [x] 2. Brand customization and design system
  - [x] 2.1 Update Tailwind configuration with Key Kings color palette
    - Define gold color scale from logo
    - Define charcoal/dark color scale
    - Add trust colors (blue, green)
    - Configure typography with Montserrat and Inter fonts
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 2.2 Add logo and brand assets
    - Save logo to public/images/brand/ directory
    - Create favicon from logo
    - Create apple-touch-icon
    - Optimize logo for web (SVG format)
    - _Requirements: 2.1, 17.1, 17.2_
  
  - [x] 2.3 Update global styles and CSS variables
    - Define brand color CSS variables
    - Set up custom spacing if needed
    - Configure animation timing functions
    - Add custom utility classes for brand styling
    - _Requirements: 2.1, 2.2, 8.1, 8.2_

- [x] 3. Header and navigation customization
  - [x] 3.1 Customize Header component styling
    - Apply custom color scheme to header
    - Update logo placement and sizing
    - Style navigation links with brand colors
    - Remove "Home" from navigation menu
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 3.2 Implement sticky header behavior
    - Add scroll-based header transformation
    - Apply custom sticky navigation styling
    - Ensure smooth transitions
    - Test on mobile and desktop
    - _Requirements: 6.2, 8.1, 8.2_
  
  - [x] 3.3 Create mobile menu design
    - Customize mobile menu styling
    - Add custom animations for menu open/close
    - Style mobile navigation links
    - Test touch interactions
    - _Requirements: 6.4, 8.3, 10.2_

- [x] 4. Footer customization
  - Update Footer component with Key Kings information
  - Add social media links (TikTok, Facebook, Instagram, X, YouTube)
  - Organize footer sections (Services, Areas, Company, Legal)
  - Apply custom styling and hover effects
  - Create mobile-optimized footer layout
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 14.3_

- [x] 5. Homepage hero section
  - [x] 5.1 Customize Hero component layout
    - Update hero headline and subheadline
    - Apply custom background styling
    - Position logo prominently
    - Style primary and secondary CTAs
    - Add trust badges below CTAs
    - _Requirements: 3.1, 3.2, 3.3, 3.5_
  
  - [x] 5.2 Add hero animations
    - Implement subtle entrance animations
    - Add hover effects to CTAs
    - Ensure 60fps performance
    - Test reduced motion preferences
    - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [x] 6. Homepage "Problems We Solve" section
  - Create new section component or use existing Card components
  - Write persuasive copy for 4 problem-solution pairs
  - Add custom icons for each problem type
  - Style cards with brand colors
  - Add hover animations
  - _Requirements: 3.2, 4.2, 4.3, 16.1_

- [x] 7. Homepage services overview section
  - [x] 7.1 Customize ServicesGrid component
    - Update service cards with custom styling
    - Add custom SVG icons for each service category
    - Apply brand colors to cards
    - Implement hover effects and animations
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
  
  - [x] 7.2 Write service card copy
    - Create problem-focused taglines for each service
    - Write brief benefit statements
    - Add action-oriented CTAs
    - Ensure no pricing or ETA information
    - _Requirements: 1.2, 1.3, 4.5_

- [x] 8. Homepage "Why Choose Key Kings" section
  - Create trust-building section with 3-4 key benefits
  - Write persuasive copy for each benefit
  - Add custom icons for each benefit
  - Style with brand colors
  - Ensure no staff/time/price promises
  - _Requirements: 4.1, 4.4, 5.1, 5.3_

- [x] 9. Homepage "Prevention Tips" section
  - Create new content section component
  - Write 3 prevention tip categories with helpful content
  - Style as accordion or card grid
  - Add custom icons
  - Optimize for SEO with question-based headings
  - _Requirements: 9.1, 9.4, 15.3, 16.1_

- [x] 10. Homepage reviews section
  - Customize Reviews component styling
  - Apply brand colors to review cards
  - Style star ratings
  - Add platform badges
  - Implement carousel with custom controls
  - _Requirements: 5.2, 5.4_

- [x] 11. Homepage FAQ preview section
  - Customize FAQ component styling
  - Select top 5 questions for homepage
  - Style accordion with custom expand/collapse animations
  - Apply brand colors
  - Add link to full FAQ page
  - _Requirements: 9.3, 8.1, 8.2_

- [x] 12. Homepage trust signals and final CTA
  - Create trust signals bar with key metrics
  - Style with custom icons and brand colors
  - Create final CTA section with strong copy
  - Add multiple contact options
  - Display business hours
  - _Requirements: 5.3, 8.1, 14.5_

- [x] 13. Services main page
  - [x] 13.1 Create services page hero section
    - Write compelling headline and subheadline
    - Add primary CTA
    - Style with brand colors
    - _Requirements: 4.1, 4.5_
  
  - [x] 13.2 Create "Problems We Solve" section for services page
    - Write 4 problem-solution pairs
    - Style as quick-scan section
    - Add custom icons
    - _Requirements: 4.5, 16.1_
  
  - [x] 13.3 Create service categories grid
    - Design 4 category cards (Emergency, Residential, Commercial, Automotive)
    - Write persuasive copy for each category
    - List services under each category
    - Add custom icons
    - Style with brand colors and hover effects
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
  
  - [x] 13.4 Add "Why Choose Key Kings" section to services page
    - Reuse component from homepage with service-specific copy
    - _Requirements: 5.1, 5.5_
  
  - [x] 13.5 Add prevention tips section to services page
    - Write service-related prevention tips
    - Style consistently with homepage
    - _Requirements: 9.1, 9.4_

- [x] 14. Service category pages (4 pages)
  - [x] 14.1 Create Emergency Locksmith category page
    - Write hero section copy
    - Create "When You Need This Service" section
    - List 4 services with cards (Car Lockout, House Lockout, Business Lockout, Storage Unit Lockout)
    - Add "How We Help" section
    - Add prevention tips specific to emergency situations
    - Add category-specific FAQ
    - Add service areas and final CTA
    - _Requirements: 4.1, 4.4, 4.5, 9.4, 15.3_
  
  - [x] 14.2 Create Residential Locksmith category page
    - Write hero section copy
    - Create "When You Need This Service" section
    - List 4 services with cards (Lock Replacement, Lock Rekey, Lock Repair, Gate Locks)
    - Add "How We Help" section
    - Add prevention tips for home security
    - Add category-specific FAQ
    - Add service areas and final CTA
    - _Requirements: 4.1, 4.4, 4.5, 9.4, 15.3_
  
  - [x] 14.3 Create Commercial Locksmith category page
    - Write hero section copy
    - Create "When You Need This Service" section
    - List 4 services with cards (Lock Replacement, Master Key Systems, Access Control, Emergency Exit Devices)
    - Add "How We Help" section
    - Add prevention tips for business security
    - Add category-specific FAQ
    - Add service areas and final CTA
    - _Requirements: 4.1, 4.4, 4.5, 9.4, 15.3_
  
  - [x] 14.4 Create Automotive Locksmith category page
    - Write hero section copy
    - Create "When You Need This Service" section
    - List 4 services with cards (Car Key Replacement, Key Fob Programming, Car Key Duplicate, Ignition Repair)
    - Add "How We Help" section
    - Add prevention tips for car key issues
    - Add category-specific FAQ
    - Add service areas and final CTA
    - _Requirements: 4.1, 4.4, 4.5, 9.4, 15.3_

- [x] 15. Service Areas page (single page)
  - [x] 15.1 Create service areas hero section
    - Write compelling headline and subheadline
    - Add primary CTA
    - _Requirements: 14.1, 15.3_
  
  - [x] 15.2 Integrate Google Maps
    - Set up Google Maps API
    - Create map component showing all service areas
    - Highlight coverage zones
    - Add branded pins
    - Implement lazy loading for performance
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_
  
  - [x] 15.3 Create service areas list sections
    - Organize areas by region (Primary, Extended, Anderson County, Pickens County)
    - Write trust-building copy for each section
    - Style with brand colors
    - _Requirements: 14.4, 15.3_
  
  - [x] 15.4 Add coverage guarantee section
    - Write reassuring copy about service availability
    - Add CTA to call for coverage confirmation
    - _Requirements: 14.1, 14.2_
  
  - [x] 15.5 Add "Why Choose Local" section
    - Write copy about benefits of local locksmith
    - Add community involvement messaging
    - _Requirements: 5.1, 5.5_

- [x] 16. FAQ page
  - Customize FAQ component for full page
  - Organize FAQs by category
  - Write comprehensive answers (no pricing/ETA)
  - Style accordion with brand colors
  - Add schema markup for SEO
  - Optimize questions for voice search
  - _Requirements: 9.3, 15.1, 15.4, 16.1, 16.5_

- [x] 17. Reviews page
  - Create reviews grid layout
  - Style review cards with brand colors
  - Add filter options (by rating, platform)
  - Implement pagination
  - Add CTA to leave a review
  - _Requirements: 5.2, 5.4_

- [x] 18. About page
  - [x] 18.1 Write about page content
    - Company story and mission
    - Values and approach
    - Certifications and credentials
    - No team member details
    - _Requirements: 9.4, 14.1_
  
  - [x] 18.2 Design about page layout
    - Create hero section
    - Add credentials section with trust badges
    - Include service area map
    - Add final CTA
    - Style with brand colors
    - _Requirements: 5.1, 5.5, 12.1, 12.2_

- [x] 19. Contact page
  - [x] 19.1 Customize ContactForm component
    - Apply brand styling to form inputs
    - Style submit button
    - Add form validation with real-time feedback
    - Implement reCAPTCHA
    - _Requirements: 8.1, 8.2, 8.3, 19.1, 19.2_
  
  - [x] 19.2 Create contact page layout
    - Add contact form
    - Display phone, email, address
    - Show business hours
    - Embed Google Maps with business location
    - Add social media links
    - Style with brand colors
    - _Requirements: 14.1, 14.2, 14.3, 14.5, 20.3_

- [x] 20. Book Service page
  - Customize BookingForm component
  - Add service selection dropdown
  - Style form with brand colors
  - Implement form validation
  - Add reCAPTCHA
  - Configure success redirect to thank you page
  - _Requirements: 8.1, 8.2, 8.4, 19.1, 19.2_

- [x] 21. Thank You page
  - Create thank you page with confirmation message
  - Add next steps information
  - Display contact information
  - Add links to other pages
  - Style with brand colors
  - _Requirements: 8.4, 12.1_

- [x] 22. Legal pages
  - [x] 22.1 Update Terms and Conditions
    - Review and update content
    - Ensure Key Kings information is accurate
    - Style with brand colors
    - _Requirements: 12.4, 12.5_
  
  - [x] 22.2 Update Privacy Policy
    - Review and update content
    - Ensure compliance with regulations
    - Style with brand colors
    - _Requirements: 12.4, 12.5_
  
  - [x] 22.3 Create Accessibility Policy
    - Write accessibility statement
    - Document WCAG compliance efforts
    - Style with brand colors
    - _Requirements: 12.4, 12.5_

- [x] 23. Content creation and cleanup
  - [x] 23.1 Audit all content files for emojis
    - Search all .md files for emoji characters
    - Replace emojis with text or remove
    - Verify no emojis in component files
    - _Requirements: 1.1, 2.3_
  
  - [x] 23.2 Remove pricing information
    - Audit all service content files
    - Remove any pricing mentions
    - Update FAQ to avoid pricing questions or answer without specifics
    - _Requirements: 1.2_
  
  - [x] 23.3 Remove ETA and response time promises
    - Audit all content for time-based promises
    - Replace with general availability statements
    - Update emergency service messaging
    - _Requirements: 1.3_
  
  - [x] 23.4 Remove staff information
    - Delete team member content files
    - Remove team section from pages
    - Update about page to remove staff details
    - _Requirements: 1.4_
  
  - [x] 23.5 Verify NAP consistency
    - Check business name, address, phone across all pages
    - Ensure consistency in footer, contact page, schema markup
    - _Requirements: 14.1, 14.2, 16.4_

- [x] 24. SEO optimization
  - [x] 24.1 Add schema markup to all pages
    - Implement LocalBusiness schema on homepage
    - Add Service schema to service pages
    - Add FAQ schema to FAQ page
    - Add BreadcrumbList schema where applicable
    - Validate schema with Google's testing tool
    - _Requirements: 15.1, 16.1, 16.5_
  
  - [x] 24.2 Optimize meta tags
    - Write unique meta titles for all pages
    - Write unique meta descriptions for all pages
    - Include location and service keywords
    - Ensure proper length (titles 50-60 chars, descriptions 150-160 chars)
    - _Requirements: 15.2, 16.2_
  
  - [x] 24.3 Optimize images
    - Add descriptive alt text to all images
    - Compress images without quality loss
    - Convert to WebP/AVIF formats
    - Implement lazy loading
    - _Requirements: 11.1, 16.3, 17.3_
  
  - [x] 24.4 Generate sitemap
    - Configure Astro sitemap integration
    - Exclude API routes and thank you page
    - Set appropriate changefreq and priority
    - _Requirements: 15.1, 18.5_
  
  - [x] 24.5 Configure robots.txt
    - Allow all pages except API routes
    - Add sitemap reference
    - _Requirements: 18.5_
  
  - [x] 24.6 Implement internal linking strategy
    - Link service pages to related services
    - Link service areas throughout content
    - Add contextual links in content
    - Ensure all pages are reachable
    - _Requirements: 16.1, 16.4_

- [x] 25. Form integration
  - [x] 25.1 Configure Resend API
    - Set up Resend API key in environment variables
    - Configure email templates
    - Set recipient to keykingslocksmithsc@gmail.com
    - Test email delivery
    - _Requirements: 19.1, 19.3_
  
  - [x] 25.2 Implement reCAPTCHA
    - Set up Google reCAPTCHA v3
    - Add reCAPTCHA to all forms
    - Configure score threshold
    - Test spam protection
    - _Requirements: 19.2, 19.5_
  
  - [x] 25.3 Add form validation
    - Implement client-side validation
    - Add server-side validation in API routes
    - Display user-friendly error messages
    - Test all validation scenarios
    - _Requirements: 19.3, 19.4_
  
  - [x] 25.4 Test form submissions
    - Test contact form submission
    - Test booking form submission
    - Test newsletter form submission
    - Verify email delivery
    - Test error handling
    - _Requirements: 19.1, 19.3, 19.4_

- [x] 26. Performance optimization
  - [x] 26.1 Optimize images
    - Compress all images
    - Generate multiple sizes for responsive images
    - Use modern formats (WebP, AVIF)
    - Implement lazy loading
    - _Requirements: 11.1, 18.2_
  
  - [x] 26.2 Optimize fonts
    - Use font-display: swap for custom fonts
    - Preload critical fonts
    - Subset fonts if possible
    - _Requirements: 11.2_
  
  - [x] 26.3 Optimize JavaScript
    - Minimize custom JavaScript
    - Lazy load non-critical scripts
    - Use code splitting
    - _Requirements: 11.4, 13.5_
  
  - [x] 26.4 Optimize CSS
    - Use Tailwind's purge feature
    - Minimize custom CSS
    - Inline critical CSS
    - _Requirements: 13.3_
  
  - [x] 26.5 Test Core Web Vitals
    - Measure LCP (target <2.5s)
    - Measure TBT (target <150ms)
    - Measure CLS (target <0.1)
    - Run Lighthouse audits (target 95+)
    - Fix any issues
    - _Requirements: 11.5, 15.5, 18.1, 18.2_

- [x] 27. Accessibility testing
  - [x] 27.1 Test keyboard navigation
    - Verify all interactive elements are keyboard accessible
    - Test tab order
    - Ensure focus indicators are visible
    - _Requirements: 8.5_
  
  - [x] 27.2 Test with screen reader
    - Test with VoiceOver (macOS) or NVDA (Windows)
    - Verify all content is readable
    - Check ARIA labels
    - _Requirements: 8.5_
  
  - [x] 27.3 Verify color contrast
    - Test all text/background combinations
    - Ensure WCAG AA compliance (4.5:1 for normal text)
    - Fix any contrast issues
    - _Requirements: 8.5_
  
  - [x] 27.4 Test reduced motion
    - Verify animations respect prefers-reduced-motion
    - Test with reduced motion enabled
    - _Requirements: 8.5_

- [x] 28. Cross-browser and device testing
  - [x] 28.1 Test on desktop browsers
    - Test on Chrome
    - Test on Firefox
    - Test on Safari
    - Test on Edge
    - _Requirements: 10.1, 12.1_
  
  - [x] 28.2 Test on mobile devices
    - Test on iOS Safari
    - Test on Chrome Mobile
    - Test on various screen sizes
    - Verify touch interactions
    - _Requirements: 10.1, 10.2, 10.3, 12.1_
  
  - [x] 28.3 Test on tablets
    - Test on iPad
    - Test on Android tablets
    - Verify tablet-specific layouts
    - _Requirements: 10.5_

- [x] 29. Content cleanup - Remove ETA and time promises
  - [x] 29.1 Update company.ts configuration
    - Change emergency.label from "24/7 Emergency Service Available" to "Emergency Service Available"
    - Change emergency.hours from "Available 24 hours for emergencies" to reflect actual business hours
    - Verify available247 is set to false (already correct)
    - _Requirements: 1.3, 14.5_
  
  - [x] 29.2 Update page meta descriptions and titles
    - Remove "24/7" from emergency locksmith page title (line 9 of src/pages/services/emergency-locksmith.astro)
    - Remove "24/7 locksmith" from keywords array
    - Remove "24/7 emergency lockouts" from homepage description (line 17 of src/pages/index.astro)
    - Update to "Emergency locksmith services" or similar without time promises
    - _Requirements: 1.3, 15.2_
  
  - [x] 29.3 Update service area dynamic pages
    - Remove "24/7" stat display from service area pages (line 69 of src/pages/service-areas/[slug].astro)
    - Update "24/7 Emergency Service" text to "Emergency Service Available"
    - Remove "24/7 for emergency locksmith services" from final CTA section (line 273)
    - Update service hours display to show actual business hours instead of "24/7 Emergency Service"
    - _Requirements: 1.3, 14.5_
  
  - [x] 29.4 Update terms of service page
    - Remove "Emergency services are available 24/7" from section 3.3 (line 65 of src/pages/terms-of-service.astro)
    - Replace with actual business hours and emergency availability statement
    - _Requirements: 1.3, 12.5_
  
  - [x] 29.5 Review customer testimonials for time-based claims
    - Update review-karen-pickens.md to remove "within the timeframe they promised"
    - Consider rewording to focus on professionalism and quality instead of timing
    - Keep reviews that mention "quickly" or "promptly" as these are subjective and acceptable
    - _Requirements: 1.3, 5.2_

- [x] 30. Deployment preparation
  - [x] 30.1 Configure Vercel project
    - Vercel configuration file (vercel.json) is complete with proper headers, redirects, and caching
    - Build settings configured for Astro framework
    - Security headers configured
    - _Requirements: 11.5_
  
  - [x] 30.2 Set environment variables in Vercel
    - Add RESEND_API_KEY for email functionality
    - Add GOOGLE_MAPS_API_KEY for service area maps
    - Add GOOGLE_RECAPTCHA_SITE_KEY and GOOGLE_RECAPTCHA_SECRET_KEY for form protection
    - Add PUBLIC_GTM_CONTAINER_ID, PUBLIC_GA_MEASUREMENT_ID, PUBLIC_FB_PIXEL_ID for analytics
    - Add FROM_EMAIL and TO_EMAIL for email configuration
    - Verify all environment variables from .env.example are set
    - _Requirements: 19.1, 20.1_
  
  - [x] 30.3 Configure custom domain
    - Set up keykingslocksmithsc.com domain in Vercel
    - Configure DNS settings (A record or CNAME)
    - Enable HTTPS and SSL certificate (automatic with Vercel)
    - Test domain propagation and SSL
    - Update SITE_URL environment variable to production domain
    - _Requirements: 18.5_
  
  - [x] 30.4 Pre-deployment testing
    - Run build locally to verify no errors: npm run build
    - Test preview deployment on Vercel
    - Run Lighthouse audits on preview URL (target 95+ scores)
    - Verify forms work with production API keys on preview
    - Test Google Maps integration on preview
    - Verify all links work and no 404 errors
    - Test on multiple devices and browsers
    - _Requirements: 11.5_
  
  - [x] 30.5 Deploy to production
    - Deploy to production domain via Vercel
    - Verify all functionality on live site
    - Monitor performance metrics via Vercel Analytics
    - Test all forms and verify email delivery
    - Verify analytics tracking is working
    - Check Core Web Vitals in production
    - Monitor error logs for first 24 hours
    - _Requirements: 11.5_

- [ ] 31. Post-launch tasks
  - [ ] 31.1 Submit sitemap to search engines
    - Submit sitemap to Google Search Console
    - Submit sitemap to Bing Webmaster Tools
    - Verify sitemap is accessible at /sitemap-index.xml
    - _Requirements: 15.1_
  
  - [ ] 31.2 Set up Google My Business
    - Verify business listing at 4105 Liberty Highway Unit B, Anderson SC 29621
    - Add website URL (keykingslocksmithsc.com)
    - Ensure NAP consistency with website
    - Add business hours matching website
    - Upload photos and logo
    - _Requirements: 14.1, 15.3_
  
  - [ ] 31.3 Set up Google Search Console
    - Add and verify property for keykingslocksmithsc.com
    - Submit sitemap
    - Monitor indexing status
    - Check for crawl errors
    - _Requirements: 15.1, 18.5_
  
  - [ ] 31.4 Monitor performance and analytics
    - Verify Vercel Analytics is tracking
    - Monitor Core Web Vitals in production
    - Track form submissions
    - Monitor error logs
    - Set up alerts for downtime or errors
    - _Requirements: 11.5_
  
  - [ ] 31.5 Create maintenance schedule
    - Schedule quarterly content reviews
    - Plan monthly dependency updates
    - Set up automated backups (if applicable)
    - Document update procedures
    - _Requirements: 12.1, 12.2_
