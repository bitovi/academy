import { ChangeEvent, useId, useState } from 'react'
import { useCities, useRestaurants, useStates } from '../../services/restaurant/hooks'
import ListItem from './ListItem'

const RestaurantList: React.FC = () => {
  const stateId = useId()
  const cityId = useId()

  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const statesResponse = useStates()
  const citiesResponse = useCities(state)
  const restaurantsResponse = useRestaurants(state, city)

  const updateState = (event: ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value)
    setCity("")
  }

  const updateCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value)
  }

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
              onChange={updateState}
              value={state}
            >
              <option key="choose_state" value="">
                {
                  statesResponse.isPending
                    ? "Loading states…"
                    : statesResponse.error
                      ? statesResponse.error.message
                      : "Choose a state"
                }
              </option>
              {statesResponse.data?.map(({ short, name }) => (
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
              onChange={updateCity}
              value={city}
            >
              <option key="choose_city" value="">
                {
                  state
                    ? citiesResponse.isPending
                      ? "Loading cities…"
                      : citiesResponse.error
                        ? citiesResponse.error.message
                        : "Choose a city"
                    : "Choose a state before selecting a city"
                }
              </option>
              {state && citiesResponse.data?.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </form>

        {city && restaurantsResponse.error && (
          <p aria-live="polite" className="restaurant">
            Error loading restaurants: {restaurantsResponse.error.message}
          </p>
        )}

        {city && restaurantsResponse.isPending && (
          <p aria-live="polite" className="restaurant loading">
            Loading restaurants…
          </p>
        )}

        {city && restaurantsResponse.data && (
          restaurantsResponse.data.length === 0 ? (
            !restaurantsResponse.isPending && (
              <p aria-live="polite">No restaurants found.</p>
            )
          ) : (
            restaurantsResponse.data.map(({ _id, slug, name, address, images }) => (
              <ListItem
                key={_id}
                address={address}
                name={name}
                slug={slug}
                thumbnail={images.thumbnail}
              />
            ))
          )
        )}
      </div>
    </>
  )
}

export default RestaurantList