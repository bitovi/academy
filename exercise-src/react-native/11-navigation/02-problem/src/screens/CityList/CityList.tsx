import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import { FlatList } from "react-native"

const cities = [
  { name: "Madison", state: "WI" },
  { name: "Springfield", state: "IL" },
]

const CityList: React.FC = () => {
  return (
    <Screen noScroll>
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
