import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogImage } from './BlogImage';
import type { BlogArticle, BlogCategory } from '@/types/blog';

interface TopicCount {
  category: BlogCategory;
  count: number;
}

interface BlogSidebarProps {
  topicCounts: TopicCount[];
  popularArticles: BlogArticle[];
}

export function BlogSidebar({ topicCounts, popularArticles }: BlogSidebarProps) {
  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-container border border-border bg-paper-pure p-5">
        <h2 className="eyebrow text-ink-muted">Popular Topics</h2>
        {topicCounts.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-3">
            {topicCounts.map(({ category, count }) => (
              <li key={category.id} className="flex items-center justify-between text-sm text-ink">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-gold-dark" aria-hidden="true" />
                  {category.name}
                </span>
                <span className="rounded-full bg-paper-soft px-2 py-0.5 text-xs font-medium text-ink-muted">{count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">No published topics yet.</p>
        )}
      </div>

      <div className="rounded-container border border-border bg-paper-pure p-5">
        <h2 className="eyebrow text-ink-muted">Popular Articles</h2>
        {popularArticles.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-4">
            {popularArticles.map((article) => (
              <li key={article.id}>
                <Link to={`/blog/${article.slug}`} className="group flex items-start gap-3">
                  <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg">
                    <BlogImage src={article.coverImageUrl} alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-snug text-ink group-hover:text-navy">{article.title}</p>
                    <p className="mt-1 text-xs text-ink-muted">{article.readingTimeMinutes} min read</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">No popular articles yet.</p>
        )}
      </div>
    </aside>
  );
}
