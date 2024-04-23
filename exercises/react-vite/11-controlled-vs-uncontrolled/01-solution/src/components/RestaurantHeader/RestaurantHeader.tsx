import type { Restaurant } from "../../services/restaurant/interfaces"

const RestaurantHeader: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  return (
    <div
      className="restaurant-header"
      style={{ backgroundImage: `url(/${restaurant.images.banner})` }}
    >
      <div className="background">
        <h2>{restaurant.name}</h2>

        {restaurant.address && (
          <div className="address">
            {restaurant.address.street}
            <br />
            {restaurant.address.city}, {restaurant.address.state}{" "}
            {restaurant.address.zip}
          </div>
        )}

        <div className="hours-price">
          $$$
          <br />
          Hours: M-F 10am-11pm
          <span className="open-now">Open Now</span>
        </div>

        <br />
      </div>
    </div>
  )
}

export default RestaurantHeader
