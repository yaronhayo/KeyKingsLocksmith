# reCAPTCHA v3 Integration

This directory contains the Google reCAPTCHA v3 integration for spam protection on forms.

## What is reCAPTCHA v3?

reCAPTCHA v3 is an invisible CAPTCHA that runs in the background and assigns a score (0.0 - 1.0) to each request:
- **1.0**: Very likely a human
- **0.0**: Very likely a bot

Unlike v2, it doesn't require users to solve puzzles or click checkboxes.

## Setup Instructions

### 1. Register Your Site

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **+** to create a new site
3. Fill in the details:
   - **Label**: Key Kings Locksmith
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domains:
     - `keykingslocksmithsc.com`
     - `www.keykingslocksmithsc.com`
     - `localhost` (for development)
4. Accept the terms and click **Submit**

### 2. Get Your Keys

After registration, you'll receive two keys:
- **Site Key**: Used in the frontend (public)
- **Secret Key**: Used in the backend (private)

### 3. Configure Environment Variables

Add both keys to your `.env` file:

```bash
# reCAPTCHA v3 Keys
GOOGLE_RECAPTCHA_SITE_KEY=6Lc...your_site_key_here
GOOGLE_RECAPTCHA_SECRET_KEY=6Lc...your_secret_key_here
```

For Astro to expose the site key to the client, also add:

```bash
PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=6Lc...your_site_key_here
```

**Important**: Never expose the secret key to the client!

### 4. Verify Configuration

The reCAPTCHA integration is already implemented in all forms. To verify it's working:

1. Fill out a form on your site
2. Check the browser console for reCAPTCHA logs
3. Check the server logs for verification results
4. Visit the [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin) to see analytics

## How It Works

### Client-Side (Forms)

1. reCAPTCHA script loads automatically when forms are present
2. When user submits a form, a token is generated
3. Token is sent to the server with form data

```javascript
// Automatically handled in form components
const token = await grecaptcha.execute(siteKey, { action: 'booking' });
```

### Server-Side (API Routes)

1. Server receives token with form data
2. Token is verified with Google's API
3. Score is checked against threshold
4. Request is accepted or rejected

```typescript
const result = await verifyRecaptcha({
  token: data.recaptchaToken,
  expectedAction: 'booking',
  scoreThreshold: 0.5,
});
```

## Score Thresholds

Different forms use different thresholds based on their sensitivity:

| Form Type | Threshold | Reason |
|-----------|-----------|--------|
| Booking | 0.5 | High-value conversion, moderate protection |
| Contact | 0.5 | Important lead, moderate protection |
| Newsletter | 0.3 | Low-risk, more lenient |

### Adjusting Thresholds

Edit `src/lib/recaptcha/verify.ts`:

```typescript
export const RecaptchaConfig = {
  booking: {
    action: 'booking',
    scoreThreshold: 0.5, // Adjust this value
  },
  // ...
};
```

**Guidelines**:
- **0.9+**: Very strict, may block some humans
- **0.7-0.8**: Strict, good for high-value forms
- **0.5**: Balanced (recommended)
- **0.3**: Lenient, blocks obvious bots
- **0.1**: Very lenient, minimal protection

## Actions

Each form uses a specific action name to track different types of submissions:

- `booking`: Service booking form
- `contact`: Contact form
- `newsletter`: Newsletter signup

Actions help you:
- Track which forms are being targeted by bots
- Set different thresholds per form type
- Analyze patterns in the reCAPTCHA dashboard

## Testing

### Development Mode

If `GOOGLE_RECAPTCHA_SECRET_KEY` is not set, verification is skipped:

```typescript
// Automatically returns success in development
if (!RECAPTCHA_SECRET_KEY) {
  return { success: true, score: 1.0 };
}
```

### Testing with Real Keys

1. Use test keys from Google (always return success):
   - Site key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
   - Secret key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

2. Or use your real keys and monitor the dashboard

### Manual Testing

Test the verification function directly:

