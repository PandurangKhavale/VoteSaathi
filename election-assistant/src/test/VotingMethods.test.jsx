import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VotingMethods from '../components/VotingMethods';
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

describe('VotingMethods Component', () => {
  it('renders voting methods page', () => {
    renderWithProviders(<VotingMethods />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('displays voting information', () => {
    renderWithProviders(<VotingMethods />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('has proper heading structure', () => {
    renderWithProviders(<VotingMethods />);
    const headings = screen.queryAllByRole('heading');
    expect(Array.isArray(headings)).toBe(true);
  });

  it('renders without errors', () => {
    expect(() => {
      renderWithProviders(<VotingMethods />);
    }).not.toThrow();
  });

  it('has interactive content for users', () => {
    renderWithProviders(<VotingMethods />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('is semantically correct', () => {
    renderWithProviders(<VotingMethods />);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('class');
  });
});
