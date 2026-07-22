import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BlogArticle, BlogAuthor, BlogBlock, BlogCategory } from '@/types/blog';
import { blogArticleMetaSchema, type BlogArticleMetaFormValues } from './blogArticleSchema';
import { BlogBlockEditor } from './BlogBlockEditor';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { fileToDataUrl } from '@/lib/fileToDataUrl';
import { slugify } from '@/lib/slugify';
import { estimateReadingTimeMinutes } from '@/lib/readingTime';

interface BlogArticleFormProps {
  initial?: BlogArticle;
  categories: BlogCategory[];
  authors: BlogAuthor[];
  otherArticles: BlogArticle[];
  onSubmit: (values: BlogArticleMetaFormValues, body: BlogBlock[]) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

export function BlogArticleForm({ initial, categories, authors, otherArticles, onSubmit, onCancel }: BlogArticleFormProps) {
  const [body, setBody] = useState<BlogBlock[]>(initial?.body ?? []);
  const [coverPreview, setCoverPreview] = useState<string | undefined>(initial?.coverImageUrl);
  const [pendingSlugValues, setPendingSlugValues] = useState<BlogArticleMetaFormValues | null>(null);
  const wasPublished = initial?.status === 'published';

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogArticleMetaFormValues>({
    resolver: zodResolver(blogArticleMetaSchema),
    defaultValues: {
      title: initial?.title ?? '',
      slug: initial?.slug ?? '',
      excerpt: initial?.excerpt ?? '',
      coverImageUrl: initial?.coverImageUrl ?? '',
      coverImageAlt: initial?.coverImageAlt ?? '',
      categoryId: initial?.categoryId ?? categories[0]?.id ?? '',
      authorId: initial?.authorId ?? '',
      status: initial?.status ?? 'draft',
      featured: initial?.featured ?? false,
      popular: initial?.popular ?? false,
      readingTimeMinutes: initial?.readingTimeMinutes ?? 1,
      publishedAt: initial?.publishedAt ?? '',
      scheduledFor: initial?.scheduledFor ?? '',
      seoTitle: initial?.seoTitle ?? '',
      seoDescription: initial?.seoDescription ?? '',
      canonicalUrl: initial?.canonicalUrl ?? '',
      socialImageUrl: initial?.socialImageUrl ?? '',
      relatedArticleIds: initial?.relatedArticleIds ?? [],
    },
  });

  const status = useWatch({ control, name: 'status' });
  const relatedArticleIds = useWatch({ control, name: 'relatedArticleIds' });

  function handleTitleBlur() {
    if (!initial && !getValues('slug')) {
      setValue('slug', slugify(getValues('title')));
    }
  }

  async function handleCoverChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setCoverPreview(dataUrl);
    setValue('coverImageUrl', dataUrl);
  }

  function suggestReadingTime() {
    setValue('readingTimeMinutes', estimateReadingTimeMinutes(body));
  }

  function toggleRelated(id: string) {
    const next = relatedArticleIds.includes(id) ? relatedArticleIds.filter((item) => item !== id) : [...relatedArticleIds, id];
    setValue('relatedArticleIds', next);
  }

