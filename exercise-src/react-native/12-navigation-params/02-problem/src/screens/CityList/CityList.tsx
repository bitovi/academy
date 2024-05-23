import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Button from "../../design/Button"
import Screen from "../../design/Screen"

const cities = [
  { name: "Madison", state: "WI" },
  { name: "Springfield", state: "IL" },
]

export interface CityListProps
  extends StackScreenProps<RestaurantsStackParamList, "CityList"> {}

// Exercise: Update the the typing to use the given `Props`.
const CityList: React.FC = () => {
  // Exercise: Destructure the `route` to fetch its stored state.
  const navigation = useNavigation()

  return (
    <Screen noScroll>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button
            onPress={() => {
              // Exercise: Navigate to the RestaurantList view.
            }}
          >
            {cityItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.name}
      />
    </Screen>
  )
}

export default CityList
