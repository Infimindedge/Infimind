import { z } from 'zod';

export const blogAuthorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string(),
  bio: z.string(),
  avatarUrl: z.string().optional(),
  linkedInUrl: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  active: z.boolean(),
});

export type BlogAuthorFormValues = z.infer<typeof blogAuthorSchema>;
