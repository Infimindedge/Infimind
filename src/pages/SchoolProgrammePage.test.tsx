import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

function renderPage(entry = '/programs/school') {
  return render(<MemoryRouter initialEntries={[entry]}><App /></MemoryRouter>);
}

async function ready() {
  return screen.findByRole('heading', { level: 1, name: /A School Programme Built Around One Child\. Yours\./i }, { timeout: 15000 });
}

describe('School Programme page', () => {
  it('renders the route with one H1 and the unchanged header and footer', async () => {
    renderPage(); await ready();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText(/Infimind. All rights reserved./)).toBeInTheDocument();
  }, 25000);

  it('switches programme stage and persists valid query state', async () => {
    const user = userEvent.setup(); renderPage('/programs/school?stage=explorer&subject=Mathematics'); await ready();
    expect(screen.getByRole('tab', { name: /Explorer Grades 4–6/i })).toHaveAttribute('aria-selected', 'true');
    await user.click(screen.getByRole('tab', { name: /Scholar Grades 10–12/i }));
    expect(screen.getByRole('heading', { level: 3, name: 'Mathematics' })).toBeInTheDocument();
    expect(await screen.findByText('Advanced algebra')).toBeInTheDocument();
  }, 25000);

  it('changes subjects without leaving the page', async () => {
    const user = userEvent.setup(); renderPage(); await ready();
    await user.click(screen.getByRole('tab', { name: 'English' }));
    expect(await screen.findByText('Phonics and reading fluency')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'English' })).toHaveAttribute('aria-selected', 'true');
  }, 25000);

  it('expands curriculum and FAQ disclosures accessibly', async () => {
    const user = userEvent.setup(); renderPage(); await ready();
    const ibButton = screen.getByRole('button', { name: /IB.*International Baccalaureate/i });
    expect(ibButton).toHaveAttribute('aria-expanded', 'false'); await user.click(ibButton);
    expect(ibButton).toHaveAttribute('aria-expanded', 'true'); expect(screen.getByText(/Selected DP subject support/)).toBeInTheDocument();
    const faq = screen.getByRole('button', { name: 'Which grades does the School Programme support?' }); await user.click(faq);
    expect(faq).toHaveAttribute('aria-expanded', 'true'); expect(screen.getByText(/supports learners from Grades 1–12/)).toBeInTheDocument();
  }, 25000);

  it('makes REALISE keyboard-focusable and renders all twelve principles', async () => {
    renderPage(); await ready();
    const apply = screen.getByRole('tab', { name: 'A Apply' }); fireEvent.focus(apply);
    expect(apply).toHaveAttribute('aria-selected', 'true');
    const principleTabs = screen.getAllByRole('tab').filter((tab) => /^\d+\./.test(tab.textContent ?? ''));
    expect(principleTabs).toHaveLength(12); expect(screen.getByText('12. Mastery-Oriented Goals')).toBeInTheDocument();
  }, 25000);

  it('renders the non-statistical personalisation panel and no banned sales claims', async () => {
    renderPage(); await ready();
    const panel = screen.getByRole('heading', { name: 'Designed Around Your Child' }).closest('section')!;
    expect(within(panel).getByText(/No fixed batch/)).toBeInTheDocument();
    ['Individual subject plan', 'Flexible pace', 'Targeted practice', 'Continuous review'].forEach((point) => expect(within(panel).getByText(point)).toBeInTheDocument());
    expect(screen.queryByText(/10,000\+|95% parent satisfaction|500\+ placements|world's best tutors/i)).not.toBeInTheDocument();
  }, 25000);

  it('provides a mobile comparison representation and qualitative dashboard states', async () => {
    renderPage(); await ready();
    expect(screen.getByLabelText('Compare programme')).toBeInTheDocument();
    expect(screen.getByLabelText('Illustrative dashboard preview')).toBeInTheDocument();
    expect(screen.getAllByText('Review Due').length).toBeGreaterThan(0);
  }, 25000);

  it('uses a stable development placeholder when a supplied asset is missing', async () => {
    renderPage(); await ready();
    const programmeImage = screen.getByRole('img', { name: 'Discover programme learner' }); fireEvent.error(programmeImage);
    expect(await screen.findByText('discover.jpg')).toBeInTheDocument();
  }, 25000);
});
