import { NavLink, Outlet, useMatch } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      <header>
        <nav>
          <h1>place-my-order.com</h1>
        </nav>
      </header>

      <Outlet />
    </>
  )
}

export default App
