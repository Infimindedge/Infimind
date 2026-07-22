import { BookOpen, Compass, Rocket, Sprout } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { schoolProgramme } from '@/data/schoolProgramme';
import type { ProgrammeStageId } from '@/types/schoolProgramme';
import { SchoolProgrammeReveal } from './SchoolProgrammeReveal';

const icons = [Sprout, BookOpen, Rocket, Compass];

export function ProgrammeJourney({ active, onChange }: { active: ProgrammeStageId; onChange: (id: ProgrammeStageId) => void }) {
  return (
    <section id="programme-journey" className="school-section school-section--soft" aria-labelledby="journey-title">
      <Container width="max">
        <SchoolProgrammeReveal><div className="school-section-heading"><p className="eyebrow">Find the right stage</p><h2 id="journey-title">Your Child’s Learning Journey</h2><p>Four stages that evolve with your child.</p></div></SchoolProgrammeReveal>
        <div className="school-journey" role="tablist" aria-label="Programme stages">
          {schoolProgramme.programmeBands.map((band, index) => {
            const Icon = icons[index];
            return <button key={band.id} type="button" role="tab" aria-selected={active === band.id} onClick={() => onChange(band.id)} onFocus={() => onChange(band.id)} className={active === band.id ? 'is-active' : ''}><Icon aria-hidden="true" /><span>{band.name}</span><small>{band.grades}</small><p>{band.strapline}</p></button>;
          })}
        </div>
      </Container>
    </section>
  );
}
