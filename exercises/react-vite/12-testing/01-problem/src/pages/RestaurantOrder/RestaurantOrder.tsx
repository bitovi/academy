import { FormEvent, useState } from "react"
import { useParams } from "react-router-dom"
import FormTextField from "../../components/FormTextField"
import RestaurantHeader from "../../components/RestaurantHeader"
import { useRestaurant } from "../../services/restaurant/hooks"

type OrderItems = Record<string, number>

interface NewOrderState {
    address: string;
    items: OrderItems;
    name: string;
    phone: string;
}

const RestaurantOrder: React.FC = () => {
    const params = useParams() as { slug: string }

    const restaurant = useRestaurant(params.slug)

    const [newOrder, setNewOrder] = useState<NewOrderState>({
        address: "",
        items: {},
        name: "",
        phone: "",
    })

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

    const setItem = (itemId: string, isChecked: boolean, itemPrice: number) => {
        return setNewOrder((newOrder) => {
            const updatedItems = {
                ...newOrder.items,
            }
            if (isChecked) {
                updatedItems[itemId] = itemPrice;
            } else {
                delete updatedItems[itemId]
            }
            return {
                ...newOrder,
                items: updatedItems,
            }
        })
    }

    const setValue = (key: string, value: string) => {
        return setNewOrder((newOrder) => {
            return {
                ...newOrder,
                [key]: value
            }
        })
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()
    }

    const selectedCount = Object.values(newOrder.items).length
    const subtotal = calculateTotal(newOrder.items)

    return (
        <>
            <RestaurantHeader restaurant={restaurant.data} />

            <div className="order-form">
                <h3>Order from {restaurant.data.name}!</h3>

                <form onSubmit={(event) => submit(event)}>
                    {
                        subtotal === 0
                            ? (
                                <p className="info text-error">Please choose an item.</p>
                            )
                            : (
                                <p className="info text-success">{selectedCount} selected.</p>
                            )
                    }

                    <h4>Lunch Menu</h4>
                    <ul className="list-group">
                        {restaurant.data.menu.lunch.map(({ name, price }) => (
                            <li key={name} className="list-group-item">
                                <label>
                                    <input
                                        checked={name in newOrder.items}
                                        onChange={(event) => setItem(name, event.target.checked, price)}
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
                                        checked={name in newOrder.items}
                                        onChange={(event) => setItem(name, event.target.checked, price)}
                                        type="checkbox"
                                    />
                                    {name}
                                    <span className="badge">{price}</span>
                                </label>
                            </li>
                        ))}
                    </ul>

                    <FormTextField
                        label="Name"
                        onChange={(name) => setValue("name", name)}
                        type="text"
                        value={newOrder.name}
                    />
                    <FormTextField
                        label="Address"
                        onChange={(address) => setValue("address", address)}
                        type="text"
                        value={newOrder.address}
                    />
                    <FormTextField
                        label="Phone"
                        onChange={(phone) => setValue("phone", phone)}
                        type="tel"
                        value={newOrder.phone}
                    />

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