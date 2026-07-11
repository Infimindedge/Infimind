import { z } from 'zod';

export const testimonialSchema = z.object({
  displayName: z.string(),
  privacyLabel: z.string(),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  program: z.enum(['school', 'sat'], { message: 'Program is required' }),
  quote: z.string().min(1, 'Quote is required'),
  photoUrl: z.string().optional(),
  videoUrl: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  sortOrder: z.number().int(),
  published: z.boolean(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
