import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  it('fails closed and never renders protected content', () => {
    renderGate();
    expect(screen.queryByText('Secret admin content')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('currently unavailable');
  });
});
