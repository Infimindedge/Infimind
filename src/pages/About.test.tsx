import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

function renderAbout() {
  return render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );
}

function findAboutTitle() {
  return screen.findByRole('heading', { level: 1, name: 'Thoughtful Education. Personalised For Every Learner.' }, { timeout: 15000 });
}

describe('About page', () => {
  it('renders the route with exactly one H1 and the existing header/footer', async () => {
    renderAbout();

    expect(await findAboutTitle()).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText(/Infimind. All rights reserved./)).toBeInTheDocument();
  }, 25000);

  it('renders all four belief/approach sections from about.json', async () => {
    renderAbout();
    await findAboutTitle();

    ['Our Belief', 'Our Approach', 'Learning Science', 'Our Promise'].forEach((heading) => {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument();
    });
  }, 25000);

  it('points the CTA at the homepage Programs section', async () => {
    renderAbout();
    await findAboutTitle();

    expect(screen.getByRole('link', { name: /Explore Our Programmes/i })).toHaveAttribute('href', '/#programs');
  }, 25000);
});
