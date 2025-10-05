import { c as createComponent, d as createAstro, m as maybeRenderHead, b as addAttribute, e as renderScript, a as renderTemplate, r as renderComponent, F as Fragment, u as unescapeHTML } from './vendor-Cr_-A01q.js';
import 'kleur/colors';
import 'clsx';
import { g as getCollection } from './_astro_content-jzu4WHtP.js';
/* empty css                        */
import { c as companyConfig, f as getSchemaOrgData } from './BaseLayout-CHzvvHJE.js';

const $$Astro$2 = createAstro();
const $$FAQ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FAQ;
  const {
    class: className = "",
    limit = 8,
    category,
    showViewAllLink = true
  } = Astro2.props;
  let faqs = await getCollection("faq");
  if (category) {
    faqs = faqs.filter((faq) => faq.data.category.toLowerCase() === category.toLowerCase());
  }
  let displayFaqs;
  if (!category) {
    const featuredFaqs = faqs.filter((faq) => faq.data.featured === true);
    displayFaqs = featuredFaqs.length > 0 ? featuredFaqs : faqs;
    displayFaqs = displayFaqs.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  } else {
    displayFaqs = faqs.sort(() => Math.random() - 0.5);
  }
  const sortedFaqs = displayFaqs.slice(0, limit);
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`faq-section py-16 ${className}`, "class")} data-astro-cid-mh6t5pw4> <div class="container mx-auto px-4" data-astro-cid-mh6t5pw4> <!-- Section Header --> <div class="text-center mb-12" data-astro-cid-mh6t5pw4> <h2 class="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4" data-astro-cid-mh6t5pw4>
Frequently Asked Questions
</h2> <p class="text-lg text-charcoal-600 max-w-2xl mx-auto" data-astro-cid-mh6t5pw4>
Find answers to common questions about our locksmith services
</p> </div> <!-- FAQ Accordion --> <div class="max-w-4xl mx-auto space-y-4" data-astro-cid-mh6t5pw4> ${sortedFaqs.map((faq, index) => renderTemplate`<div class="faq-item bg-white border-2 border-charcoal-200 rounded-lg overflow-hidden hover:border-gold-400 transition-all duration-300" data-astro-cid-mh6t5pw4> <button class="faq-question w-full flex items-center justify-between p-6 text-left hover:bg-gold-50 transition-all duration-300" aria-expanded="false"${addAttribute(`faq-answer-${index}`, "aria-controls")} data-astro-cid-mh6t5pw4> <div class="flex items-start gap-3 flex-1 pr-4" data-astro-cid-mh6t5pw4> <span class="flex-shrink-0 w-7 h-7 bg-gold-400 text-charcoal-900 rounded-full flex items-center justify-center font-bold text-sm" data-astro-cid-mh6t5pw4>
Q
</span> <span class="font-semibold text-lg text-charcoal-900" data-astro-cid-mh6t5pw4> ${faq.data.question} </span> </div> <svg class="faq-icon w-6 h-6 text-gold-400 flex-shrink-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-mh6t5pw4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-mh6t5pw4></path> </svg> </button> <div${addAttribute(`faq-answer-${index}`, "id")} class="faq-answer hidden" role="region" data-astro-cid-mh6t5pw4> <div class="px-6 pb-6" data-astro-cid-mh6t5pw4> <div class="flex items-start gap-3 text-charcoal-700 leading-relaxed" data-astro-cid-mh6t5pw4> <span class="flex-shrink-0 w-7 h-7 bg-charcoal-700 text-white rounded-full flex items-center justify-center font-bold text-sm" data-astro-cid-mh6t5pw4>
A
</span> <div class="flex-1" data-astro-cid-mh6t5pw4> ${faq.body} </div> </div> </div> </div> </div>`)} </div> <!-- View All FAQs Link --> ${showViewAllLink && limit < 10 && renderTemplate`<div class="mt-8 text-center" data-astro-cid-mh6t5pw4> <a href="/faq" class="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 text-charcoal-900 font-semibold rounded-lg hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" data-astro-cid-mh6t5pw4> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-mh6t5pw4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-mh6t5pw4></path> </svg>
View All FAQs
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-mh6t5pw4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-mh6t5pw4></path> </svg> </a> </div>`} <!-- Still Have Questions CTA --> <div class="mt-12 text-center p-8 bg-gradient-to-br from-gold-50 to-charcoal-50 rounded-xl border-2 border-gold-200" data-astro-cid-mh6t5pw4> <h3 class="text-2xl font-bold text-charcoal-900 mb-3" data-astro-cid-mh6t5pw4>
Still have questions?
</h3> <p class="text-charcoal-600 mb-6" data-astro-cid-mh6t5pw4>
Our team is here to help. Contact us and we'll answer any questions you have.
</p> <div class="flex flex-wrap justify-center gap-4" data-astro-cid-mh6t5pw4> <a href="tel:+18649009597" class="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 text-charcoal-900 font-semibold rounded-lg hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" data-astro-cid-mh6t5pw4> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-mh6t5pw4> <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-astro-cid-mh6t5pw4></path> </svg>
Call Us: (864) 900-9597
</a> <a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-charcoal-300 text-charcoal-700 font-semibold rounded-lg hover:border-gold-400 hover:bg-white transition-all duration-300" data-astro-cid-mh6t5pw4> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-mh6t5pw4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-mh6t5pw4></path> </svg>
Send a Message
</a> </div> </div> </div> </section> ${renderScript($$result, "/Users/yaronhayo/Desktop/KeyKingsKiro/src/components/sections/FAQ.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/yaronhayo/Desktop/KeyKingsKiro/src/components/sections/FAQ.astro", void 0);

const $$Astro$1 = createAstro();
const $$Reviews = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Reviews;
  const {
    class: className = "",
    limit = 6,
    showRating = true,
    category
  } = Astro2.props;
  let allReviews = await getCollection("reviews");
  if (category) {
    allReviews = allReviews.filter((review) => {
      const reviewCategory = review.data.category?.toLowerCase();
      return reviewCategory === category.toLowerCase();
    });
  }
  let reviews;
  if (!category) {
    reviews = allReviews.filter((r) => r.data.featured || true).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()).slice(0, limit);
  } else {
    reviews = allReviews.sort(() => Math.random() - 0.5).slice(0, limit);
  }
  const averageRating = companyConfig.content.reviews.averageRating;
  const totalReviews = companyConfig.content.reviews.totalReviews;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`reviews-section py-16 md:py-20 bg-gradient-to-b from-white to-charcoal-50 ${className}`, "class")} data-astro-cid-h3xzfrp5> <div class="container mx-auto px-4" data-astro-cid-h3xzfrp5> <!-- Section Header --> <div class="text-center mb-12" data-astro-cid-h3xzfrp5> <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4" data-astro-cid-h3xzfrp5>
