import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ListItem from './ListItem';

describe('ListItem component', () => {
  it('renders the restaurant image', () => {
    render(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
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

    render(<ListItem slug="test-slug" name="Test Name" address={address} thumbnail="test-thumbnail.jpg" />);

    const addressDiv = screen.getByText(/Test Street/i).closest('div');
    expect(addressDiv).toHaveTextContent('Test Street');
    expect(addressDiv).toHaveTextContent('Test City, Test State 12345');
  });

  it('does not render the address section when address is not provided', () => {
    render(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);

    // Check that address-related text is not in the document
    expect(screen.queryByText('Test Street')).not.toBeInTheDocument();
    expect(screen.queryByText(/Test City, Test State 12345/)).not.toBeInTheDocument();
  });

  it('renders the hours and price information', () => {
    render(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
    const hoursPriceDiv = screen.getByText(/\$\$\$/i).closest('div');
    expect(hoursPriceDiv).toHaveTextContent('$$$');
    expect(hoursPriceDiv).toHaveTextContent('Hours: M-F 10am-11pm');
  });

  it('indicates if the restaurant is open now', () => {
    render(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });

  it('renders the details button with correct link', () => {
    render(<ListItem slug="test-slug" name="Test Name" thumbnail="test-thumbnail.jpg" />);
    const detailsButton = screen.getByRole('link');
    expect(detailsButton).toHaveAttribute('href', '/restaurants/test-slug');
    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
