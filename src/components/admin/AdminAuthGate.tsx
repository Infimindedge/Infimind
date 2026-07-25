import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

/**
 * The static launch has no server capable of verifying administrator
 * credentials. The admin implementation remains in the codebase for later
 * development, but this gate deliberately fails closed so it cannot be opened
 * by changing browser storage or inspecting frontend JavaScript.
 */
export function AdminAuthGate({ children: _children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper-soft px-6 py-16">
      <div className="w-full max-w-sm rounded-container border border-border bg-paper-pure p-8 text-center shadow-soft">
        <ShieldCheck size={30} className="mx-auto text-gold-dark" aria-hidden="true" />
        <h1 className="mt-4 font-display text-2xl text-ink">Admin Access</h1>
        <p role="alert" className="mt-3 text-sm leading-relaxed text-ink-soft">
          This private area is currently unavailable.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm text-ink-soft hover:text-navy">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
