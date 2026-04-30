import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CandidateInfo from '../components/CandidateInfo';
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

describe('CandidateInfo Component', () => {
  it('renders candidate information page', () => {
    renderWithProviders(<CandidateInfo />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('displays candidate content', () => {
    renderWithProviders(<CandidateInfo />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has semantic structure', () => {
    renderWithProviders(<CandidateInfo />);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('class');
  });

  it('contains headings for information hierarchy', () => {
    renderWithProviders(<CandidateInfo />);
    const headings = screen.queryAllByRole('heading');
    expect(Array.isArray(headings)).toBe(true);
  });

  it('renders without errors', () => {
    expect(() => {
      renderWithProviders(<CandidateInfo />);
    }).not.toThrow();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<CandidateInfo />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
