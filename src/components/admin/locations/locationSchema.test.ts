import { describe, expect, it } from 'vitest';
import { locationSchema } from './locationSchema';

const validBase = {
  country: 'France',
  city: 'Paris',
  isoCode: 'FR',
  flagImageUrl: '',
  active: true,
  sortOrder: 1,
  program: '' as const,
  quote: '',
  attribution: '',
  storyLabel: '',
};

describe('locationSchema', () => {
  it('accepts a fully valid location', () => {
    expect(locationSchema.safeParse(validBase).success).toBe(true);
  });

  it.each(['country', 'city'])('rejects an empty required field: %s', (field) => {
    expect(locationSchema.safeParse({ ...validBase, [field]: '' }).success).toBe(false);
  });

  it('rejects an ISO code that is not exactly 2 letters', () => {
    expect(locationSchema.safeParse({ ...validBase, isoCode: 'FRA' }).success).toBe(false);
    expect(locationSchema.safeParse({ ...validBase, isoCode: 'F' }).success).toBe(false);
    expect(locationSchema.safeParse({ ...validBase, isoCode: '12' }).success).toBe(false);
  });

  it('accepts an optional program of school, sat, or empty', () => {
    expect(locationSchema.safeParse({ ...validBase, program: 'school' }).success).toBe(true);
    expect(locationSchema.safeParse({ ...validBase, program: 'sat' }).success).toBe(true);
    expect(locationSchema.safeParse({ ...validBase, program: '' }).success).toBe(true);
  });
});
