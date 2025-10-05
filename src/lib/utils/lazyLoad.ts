/**
 * Lazy load scripts for better performance
 * Only loads scripts when they're needed or when the page is idle
 */

/**
 * Load a script dynamically
 * @param src - Script source URL
 * @param options - Script loading options
 */
export function loadScript(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    type?: string;
    onLoad?: () => void;
    onError?: (error: Error) => void;
  } = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? false;
    
    if (options.type) {
      script.type = options.type;
    }

    script.onload = () => {
      options.onLoad?.();
      resolve();
    };

    script.onerror = () => {
      const error = new Error(`Failed to load script: ${src}`);
      options.onError?.(error);
      reject(error);
    };

    document.head.appendChild(script);
  });
}

/**
 * Load a script when the browser is idle
 * Falls back to setTimeout if requestIdleCallback is not supported
 */
export function loadScriptOnIdle(
  src: string,
  options?: Parameters<typeof loadScript>[1]
): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadScript(src, options);
    });
  } else {
    setTimeout(() => {
      loadScript(src, options);
    }, 1000);
  }
}

/**
 * Load a script when user interacts with the page
 * Useful for analytics or chat widgets
 */
export function loadScriptOnInteraction(
  src: string,
  options?: Parameters<typeof loadScript>[1]
): void {
  const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
  
  const loadOnce = () => {
    loadScript(src, options);
    events.forEach(event => {
      document.removeEventListener(event, loadOnce);
    });
  };

  events.forEach(event => {
    document.addEventListener(event, loadOnce, { once: true, passive: true });
  });
}

/**
 * Load a script when an element becomes visible
 * Useful for loading scripts for below-the-fold content
 */
export function loadScriptOnVisible(
  element: Element,
  src: string,
  options?: Parameters<typeof loadScript>[1]
): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadScript(src, options);
          observer.disconnect();
        }
      });
    },
    { rootMargin: '50px' }
  );

  observer.observe(element);
}

/**
 * Preload a resource for faster loading when needed
 */
export function preloadResource(
  href: string,
  as: 'script' | 'style' | 'font' | 'image'
): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
}

/**
 * Prefetch a resource for future navigation
 */
export function prefetchResource(href: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}
