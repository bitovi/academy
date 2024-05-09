import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackScreenProps } from "@react-navigation/stack"

import type { RestaurantsStackParamList } from "../../App"
import Screen from "../../design/Screen"
import Button from "../../design/Button"

const cities = [
  { name: "Madison", state: "WI" },
  { name: "Springfield", state: "IL" },
]

type Props = StackScreenProps<RestaurantsStackParamList, "CityList">

const CityList: FC<Props> = ({ route }) => {
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
