import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText(/Get registered/i)).toBeInTheDocument();
  });

  it('displays heading content', () => {
    renderWithProviders(<VoterRegistration />);
    expect(screen.getByText(/Check My Eligibility/i)).toBeInTheDocument();
  });

  it('contains FAQ section', () => {
    renderWithProviders(<VoterRegistration />);
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
  });
});
