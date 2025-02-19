import { Link, Outlet, useMatch } from "react-router-dom"

const App: React.FC = () => {
  return (
    <>
      <header>
        <nav>
          <h1>place-my-order.com</h1>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/restaurants">Restaurants</a>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  )
}

export default App
