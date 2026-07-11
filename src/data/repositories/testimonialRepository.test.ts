import { describe, expect, it } from 'vitest';
import { testimonialRepository, getPublishedTestimonials } from './testimonialRepository';
import type { Testimonial } from '@/types/content';

function makeTestimonial(overrides: Partial<Testimonial>): Testimonial {
  return {
    id: crypto.randomUUID(),
    displayName: 'Test Parent',
    privacyLabel: 'Parent, Testville',
    city: 'Testville',
    country: 'Testland',
    program: 'school',
    quote: 'A genuine quote.',
    sortOrder: 1,
    published: true,
    ...overrides,
  };
}

describe('testimonialRepository', () => {
  it('seeds demo records as unpublished, and any published seed entries are clearly labelled as samples', () => {
    const seeded = testimonialRepository.getAll();
    expect(seeded.length).toBeGreaterThan(0);

    const demoRecords = seeded.filter((testimonial) => testimonial.id.startsWith('demo-'));
    expect(demoRecords.length).toBeGreaterThan(0);
    expect(demoRecords.every((testimonial) => testimonial.published === false)).toBe(true);

    // Any published seed testimonial must be an explicitly-labelled sample —
    // never something that reads as a genuine, unlabelled family quote.
    const publishedSeed = seeded.filter((testimonial) => testimonial.published);
    expect(publishedSeed.every((testimonial) => /sample/i.test(testimonial.displayName))).toBe(true);
  });

  it('getPublishedTestimonials excludes drafts and is sorted by sortOrder', () => {
    testimonialRepository.create(makeTestimonial({ id: 'test-t1', sortOrder: -2, published: true }));
    testimonialRepository.create(makeTestimonial({ id: 'test-t2', sortOrder: -3, published: true }));
    testimonialRepository.create(makeTestimonial({ id: 'test-t3', sortOrder: -1, published: false }));

    const published = getPublishedTestimonials().filter((t) => t.id.startsWith('test-t'));
    expect(published.map((t) => t.id)).toEqual(['test-t2', 'test-t1']);
  });

  it('toggling published makes a testimonial appear in the public list', () => {
    testimonialRepository.create(makeTestimonial({ id: 'test-toggle', published: false }));
    expect(getPublishedTestimonials().some((t) => t.id === 'test-toggle')).toBe(false);

    testimonialRepository.update('test-toggle', { published: true });
    expect(getPublishedTestimonials().some((t) => t.id === 'test-toggle')).toBe(true);
  });
});