  function submit(values: BlogArticleMetaFormValues) {
    if (wasPublished && initial && values.slug !== initial.slug) {
      setPendingSlugValues(values);
      return;
    }
    onSubmit(values, body);
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-4 rounded-container border border-border p-5">
        <legend className="px-1 text-sm font-semibold text-ink">Core details</legend>
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input id="title" className={inputClass} {...register('title')} onBlur={handleTitleBlur} aria-invalid={Boolean(errors.title)} />
          {errors.title ? <p className={errorClass}>{errors.title.message}</p> : null}
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input id="slug" className={inputClass} {...register('slug')} aria-invalid={Boolean(errors.slug)} />
          {errors.slug ? <p className={errorClass}>{errors.slug.message}</p> : null}
          {wasPublished ? <p className="mt-1 text-xs text-ink-muted">This article is published — changing the slug breaks existing links.</p> : null}
        </div>
        <div>
          <label htmlFor="excerpt" className={labelClass}>
            Excerpt
          </label>
          <textarea id="excerpt" rows={2} className={inputClass} {...register('excerpt')} aria-invalid={Boolean(errors.excerpt)} />
          {errors.excerpt ? <p className={errorClass}>{errors.excerpt.message}</p> : null}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cover" className={labelClass}>
              Cover image
            </label>
            <input id="cover" type="file" accept="image/*" onChange={handleCoverChange} className="text-sm" />
            {coverPreview ? <img src={coverPreview} alt="" className="mt-2 h-24 w-full rounded-lg object-cover" /> : null}
          </div>
          <div>
            <label htmlFor="coverImageAlt" className={labelClass}>
              Cover alt text
            </label>
            <input id="coverImageAlt" className={inputClass} {...register('coverImageAlt')} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="categoryId" className={labelClass}>
              Category
            </label>
            <select id="categoryId" className={inputClass} {...register('categoryId')} aria-invalid={Boolean(errors.categoryId)}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId ? <p className={errorClass}>{errors.categoryId.message}</p> : null}
          </div>
          <div>
            <label htmlFor="authorId" className={labelClass}>
              Author
            </label>
            <select id="authorId" className={inputClass} {...register('authorId')}>
              <option value="">No author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 rounded-container border border-border p-5">
        <legend className="px-1 text-sm font-semibold text-ink">Publishing</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select id="status" className={inputClass} {...register('status')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label htmlFor="readingTimeMinutes" className={labelClass}>
              Reading time (minutes)
            </label>
            <div className="flex gap-2">
              <input
                id="readingTimeMinutes"
                type="number"
                className={inputClass}
                {...register('readingTimeMinutes', { valueAsNumber: true })}
              />
              <button type="button" onClick={suggestReadingTime} className="shrink-0 rounded-btn border border-border-strong px-3 text-xs font-medium text-ink hover:border-navy">
                Estimate
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="publishedAt" className={labelClass}>
              Published date
            </label>
            <input id="publishedAt" type="date" className={inputClass} {...register('publishedAt')} />
          </div>
          {status === 'scheduled' ? (
            <div>
              <label htmlFor="scheduledFor" className={labelClass}>
                Scheduled for
              </label>
              <input id="scheduledFor" type="date" className={inputClass} {...register('scheduledFor')} />
            </div>
          ) : null}
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <input type="checkbox" className="h-4 w-4" {...register('featured')} />
            Featured
          </label>
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <input type="checkbox" className="h-4 w-4" {...register('popular')} />
            Popular
          </label>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 rounded-container border border-border p-5">
        <legend className="px-1 text-sm font-semibold text-ink">SEO</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="seoTitle" className={labelClass}>
              SEO title (optional)
            </label>
            <input id="seoTitle" className={inputClass} {...register('seoTitle')} />
          </div>
          <div>
            <label htmlFor="canonicalUrl" className={labelClass}>
              Canonical URL (optional)
            </label>
            <input id="canonicalUrl" className={inputClass} {...register('canonicalUrl')} />
          </div>
        </div>
        <div>
          <label htmlFor="seoDescription" className={labelClass}>
            SEO description (optional)
          </label>
          <textarea id="seoDescription" rows={2} className={inputClass} {...register('seoDescription')} />
        </div>
        <div>
          <label htmlFor="socialImageUrl" className={labelClass}>
            Social image URL (optional)
          </label>
          <input id="socialImageUrl" className={inputClass} {...register('socialImageUrl')} />
        </div>
      </fieldset>

      {otherArticles.length > 0 ? (
        <fieldset className="flex flex-col gap-3 rounded-container border border-border p-5">
          <legend className="px-1 text-sm font-semibold text-ink">Related articles (optional)</legend>
          <div className="flex flex-wrap gap-2">
            {otherArticles.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => toggleRelated(article.id)}
                aria-pressed={relatedArticleIds.includes(article.id)}
                className={
                  relatedArticleIds.includes(article.id)
                    ? 'rounded-full bg-gold px-3 py-1.5 text-xs font-medium text-navy'
                    : 'rounded-full bg-paper-soft px-3 py-1.5 text-xs font-medium text-ink-soft hover:text-ink'
                }
              >
                {article.title}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset className="rounded-container border border-border p-5">
        <legend className="px-1 text-sm font-semibold text-ink">Content</legend>
        <BlogBlockEditor blocks={body} onChange={setBody} />
      </fieldset>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-[44px] rounded-btn border border-border-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-navy"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-[44px] rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover disabled:opacity-60"
        >
          Save Article
        </button>
      </div>

      <ConfirmDialog
        open={Boolean(pendingSlugValues)}
        title="Change the published slug?"
        description="This article is already published — changing its URL will break any existing links to it."
        confirmLabel="Change slug"
        onConfirm={() => {
          if (pendingSlugValues) onSubmit(pendingSlugValues, body);
          setPendingSlugValues(null);
        }}
        onCancel={() => setPendingSlugValues(null)}
      />
    </form>
  );
}
