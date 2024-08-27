import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"

import Button from "../../../../design/Button"
import Screen from "../../../../design/Screen"
import { Restaurant } from "../../../../services/pmo/restaurant"

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
