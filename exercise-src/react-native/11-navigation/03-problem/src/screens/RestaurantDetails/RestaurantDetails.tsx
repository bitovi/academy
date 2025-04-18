import { useNavigation } from "@react-navigation/native"
import RestaurantHeader from "@shared/components/RestaurantHeader"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import { useEffect } from "react"

const restaurant = {
  _id: "Ar0qBJHxM3ecOhcr",
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
}

const RestaurantDetails: React.FC = () => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: `${restaurant.name}` })
  }, [navigation])

  return (
    <Screen>
      <RestaurantHeader restaurant={restaurant} />
      <Button onPress={() => console.warn("Place an order")}>
        Place an order
      </Button>
    </Screen>
  )
}

export default RestaurantDetails
