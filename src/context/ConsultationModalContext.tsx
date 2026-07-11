import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { ConsultationModal } from '@/components/consultation/ConsultationModal';

interface ConsultationModalContextValue {
  openConsultation: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextValue | null>(null);

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

export function useConsultationModal(): ConsultationModalContextValue {
  const ctx = useContext(ConsultationModalContext);
  if (!ctx) throw new Error('useConsultationModal must be used within a ConsultationModalProvider');
  return ctx;
}
