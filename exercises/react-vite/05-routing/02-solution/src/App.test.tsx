import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import App from './App';

vi.mock('react-router-dom', () => {
  const originalModule = vi.importActual('react-router-dom');
  return {
    ...originalModule,
    NavLink: vi.fn(),
    Outlet: vi.fn(),
    useMatch: vi.fn(),
  };
});

describe('App component', () => {
  it('renders', () => {
    render(<App />);
  });
});
