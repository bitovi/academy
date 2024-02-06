import { NavLink, Outlet, useMatch } from 'react-router-dom';
import './App.css';

function App() {
  const homeMatch = useMatch('/');
  const restaurantsMatch = useMatch('/restaurants');

  return (
    <>
      <header>
        <nav>
          <h1>place-my-order.com</h1>
          <ul>
            <li className={homeMatch ? 'active' : ''}>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li className={restaurantsMatch ? 'active' : ''}>
              <NavLink to='/restaurants'>Restaurants</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default App;
