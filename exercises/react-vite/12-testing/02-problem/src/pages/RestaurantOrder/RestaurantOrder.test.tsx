import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RestaurantOrder from './RestaurantOrder';

// Mock the hooks and components used in RestaurantOrder
vi.mock('../../services/restaurant/hooks', () => ({
  useRestaurant: vi.fn()
}));

vi.mock('../../components/FormTextField', () => ({
  default: vi.fn(({ label, onChange, type, value }) => (
    <div className="form-group">
      <label htmlFor={`form-field-${label.toLowerCase()}`}>{label}</label>
      <input
        id={`form-field-${label.toLowerCase()}`}
        data-testid={`form-field-${label.toLowerCase()}`}
        className="form-control"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
    </div>
  ))
}));

vi.mock('../../components/RestaurantHeader', () => ({
  default: vi.fn(() => (
    <div data-testid="mock-restaurant-header">
      Mock RestaurantHeader
    </div>
  ))
}));

// Mocking the global fetch function
const mockAlert = vi.fn();

global.alert = mockAlert;

beforeEach(() => {
  mockAlert.mockClear();
});

afterEach(() => {
  mockAlert.mockClear();
});

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

  it('updates form fields', async () => {
    renderWithRouter(<RestaurantOrder />);

    await userEvent.type(screen.getByTestId('form-field-name'), 'John Doe');
    expect(screen.getByTestId('form-field-name')).toHaveValue('John Doe');

    await userEvent.type(screen.getByTestId('form-field-address'), '123 Main St');
    expect(screen.getByTestId('form-field-address')).toHaveValue('123 Main St');

    await userEvent.type(screen.getByTestId('form-field-phone'), '555-1234');
    expect(screen.getByTestId('form-field-phone')).toHaveValue('555-1234');
  });

  it('handles form submission', async () => {
    const submitSpy = vi.fn();
    renderWithRouter(<RestaurantOrder />);

    const submitButton = screen.getByRole('button', { name: /Place My Order!/i });
    const form = submitButton.closest('form');
    expect(form).toBeInTheDocument(); // Ensure the form is found

    if (form) {
      form.onsubmit = submitSpy;
    }

    await userEvent.click(submitButton);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
