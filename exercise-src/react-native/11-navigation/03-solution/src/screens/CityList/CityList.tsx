import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"

import Button from "../../design/Button"
import Screen from "../../design/Screen"

export interface City {
  name: string
  state: string
}

const cities: City[] = [
  { name: "Madison", state: "WI" },
  { name: "Springfield", state: "IL" },
]

const CityList: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Screen>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button onPress={() => navigation.navigate("RestaurantList")}>
            {cityItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.name}
      />
    </Screen>
  )
}

export default CityList
