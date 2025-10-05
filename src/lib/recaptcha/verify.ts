/**
 * Google reCAPTCHA v3 Server-Side Verification
 * 
 * This module handles server-side verification of reCAPTCHA tokens
 * to protect forms from spam and abuse.
 */

const RECAPTCHA_SECRET_KEY = import.meta.env.GOOGLE_RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

// Minimum score threshold for reCAPTCHA v3 (0.0 - 1.0)
// 0.0 is very likely a bot, 1.0 is very likely a human
const DEFAULT_SCORE_THRESHOLD = 0.5;

export interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
}

export interface RecaptchaVerificationOptions {
  token: string;
  remoteip?: string;
  expectedAction?: string;
  scoreThreshold?: number;
}

/**
 * Verify a reCAPTCHA token with Google's API
 * 
 * @param options - Verification options
 * @returns Verification result with success status and score
 */
export async function verifyRecaptcha(
  options: RecaptchaVerificationOptions
): Promise<RecaptchaVerificationResult> {
  const {
    token,
    remoteip,
    expectedAction,
    scoreThreshold = DEFAULT_SCORE_THRESHOLD,
  } = options;

  // Skip verification if no secret key is configured (development mode)
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('⚠️  reCAPTCHA secret key not configured - skipping verification');
    return {
      success: true,
      score: 1.0,
      action: expectedAction,
    };
  }

  // Validate token format
  if (!token || typeof token !== 'string') {
    return {
      success: false,
      error_codes: ['invalid-token-format'],
    };
  }

  try {
    // Build request body
    const body = new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    });

    if (remoteip) {
      body.append('remoteip', remoteip);
    }

    // Make verification request to Google
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`reCAPTCHA API returned ${response.status}`);
    }

    const data: RecaptchaVerificationResult = await response.json();

    // Check if verification was successful
    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data.error_codes);
      return data;
    }

    // Verify action matches (if provided)
    if (expectedAction && data.action !== expectedAction) {
      console.warn(
        `reCAPTCHA action mismatch: expected "${expectedAction}", got "${data.action}"`
      );
      return {
        success: false,
        error_codes: ['action-mismatch'],
      };
    }

    // Check score threshold (reCAPTCHA v3 only)
    if (data.score !== undefined && data.score < scoreThreshold) {
      console.warn(
        `reCAPTCHA score too low: ${data.score} < ${scoreThreshold}`
      );
      return {
        ...data,
        success: false,
        error_codes: ['score-too-low'],
      };
    }

    // Verification successful
    return data;

  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      error_codes: ['verification-error'],
    };
  }
}

/**
 * Middleware-style verification function for API routes
 * 
 * @param token - reCAPTCHA token from client
 * @param action - Expected action name
 * @param remoteip - Client IP address (optional)
 * @returns True if verification passes, throws error otherwise
 */
export async function requireRecaptcha(
  token: string | undefined,
  action: string,
  remoteip?: string
): Promise<boolean> {
  // Skip if no token provided and reCAPTCHA is not configured
  if (!token && !RECAPTCHA_SECRET_KEY) {
    return true;
  }

  if (!token) {
    throw new Error('reCAPTCHA token is required');
  }

  const result = await verifyRecaptcha({
    token,
    remoteip,
    expectedAction: action,
  });

  if (!result.success) {
    const errorMsg = result.error_codes?.join(', ') || 'Verification failed';
    throw new Error(`reCAPTCHA verification failed: ${errorMsg}`);
  }

  return true;
}

/**
 * Get client IP address from request
 * 
 * @param request - Astro API request object
 * @returns Client IP address or undefined
 */
export function getClientIP(request: Request): string | undefined {
  // Try various headers that might contain the client IP
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip', // Cloudflare
    'x-vercel-forwarded-for', // Vercel
  ];

  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      return value.split(',')[0].trim();
    }
  }

  return undefined;
}

/**
 * Configuration helper for different form types
 */
export const RecaptchaConfig = {
  booking: {
    action: 'booking',
    scoreThreshold: 0.5,
  },
  contact: {
    action: 'contact',
    scoreThreshold: 0.5,
  },
  newsletter: {
    action: 'newsletter',
    scoreThreshold: 0.3, // Lower threshold for newsletter (less critical)
  },
} as const;

export default {
  verifyRecaptcha,
  requireRecaptcha,
  getClientIP,
  RecaptchaConfig,
};
