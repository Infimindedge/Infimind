import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Challenges } from './Challenges';

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

  it('switches panels on click and marks the new tab selected', async () => {
    const user = userEvent.setup();
    render(<Challenges />);

    await user.click(screen.getByRole('tab', { name: 'Study Discipline' }));

    expect(screen.getByRole('tab', { name: 'Study Discipline' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Weak Fundamentals' })).toHaveAttribute('aria-selected', 'false');
  });

  it('shows a draft placeholder — never invented copy — for empty challenges', async () => {
    const user = userEvent.setup();
    render(<Challenges />);

    await user.click(screen.getByRole('tab', { name: 'Exam Anxiety' }));

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
