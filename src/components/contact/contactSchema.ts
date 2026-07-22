import { z } from 'zod';

export const contactSchema = z.object({
  parentName: z.string().min(1, 'Parent / Guardian name is required'),
  studentName: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .regex(/^[+\d][\d\s-]*$/, 'Use digits only, optionally starting with +'),
  country: z.string().min(1, 'Country is required'),
  programme: z.enum(['school', 'sat', 'undecided'], { message: 'Please select a programme of interest' }),
  message: z.string().min(10, 'Tell us a little more (at least 10 characters)'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
