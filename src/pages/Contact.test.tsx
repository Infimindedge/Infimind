import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

vi.mock('@/services/enquiries', () => ({
  submitEnquiry: vi.fn().mockResolvedValue(undefined),
}));

function renderContact() {
  return render(
    <MemoryRouter initialEntries={['/contact']}>
      <App />
    </MemoryRouter>,
  );
}

function findContactTitle() {
  return screen.findByRole('heading', { level: 1, name: "Let's Start the Conversation" }, { timeout: 15000 });
}

describe('Contact page', () => {
  it('renders the route with exactly one H1 and the existing header/footer', async () => {
    renderContact();

    expect(await findContactTitle()).toBeInTheDocument();
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByText(/Infimind. All rights reserved./)).toBeInTheDocument();
  }, 25000);

  it('shows clickable phone and email links', async () => {
    renderContact();
    await findContactTitle();

    expect(screen.getByRole('link', { name: /\+91 9968240372/ })).toHaveAttribute('href', 'tel:+919968240372');
    expect(screen.getByRole('link', { name: /info@infimind\.co\.in/ })).toHaveAttribute('href', 'mailto:info@infimind.co.in');
  }, 25000);

  it('validates required fields and shows success after the secure service accepts the submission', async () => {
    const user = userEvent.setup();
    renderContact();
    await findContactTitle();

    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(await screen.findByText('Parent / Guardian name is required')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Parent / Guardian Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: 'Choose country' }));
    await user.click(screen.getByRole('option', { name: /United States/ }));
    await user.type(screen.getByLabelText('Country and phone number'), '5555555555');
    await user.type(screen.getByLabelText('Message'), 'We would love to learn more about your programmes.');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Thank you')).toBeInTheDocument();
  }, 25000);
});
