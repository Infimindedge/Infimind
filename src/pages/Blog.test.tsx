import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { blogArticleRepository } from '@/data/repositories/blogArticleRepository';
import type { BlogArticle } from '@/types/blog';

function renderBlog(initialEntry = '/blog') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

function findBlogTitle() {
  return screen.findByRole('heading', { level: 1, name: 'The Infimind Blogs' }, { timeout: 15000 });
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
    body: [{ id: crypto.randomUUID(), type: 'paragraph', text: 'Body copy.' }],
    relatedArticleIds: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('Blog listing page', () => {
  it('renders the route with exactly one H1 and the existing header/footer', async () => {
    renderBlog();

    expect(await findBlogTitle()).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText(/Infimind. All rights reserved./)).toBeInTheDocument();
  }, 25000);

  it('shows a polished empty state when no articles are published', async () => {
    blogArticleRepository.replaceAll([]);
    renderBlog();
    await findBlogTitle();

    expect(screen.getByText('No articles yet')).toBeInTheDocument();
  }, 25000);

  it('filters by category and reflects it in the URL, showing a no-results state for an empty match', async () => {
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'article-one', title: 'Article One', categoryId: 'learning-science' }));
    blogArticleRepository.create(makeArticle({ id: 'a2', slug: 'article-two', title: 'Article Two', categoryId: 'sat-insights' }));

    renderBlog();
    await findBlogTitle();

    expect(screen.getByText('Article One')).toBeInTheDocument();
    expect(screen.getByText('Article Two')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'SAT Insights' }));

    await waitFor(() => expect(screen.queryByText('Article One')).not.toBeInTheDocument());
    expect(screen.getByText('Article Two')).toBeInTheDocument();

    // Parent Guide has no seeded or fixture articles, so it's a reliable empty match.
    fireEvent.click(screen.getByRole('button', { name: 'Parent Guide' }));
    await waitFor(() => expect(screen.getByText('No articles match your search')).toBeInTheDocument());
  }, 25000);

  it('searches title/excerpt text with a debounce and updates the URL', async () => {
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'memory-and-learning', title: 'Memory and Learning' }));
    blogArticleRepository.create(makeArticle({ id: 'a2', slug: 'exam-strategy', title: 'Exam Strategy' }));

    renderBlog();
    await findBlogTitle();

    fireEvent.change(screen.getByPlaceholderText('Search articles...'), { target: { value: 'memory' } });

    await waitFor(() => expect(screen.queryByText('Exam Strategy')).not.toBeInTheDocument(), { timeout: 2000 });
    expect(screen.getByText('Memory and Learning')).toBeInTheDocument();
  }, 25000);

  it('shows manually-flagged popular articles in the sidebar', async () => {
    blogArticleRepository.replaceAll([]);
    blogArticleRepository.create(makeArticle({ id: 'a1', slug: 'popular-one', title: 'Popular One', popular: true }));
    blogArticleRepository.create(makeArticle({ id: 'a2', slug: 'not-popular', title: 'Not Popular', popular: false }));

    renderBlog();
    await findBlogTitle();

    const sidebar = screen.getByText('Popular Articles').closest('div') as HTMLElement;
    expect(sidebar).toHaveTextContent('Popular One');
    expect(sidebar).not.toHaveTextContent('Not Popular');
  }, 25000);

  it('paginates and preserves the active category filter across pages', async () => {
    for (let i = 1; i <= 10; i += 1) {
      blogArticleRepository.create(
        makeArticle({
          id: `a${i}`,
          slug: `article-${i}`,
          title: `Article ${i}`,
          publishedAt: new Date(2025, 0, i).toISOString(),
        }),
      );
    }

    renderBlog();
    await findBlogTitle();

    expect(screen.getByRole('navigation', { name: 'Blog pagination' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '2' }));

    await waitFor(() => expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page'));
  }, 25000);
});
