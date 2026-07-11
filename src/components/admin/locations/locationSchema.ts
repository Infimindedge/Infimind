import { z } from 'zod';

export const locationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City / display location is required'),
  isoCode: z
    .string()
    .length(2, 'ISO code must be exactly 2 letters')
    .regex(/^[A-Za-z]{2}$/, 'ISO code must be letters only'),
  flagImageUrl: z.string().optional(),
  active: z.boolean(),
  sortOrder: z.number().int(),
  program: z.union([z.enum(['school', 'sat']), z.literal('')]).optional(),
  quote: z.string().optional(),
  attribution: z.string().optional(),
  storyLabel: z.string().optional(),
});

export type LocationFormValues = z.infer<typeof locationSchema>;
