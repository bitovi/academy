import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useEffect } from "react"

import { RestaurantsStackParamList } from "../../App"
import Loading from "@shared/components/Loading"
import RestaurantHeader from "@shared/components/RestaurantHeader"
import Box from "@shared/design/Box"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useRestaurant } from "@shared/services/pmo/restaurant"

export interface RestaurantDetailsProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantDetails"> {}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ route }) => {
  const navigation = useNavigation()
  // Exercise: Update `RestaurantDetails.tsx` to use our new `useRestaurants` Hook.

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
