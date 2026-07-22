import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Container } from '@/components/ui/Container';
import { ArticleHero } from '@/components/blog/ArticleHero';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { BlockRenderer } from '@/components/blog/BlockRenderer';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { BlogCta } from '@/components/blog/BlogCta';
import NotFound from '@/pages/NotFound';
import { blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY } from '@/data/repositories/blogArticleRepository';
import { blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY } from '@/data/repositories/blogCategoryRepository';
import { blogAuthorRepository, BLOG_AUTHORS_STORAGE_KEY } from '@/data/repositories/blogAuthorRepository';
import { useCollection } from '@/hooks/useCollection';
import { useBlogSettings } from '@/hooks/useBlogSettings';
import { buildToc } from '@/lib/blogToc';
import type { BlogArticle as BlogArticleModel } from '@/types/blog';

function usePageMetadata(article: BlogArticleModel | undefined) {
  useEffect(() => {
    if (!article) return;
    const previousTitle = document.title;
    const title = `${article.seoTitle || article.title} | Infimind Blog`;
    const description = article.seoDescription || article.excerpt;
    document.title = title;

    const metaEntries = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
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
    canonical.href = article.canonicalUrl || `${window.location.origin}/blog/${article.slug}`;
    document.head.appendChild(canonical);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: '/blog' },
          { '@type': 'ListItem', position: 3, name: article.title, item: `/blog/${article.slug}` },
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
  }, [article]);
}

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { items: articles } = useCollection(blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY);
  const { items: categories } = useCollection(blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY);
  const { items: authors } = useCollection(blogAuthorRepository, BLOG_AUTHORS_STORAGE_KEY);
  const settings = useBlogSettings();

  const article = articles.find((item) => item.slug === slug && item.status === 'published');

  usePageMetadata(article);

  const toc = useMemo(() => (article ? buildToc(article.body) : []), [article]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    const published = articles.filter((item) => item.status === 'published' && item.id !== article.id);
    const byId = new Map(published.map((item) => [item.id, item]));
    const selected: BlogArticleModel[] = [];

    for (const id of article.relatedArticleIds) {
      const match = byId.get(id);
      if (match && !selected.includes(match)) selected.push(match);
    }
    if (selected.length < 3) {
      for (const item of published) {
        if (selected.length >= 3) break;
        if (item.categoryId === article.categoryId && !selected.includes(item)) selected.push(item);
      }
    }
    if (selected.length < 3) {
      const recent = [...published].sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt));
      for (const item of recent) {
        if (selected.length >= 3) break;
        if (!selected.includes(item)) selected.push(item);
      }
    }
    return selected.slice(0, 3);
  }, [article, articles]);

  if (!article) {
    return <NotFound />;
  }

  const category = categories.find((item) => item.id === article.categoryId);
  const author = authors.find((item) => item.id === article.authorId);

  return (
    <>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="flex-1">
          <ArticleHero article={article} category={category} author={author} />

          <section className="section-spacing">
            <Container width="max">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
                <TableOfContents entries={toc} />
                <div className="mx-auto w-full max-w-[760px]">
                  <BlockRenderer body={article.body} />
                  <RelatedArticles articles={relatedArticles} categories={categories} />
                </div>
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
