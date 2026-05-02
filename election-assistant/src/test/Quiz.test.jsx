import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Quiz from '../components/Quiz';
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

describe('Quiz Component', () => {
  it('renders the quiz container', () => {
    renderWithProviders(<Quiz />);
    expect(screen.getByText(/Election Knowledge Quiz/i)).toBeInTheDocument();
  });

  it('displays quiz content without errors', () => {
    renderWithProviders(<Quiz />);
    expect(screen.getByText(/Question/i)).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    renderWithProviders(<Quiz />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Quiz/i);
  });
});
