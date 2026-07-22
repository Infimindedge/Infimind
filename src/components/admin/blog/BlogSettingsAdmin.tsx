import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { blogSettingsRepository } from '@/data/repositories/blogSettingsRepository';
import { blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY } from '@/data/repositories/blogArticleRepository';
import { useCollection } from '@/hooks/useCollection';
import { useBlogSettings } from '@/hooks/useBlogSettings';
import { fileToDataUrl } from '@/lib/fileToDataUrl';
import { blogSettingsSchema, type BlogSettingsFormValues } from './blogSettingsSchema';

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

export function BlogSettingsAdmin() {
  const settings = useBlogSettings();
  const { items: articles } = useCollection(blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogSettingsFormValues>({
    resolver: zodResolver(blogSettingsSchema),
    defaultValues: settings,
  });

  const heroImagePreview = useWatch({ control, name: 'heroImageFilename' });

  async function handleHeroImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setValue('heroImageFilename', dataUrl);
  }

  function onSubmit(values: BlogSettingsFormValues) {
    blogSettingsRepository.update({
      ...values,
      heroImageFilename: values.heroImageFilename || undefined,
      featuredArticleId: values.featuredArticleId || undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-ink">Blog Settings</h2>
      <p className="mt-1 text-sm text-ink-soft">Controls the /blog hero, pagination, CTA and popular-articles behaviour.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex max-w-2xl flex-col gap-6">
        <fieldset className="flex flex-col gap-4 rounded-container border border-border p-5">
          <legend className="px-1 text-sm font-semibold text-ink">Hero</legend>
          <div>
            <label htmlFor="heroEyebrow" className={labelClass}>
              Eyebrow
            </label>
            <input id="heroEyebrow" className={inputClass} {...register('heroEyebrow')} />
          </div>
          <div>
            <label htmlFor="heroTitle" className={labelClass}>
              Title
            </label>
            <input id="heroTitle" className={inputClass} {...register('heroTitle')} aria-invalid={Boolean(errors.heroTitle)} />
            {errors.heroTitle ? <p className={errorClass}>{errors.heroTitle.message}</p> : null}
          </div>
          <div>
            <label htmlFor="heroDescription" className={labelClass}>
              Description
            </label>
            <textarea id="heroDescription" rows={3} className={inputClass} {...register('heroDescription')} />
          </div>
          <div>
            <label htmlFor="heroImage" className={labelClass}>
              Hero image (optional)
            </label>
            <input id="heroImage" type="file" accept="image/*" onChange={handleHeroImageChange} className="text-sm" />
            {heroImagePreview?.startsWith('data:') ? (
              <img src={heroImagePreview} alt="" className="mt-2 h-24 w-full rounded-lg object-cover" />
            ) : heroImagePreview ? (
              <p className="mt-2 text-xs text-ink-muted">Current: /assets/blog/{heroImagePreview}</p>
            ) : null}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4 rounded-container border border-border p-5">
          <legend className="px-1 text-sm font-semibold text-ink">Listing behaviour</legend>
          <div>
            <label htmlFor="articlesPerPage" className={labelClass}>
              Articles per page
            </label>
            <input
              id="articlesPerPage"
              type="number"
              className={inputClass}
              {...register('articlesPerPage', { valueAsNumber: true })}
              aria-invalid={Boolean(errors.articlesPerPage)}
            />
            {errors.articlesPerPage ? <p className={errorClass}>{errors.articlesPerPage.message}</p> : null}
          </div>
          <div>
            <label htmlFor="popularMode" className={labelClass}>
              Popular Articles source
            </label>
            <select id="popularMode" className={inputClass} {...register('popularMode')}>
              <option value="manual">Manually flagged ("Popular" toggle on each article)</option>
              <option value="mostRecent">Most recently published</option>
            </select>
          </div>
          <div>
            <label htmlFor="featuredArticleId" className={labelClass}>
              Featured article (optional)
            </label>
            <select id="featuredArticleId" className={inputClass} {...register('featuredArticleId')}>
              <option value="">None</option>
              {articles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.title}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4 rounded-container border border-border p-5">
          <legend className="px-1 text-sm font-semibold text-ink">Bottom CTA</legend>
          <div>
            <label htmlFor="ctaTitle" className={labelClass}>
              Title
            </label>
            <input id="ctaTitle" className={inputClass} {...register('ctaTitle')} aria-invalid={Boolean(errors.ctaTitle)} />
            {errors.ctaTitle ? <p className={errorClass}>{errors.ctaTitle.message}</p> : null}
          </div>
          <div>
            <label htmlFor="ctaDescription" className={labelClass}>
              Description
            </label>
            <input id="ctaDescription" className={inputClass} {...register('ctaDescription')} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ctaButtonLabel" className={labelClass}>
                Button label
              </label>
              <input id="ctaButtonLabel" className={inputClass} {...register('ctaButtonLabel')} aria-invalid={Boolean(errors.ctaButtonLabel)} />
              {errors.ctaButtonLabel ? <p className={errorClass}>{errors.ctaButtonLabel.message}</p> : null}
            </div>
            <div>
              <label htmlFor="ctaTarget" className={labelClass}>
                Button target
              </label>
              <input id="ctaTarget" className={inputClass} {...register('ctaTarget')} aria-invalid={Boolean(errors.ctaTarget)} />
              {errors.ctaTarget ? <p className={errorClass}>{errors.ctaTarget.message}</p> : null}
            </div>
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover disabled:opacity-60"
          >
            Save Settings
          </button>
          {saved ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
              <Check size={15} /> Saved
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
