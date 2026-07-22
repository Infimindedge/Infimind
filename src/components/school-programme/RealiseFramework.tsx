import { Container } from '@/components/ui/Container';
import { schoolProgramme } from '@/data/schoolProgramme';

const explanations = [
  'Recall knowledge actively instead of relying on rereading.', 'Explain why ideas and methods work.',
  'Use knowledge in mixed and unfamiliar contexts.', 'Connect ideas through questions and meaningful visuals.',
  'Examine errors, confidence and progress.', 'Revisit learning at planned intervals.',
  'Adjust goals, strategies and support as the learner develops.',
];

export function RealiseFramework({ active, onChange }: { active: number; onChange: (value: number) => void }) {
  return <section className="school-science" aria-labelledby="science-title"><Container width="max"><div className="school-science__intro"><p className="eyebrow">Built on learning science</p><h2 id="science-title">The Science Behind Our Programme</h2><p>{schoolProgramme.science.statement}</p><h3>The {schoolProgramme.science.frameworkName} Framework</h3></div><div className="school-realise" role="tablist" aria-label="REALISE framework">{schoolProgramme.science.frameworkExpansion.map((step, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} key={step} onClick={() => onChange(index)} onFocus={() => onChange(index)}><span>{step[0]}</span><strong>{step}</strong></button>)}</div><div className="school-realise-panel" role="tabpanel"><strong>{schoolProgramme.science.frameworkExpansion[active]}</strong><p>{explanations[active]}</p></div></Container></section>;
}
