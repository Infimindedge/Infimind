import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Testimonial } from '@/types/content';
import { testimonialRepository, TESTIMONIALS_STORAGE_KEY } from '@/data/repositories/testimonialRepository';
import { useCollection } from '@/hooks/useCollection';
import { TestimonialsList } from './TestimonialsList';
import { TestimonialForm } from './TestimonialForm';
import type { TestimonialFormValues } from './testimonialSchema';
import { AdminModal } from '@/components/admin/AdminModal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

export function TestimonialsAdmin() {
  const { items: testimonials } = useCollection(testimonialRepository, TESTIMONIALS_STORAGE_KEY);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Testimonial | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(testimonial: Testimonial) {
    setEditing(testimonial);
    setFormOpen(true);
  }

  function handleSubmit(values: TestimonialFormValues) {
    if (editing) {
      testimonialRepository.update(editing.id, values);
    } else {
      testimonialRepository.create({ id: crypto.randomUUID(), ...values });
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleTogglePublished(testimonial: Testimonial) {
    testimonialRepository.update(testimonial.id, { published: !testimonial.published });
  }

  function handleConfirmDelete() {
    if (pendingDelete) testimonialRepository.remove(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Testimonials</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Only published testimonials appear in the "Voices of Our Families" carousel.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[44px] items-center gap-2 rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <div className="mt-6">
        <TestimonialsList
          testimonials={testimonials}
          onEdit={openEdit}
          onDelete={setPendingDelete}
          onTogglePublished={handleTogglePublished}
        />
      </div>

      <AdminModal
        open={formOpen}
        title={editing ? 'Edit Testimonial' : 'Add Testimonial'}
        onClose={() => setFormOpen(false)}
      >
        <TestimonialForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </AdminModal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this testimonial?"
        description="This can't be undone. The testimonial will be removed immediately."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
