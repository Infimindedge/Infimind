import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const signInSchema = z.object({
  username: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  usePageMetadata({
    title: 'Sign In | Infimind',
    description: 'Sign in to access your administrative dashboard.',
    noindex: true,
  });

  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) });

  async function onSubmit() {
    setAuthError(null);
    // The static launch has no authentication service. Always return the same
    // response and timing so the page cannot reveal whether an account exists.
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    setAuthError('Invalid username or password.');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-container border border-border bg-paper-pure p-8 shadow-soft sm:p-10">
          <h1 className="font-display text-3xl text-ink">Sign In</h1>
          <p className="mt-2 text-sm text-ink-soft">Sign in to continue.</p>

          <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-ink">
                Username or email
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="w-full rounded-btn border border-border-strong bg-paper-pure px-4 py-3 text-sm text-ink outline-none focus-visible:border-blue"
                aria-invalid={Boolean(errors.username)}
                {...register('username')}
              />
              {errors.username ? <p className="mt-1.5 text-xs text-error">{errors.username.message}</p> : null}
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
                {...register('password')}
              />
              {errors.password ? <p className="mt-1.5 text-xs text-error">{errors.password.message}</p> : null}
            </div>

            {authError ? <p role="alert" className="text-sm text-error">{authError}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 min-h-[44px] rounded-btn bg-navy px-6 py-3.5 text-sm font-medium text-on-dark shadow-soft disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <Link to="/" className="mt-6 block text-center text-sm text-ink-soft hover:text-navy">
            Back to homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
