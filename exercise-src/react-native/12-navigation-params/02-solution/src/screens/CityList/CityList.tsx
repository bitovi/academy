import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"

const cities = [
  { name: "Madison", state: "WI" },
  { name: "Springfield", state: "IL" },
]

export interface CityListProps
  extends StackScreenProps<RestaurantsStackParamList, "CityList"> {}

const CityList: React.FC<CityListProps> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()

  return (
    <Screen noScroll>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button
            onPress={() => {
              navigation.navigate("RestaurantList", {
                state,
                city: cityItem,
              })
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
