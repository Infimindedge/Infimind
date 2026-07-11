import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const SESSION_KEY = 'infimind:admin-auth';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!ADMIN_PASSWORD) {
      setError('VITE_ADMIN_PASSWORD is not configured. Set it in your .env file to enable admin access.');
      return;
    }
    if (password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      setError(null);
    } else {
      setError('Incorrect password.');
    }
  }

  if (authenticated) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper-soft px-6 py-16">
      <div className="w-full max-w-sm rounded-container border border-border bg-paper-pure p-8 shadow-soft">
        <h1 className="font-display text-2xl text-ink">Admin Access</h1>
        <p className="mt-1 text-sm text-ink-soft">Private area — Infimind team only.</p>

        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-warning/40 bg-[color-mix(in_srgb,var(--warning)_10%,white)] p-3.5 text-xs text-ink-soft">
          <ShieldAlert size={16} className="mt-0.5 shrink-0 text-warning" aria-hidden="true" />
          <p>
            <strong>Prototype-only authentication.</strong> This password gate is for local/demo use and is not
            production-secure. Replace with real authentication before launch.
          </p>
        </div>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              className="w-full rounded-btn border border-border-strong bg-paper-pure px-4 py-3 text-sm text-ink outline-none focus-visible:border-blue"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'admin-password-error' : undefined}
            />
          </div>
          {error ? (
            <p id="admin-password-error" role="alert" className="text-xs text-error">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="min-h-[44px] rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft hover:shadow-hover"
          >
            Enter Admin
          </button>
        </form>

        <Link to="/" className="mt-6 block text-center text-sm text-ink-soft hover:text-navy">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
