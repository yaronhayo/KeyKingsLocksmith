/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals and sends to analytics
 */

interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * Send metric to analytics
 */
function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Vercel Analytics
  if (window.va) {
    window.va('event', {
      name: 'web-vitals',
      data: {
        metric: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        navigationType: metric.navigationType,
      },
    });
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }
}

/**
 * Get rating for a metric value
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],
    FID: [100, 300],
    FCP: [1800, 3000],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
    INP: [200, 500],
  };

  const [good, poor] = thresholds[name] || [0, 0];
  
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Initialize Web Vitals monitoring
 */
export async function initWebVitals() {
  try {
    const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');

    // Cumulative Layout Shift (target: < 0.1)
    onCLS((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('CLS', metric.value),
      });
    });

    // First Input Delay (target: < 100ms)
    onFID((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('FID', metric.value),
      });
    });

    // First Contentful Paint (target: < 1.8s)
    onFCP((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('FCP', metric.value),
      });
    });

    // Largest Contentful Paint (target: < 2.5s)
    onLCP((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('LCP', metric.value),
      });
    });

    // Time to First Byte (target: < 800ms)
    onTTFB((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('TTFB', metric.value),
      });
    });

    // Interaction to Next Paint (target: < 200ms)
    onINP((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('INP', metric.value),
      });
    });
  } catch (error) {
    console.error('Failed to load web-vitals:', error);
  }
}

/**
 * Report Web Vitals to console (for debugging)
 */
export function reportWebVitals() {
  if (typeof window === 'undefined') return;

  // Use Performance Observer API
  if ('PerformanceObserver' in window) {
    // Observe LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('[LCP]', Math.round(lastEntry.startTime), 'ms');
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Observe FID
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        console.log('[FID]', Math.round(entry.processingStart - entry.startTime), 'ms');
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Observe CLS
    const clsObserver = new PerformanceObserver((list) => {
      let clsScore = 0;
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      console.log('[CLS]', clsScore.toFixed(3));
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // Report navigation timing
  if ('performance' in window && 'timing' in window.performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = window.performance.timing;
        const ttfb = timing.responseStart - timing.requestStart;
        const domLoad = timing.domContentLoadedEventEnd - timing.navigationStart;
        const windowLoad = timing.loadEventEnd - timing.navigationStart;

        console.log('[Performance Timing]', {
          TTFB: `${ttfb}ms`,
          'DOM Load': `${domLoad}ms`,
          'Window Load': `${windowLoad}ms`,
        });
      }, 0);
    });
  }
}

// Type augmentation for Vercel Analytics
declare global {
  interface Window {
    va?: (event: string, data: any) => void;
  }
}
