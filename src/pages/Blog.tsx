import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Container } from '@/components/ui/Container';
import { BlogHero } from '@/components/blog/BlogHero';
import { CategoryFilters } from '@/components/blog/CategoryFilters';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { ArticleGrid } from '@/components/blog/ArticleGrid';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { BlogCta } from '@/components/blog/BlogCta';
import { blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY } from '@/data/repositories/blogArticleRepository';
import { blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY, getActiveCategories } from '@/data/repositories/blogCategoryRepository';
import { useCollection } from '@/hooks/useCollection';
import { useBlogSettings } from '@/hooks/useBlogSettings';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { BlogArticle } from '@/types/blog';

const PAGE_TITLE = 'Infimind Blog | Learning Science, SAT and Student Development';
const PAGE_DESCRIPTION =
  'Explore Infimind insights on learning science, study skills, student wellbeing, SAT preparation, university admissions and parent guidance.';

function usePageMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const metaEntries = [
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ];

    const created = metaEntries.map((entry) => {
      const element = document.createElement('meta');
      Object.entries(entry).forEach(([key, value]) => element.setAttribute(key, value));
      document.head.appendChild(element);
      return element;
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${window.location.origin}/blog`;
    document.head.appendChild(canonical);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: '/blog' },
        ],
      },
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      created.forEach((element) => element.remove());
      canonical.remove();
      script.remove();
    };
  }, []);
}

function blockPlainText(article: BlogArticle): string {
  return article.body
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
        case 'heading2':
        case 'heading3':
        case 'quote':
        case 'callout':
          return block.text;
        case 'list':
        case 'numberedList':
        case 'keyTakeaways':
          return block.items.join(' ');
        default:
          return '';
      }
    })
    .join(' ');
}

export default function Blog() {
  usePageMetadata();

  const { items: allArticles } = useCollection(blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY);
  useCollection(blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY);
  const settings = useBlogSettings();
  const categories = getActiveCategories();
  const publishedArticles = useMemo(
    () =>
      allArticles
        .filter((article) => article.status === 'published')
        .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt)),
    [allArticles],
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get('category');
  const rawQuery = searchParams.get('q') ?? '';
  const debouncedQuery = useDebouncedValue(rawQuery, 250);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  function updateParams(next: { category?: string | null; q?: string; page?: number }) {
    const params = new URLSearchParams(searchParams);
    if ('category' in next) {
      if (next.category) params.set('category', next.category);
      else params.delete('category');
    }
    if ('q' in next) {
      if (next.q) params.set('q', next.q);
      else params.delete('q');
    }
    if ('category' in next || 'q' in next) params.delete('page');
    if ('page' in next) {
      if (next.page && next.page > 1) params.set('page', String(next.page));
      else params.delete('page');
    }
    setSearchParams(params, { replace: true });
  }

  const filtered = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    return publishedArticles.filter((article) => {
      if (activeCategoryId && article.categoryId !== activeCategoryId) return false;
      if (!query) return true;
      const category = categories.find((item) => item.id === article.categoryId);
      const haystack = [article.title, article.excerpt, category?.name ?? '', blockPlainText(article)]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [publishedArticles, activeCategoryId, debouncedQuery, categories]);

  const articlesPerPage = settings.articlesPerPage || 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / articlesPerPage));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * articlesPerPage, safePage * articlesPerPage);

  const topicCounts = categories
    .map((category) => ({
      category,
      count: publishedArticles.filter((article) => article.categoryId === category.id).length,
    }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  const popularArticles =
    settings.popularMode === 'manual'
      ? publishedArticles.filter((article) => article.popular).slice(0, 5)
      : [...publishedArticles]
          .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt))
          .slice(0, 5);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-1">
          <BlogHero settings={settings} />

          <section className="pt-10 pb-16 md:pt-14">
            <Container width="max">
              <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
                <CategoryFilters
                  categories={categories}
                  activeCategoryId={activeCategoryId}
                  onSelect={(categoryId) => updateParams({ category: categoryId })}
                />
                <BlogSearch value={rawQuery} onChange={(value) => updateParams({ q: value })} />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
                <div>
                  <ArticleGrid
                    articles={paged}
                    categories={categories}
                    hasActiveFilters={Boolean(activeCategoryId || debouncedQuery)}
                  />
                  <BlogPagination page={safePage} totalPages={totalPages} onPageChange={(next) => updateParams({ page: next })} />
                </div>
                <BlogSidebar topicCounts={topicCounts} popularArticles={popularArticles} />
              </div>
            </Container>
          </section>

          <BlogCta settings={settings} />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}
