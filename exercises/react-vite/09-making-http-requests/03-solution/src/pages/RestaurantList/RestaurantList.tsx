import CheeseThumbnail from "place-my-order-assets/images/2-thumbnail.jpg"
import PoutineThumbnail from "place-my-order-assets/images/4-thumbnail.jpg"
import { useState, useCallback } from "react"
import { useCities, useStates } from "../../services/pmo/restaurant"
import ListItem from "./ListItem"

const RestaurantList: React.FC = () => {
  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const statesResponse = useStates()

  const citiesResponse = useCities(state)

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
