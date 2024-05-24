import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import Box from "../../design/Box"
import Button from "../../design/Button"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import { useRestaurants } from "../../services/pmo/restaurant"

export interface RestaurantListProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantList"> {}

const RestaurantList: React.FC<RestaurantListProps> = ({ route }) => {
  const navigation = useNavigation()
  // Exercise: Update `RestaurantList.tsx` to use our new `useRestaurants` Hook.

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
