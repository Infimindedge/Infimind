import { useState } from 'react';
import type { ConsultationEnquiry } from '@/types/content';
import { enquiryRepository, getEnquiriesNewestFirst, ENQUIRIES_STORAGE_KEY } from '@/data/repositories/enquiryRepository';
import { useCollection } from '@/hooks/useCollection';
import { EnquiriesList } from './EnquiriesList';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

export function EnquiriesAdmin() {
  useCollection(enquiryRepository, ENQUIRIES_STORAGE_KEY);
  const enquiries = getEnquiriesNewestFirst();
  const [pendingDelete, setPendingDelete] = useState<ConsultationEnquiry | null>(null);

  function handleToggleContacted(enquiry: ConsultationEnquiry) {
    enquiryRepository.update(enquiry.id, { contacted: !enquiry.contacted });
  }

  function handleConfirmDelete() {
    if (pendingDelete) enquiryRepository.remove(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div>
      <div>
        <h2 className="font-display text-2xl text-ink">Consultation Requests</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Submissions from the "Schedule a Private Consultation" form. Mark a family as contacted once your team has
          followed up.
        </p>
      </div>

      <div className="mt-6">
        <EnquiriesList enquiries={enquiries} onToggleContacted={handleToggleContacted} onDelete={setPendingDelete} />
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this enquiry?"
        description="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
