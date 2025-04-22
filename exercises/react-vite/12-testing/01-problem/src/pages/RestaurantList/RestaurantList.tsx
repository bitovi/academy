import { useState, useCallback } from "react"
import {
  useCities,
  useRestaurants,
  useStates,
} from "../../services/pmo/restaurant"
import ListItem from "./ListItem"
import FormSelect from "../../components/FormSelect"

const RestaurantList: React.FC = () => {
  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const statesResponse = useStates()
  const citiesResponse = useCities(state)
  const restaurantsResponse = useRestaurants(state, city)

  const updateState = (newValue: string) => {
    setState(newValue)
    setCity("")
  }

  const updateCity = (newValue: string) => {
    setCity(newValue)
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
          <FormSelect label="State" onChange={updateState} value={state}>
            <option key="choose_state" value="">
              {chooseStatePlaceholder()}
            </option>
            {statesResponse.data?.map(({ short, name }) => (
              <option key={short} value={short}>
                {name}
              </option>
            ))}
          </FormSelect>

          <FormSelect label="City" onChange={updateCity} value={city}>
            <option key="choose_city" value="">
              {chooseCityPlaceholder()}
            </option>
            {state &&
              citiesResponse.data?.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
          </FormSelect>
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
