import { useCallback, useState, type ReactNode } from 'react';
import { ConsultationModal } from '@/components/consultation/ConsultationModal';
import { ConsultationModalContext } from './consultationModalContextValue';

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openConsultation = useCallback(() => setOpen(true), []);
  const closeConsultation = useCallback(() => setOpen(false), []);

  return (
    <ConsultationModalContext.Provider value={{ openConsultation }}>
      {children}
      <ConsultationModal open={open} onClose={closeConsultation} />
    </ConsultationModalContext.Provider>
  );
}
