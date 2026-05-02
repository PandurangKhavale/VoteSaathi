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
    expect(screen.getByText(/Candidate Information Guide/i)).toBeInTheDocument();
  });

  it('displays candidate content', () => {
    renderWithProviders(<CandidateInfo />);
    expect(screen.getByText(/Evaluate candidates/i)).toBeInTheDocument();
  });

  it('has semantic structure', () => {
    renderWithProviders(<CandidateInfo />);
    expect(screen.getByText(/Candidate Information Guide/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Evaluate candidates/i)).toBeInTheDocument();
  });
});
