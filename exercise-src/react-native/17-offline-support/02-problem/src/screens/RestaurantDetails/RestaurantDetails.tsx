import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useEffect } from "react"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import RestaurantHeader from "../../components/RestaurantHeader"
import Button from "../../design/Button"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import {
  useAuthenticated,
  useUser,
  useAuthentication,
} from "../../services/auth"
import { useFavorites } from "../../services/pmo/favorite/hooks"
import { useRestaurant } from "../../services/pmo/restaurant"

export interface RestaurantDetailsProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantDetails"> {}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()
  const { data: restaurant, error, isPending } = useRestaurant(slug)

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `${restaurant.name}` })
    }
  }, [restaurant, navigation])

  if (error) {
    return (
      <Screen>
        <Typography variant="heading">
          Error loading restaurant details:{" "}
        </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen>
      <RestaurantHeader restaurant={restaurant} />

      <Button
        onPress={() => {
          navigation.navigate("RestaurantOrder", { slug: slug })
        }}
      >
        Place an order
      </Button>
    </Screen>
  )
}

export default RestaurantDetails
