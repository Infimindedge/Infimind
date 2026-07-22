import { useMemo, useState } from 'react';
import { AlertTriangle, Plus, Search } from 'lucide-react';
import type { BlogArticle, BlogArticleStatus, BlogBlock } from '@/types/blog';
import { blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY } from '@/data/repositories/blogArticleRepository';
import { blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY } from '@/data/repositories/blogCategoryRepository';
import { blogAuthorRepository, BLOG_AUTHORS_STORAGE_KEY } from '@/data/repositories/blogAuthorRepository';
import { useCollection } from '@/hooks/useCollection';
import { AdminModal } from '@/components/admin/AdminModal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { BlockRenderer } from '@/components/blog/BlockRenderer';
import { BlogArticlesList } from './BlogArticlesList';
import { BlogArticleForm } from './BlogArticleForm';
import type { BlogArticleMetaFormValues } from './blogArticleSchema';

type SortMode = 'newest' | 'oldest' | 'updated' | 'alphabetical';

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';

interface PublishCandidate {
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string;
}

/** Publishing requires title/slug/excerpt/category, ≥1 block, and alt text on every image block. */
function getPublishBlockers(candidate: PublishCandidate, body: BlogBlock[]): string[] {
  const missing: string[] = [];
  if (!candidate.title) missing.push('title');
  if (!candidate.slug) missing.push('slug');
  if (!candidate.excerpt) missing.push('excerpt');
  if (!candidate.categoryId) missing.push('category');
  if (body.length === 0) missing.push('at least one content block');
  if (body.some((block) => block.type === 'image' && !block.alt.trim())) missing.push('alt text on an image block');
  return missing;
}

