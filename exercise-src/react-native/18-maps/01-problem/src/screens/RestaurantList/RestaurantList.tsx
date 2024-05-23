import { StackScreenProps } from "@react-navigation/stack"
import { useState } from "react"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import Tabs from "../../components/Tabs"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import { useRestaurants } from "../../services/pmo/restaurant"

import List from "./components/List"
import Map from "./components/Map"

export interface RestaurantListProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantList"> {}

const RestaurantList: React.FC<RestaurantListProps> = ({ route }) => {
  const { state, city } = route.params
  const {
    data: restaurants,
    error,
    isPending,
  } = useRestaurants(state.short, city.name)

  const [tab, setTab] = useState<string>("list")

  if (error) {
    return (
      <Screen>
        <Typography variant="heading">Error loading restaurants: </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <>
      <Tabs
        options={[
          { label: "List", value: "list" },
          { label: "Map", value: "map" },
        ]}
        onChange={setTab}
        value={tab}
      />

      <Screen noScroll>
        {tab === "list" && restaurants && <List restaurants={restaurants} />}
        {tab === "map" && restaurants && <Map restaurants={restaurants} />}
      </Screen>
    </>
  )
}

export default RestaurantList
