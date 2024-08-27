import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"

import Button from "../../design/Button"
import Screen from "../../design/Screen"

const cities = [
  { name: "Madison", state: "WI" },
  { name: "Springfield", state: "IL" },
]

const CityList: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Screen noScroll>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button
            onPress={() => {
              // @ts-ignore: We will fix this in the next module.
              navigation.navigate("RestaurantList")
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
