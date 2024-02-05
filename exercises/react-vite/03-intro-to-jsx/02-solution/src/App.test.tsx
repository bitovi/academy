import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App component', () => {
  it('renders the image with correct attributes', () => {
    render(<App />);
    const image = screen.getByAltText(/Restaurant table with glasses./i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('width', '250');
    expect(image).toHaveAttribute('height', '380');
  });

  it('renders the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Ordering food has never been easier/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    render(<App />);
    const description = screen.getByText(/We make it easier/i);
    expect(description).toBeInTheDocument();
  });

  it('renders a list of restaurants', () => {
    render(<App />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Cheese Curd City');
    expect(listItems[1]).toHaveTextContent('Poutine Palace');
  });
});
