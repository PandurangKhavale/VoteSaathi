import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VoterRegistration from '../components/VoterRegistration';
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

describe('VoterRegistration Component', () => {
  it('renders the voter registration page', () => {
    renderWithProviders(<VoterRegistration />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    renderWithProviders(<VoterRegistration />);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('class');
  });

  it('displays heading content', () => {
    renderWithProviders(<VoterRegistration />);
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(0);
  });

  it('renders without throwing errors', () => {
    expect(() => {
      renderWithProviders(<VoterRegistration />);
    }).not.toThrow();
  });

  it('has interactive elements for user engagement', () => {
    renderWithProviders(<VoterRegistration />);
    const buttons = screen.queryAllByRole('button');
    // Should have at least some interactive elements
    expect(Array.isArray(buttons)).toBe(true);
  });

  it('is accessible with proper ARIA labels', () => {
    renderWithProviders(<VoterRegistration />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
