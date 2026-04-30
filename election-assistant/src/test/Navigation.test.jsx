import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
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

describe('Navigation Component', () => {
  it('renders the VoteSaathi logo', () => {
    renderWithProviders(<Navigation />);
    // Logo text is split across spans, so check for containing element
    const logoLink = screen.getByRole('link', { name: /VoteSaathi - Go to home page/i });
    expect(logoLink).toBeInTheDocument();
    // Verify both parts of the logo text are present
    expect(logoLink.textContent).toContain('Vote');
    expect(logoLink.textContent).toContain('Saathi');
  });

  it('renders all navigation links', () => {
    renderWithProviders(<Navigation />);
    const links = [
      'Home',
      'Registration',
      'Timeline',
      'Candidates',
      'Voting Methods',
      'Quiz',
      'Guide',
    ];
    
    links.forEach(link => {
      // Use getAllByRole and check that at least one exists for each link
      // (Home appears twice - in logo and in nav)
      const matchingLinks = screen.getAllByRole('link', { name: new RegExp(link, 'i') });
      expect(matchingLinks.length).toBeGreaterThan(0);
    });
  });

  it('has proper navigation semantics', () => {
    renderWithProviders(<Navigation />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('home link has correct href', () => {
    renderWithProviders(<Navigation />);
    const homeLink = screen.getAllByRole('link', { name: /home/i })[0];
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
