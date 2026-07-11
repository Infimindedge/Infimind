import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AdminAuthGate } from './AdminAuthGate';

function renderGate() {
  return render(
    <MemoryRouter>
      <AdminAuthGate>
        <p>Secret admin content</p>
      </AdminAuthGate>
    </MemoryRouter>,
  );
}

describe('AdminAuthGate', () => {
  it('hides protected content behind a password form', () => {
    renderGate();
    expect(screen.queryByText('Secret admin content')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('rejects an incorrect password', async () => {
    const user = userEvent.setup();
    renderGate();

    await user.type(screen.getByLabelText('Password'), 'definitely-wrong');
    await user.click(screen.getByRole('button', { name: 'Enter Admin' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Incorrect password.');
    expect(screen.queryByText('Secret admin content')).not.toBeInTheDocument();
  });
});
