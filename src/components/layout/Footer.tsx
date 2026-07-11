import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Container } from '@/components/ui/Container';

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    title: 'Programs',
    links: [
      { label: 'School Program', href: '/programs/school' },
      { label: 'SAT Program', href: '/programs/sat' },
    ],
  },
  {
    title: 'Our Philosophy',
    links: [
      { label: 'Our Approach', href: '/philosophy/approach' },
      { label: 'Our Values', href: '/philosophy/values' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/resources/blog' },
      { label: 'Guides', href: '/resources/guides' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-paper-soft">
      <Container width="max" as="div" className="section-spacing">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              A premium learning partner for ambitious students and supportive families worldwide.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow mb-4 text-ink-muted">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-ink-soft transition-colors hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-navy">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-navy">
              Terms of Service
            </Link>
          </div>
          <p>&copy; {year} Infimind. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
