import { z } from 'zod';

export const blogCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  active: z.boolean(),
  sortOrder: z.number().int(),
});

export type BlogCategoryFormValues = z.infer<typeof blogCategorySchema>;
