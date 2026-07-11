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
  it('seeds only unpublished demo records — never fake published testimonials', () => {
    const seeded = testimonialRepository.getAll();
    expect(seeded.length).toBeGreaterThan(0);
    expect(seeded.every((testimonial) => testimonial.published === false)).toBe(true);
  });

  it('getPublishedTestimonials excludes drafts and is sorted by sortOrder', () => {
    testimonialRepository.create(makeTestimonial({ id: 't1', sortOrder: 2, published: true }));
    testimonialRepository.create(makeTestimonial({ id: 't2', sortOrder: 1, published: true }));
    testimonialRepository.create(makeTestimonial({ id: 't3', sortOrder: 3, published: false }));

    const published = getPublishedTestimonials();
    expect(published.map((t) => t.id)).toEqual(['t2', 't1']);
  });

  it('toggling published makes a testimonial appear in the public list', () => {
    testimonialRepository.create(makeTestimonial({ id: 't1', published: false }));
    expect(getPublishedTestimonials()).toHaveLength(0);

    testimonialRepository.update('t1', { published: true });
    expect(getPublishedTestimonials().map((t) => t.id)).toEqual(['t1']);
  });
});
