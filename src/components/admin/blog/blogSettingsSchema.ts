import { z } from 'zod';

export const blogSettingsSchema = z.object({
  heroEyebrow: z.string(),
  heroTitle: z.string().min(1, 'Hero title is required'),
  heroDescription: z.string(),
  heroImageFilename: z.string().optional(),
  articlesPerPage: z.number().int().min(1, 'Must show at least 1 article per page'),
  ctaTitle: z.string().min(1, 'CTA title is required'),
  ctaDescription: z.string(),
  ctaButtonLabel: z.string().min(1, 'CTA button label is required'),
  ctaTarget: z.string().min(1, 'CTA target is required'),
  featuredArticleId: z.string().optional(),
  popularMode: z.enum(['manual', 'mostRecent']),
});

export type BlogSettingsFormValues = z.infer<typeof blogSettingsSchema>;
