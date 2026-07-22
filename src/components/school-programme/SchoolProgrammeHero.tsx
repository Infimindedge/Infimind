import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useConsultationModal } from '@/hooks/useConsultationModal';
import { schoolProgramme } from '@/data/schoolProgramme';
import { SchoolProgrammeImage } from './SchoolProgrammeImage';

export function SchoolProgrammeHero() {
  const { hero } = schoolProgramme;
  const { openConsultation } = useConsultationModal();
  const reduceMotion = useReducedMotion();
  return (
    <section className="school-hero" aria-labelledby="school-title">
      <Container width="max" className="school-hero__grid">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="school-hero__copy"
        >
          <p className="eyebrow text-gold">{hero.eyebrow}</p>
          <h1 id="school-title"><span>{hero.headlineLine1}</span><em>{hero.headlineAccent}</em></h1>
          <p className="school-lead">{hero.body}</p>
          <div className="school-actions">
            <a className="school-button school-button--gold" href="#programme-journey">{hero.primaryCta}<ArrowRight aria-hidden="true" /></a>
            <button className="school-button school-button--outline" type="button" onClick={openConsultation}>{hero.secondaryCta}</button>
          </div>
        </motion.div>
        <div className="school-hero__visual">
          <SchoolProgrammeImage filename="school-programme-hero.jpg" alt="Student learning in a calm study setting" priority />
        </div>
      </Container>
      <Container width="max">
        <ul className="school-proof" aria-label="Programme highlights">
          {hero.proofPoints.map((point) => <li key={point}><CheckCircle2 aria-hidden="true" />{point}</li>)}
        </ul>
      </Container>
    </section>
  );
}
