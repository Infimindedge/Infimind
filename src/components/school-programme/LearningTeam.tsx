import { HeartHandshake, UserRound, UsersRound, BookOpen, HandHeart } from 'lucide-react';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { schoolProgramme } from '@/data/schoolProgramme';

const icons = [UserRound, BookOpen, UsersRound, HandHeart, HeartHandshake];
export function LearningTeam() {
  const [active, setActive] = useState(0); const item = schoolProgramme.learningTeam[active];
  return <section className="school-section" aria-labelledby="team-title"><Container width="max"><div className="school-section-heading"><p className="eyebrow">A whole team around one learner</p><h2 id="team-title">Meet Your Learning Team</h2></div><div className="school-team"><div className="school-team__roles" role="tablist" aria-label="Learning team roles">{schoolProgramme.learningTeam.map((role, index) => { const Icon = icons[index]; return <button type="button" role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} onFocus={() => setActive(index)} key={role.role}><Icon aria-hidden="true" /><span>{role.role}</span></button>; })}</div><article className="school-team__panel"><span>Student</span><h3>{item.role}</h3><p>{item.description}</p></article></div></Container></section>;
}
