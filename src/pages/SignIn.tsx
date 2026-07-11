import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) });

  const onSubmit = () => setSubmitted(true);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-container border border-border bg-paper-pure p-8 shadow-soft sm:p-10">
          <h1 className="font-display text-3xl text-ink">Sign In</h1>
          <p className="mt-2 text-sm text-ink-soft">Access your Infimind family account.</p>

          <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-border-strong bg-paper-soft p-3.5 text-xs text-ink-soft">
            <Info size={16} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
            <p>
              This is a placeholder screen for Phase 1. Account sign-in will be connected in a later phase — no
              credentials are stored or verified here.
            </p>
          </div>

          {submitted ? (
            <div role="status" className="mt-6 rounded-lg border border-border bg-paper-soft p-4 text-sm text-ink">
              Sign-in isn't available yet. This form is a placeholder for a future phase of the Infimind website.
            </div>
          ) : (
            <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-btn border border-border-strong bg-paper-pure px-4 py-3 text-sm text-ink outline-none focus-visible:border-blue"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-1.5 text-xs text-error">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-btn border border-border-strong bg-paper-pure px-4 py-3 text-sm text-ink outline-none focus-visible:border-blue"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password')}
                />
                {errors.password ? (
                  <p id="password-error" className="mt-1.5 text-xs text-error">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="mt-1 min-h-[44px] rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft transition-shadow hover:shadow-hover"
              >
                Sign In
              </button>
            </form>
          )}

          <Link to="/" className="mt-6 block text-center text-sm text-ink-soft hover:text-navy">
            Back to homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
