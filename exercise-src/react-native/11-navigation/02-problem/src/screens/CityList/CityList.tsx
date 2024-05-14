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
