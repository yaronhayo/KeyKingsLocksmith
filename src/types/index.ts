// Enhanced TypeScript types for complete type safety and scalability
export interface CompanyConfig {
  // Core Business Information
  name: string;
  tagline: string;
  description: string;
  establishedYear: string;
  licenseNumber?: string;

  // Contact Information
  contact: {
    phone: {
      primary: string;
      formatted: string; // E.164 format for tel: links
      display: string;   // Human-readable format
      emergency?: string; // Optional emergency line
    };
    email: {
      primary: string;
      support: string;
      info: string;
      emergency?: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      formatted: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
  };

  // Business Operations
  hours: BusinessHours;
  serviceAreas: ServiceAreas;

  // Credentials & Trust Factors
  credentials: BusinessCredentials;

  // Brand & Design
  brand: BrandConfig;

  // SEO Configuration
  seo: SEOConfig;

  // Analytics & Tracking
  analytics: AnalyticsConfig;

  // Feature Toggles
  features: FeatureFlags;

  // Legal & Compliance
  legal: LegalConfig;

  // Content Settings
  content: ContentConfig;

  // Social Media
  social: SocialMediaConfig;

  // Emergency Service
  emergency: EmergencyServiceConfig;

  // Services
  services: ServicesConfig;

  // Trust Signals
  trustSignals: TrustSignalsConfig;

  // Memberships
  memberships: string[];
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  emergency: {
    available: boolean;
    label: string;
    hours?: string;
  };
  holidays?: {
    closed: string[];
    modified: Array<{
      date: string;
      hours: string;
      description: string;
    }>;
  };
}

export interface DayHours {
  open: string | null;
  close: string | null;
  label: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface ServiceAreas {
  primary: string[];
  secondary: string[];
  extended?: string[];
  coordinates: {
    center: {
      lat: number;
      lng: number;
    };
    radius: number; // in miles
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  travelFee?: {
    freeRadius: number;
    feePerMile: number;
    maxDistance: number;
  };
}

export interface BusinessCredentials {
  licensed: boolean;
  bonded: boolean;
  insured: boolean;
  certifications: string[];
  established: string;
  familiesServed?: number;
  yearsExperience?: number;
  bbb?: {
    accredited: boolean;
    rating: string;
    url?: string;
    since?: string;
  };
  associations?: Array<{
    name: string;
    logo?: string;
    url?: string;
    memberSince?: string;
  }>;
  warranties?: Array<{
    type: string;
    duration: string;
    coverage: string;
  }>;
}

export interface BrandConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  logo: {
    text: string;
    icon: string;
    favicon: string;
    appleTouchIcon?: string;
  };
  imagery: {
    heroBackground: string;
    placeholder: string;
    teamPhotos?: string[];
  };
}

export interface SEOConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  openGraph: {
    siteName: string;
    type: string;
    image: string;
    imageWidth?: number;
    imageHeight?: number;
  };
  twitter: {
    card: string;
    site?: string;
    creator?: string;
  };
  schema: {
    organizationType: string;
    businessType: string;
    priceRange: string;
    currenciesAccepted: string[];
    paymentAccepted: string[];
  };
}

export interface AnalyticsConfig {
  googleAnalytics?: string;
  googleTagManager?: string;
  facebookPixel?: string;
  microsoftClarity?: string;
  hotjar?: string;
  customEvents: boolean;
  conversionTracking: boolean;
}

export interface FeatureFlags {
  // Service Features
  mobileService: boolean;
  emergencyService: boolean;
  onlineBooking: boolean;
  liveChat: boolean;

  // Content Features
  blog: boolean;
  reviews: boolean;
  testimonials: boolean;
  faq: boolean;
  gallery: boolean;

  // Technical Features
  pwa: boolean;
  offlineSupport: boolean;
  pushNotifications: boolean;
  geolocation: boolean;

  // Marketing Features
  promotions: boolean;
  newsletterSignup: boolean;
  referralProgram: boolean;
  loyaltyProgram: boolean;
}

export interface LegalConfig {
  businessName: string;
  licenseNumber?: string;
  taxId?: string;
  privacyPolicy: string;
  termsOfService: string;
  accessibility: string;
  cookiePolicy?: string;
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
}

export interface ContentConfig {
  blog: {
    enabled: boolean;
    postsPerPage: number;
    categories: string[];
    showAuthor: boolean;
    showDate: boolean;
    showReadingTime: boolean;
  };
  reviews: {
    enabled: boolean;
    platform: string;
    displayCount: number;
    averageRating: number;
    totalReviews: number;
    showPhotos: boolean;
  };
  faq: {
    enabled: boolean;
    categories: string[];
    showSearch: boolean;
    groupByCategory: boolean;
  };
  testimonials: {
    enabled: boolean;
    showPhotos: boolean;
    showVideo: boolean;
    rotateAutomatically: boolean;
  };
}

export interface SocialMediaConfig {
  tiktok?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  googleMyBusiness?: string;
  nextdoor?: string;
  yelp?: string;
  linkedin?: string;
  pinterest?: string;
}

export interface EmergencyServiceConfig {
  available247: boolean;
  coverage: string;
  phone: string;
  message: string;
  priorityAreas: string[];
  emergencyFee: number;
  holidayService: boolean;
}

export interface ServicesConfig {
  residential: {
    enabled: boolean;
    services: string[];
  };
  commercial: {
    enabled: boolean;
    services: string[];
  };
  automotive: {
    enabled: boolean;
    services: string[];
  };
  emergency: {
    enabled: boolean;
    services: string[];
  };
}

export interface TrustSignalsConfig {
  yearsInBusiness: number;
  customersServed: string;
  serviceGuarantee: string;
  insuranceCoverage: string;
  backgroundChecks: string;
  uniformedTechnicians: boolean;
  markedVehicles: boolean;
  upfrontPricing: boolean;
  noHiddenFees: boolean;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
  timestamp: string;
  requestId: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
  stack?: string; // Only in development
}

// Form Types
export interface BookingFormData {
  // Personal Information
  name: string;
  phone: string;
  email?: string;

