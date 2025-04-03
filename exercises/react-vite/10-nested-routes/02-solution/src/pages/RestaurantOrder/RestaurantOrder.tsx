import { useParams } from "react-router-dom"
import RestaurantHeader from "../../components/RestaurantHeader"
import { useRestaurant } from "../../services/pmo/restaurant/"

const RestaurantOrder: React.FC = () => {
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

      <div className="order-form">
        <h3>Order from {restaurant.data.name}!</h3>
      </div>
    </>
  )
}

export default RestaurantOrder
