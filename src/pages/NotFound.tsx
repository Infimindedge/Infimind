import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-32 text-center">
        <p className="eyebrow text-gold">404</p>
        <h1 className="text-[clamp(32px,4vw,48px)] leading-tight text-ink">This page isn't built yet.</h1>
        <p className="max-w-md text-ink-soft">
          Infimind is launching in phases. This section is planned for a later release — for now, head back to the
          homepage.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft transition-shadow hover:shadow-hover"
        >
          Back to homepage
        </Link>
      </main>
      <Footer />
    </div>
  );
}
