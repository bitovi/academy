import type { FC } from "react"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RestaurantsStackParamList } from "../../App"

import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

import RestaurantHeader from "../../components/RestaurantHeader"
import Loading from "../../components/Loading"
import Button from "../../design/Button"
import Typography from "../../design/Typography"
import { useRestaurant } from "../../services/pmo/restaurant"
import Screen from "../../design/Screen"

type Props = StackScreenProps<RestaurantsStackParamList, "RestaurantDetails">

const RestaurantDetails: FC<Props> = ({ route }) => {
  const navigation = useNavigation()

  return (
    <Screen>
      <RestaurantHeader restaurant={restaurant} />

      <Button
        onPress={() => {
          navigation.navigate("OrderCreate", { slug: slug })
        }}
      >
        Place an order
      </Button>
    </Screen>
  )
}

export default RestaurantDetails
