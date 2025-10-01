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
    price: z.string().optional(),
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
    responseTime: z.string(),
    coverage: z.enum(['primary', 'secondary', 'extended']),
    image: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Key Kings Locksmith'),
    authorImage: z.string().optional(),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    category: z.enum(['Security Tips', 'Emergency Help', 'Technology', 'Business', 'Local News']),
    tags: z.array(z.string()),
    image: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

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

// Team collection schema
const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    image: z.string(),
    certifications: z.array(z.string()).optional(),
    experience: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Legal pages collection schema
const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.date(),
    effectiveDate: z.date(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  services: servicesCollection,
  'service-areas': serviceAreasCollection,
  blog: blogCollection,
  reviews: reviewsCollection,
  faq: faqCollection,
  team: teamCollection,
  legal: legalCollection,
};
