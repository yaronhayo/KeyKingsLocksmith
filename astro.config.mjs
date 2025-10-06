import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://keykingslocksmithsc.com',
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    },
    imageService: true,
    imagesConfig: {
      sizes: [320, 640, 768, 1024, 1280, 1536],
      formats: ['image/avif', 'image/webp'],
      domains: ['keykingslocksmithsc.com']
    }
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    sitemap({
      filter: (page) => {
        // Exclude API routes, thank-you page, and trailing slash duplicates
        if (page.includes('/api/')) return false;
        if (page.includes('/thank-you')) return false;
        if (page.endsWith('/') && page !== 'https://keykingslocksmithsc.com/') return false;
        return true;
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        // Main pages
        'https://keykingslocksmithsc.com/',
        'https://keykingslocksmithsc.com/about',
        'https://keykingslocksmithsc.com/contact',
        'https://keykingslocksmithsc.com/book-service',
        'https://keykingslocksmithsc.com/faq',
        'https://keykingslocksmithsc.com/reviews',
        'https://keykingslocksmithsc.com/accessibility',

        // Services
        'https://keykingslocksmithsc.com/services',
        'https://keykingslocksmithsc.com/services/emergency-locksmith',
        'https://keykingslocksmithsc.com/services/residential-locksmith',
        'https://keykingslocksmithsc.com/services/commercial-locksmith',
        'https://keykingslocksmithsc.com/services/automotive-locksmith',

        // Service Areas
        'https://keykingslocksmithsc.com/service-areas',
        'https://keykingslocksmithsc.com/service-areas/anderson-sc',
        'https://keykingslocksmithsc.com/service-areas/greenville-sc',
        'https://keykingslocksmithsc.com/service-areas/clemson-sc',

        // Legal
        'https://keykingslocksmithsc.com/privacy-policy',
        'https://keykingslocksmithsc.com/terms-of-service'
      ],
      serialize: (item) => {
        // Remove trailing slashes for consistency
        if (item.url.endsWith('/') && item.url !== 'https://keykingslocksmithsc.com/') {
          item.url = item.url.slice(0, -1);
        }

        // Set custom priorities based on page importance
        if (item.url === 'https://keykingslocksmithsc.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/services/emergency-locksmith')) {
          item.priority = 0.95;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/services/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url === 'https://keykingslocksmithsc.com/services') {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/service-areas/')) {
          item.priority = 0.85;
          item.changefreq = 'monthly';
        } else if (item.url === 'https://keykingslocksmithsc.com/service-areas') {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url === 'https://keykingslocksmithsc.com/book-service') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/faq')) {
          item.priority = 0.75;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/reviews')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/about')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/contact')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/accessibility')) {
          item.priority = 0.5;
          item.changefreq = 'yearly';
        } else if (item.url.includes('/privacy-policy') || item.url.includes('/terms-of-service')) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }

        return item;
      }
    }),
    react()
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('date-fns')) {
                return 'date-vendor';
              }
              // Other node_modules go into vendor chunk
              return 'vendor';
            }
          },
          // Optimize chunk file names for caching
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entry/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    ssr: {
      noExternal: ['@astrojs/react']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'date-fns'],
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    remotePatterns: [{ protocol: 'https' }],
    domains: ['keykingslocksmithsc.com'],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  server: {
    port: 3000,
    host: true
  }
});
