import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './SignIn';

describe('SignIn', () => {
  it('always returns a generic invalid-credentials response', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText('Username or email'), 'anyone@example.com');
    await user.type(screen.getByLabelText('Password'), 'any-password');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid username or password.');
  });
});
