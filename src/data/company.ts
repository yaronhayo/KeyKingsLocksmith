// Enhanced Company Configuration for Key Kings Locksmith with Authority & Trust Elements
import type { CompanyConfig } from '../types';

export const companyConfig: CompanyConfig = {
  // Core Business Information
  name: "Key Kings Locksmith",
  tagline: "Professional Locksmith Services You Can Trust",
  description: "Licensed, bonded, and insured mobile locksmith services for emergency car lockouts, house lockouts, key replacement, and commercial security solutions throughout Anderson, SC and surrounding areas. Trusted locksmith services since 2016.",
  establishedYear: "2016",
  licenseNumber: "LIC-SC-KEYKINGS",
  
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
      label: "24/7 Emergency Service Available",
      hours: "Available 24 hours for emergencies"
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
    licensed: true,
    bonded: true,
    insured: true,
    certifications: [
      "ALOA Certified Professional Locksmith",
      "Licensed Locksmith - State of South Carolina",
      "Bonded & Insured Professional Service",
      "Google Verified Business",
      "Trusted by Anderson Community"
    ],
    established: "2016",
    familiesServed: 5000,
    yearsExperience: 9,
    bbb: {
      accredited: false,
      rating: "Not Rated",
      url: "",
      since: ""
    },
    associations: [
      {
        name: "Associated Locksmiths of America (ALOA)",
        logo: "/images/certifications/aloa-logo.svg",
        url: "https://aloa.org",
        memberSince: "2016"
      },
      {
        name: "Anderson Area Chamber of Commerce",
        logo: "/images/certifications/chamber-logo.svg",
        url: "https://andersonareachamber.com",
        memberSince: "2016"
      },
      {
        name: "South Carolina Locksmith Association",
        logo: "/images/certifications/scla-logo.svg",
        url: "",
        memberSince: "2016"
      }
    ],
    warranties: [
      {
        type: "Workmanship Warranty",
        duration: "1 Year",
        coverage: "All labor and installation work guaranteed for 1 full year"
      },
      {
        type: "Parts Warranty", 
        duration: "Manufacturer Warranty",
        coverage: "All parts covered by manufacturer warranty, typically 1-3 years"
      },
      {
        type: "Emergency Service Guarantee",
        duration: "Same Day",
        coverage: "If we can't solve your emergency the same day, service call is free"
      }
    ]
  },

  // Professional Brand Configuration
  brand: {
    colors: {
      primary: "#DC143C",      // Professional red
      secondary: "#FF4500",    // Emergency orange  
      accent: "#1C1C1C",       // Professional black
      background: "#FFFFFF",   // Clean white
      text: "#2D3748",         // Dark gray for readability
      muted: "#718096",        // Medium gray
      success: "#38A169",      // Trust green
      warning: "#DD6B20",      // Attention orange
      error: "#E53E3E"         // Error red
    },
    fonts: {
      primary: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      secondary: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif", 
      mono: "'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace"
    },
    logo: {
      text: "/images/brand/logo-text.svg",
      icon: "/images/brand/logo-icon.svg",
      favicon: "/favicon.ico",
      appleTouchIcon: "/images/brand/apple-touch-icon.png"
    },
    imagery: {
      heroBackground: "/images/hero/locksmith-service-hero.jpg",
      placeholder: "/images/placeholders/service-placeholder.jpg",
      teamPhotos: [
        "/images/team/lead-locksmith.jpg",
        "/images/team/senior-technician.jpg"
      ]
    }
  },

  // Enhanced SEO Configuration
  seo: {
    defaultTitle: "Professional Locksmith Services | Anderson, SC | Key Kings Locksmith",
    titleTemplate: "%s | Key Kings Locksmith - Licensed & Bonded",
    defaultDescription: "Licensed, bonded & insured locksmith services for emergency car lockouts, house lockouts, key replacement & commercial security in Anderson, Greenville, Clemson & Upstate SC. Trusted since 2016 with 4.9-star reviews.",
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
      "licensed locksmith",
      "bonded locksmith",
      "insured locksmith"
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
    googleAnalytics: "G-XXXXXXXXXX", // Replace with actual GA4 ID
    googleTagManager: "GTM-XXXXXXX", // Replace with actual GTM ID
    facebookPixel: "XXXXXXXXXXXXXXXXX", // Replace with actual Pixel ID
    microsoftClarity: "XXXXXXXXX", // Replace with actual Clarity ID
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
    businessName: "I Locksmith LLC",
    licenseNumber: "LIC-IN-123456",
    taxId: "XX-XXXXXXX", // Masked for security
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-and-conditions",
    accessibility: "/accessibility-policy",
    cookiePolicy: "/cookie-policy",
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
      totalReviews: 150,
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
    facebook: "https://facebook.com/keykingslocksmith",
    instagram: "https://instagram.com/keykingslocksmith",
    twitter: "https://twitter.com/keykingslocksmith",
    linkedin: "https://linkedin.com/company/keykingslocksmith",
    youtube: "https://youtube.com/@keykingslocksmith",
    googleMyBusiness: "https://g.co/kgs/key-kings-locksmith-anderson",
    nextdoor: "https://nextdoor.com/business/key-kings-locksmith-anderson-sc",
    yelp: "https://yelp.com/biz/key-kings-locksmith-anderson"
  },

  // Emergency Service Configuration
  emergency: {
    available247: false,
    responseTime: "30 minutes average",
    coverage: "All primary service areas",
    phone: "(864) 900-9597",
    message: "Professional locksmith service available Sun-Thu 7am-10pm, Fri 6:30am-5:30pm. Average response time: 30 minutes.",
    priorityAreas: ["Anderson", "Greenville", "Clemson", "Easley"],
    emergencyFee: 0, // No additional emergency fees
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
      services: ["24/7 Lockout Service", "Emergency Lock Repair", "After Hours Service", "Holiday Service", "Key Extraction"]
    }
  },

  // Trust Signals & Authority Elements
  trustSignals: {
    yearsInBusiness: 9,
    customersServed: "5,000+",
    averageResponseTime: "30 minutes",
    serviceGuarantee: "100% Satisfaction Guaranteed",
    insuranceCoverage: "$1,000,000 General Liability",
    backgroundChecks: "All technicians background checked",
    uniformedTechnicians: true,
    markedVehicles: true,
    upfrontPricing: true,
    noHiddenFees: true
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
  const dayName = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
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
