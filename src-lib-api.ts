---
// Enhanced security API layer with proper isolation and error handling
import type { APIResponse, BookingFormData, ContactFormData } from '../types';
import { ValidationError, RateLimitError, AppError } from '../types';

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.SITE_URL || 'https://localhost:3000',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
};

// Rate limiting store (in-memory for development, Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

class APIClient {
  private baseURL: string;
  private timeout: number;

  constructor(config = API_CONFIG) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }

  // Generic API request method with proper error handling
  private async request<T>(
    endpoint: string,
    options: RequestInit & { retries?: number } = {}
  ): Promise<APIResponse<T>> {
    const { retries = API_CONFIG.retries, ...fetchOptions } = options;
    const url = `${this.baseURL}/api${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...fetchOptions.headers,
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new AppError(
          `API request failed: ${response.statusText}`,
          'API_ERROR',
          response.status
        );
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Handle network errors and retries
      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(API_CONFIG.retryDelay);
        return this.request<T>(endpoint, { ...options, retries: retries - 1 });
      }
      
      throw this.handleError(error);
    }
  }

  // Rate limiting check
  private checkRateLimit(identifier: string, limit: number = 10, windowMs: number = 60000): void {
    const now = Date.now();
    const key = `${identifier}:${Math.floor(now / windowMs)}`;
    const entry = rateLimitStore.get(key) || { count: 0, resetTime: now + windowMs };
    
    if (entry.count >= limit) {
      throw new RateLimitError();
    }
    
    entry.count++;
    rateLimitStore.set(key, entry);
    
    // Cleanup old entries
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k);
      }
    }
  }

  // Form submission with validation and security
  async submitBookingForm(data: BookingFormData): Promise<APIResponse<{ submissionId: string }>> {
    // Rate limiting by IP/phone
    this.checkRateLimit(data.phone, 3, 300000); // 3 submissions per 5 minutes
    
    // Validate required fields
    this.validateBookingData(data);
    
    // Sanitize data
    const sanitizedData = this.sanitizeBookingData(data);
    
    return this.request<{ submissionId: string }>('/forms/booking', {
      method: 'POST',
      body: JSON.stringify({
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId(),
      }),
    });
  }

  async submitContactForm(data: ContactFormData): Promise<APIResponse<{ submissionId: string }>> {
    // Rate limiting by email
    this.checkRateLimit(data.email, 5, 600000); // 5 submissions per 10 minutes
    
    // Validate required fields
    this.validateContactData(data);
    
    // Sanitize data
    const sanitizedData = this.sanitizeContactData(data);
    
    return this.request<{ submissionId: string }>('/forms/contact', {
      method: 'POST',
      body: JSON.stringify({
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId(),
      }),
    });
  }

  // Newsletter subscription
  async subscribeNewsletter(email: string): Promise<APIResponse<{ subscriptionId: string }>> {
    this.checkRateLimit(email, 2, 86400000); // 2 per day
    
    if (!this.isValidEmail(email)) {
      throw new ValidationError('Invalid email address');
    }
    
    return this.request<{ subscriptionId: string }>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ 
        email: email.toLowerCase().trim(),
        source: 'website',
        timestamp: new Date().toISOString(),
      }),
    });
  }

  // Analytics events
  async trackEvent(eventName: string, properties: Record<string, any> = {}): Promise<void> {
    try {
      await this.request('/analytics/track', {
        method: 'POST',
        body: JSON.stringify({
          event: eventName,
          properties: {
            ...properties,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
          },
        }),
      });
    } catch (error) {
      // Don't throw errors for analytics - fail silently
      console.warn('Analytics tracking failed:', error);
    }
  }

  // Validation methods
  private validateBookingData(data: BookingFormData): void {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }
    
    if (!data.phone || !this.isValidPhone(data.phone)) {
      errors.push('Valid phone number is required');
    }
    
    if (!data.address || data.address.trim().length < 5) {
      errors.push('Complete address is required');
    }
    
    if (!data.serviceType) {
      errors.push('Service type is required');
    }
    
    if (!data.urgency) {
      errors.push('Urgency level is required');
    }
    
    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('Invalid email format');
    }
    
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }

  private validateContactData(data: ContactFormData): void {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }
    
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
      errors.push('Subject must be at least 5 characters');
    }
    
    if (!data.message || data.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters');
    }
    
    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.push('Invalid phone format');
    }
    
    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }

  // Data sanitization
  private sanitizeBookingData(data: BookingFormData): BookingFormData {
    return {
      ...data,
      name: this.sanitizeString(data.name),
      phone: this.sanitizePhone(data.phone),
      email: data.email ? this.sanitizeEmail(data.email) : undefined,
      address: this.sanitizeString(data.address),
      serviceType: this.sanitizeString(data.serviceType),
      notes: data.notes ? this.sanitizeString(data.notes) : undefined,
    };
  }

  private sanitizeContactData(data: ContactFormData): ContactFormData {
    return {
      ...data,
      name: this.sanitizeString(data.name),
      email: this.sanitizeEmail(data.email),
      phone: data.phone ? this.sanitizePhone(data.phone) : undefined,
      subject: this.sanitizeString(data.subject),
      message: this.sanitizeString(data.message),
    };
  }

  // Utility methods
  private sanitizeString(str: string): string {
    return str
      .trim()
      .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
      .substring(0, 1000); // Limit length
  }

  private sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+()-.\s]/g, '').substring(0, 20);
  }

  private sanitizeEmail(email: string): string {
    return email.toLowerCase().trim().substring(0, 254);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)\.]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  private isRetryableError(error: any): boolean {
    if (error instanceof AppError) {
      return error.statusCode >= 500 || error.statusCode === 408 || error.statusCode === 429;
    }
    return error.name === 'TypeError' || error.name === 'NetworkError';
  }

  private handleError(error: any): AppError {
    if (error instanceof AppError) {
      return error;
    }
    
    if (error.name === 'AbortError') {
      return new AppError('Request timeout', 'TIMEOUT', 408);
    }
    
    if (error.name === 'TypeError') {
      return new AppError('Network error', 'NETWORK_ERROR', 0);
    }
    
    return new AppError('Unknown error occurred', 'UNKNOWN_ERROR', 500);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Create singleton instance
export const apiClient = new APIClient();

// Convenience methods
export const submitBookingForm = (data: BookingFormData) => apiClient.submitBookingForm(data);
export const submitContactForm = (data: ContactFormData) => apiClient.submitContactForm(data);
export const subscribeNewsletter = (email: string) => apiClient.subscribeNewsletter(email);
export const trackEvent = (eventName: string, properties?: Record<string, any>) => 
  apiClient.trackEvent(eventName, properties);

// Form validation utilities for client-side use
export const validateForm = {
  name: (name: string): string | null => {
    if (!name || name.trim().length < 2) return 'Name must be at least 2 characters';
    if (name.length > 100) return 'Name is too long';
    if (!/^[a-zA-Z\s\-'\.]+$/.test(name)) return 'Name contains invalid characters';
    return null;
  },
  
  phone: (phone: string): string | null => {
    if (!phone) return 'Phone number is required';
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    if (cleanPhone.length < 10) return 'Phone number is too short';
    if (cleanPhone.length > 15) return 'Phone number is too long';
    if (!/^[\+]?[1-9]\d{7,14}$/.test(cleanPhone)) return 'Invalid phone number format';
    return null;
  },
  
  email: (email: string): string | null => {
    if (!email) return null; // Email is optional in booking form
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';
    if (email.length > 254) return 'Email address is too long';
    return null;
  },
  
  address: (address: string): string | null => {
    if (!address || address.trim().length < 5) return 'Complete address is required';
    if (address.length > 200) return 'Address is too long';
    return null;
  },
  
  message: (message: string, minLength: number = 10): string | null => {
    if (!message || message.trim().length < minLength) {
      return `Message must be at least ${minLength} characters`;
    }
    if (message.length > 2000) return 'Message is too long';
    return null;
  }
};

// Error handling utilities
export const handleFormError = (error: any): string => {
  if (error instanceof ValidationError) {
    return error.message;
  }
  
  if (error instanceof RateLimitError) {
    return 'Too many requests. Please wait a few minutes before trying again.';
  }
  
  if (error instanceof AppError) {
    switch (error.code) {
      case 'TIMEOUT':
        return 'Request timed out. Please check your connection and try again.';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection and try again.';
      default:
        return 'An error occurred. Please try again or call us directly.';
    }
  }
  
  return 'An unexpected error occurred. Please try again or call us directly.';
};

// Success tracking
export const trackFormSuccess = (formType: 'booking' | 'contact' | 'newsletter') => {
  trackEvent('form_submission_success', {
    form_type: formType,
    timestamp: new Date().toISOString(),
  });
  
  // Google Analytics conversion tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION-ID/CONVERSION_LABEL', // Replace with actual conversion tracking
      event_category: 'Form',
      event_label: formType,
      value: formType === 'booking' ? 1 : 0.5,
    });
  }
  
  // Facebook Pixel conversion tracking
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: formType,
      content_category: 'Form Submission',
      value: formType === 'booking' ? 1 : 0.5,
      currency: 'USD',
    });
  }
};
---