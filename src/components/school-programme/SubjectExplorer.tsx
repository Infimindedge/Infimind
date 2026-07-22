import { Check, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { programmeImages, schoolProgramme } from '@/data/schoolProgramme';
import type { ProgrammeBand, ProgrammeStageId } from '@/types/schoolProgramme';
import { SchoolProgrammeImage } from './SchoolProgrammeImage';

interface Props { band: ProgrammeBand; subject: string; onSubjectChange: (subject: string) => void; onStageChange: (stage: ProgrammeStageId) => void }

export function SubjectExplorer({ band, subject, onSubjectChange, onStageChange }: Props) {
  const reduceMotion = useReducedMotion();
  const subjects = Object.keys(band.subjects);
  const topics = band.subjects[subject] ?? band.subjects[subjects[0]];
  return (
    <section className="school-section" aria-labelledby="subject-title">
      <Container width="max">
        <div className="school-section-heading school-section-heading--row"><div><p className="eyebrow">Personalised subject support</p><h2 id="subject-title">Dynamic Subject Explorer</h2></div><label>Programme stage<select aria-label="Programme stage" value={band.id} onChange={(event) => onStageChange(event.target.value as ProgrammeStageId)}>{schoolProgramme.programmeBands.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.grades}</option>)}</select></label></div>
        <div className="school-subject-layout">
          <div className="school-subject-tabs" role="tablist" aria-label={`${band.name} subjects`}>{subjects.map((name) => <button key={name} type="button" role="tab" aria-selected={subject === name} className={subject === name ? 'is-active' : ''} onClick={() => onSubjectChange(name)}>{name}</button>)}</div>
          <AnimatePresence mode="wait">
            <motion.article key={`${band.id}-${subject}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }} className="school-subject-card">
              <header><div><p>{band.grades}</p><h3>{subject}</h3><span>{band.focus}</span></div><Sparkles aria-hidden="true" /></header>
              <div className="school-subject-columns"><div><h4>Topics Covered</h4><ul>{topics.map((topic) => <li key={topic}><Check aria-hidden="true" />{topic}</li>)}</ul></div><div><h4>How We Teach</h4><p>Guided explanation, meaningful examples, targeted practice and regular retrieval are adapted to the learner.</p><SchoolProgrammeImage filename={programmeImages[band.id]} alt={`${band.name} programme learner`} /></div><div><h4>Learning Outcomes</h4><ul>{band.outcomes.map((outcome) => <li key={outcome}><Check aria-hidden="true" />{outcome}</li>)}</ul></div></div>
            </motion.article>
          </AnimatePresence>
          <aside className="school-statement"><p className="eyebrow">Every learner is different</p><h3>Every subject.<br />Every grade.<br />Every child.</h3><p>Personalised content, pace and support for maximum growth.</p></aside>
        </div>
      </Container>
    </section>
  );
}
