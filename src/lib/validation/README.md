# Form Validation

This directory contains comprehensive form validation utilities for both client-side and server-side validation.

## Overview

The validation system provides:
- **Client-side validation**: Real-time feedback in forms
- **Server-side validation**: Security and data integrity
- **Data sanitization**: Clean and safe data processing
- **Error handling**: User-friendly error messages

## Validation Rules

### Name
- **Required**: Yes
- **Min length**: 2 characters
- **Max length**: 100 characters
- **Pattern**: Letters, spaces, hyphens, apostrophes, periods only
- **Example**: `John Smith`, `Mary O'Brien`, `Jean-Pierre`

### Email
- **Required**: Yes (contact), Optional (booking)
- **Max length**: 254 characters
- **Pattern**: Standard email format (`user@domain.com`)
- **Validation**: Checks for @ symbol, domain, and TLD

### Phone
- **Required**: Yes (booking), Optional (contact)
- **Min length**: 10 digits
- **Max length**: 15 digits
- **Pattern**: International format allowed (`+1`, country codes)
- **Example**: `(864) 900-9597`, `+1-864-900-9597`

### Address
- **Required**: Yes (booking only)
- **Min length**: 5 characters
- **Max length**: 200 characters
- **Example**: `123 Main St, Anderson, SC 29621`

### Subject
- **Required**: Yes (contact only)
- **Min length**: 5 characters
- **Max length**: 200 characters

### Message
- **Required**: Yes (contact only)
- **Min length**: 10 characters
- **Max length**: 2000 characters

### Service Type
- **Required**: Yes (booking only)
- **Valid values**: Predefined list of services
- **Categories**: Emergency, Residential, Commercial, Automotive

### Urgency
- **Required**: Yes (booking only)
- **Valid values**: `asap`, `same-day`, `few-days`, `few-weeks`, `other`

### Notes
- **Required**: No
- **Max length**: 1000 characters

## Usage

### Server-Side Validation

#### Booking Form

```typescript
import { processBookingForm } from './lib/validation/forms';

try {
  const validatedData = processBookingForm(rawData);
  // Data is now validated and sanitized
} catch (error) {
  // Handle validation error
  console.error(error.message);
}
```

#### Contact Form

```typescript
import { processContactForm } from './lib/validation/forms';

try {
  const validatedData = processContactForm(rawData);
  // Data is now validated and sanitized
} catch (error) {
  // Handle validation error
  console.error(error.message);
}
```

#### Individual Field Validation

```typescript
import {
  validateName,
  validateEmail,
  validatePhone,
} from './lib/validation/forms';

const nameError = validateName('John');
if (nameError) {
  console.error(nameError); // null if valid
}

const emailError = validateEmail('user@example.com');
if (emailError) {
  console.error(emailError); // null if valid
}
```

### Client-Side Validation

Client-side validation is already implemented in form components using the `validateForm` utility from `src/lib/api/client.ts`.

```typescript
import { validateForm } from '../../lib/api/client';

// Validate name
const nameError = validateForm.name('John Smith');
if (nameError) {
  showError('name', nameError);
}

// Validate email
const emailError = validateForm.email('user@example.com');
if (emailError) {
  showError('email', emailError);
}
```

## Data Sanitization

All form data is automatically sanitized before validation:

### String Sanitization
- Trims whitespace
- Removes dangerous characters (`<`, `>`, `'`, `"`)
- Normalizes multiple spaces to single space
- Enforces maximum length

### Email Sanitization
- Converts to lowercase
- Trims whitespace
- Enforces maximum length (254 chars)

### Phone Sanitization
- Removes invalid characters
- Keeps only digits, `+`, `(`, `)`, `-`, `.`, spaces
- Enforces maximum length (15 chars)

## Security Features

### Honeypot Protection

Forms include a hidden honeypot field to catch bots:

```html
<input type="text" name="website" class="hidden" tabindex="-1" autocomplete="off" />
```

If this field has any value, the submission is rejected as spam.

### SQL Injection Prevention

All inputs are sanitized to remove potentially dangerous characters before database operations.

### XSS Prevention

HTML special characters are removed or escaped to prevent cross-site scripting attacks.

### Rate Limiting

API routes implement rate limiting to prevent abuse:
- Booking: 3 submissions per 5 minutes per phone
- Contact: 5 submissions per 10 minutes per email
- Newsletter: 2 submissions per day per email

## Error Messages

### User-Friendly Errors

Validation errors are designed to be clear and actionable:

```typescript
// Bad
"Invalid input"

// Good
"Name must be at least 2 characters"
"Email format is invalid"
"Phone number is too short"
```

### Error Display

Errors are displayed:
1. **Inline**: Below the field with red text
2. **Visual**: Field border turns red
3. **Real-time**: Validation on blur and input events
4. **Accessible**: Proper ARIA labels and roles

## Validation Flow

### 1. Client-Side (Form Component)

```
User Input → Real-time Validation → Visual Feedback
                                   ↓
                            Submit if Valid
```

### 2. Server-Side (API Route)

```
Request → Parse Data → Sanitize → Validate → Process
                                     ↓
                              Reject if Invalid
```

## Testing Validation

### Valid Test Data