```typescript
import { verifyRecaptcha } from './lib/recaptcha/verify';

const result = await verifyRecaptcha({
  token: 'test_token',
  expectedAction: 'booking',
  scoreThreshold: 0.5,
});

console.log(result);
```

## Monitoring

### reCAPTCHA Dashboard

Visit the [Admin Console](https://www.google.com/recaptcha/admin) to see:
- Request volume
- Score distribution
- Suspicious activity
- Action breakdown

### Server Logs

Check your server logs for verification results:

```
✓ reCAPTCHA verified for booking (score: 0.9)
⚠ reCAPTCHA score too low: 0.2 < 0.5
❌ reCAPTCHA verification failed: invalid-input-response
```

## Troubleshooting

### "reCAPTCHA token is required"

**Cause**: Token not sent from client
**Solution**: Check that reCAPTCHA script is loading and executing

### "invalid-input-secret"

**Cause**: Wrong secret key
**Solution**: Verify `GOOGLE_RECAPTCHA_SECRET_KEY` in `.env`

### "invalid-input-response"

**Cause**: Invalid or expired token
**Solution**: Tokens expire after 2 minutes. Ensure form submits quickly.

### "timeout-or-duplicate"

**Cause**: Token already used or expired
**Solution**: Generate a new token for each submission

### "Score too low"

**Cause**: reCAPTCHA thinks request is suspicious
**Solution**: 
- Lower the threshold
- Check for bot-like behavior (rapid submissions, etc.)
- Review in reCAPTCHA dashboard

### Forms not protected

**Checklist**:
- [ ] Site key configured in `.env`
- [ ] Secret key configured in `.env`
- [ ] Domain added to reCAPTCHA console
- [ ] reCAPTCHA script loading in browser
- [ ] Token being sent with form data
- [ ] Server verifying token

## Best Practices

### Security

1. **Never expose secret key**: Keep it server-side only
2. **Verify on server**: Always verify tokens server-side
3. **Check action**: Verify the action matches expected value
4. **Use HTTPS**: reCAPTCHA requires HTTPS in production
5. **Rotate keys**: If compromised, regenerate in console

### User Experience

1. **Invisible**: v3 runs in background, no user interaction
2. **Fast**: Verification happens during form submission
3. **Fallback**: Handle verification failures gracefully
4. **Privacy**: Show privacy policy link (already included)

### Performance

1. **Lazy load**: Script loads only when forms are present
2. **Async**: Script loads asynchronously
3. **Cache**: Tokens are cached by reCAPTCHA
4. **Timeout**: Set reasonable timeout for verification

## Privacy & Compliance

### GDPR

reCAPTCHA collects user data. Ensure:
- Privacy policy mentions reCAPTCHA
- Cookie consent includes reCAPTCHA
- Users can opt-out (though forms won't work)

### Privacy Policy Text

Already included in forms:

> "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply."

## API Reference

### `verifyRecaptcha(options)`

Verify a reCAPTCHA token.

```typescript
interface RecaptchaVerificationOptions {
  token: string;              // Token from client
  remoteip?: string;          // Client IP (optional)
  expectedAction?: string;    // Expected action name
  scoreThreshold?: number;    // Minimum score (0.0-1.0)
}

interface RecaptchaVerificationResult {
  success: boolean;           // Verification passed
  score?: number;             // Score (0.0-1.0)
  action?: string;            // Action name
  challenge_ts?: string;      // Challenge timestamp
  hostname?: string;          // Request hostname
  error_codes?: string[];     // Error codes if failed
}
```

### `requireRecaptcha(token, action, remoteip?)`

Middleware-style verification that throws on failure.

```typescript
await requireRecaptcha(token, 'booking', clientIP);
// Throws error if verification fails
```

### `getClientIP(request)`

Extract client IP from request headers.

```typescript
const ip = getClientIP(request);
```

## Resources

- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Admin Console](https://www.google.com/recaptcha/admin)
- [FAQ](https://developers.google.com/recaptcha/docs/faq)
- [Best Practices](https://developers.google.com/recaptcha/docs/v3#best_practices)
