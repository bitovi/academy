import { Outlet } from 'react-router-dom'
import Home from './pages/Home/Home'
import RestaurantList from './pages/RestaurantList/RestaurantList'
import './App.css'

function App() {
  return (
    <>
      <header>
        <nav>
          <h1>place-my-order.com</h1>
        </nav>
      </header>

      <Home></Home>

      <RestaurantList></RestaurantList>
    </>
  )
}

export default App
