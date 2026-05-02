import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveGuide from '../components/InteractiveGuide';
import { AppProvider } from '../context/AppContext';

describe('InteractiveGuide', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithProvider = (ui) => {
    return render(<AppProvider>{ui}</AppProvider>);
  };

  it('renders initial state correctly', () => {
    renderWithProvider(<InteractiveGuide />);
    expect(screen.getByText('Interactive Voting Guide')).toBeInTheDocument();
    expect(screen.getByText('Select your situation above to get started.')).toBeInTheDocument();
  });

  it('shows checklist when a situation is selected', () => {
    renderWithProvider(<InteractiveGuide />);
    const firstTimeBtn = screen.getByText('First-time Voter');
    fireEvent.click(firstTimeBtn);
    expect(screen.getByText('Your Action Plan')).toBeInTheDocument();
    expect(screen.getByText(/Confirm you meet the eligibility requirements/)).toBeInTheDocument();
  });

  it('updates progress when items are checked', () => {
    renderWithProvider(<InteractiveGuide />);
    fireEvent.click(screen.getByText('First-time Voter'));
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(screen.getByText(/complete/)).toHaveTextContent('13% complete');
  });
});
