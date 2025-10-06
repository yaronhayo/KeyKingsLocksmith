// Enhanced Company Configuration for Key Kings Locksmith with Authority & Trust Elements
import type { CompanyConfig } from '../types';

export const companyConfig: CompanyConfig = {
  // Core Business Information
  name: "Key Kings Locksmith",
  tagline: "Professional Locksmith Services You Can Trust",
  description: "Bonded and insured mobile locksmith services for emergency car lockouts, house lockouts, key replacement, and commercial security solutions throughout Anderson, SC and surrounding areas. Trusted locksmith services since 2016.",
  establishedYear: "2016",
  
  // Contact Information
  contact: {
    phone: {
      primary: "(864) 900-9597",
      formatted: "+18649009597",
      display: "(864) 900-9597",
      emergency: "(864) 900-9597" // Same number for consistency
    },
    email: {
      primary: "keykingslocksmithsc@gmail.com",
      support: "keykingslocksmithsc@gmail.com",
      info: "keykingslocksmithsc@gmail.com",
      emergency: "keykingslocksmithsc@gmail.com"
    },
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
    ],
    coordinates: {
      center: { lat: 34.5034, lng: -82.6501 },
      radius: 35,
      bounds: {
        north: 35.0,
        south: 34.0,
        east: -82.0,
        west: -83.2
      }
    },
    travelFee: {
      freeRadius: 15,
      feePerMile: 2.50,
      maxDistance: 50
    }
  },

  // Enhanced Credentials & Trust Factors
  credentials: {
    bonded: true,
    insured: true,
    certifications: [
      "ALOA Certified Professional Locksmith",
      "Bonded & Insured Professional Service",
      "Google Verified Business",
      "Trusted by Anderson Community",
      "Professional Locksmith Service"
    ],
    established: "2016",
    familiesServed: 5000,
    yearsExperience: 9,
    associations: [
      {
        name: "Associated Locksmiths of America (ALOA)",
        url: "https://aloa.org",
        memberSince: "2016"
      },
      {
        name: "Anderson Area Chamber of Commerce",
        url: "https://andersonareachamber.com",
        memberSince: "2016"
      }
    ],
    warranties: [
      {
        type: "Workmanship Warranty",
        duration: "1 Year",
        coverage: "All labor and installation work backed by 1 year warranty"
      },
      {
        type: "Parts Warranty",
        duration: "Manufacturer Warranty",
        coverage: "All parts covered by manufacturer warranty, typically 1-3 years"
      }
    ]
  },

  // Professional Brand Configuration
  brand: {
    colors: {
      primary: "#FBBF24",      // Gold yellow
      secondary: "#F59E0B",    // Darker orange  
      accent: "#1C1C1C",       // Professional black
      background: "#FFFFFF",   // Clean white
      text: "#2D3748",         // Dark gray for readability
      muted: "#718096",        // Medium gray
      success: "#F59E0B",      // Orange (replaces green)
      warning: "#F59E0B",      // Orange
      error: "#D97706"         // Dark orange (replaces red)
    },
    fonts: {
      primary: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      secondary: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 
      mono: "'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace"
    },
    logo: {
      text: "/images/brand/logo.png",
      icon: "/images/brand/logo.png",
      favicon: "/favicon.png",
      appleTouchIcon: "/apple-touch-icon.png"
    },
    imagery: {
      heroBackground: "/images/og/og-default.jpg",
      placeholder: "/images/brand/logo.png"
    }
  },

  // Enhanced SEO Configuration
  seo: {
    defaultTitle: "Professional Locksmith Services | Anderson, SC | Key Kings Locksmith",
    titleTemplate: "%s | Key Kings Locksmith - Bonded & Insured",
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
      type: "website",
      image: "/images/og/og-default.jpg",
      imageWidth: 1200,
      imageHeight: 630
    },
    twitter: {
      card: "summary_large_image",
      site: "@keykingslocksmith",
      creator: "@keykingslocksmith"
    },
    schema: {
      organizationType: "LocalBusiness",
      businessType: "Locksmith",
      priceRange: "$$",
      currenciesAccepted: ["USD"],
      paymentAccepted: ["Cash", "Credit Card", "Check", "Invoice"]
    }
  },

  // Analytics & Tracking Configuration
  analytics: {
    googleAnalytics: "", // Add GA4 ID when ready
    googleTagManager: "GTM-KZGVN746", // Active GTM container
    facebookPixel: "", // Add when ready
    microsoftClarity: "", // Add when ready
    customEvents: true,
    conversionTracking: true
  },

  // Feature Flags for Functionality
  features: {
    // Service Features
    mobileService: true,
    emergencyService: true,
    onlineBooking: true,
    liveChat: false, // Can be enabled later
    
    // Content Features
    blog: true,
    reviews: true,
    testimonials: true,
    faq: true,
    gallery: true,
    
    // Technical Features
    pwa: true,
    offlineSupport: false,
    pushNotifications: false,
    geolocation: true,
    
    // Marketing Features
    promotions: true,
    newsletterSignup: true,
    referralProgram: false,
    loyaltyProgram: false
  },

  // Legal & Compliance Information
  legal: {
    businessName: "Key Kings Locksmith",
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
    accessibility: "/accessibility",
    gdprCompliant: true,
    ccpaCompliant: true
  },

  // Content Management Settings
  content: {
    blog: {
      enabled: true,
      postsPerPage: 12,
      categories: ["Security Tips", "Emergency Help", "Technology", "Business", "Local News"],
      showAuthor: true,
      showDate: true,
      showReadingTime: true
    },
    reviews: {
      enabled: true,
      platform: "multiple", // Google, Facebook, Yelp, etc.
      displayCount: 12,
      averageRating: 4.9,
      totalReviews: 12, // Reviews on this website (additional reviews exist on Google/Facebook/Yelp)
      showPhotos: true
    },
    faq: {
      enabled: true,
      categories: ["General", "Emergency", "Residential", "Commercial", "Automotive", "Pricing"],
      showSearch: true,
      groupByCategory: true
    },
    testimonials: {
      enabled: true,
      showPhotos: true,
      showVideo: false,
      rotateAutomatically: true
    }
  },

  // Social Media Presence
  social: {
    tiktok: "https://www.tiktok.com/@keykingslcksmt",
    facebook: "https://www.facebook.com/profile.php?id=61580117602908",
    instagram: "https://www.instagram.com/keykingslcksmt",
    twitter: "https://x.com/keykingslcksmt",
    youtube: "https://www.youtube.com/@keykingslcksmt",
    googleMyBusiness: "https://g.co/kgs/key-kings-locksmith-anderson",
    nextdoor: "https://nextdoor.com/business/key-kings-locksmith-anderson-sc",
    yelp: "https://yelp.com/biz/key-kings-locksmith-anderson"
  },

  // Emergency Service Configuration
  emergency: {
    available247: false,
    coverage: "All primary service areas",
    phone: "(864) 900-9597",
    message: "Emergency locksmith service available during business hours: Mon-Thu 7am-10pm, Fri 6:30am-5:30pm, Sun 7am-10pm. Closed Saturday.",
    priorityAreas: ["Anderson", "Greenville", "Clemson", "Easley"],
    holidayService: false
  },

  // Service Capabilities
  services: {
    residential: {
      enabled: true,
      services: ["House Lockout", "Lock Rekey", "Deadbolt Installation", "Smart Lock Setup", "Key Duplication", "Lock Repair", "Security Consultation"]
    },
    commercial: {
      enabled: true, 
      services: ["Business Lockout", "Master Key Systems", "Access Control", "High Security Locks", "Exit Devices", "Safe Services", "Security Audit"]
    },
    automotive: {
      enabled: true,
      services: ["Car Lockout", "Key Replacement", "Key Fob Programming", "Transponder Keys", "Ignition Repair", "Motorcycle Lockout"]
    },
    emergency: {
      enabled: true,
      services: ["Emergency Lockout Service", "Emergency Lock Repair", "Key Extraction", "Urgent Lock Service"]
    }
  },

  // Trust Signals & Authority Elements
  trustSignals: {
    yearsInBusiness: 9,
    customersServed: "5,000+",
    insuranceCoverage: "$1,000,000 General Liability",
    backgroundChecks: "All technicians background checked",
    uniformedTechnicians: true,
    markedVehicles: true,
    professionalService: true
  },

  // Professional Memberships
  memberships: [
    "Associated Locksmiths of America (ALOA)",
    "Anderson Area Chamber of Commerce",
    "South Carolina Locksmith Association",
    "Safe & Vault Technicians Association"
  ]
};

