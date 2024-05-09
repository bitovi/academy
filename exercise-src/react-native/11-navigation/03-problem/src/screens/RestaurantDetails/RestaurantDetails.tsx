import type { StaticScreenProps } from "@react-navigation/native"
import type { FC } from "react"

import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

import RestaurantHeader from "../../components/RestaurantHeader"
import Screen from "../../design/Screen"

export type Props = StaticScreenProps<{
  slug: string
}>

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

const RestaurantDetails: FC<Props> = () => {
  const navigation = useNavigation()
  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `${restaurant.name}` })
    }
  }, [restaurant, navigation])

  return (
    <Screen>
      <RestaurantHeader restaurant={restaurant} />
    </Screen>
  )
}

export default RestaurantDetails