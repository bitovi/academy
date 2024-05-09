import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

import Screen from "../../design/Screen"
import Button from "../../design/Button"

export interface City {
  name: string
  state: string
}

const cities: City[] = [
  { name: "Madison", state: "WI" },
  { name: "Springfield", state: "IL" },
]

const CityList: FC = () => {
  const navigation = useNavigation()

  //Exercise: Use navigation to navigate to RestaurantList

  return (
    <Screen>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button onPress={() => console.warn(`${cityItem.name}`)}>
            {cityItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.name}
      />
    </Screen>
  )
}

export default CityList
