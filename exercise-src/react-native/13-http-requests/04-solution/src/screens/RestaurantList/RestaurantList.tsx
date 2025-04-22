import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import Loading from "@shared/components/Loading"
import Box from "@shared/design/Box"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useRestaurants } from "@shared/services/pmo/restaurant"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"

export interface RestaurantListProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantList"> {}

const RestaurantList: React.FC<RestaurantListProps> = ({ route }) => {
  const navigation = useNavigation()

  const { state, city } = route.params
  const {
    data: restaurants,
    error,
    isPending,
  } = useRestaurants({ state: state.short, city: city.name })

  if (error) {
    return (
      <Screen>
        <Box padding="m">
          <Typography variant="heading">Error loading restaurants: </Typography>
          <Typography variant="body">{error.message}</Typography>
        </Box>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen noScroll>
      <FlatList
        data={restaurants}
        renderItem={({ item: restaurant }) => (
          <Button
            onPress={() => {
              navigation.navigate("RestaurantDetails", {
                slug: restaurant.slug,
              })
            }}
          >
            {restaurant.name}
          </Button>
        )}
        keyExtractor={(item) => item._id}
      />
    </Screen>
  )
}

export default RestaurantList