What Our Customers Say
</h2> <p class="text-lg md:text-xl text-charcoal-600 mb-6 max-w-2xl mx-auto" data-astro-cid-h3xzfrp5>
Don't just take our word for it - hear from our satisfied customers
</p> ${showRating && renderTemplate`<div class="flex items-center justify-center gap-3 mb-4" data-astro-cid-h3xzfrp5> <!-- Star Rating --> <div class="flex items-center gap-1" data-astro-cid-h3xzfrp5> ${[...Array(5)].map((_, i) => renderTemplate`<svg${addAttribute(`w-7 h-7 ${i < Math.floor(averageRating) ? "text-gold-400" : "text-charcoal-300"}`, "class")} fill="currentColor" viewBox="0 0 20 20" data-astro-cid-h3xzfrp5> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-h3xzfrp5></path> </svg>`)} </div> <span class="text-2xl md:text-3xl font-bold text-charcoal-900" data-astro-cid-h3xzfrp5>${averageRating}</span> <span class="text-charcoal-600 text-lg" data-astro-cid-h3xzfrp5>(${totalReviews}+ reviews)</span> </div>`} </div> <!-- Reviews Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-astro-cid-h3xzfrp5> ${reviews.map((review) => {
    review.data.platform || "website";
    return renderTemplate`<div class="bg-white border-2 border-charcoal-100 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 transform hover:-translate-y-1" data-astro-cid-h3xzfrp5> <!-- Review Header --> <div class="flex items-start justify-between mb-4" data-astro-cid-h3xzfrp5> <div class="flex items-center gap-3" data-astro-cid-h3xzfrp5> <!-- Avatar --> <div class="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md" data-astro-cid-h3xzfrp5> ${review.data.name.charAt(0)} </div> <div data-astro-cid-h3xzfrp5> <h4 class="font-bold text-charcoal-900" data-astro-cid-h3xzfrp5>${review.data.name}</h4> <p class="text-sm text-charcoal-600" data-astro-cid-h3xzfrp5>${review.data.location}</p> </div> </div> ${review.data.verified && renderTemplate`<span class="inline-flex items-center gap-1 px-2 py-1 bg-trust-green/10 text-trust-green text-xs font-semibold rounded-md border border-trust-green/20" data-astro-cid-h3xzfrp5> <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-h3xzfrp5> <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-astro-cid-h3xzfrp5></path> </svg>
Verified
</span>`} </div> <!-- Star Rating --> <div class="flex items-center gap-1 mb-4" data-astro-cid-h3xzfrp5> ${[...Array(5)].map((_, i) => renderTemplate`<svg${addAttribute(`w-5 h-5 ${i < review.data.rating ? "text-gold-400" : "text-charcoal-300"}`, "class")} fill="currentColor" viewBox="0 0 20 20" data-astro-cid-h3xzfrp5> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-h3xzfrp5></path> </svg>`)} </div> <!-- Service Type --> <div class="mb-4 pb-4 border-b border-charcoal-100" data-astro-cid-h3xzfrp5> <p class="text-sm text-charcoal-600" data-astro-cid-h3xzfrp5>
Service: <span class="font-semibold text-charcoal-900" data-astro-cid-h3xzfrp5>${review.data.service}</span> </p> </div> <!-- Review Content --> <div class="text-charcoal-700 leading-relaxed mb-4" data-astro-cid-h3xzfrp5> ${review.body} </div> <!-- Footer with Date --> <div class="pt-4 border-t border-charcoal-100" data-astro-cid-h3xzfrp5> <p class="text-xs text-charcoal-500" data-astro-cid-h3xzfrp5> ${new Date(review.data.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })} </p> </div> </div>`;
  })} </div> <!-- CTA --> <div class="text-center mt-16" data-astro-cid-h3xzfrp5> <div class="max-w-3xl mx-auto bg-gradient-to-r from-gold-400 to-gold-500 rounded-2xl p-8 md:p-12 shadow-xl" data-astro-cid-h3xzfrp5> <h3 class="text-2xl md:text-3xl font-display font-bold text-charcoal-900 mb-4" data-astro-cid-h3xzfrp5>
