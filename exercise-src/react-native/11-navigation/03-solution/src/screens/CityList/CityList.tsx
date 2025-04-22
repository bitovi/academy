import { useNavigation } from "@react-navigation/native"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import { FlatList } from "react-native"

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
