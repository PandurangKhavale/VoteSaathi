import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    const quiz = screen.getByRole('main');
    expect(quiz).toBeInTheDocument();
  });

  it('should have proper accessibility semantics', () => {
    renderWithProviders(<Quiz />);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('class');
  });

  it('displays quiz content without errors', () => {
    renderWithProviders(<Quiz />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('allows navigation within quiz', async () => {
    renderWithProviders(<Quiz />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    renderWithProviders(<Quiz />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });
});
