import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Challenges } from './Challenges';
import { challengeRepository } from '@/data/repositories/challengeRepository';

describe('Challenges tabs', () => {
  it('renders all six challenge tabs with correct ARIA roles', () => {
    render(<Challenges />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(6);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('shows the supplied Weak Fundamentals content by default', () => {
    render(<Challenges />);
    expect(
      screen.getByText(/The student memorises but doesn't truly understand concepts/),
    ).toBeInTheDocument();
    expect(screen.getByText('Personal Learning Plan')).toBeInTheDocument();
    expect(screen.getByText('Stronger conceptual clarity')).toBeInTheDocument();
  });

  it('switches panels on click and marks the new tab selected, showing that tab\'s real content', async () => {
    const user = userEvent.setup();
    render(<Challenges />);

    await user.click(screen.getByRole('tab', { name: 'Study Discipline' }));

    expect(screen.getByRole('tab', { name: 'Study Discipline' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Weak Fundamentals' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText(/struggle to build consistent study habits/)).toBeInTheDocument();
    expect(screen.getByText('Personalised Study Planner')).toBeInTheDocument();
  });

  it('shows a draft placeholder — never invented copy — for a challenge with no content', async () => {
    // All six seeded challenges now have real content; exercise the empty
    // state directly, the same way a freshly admin-added challenge would.
    challengeRepository.create({
      id: 'test-empty-challenge',
      label: 'Test Empty Challenge',
      approach: [],
      outcomes: [],
      sortOrder: 999,
    });

    const user = userEvent.setup();
    render(<Challenges />);

    await user.click(screen.getByRole('tab', { name: 'Test Empty Challenge' }));

    expect(screen.getByText(/Content for this challenge is in progress/)).toBeInTheDocument();
  });

  it('supports arrow-key navigation between tabs', async () => {
    const user = userEvent.setup();
    render(<Challenges />);

    screen.getByRole('tab', { name: 'Weak Fundamentals' }).focus();
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('tab', { name: 'Study Discipline' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Study Discipline' })).toHaveFocus();
  });
});
