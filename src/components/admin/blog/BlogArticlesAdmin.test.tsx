import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogArticlesAdmin } from './BlogArticlesAdmin';
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
    publishedAt: now,
    body: [{ id: 'b1', type: 'paragraph', text: 'Body.' }],
    relatedArticleIds: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('BlogArticlesAdmin', () => {
  it('creates a new article as a draft with an auto-filled slug', async () => {
    const user = userEvent.setup();
    render(<BlogArticlesAdmin />);

    await user.click(screen.getByRole('button', { name: 'New Article' }));
    await user.type(screen.getByLabelText('Title'), 'My New Post');
    await user.tab();
    await user.click(screen.getByRole('button', { name: 'Save Article' }));

    expect(await screen.findByText('My New Post')).toBeInTheDocument();
    const draftBadges = screen.getAllByText('draft');
    expect(draftBadges.length).toBeGreaterThan(0);
  }, 15000);

  it('edits an existing article', async () => {
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'a1', title: 'Original Title' }));
    const user = userEvent.setup();
    render(<BlogArticlesAdmin />);

    await user.click(screen.getByRole('button', { name: 'Edit Original Title' }));
    const titleInput = screen.getByLabelText('Title');
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Title');
    await user.click(screen.getByRole('button', { name: 'Save Article' }));

    expect(await screen.findByText('Updated Title')).toBeInTheDocument();
    expect(screen.queryByText('Original Title')).not.toBeInTheDocument();
  }, 15000);

  it('blocks publishing when required fields are missing', async () => {
    const user = userEvent.setup();
    render(<BlogArticlesAdmin />);

    await user.click(screen.getByRole('button', { name: 'New Article' }));
    await user.type(screen.getByLabelText('Title'), 'Incomplete Post');
    await user.tab();
    await user.selectOptions(screen.getByLabelText('Status'), 'published');
    await user.click(screen.getByRole('button', { name: 'Save Article' }));

    expect(await screen.findByText(/Cannot publish — missing:/)).toBeInTheDocument();
    // Still on the editor — the article was not saved as published.
    expect(screen.getByRole('heading', { name: 'New Article' })).toBeInTheDocument();
  }, 15000);

  it('requires alt text on image blocks before publishing', async () => {
    const user = userEvent.setup();
    render(<BlogArticlesAdmin />);

    await user.click(screen.getByRole('button', { name: 'New Article' }));
    await user.type(screen.getByLabelText('Title'), 'Post With Image');
    await user.tab();
    await user.type(screen.getByLabelText('Excerpt'), 'An excerpt for this post.');
    await user.selectOptions(screen.getByLabelText('New block type'), 'image');
    await user.click(screen.getByRole('button', { name: 'Add block' }));
    await user.selectOptions(screen.getByLabelText('Status'), 'published');
    await user.click(screen.getByRole('button', { name: 'Save Article' }));

    expect(await screen.findByText(/alt text on an image block/)).toBeInTheDocument();
  }, 15000);

  it('unpublishes, archives and duplicates an article from the list', async () => {
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'a1', title: 'Live Article', status: 'published' }));
    const user = userEvent.setup();
    render(<BlogArticlesAdmin />);

    await user.click(screen.getByRole('button', { name: 'Unpublish Live Article' }));
    expect(await screen.findByText('draft')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Archive Live Article' }));
    expect(await screen.findByText('archived')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Duplicate Live Article' }));
    expect(await screen.findByText('Live Article (Copy)')).toBeInTheDocument();
  }, 15000);
});
