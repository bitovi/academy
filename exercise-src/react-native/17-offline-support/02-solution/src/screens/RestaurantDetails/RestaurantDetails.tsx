import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import Loading from "@shared/components/Loading"
import RestaurantHeader from "@shared/components/RestaurantHeader"
import Box from "@shared/design/Box"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import {
  useAuthenticated,
  useUser,
  useAuthentication,
} from "@shared/services/auth"
import { useFavorite } from "@shared/services/pmo/favorite/hooks"
import { useRestaurant } from "@shared/services/pmo/restaurant"
import { useEffect } from "react"

import { RestaurantsStackParamList } from "../../App"

export interface RestaurantDetailsProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantDetails"> {}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()
  const { data: restaurant, error, isPending } = useRestaurant({ slug })
  const isAuthenticated = useAuthenticated()
  const user = useUser()
  const { signIn } = useAuthentication()
  const {
    error: favoriteError,
    isFavorite,
    isPending: favoriteIsPending,
    toggleFavorite,
  } = useFavorite(user?.id, restaurant?._id)

  useEffect(() => {
    if (restaurant) {
      navigation.setOptions({ title: `${restaurant.name}` })
    }
  }, [restaurant, navigation])

  if (error) {
    return (
      <Screen>
        <Box padding="m">
          <Typography variant="heading">
            Error loading restaurant details:{" "}
          </Typography>
          <Typography variant="body">{error.message}</Typography>
        </Box>
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
            toggleFavorite()
          } else {
            signIn()
          }
        }}
      >
        {isAuthenticated
          ? favoriteIsPending
            ? "Saving…"
            : isFavorite
            ? "Remove from favorites"
            : "Add to favorites"
          : "Sign in to favorite this restaurant"}
      </Button>
      {favoriteError ? (
        <Box padding="s">
          <Typography variant="body">{favoriteError.message}</Typography>
        </Box>
      ) : null}

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
