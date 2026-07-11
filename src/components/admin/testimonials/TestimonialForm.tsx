import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { Testimonial } from '@/types/content';
import { testimonialSchema, type TestimonialFormValues } from './testimonialSchema';
import { fileToDataUrl } from '@/lib/fileToDataUrl';

interface TestimonialFormProps {
  initial?: Testimonial;
  onSubmit: (values: TestimonialFormValues) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

export function TestimonialForm({ initial, onSubmit, onCancel }: TestimonialFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(initial?.photoUrl);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      displayName: initial?.displayName ?? '',
      privacyLabel: initial?.privacyLabel ?? '',
      city: initial?.city ?? '',
      country: initial?.country ?? '',
      program: initial?.program ?? 'school',
      quote: initial?.quote ?? '',
      photoUrl: initial?.photoUrl ?? '',
      videoUrl: initial?.videoUrl ?? '',
      sortOrder: initial?.sortOrder ?? 1,
      published: initial?.published ?? false,
    },
  });

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setPhotoPreview(dataUrl);
    setValue('photoUrl', dataUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="displayName" className={labelClass}>
            Display Name
          </label>
          <input id="displayName" className={inputClass} {...register('displayName')} />
        </div>
        <div>
          <label htmlFor="privacyLabel" className={labelClass}>
            Privacy-safe label
          </label>
          <input id="privacyLabel" placeholder="e.g. Parent, London" className={inputClass} {...register('privacyLabel')} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input id="city" className={inputClass} {...register('city')} aria-invalid={Boolean(errors.city)} />
          {errors.city ? <p className={errorClass}>{errors.city.message}</p> : null}
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <input id="country" className={inputClass} {...register('country')} aria-invalid={Boolean(errors.country)} />
          {errors.country ? <p className={errorClass}>{errors.country.message}</p> : null}
        </div>
        <div>
          <label htmlFor="program" className={labelClass}>
            Program
          </label>
          <select id="program" className={inputClass} {...register('program')}>
            <option value="school">School Program</option>
            <option value="sat">SAT Program</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="quote" className={labelClass}>
          Quote
        </label>
        <textarea
          id="quote"
          rows={4}
          className={inputClass}
          {...register('quote')}
          aria-invalid={Boolean(errors.quote)}
        />
        {errors.quote ? <p className={errorClass}>{errors.quote.message}</p> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="photo" className={labelClass}>
            Photo (optional)
          </label>
          <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
          {photoPreview ? (
            <img src={photoPreview} alt="" className="mt-2 h-14 w-14 rounded-full object-cover" />
          ) : null}
        </div>
        <div>
          <label htmlFor="videoUrl" className={labelClass}>
            Video URL (optional)
          </label>
          <input id="videoUrl" className={inputClass} {...register('videoUrl')} aria-invalid={Boolean(errors.videoUrl)} />
          {errors.videoUrl ? <p className={errorClass}>{errors.videoUrl.message}</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sortOrder" className={labelClass}>
            Sort order
          </label>
          <input id="sortOrder" type="number" className={inputClass} {...register('sortOrder', { valueAsNumber: true })} />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
            <input type="checkbox" className="h-4 w-4" {...register('published')} />
            Published
          </label>
        </div>
      </div>

      <div className="mt-2 flex justify-end gap-3">
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
          Save Testimonial
        </button>
      </div>
    </form>
  );
}
