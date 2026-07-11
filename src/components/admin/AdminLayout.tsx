import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Container } from '@/components/ui/Container';
import { TestimonialsAdmin } from './testimonials/TestimonialsAdmin';
import { LocationsAdmin } from './locations/LocationsAdmin';
import { ChallengesAdmin } from './challenges/ChallengesAdmin';
import { EnquiriesAdmin } from './enquiries/EnquiriesAdmin';
import { cn } from '@/lib/utils';

type Tab = 'testimonials' | 'locations' | 'challenges' | 'enquiries';

const SESSION_KEY = 'infimind:admin-auth';

const TABS: { id: Tab; label: string }[] = [
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'locations', label: 'Countries & Flags' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'enquiries', label: 'Consultation Requests' },
];

export function AdminLayout() {
  const [tab, setTab] = useState<Tab>('testimonials');

  function handleLogout() {
    window.sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-paper-soft">
      <header className="border-b border-border bg-paper-pure">
        <Container width="max" className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo imgClassName="h-10 w-10" />
            <span className="hidden text-sm font-medium text-ink-muted sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-ink-soft hover:text-navy">
              View homepage
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-[44px] items-center gap-2 rounded-btn border border-border-strong px-4 py-2 text-sm font-medium text-ink hover:border-navy"
            >
              <LogOut size={15} />
              Log out
            </button>
          </div>
        </Container>
      </header>

      <Container width="max" className="py-10">
        <div className="mb-8 flex flex-wrap gap-2 border-b border-border">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id}
              className={cn(
                'min-h-[44px] border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                tab === item.id ? 'border-gold text-ink' : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'testimonials' ? <TestimonialsAdmin /> : null}
        {tab === 'locations' ? <LocationsAdmin /> : null}
        {tab === 'challenges' ? <ChallengesAdmin /> : null}
        {tab === 'enquiries' ? <EnquiriesAdmin /> : null}
      </Container>
    </div>
  );
}
