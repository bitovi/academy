import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import Box from "../../design/Box"
import Button from "../../design/Button"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import { useCities } from "../../services/pmo/restaurant"

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
