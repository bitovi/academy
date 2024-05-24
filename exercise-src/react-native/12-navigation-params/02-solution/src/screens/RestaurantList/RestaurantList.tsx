import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Button from "../../design/Button"
import Screen from "../../design/Screen"

export interface RestaurantListProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantList"> {}

const restaurants = [
  {
    name: "Cheese Curd City",
    slug: "cheese-curd-city",
    images: {
      thumbnail:
        "https://www.place-my-order.com/node_modules/place-my-order-assets/images/2-thumbnail.jpg",
      owner:
        "https://www.place-my-order.com/node_modules/place-my-order-assets/images/2-owner.jpg",
      banner:
        "https://www.place-my-order.com/node_modules/place-my-order-assets/images/1-banner.jpg",
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
      thumbnail:
        "https://www.place-my-order.com/node_modules/place-my-order-assets/images/2-thumbnail.jpg",
      owner:
        "https://www.place-my-order.com/node_modules/place-my-order-assets/images/2-owner.jpg",
      banner:
        "https://www.place-my-order.com/node_modules/place-my-order-assets/images/1-banner.jpg",
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

const RestaurantList: React.FC<RestaurantListProps> = ({ route }) => {
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

export default RestaurantList
