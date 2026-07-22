import type { BlogAuthor } from '@/types/blog';
import { blogAuthorsSeed } from '@/data/seed/blogAuthors.seed';
import { createCollectionRepository } from './createCollectionRepository';

export const BLOG_AUTHORS_STORAGE_KEY = 'infimind_blog_authors_v1';

export const blogAuthorRepository = createCollectionRepository<BlogAuthor>(BLOG_AUTHORS_STORAGE_KEY, blogAuthorsSeed);