// Export individual sections for easy access
export const contactInfo = companyConfig.contact;
export const businessHours = companyConfig.hours;
export const serviceAreas = companyConfig.serviceAreas;
export const credentials = companyConfig.credentials;
export const emergencyService = companyConfig.emergency;
export const trustSignals = companyConfig.trustSignals;

// Utility functions for common operations
export const getFormattedPhone = () => companyConfig.contact.phone.display;
export const getPhoneLink = () => `tel:${companyConfig.contact.phone.formatted}`;
export const getEmailLink = () => `mailto:${companyConfig.contact.email.primary}`;
export const getGoogleMapsLink = () => 
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyConfig.contact.address.formatted)}`;

export const isEmergencyHours = (): boolean => {
  return companyConfig.emergency.available247;
};

export const getCurrentBusinessHours = (): string => {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const dayHours = companyConfig.hours[dayName as keyof typeof companyConfig.hours];
  
  if (typeof dayHours === 'object' && 'label' in dayHours) {
    return dayHours.label;
  }
  
  return "Contact us for hours";
};

export const getPrimaryServiceAreas = () => companyConfig.serviceAreas.primary;
export const getAllServiceAreas = () => [
  ...companyConfig.serviceAreas.primary,
  ...companyConfig.serviceAreas.secondary,
  ...(companyConfig.serviceAreas.extended || [])
];

// SEO helper functions
export const getSchemaOrgData = () => ({
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
    "Sa", // Closed on Saturday
    "Su 07:00-22:00"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": companyConfig.content.reviews.averageRating,
    "reviewCount": companyConfig.content.reviews.totalReviews
  },
  "priceRange": companyConfig.seo.schema.priceRange,
  "image": [
    "https://keykingslocksmithsc.com/images/brand/logo.png",
    "https://keykingslocksmithsc.com/images/og/og-default.jpg"
  ]
});
