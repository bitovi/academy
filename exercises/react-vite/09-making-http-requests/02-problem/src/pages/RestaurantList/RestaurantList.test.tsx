import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import RestaurantList from './RestaurantList';

// Mock the hooks used in the component
vi.mock('../../services/restaurant/hooks', () => ({
  useStates: vi.fn(() => {
    return {
      data: null,
      error: null,
      isPending: false,
    }
  }),
}));

import { useStates } from '../../services/restaurant/hooks'

describe('RestaurantList component', () => {
  it('renders the Restaurants header', () => {
    render(<RestaurantList />);
    expect(screen.getByText(/Restaurants/i)).toBeInTheDocument();
  });

  it('renders state and city dropdowns', () => {
    render(<RestaurantList />)
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument()
  })

  it('renders correctly with initial states', () => {
    useStates.mockReturnValue({ data: null, isPending: true, error: null });

    render(<RestaurantList />);

    expect(screen.getByText(/Restaurants/)).toBeInTheDocument();
    expect(screen.getByText(/Loading states…/)).toBeInTheDocument();
  });

  it('displays error messages correctly', () => {
    useStates.mockReturnValue({ data: null, isPending: false, error: { message: 'Error loading states' } });

    render(<RestaurantList />);

    expect(screen.getByText(/Error loading states/)).toBeInTheDocument();
  });
});
