import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { ChallengeItem } from '@/types/content';
import { challengeRepository, getChallenges, CHALLENGES_STORAGE_KEY } from '@/data/repositories/challengeRepository';
import { useCollection } from '@/hooks/useCollection';
import { ChallengesList } from './ChallengesList';
import { ChallengeForm } from './ChallengeForm';
import type { ChallengeFormValues } from './challengeSchema';
import { AdminModal } from '@/components/admin/AdminModal';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

export function ChallengesAdmin() {
  useCollection(challengeRepository, CHALLENGES_STORAGE_KEY);
  const challenges = getChallenges();
  const [editing, setEditing] = useState<ChallengeItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<ChallengeItem | null>(null);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(challenge: ChallengeItem) {
    setEditing(challenge);
    setFormOpen(true);
  }

  function handleSubmit(values: ChallengeFormValues) {
    const payload = {
      label: values.label,
      challengeTitle: values.challengeTitle || undefined,
      challengeDescription: values.challengeDescription || undefined,
      approach: values.approach.map((item) => item.value).filter(Boolean),
      outcomes: values.outcomes.map((item) => item.value).filter(Boolean),
      challengeImageFilename: values.challengeImageFilename || undefined,
      outcomeImageFilename: values.outcomeImageFilename || undefined,
      sortOrder: values.sortOrder,
    };
    if (editing) {
      challengeRepository.update(editing.id, payload);
    } else {
      challengeRepository.create({ id: crypto.randomUUID(), ...payload });
    }
    setFormOpen(false);
    setEditing(null);
  }

  function handleConfirmDelete() {
    if (pendingDelete) challengeRepository.remove(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">Challenges</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Manage the tabs in "Every Child Has a Different Challenge." Leave title/description blank to show an
            "in progress" placeholder on that tab.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex min-h-[44px] items-center gap-2 rounded-btn bg-navy px-5 py-2.5 text-sm font-medium text-on-dark hover:shadow-hover"
        >
          <Plus size={16} />
          Add Challenge
        </button>
      </div>

      <div className="mt-6">
        <ChallengesList challenges={challenges} onEdit={openEdit} onDelete={setPendingDelete} />
      </div>

      <AdminModal open={formOpen} title={editing ? 'Edit Challenge' : 'Add Challenge'} onClose={() => setFormOpen(false)}>
        <ChallengeForm initial={editing ?? undefined} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </AdminModal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this challenge?"
        description="This can't be undone. It will be removed from the homepage tabs immediately."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
