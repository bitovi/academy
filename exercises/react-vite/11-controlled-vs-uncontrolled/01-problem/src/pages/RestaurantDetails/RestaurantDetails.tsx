import { Link, useParams } from "react-router-dom"
import RestaurantHeader from "../../components/RestaurantHeader"
import { useRestaurant } from "../../services/pmo/restaurant/"

const RestaurantDetails: React.FC = () => {
  const params = useParams() as { slug: string }
  const restaurant = useRestaurant(params.slug)

  if (restaurant.isPending) {
    return (
      <p aria-live="polite" className="loading">
        Loading restaurant…
      </p>
    )
  }

  if (restaurant.error) {
    return (
      <p aria-live="polite" className="error">
        Error loading restaurant: {restaurant.error.message}
      </p>
    )
  }

  if (!restaurant.data) {
    return <p aria-live="polite">No restaurant found.</p>
  }

  return (
    <>
      <RestaurantHeader restaurant={restaurant.data} />

      <div className="restaurant-content">
        <h3>The best food this side of the Mississippi</h3>

        <p className="description">
          <img alt="" src={`/${restaurant.data.images.owner}`} />
          Description for {restaurant.data.name}
        </p>
        <p className="order-link">
          <Link
            className="btn"
            to={`/restaurants/${restaurant.data.slug}/order`}
          >
            Order from {restaurant.data.name}
          </Link>
        </p>
      </div>
    </>
  )
}

export default RestaurantDetails
