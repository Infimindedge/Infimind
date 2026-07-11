import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { NavDropdown } from './NavDropdown';
import { MobileMenu } from './MobileMenu';
import { navItems } from './navConfig';
import { useScrolled } from '@/hooks/useScrolled';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

export function Navbar() {
  const scrolled = useScrolled(40);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-paper-pure/90 backdrop-blur-md'
          : 'border-b border-transparent bg-paper-pure',
      )}
    >
      <Container width="max">
        <div className={cn('flex items-center justify-between transition-all duration-300', scrolled ? 'py-2.5' : 'py-4')}>
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) =>
              item.dropdown ? (
                <NavDropdown
                  key={item.label}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onOpen={() => setOpenDropdown(item.label)}
                  onClose={() => setOpenDropdown((current) => (current === item.label ? null : current))}
                />
              ) : (
                <Link
                  key={item.label}
                  to={item.href ?? '#'}
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-navy"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/signin"
              className="hidden min-h-[44px] items-center justify-center rounded-btn bg-navy px-6 py-3 text-sm font-medium text-on-dark shadow-soft transition-shadow hover:shadow-hover lg:inline-flex"
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-paper-soft lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
