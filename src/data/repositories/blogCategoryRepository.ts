import type { BlogCategory } from '@/types/blog';
import { blogCategoriesSeed } from '@/data/seed/blogCategories.seed';
import { createCollectionRepository } from './createCollectionRepository';

export const BLOG_CATEGORIES_STORAGE_KEY = 'infimind_blog_categories_v1';

export const blogCategoryRepository = createCollectionRepository<BlogCategory>(
  BLOG_CATEGORIES_STORAGE_KEY,
  blogCategoriesSeed,
);

export function getActiveCategories(): BlogCategory[] {
  return blogCategoryRepository
    .getAll()
    .filter((category) => category.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
