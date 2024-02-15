import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App component', () => {
  it('renders the Restaurants header', () => {
    render(<App />);
    expect(screen.getByText(/Restaurants/i)).toBeInTheDocument();
  });

  it('renders the restaurant image', () => {
    render(<App />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/node_modules/place-my-order-assets/images/4-thumbnail.jpg');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '100');
  });

  it('renders the address', () => {
    render(<App />);
    const addressDiv = screen.getByText(/230 W Kinzie Street/i).closest('div');
    expect(addressDiv).toHaveTextContent('230 W Kinzie Street');
    expect(addressDiv).toHaveTextContent('Green Bay, WI 53205');
  });

  it('renders the hours and price information', () => {
    render(<App />);
    const hoursPriceDiv = screen.getByText(/\$\$\$/i).closest('div');
    expect(hoursPriceDiv).toHaveTextContent('$$$');
    expect(hoursPriceDiv).toHaveTextContent('Hours: M-F 10am-11pm');
  });

  it('indicates if the restaurant is open now', () => {
    render(<App />);
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });

  it('renders the details button with correct link', () => {
    render(<App />);
    const detailsButton = screen.getByRole('link');
    expect(detailsButton).toHaveAttribute('href', '/restaurants/poutine-palace');
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
