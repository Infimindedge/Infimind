import { Brain, ClipboardList, BookOpenCheck, Target, RefreshCcw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { schoolProgramme } from '@/data/schoolProgramme';

const icons = [Brain, ClipboardList, BookOpenCheck, Target, RefreshCcw];
export function SchoolProgrammeApproach() {
  return <section className="school-approach" aria-labelledby="approach-title"><Container width="max"><div className="school-section-heading school-section-heading--light"><p className="eyebrow">A responsive learning system</p><h2 id="approach-title">Our Approach</h2></div><div className="school-process">{schoolProgramme.approach.map((item, index) => { const Icon = icons[index]; return <article key={item.name}><span><Icon aria-hidden="true" /></span><h3>{item.name}</h3><p>{item.description}</p></article>; })}</div></Container></section>;
}
