import type { Testimonial } from '@/types/content';

/**
 * Demo records only — unpublished by design. These exist so the admin UI
 * and homepage carousel have something to render in development. No real
 * or invented family testimonials are seeded. Publish only genuine
 * testimonials collected from Infimind families via /admin.
 */
export const testimonialsSeed: Testimonial[] = [
  {
    id: 'demo-testimonial-1',
    displayName: '[Demo entry — not a real testimonial]',
    privacyLabel: '[Add privacy-safe label]',
    city: '',
    country: '',
    program: 'school',
    quote: '[Replace with a genuine family quote before publishing.]',
    sortOrder: 1,
    published: false,
  },
  {
    id: 'demo-testimonial-2',
    displayName: '[Demo entry — not a real testimonial]',
    privacyLabel: '[Add privacy-safe label]',
    city: '',
    country: '',
    program: 'sat',
    quote: '[Replace with a genuine family quote before publishing.]',
    sortOrder: 2,
    published: false,
  },
];
