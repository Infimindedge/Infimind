import { Logo } from '@/components/layout/Logo';
import { Container } from '@/components/ui/Container';

const links = [
  ['Learning Journey', '#programme-journey'],
  ['Subject Support', '#subject-support'],
  ['Learning Science', '#learning-science'],
  ['Our Approach', '#school-approach'],
  ['Learning Team', '#learning-team'],
  ['Parent Partnership', '#parent-experience'],
  ['FAQ', '#school-faq'],
] as const;

export function SchoolProgrammeSectionNav() {
  return (
    <div className="school-section-nav">
      <Container width="max" className="school-section-nav__inner">
        <div className="school-section-nav__brand">
          <Logo />
        </div>
        <nav aria-label="School Programme sections">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
