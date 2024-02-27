import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import RestaurantDetails from './RestaurantDetails';

// Mock the hooks and components used in RestaurantDetails
vi.mock('../../services/restaurant/hooks', () => ({
  useRestaurant: vi.fn()
}));

vi.mock('../../components/RestaurantHeader', () => ({
    default: vi.fn(() => (
      <div data-testid="mock-restaurant-header">
        Mock RestaurantHeader
      </div>
    ))
  }));
  
import { useRestaurant } from '../../services/restaurant/hooks';

const mockRestaurantData = {
  data: {
    _id: '1',
    name: 'Test Restaurant',
    slug: 'test-restaurant',
    images: { owner: 'owner.jpg' },
  },
  isPending: false,
  error: null
};

const renderWithRouter = (ui, { route = '/restaurants/test-restaurant' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(
    ui,
    { wrapper: ({ children }) => <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter> }
  );
};

describe('RestaurantDetails component', () => {
  it('renders loading state', () => {
    useRestaurant.mockReturnValue({ data: null, isPending: true, error: null });
    renderWithRouter(<RestaurantDetails />);
    expect(screen.getByText(/Loading restaurant…/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useRestaurant.mockReturnValue({ data: null, isPending: false, error: { message: 'Error loading' } });
    renderWithRouter(<RestaurantDetails />);
    expect(screen.getByText(/Error loading restaurant/i)).toBeInTheDocument();
  });

  it('renders no restaurant found state', () => {
    useRestaurant.mockReturnValue({ data: null, isPending: false, error: null });
    renderWithRouter(<RestaurantDetails />);
    expect(screen.getByText(/No restaurant found/i)).toBeInTheDocument();
  });

  it('renders the RestaurantHeader and content when data is available', () => {
    useRestaurant.mockReturnValue(mockRestaurantData);
    renderWithRouter(<RestaurantDetails />);

    expect(screen.getByTestId('mock-restaurant-header')).toBeInTheDocument();
    expect(screen.getByText(/The best food this side of the Mississippi/i)).toBeInTheDocument();
    expect(screen.getByText(/Description for Test Restaurant/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Order from Test Restaurant/i })).toBeInTheDocument();
  });
});
