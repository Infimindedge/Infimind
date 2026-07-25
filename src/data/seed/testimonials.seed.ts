import type { Testimonial } from '@/types/content';

/**
 * `demo-testimonial-*` (unpublished): scaffolding so the admin UI has an
 * empty/draft state to render — never shown publicly.
 *
 * `sample-testimonial-*` (published): placed at the client's explicit
 * request so the live carousel design could be previewed with real-looking
 * content instead of an empty state. These are NOT genuine family
 * testimonials — replace or unpublish them from /admin before public
 * launch. See CONTENT_GAPS.md.
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
  {
    id: 'sample-testimonial-1',
    displayName: 'Sample preview — replace before launch',
    privacyLabel: 'Parent, London',
    city: 'London',
    country: 'United Kingdom',
    program: 'school',
    quote:
      'Our son used to dread homework. Within a few months of weekly sessions, he was explaining concepts back to us at the dinner table — that shift in confidence has been the real win.',
    sortOrder: 3,
    published: false,
  },
  {
    id: 'sample-testimonial-2',
    displayName: 'Sample preview — replace before launch',
    privacyLabel: 'Parent, Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    program: 'sat',
    quote:
      'The structure made all the difference. Every week had a clear focus, and the mentor kept us updated so we always knew where she stood before test day.',
    sortOrder: 4,
    published: false,
  },
  {
    id: 'sample-testimonial-3',
    displayName: 'Sample preview — replace before launch',
    privacyLabel: 'Parent, Singapore',
    city: 'Singapore',
    country: 'Singapore',
    program: 'school',
    quote:
      "What stood out was how personal it felt. It never seemed like a generic programme — every plan was built around what our daughter actually needed.",
    sortOrder: 5,
    published: false,
  },
  {
    id: 'sample-testimonial-4',
    displayName: 'Sample preview — replace before launch',
    privacyLabel: 'Parent, Toronto',
    city: 'Toronto',
    country: 'Canada',
    program: 'sat',
    quote:
      'He went into the exam calm instead of anxious for the first time. The practice and feedback loop genuinely built his confidence, not just his score.',
    sortOrder: 6,
    published: false,
  },
];
