import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RestaurantList from './RestaurantList';

describe('RestaurantList component', () => {
  it('renders the Restaurants header', () => {
    render(<RestaurantList />);
    expect(screen.getByText(/Restaurants/i)).toBeInTheDocument();
  });

  it('renders the restaurant images', () => {
    render(<RestaurantList />);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('2-thumbnail.jpg'));
    expect(images[0]).toHaveAttribute('width', '100');
    expect(images[0]).toHaveAttribute('height', '100');
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('4-thumbnail.jpg'));
    expect(images[1]).toHaveAttribute('width', '100');
    expect(images[1]).toHaveAttribute('height', '100');
  });

  it('renders the addresses', () => {
    render(<RestaurantList />);
    const addressDivs = screen.getAllByText(/Washburne Ave|Kinzie Street/i);
    expect(addressDivs[0]).toHaveTextContent('2451 W Washburne Ave');
    expect(addressDivs[0]).toHaveTextContent('Green Bay, WI 53295');
    expect(addressDivs[1]).toHaveTextContent('230 W Kinzie Street');
    expect(addressDivs[1]).toHaveTextContent('Green Bay, WI 53205');
  });

  it('renders the hours and price information for each restaurant', () => {
    render(<RestaurantList />);
    const hoursPriceDivs = screen.getAllByText(/\$\$\$/i);
    hoursPriceDivs.forEach(div => {
      expect(div).toHaveTextContent('$$$');
      expect(div).toHaveTextContent('Hours: M-F 10am-11pm');
    });
  });

  it('indicates if the restaurant is open now for each restaurant', () => {
    render(<RestaurantList />);
    const openNowTags = screen.getAllByText('Open Now');
    expect(openNowTags.length).toBeGreaterThan(0);
  });

  it('renders the details buttons with correct links for each restaurant', () => {
    render(<RestaurantList />);
    const detailsButtons = screen.getAllByRole('link');
    expect(detailsButtons[0]).toHaveAttribute('href', '/restaurants/cheese-curd-city');
    expect(detailsButtons[1]).toHaveAttribute('href', '/restaurants/poutine-palace');
    detailsButtons.forEach(button => {
      expect(button).toHaveTextContent('Details');
    });
  });
});
