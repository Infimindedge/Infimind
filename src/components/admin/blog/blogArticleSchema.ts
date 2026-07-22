import { z } from 'zod';

export const blogArticleMetaSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens only'),
  // Drafts may be saved without these — only publishing enforces them (see
  // BlogArticlesAdmin's publish-time validation), matching the master
  // prompt's "Publishing requires: title, slug, excerpt, category, ≥1 block".
  excerpt: z.string(),
  coverImageUrl: z.string().optional(),
  coverImageAlt: z.string().optional(),
  categoryId: z.string(),
  authorId: z.string().optional(),
  status: z.enum(['draft', 'published', 'scheduled', 'archived']),
  featured: z.boolean(),
  popular: z.boolean(),
  readingTimeMinutes: z.number().int().min(1, 'Must be at least 1 minute'),
  publishedAt: z.string().optional(),
  scheduledFor: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().optional(),
  socialImageUrl: z.string().optional(),
  relatedArticleIds: z.array(z.string()),
});

export type BlogArticleMetaFormValues = z.infer<typeof blogArticleMetaSchema>;
