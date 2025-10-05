import { c as createComponent, d as createAstro, a as renderTemplate, f as renderSlot, i as renderHead, r as renderComponent, F as Fragment, u as unescapeHTML, m as maybeRenderHead, b as addAttribute, e as renderScript } from './vendor-Cr_-A01q.js';
import 'kleur/colors';
/* empty css                        */

const companyConfig = {
  // Core Business Information
  name: "Key Kings Locksmith",
  tagline: "Professional Locksmith Services You Can Trust",
  description: "Bonded and insured mobile locksmith services for emergency car lockouts, house lockouts, key replacement, and commercial security solutions throughout Anderson, SC and surrounding areas. Trusted locksmith services since 2016.",
  establishedYear: "2016",
  // Contact Information
  contact: {
    phone: {
      formatted: "+18649009597",
      display: "(864) 900-9597"},
    email: {
      primary: "keykingslocksmithsc@gmail.com"},
    address: {
      street: "4105 Liberty Highway Unit B",
      city: "Anderson",
      state: "SC",
      zipCode: "29621",
      formatted: "4105 Liberty Highway Unit B, Anderson, SC 29621",
      coordinates: {
        lat: 34.5034,
        lng: -82.6501
      }
    }
  },
  // Business Hours - Professional Schedule
  hours: {
    monday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    tuesday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    wednesday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    thursday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    friday: { open: "06:30", close: "17:30", label: "6:30 AM - 5:30 PM" },
    saturday: { open: null, close: null, label: "Closed" },
    sunday: { open: "07:00", close: "22:00", label: "7:00 AM - 10:00 PM" },
    emergency: {
      available: true,
      label: "Emergency Service Available",
      hours: "Emergency service available during business hours: Sun-Thu 7am-10pm, Fri 6:30am-5:30pm"
    },
    holidays: {
      closed: ["Christmas Day", "New Year's Day"],
      modified: [
        { date: "2025-12-24", hours: "7:00 AM - 2:00 PM", description: "Christmas Eve - Limited Hours" },
        { date: "2025-12-31", hours: "7:00 AM - 6:00 PM", description: "New Year's Eve - Limited Hours" }
      ]
    }
  },
  // Service Areas - Anderson, SC and Upstate South Carolina Focus
  serviceAreas: {
    primary: [
      "Anderson, SC",
      "Greenville, SC",
      "Clemson, SC",
      "Easley, SC"
    ],
    secondary: [
      "Pendleton, SC",
      "Williamston, SC",
      "Belton, SC",
      "Liberty, SC",
      "Seneca, SC",
      "Pickens, SC"
    ],
    extended: [
      "Simpsonville, SC",
      "Mauldin, SC",
      "Greer, SC",
      "Taylors, SC",
      "Fountain Inn, SC"
    ]},
  // Enhanced Credentials & Trust Factors
  credentials: {
    yearsExperience: 9},
  // Enhanced SEO Configuration
  seo: {
    defaultTitle: "Professional Locksmith Services | Anderson, SC | Key Kings Locksmith",
    defaultDescription: "Bonded & insured locksmith services for emergency car lockouts, house lockouts, key replacement & commercial security in Anderson, Greenville, Clemson & Upstate SC. Trusted since 2016 with 4.9-star reviews.",
    keywords: [
      "locksmith near me",
      "emergency locksmith",
      "car lockout service",
      "house lockout",
      "commercial locksmith",
      "mobile locksmith",
      "key replacement",
      "lock rekey",
      "Anderson locksmith",
      "Greenville locksmith",
      "Clemson locksmith",
      "Easley locksmith",
      "Upstate SC locksmith",
      "bonded locksmith",
      "insured locksmith",
      "professional locksmith"
    ],
    openGraph: {
      siteName: "Key Kings Locksmith - Professional Locksmith Services",
      image: "/images/og/og-default.jpg"},
    schema: {
      priceRange: "$$"}
  },
  // Content Management Settings
  content: {
    reviews: {
      averageRating: 4.9,
      totalReviews: 150}},
  // Social Media Presence
  social: {
    tiktok: "https://www.tiktok.com/@keykingslcksmt",
    facebook: "https://www.facebook.com/profile.php?id=61580117602908",
    instagram: "https://www.instagram.com/keykingslcksmt",
    twitter: "https://x.com/keykingslcksmt",
    youtube: "https://www.youtube.com/@keykingslcksmt",
    yelp: "https://yelp.com/biz/key-kings-locksmith-anderson"
  },
  // Trust Signals & Authority Elements
  trustSignals: {
    yearsInBusiness: 9,
    customersServed: "5,000+"}};
