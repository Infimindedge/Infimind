import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BlogCategory } from '@/types/blog';
import { blogCategorySchema, type BlogCategoryFormValues } from './blogCategorySchema';

interface BlogCategoryFormProps {
  initial?: BlogCategory;
  onSubmit: (values: BlogCategoryFormValues) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

export function BlogCategoryForm({ initial, onSubmit, onCancel }: BlogCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogCategoryFormValues>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: {
      name: initial?.name ?? '',
      active: initial?.active ?? true,
      sortOrder: initial?.sortOrder ?? 1,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Category name
        </label>
        <input id="name" className={inputClass} {...register('name')} aria-invalid={Boolean(errors.name)} />
        {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
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
            Active
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
          Save Category
        </button>
      </div>
    </form>
  );
}
