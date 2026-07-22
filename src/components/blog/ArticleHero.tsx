import { CalendarDays, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BlogImage } from './BlogImage';
import { formatDate } from '@/lib/formatDate';
import type { BlogArticle, BlogAuthor, BlogCategory } from '@/types/blog';

interface ArticleHeroProps {
  article: BlogArticle;
  category?: BlogCategory;
  author?: BlogAuthor;
}

export function ArticleHero({ article, category, author }: ArticleHeroProps) {
  return (
    <section className="pt-6">
      <Container width="max">
        <div className="relative aspect-[16/9] overflow-hidden rounded-container sm:aspect-[16/7]">
          <BlogImage src={article.coverImageUrl} alt={article.coverImageAlt ?? ''} priority className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            {category ? <p className="eyebrow text-gold">{category.name}</p> : null}
            <h1 className="mt-3 max-w-2xl text-[clamp(28px,4vw,44px)] leading-[1.1] text-on-dark">{article.title}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-dark/85 sm:text-base">{article.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-on-dark/85">
              {author ? (
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-paper-soft">
                    <BlogImage src={author.avatarUrl} alt="" />
                  </div>
                  <div>
                    <p className="font-medium text-on-dark">By {author.name}</p>
                    {author.role ? <p className="text-xs text-on-dark/70">{author.role}</p> : null}
                  </div>
                </div>
              ) : null}
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {article.readingTimeMinutes} min read
              </span>
              {article.publishedAt ? (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} aria-hidden="true" />
                  {formatDate(article.publishedAt)}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
