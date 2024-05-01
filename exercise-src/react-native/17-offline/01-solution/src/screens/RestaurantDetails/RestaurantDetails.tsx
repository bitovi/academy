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
import { useFavorites } from "../../services/pmo/favorite"
import {
  useAuthenticated,
  useUser,
  useAuthentication,
} from "../../services/auth"
import Screen from "../../design/Screen"

type Props = StackScreenProps<RestaurantsStackParamList, "RestaurantDetails">

const RestaurantDetails: FC<Props> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()
  const { data: restaurant, error, isPending } = useRestaurant(slug)
  const isAuthenticated = useAuthenticated()
  const user = useUser()
  const { signIn } = useAuthentication()
  const { updateFavorites, favorite } = useFavorites(user?.id, restaurant?._id)
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
          if (isAuthenticated) {
            updateFavorites(restaurant!._id)
          } else {
            signIn()
          }
        }}
      >
        {isAuthenticated && favorite?.favorite
          ? "Remove from Favorites"
          : "Add to favorites"}
      </Button>

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
