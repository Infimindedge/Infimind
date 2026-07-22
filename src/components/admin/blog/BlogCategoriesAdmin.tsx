import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { BlogCategory } from '@/types/blog';
import { blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY } from '@/data/repositories/blogCategoryRepository';
import { blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY } from '@/data/repositories/blogArticleRepository';
import { useCollection } from '@/hooks/useCollection';
import { AdminModal } from '@/components/admin/AdminModal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { BlogCategoryForm } from './BlogCategoryForm';
import type { BlogCategoryFormValues } from './blogCategorySchema';

export function BlogCategoriesAdmin() {
  const { items: categories } = useCollection(blogCategoryRepository, BLOG_CATEGORIES_STORAGE_KEY);
  const { items: articles } = useCollection(blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY);
  const [editing, setEditing] = useState<BlogCategory | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<BlogCategory | null>(null);

  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

  function articleCount(categoryId: string) {
    return articles.filter((article) => article.categoryId === categoryId).length;
  }

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(category: BlogCategory) {
    setEditing(category);
    setFormOpen(true);
  }

  function handleSubmit(values: BlogCategoryFormValues) {
    if (editing) {
      blogCategoryRepository.update(editing.id, values);
    } else {
      blogCategoryRepository.create({ id: crypto.randomUUID(), ...values });
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleConfirmDelete() {
    if (pendingDelete) blogCategoryRepository.remove(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Blog Categories</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Categories power the /blog filters and each article's topic label.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[44px] items-center gap-2 rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-container border border-border">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-paper-soft text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Articles</th>
              <th className="px-4 py-3 font-medium">Sort</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                  No categories yet.
                </td>
              </tr>
            ) : (
              sorted.map((category) => {
                const count = articleCount(category.id);
                return (
                  <tr key={category.id} className="border-b border-border bg-paper-pure last:border-b-0">
                    <td className="px-4 py-3 text-ink">{category.name}</td>
                    <td className="px-4 py-3 text-ink-soft">{count}</td>
                    <td className="px-4 py-3 text-ink-soft">{category.sortOrder}</td>
                    <td className="px-4 py-3">
                      <span className={category.active ? 'text-success' : 'text-ink-muted'}>
                        {category.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(category)}
                          aria-label={`Edit ${category.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(category)}
                          disabled={count > 0}
                          aria-label={`Delete ${category.name}`}
                          title={count > 0 ? `${count} article${count === 1 ? '' : 's'} use this category — reassign them first` : undefined}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink-soft"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <AdminModal open={formOpen} title={editing ? 'Edit Category' : 'Add Category'} onClose={() => setFormOpen(false)}>
        <BlogCategoryForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </AdminModal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this category?"
        description="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
