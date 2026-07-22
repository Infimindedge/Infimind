import { describe, expect, it } from 'vitest';
import { blogArticleRepository, getArticleBySlug, getPublishedArticleBySlug, getPublishedArticles } from './blogArticleRepository';
import type { BlogArticle } from '@/types/blog';

function makeArticle(overrides: Partial<BlogArticle>): BlogArticle {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: 'Untitled',
    slug: 'untitled',
    excerpt: 'An excerpt.',
    categoryId: 'learning-science',
    status: 'published',
    featured: false,
    popular: false,
    readingTimeMinutes: 5,
    publishedAt: now,
    body: [],
    relatedArticleIds: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('blogArticleRepository', () => {
  it('seeds twenty-one real published launch articles with content and reading times', () => {
    const articles = blogArticleRepository.getAll();
    expect(articles).toHaveLength(21);
    for (const article of articles) {
      expect(article.status, `${article.slug} status`).toBe('published');
      expect(article.body.length, `${article.slug} body`).toBeGreaterThan(0);
      expect(article.readingTimeMinutes, `${article.slug} reading time`).toBeGreaterThan(0);
      expect(article.excerpt, `${article.slug} excerpt`).toBeTruthy();
    }
  });

  it('getPublishedArticles only returns published articles, newest first', () => {
    blogArticleRepository.create(makeArticle({ id: 'draft', slug: 'draft', status: 'draft' }));
    blogArticleRepository.create(makeArticle({ id: 'old', slug: 'old', publishedAt: '2024-01-01T00:00:00.000Z' }));
    blogArticleRepository.create(makeArticle({ id: 'new', slug: 'new', publishedAt: '2025-06-01T00:00:00.000Z' }));

    const published = getPublishedArticles();
    const ids = published.map((article) => article.id);
    expect(ids).not.toContain('draft');
    expect(ids.indexOf('new')).toBeLessThan(ids.indexOf('old'));

    const dates = published.map((article) => article.publishedAt ?? article.createdAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('getArticleBySlug finds any article regardless of status; getPublishedArticleBySlug only finds published ones', () => {
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'a-draft', status: 'draft' }));

    expect(getArticleBySlug('a-draft')?.id).toBe('a1');
    expect(getPublishedArticleBySlug('a-draft')).toBeUndefined();
  });
});
