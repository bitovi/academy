import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Home from './Home';

describe('Home component', () => {
  it('renders the image with correct attributes', () => {
    render(<Home />);
    const image = screen.getByAltText(/Restaurant table with glasses./i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('width', '250');
    expect(image).toHaveAttribute('height', '380');
  });

  it('renders the title', () => {
    render(<Home />);
    const titleElement = screen.getByText(/Ordering food has never been easier/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    render(<Home />);
    const description = screen.getByText(/We make it easier/i);
    expect(description).toBeInTheDocument();
  });
});
