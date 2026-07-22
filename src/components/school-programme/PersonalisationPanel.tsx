import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { schoolProgrammeGuardrails } from '@/data/schoolProgramme';
export function PersonalisationPanel() { const panel = schoolProgrammeGuardrails.replacementForBlueSalesBox; return <section className="school-personalisation" aria-labelledby="personalisation-title"><Container width="max"><div><p className="eyebrow">Personal by design</p><h2 id="personalisation-title">{panel.title}</h2><p>{panel.body}</p><ul>{panel.items.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></div></Container></section>; }
