import { createContext } from 'react';

export interface ConsultationModalContextValue {
  openConsultation: () => void;
}

export const ConsultationModalContext = createContext<ConsultationModalContextValue | null>(null);
