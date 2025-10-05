import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://keykingslocksmithsc.com',
  output: 'static',
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
      filter: (page) => !page.includes('/api/') && !page.includes('/thank-you'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://keykingslocksmithsc.com/',
        'https://keykingslocksmithsc.com/services',
        'https://keykingslocksmithsc.com/services/emergency-locksmith',
        'https://keykingslocksmithsc.com/services/residential-locksmith',
        'https://keykingslocksmithsc.com/services/commercial-locksmith',
        'https://keykingslocksmithsc.com/services/automotive-locksmith',
        'https://keykingslocksmithsc.com/service-areas',
        'https://keykingslocksmithsc.com/faq',
        'https://keykingslocksmithsc.com/reviews',
        'https://keykingslocksmithsc.com/about',
        'https://keykingslocksmithsc.com/contact',
        'https://keykingslocksmithsc.com/book-service'
      ],
      serialize: (item) => {
        // Set custom priorities based on page importance
        if (item.url === 'https://keykingslocksmithsc.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/services/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/service-areas')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/faq') || item.url.includes('/reviews')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/about') || item.url.includes('/contact')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/privacy-policy') || item.url.includes('/terms')) {
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
