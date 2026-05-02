import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatMessage from '../components/ChatMessage';

describe('ChatMessage', () => {
  it('renders user message correctly', () => {
    const msg = { id: 1, sender: 'user', text: 'Hello' };
    render(<ChatMessage message={msg} theme="light" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveAttribute('aria-label', expect.stringContaining('Your message'));
  });

  it('renders bot message with markdown', () => {
    const msg = { id: 2, sender: 'bot', text: 'This is **bold** and a list:\n- item 1' };
    render(<ChatMessage message={msg} theme="dark" />);
    expect(screen.getByText(/This is/)).toBeInTheDocument();
    expect(screen.getByText(/bold/)).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveTextContent('item 1');
    expect(screen.getByLabelText('VoteSaathi bot avatar')).toBeInTheDocument();
  });

  it('renders numbered lists correctly', () => {
    const msg = { id: 3, sender: 'bot', text: '1. First item' };
    render(<ChatMessage message={msg} theme="light" />);
    expect(screen.getByRole('listitem')).toHaveTextContent('First item');
  });
});
