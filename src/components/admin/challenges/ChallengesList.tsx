import { Pencil, Trash2 } from 'lucide-react';
import type { ChallengeItem } from '@/types/content';

interface ChallengesListProps {
  challenges: ChallengeItem[];
  onEdit: (challenge: ChallengeItem) => void;
  onDelete: (challenge: ChallengeItem) => void;
}

export function ChallengesList({ challenges, onEdit, onDelete }: ChallengesListProps) {
  if (challenges.length === 0) {
    return (
      <div className="rounded-container border border-dashed border-border-strong bg-paper-pure p-10 text-center text-sm text-ink-muted">
        No challenges yet. Add one above.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-container border border-border">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-paper-soft text-xs uppercase tracking-wide text-ink-muted">
            <th className="px-4 py-3 font-medium">Label</th>
            <th className="px-4 py-3 font-medium">Approach items</th>
            <th className="px-4 py-3 font-medium">Outcome items</th>
            <th className="px-4 py-3 font-medium">Sort</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id} className="border-b border-border bg-paper-pure last:border-b-0">
              <td className="px-4 py-3 text-ink">{challenge.label}</td>
              <td className="px-4 py-3 text-ink-soft">{challenge.approach.length}</td>
              <td className="px-4 py-3 text-ink-soft">{challenge.outcomes.length}</td>
              <td className="px-4 py-3 text-ink-soft">{challenge.sortOrder}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(challenge)}
                    aria-label={`Edit ${challenge.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-paper-soft hover:text-navy"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(challenge)}
                    aria-label={`Delete ${challenge.label}`}
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
