import { SearchX } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import type { BlogArticle, BlogCategory } from '@/types/blog';

interface ArticleGridProps {
  articles: BlogArticle[];
  categories: BlogCategory[];
  hasActiveFilters: boolean;
}

export function ArticleGrid({ articles, categories, hasActiveFilters }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-container border border-dashed border-border-strong bg-paper-pure px-6 py-16 text-center">
        <SearchX size={28} className="text-ink-muted" aria-hidden="true" />
        <h3 className="font-display text-xl text-ink">
          {hasActiveFilters ? 'No articles match your search' : 'No articles yet'}
        </h3>
        <p className="max-w-sm text-sm text-ink-soft">
          {hasActiveFilters
            ? 'Try a different search term or category filter.'
            : 'New articles will appear here as soon as they are published.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const category = categories.find((item) => item.id === article.categoryId);
        return <ArticleCard key={article.id} article={article} categoryName={category?.name ?? 'General'} />;
      })}
    </div>
  );
}
