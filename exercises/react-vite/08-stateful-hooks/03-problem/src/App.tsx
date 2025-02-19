import { Link, Outlet, useMatch } from "react-router-dom"

const App: React.FC = () => {
  const homeMatch = useMatch("/")
  const restaurantsMatch = useMatch("/restaurants")

  return (
    <>
      <header>
        <nav>
          <h1>place-my-order.com</h1>
          <ul>
            <li className={homeMatch ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={restaurantsMatch ? "active" : ""}>
              <Link to="/restaurants">Restaurants</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  )
}

export default App
