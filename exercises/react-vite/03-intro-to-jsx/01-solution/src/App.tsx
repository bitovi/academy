import './App.css'

function App() {
  return (
    <>
      <div className="homepage" style={{ margin: "auto" }}>
        <img
          alt="Restaurant table with glasses."
          src="node_modules/place-my-order-assets/images/homepage-hero.jpg"
          width="250"
          height="380"
        />

        <h1>{/* TITLE GOES HERE */}</h1>

        <p>
          We make it easier than ever to order gourmet food from your favorite
          local restaurants.
        </p>

        <p>
          <a className="btn" href="/restaurants" role="button">
            Choose a Restaurant
          </a>
        </p>
      </div>
    </>
  )
}

export default App
