import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { learningCycle } from '@/data/schoolProgramme';
export function LearningCycle() { return <section className="school-section" aria-labelledby="cycle-title"><Container width="max"><div className="school-section-heading"><p className="eyebrow">Flexible, not fixed</p><h2 id="cycle-title">Weekly Learning Cycle</h2><p>The cycle repeats and adapts according to each learner’s needs.</p></div><div className="school-cycle">{learningCycle.map(([name, description], index) => <article key={name}><span>{index + 1}</span><h3>{name}</h3><p>{description}</p>{index < learningCycle.length - 1 ? <ArrowRight aria-hidden="true" /> : null}</article>)}</div></Container></section>; }
