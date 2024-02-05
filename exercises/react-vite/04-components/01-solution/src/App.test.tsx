import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from './App';

describe('App component', () => {
  it('renders', () => {
    render(<App />);
  });
});
