import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useConsultationModal } from '@/hooks/useConsultationModal';
import { schoolProgramme } from '@/data/schoolProgramme';
import { SchoolProgrammeImage } from './SchoolProgrammeImage';

export function SchoolProgrammeHero() {
  const { hero } = schoolProgramme;
  const { openConsultation } = useConsultationModal();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 22 });
  const imageX = useTransform(springX, [-1, 1], [-8, 8]);
  const imageY = useTransform(springY, [-1, 1], [-5, 5]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== 'mouse' || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={heroRef}
      className="school-hero"
      aria-labelledby="school-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="school-hero__background"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: imageX, y: imageY }}
        aria-hidden="true"
      >
        <SchoolProgrammeImage
          filename="ChatGPT Image Jul 23, 2026, 04_47_00 AM.png"
          alt=""
          priority
        />
      </motion.div>
      <div className="school-hero__wash" aria-hidden="true" />
      <Container width="max" className="school-hero__inner">
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
        <ul className="school-proof" aria-label="Programme highlights">
          {hero.proofPoints.map((point) => <li key={point}><CheckCircle2 aria-hidden="true" />{point}</li>)}
        </ul>
      </Container>
    </section>
  );
}
