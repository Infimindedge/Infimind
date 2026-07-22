import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

function renderPhilosophy() {
  return render(
    <MemoryRouter initialEntries={['/philosophy']}>
      <App />
    </MemoryRouter>,
  );
}

function findPhilosophyTitle() {
  return screen.findByRole('heading', { level: 1, name: 'Every Child Learns Differently.' }, { timeout: 15000 });
}

describe('Philosophy page', () => {
  it('renders the route with exactly one H1 and the existing header/footer', async () => {
    renderPhilosophy();

    expect(await findPhilosophyTitle()).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText(/Infimind. All rights reserved./)).toBeInTheDocument();
  }, 25000);

  it('renders all five learning philosophy timeline steps', async () => {
    renderPhilosophy();
    await findPhilosophyTitle();

    ['Understand', 'Personalise', 'Support', 'Refine', 'Flourish'].forEach((title) => {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
    });
  }, 25000);

  it('points the final CTA at the homepage Programs section', async () => {
    renderPhilosophy();
    await findPhilosophyTitle();

    expect(screen.getByRole('link', { name: /Explore Our Programmes/i })).toHaveAttribute('href', '/#programs');
  }, 25000);

  it('shows a dev placeholder when the expected photo fails to load', async () => {
    renderPhilosophy();
    await findPhilosophyTitle();

    const heroImg = screen.getByRole('img', { name: /student studying at a desk/i });
    fireEvent.error(heroImg);

    expect(await screen.findByText('philosophy-hero.jpg')).toBeInTheDocument();
  }, 25000);
});
