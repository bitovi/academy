import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackScreenProps } from "@react-navigation/stack"

import type { RestaurantsStackParamList } from "../../App"
import Box from "../../design/Box"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import Button from "../../design/Button"
import Loading from "../../components/Loading"
import { useCities } from "../../services/pmo/restaurant"

type Props = StackScreenProps<RestaurantsStackParamList, "CityList">

const CityList: React.FC<Props> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()

  return (
    <Screen>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button
            onPress={() =>
              navigation.navigate("RestaurantList", {
                state,
                city: cityItem,
              })
            }
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
