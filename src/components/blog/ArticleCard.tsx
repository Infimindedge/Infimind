import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogImage } from './BlogImage';
import { formatDate } from '@/lib/formatDate';
import type { BlogArticle } from '@/types/blog';

interface ArticleCardProps {
  article: BlogArticle;
  categoryName: string;
}

export function ArticleCard({ article, categoryName }: ArticleCardProps) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-container border border-border bg-paper-pure shadow-soft transition-all duration-300 hover:border-gold-soft hover:shadow-hover"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <BlogImage
          src={article.coverImageUrl}
          alt={article.coverImageAlt ?? ''}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-gold-dark">{categoryName}</p>
        <h3 className="mt-2.5 font-display text-xl leading-snug text-ink">{article.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} aria-hidden="true" />
            {article.readingTimeMinutes} min read
          </span>
          {article.publishedAt ? (
            <>
              <span aria-hidden="true">|</span>
              <span>{formatDate(article.publishedAt)}</span>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
