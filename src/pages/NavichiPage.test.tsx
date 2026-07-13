import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

function renderNavichi() {
  return render(
    <MemoryRouter initialEntries={['/navichi']}>
      <App />
    </MemoryRouter>,
  );
}

function findNavichiTitle() {
  return screen.findByRole('heading', { level: 1, name: 'The Personalised SAT Navigator.' }, { timeout: 15000 });
}

describe('Navichi page', () => {
  it('renders the route and primary page content', async () => {
    renderNavichi();

    expect(await findNavichiTitle()).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByText('SAT Preparation, Engineered Around You.')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Navichi sections' })).toBeInTheDocument();
  }, 25000);

  it('renders section navigator links to the required ids', async () => {
    renderNavichi();
    await findNavichiTitle();

    const nav = screen.getByRole('navigation', { name: 'Navichi sections' });
    [
      ['The Navichi Method', '#navichi-method'],
      ['Learning Science', '#learning-science'],
      ['Learning Intelligence Portal', '#learning-intelligence-portal'],
      ['Student Journey', '#student-journey'],
      ['Parent Partnership', '#parent-partnership'],
      ['FAQ', '#faq'],
    ].forEach(([name, href]) => {
      expect(within(nav).getByRole('link', { name })).toHaveAttribute('href', href);
    });
  }, 25000);

  it('updates the active DEEPEN card on keyboard focus', async () => {
    renderNavichi();
    await findNavichiTitle();

    const engineerStep = screen.getByRole('button', { name: /^Engineer/i });
    fireEvent.focus(engineerStep);

    expect(engineerStep).toHaveAttribute('aria-expanded', 'true');
    expect(engineerStep).toHaveTextContent(/personalised learning blueprint/i);
  }, 25000);

  it('opens the learning science disclosure', async () => {
    renderNavichi();
    await findNavichiTitle();

    fireEvent.click(screen.getByRole('button', { name: /Explore the Science/i }));

    expect(screen.getByRole('region', { name: 'Learning science research notes' })).toBeInTheDocument();
    expect(screen.getByText(/methodology is informed by research in learning science/i)).toBeInTheDocument();
  }, 25000);

  it('opens FAQ answers accessibly', async () => {
    renderNavichi();
    await findNavichiTitle();

    const question = screen.getByRole('button', { name: /How is Navichi different/i });
    fireEvent.click(question);

    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Navichi begins with diagnosis/i)).toBeInTheDocument();
  }, 25000);

  it('uses the expected supplied Navichi assets', async () => {
    renderNavichi();
    await findNavichiTitle();

    expect(screen.getByRole('img', { name: /Student working through SAT preparation/i })).toHaveAttribute(
      'src',
      '/assets/navichi/navichi-hero.jpg',
    );
    expect(screen.getByRole('img', { name: /Navichi Learning Intelligence Portal dashboard preview/i })).toHaveAttribute(
      'src',
      '/assets/navichi/navichi-portal.png',
    );
    expect(screen.getByRole('img', { name: /Student ready to begin/i })).toHaveAttribute(
      'src',
      '/assets/navichi/navichi-cta-student.jpg',
    );
  }, 25000);
});
