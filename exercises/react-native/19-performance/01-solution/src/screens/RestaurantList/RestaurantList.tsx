import type { FC } from "react"
import { Suspense, lazy, useState } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRestaurants } from "../../services/pmo/restaurant"
import Box from "../../design/Box"
import Loading from "../../components/Loading"
import Button from "../../design/Button"
import Typography from "../../design/Typography"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RestaurantsStackParamList } from "../../App"
import Tabs from "../../components/Tabs"
import Screen from "../../design/Screen"

const Map = lazy(() => import("./components/Map"))

type Props = StackScreenProps<RestaurantsStackParamList, "RestaurantList">

const RestaurantList: FC<Props> = ({ route }) => {
  const navigation = useNavigation()

  const { state, city } = route.params
  const { data, error, isPending } = useRestaurants(state.short, city.name)

  const [tab, setTab] = useState<string>("list")

  const navigateToDetails = (slug: string) => {
    navigation.navigate("RestaurantDetails", {
      state,
      city,
      slug: slug,
    })
  }

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
              data={data}
              renderItem={({ item: restaurant }) => (
                <Button onPress={() => navigateToDetails(restaurant.slug)}>
                  {restaurant.name}
                </Button>
              )}
              keyExtractor={(item) => item._id}
            />
          </Box>
        )}
        {tab === "map" && data && (
          <Suspense fallback={<Loading />}>
            <Map data={data} navigateTo={navigateToDetails} />
          </Suspense>
        )}
      </Screen>
    </>
  )
}

export default RestaurantList
