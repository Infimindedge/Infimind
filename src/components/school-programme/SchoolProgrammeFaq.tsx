import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { schoolProgrammeFaqs } from '@/data/schoolProgramme';
function Item({ question, answer }: { question: string; answer: string }) { const [open, setOpen] = useState(false); const id = useId(); return <article className="school-faq__item"><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><span>{question}</span><ChevronDown aria-hidden="true" /></button>{open ? <div id={id}><p>{answer}</p></div> : null}</article>; }
export function SchoolProgrammeFaq() { return <section className="school-section school-section--soft" aria-labelledby="faq-title"><Container><div className="school-section-heading"><p className="eyebrow">Questions, answered</p><h2 id="faq-title">School Programme FAQ</h2></div><div className="school-faq">{schoolProgrammeFaqs.map((faq) => <Item key={faq.question} {...faq} />)}</div></Container></section>; }
