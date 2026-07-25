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
      await screen.findByRole('heading', { name: /Extraordinary Thinkers/ }, { timeout: 30000 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeInTheDocument();
  }, 35000);

  it('renders the sign-in page at /signin', async () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: 'Sign In' }, { timeout: 15000 })).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue.')).toBeInTheDocument();
  }, 20000);

  it('renders the secure admin gate at /admin', async () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { name: 'Admin Access' }, { timeout: 15000 })).toBeInTheDocument();
    expect(screen.getByText(/currently unavailable/)).toBeInTheDocument();
  }, 20000);

  it('renders the 404 page for an unknown route', async () => {
    render(
      <MemoryRouter initialEntries={['/nowhere']}>
        <App />
      </MemoryRouter>,
    );
    expect(await screen.findByText("This page isn't built yet.")).toBeInTheDocument();
  });
});
