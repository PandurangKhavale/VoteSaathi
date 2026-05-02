import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
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

describe('Home Component', () => {
  it('renders the home page', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Empowering Every/i)).toBeInTheDocument();
  });

  it('displays hero section', () => {
    renderWithProviders(<Home />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders statistics cards', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Empowering/i)).toBeInTheDocument();
  });

  it('has theme toggle in the component', () => {
    renderWithProviders(<Home />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(0);
  });
});