export function BlogArticlesAdmin() {
  const { items: articles } = useCollection(blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY);
  const { items: categories } = useCollection(blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY);
  const { items: authors } = useCollection(blogAuthorRepository, BLOG_AUTHORS_STORAGE_KEY);

  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editing, setEditing] = useState<BlogArticle | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [previewArticle, setPreviewArticle] = useState<BlogArticle | null>(null);
  const [pendingDelete, setPendingDelete] = useState<BlogArticle | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BlogArticleStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>('updated');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = articles.filter((article) => {
      if (statusFilter !== 'all' && article.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && article.categoryId !== categoryFilter) return false;
      if (authorFilter !== 'all' && article.authorId !== authorFilter) return false;
      if (featuredOnly && !article.featured) return false;
      if (popularOnly && !article.popular) return false;
      if (query) {
        const haystack = `${article.title} ${article.slug} ${article.excerpt}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sortMode) {
        case 'newest':
          return (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt);
        case 'oldest':
          return (a.publishedAt ?? a.createdAt).localeCompare(b.publishedAt ?? b.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'updated':
        default:
          return b.updatedAt.localeCompare(a.updatedAt);
      }
    });

    return result;
  }, [articles, search, statusFilter, categoryFilter, authorFilter, featuredOnly, popularOnly, sortMode]);

  function openCreate() {
    setEditing(null);
    setPublishError(null);
    setView('editor');
  }

  function openEdit(article: BlogArticle) {
    setEditing(article);
    setPublishError(null);
    setView('editor');
  }

  function handleDuplicate(article: BlogArticle) {
    const now = new Date().toISOString();
    let slug = `${article.slug}-copy`;
    let suffix = 2;
    while (articles.some((item) => item.slug === slug)) {
      slug = `${article.slug}-copy-${suffix}`;
      suffix += 1;
    }
    blogArticleRepository.create({
      ...article,
      id: crypto.randomUUID(),
      title: `${article.title} (Copy)`,
      slug,
      status: 'draft',
      featured: false,
      popular: false,
      publishedAt: undefined,
      createdAt: now,
      updatedAt: now,
    });
  }

  function handleTogglePublish(article: BlogArticle) {
    if (article.status === 'published') {
      blogArticleRepository.update(article.id, { status: 'draft' });
      return;
    }
    if (article.status === 'archived') {
      blogArticleRepository.update(article.id, { status: 'draft' });
      return;
    }
    const blockers = getPublishBlockers(article, article.body);
    if (blockers.length > 0) {
      setPublishError(`Cannot publish "${article.title || 'this article'}" — missing: ${blockers.join(', ')}.`);
      return;
    }
    blogArticleRepository.update(article.id, {
      status: 'published',
      publishedAt: article.publishedAt ?? new Date().toISOString(),
    });
  }

  function handleArchive(article: BlogArticle) {
    blogArticleRepository.update(article.id, { status: 'archived' });
  }

  function handleConfirmDelete() {
    if (pendingDelete) blogArticleRepository.remove(pendingDelete.id);
    setPendingDelete(null);
  }

  function handleFormSubmit(values: BlogArticleMetaFormValues, body: BlogBlock[]) {
    if (values.status === 'published') {
      const blockers = getPublishBlockers(values, body);
      if (blockers.length > 0) {
        setPublishError(`Cannot publish — missing: ${blockers.join(', ')}.`);
        return;
      }
    }
    setPublishError(null);

    const now = new Date().toISOString();
    const payload = {
      ...values,
      coverImageUrl: values.coverImageUrl || undefined,
      coverImageAlt: values.coverImageAlt || undefined,
      authorId: values.authorId || undefined,
      publishedAt: values.publishedAt || (values.status === 'published' ? editing?.publishedAt ?? now : editing?.publishedAt),
      scheduledFor: values.status === 'scheduled' ? values.scheduledFor || undefined : undefined,
      seoTitle: values.seoTitle || undefined,
      seoDescription: values.seoDescription || undefined,
      canonicalUrl: values.canonicalUrl || undefined,
      socialImageUrl: values.socialImageUrl || undefined,
      body,
      updatedAt: now,
    };

    if (editing) {
      blogArticleRepository.update(editing.id, payload);
    } else {
      blogArticleRepository.create({ id: crypto.randomUUID(), createdAt: now, ...payload });
    }
    setView('list');
    setEditing(null);
  }

  if (view === 'editor') {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">{editing ? 'Edit Article' : 'New Article'}</h2>
        </div>
        {publishError ? (
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-error/30 bg-error/5 p-3.5 text-sm text-error">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>{publishError}</p>
          </div>
        ) : null}
        <div className="mt-6">
          <BlogArticleForm
            initial={editing ?? undefined}
            categories={categories}
            authors={authors}
            otherArticles={articles.filter((article) => article.id !== editing?.id)}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setView('list');
              setEditing(null);
              setPublishError(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Blog Articles</h2>
          <p className="mt-1 text-sm text-ink-soft">Manage every article on /blog. Only published articles are public.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[44px] items-center gap-2 rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover"
        >
          <Plus size={16} />
          New Article
        </button>
      </div>

      {publishError ? (
        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-error/30 bg-error/5 p-3.5 text-sm text-error">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{publishError}</p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, slug, excerpt..."
            aria-label="Search articles"
            className="w-full rounded-btn border border-border-strong bg-paper-pure py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus-visible:border-blue"
          />
        </div>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as BlogArticleStatus | 'all')} className={`${inputClass} w-auto`}>
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="archived">Archived</option>
        </select>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className={`${inputClass} w-auto`}>
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select value={authorFilter} onChange={(event) => setAuthorFilter(event.target.value)} className={`${inputClass} w-auto`}>
          <option value="all">All authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} className={`${inputClass} w-auto`}>
          <option value="updated">Recently updated</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" className="h-4 w-4" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} />
          Featured only
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" className="h-4 w-4" checked={popularOnly} onChange={(event) => setPopularOnly(event.target.checked)} />
          Popular only
        </label>
      </div>

      <div className="mt-6">
        <BlogArticlesList
          articles={filtered}
          categories={categories}
          authors={authors}
          onEdit={openEdit}
          onDuplicate={handleDuplicate}
          onPreview={setPreviewArticle}
          onTogglePublish={handleTogglePublish}
          onArchive={handleArchive}
          onDelete={setPendingDelete}
        />
      </div>

      <AdminModal open={Boolean(previewArticle)} title={previewArticle?.title ?? 'Preview'} onClose={() => setPreviewArticle(null)}>
        <div className="max-h-[70vh] overflow-y-auto">{previewArticle ? <BlockRenderer body={previewArticle.body} /> : null}</div>
      </AdminModal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this article?"
        description="This can't be undone. It will be removed from /blog immediately if published."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
