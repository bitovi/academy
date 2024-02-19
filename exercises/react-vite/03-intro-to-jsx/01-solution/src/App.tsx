import './App.css'

function App() {
  return (
    <>
      <div className="restaurants">
        <h2 className="page-header">Restaurants</h2>
        <div className="restaurant">
          <img
            alt=""
            src="/node_modules/place-my-order-assets/images/4-thumbnail.jpg"
            width="100"
            height="100"
          />
          <h3>{/* NAME GOES HERE */}</h3>
          <div className="address">
            230 W Kinzie Street
            <br />
            Green Bay, WI 53205
          </div>
          <div className="hours-price">
            $$$
            <br />
            Hours: M-F 10am-11pm
            <span className="open-now">
              Open Now
            </span>
          </div>
          <a className="btn" href="/restaurants/poutine-palace">
            Details
          </a>
          <br />
        </div>
      </div>
    </>
  )
}

export default App
