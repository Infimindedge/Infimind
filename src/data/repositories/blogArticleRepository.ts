import type { BlogArticle } from '@/types/blog';
import { blogArticlesSeed } from '@/data/seed/blogArticles.seed';
import { createCollectionRepository } from './createCollectionRepository';

export const BLOG_ARTICLES_STORAGE_KEY = 'infimind_blog_articles_v1';

export const blogArticleRepository = createCollectionRepository<BlogArticle>(BLOG_ARTICLES_STORAGE_KEY, blogArticlesSeed);

export function getPublishedArticles(): BlogArticle[] {
  return blogArticleRepository
    .getAll()
    .filter((article) => article.status === 'published')
    .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt));
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticleRepository.getAll().find((article) => article.slug === slug);
}

export function getPublishedArticleBySlug(slug: string): BlogArticle | undefined {
  const article = getArticleBySlug(slug);
  return article && article.status === 'published' ? article : undefined;
}
