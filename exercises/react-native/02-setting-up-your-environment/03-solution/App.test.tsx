import {render, screen} from '@testing-library/react-native';
import App from './App';

describe('App', () => {
  it('renders', async () => {
    render(<App />);
    screen.getAllByText(/Place my order/i);
  });
});
