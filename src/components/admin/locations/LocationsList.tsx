import { Pencil, Trash2 } from 'lucide-react';
import type { LocationItem } from '@/types/content';
import { isoToFlagEmoji } from '@/lib/flag';
import { cn } from '@/lib/utils';

interface LocationsListProps {
  locations: LocationItem[];
  onEdit: (location: LocationItem) => void;
  onDelete: (location: LocationItem) => void;
  onToggleActive: (location: LocationItem) => void;
}

export function LocationsList({ locations, onEdit, onDelete, onToggleActive }: LocationsListProps) {
  if (locations.length === 0) {
    return (
      <div className="rounded-container border border-dashed border-border-strong bg-paper-pure p-10 text-center text-sm text-ink-muted">
        No locations yet. Add one above.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-container border border-border">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-paper-soft text-xs uppercase tracking-wide text-ink-muted">
            <th className="px-4 py-3 font-medium">Flag</th>
            <th className="px-4 py-3 font-medium">City</th>
            <th className="px-4 py-3 font-medium">Country</th>
            <th className="px-4 py-3 font-medium">ISO</th>
            <th className="px-4 py-3 font-medium">Sort</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id} className="border-b border-border bg-paper-pure last:border-b-0">
              <td className="px-4 py-3 text-lg">
                {location.flagImageUrl ? (
                  <img src={location.flagImageUrl} alt="" className="h-6 w-9 rounded object-cover" />
                ) : (
                  <span aria-hidden="true">{isoToFlagEmoji(location.isoCode)}</span>
                )}
              </td>
              <td className="px-4 py-3 text-ink">{location.city}</td>
              <td className="px-4 py-3 text-ink-soft">{location.country}</td>
              <td className="px-4 py-3 text-ink-soft">{location.isoCode.toUpperCase()}</td>
              <td className="px-4 py-3 text-ink-soft">{location.sortOrder}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => onToggleActive(location)}
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-medium',
                    location.active ? 'bg-success/15 text-success' : 'bg-border-strong/40 text-ink-muted',
                  )}
                >
                  {location.active ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(location)}
                    aria-label={`Edit ${location.city}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(location)}
                    aria-label={`Delete ${location.city}`}
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
  );
}
