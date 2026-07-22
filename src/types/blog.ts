export type BlogArticleStatus = 'draft' | 'published' | 'scheduled' | 'archived';

export type BlogPopularMode = 'manual' | 'mostRecent';

export interface BlogResearchCard {
  stat: string;
  label: string;
  sourceLabel: string;
  sourceUrl?: string;
}

export interface BlogProcessStep {
  title: string;
  description: string;
}

export interface BlogReference {
  label: string;
  url?: string;
}

export type BlogBlock =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading2'; text: string }
  | { id: string; type: 'heading3'; text: string }
  | { id: string; type: 'quote'; text: string; attribution?: string }
  | { id: string; type: 'image'; src: string; alt: string; caption?: string }
  | { id: string; type: 'list'; items: string[] }
  | { id: string; type: 'numberedList'; items: string[] }
  | { id: string; type: 'callout'; text: string }
  | { id: string; type: 'researchCards'; cards: BlogResearchCard[] }
  | { id: string; type: 'divider' }
  | { id: string; type: 'keyTakeaways'; items: string[]; imageSrc?: string; imageAlt?: string }
  | { id: string; type: 'twoColumn'; imageSrc: string; imageAlt: string; heading?: string; text: string }
  | { id: string; type: 'process'; steps: BlogProcessStep[] }
  | { id: string; type: 'references'; items: BlogReference[] };

export type BlogBlockType = BlogBlock['type'];

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  categoryId: string;
  authorId?: string;
  status: BlogArticleStatus;
  featured: boolean;
  popular: boolean;
  readingTimeMinutes: number;
  publishedAt?: string;
  scheduledFor?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  socialImageUrl?: string;
  body: BlogBlock[];
  relatedArticleIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  active: boolean;
  sortOrder: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  linkedInUrl?: string;
  active: boolean;
}

export interface BlogSettings {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImageFilename?: string;
  articlesPerPage: number;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaTarget: string;
  featuredArticleId?: string;
  popularMode: BlogPopularMode;
}
