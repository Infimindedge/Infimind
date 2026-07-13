import { useContext } from 'react';
import { ConsultationModalContext, type ConsultationModalContextValue } from '@/context/consultationModalContextValue';

export function useConsultationModal(): ConsultationModalContextValue {
  const ctx = useContext(ConsultationModalContext);
  if (!ctx) throw new Error('useConsultationModal must be used within a ConsultationModalProvider');
  return ctx;
}
