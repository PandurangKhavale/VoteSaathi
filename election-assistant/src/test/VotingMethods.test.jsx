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
    expect(screen.getByText(/Voting Methods/i)).toBeInTheDocument();
  });

  it('displays voting information', () => {
    renderWithProviders(<VotingMethods />);
    expect(screen.getByText(/options/i)).toBeInTheDocument();
  });

  it('has proper heading structure', () => {
    renderWithProviders(<VotingMethods />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });
});
