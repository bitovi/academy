import './App.css'

function App() {
  const restaurants = [
    'Cheese Curd City',
    'Poutine Palace',
  ];
  const title = "Ordering food has never been easier";

  return (
    <>
      <div className="homepage" style={{ margin: "auto" }}>
        <img
          alt="Restaurant table with glasses."
          src="node_modules/place-my-order-assets/images/homepage-hero.jpg"
          width="250"
          height="380"
        />

        <h1>{title}</h1>

        <p>
          We make it easier than ever to order gourmet food from your favorite
          local restaurants.
        </p>

        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant}>
              {restaurant}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
