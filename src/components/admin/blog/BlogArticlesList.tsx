import { Archive, Copy, Eye, Pencil, RotateCcw, Send, EyeOff, Star, TrendingUp, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/formatDate';
import type { BlogArticle, BlogAuthor, BlogCategory } from '@/types/blog';

interface BlogArticlesListProps {
  articles: BlogArticle[];
  categories: BlogCategory[];
  authors: BlogAuthor[];
  onEdit: (article: BlogArticle) => void;
  onDuplicate: (article: BlogArticle) => void;
  onPreview: (article: BlogArticle) => void;
  onTogglePublish: (article: BlogArticle) => void;
  onArchive: (article: BlogArticle) => void;
  onDelete: (article: BlogArticle) => void;
}

const STATUS_STYLES: Record<BlogArticle['status'], string> = {
  draft: 'bg-paper-soft text-ink-muted',
  published: 'bg-success/10 text-success',
  scheduled: 'bg-blue-soft text-blue',
  archived: 'bg-error/10 text-error',
};

export function BlogArticlesList({
  articles,
  categories,
  authors,
  onEdit,
  onDuplicate,
  onPreview,
  onTogglePublish,
  onArchive,
  onDelete,
}: BlogArticlesListProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-container border border-dashed border-border-strong bg-paper-pure p-10 text-center text-sm text-ink-muted">
        No articles match these filters yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-container border border-border">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-paper-soft text-xs uppercase tracking-wide text-ink-muted">
            <th className="px-4 py-3 font-medium">Article</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Author</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Updated</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            const category = categories.find((item) => item.id === article.categoryId);
            const author = authors.find((item) => item.id === article.authorId);
            return (
              <tr key={article.id} className="border-b border-border bg-paper-pure last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {article.coverImageUrl ? (
                      <img src={article.coverImageUrl} alt="" className="h-10 w-14 shrink-0 rounded-md object-cover" />
                    ) : (
                      <span className="h-10 w-14 shrink-0 rounded-md bg-paper-soft" aria-hidden="true" />
                    )}
                    <div>
                      <p className="font-medium text-ink">{article.title}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-muted">
                        {article.featured ? (
                          <span className="inline-flex items-center gap-1 text-gold-dark">
                            <Star size={11} aria-hidden="true" /> Featured
                          </span>
                        ) : null}
                        {article.popular ? (
                          <span className="inline-flex items-center gap-1">
                            <TrendingUp size={11} aria-hidden="true" /> Popular
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">{category?.name ?? '—'}</td>
                <td className="px-4 py-3 text-ink-soft">{author?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium capitalize', STATUS_STYLES[article.status])}>
                    {article.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(article.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button type="button" onClick={() => onEdit(article)} aria-label={`Edit ${article.title}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy">
                      <Pencil size={14} />
                    </button>
                    <button type="button" onClick={() => onDuplicate(article)} aria-label={`Duplicate ${article.title}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy">
                      <Copy size={14} />
                    </button>
                    <button type="button" onClick={() => onPreview(article)} aria-label={`Preview ${article.title}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy">
                      <Eye size={14} />
                    </button>
                    {article.status !== 'archived' ? (
                      <button
                        type="button"
                        onClick={() => onTogglePublish(article)}
                        aria-label={article.status === 'published' ? `Unpublish ${article.title}` : `Publish ${article.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy"
                      >
                        {article.status === 'published' ? <EyeOff size={14} /> : <Send size={14} />}
                      </button>
                    ) : (
                      <button type="button" onClick={() => onTogglePublish(article)} aria-label={`Restore ${article.title} to draft`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy">
                        <RotateCcw size={14} />
                      </button>
                    )}
                    {article.status !== 'archived' ? (
                      <button type="button" onClick={() => onArchive(article)} aria-label={`Archive ${article.title}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy">
                        <Archive size={14} />
                      </button>
                    ) : null}
                    <button type="button" onClick={() => onDelete(article)} aria-label={`Delete ${article.title}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
