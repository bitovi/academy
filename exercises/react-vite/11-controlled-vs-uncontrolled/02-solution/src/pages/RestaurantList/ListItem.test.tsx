import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import ListItem from './ListItem';

// Wrap component with MemoryRouter to mock routing
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: MemoryRouter });
};

describe('ListItem component', () => {
  it('renders the restaurant image', () => {
    renderWithRouter(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test-thumbnail.jpg');
    expect(img).toHaveAttribute('width', '100');
    expect(img).toHaveAttribute('height', '100');
  });

  it('renders the address', () => {
    const address = {
      city: 'Test City',
      state: 'Test State',
      street: 'Test Street',
      zip: '12345',
    };

    renderWithRouter(<ListItem slug="test-slug" name="Test Name" address={address} thumbnail="test-thumbnail.jpg" />);

    const addressDiv = screen.getByText(/Test Street/i).closest('div');
    expect(addressDiv).toHaveTextContent('Test Street');
    expect(addressDiv).toHaveTextContent('Test City, Test State 12345');
  });

  it('does not render the address section when address is not provided', () => {
    renderWithRouter(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);

    // Check that address-related text is not in the document
    expect(screen.queryByText('Test Street')).not.toBeInTheDocument();
    expect(screen.queryByText(/Test City, Test State 12345/)).not.toBeInTheDocument();
  });

  it('renders the hours and price information', () => {
    renderWithRouter(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
    const hoursPriceDiv = screen.getByText(/\$\$\$/i).closest('div');
    expect(hoursPriceDiv).toHaveTextContent('$$$');
    expect(hoursPriceDiv).toHaveTextContent('Hours: M-F 10am-11pm');
  });

  it('indicates if the restaurant is open now', () => {
    renderWithRouter(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });

  it('renders the details button with correct link', () => {
    renderWithRouter(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
    const detailsButton = screen.getByRole('link');
    expect(detailsButton).toHaveAttribute('href', '/restaurants/test-slug');
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