```typescript
// Booking Form
{
  name: "John Smith",
  phone: "(864) 900-9597",
  email: "john@example.com",
  address: "123 Main St, Anderson, SC 29621",
  serviceType: "Car Lockout",
  urgency: "asap",
  notes: "Locked keys in trunk"
}

// Contact Form
{
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "(864) 555-0123",
  subject: "Question about services",
  message: "I need help with my home locks."
}
```

### Invalid Test Data

```typescript
// Too short name
{ name: "J" } // Error: "Name must be at least 2 characters"

// Invalid email
{ email: "notanemail" } // Error: "Email format is invalid"

// Invalid phone
{ phone: "123" } // Error: "Phone number is too short"

// Missing required field
{ name: "" } // Error: "Name is required"
```

## API Reference

### Validation Functions

```typescript
// Individual field validators
validateName(name: string): string | null
validateEmail(email: string, required?: boolean): string | null
validatePhone(phone: string, required?: boolean): string | null
validateAddress(address: string): string | null
validateSubject(subject: string): string | null
validateMessage(message: string, minLength?: number): string | null
validateServiceType(serviceType: string): string | null
validateUrgency(urgency: string): string | null
validateNotes(notes: string | undefined): string | null

// Form validators
validateBookingForm(data: BookingFormData): { valid: boolean; errors: Record<string, string> }
validateContactForm(data: ContactFormData): { valid: boolean; errors: Record<string, string> }

// Sanitization functions
sanitizeString(input: string, maxLength?: number): string
sanitizeEmail(email: string): string
sanitizePhone(phone: string): string
sanitizeBookingForm(data: BookingFormData): BookingFormData
sanitizeContactForm(data: ContactFormData): ContactFormData

// Processing functions (sanitize + validate)
processBookingForm(data: BookingFormData): BookingFormData
processContactForm(data: ContactFormData): ContactFormData

// Utility functions
checkHoneypot(honeypot: string | undefined): boolean
```

### Return Values

- **Validation functions**: Return `null` if valid, error message string if invalid
- **Form validators**: Return object with `valid` boolean and `errors` object
- **Processing functions**: Return sanitized data or throw `ValidationError`

## Best Practices

### 1. Always Validate Server-Side

Never trust client-side validation alone. Always validate on the server.

```typescript
// ❌ Bad - Only client-side
if (validateForm.email(email)) {
  submitToServer(email);
}

// ✅ Good - Both client and server
// Client: Immediate feedback
if (validateForm.email(email)) {
  // Server: Security validation
  const response = await submitToServer(email);
}
```

### 2. Sanitize Before Validation

Always sanitize input before validation to ensure consistent results.

```typescript
// ✅ Good
const sanitized = sanitizeEmail(rawEmail);
const error = validateEmail(sanitized);
```

### 3. Provide Clear Error Messages

Help users fix their mistakes with specific, actionable messages.

```typescript
// ❌ Bad
"Invalid"

// ✅ Good
"Email format is invalid. Please use format: user@example.com"
```

### 4. Validate Early, Validate Often

- Validate on blur (when user leaves field)
- Validate on submit (before sending to server)
- Validate on server (before processing)

### 5. Handle Errors Gracefully

Don't let validation errors crash your application.

```typescript
try {
  const validated = processBookingForm(data);
  await sendEmail(validated);
} catch (error) {
  if (error instanceof ValidationError) {
    return { success: false, error: error.message };
  }
  // Handle other errors
  return { success: false, error: 'An unexpected error occurred' };
}
```

## Troubleshooting

### "Name contains invalid characters"

**Cause**: Name includes numbers or special characters
**Solution**: Use only letters, spaces, hyphens, apostrophes, periods

### "Email format is invalid"

**Cause**: Email doesn't match standard format
**Solution**: Ensure email has format `user@domain.com`

### "Phone number is too short"

**Cause**: Less than 10 digits
**Solution**: Include area code and full number

### "Validation passed client-side but failed server-side"

**Cause**: Client and server validation out of sync
**Solution**: Ensure both use same validation rules

## Extending Validation

### Adding New Field Validation

```typescript
// 1. Add validation rule
const VALIDATION_RULES = {
  // ...existing rules
  zipCode: {
    pattern: /^\d{5}(-\d{4})?$/,
  },
};

// 2. Create validator function
export function validateZipCode(zipCode: string): string | null {
  if (!zipCode || !zipCode.trim()) {
    return 'ZIP code is required';
  }

  if (!VALIDATION_RULES.zipCode.pattern.test(zipCode)) {
    return 'Invalid ZIP code format';
  }

  return null;
}

// 3. Add to form validator
export function validateBookingForm(data: BookingFormData) {
  // ...existing validation
  
  if (data.zipCode) {
    const zipError = validateZipCode(data.zipCode);
    if (zipError) errors.zipCode = zipError;
  }
  
  // ...
}
```

### Custom Validation Rules

```typescript
// Add custom validator
export function validateCustomField(value: string): string | null {
  // Your custom logic
  if (/* condition */) {
    return 'Custom error message';
  }
  return null;
}
```

## Resources

- [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [HTML5 Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [Regular Expressions](https://regex101.com/)
