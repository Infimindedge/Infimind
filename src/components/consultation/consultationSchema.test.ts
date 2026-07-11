import { describe, expect, it } from 'vitest';
import { consultationSchema } from './consultationSchema';

const validBase = {
  name: 'A Parent',
  email: 'parent@example.com',
  whatsapp: '+1 555 555 5555',
  country: 'India',
  countryOther: '',
  program: 'school' as const,
  message: 'Looking for help building stronger study habits.',
};

describe('consultationSchema', () => {
  it('accepts a fully valid enquiry', () => {
    expect(consultationSchema.safeParse(validBase).success).toBe(true);
  });

  it('rejects a missing name', () => {
    expect(consultationSchema.safeParse({ ...validBase, name: '' }).success).toBe(false);
  });

  it('rejects an invalid email', () => {
    expect(consultationSchema.safeParse({ ...validBase, email: 'not-an-email' }).success).toBe(false);
  });

  it('rejects a whatsapp number with letters', () => {
    expect(consultationSchema.safeParse({ ...validBase, whatsapp: 'abc12345' }).success).toBe(false);
  });

  it('rejects a message that is too short', () => {
    expect(consultationSchema.safeParse({ ...validBase, message: 'Hi' }).success).toBe(false);
  });

  it('requires countryOther when country is "Other"', () => {
    expect(consultationSchema.safeParse({ ...validBase, country: 'Other', countryOther: '' }).success).toBe(false);
    expect(
      consultationSchema.safeParse({ ...validBase, country: 'Other', countryOther: 'Atlantis' }).success,
    ).toBe(true);
  });
});
