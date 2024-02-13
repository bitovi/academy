import { useState } from "react"
import { useParams } from "react-router-dom"
import RestaurantHeader from "../../components/RestaurantHeader"
import { useRestaurant } from "../../services/restaurant/hooks"

type OrderItems = Record<string, number>

interface NewOrderState {
    items: OrderItems;
}

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
        return <p aria-live="polite">No restaurant found.</p>;
    }

    const subtotal = 0 // Use calculateTotal here.

    return (
        <>
            <RestaurantHeader restaurant={restaurant.data} />

            <div className="order-form">
                <h3>Order from {restaurant.data.name}!</h3>

                <form>
                    {subtotal === 0 && (
                        <p className="info text-error">Please choose an item.</p>
                    )}

                    <h4>Lunch Menu</h4>
                    <ul className="list-group">
                        {restaurant.data.menu.lunch.map(({ name, price }) => (
                            <li key={name} className="list-group-item">
                                <label>
                                    <input
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