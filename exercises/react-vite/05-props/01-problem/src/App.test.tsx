import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from './App';

// Mocking RestaurantList component
vi.mock('./pages/RestaurantList', () => ({
  __esModule: true,
  default: () => <div>Mocked Restaurant List</div>,
}));

describe('App Component', () => {
  // Testing if the App component renders without crashing
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Mocked Restaurant List')).toBeInTheDocument();
  });
});