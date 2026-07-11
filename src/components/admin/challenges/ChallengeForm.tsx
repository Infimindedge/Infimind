import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { ChallengeItem } from '@/types/content';
import { challengeSchema, type ChallengeFormValues } from './challengeSchema';
import { fileToDataUrl } from '@/lib/fileToDataUrl';

interface ChallengeFormProps {
  initial?: ChallengeItem;
  onSubmit: (values: ChallengeFormValues) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

function toFieldArray(items: string[]): { value: string }[] {
  return items.length > 0 ? items.map((value) => ({ value })) : [{ value: '' }];
}

export function ChallengeForm({ initial, onSubmit, onCancel }: ChallengeFormProps) {
  const [challengeImagePreview, setChallengeImagePreview] = useState<string | undefined>(
    initial?.challengeImageFilename,
  );
  const [outcomeImagePreview, setOutcomeImagePreview] = useState<string | undefined>(initial?.outcomeImageFilename);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      label: initial?.label ?? '',
      challengeTitle: initial?.challengeTitle ?? '',
      challengeDescription: initial?.challengeDescription ?? '',
      approach: toFieldArray(initial?.approach ?? []),
      outcomes: toFieldArray(initial?.outcomes ?? []),
      challengeImageFilename: initial?.challengeImageFilename ?? '',
      outcomeImageFilename: initial?.outcomeImageFilename ?? '',
      sortOrder: initial?.sortOrder ?? 1,
    },
  });

  const approachArray = useFieldArray({ control, name: 'approach' });
  const outcomesArray = useFieldArray({ control, name: 'outcomes' });

  async function handleChallengeImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setChallengeImagePreview(dataUrl);
    setValue('challengeImageFilename', dataUrl);
  }

  async function handleOutcomeImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setOutcomeImagePreview(dataUrl);
    setValue('outcomeImageFilename', dataUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="label" className={labelClass}>
            Tab label
          </label>
          <input id="label" className={inputClass} {...register('label')} aria-invalid={Boolean(errors.label)} />
          {errors.label ? <p className={errorClass}>{errors.label.message}</p> : null}
        </div>
        <div>
          <label htmlFor="sortOrder" className={labelClass}>
            Sort order
          </label>
          <input id="sortOrder" type="number" className={inputClass} {...register('sortOrder', { valueAsNumber: true })} />
        </div>
      </div>

      <div>
        <label htmlFor="challengeTitle" className={labelClass}>
          Challenge title (optional — leave blank to show as "in progress")
        </label>
        <input id="challengeTitle" className={inputClass} {...register('challengeTitle')} />
      </div>

      <div>
        <label htmlFor="challengeDescription" className={labelClass}>
          Challenge description
        </label>
        <textarea id="challengeDescription" rows={3} className={inputClass} {...register('challengeDescription')} />
      </div>

      <div>
        <span className={labelClass}>Our Approach — checklist</span>
        <div className="flex flex-col gap-2">
          {approachArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                className={inputClass}
                {...register(`approach.${index}.value` as const)}
                aria-invalid={Boolean(errors.approach?.[index]?.value)}
              />
              <button
                type="button"
                onClick={() => approachArray.remove(index)}
                aria-label="Remove approach item"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => approachArray.append({ value: '' })}
          className="mt-2 flex items-center gap-1.5 text-sm font-medium text-gold-dark hover:text-navy"
        >
          <Plus size={14} /> Add item
        </button>
      </div>

      <div>
        <span className={labelClass}>Expected Outcome — checklist</span>
        <div className="flex flex-col gap-2">
          {outcomesArray.fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <input
                className={inputClass}
                {...register(`outcomes.${index}.value` as const)}
                aria-invalid={Boolean(errors.outcomes?.[index]?.value)}
              />
              <button
                type="button"
                onClick={() => outcomesArray.remove(index)}
                aria-label="Remove outcome item"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => outcomesArray.append({ value: '' })}
          className="mt-2 flex items-center gap-1.5 text-sm font-medium text-gold-dark hover:text-navy"
        >
          <Plus size={14} /> Add item
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="challengeImage" className={labelClass}>
            Challenge photo (optional)
          </label>
          <input id="challengeImage" type="file" accept="image/*" onChange={handleChallengeImageChange} className="text-sm" />
          {challengeImagePreview ? (
            <img src={challengeImagePreview} alt="" className="mt-2 h-20 w-full rounded-lg object-cover" />
          ) : null}
        </div>
        <div>
          <label htmlFor="outcomeImage" className={labelClass}>
            Outcome photo (optional)
          </label>
          <input id="outcomeImage" type="file" accept="image/*" onChange={handleOutcomeImageChange} className="text-sm" />
          {outcomeImagePreview ? (
            <img src={outcomeImagePreview} alt="" className="mt-2 h-20 w-full rounded-lg object-cover" />
          ) : null}
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
          Save Challenge
        </button>
      </div>
    </form>
  );
}
