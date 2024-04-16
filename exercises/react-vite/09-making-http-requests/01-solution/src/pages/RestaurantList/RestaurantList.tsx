import type { State } from "../../services/restaurant/interfaces"
import CheeseThumbnail from "place-my-order-assets/images/2-thumbnail.jpg"
import PoutineThumbnail from "place-my-order-assets/images/4-thumbnail.jpg"
import { useEffect, useState } from "react"
import ListItem from "./ListItem"
import { useCities } from "../../services/restaurant/hooks"

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

const RestaurantList: React.FC = () => {
  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const [statesResponse, setStatesResponse] = useState<StatesResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_PMO_API}/states`, {
        method: "GET",
      })

      const data = await response.json()

      setStatesResponse({
        data: data?.data || null,
        error: null,
        isPending: false,
      })
    }
    fetchData()
  }, [])

  const cities = useCities(state)

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

  const updateState = (stateShortCode: string) => {
    setState(stateShortCode)
    setCity("")
  }

  const updateCity = (cityName: string) => {
    setCity(cityName)
  }

  return (
    <>
      <div className="restaurants">
        <h2 className="page-header">Restaurants</h2>

        <form className="form">
          <div className="form-group">
            <label className="control-label" htmlFor="stateSelect">
              State
            </label>
            <select
              className="form-control"
              id="stateSelect"
              onChange={(event) => updateState(event.target.value)}
              value={state}
            >
              <option key="choose_state" value="">
                {statesResponse.isPending
                  ? "Loading states…"
                  : statesResponse.error
                    ? statesResponse.error.message
                    : "Choose a state"}
              </option>
              {statesResponse.data?.map(({ short, name }) => (
                <option key={short} value={short}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            City:
            {state ? (
              cities.map(({ name }) => (
                <button
                  key={name}
                  onClick={() => updateCity(name)}
                  type="button"
                >
                  {name}
                </button>
              ))
            ) : (
              <> Choose a state before selecting a city</>
            )}
            <hr />
            <p>Current city: {city || "(none)"}</p>
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
