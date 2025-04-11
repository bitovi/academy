import type { FormEvent} from "react";
import { useState } from "react"
import { useParams } from "react-router-dom"
import FormTextField from "../../components/FormTextField"
import RestaurantHeader from "../../components/RestaurantHeader"
import { useRestaurant } from "../../services/pmo/restaurant"

type OrderItems = Record<string, number>

const RestaurantOrder: React.FC = () => {
  const params = useParams() as { slug: string }

  const restaurant = useRestaurant(params.slug)

  const [items, setItems] = useState<OrderItems>({})

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

  const setItem = (itemId: string, isChecked: boolean, itemPrice: number) => {
    return setItems((currentItems) => {
      const updatedItems = {
        ...currentItems,
      }
      if (isChecked) {
        updatedItems[itemId] = itemPrice
      } else {
        delete updatedItems[itemId]
      }
      return updatedItems
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    alert("Order submitted!")
  }

  const selectedCount = Object.values(items).length
  const subtotal = calculateTotal(items)

  return (
    <>
      <RestaurantHeader restaurant={restaurant.data} />

      <div className="order-form">
        <h3>Order from {restaurant.data.name}!</h3>

        <form onSubmit={(event) => handleSubmit(event)}>
          {subtotal === 0 ? (
            <p className="info text-error">Please choose an item.</p>
          ) : (
            <p className="info text-success">{selectedCount} selected.</p>
          )}

          <h4>Lunch Menu</h4>
          <ul className="list-group">
            {restaurant.data.menu.lunch.map(({ name, price }) => (
              <li key={name} className="list-group-item">
                <label>
                  <input
                    checked={name in items}
                    onChange={(event) =>
                      setItem(name, event.target.checked, price)
                    }
                    type="checkbox"
                  />
                  {name}
                  <span className="badge">{price}</span>
                </label>
              </li>
            ))}
          </ul>

          <h4>Dinner menu</h4>
          <ul className="list-group">
            {restaurant.data.menu.dinner.map(({ name, price }) => (
              <li key={name} className="list-group-item">
                <label>
                  <input
                    checked={name in items}
                    onChange={(event) =>
                      setItem(name, event.target.checked, price)
                    }
                    type="checkbox"
                  />
                  {name}
                  <span className="badge">{price}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="submit">
            <h4>Total: ${subtotal ? subtotal.toFixed(2) : "0.00"}</h4>
            <button className="btn" type="submit">
              Place My Order!
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

function calculateTotal(items: OrderItems) {
  return Object.values(items).reduce((total, itemPrice) => {
    return total + itemPrice
  }, 0)
}

export default RestaurantOrder
