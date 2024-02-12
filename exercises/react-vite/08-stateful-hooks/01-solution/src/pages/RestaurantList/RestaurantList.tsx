import CheeseThumbnail from 'place-my-order-assets/images/2-thumbnail.jpg'
import PoutineThumbnail from 'place-my-order-assets/images/4-thumbnail.jpg'
import { useId, useState } from 'react'
import ListItem from './ListItem'

const RestaurantList: React.FC = () => {
  const stateId = useId()
  const cityId = useId()

  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const states = [
    { name: 'Illinois', short: 'IL' },
    { name: 'Wisconsin', short: 'WI' },
  ]
  const cities = [
    { name: 'Madison' },
    { name: 'Springfield' },
  ]
  const restaurants = {
    data: [
      {
        name: 'Cheese Curd City',
        slug: 'cheese-curd-city',
        images: {
          thumbnail: CheeseThumbnail,
        },
        address: {
          street: '2451 W Washburne Ave',
          city: 'Green Bay',
          state: 'WI',
          zip: '53295',
        },
        _id: 'Ar0qBJHxM3ecOhcr',
      },
      {
        name: 'Poutine Palace',
        slug: 'poutine-palace',
        images: {
          thumbnail: PoutineThumbnail,
        },
        address: {
          street: '230 W Kinzie Street',
          city: 'Green Bay',
          state: 'WI',
          zip: '53205',
        },
        _id: '3ZOZyTY1LH26LnVw',
      },
    ]
  };

  return (
    <>
      <div className="restaurants">
        <h2 className="page-header">Restaurants</h2>

        <form className="form">
          <div className="form-group">
            <label className="control-label" htmlFor={stateId}>
              State
            </label>
            <select
              className="form-control"
              id={stateId}
              onChange={(event) => setState(event.target.value)}
              value={state}
            >
              <option key="choose" value="">Choose a state</option>
              {states.map(({ short, name }) => (
                <option key={short} value={short}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor={cityId}>
              City
            </label>
            <select
              className="form-control"
              id={cityId}
              onChange={(event) => setCity(event.target.value)}
              value={city}
            >
              <option key="choose" value="">
                {
                  state
                    ? "Choose a city"
                    : "Choose a state before selecting a city"
                }
              </option>
              {state && cities.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </form>

        {restaurants.data ? (
          restaurants.data.map(({ _id, address, images, name, slug }) => (
            <ListItem
              key={_id}
              address={address}
              name={name}
              slug={slug}
              thumbnail={images.thumbnail}
            />
          ))
        ) : (
          <p>No restaurants.</p>
        )}
      </div>
    </>
  )
}

export default RestaurantList