import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { schoolProgramme } from '@/data/schoolProgramme';
import { useConsultationModal } from '@/hooks/useConsultationModal';
export function SchoolProgrammeCta() { const { openConsultation } = useConsultationModal(); return <section className="school-final-cta" aria-labelledby="school-cta-title"><Container width="max"><div><h2 id="school-cta-title">{schoolProgramme.finalCta.headline}</h2><p>{schoolProgramme.finalCta.body}</p></div><button type="button" className="school-button school-button--gold" onClick={openConsultation}>{schoolProgramme.finalCta.button}<ArrowRight aria-hidden="true" /></button></Container></section>; }
