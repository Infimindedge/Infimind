const links = [
  ['Programme Stages', '#programme-journey'],
  ['Subject Support', '#subject-support'],
  ['Learning Science', '#learning-science'],
  ['Our Approach', '#school-approach'],
  ['Learning Team', '#learning-team'],
  ['Parent Partnership', '#parent-experience'],
  ['FAQ', '#school-faq'],
] as const;

export function SchoolProgrammeTopbar() {
  return (
    <header className="school-topbar" aria-label="School Programme page navigation">
      <a href="/" className="school-topbar__infimind" aria-label="Infimind home">
        <img src="/assets/brand/infimind-logo.jpg" alt="" />
      </a>
      <nav className="school-topbar__links" aria-label="School Programme sections">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a href="#school-title" className="school-topbar__brand">
        School Programme
      </a>
    </header>
  );
}
