import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useEffect } from "react"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import RestaurantHeader from "../../components/RestaurantHeader"
import Button from "../../design/Button"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import { useRestaurant } from "../../services/pmo/restaurant"

type Props = StackScreenProps<RestaurantsStackParamList, "RestaurantDetails">

const RestaurantDetails: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation()

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
