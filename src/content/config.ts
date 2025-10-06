import { defineCollection, z } from 'astro:content';

// Services collection schema
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    category: z.enum(['residential', 'commercial', 'automotive', 'emergency']),
    featured: z.boolean().default(false),
    image: z.string(),
    order: z.number().default(0),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

// Service Areas collection schema
const serviceAreasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    city: z.string(),
    state: z.string(),
    zipCodes: z.array(z.string()),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    featured: z.boolean().default(false),
    coverage: z.enum(['primary', 'secondary', 'extended']),
    image: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

// Blog collection schema (not currently used - can be enabled later)
// const blogCollection = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     author: z.string().default('Key Kings Locksmith'),
//     authorImage: z.string().optional(),
//     publishDate: z.date(),
//     updateDate: z.date().optional(),
//     category: z.enum(['Security Tips', 'Emergency Help', 'Technology', 'Business', 'Local News']),
//     tags: z.array(z.string()),
//     image: z.string(),
//     featured: z.boolean().default(false),
//     draft: z.boolean().default(false),
//     seo: z.object({
//       title: z.string().optional(),
//       description: z.string().optional(),
//       keywords: z.array(z.string()).optional(),
//     }).optional(),
//   }),
// });

// Reviews collection schema
const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    rating: z.number().min(1).max(5),
    date: z.date(),
    service: z.string(),
    location: z.string(),
    verified: z.boolean().default(false),
    platform: z.enum(['google', 'facebook', 'yelp', 'website']),
    category: z.enum(['residential', 'commercial', 'automotive', 'emergency']).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// FAQ collection schema
const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.enum(['General', 'Emergency', 'Residential', 'Commercial', 'Automotive', 'Pricing']),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

// Legal pages collection schema (not currently used - legal pages in src/pages/)
// const legalCollection = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     lastUpdated: z.date(),
//     effectiveDate: z.date(),
//     noindex: z.boolean().default(false),
//   }),
// });

export const collections = {
  services: servicesCollection,
  'service-areas': serviceAreasCollection,
  // blog: blogCollection, // Commented out - not currently used
  reviews: reviewsCollection,
  faq: faqCollection,
  // legal: legalCollection, // Commented out - legal pages in src/pages/ instead
};
