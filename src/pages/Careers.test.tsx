import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

function renderCareers() {
  return render(
    <MemoryRouter initialEntries={['/careers']}>
      <App />
    </MemoryRouter>,
  );
}

function findCareersTitle() {
  return screen.findByRole('heading', { level: 1, name: 'Help Shape the Future of Education' }, { timeout: 15000 });
}

describe('Careers page', () => {
  it('renders the route with exactly one H1 and the existing header/footer', async () => {
    renderCareers();

    expect(await findCareersTitle()).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText(/Infimind. All rights reserved./)).toBeInTheDocument();
  }, 25000);

  it('shows the no-open-positions status and a mailto CTA, with no fabricated job listings', async () => {
    renderCareers();
    await findCareersTitle();

    expect(screen.getByText('There are currently no open positions.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Email Us Your Introduction/i })).toHaveAttribute(
      'href',
      'mailto:info@infimind.co.in',
    );
  }, 25000);
});
