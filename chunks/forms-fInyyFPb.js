class AppError extends Error {
  code;
  statusCode;
  isOperational;
  constructor(message, code = "INTERNAL_ERROR", statusCode = 500, isOperational = true) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
class ValidationError extends AppError {
  constructor(message, field) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'\.]+$/
  },
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    minLength: 10,
    maxLength: 15,
    pattern: /^[\+]?[1-9]\d{7,14}$/
  },
  address: {
    minLength: 5,
    maxLength: 200
  },
  subject: {
    minLength: 5,
    maxLength: 200
  },
  message: {
    maxLength: 2e3
  },
  notes: {
    maxLength: 1e3
  }
};
const ERRORS = {
  required: (field) => `${field} is required`,
  minLength: (field, min) => `${field} must be at least ${min} characters`,
  maxLength: (field, max) => `${field} must not exceed ${max} characters`,
  invalid: (field) => `${field} format is invalid`,
  pattern: (field) => `${field} contains invalid characters`
};
function sanitizeString(input, maxLength) {
  let sanitized = input.trim().replace(/[<>'"]/g, "").replace(/\s+/g, " ");
  if (maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}
function sanitizeEmail(email) {
  return email.toLowerCase().trim().substring(0, VALIDATION_RULES.email.maxLength);
}
function sanitizePhone(phone) {
  return phone.replace(/[^\d+()-.\s]/g, "").substring(0, VALIDATION_RULES.phone.maxLength);
}
function validateName(name) {
  if (!name || !name.trim()) {
    return ERRORS.required("Name");
  }
  const trimmed = name.trim();
  if (trimmed.length < VALIDATION_RULES.name.minLength) {
    return ERRORS.minLength("Name", VALIDATION_RULES.name.minLength);
  }
  if (trimmed.length > VALIDATION_RULES.name.maxLength) {
    return ERRORS.maxLength("Name", VALIDATION_RULES.name.maxLength);
  }
  if (!VALIDATION_RULES.name.pattern.test(trimmed)) {
    return ERRORS.pattern("Name");
  }
  return null;
}
function validateEmail(email, required = true) {
  if (!email || !email.trim()) {
    return required ? ERRORS.required("Email") : null;
  }
  const trimmed = email.trim();
  if (trimmed.length > VALIDATION_RULES.email.maxLength) {
    return ERRORS.maxLength("Email", VALIDATION_RULES.email.maxLength);
  }
  if (!VALIDATION_RULES.email.pattern.test(trimmed)) {
    return ERRORS.invalid("Email");
  }
  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return ERRORS.invalid("Email");
  }
  const [localPart, domain] = parts;
  if (!localPart || !domain || !domain.includes(".")) {
    return ERRORS.invalid("Email");
  }
  return null;
}
function validatePhone(phone, required = true) {
  if (!phone || !phone.trim()) {
    return required ? ERRORS.required("Phone") : null;
  }
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
  if (cleaned.length < VALIDATION_RULES.phone.minLength) {
    return "Phone number is too short";
  }
  if (cleaned.length > VALIDATION_RULES.phone.maxLength) {
    return "Phone number is too long";
  }
  if (!VALIDATION_RULES.phone.pattern.test(cleaned)) {
    return ERRORS.invalid("Phone number");
  }
  return null;
}
function validateAddress(address) {
  if (!address || !address.trim()) {
    return ERRORS.required("Address");
  }
  const trimmed = address.trim();
  if (trimmed.length < VALIDATION_RULES.address.minLength) {
    return ERRORS.minLength("Address", VALIDATION_RULES.address.minLength);
  }
  if (trimmed.length > VALIDATION_RULES.address.maxLength) {
    return ERRORS.maxLength("Address", VALIDATION_RULES.address.maxLength);
  }
  return null;
}
function validateSubject(subject) {
  if (!subject || !subject.trim()) {
    return ERRORS.required("Subject");
  }
  const trimmed = subject.trim();
  if (trimmed.length < VALIDATION_RULES.subject.minLength) {
    return ERRORS.minLength("Subject", VALIDATION_RULES.subject.minLength);
  }
  if (trimmed.length > VALIDATION_RULES.subject.maxLength) {
    return ERRORS.maxLength("Subject", VALIDATION_RULES.subject.maxLength);
  }
  return null;
}
function validateMessage(message, minLength = 10) {
  if (!message || !message.trim()) {
    return ERRORS.required("Message");
  }
  const trimmed = message.trim();
  if (trimmed.length < minLength) {
    return ERRORS.minLength("Message", minLength);
  }
  if (trimmed.length > VALIDATION_RULES.message.maxLength) {
    return ERRORS.maxLength("Message", VALIDATION_RULES.message.maxLength);
  }
  return null;
}
function validateServiceType(serviceType) {
  if (!serviceType || !serviceType.trim()) {
    return ERRORS.required("Service type");
  }
  const validServices = [
    // Emergency
    "Car Lockout",
    "House Lockout",
    "Business Lockout",
    "Storage Unit Lockout",
    // Residential
    "Lock Replacement",
    "Lock Rekey",
    "Lock Repair",
    "Gate Locks",
    // Commercial
    "Commercial Lock Replacement",
    "Master Key Systems",
    "Access Control",
    "Emergency Exit Devices",
    // Automotive
    "Car Key Replacement",
    "Key Fob Programming",
    "Car Key Duplicate",
    "Ignition Repair",
    // Other
    "Other"
  ];
  if (!validServices.includes(serviceType)) {
    return "Invalid service type selected";
  }
  return null;
}
function validateUrgency(urgency) {
  if (!urgency) {
    return ERRORS.required("Urgency");
  }
  const validUrgencies = ["asap", "same-day", "few-days", "few-weeks", "other"];
  if (!validUrgencies.includes(urgency)) {
    return "Invalid urgency level";
  }
  return null;
}
function validateNotes(notes) {
  if (!notes) {
    return null;
  }
  if (notes.length > VALIDATION_RULES.notes.maxLength) {
    return ERRORS.maxLength("Notes", VALIDATION_RULES.notes.maxLength);
  }
  return null;
}
function checkHoneypot(honeypot) {
  return !!honeypot && honeypot.trim().length > 0;
}
function validateBookingForm(data) {
  const errors = {};
  if (checkHoneypot(data.honeypot)) {
    throw new ValidationError("Spam detected");
  }
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
    errors
  };
}
function validateContactForm(data) {
  const errors = {};
  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;
  const emailError = validateEmail(data.email, true);
  if (emailError) errors.email = emailError;
  const subjectError = validateSubject(data.subject);
  if (subjectError) errors.subject = subjectError;
  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;
  if (data.phone) {
    const phoneError = validatePhone(data.phone, false);
    if (phoneError) errors.phone = phoneError;
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
function sanitizeBookingForm(data) {
  return {
    ...data,
    name: sanitizeString(data.name, VALIDATION_RULES.name.maxLength),
    phone: sanitizePhone(data.phone),
    email: data.email ? sanitizeEmail(data.email) : void 0,
    address: sanitizeString(data.address, VALIDATION_RULES.address.maxLength),
    serviceType: sanitizeString(data.serviceType),
    notes: data.notes ? sanitizeString(data.notes, VALIDATION_RULES.notes.maxLength) : void 0
  };
}
function sanitizeContactForm(data) {
  return {
    ...data,
    name: sanitizeString(data.name, VALIDATION_RULES.name.maxLength),
    email: sanitizeEmail(data.email),
    phone: data.phone ? sanitizePhone(data.phone) : void 0,
    subject: sanitizeString(data.subject, VALIDATION_RULES.subject.maxLength),
    message: sanitizeString(data.message, VALIDATION_RULES.message.maxLength)
  };
}
function processBookingForm(data) {
  const sanitized = sanitizeBookingForm(data);
  const validation = validateBookingForm(sanitized);
  if (!validation.valid) {
    const errorMessages = Object.values(validation.errors).join(", ");
    throw new ValidationError(errorMessages);
  }
  return sanitized;
}
function processContactForm(data) {
  const sanitized = sanitizeContactForm(data);
  const validation = validateContactForm(sanitized);
  if (!validation.valid) {
    const errorMessages = Object.values(validation.errors).join(", ");
    throw new ValidationError(errorMessages);
  }
  return sanitized;
}

export { checkHoneypot, processBookingForm, processContactForm, sanitizeBookingForm, sanitizeContactForm, sanitizeEmail, sanitizePhone, sanitizeString, validateAddress, validateBookingForm, validateContactForm, validateEmail, validateMessage, validateName, validateNotes, validatePhone, validateServiceType, validateSubject, validateUrgency };
