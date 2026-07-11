import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { LocationItem } from '@/types/content';
import { locationSchema, type LocationFormValues } from './locationSchema';
import { fileToDataUrl } from '@/lib/fileToDataUrl';
import { isoToFlagEmoji } from '@/lib/flag';

interface LocationFormProps {
  initial?: LocationItem;
  onSubmit: (values: LocationFormValues) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

export function LocationForm({ initial, onSubmit, onCancel }: LocationFormProps) {
  const [flagPreview, setFlagPreview] = useState<string | undefined>(initial?.flagImageUrl);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: initial?.country ?? '',
      city: initial?.city ?? '',
      isoCode: initial?.isoCode ?? '',
      flagImageUrl: initial?.flagImageUrl ?? '',
      active: initial?.active ?? true,
      sortOrder: initial?.sortOrder ?? 1,
      program: initial?.program ?? '',
      quote: initial?.quote ?? '',
      attribution: initial?.attribution ?? '',
      storyLabel: initial?.storyLabel ?? '',
    },
  });

  const isoCode = watch('isoCode');

  async function handleFlagChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setFlagPreview(dataUrl);
    setValue('flagImageUrl', dataUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <input id="country" className={inputClass} {...register('country')} aria-invalid={Boolean(errors.country)} />
          {errors.country ? <p className={errorClass}>{errors.country.message}</p> : null}
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>
            City / display location
          </label>
          <input id="city" className={inputClass} {...register('city')} aria-invalid={Boolean(errors.city)} />
          {errors.city ? <p className={errorClass}>{errors.city.message}</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="isoCode" className={labelClass}>
            ISO code (2 letters)
          </label>
          <input
            id="isoCode"
            maxLength={2}
            className={inputClass}
            {...register('isoCode')}
            aria-invalid={Boolean(errors.isoCode)}
          />
          {errors.isoCode ? <p className={errorClass}>{errors.isoCode.message}</p> : null}
        </div>
        <div>
          <span className={labelClass}>Flag preview</span>
          <div className="flex h-[42px] w-16 items-center justify-center rounded-btn border border-border-strong bg-paper-soft text-xl">
            {flagPreview ? (
              <img src={flagPreview} alt="" className="h-full w-full rounded-btn object-cover" />
            ) : (
              <span aria-hidden="true">{isoToFlagEmoji(isoCode || '') || '—'}</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="flagImage" className={labelClass}>
          Upload custom flag image (optional — overrides the emoji flag)
        </label>
        <input id="flagImage" type="file" accept="image/*,.svg" onChange={handleFlagChange} className="text-sm" />
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
            <input type="checkbox" className="h-4 w-4" {...register('active')} />
            Active (shown on homepage)
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="program" className={labelClass}>
          Associated program (optional)
        </label>
        <select id="program" className={inputClass} {...register('program')}>
          <option value="">None</option>
          <option value="school">School Program</option>
          <option value="sat">SAT Program</option>
        </select>
      </div>

      <div>
        <label htmlFor="storyLabel" className={labelClass}>
          Story card caption (optional)
        </label>
        <input id="storyLabel" placeholder="e.g. School Excellence Program" className={inputClass} {...register('storyLabel')} />
      </div>

      <div>
        <label htmlFor="quote" className={labelClass}>
          Short family quote (optional)
        </label>
        <textarea id="quote" rows={3} className={inputClass} {...register('quote')} />
      </div>

      <div>
        <label htmlFor="attribution" className={labelClass}>
          Parent attribution (optional)
        </label>
        <input id="attribution" placeholder="e.g. Parent, Singapore" className={inputClass} {...register('attribution')} />
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
          Save Location
        </button>
      </div>
    </form>
  );
}
