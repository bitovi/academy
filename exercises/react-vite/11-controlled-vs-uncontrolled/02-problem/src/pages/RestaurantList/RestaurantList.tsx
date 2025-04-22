import { useState, useCallback } from "react"
import {
  useCities,
  useRestaurants,
  useStates,
} from "../../services/pmo/restaurant"
import ListItem from "./ListItem"

const RestaurantList: React.FC = () => {
  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const statesResponse = useStates()

  const citiesResponse = useCities(state)

  const restaurantsResponse = useRestaurants(state, city)

  const updateState = (stateShortCode: string) => {
    setState(stateShortCode)
    setCity("")
  }

  const updateCity = (cityName: string) => {
    setCity(cityName)
  }

  const chooseStatePlaceholder = useCallback(()=>{
    let placeholderText = "Choose a state";

    if(statesResponse.isPending) {
      placeholderText = "Loading states…";
    } else if (statesResponse.error) {
      placeholderText = statesResponse.error.message
    }

    return placeholderText;
  }, [statesResponse])

  const chooseCityPlaceholder = useCallback(()=>{
    let placeholderText = "Choose a city";

    if(!state) {
      placeholderText = "Choose a state before selecting a city";
    } else if (citiesResponse.isPending) {
      placeholderText = "Loading cities…";
    } else if (citiesResponse.error) {
      placeholderText = citiesResponse.error.message;
    } 

    return placeholderText;
  }, [state, citiesResponse])

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
                {chooseStatePlaceholder()}
              </option>
              {statesResponse.data?.map(({ short, name }) => (
                <option key={short} value={short}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="citySelect">
              City
            </label>
            <select
              className="form-control"
              id="citySelect"
              onChange={(event) => updateCity(event.target.value)}
              value={city}
            >
              <option key="choose_city" value="">
                {chooseCityPlaceholder()}
              </option>
              {state &&
                citiesResponse.data?.map(({ name }) => (
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

        {city &&
          restaurantsResponse.data &&
          (restaurantsResponse.data.length === 0
            ? !restaurantsResponse.isPending && (
                <p aria-live="polite">No restaurants found.</p>
              )
            : restaurantsResponse.data.map(
                ({ _id, slug, name, address, images }) => (
                  <ListItem
                    key={_id}
                    address={address}
                    name={name}
                    slug={slug}
                    thumbnail={images.thumbnail}
                  />
                ),
              ))}
      </div>
    </>
  )
}

export default RestaurantList
