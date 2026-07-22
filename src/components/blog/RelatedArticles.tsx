import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogImage } from './BlogImage';
import type { BlogArticle, BlogCategory } from '@/types/blog';

interface RelatedArticlesProps {
  articles: BlogArticle[];
  categories: BlogCategory[];
}

export function RelatedArticles({ articles, categories }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-14 border-t border-border pt-10">
      <h2 className="font-display text-2xl text-ink">Related Articles</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {articles.map((article) => {
          const category = categories.find((item) => item.id === article.categoryId);
          return (
            <Link key={article.id} to={`/blog/${article.slug}`} className="group">
              <div className="aspect-[3/2] overflow-hidden rounded-container">
                <BlogImage
                  src={article.coverImageUrl}
                  alt={article.coverImageAlt ?? ''}
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                />
              </div>
              <p className="eyebrow mt-3 text-gold-dark">{category?.name ?? 'General'}</p>
              <p className="mt-1.5 flex items-center gap-1.5 font-display text-lg leading-snug text-ink group-hover:text-navy">
                {article.title}
                <ArrowRight size={15} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </p>
              <p className="mt-1 text-xs text-ink-muted">{article.readingTimeMinutes} min read</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
