import { Outlet } from "react-router-dom"
import RestaurantList from "./pages/RestaurantList"

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

      <RestaurantList />
    </>
  )
}

export default App
