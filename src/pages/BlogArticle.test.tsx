import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { blogArticleRepository } from '@/data/repositories/blogArticleRepository';
import type { BlogArticle } from '@/types/blog';

function renderArticle(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <App />
    </MemoryRouter>,
  );
}

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

describe('Blog article page', () => {
  it('renders a published article with exactly one H1 and the existing header/footer', async () => {
    blogArticleRepository.create(
      makeArticle({
        id: 'a1',
        slug: 'how-personalized-learning-helps',
        title: 'How Personalized Learning Helps',
        body: [{ id: 'b1', type: 'paragraph', text: 'Every student learns differently.' }],
      }),
    );

    renderArticle('how-personalized-learning-helps');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'How Personalized Learning Helps' }, { timeout: 15000 }),
    ).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText(/Infimind. All rights reserved./)).toBeInTheDocument();
    expect(screen.getByText('Every student learns differently.')).toBeInTheDocument();
  }, 25000);

  it('never renders a draft, scheduled or archived article publicly', async () => {
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'draft-article', title: 'Draft Article', status: 'draft' }));
    blogArticleRepository.create(makeArticle({ id: 'a2', slug: 'scheduled-article', title: 'Scheduled Article', status: 'scheduled' }));
    blogArticleRepository.create(makeArticle({ id: 'a3', slug: 'archived-article', title: 'Archived Article', status: 'archived' }));

    for (const slug of ['draft-article', 'scheduled-article', 'archived-article']) {
      const { unmount } = renderArticle(slug);
      expect(await screen.findByText('404', {}, { timeout: 15000 })).toBeInTheDocument();
      expect(screen.queryByText(/Article$/)).not.toBeInTheDocument();
      unmount();
    }
  }, 25000);

  it('gives heading blocks anchor ids that match the table of contents links', async () => {
    blogArticleRepository.create(
      makeArticle({
        id: 'a1',
        slug: 'toc-article',
        title: 'TOC Article',
        body: [
          { id: 'b1', type: 'heading2', text: 'The Need for Personalized Learning' },
          { id: 'b2', type: 'paragraph', text: 'Some text.' },
          { id: 'b3', type: 'heading2', text: 'What the Research Says' },
        ],
      }),
    );

    renderArticle('toc-article');
    await screen.findByRole('heading', { level: 1, name: 'TOC Article' }, { timeout: 15000 });

    const tocLink = screen.getByRole('link', { name: /The Need for Personalized Learning/ });
    const href = tocLink.getAttribute('href');
    expect(href).toBe('#the-need-for-personalized-learning');
    expect(document.querySelector(href!)).toHaveTextContent('The Need for Personalized Learning');
  }, 25000);

  it('shows related articles by manual selection, excluding the current article', async () => {
    blogArticleRepository.create(makeArticle({ id: 'main', slug: 'main-article', title: 'Main Article', relatedArticleIds: ['related-1'] }));
    blogArticleRepository.create(makeArticle({ id: 'related-1', slug: 'related-article', title: 'Related Article' }));
    blogArticleRepository.create(makeArticle({ id: 'other', slug: 'other-article', title: 'Other Article' }));

    renderArticle('main-article');
    await screen.findByRole('heading', { level: 1, name: 'Main Article' }, { timeout: 15000 });

    const related = screen.getByText('Related Articles').closest('div') as HTMLElement;
    expect(related).toHaveTextContent('Related Article');
    expect(screen.queryByText('Main Article', { selector: 'p' })).not.toBeInTheDocument();
  }, 25000);
});
