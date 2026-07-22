import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogCategoriesAdmin } from './BlogCategoriesAdmin';
import { blogArticleRepository } from '@/data/repositories/blogArticleRepository';
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
    body: [],
    relatedArticleIds: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('BlogCategoriesAdmin', () => {
  it('creates a new category', async () => {
    const user = userEvent.setup();
    render(<BlogCategoriesAdmin />);

    await user.click(screen.getByRole('button', { name: 'Add Category' }));
    await user.type(screen.getByLabelText('Category name'), 'Test Category');
    await user.click(screen.getByRole('button', { name: 'Save Category' }));

    expect(await screen.findByText('Test Category')).toBeInTheDocument();
  }, 15000);

  it('prevents deleting a category that still has articles', async () => {
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'a1', categoryId: 'learning-science' }));

    render(<BlogCategoriesAdmin />);

    const deleteButton = screen.getByRole('button', { name: 'Delete Learning Science' });
    expect(deleteButton).toBeDisabled();
  }, 15000);

  it('allows deleting a category with no articles', async () => {
    // Parent Guide has no seeded launch articles, unlike Learning Science.
    const user = userEvent.setup();
    render(<BlogCategoriesAdmin />);

    const deleteButton = screen.getByRole('button', { name: 'Delete Parent Guide' });
    expect(deleteButton).toBeEnabled();

    await user.click(deleteButton);
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.queryByText('Parent Guide')).not.toBeInTheDocument();
  }, 15000);
});
