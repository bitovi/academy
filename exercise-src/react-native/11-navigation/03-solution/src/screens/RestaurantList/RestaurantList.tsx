import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"

import Box from "../../design/Box"
import Button from "../../design/Button"

const restaurants = [
  {
    name: "Cheese Curd City",
    slug: "cheese-curd-city",
    images: {
      // thumbnail: CheeseThumbnail,
    },
    address: {
      street: "2451 W Washburne Ave",
      city: "Green Bay",
      state: "WI",
      zip: "53295",
    },
    _id: "Ar0qBJHxM3ecOhcr",
  },
  {
    name: "Poutine Palace",
    slug: "poutine-palace",
    images: {
      // thumbnail: PoutineThumbnail,
    },
    address: {
      street: "230 W Kinzie Street",
      city: "Green Bay",
      state: "WI",
      zip: "53205",
    },
    _id: "3ZOZyTY1LH26LnVw",
  },
]

const RestaurantList: React.FC = () => {
  const navigation = useNavigation()

  return (
    <>
      <Box padding="s">
        <FlatList
          data={restaurants}
          renderItem={({ item: restaurant }) => (
            <Button onPress={() => navigation.navigate("RestaurantDetails")}>
              {restaurant.name}
            </Button>
          )}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </>
  )
}

export default RestaurantList
