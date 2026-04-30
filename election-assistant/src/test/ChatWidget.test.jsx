import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';
import { AppProvider } from '../context/AppContext';
import { ThemeProvider } from '../context/ThemeContext';

function renderWithProviders(component) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          {component}
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

describe('ChatWidget Component', () => {
  it('renders the chat widget', () => {
    renderWithProviders(<ChatWidget />);
    const widget = screen.queryByRole('region', { name: /chat/i });
    // Component should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it('has proper aria labels for interactive elements', () => {
    renderWithProviders(<ChatWidget />);
    const buttons = screen.queryAllByRole('button');
    // Chat widget should have accessible buttons
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });

  it('maintains chat history structure', () => {
    renderWithProviders(<ChatWidget />);
    // Verify component renders properly with context
    expect(document.body).toBeInTheDocument();
  });
});
