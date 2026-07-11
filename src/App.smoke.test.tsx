import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing smoke tests', () => {
  it('renders the homepage at /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole('heading', { name: /Extraordinary Thinkers/ }, { timeout: 5000 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders the sign-in placeholder at /signin', async () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText(/placeholder screen for Phase 1/)).toBeInTheDocument();
  });

  it('renders the admin password gate at /admin', async () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: 'Admin Access' })).toBeInTheDocument();
    expect(screen.getByText(/Prototype-only authentication/)).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown route', async () => {
    render(
      <MemoryRouter initialEntries={['/nowhere']}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByText("This page isn't built yet.")).toBeInTheDocument();
  });
});
