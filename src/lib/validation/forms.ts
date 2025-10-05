/**
 * Server-side form validation utilities
 * 
 * Provides comprehensive validation for all form inputs
 * to ensure data integrity and security.
 */

import type { BookingFormData, ContactFormData } from '../../types';
import { ValidationError } from '../../types';

// Validation rules
const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'\.]+$/,
  },
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
    pattern: /^[\+]?[1-9]\d{7,14}$/,
  },
  address: {
    minLength: 5,
    maxLength: 200,
  },
  subject: {
    minLength: 5,
    maxLength: 200,
  },
  message: {
    minLength: 10,
    maxLength: 2000,
  },
  notes: {
    maxLength: 1000,
  },
};

// Common validation errors
const ERRORS = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must not exceed ${max} characters`,
  invalid: (field: string) => `${field} format is invalid`,
  pattern: (field: string) => `${field} contains invalid characters`,
};

/**
 * Sanitize string input
 */
export function sanitizeString(input: string, maxLength?: number): string {
  let sanitized = input
    .trim()
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .replace(/\s+/g, ' '); // Normalize whitespace

  if (maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .substring(0, VALIDATION_RULES.email.maxLength);
}

/**
 * Sanitize phone number
 */
export function sanitizePhone(phone: string): string {
  return phone
    .replace(/[^\d+()-.\s]/g, '')
    .substring(0, VALIDATION_RULES.phone.maxLength);
}

/**
 * Validate name field
 */
export function validateName(name: string): string | null {
  if (!name || !name.trim()) {
    return ERRORS.required('Name');
  }

  const trimmed = name.trim();

  if (trimmed.length < VALIDATION_RULES.name.minLength) {
    return ERRORS.minLength('Name', VALIDATION_RULES.name.minLength);
  }

  if (trimmed.length > VALIDATION_RULES.name.maxLength) {
    return ERRORS.maxLength('Name', VALIDATION_RULES.name.maxLength);
  }

  if (!VALIDATION_RULES.name.pattern.test(trimmed)) {
    return ERRORS.pattern('Name');
  }

  return null;
}

/**
 * Validate email field
 */
export function validateEmail(email: string, required: boolean = true): string | null {
  if (!email || !email.trim()) {
    return required ? ERRORS.required('Email') : null;
  }

  const trimmed = email.trim();

  if (trimmed.length > VALIDATION_RULES.email.maxLength) {
    return ERRORS.maxLength('Email', VALIDATION_RULES.email.maxLength);
  }

  if (!VALIDATION_RULES.email.pattern.test(trimmed)) {
    return ERRORS.invalid('Email');
  }

  // Additional email validation
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return ERRORS.invalid('Email');
  }

  const [localPart, domain] = parts;
  if (!localPart || !domain || !domain.includes('.')) {
    return ERRORS.invalid('Email');
  }

  return null;
}

/**
 * Validate phone field
 */
export function validatePhone(phone: string, required: boolean = true): string | null {
  if (!phone || !phone.trim()) {
    return required ? ERRORS.required('Phone') : null;
  }

  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');

  if (cleaned.length < VALIDATION_RULES.phone.minLength) {
    return 'Phone number is too short';
  }

  if (cleaned.length > VALIDATION_RULES.phone.maxLength) {
    return 'Phone number is too long';
  }

  if (!VALIDATION_RULES.phone.pattern.test(cleaned)) {
    return ERRORS.invalid('Phone number');
  }

  return null;
}

/**
 * Validate address field
 */
export function validateAddress(address: string): string | null {
  if (!address || !address.trim()) {
    return ERRORS.required('Address');
  }

  const trimmed = address.trim();

  if (trimmed.length < VALIDATION_RULES.address.minLength) {
    return ERRORS.minLength('Address', VALIDATION_RULES.address.minLength);
  }

  if (trimmed.length > VALIDATION_RULES.address.maxLength) {
    return ERRORS.maxLength('Address', VALIDATION_RULES.address.maxLength);
  }

  return null;
}

/**
 * Validate subject field
 */
export function validateSubject(subject: string): string | null {
  if (!subject || !subject.trim()) {
    return ERRORS.required('Subject');
  }

  const trimmed = subject.trim();

  if (trimmed.length < VALIDATION_RULES.subject.minLength) {
    return ERRORS.minLength('Subject', VALIDATION_RULES.subject.minLength);
  }

  if (trimmed.length > VALIDATION_RULES.subject.maxLength) {
    return ERRORS.maxLength('Subject', VALIDATION_RULES.subject.maxLength);
  }

  return null;
}

/**
 * Validate message field
 */
export function validateMessage(message: string, minLength: number = 10): string | null {
  if (!message || !message.trim()) {
    return ERRORS.required('Message');
  }

  const trimmed = message.trim();

  if (trimmed.length < minLength) {
    return ERRORS.minLength('Message', minLength);
  }

  if (trimmed.length > VALIDATION_RULES.message.maxLength) {
    return ERRORS.maxLength('Message', VALIDATION_RULES.message.maxLength);
  }

  return null;
}

/**
 * Validate service type
 */
export function validateServiceType(serviceType: string): string | null {
  if (!serviceType || !serviceType.trim()) {
    return ERRORS.required('Service type');
  }

  const validServices = [
    // Emergency
    'Car Lockout',
    'House Lockout',
    'Business Lockout',
    'Storage Unit Lockout',
    // Residential
    'Lock Replacement',
    'Lock Rekey',
    'Lock Repair',
    'Gate Locks',
    // Commercial
    'Commercial Lock Replacement',
    'Master Key Systems',
    'Access Control',
    'Emergency Exit Devices',
    // Automotive
    'Car Key Replacement',
    'Key Fob Programming',
    'Car Key Duplicate',
    'Ignition Repair',
    // Other
    'Other',
  ];

  if (!validServices.includes(serviceType)) {
    return 'Invalid service type selected';
  }

  return null;
}

/**
 * Validate urgency level
 */
export function validateUrgency(urgency: string): string | null {
  if (!urgency) {
    return ERRORS.required('Urgency');
  }

  const validUrgencies = ['asap', 'same-day', 'few-days', 'few-weeks', 'other'];

  if (!validUrgencies.includes(urgency)) {
    return 'Invalid urgency level';
  }

  return null;
}

/**
 * Validate notes field (optional)
 */
export function validateNotes(notes: string | undefined): string | null {
  if (!notes) {
    return null; // Notes are optional
  }

  if (notes.length > VALIDATION_RULES.notes.maxLength) {
    return ERRORS.maxLength('Notes', VALIDATION_RULES.notes.maxLength);
  }

  return null;
}

/**
 * Check for honeypot spam
 */
export function checkHoneypot(honeypot: string | undefined): boolean {
  // If honeypot field has any value, it's spam
  return !!honeypot && honeypot.trim().length > 0;
}

/**
 * Validate booking form data
 */
export function validateBookingForm(data: BookingFormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Check honeypot first
  if (checkHoneypot(data.honeypot)) {
    throw new ValidationError('Spam detected');
  }

  // Validate required fields
  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const phoneError = validatePhone(data.phone, true);
  if (phoneError) errors.phone = phoneError;

  const addressError = validateAddress(data.address);
  if (addressError) errors.address = addressError;

  const serviceTypeError = validateServiceType(data.serviceType);
  if (serviceTypeError) errors.serviceType = serviceTypeError;

  const urgencyError = validateUrgency(data.urgency);
  if (urgencyError) errors.urgency = urgencyError;

  // Validate optional fields
  if (data.email) {
    const emailError = validateEmail(data.email, false);
    if (emailError) errors.email = emailError;
  }

  if (data.notes) {
    const notesError = validateNotes(data.notes);
    if (notesError) errors.notes = notesError;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: ContactFormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validate required fields
  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email, true);
  if (emailError) errors.email = emailError;

  const subjectError = validateSubject(data.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  // Validate optional fields
  if (data.phone) {
    const phoneError = validatePhone(data.phone, false);
    if (phoneError) errors.phone = phoneError;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize booking form data
 */
export function sanitizeBookingForm(data: BookingFormData): BookingFormData {
  return {
    ...data,
    name: sanitizeString(data.name, VALIDATION_RULES.name.maxLength),
    phone: sanitizePhone(data.phone),
    email: data.email ? sanitizeEmail(data.email) : undefined,
    address: sanitizeString(data.address, VALIDATION_RULES.address.maxLength),
    serviceType: sanitizeString(data.serviceType),
    notes: data.notes ? sanitizeString(data.notes, VALIDATION_RULES.notes.maxLength) : undefined,
  };
}

/**
 * Sanitize contact form data
 */
export function sanitizeContactForm(data: ContactFormData): ContactFormData {
  return {
    ...data,
    name: sanitizeString(data.name, VALIDATION_RULES.name.maxLength),
    email: sanitizeEmail(data.email),
    phone: data.phone ? sanitizePhone(data.phone) : undefined,
    subject: sanitizeString(data.subject, VALIDATION_RULES.subject.maxLength),
    message: sanitizeString(data.message, VALIDATION_RULES.message.maxLength),
  };
}

/**
 * Validate and sanitize booking form
 */
export function processBookingForm(data: BookingFormData): BookingFormData {
  // Sanitize first
  const sanitized = sanitizeBookingForm(data);

  // Then validate
  const validation = validateBookingForm(sanitized);

  if (!validation.valid) {
    const errorMessages = Object.values(validation.errors).join(', ');
    throw new ValidationError(errorMessages);
  }

  return sanitized;
}

/**
 * Validate and sanitize contact form
 */
export function processContactForm(data: ContactFormData): ContactFormData {
  // Sanitize first
  const sanitized = sanitizeContactForm(data);

  // Then validate
  const validation = validateContactForm(sanitized);

  if (!validation.valid) {
    const errorMessages = Object.values(validation.errors).join(', ');
    throw new ValidationError(errorMessages);
  }

  return sanitized;
}

export default {
  // Validation functions
  validateName,
  validateEmail,
  validatePhone,
  validateAddress,
  validateSubject,
  validateMessage,
  validateServiceType,
  validateUrgency,
  validateNotes,
  validateBookingForm,
  validateContactForm,

  // Sanitization functions
  sanitizeString,
  sanitizeEmail,
  sanitizePhone,
  sanitizeBookingForm,
  sanitizeContactForm,

  // Processing functions
  processBookingForm,
  processContactForm,

  // Utility functions
  checkHoneypot,
};
