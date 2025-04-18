import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import Loading from "@shared/components/Loading"
import Box from "@shared/design/Box"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useCities } from "@shared/services/pmo/restaurant"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"

export interface CityListProps
  extends StackScreenProps<RestaurantsStackParamList, "CityList"> {}

const CityList: React.FC<CityListProps> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()
  // Exercise: When calling the Place My Order API, include the `state` query parameter.

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
