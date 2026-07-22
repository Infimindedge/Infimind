import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { BlogAuthor } from '@/types/blog';
import { blogAuthorRepository, BLOG_AUTHORS_STORAGE_KEY } from '@/data/repositories/blogAuthorRepository';
import { blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY } from '@/data/repositories/blogArticleRepository';
import { useCollection } from '@/hooks/useCollection';
import { AdminModal } from '@/components/admin/AdminModal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { BlogAuthorForm } from './BlogAuthorForm';
import type { BlogAuthorFormValues } from './blogAuthorSchema';

export function BlogAuthorsAdmin() {
  const { items: authors } = useCollection(blogAuthorRepository, BLOG_AUTHORS_STORAGE_KEY);
  const { items: articles } = useCollection(blogArticleRepository, BLOG_ARTICLES_STORAGE_KEY);
  const [editing, setEditing] = useState<BlogAuthor | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<BlogAuthor | null>(null);

  function articleCount(authorId: string) {
    return articles.filter((article) => article.authorId === authorId).length;
  }

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(author: BlogAuthor) {
    setEditing(author);
    setFormOpen(true);
  }

  function handleSubmit(values: BlogAuthorFormValues) {
    const payload = { ...values, avatarUrl: values.avatarUrl || undefined, linkedInUrl: values.linkedInUrl || undefined };
    if (editing) {
      blogAuthorRepository.update(editing.id, payload);
    } else {
      blogAuthorRepository.create({ id: crypto.randomUUID(), ...payload });
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleConfirmDelete() {
    if (pendingDelete) blogAuthorRepository.remove(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Blog Authors</h2>
          <p className="mt-1 text-sm text-ink-soft">Authors appear on each article's hero and byline.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[44px] items-center gap-2 rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover"
        >
          <Plus size={16} />
          Add Author
        </button>
      </div>

      {authors.length === 0 ? (
        <div className="mt-6 rounded-container border border-dashed border-border-strong bg-paper-pure p-10 text-center text-sm text-ink-muted">
          No authors yet. Add one above.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-container border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-paper-soft text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Articles</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id} className="border-b border-border bg-paper-pure last:border-b-0">
                  <td className="px-4 py-3 text-ink">
                    <div className="flex items-center gap-3">
                      {author.avatarUrl ? (
                        <img src={author.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <span className="h-8 w-8 rounded-full bg-paper-soft" aria-hidden="true" />
                      )}
                      {author.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{author.role}</td>
                  <td className="px-4 py-3 text-ink-soft">{articleCount(author.id)}</td>
                  <td className="px-4 py-3">
                    <span className={author.active ? 'text-success' : 'text-ink-muted'}>{author.active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(author)}
                        aria-label={`Edit ${author.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(author)}
                        aria-label={`Delete ${author.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-error/10 hover:text-error"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdminModal open={formOpen} title={editing ? 'Edit Author' : 'Add Author'} onClose={() => setFormOpen(false)}>
        <BlogAuthorForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </AdminModal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this author?"
        description="Articles by this author will keep their byline hidden until reassigned."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
