import CheeseThumbnail from 'place-my-order-assets/images/2-thumbnail.jpg'
import PoutineThumbnail from 'place-my-order-assets/images/4-thumbnail.jpg'
import ListItem from './ListItem'

const RestaurantList: React.FC = () => {
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