Ready to Experience Our Top-Rated Service?
</h3> <p class="text-lg text-charcoal-800 mb-8" data-astro-cid-h3xzfrp5>
Join thousands of satisfied customers across Anderson and Upstate SC
</p> <div class="flex flex-wrap justify-center gap-4" data-astro-cid-h3xzfrp5> <a href="tel:+18649009597" class="inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 text-white font-bold rounded-lg hover:bg-charcoal-800 transition-all duration-300 transform hover:scale-105 shadow-lg" data-astro-cid-h3xzfrp5> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-h3xzfrp5> <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-astro-cid-h3xzfrp5></path> </svg>
Call (864) 900-9597
</a> <a href="/book-service" class="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-charcoal-900 text-charcoal-900 font-bold rounded-lg hover:bg-charcoal-50 transition-all duration-300 transform hover:scale-105 shadow-lg" data-astro-cid-h3xzfrp5> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-h3xzfrp5> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-h3xzfrp5></path> </svg>
Request Service
</a> </div> </div> </div> </div> </section> `;
}, "/Users/yaronhayo/Desktop/KeyKingsKiro/src/components/sections/Reviews.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const $$SchemaMarkup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SchemaMarkup;
  const { type = "organization", data, additionalSchemas = [] } = Astro2.props;
  const baseSchema = getSchemaOrgData();
  const siteUrl = "https://keykingslocksmithsc.com";
  let schemaData = baseSchema;
  if (type === "service" && data) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.title,
      "description": data.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": companyConfig.name,
        "telephone": companyConfig.contact.phone.formatted,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": companyConfig.contact.address.street,
          "addressLocality": companyConfig.contact.address.city,
          "addressRegion": companyConfig.contact.address.state,
          "postalCode": companyConfig.contact.address.zipCode,
          "addressCountry": "US"
        }
      },
      "areaServed": baseSchema.areaServed,
      "serviceType": data.serviceType || "Locksmith Service",
      "url": data.url || Astro2.url.href,
      "image": data.image || `${siteUrl}/images/services/locksmith-service.jpg`,
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "USD"
      }
    };
  }
  if (type === "article" && data) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.description,
      "image": data.image,
      "datePublished": data.publishDate,
      "dateModified": data.updatedDate || data.publishDate,
      "author": {
        "@type": "Person",
        "name": data.author || companyConfig.name
      },
      "publisher": {
        "@type": "Organization",
        "name": companyConfig.name,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/images/brand/logo-text.svg`
        }
      }
    };
  }
  if (type === "faq" && data) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }
  if (type === "breadcrumb" && data) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }
  if (type === "webpage" && data) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": data.title,
      "description": data.description,
      "url": data.url || Astro2.url.href,
      "isPartOf": {
        "@type": "WebSite",
        "name": companyConfig.name,
        "url": siteUrl
      },
      "about": {
        "@type": "LocalBusiness",
        "name": companyConfig.name
      },
      "breadcrumb": data.breadcrumb
    };
  }
  const allSchemas = additionalSchemas.length > 0 ? [schemaData, ...additionalSchemas] : schemaData;
  return renderTemplate`${additionalSchemas.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${allSchemas.map((schema) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))))}` })}` : renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schemaData)))}`;
}, "/Users/yaronhayo/Desktop/KeyKingsKiro/src/components/seo/SchemaMarkup.astro", void 0);

export { $$FAQ as $, $$Reviews as a, $$SchemaMarkup as b };
