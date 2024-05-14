import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useState } from "react"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import Tabs from "../../components/Tabs"
import Box from "../../design/Box"
import Button from "../../design/Button"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import { useRestaurants } from "../../services/pmo/restaurant"

import Map from "./components/Map"

type Props = StackScreenProps<RestaurantsStackParamList, "RestaurantList">

const RestaurantList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation()

  const { state, city } = route.params
  const {
    data: restaurants,
    error,
    isPending,
  } = useRestaurants(state.short, city.name)

  const [tab, setTab] = useState<string>("list")

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading restaurants: </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <>
      <Tabs
        options={[
          {
            label: "List",
            value: "list",
          },
          {
            label: "Map",
            value: "map",
          },
        ]}
        value={tab}
        onChange={setTab}
      />
      <Screen>
        {tab === "list" && (
          <Box padding="s">
            <FlatList
              data={restaurants}
              renderItem={({ item: restaurant }) => (
                <Button
                  onPress={() =>
                    navigation.navigate("RestaurantDetails", {
                      state,
                      city,
                      slug: restaurant.slug,
                    })
                  }
                >
                  {restaurant.name}
                </Button>
              )}
              keyExtractor={(item) => item._id}
            />
          </Box>
        )}
        {tab === "map" && restaurants && <Map restaurants={restaurants} />}
      </Screen>
    </>
  )
}

export default RestaurantList
