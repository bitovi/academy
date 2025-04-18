import { useNavigation } from "@react-navigation/native"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import { Restaurant } from "@shared/services/pmo/restaurant"
import { FlatList } from "react-native"

export interface ListProps {
  restaurants: Restaurant[]
}

const List: React.FC<ListProps> = ({ restaurants }) => {
  const navigation = useNavigation()

  return (
    <Screen noScroll>
      <FlatList
        data={restaurants}
        renderItem={({ item: restaurant }) => (
          <Button
            onPress={() => {
              navigation.navigate("RestaurantDetails", {
                slug: restaurant.slug,
              })
            }}
          >
            {restaurant.name}
          </Button>
        )}
        keyExtractor={(item) => item._id}
      />
    </Screen>
  )
}

export default List
