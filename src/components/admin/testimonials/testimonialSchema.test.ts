import { describe, expect, it } from 'vitest';
import { testimonialSchema } from './testimonialSchema';

const validBase = {
  displayName: 'A Parent',
  privacyLabel: 'Parent, London',
  city: 'London',
  country: 'United Kingdom',
  program: 'school' as const,
  quote: 'A genuine quote.',
  photoUrl: '',
  videoUrl: '',
  sortOrder: 1,
  published: false,
};

describe('testimonialSchema', () => {
  it('accepts a fully valid testimonial', () => {
    expect(testimonialSchema.safeParse(validBase).success).toBe(true);
  });

  it.each(['quote', 'city', 'country'])('rejects an empty required field: %s', (field) => {
    const result = testimonialSchema.safeParse({ ...validBase, [field]: '' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid program value', () => {
    const result = testimonialSchema.safeParse({ ...validBase, program: 'college' });
    expect(result.success).toBe(false);
  });

  it('rejects a malformed video URL but allows an empty one', () => {
    expect(testimonialSchema.safeParse({ ...validBase, videoUrl: 'not-a-url' }).success).toBe(false);
    expect(testimonialSchema.safeParse({ ...validBase, videoUrl: '' }).success).toBe(true);
  });
});
