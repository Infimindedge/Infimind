import { z } from 'zod';

export const consultationSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    whatsapp: z
      .string()
      .min(7, 'Enter a valid WhatsApp number')
      .regex(/^[+\d][\d\s-]*$/, 'Use digits only, optionally starting with +'),
    country: z.string().min(1, 'Country is required'),
    countryOther: z.string().optional(),
    program: z.enum(['school', 'sat'], { message: 'Please select a programme' }),
    message: z.string().min(10, 'Tell us a little more (at least 10 characters)'),
  })
  .refine((data) => data.country !== 'Other' || Boolean(data.countryOther?.trim()), {
    message: 'Please specify your country',
    path: ['countryOther'],
  });

export type ConsultationFormValues = z.infer<typeof consultationSchema>;