const trustSignals = companyConfig.trustSignals;
const getFormattedPhone = () => companyConfig.contact.phone.display;
const getPhoneLink = () => `tel:${companyConfig.contact.phone.formatted}`;
const getEmailLink = () => `mailto:${companyConfig.contact.email.primary}`;
const getGoogleMapsLink = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyConfig.contact.address.formatted)}`;
const getCurrentBusinessHours = () => {
  const now = /* @__PURE__ */ new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const dayHours = companyConfig.hours[dayName];
  if (typeof dayHours === "object" && "label" in dayHours) {
    return dayHours.label;
  }
  return "Contact us for hours";
};
const getAllServiceAreas = () => [
  ...companyConfig.serviceAreas.primary,
  ...companyConfig.serviceAreas.secondary,
  ...companyConfig.serviceAreas.extended || []
];
const getSchemaOrgData = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": companyConfig.name,
  "description": companyConfig.description,
  "url": "https://keykingslocksmithsc.com",
  "telephone": companyConfig.contact.phone.formatted,
  "email": companyConfig.contact.email.primary,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": companyConfig.contact.address.street,
    "addressLocality": companyConfig.contact.address.city,
    "addressRegion": companyConfig.contact.address.state,
    "postalCode": companyConfig.contact.address.zipCode,
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": companyConfig.contact.address.coordinates?.lat,
    "longitude": companyConfig.contact.address.coordinates?.lng
  },
  "areaServed": getAllServiceAreas(),
  "openingHours": [
    "Mo 07:00-22:00",
    "Tu 07:00-22:00",
    "We 07:00-22:00",
    "Th 07:00-22:00",
    "Fr 06:30-17:30",
    "Su 07:00-22:00"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": companyConfig.content.reviews.averageRating,
    "reviewCount": companyConfig.content.reviews.totalReviews
  },
  "priceRange": companyConfig.seo.schema.priceRange,
  "image": [
    "https://keykingslocksmithsc.com/images/services/locksmith-team.jpg",
    "https://keykingslocksmithsc.com/images/services/mobile-locksmith.jpg",
    "https://keykingslocksmithsc.com/images/services/emergency-service.jpg"
  ]
});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = companyConfig.seo.defaultTitle,
    description = companyConfig.seo.defaultDescription,
    keywords = companyConfig.seo.keywords,
    image = companyConfig.seo.openGraph.image,
    canonical
  } = Astro2.props;
  const schemaData = getSchemaOrgData();
  const pageUrl = canonical || Astro2.url.href;
  return renderTemplate(_b || (_b = __template(['<html lang="en"> <head><!-- Google Tag Manager -->', '<!-- End Google Tag Manager --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"', "><!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="keywords"', '><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', `><!-- Favicon --><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="msapplication-TileImage" content="/apple-touch-icon.png"><!-- Fonts - Optimized with preconnect, preload, and font-display: swap --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Preload critical fonts for faster rendering --><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@700;800&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%20-.,!?()&"><!-- Load fonts with display=swap for better performance --><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'"><!-- Fallback for browsers without JavaScript -->`, '<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet"></noscript><!-- Schema.org structured data --><script type="application/ld+json">', "</script><!-- Vercel Analytics - Loaded with defer for better performance -->", "", '</head> <body class="antialiased"> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KZGVN746" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " </body></html>"])), renderScript($$result, "/Users/yaronhayo/Desktop/KeyKingsKiro/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts"), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(keywords.join(", "), "content"), addAttribute(pageUrl, "href"), addAttribute(pageUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), addAttribute(companyConfig.seo.openGraph.siteName, "content"), addAttribute(pageUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(image, "content"), maybeRenderHead(), unescapeHTML(JSON.stringify(schemaData)), renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template(['<script defer src="https://cdn.vercel-insights.com/v1/script.js"></script><script defer src="https://va.vercel-scripts.com/v1/speed-insights/script.js"></script>']))) })}`, renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/yaronhayo/Desktop/KeyKingsKiro/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, getEmailLink as a, getGoogleMapsLink as b, companyConfig as c, getCurrentBusinessHours as d, getFormattedPhone as e, getSchemaOrgData as f, getPhoneLink as g, trustSignals as t };
