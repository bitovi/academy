import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"

import Box from "../../../../design/Box"
import Button from "../../../../design/Button"
import { Restaurant } from "../../../../services/pmo/restaurant"

export interface ListProps {
  restaurants: Restaurant[]
}

const List: React.FC<ListProps> = ({ restaurants }) => {
  const navigation = useNavigation()

  return (
    <Box padding="s">
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
    </Box>
  )
}

export default List
