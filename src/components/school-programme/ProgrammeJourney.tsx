import { Container } from '@/components/ui/Container';
import { schoolProgramme } from '@/data/schoolProgramme';
import type { ProgrammeStageId } from '@/types/schoolProgramme';
import { SchoolProgrammeReveal } from './SchoolProgrammeReveal';

const stageImages: Record<ProgrammeStageId, string> = {
  discover: 'discover-programme.png',
  explorer: 'explorer-programme.png',
  pathfinder: 'pathfinder-programme.png',
  scholar: 'scholar-programme.png',
};

export function ProgrammeJourney({ active, onChange }: { active: ProgrammeStageId; onChange: (id: ProgrammeStageId) => void }) {
  return (
    <section id="programme-journey" className="school-section school-section--soft" aria-labelledby="journey-title">
      <Container width="max">
        <SchoolProgrammeReveal><div className="school-section-heading"><p className="eyebrow">Find the right stage</p><h2 id="journey-title">Your Child’s Learning Journey</h2><p>Four stages that evolve with your child.</p></div></SchoolProgrammeReveal>
        <div className="school-journey" role="tablist" aria-label="Programme stages">
          {schoolProgramme.programmeBands.map((band) => (
            <button
              key={band.id}
              type="button"
              role="tab"
              aria-label={`${band.name} ${band.grades} ${band.strapline}`}
              aria-selected={active === band.id}
              onClick={() => onChange(band.id)}
              onFocus={() => onChange(band.id)}
              className={active === band.id ? 'is-active' : ''}
            >
              <img src={`/assets/school-programme/${stageImages[band.id]}`} alt="" aria-hidden="true" />
              <span className="sr-only">{band.name}</span>
              <small className="sr-only">{band.grades}</small>
              <p className="sr-only">{band.strapline}</p>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
