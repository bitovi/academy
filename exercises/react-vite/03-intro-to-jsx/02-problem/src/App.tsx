import CheeseThumbnail from "place-my-order-assets/images/2-thumbnail.jpg"
import PoutineThumbnail from "place-my-order-assets/images/4-thumbnail.jpg"

const App: React.FC = () => {
  const restaurants = {
    data: [
      {
        name: "Cheese Curd City",
        slug: "cheese-curd-city",
        images: {
          thumbnail: CheeseThumbnail,
        },
        address: {
          street: "2451 W Washburne Ave",
          city: "Green Bay",
          state: "WI",
          zip: "53295",
        },
        _id: "Ar0qBJHxM3ecOhcr",
      },
      {
        name: "Poutine Palace",
        slug: "poutine-palace",
        images: {
          thumbnail: PoutineThumbnail,
        },
        address: {
          street: "230 W Kinzie Street",
          city: "Green Bay",
          state: "WI",
          zip: "53205",
        },
        _id: "3ZOZyTY1LH26LnVw",
      },
    ],
  }

  return (
    <>
      <div className="restaurants">
        <h2 className="page-header">Restaurants</h2>
        <div className="restaurant">
          <img
            alt="A thumbnail for Restaurants"
            src="/node_modules/place-my-order-assets/images/4-thumbnail.jpg"
            width="100"
            height="100"
          />
          <h3>{/* NAME GOES HERE. */}</h3>
          <div className="address">
            230 W Kinzie Street
            <br />
            Green Bay, WI 53205
          </div>
          <div className="hours-price">
            $$$
            <br />
            Hours: M-F 10am-11pm
            <span className="open-now">Open Now</span>
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
