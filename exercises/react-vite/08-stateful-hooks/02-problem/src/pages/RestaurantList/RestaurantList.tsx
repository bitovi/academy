import CheeseThumbnail from 'place-my-order-assets/images/2-thumbnail.jpg'
import PoutineThumbnail from 'place-my-order-assets/images/4-thumbnail.jpg'
import { useId } from 'react'
import ListItem from './ListItem'

const RestaurantList: React.FC = () => {
  const stateId = useId()
  const cityId = useId()

  const states = [
    { name: 'Illinois', short: 'IL' },
    { name: 'Wisconsin', short: 'WI' },
  ]
  const cities = [
    { name: 'Madison', state: 'WI' },
    { name: 'Springfield', state: 'IL' },
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
            >
              <option key="choose_state" value="">Choose a state</option>
            </select>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor={cityId}>
              City
            </label>
            <select
              className="form-control"
              id={cityId}
            >
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