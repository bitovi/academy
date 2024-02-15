import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import RestaurantOrder from './RestaurantOrder';

// Mock the hooks and components used in RestaurantOrder
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
    menu: {
      lunch: [
        { name: 'Lunch Item 1', price: 10 },
        { name: 'Lunch Item 2', price: 15 }
      ],
      dinner: [
        { name: 'Dinner Item 1', price: 20 },
        { name: 'Dinner Item 2', price: 25 }
      ]
    },
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

describe('RestaurantOrder component', () => {
  it('renders loading state', () => {
    useRestaurant.mockReturnValue({ data: null, isPending: true, error: null });
    renderWithRouter(<RestaurantOrder />);
    expect(screen.getByText(/Loading restaurant…/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    useRestaurant.mockReturnValue({ data: null, isPending: false, error: { message: 'Error loading' } });
    renderWithRouter(<RestaurantOrder />);
    expect(screen.getByText(/Error loading restaurant/i)).toBeInTheDocument();
  });

  it('renders no restaurant found state', () => {
    useRestaurant.mockReturnValue({ data: null, isPending: false, error: null });
    renderWithRouter(<RestaurantOrder />);
    expect(screen.getByText(/No restaurant found/i)).toBeInTheDocument();
  });

  it('renders the RestaurantHeader when data is available', () => {
    useRestaurant.mockReturnValue(mockRestaurantData);
    renderWithRouter(<RestaurantOrder />);

    expect(screen.getByTestId('mock-restaurant-header')).toBeInTheDocument();
  });

  it('renders the order form when restaurant data is available', () => {
    useRestaurant.mockReturnValue(mockRestaurantData);
    render(<RestaurantOrder />);

    expect(screen.getByTestId('mock-restaurant-header')).toBeInTheDocument();
    expect(screen.getByText('Order from Test Restaurant!')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox').length).toBe(4); // 2 lunch + 2 dinner items
  });

  it('updates subtotal when menu items are selected', async () => {
    useRestaurant.mockReturnValue(mockRestaurantData);
    render(<RestaurantOrder />);

    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]); // Select 'Lunch Item 1' (price: 10)

    expect(screen.getByText('Total: $10.00')).toBeInTheDocument();

    await userEvent.click(checkboxes[2]); // Select 'Dinner Item 1' (price: 20)

    expect(screen.getByText('Total: $30.00')).toBeInTheDocument();
  });
});
