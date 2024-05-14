import { useNavigation } from "@react-navigation/native"

import RestaurantHeader from "../../components/RestaurantHeader"
import Button from "../../design/Button"
import Screen from "../../design/Screen"

const restaurant = {
  _id: "Ar0qBJHxM3ecOhcr",
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
}

const RestaurantDetails: React.FC = () => {
  const navigation = useNavigation()
  navigation.setOptions({ title: `${restaurant.name}` })

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
