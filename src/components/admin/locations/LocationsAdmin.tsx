import { useState } from 'react';
import { Plus, Info } from 'lucide-react';
import type { LocationItem } from '@/types/content';
import { locationRepository, LOCATIONS_STORAGE_KEY } from '@/data/repositories/locationRepository';
import { useCollection } from '@/hooks/useCollection';
import { LocationsList } from './LocationsList';
import { LocationForm } from './LocationForm';
import type { LocationFormValues } from './locationSchema';
import { AdminModal } from '@/components/admin/AdminModal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

const DEFAULT_MAP_POSITION = { x: 50, y: 50 };

export function LocationsAdmin() {
  const { items: locations } = useCollection(locationRepository, LOCATIONS_STORAGE_KEY);
  const [editing, setEditing] = useState<LocationItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<LocationItem | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(location: LocationItem) {
    setEditing(location);
    setFormOpen(true);
  }

  function handleSubmit(values: LocationFormValues) {
    const payload = {
      ...values,
      program: values.program || undefined,
      flagImageUrl: values.flagImageUrl || undefined,
      quote: values.quote || undefined,
      attribution: values.attribution || undefined,
      storyLabel: values.storyLabel || undefined,
    };
    if (editing) {
      locationRepository.update(editing.id, payload);
    } else {
      locationRepository.create({ id: crypto.randomUUID(), mapPosition: DEFAULT_MAP_POSITION, ...payload });
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleToggleActive(location: LocationItem) {
    locationRepository.update(location.id, { active: !location.active });
  }

  function handleConfirmDelete() {
    if (pendingDelete) locationRepository.remove(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Countries & Flags</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Active locations appear immediately on the homepage map and the moving city list.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[44px] items-center gap-2 rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover"
        >
          <Plus size={16} />
          Add Location
        </button>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-border bg-paper-soft p-3.5 text-xs text-ink-soft">
        <Info size={16} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
        <p>
          New locations are placed at a default position on the world map. A dedicated map-position picker is
          planned for a later phase.
        </p>
      </div>

      <div className="mt-6">
        <LocationsList
          locations={locations}
          onEdit={openEdit}
          onDelete={setPendingDelete}
          onToggleActive={handleToggleActive}
        />
      </div>

      <AdminModal open={formOpen} title={editing ? 'Edit Location' : 'Add Location'} onClose={() => setFormOpen(false)}>
        <LocationForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </AdminModal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this location?"
        description="This can't be undone. It will be removed from the homepage map immediately."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
