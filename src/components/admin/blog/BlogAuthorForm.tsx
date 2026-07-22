import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { BlogAuthor } from '@/types/blog';
import { blogAuthorSchema, type BlogAuthorFormValues } from './blogAuthorSchema';
import { fileToDataUrl } from '@/lib/fileToDataUrl';

interface BlogAuthorFormProps {
  initial?: BlogAuthor;
  onSubmit: (values: BlogAuthorFormValues) => void;
  onCancel: () => void;
}

const inputClass =
  'w-full rounded-btn border border-border-strong bg-paper-pure px-3.5 py-2.5 text-sm text-ink outline-none focus-visible:border-blue';
const labelClass = 'mb-1.5 block text-sm font-medium text-ink';
const errorClass = 'mt-1 text-xs text-error';

export function BlogAuthorForm({ initial, onSubmit, onCancel }: BlogAuthorFormProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(initial?.avatarUrl);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogAuthorFormValues>({
    resolver: zodResolver(blogAuthorSchema),
    defaultValues: {
      name: initial?.name ?? '',
      role: initial?.role ?? '',
      bio: initial?.bio ?? '',
      avatarUrl: initial?.avatarUrl ?? '',
      linkedInUrl: initial?.linkedInUrl ?? '',
      active: initial?.active ?? true,
    },
  });

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setAvatarPreview(dataUrl);
    setValue('avatarUrl', dataUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" className={inputClass} {...register('name')} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Role
          </label>
          <input id="role" placeholder="e.g. Learning Research Lead, Infimind" className={inputClass} {...register('role')} />
        </div>
      </div>

      <div>
        <label htmlFor="bio" className={labelClass}>
          Bio
        </label>
        <textarea id="bio" rows={3} className={inputClass} {...register('bio')} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="avatar" className={labelClass}>
            Avatar (optional)
          </label>
          <input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
          {avatarPreview ? <img src={avatarPreview} alt="" className="mt-2 h-14 w-14 rounded-full object-cover" /> : null}
        </div>
        <div>
          <label htmlFor="linkedInUrl" className={labelClass}>
            LinkedIn URL (optional)
          </label>
          <input id="linkedInUrl" className={inputClass} {...register('linkedInUrl')} aria-invalid={Boolean(errors.linkedInUrl)} />
          {errors.linkedInUrl ? <p className={errorClass}>{errors.linkedInUrl.message}</p> : null}
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium text-ink">
        <input type="checkbox" className="h-4 w-4" {...register('active')} />
        Active
      </label>

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
          Save Author
        </button>
      </div>
    </form>
  );
}