  // Service Details
  address: string;
  apartment?: string;
  gateCode?: string;
  serviceType: string;
  urgency: 'asap' | 'same-day' | 'few-days' | 'few-weeks' | 'other';
  notes?: string;

  // Metadata
  source?: string;
  pageUrl?: string;
  referrer?: string;
  timestamp?: string;
  userAgent?: string;
  screenResolution?: string;
  language?: string;
  timezone?: string;

  // Verification
  recaptchaToken?: string;
  recaptchaResponse?: string;
  honeypot?: string; // Anti-spam
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
  timestamp?: string;
  recaptchaToken?: string;
  recaptchaResponse?: string;
}

// Content Collection Types
export interface ServiceData {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  icon: string;
  category: 'residential' | 'commercial' | 'automotive' | 'emergency';
  priority: number;
  featured: boolean;
  available247: boolean;
  estimatedDuration?: string;
  priceRange?: string;
  tags: string[];
  relatedServices: string[];
  faqItems: FAQItem[];
  seo?: SEOMetadata;
  schema?: ServiceSchema;
  publishDate: Date;
  updatedDate?: Date;
  image?: ImageData;
}

export interface ServiceAreaData {
  title: string;
  slug: string;
  city: string;
  state: string;
  zipCodes: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  population?: number;
  services: string[];
  neighborhoods: string[];
  landmarks: string[];
  responseTime?: string;
  coverage: 'primary' | 'secondary' | 'extended';
  description: string;
  localInfo?: {
    businessCount?: number;
    demographics?: string;
    economicInfo?: string;
  };
  seo?: SEOMetadata;
  schema?: ServiceAreaSchema;
  publishDate: Date;
  updatedDate?: Date;
  featured: boolean;
}

export interface BlogData {
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  author: AuthorData;
  publishDate: Date;
  updatedDate?: Date;
  category: string;
  tags: string[];
  image: ImageData;
  featured: boolean;
  draft: boolean;
  readingTime?: number;
  seo?: SEOMetadata;
  schema?: ArticleSchema;
  relatedPosts: string[];
}

export interface ReviewData {
  customerName: string;
  initials: string;
  location: {
    city: string;
    state: string;
  };
  service: string;
  rating: number;
  date: Date;
  verified: boolean;
  platform: 'google' | 'facebook' | 'yelp' | 'website' | 'other';
  serviceCategory: 'residential' | 'commercial' | 'automotive' | 'emergency';
  featured: boolean;
  responseTime?: string;
  technician?: string;
  jobDetails?: {
    urgency: 'emergency' | 'same-day' | 'scheduled';
    timeOfDay?: string;
    duration?: string;
  };
  images?: ImageData[];
  tags: string[];
}

// Helper Types
export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  canonicalUrl?: string;
}

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
}

export interface AuthorData {
  name: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

// Schema.org Types
export interface ServiceSchema {
  serviceType: string;
  areaServed: string;
  provider?: {
    name: string;
    telephone: string;
    address: string;
  };
}

export interface ServiceAreaSchema {
  areaServed: string;
  serviceArea: {
    geo: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface ArticleSchema {
  articleType: string;
  wordCount?: number;
  keywords: string[];
}

// Performance & Analytics Types
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export interface ConversionEvent {
  type: 'form_submission' | 'phone_call' | 'email_click' | 'booking_complete';
  value: number;
  currency?: string;
  metadata?: Record<string, any>;
}

// State Management Types
export interface AppState {
  loading: boolean;
  error: string | null;
  user: UserData | null;
  preferences: UserPreferences;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  marketing: boolean;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: '_blank' | '_self';
  onClick?: (event: MouseEvent) => void;
  children: React.ReactNode;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Environment Variables
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  SITE_URL: string;

  // Google Services
  GOOGLE_MAPS_API_KEY: string;
  GOOGLE_RECAPTCHA_SITE_KEY: string;
  GOOGLE_RECAPTCHA_SECRET_KEY: string;
  GOOGLE_TAG_MANAGER_ID?: string;
  GOOGLE_ANALYTICS_ID?: string;

  // Email Service
  RESEND_API_KEY: string;

  // Business Information
  BUSINESS_PHONE: string;
  BUSINESS_EMAIL: string;
  BUSINESS_ADDRESS: string;

  // Optional Services
  VERCEL_BLOB_READ_WRITE_TOKEN?: string;
  DATABASE_URL?: string;
  REDIS_URL?: string;
}

// Error Handling
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super('Rate limit exceeded', 'RATE_LIMIT', 429);
    this.name = 'RateLimitError';
  }
}