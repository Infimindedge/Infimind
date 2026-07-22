import { ChevronDown, LibraryBig } from 'lucide-react';
import { useId, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { schoolProgramme } from '@/data/schoolProgramme';

function CurriculumCard({ item }: { item: (typeof schoolProgramme.curricula)[number] }) {
  const [open, setOpen] = useState(false); const id = useId();
  return <article className="school-curriculum-card"><button type="button" aria-label={`${item.short} — ${item.name}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><span><LibraryBig aria-hidden="true" /><strong>{item.short}</strong><small>{item.name}</small></span><ChevronDown aria-hidden="true" /></button>{open ? <div id={id}><p>{item.coverage.join(' · ')}</p><p>{item.note}</p></div> : null}</article>;
}

export function CurriculumSupport() {
  return <section className="school-section school-section--soft" aria-labelledby="curriculum-title"><Container width="max"><div className="school-section-heading"><p className="eyebrow">Curriculum-aligned support</p><h2 id="curriculum-title">International and National Curriculum Support</h2><p>Support is adapted to the student’s school curriculum, subject requirements, goals and pace.</p></div><div className="school-curricula">{schoolProgramme.curricula.map((item) => <CurriculumCard key={item.name} item={item} />)}</div></Container></section>;
}
