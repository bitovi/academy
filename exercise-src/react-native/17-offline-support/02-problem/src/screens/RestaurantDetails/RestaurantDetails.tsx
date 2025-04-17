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
import {
  useAuthenticated,
  useUser,
  useAuthentication,
} from "@shared/services/auth"
import { useFavorite } from "@shared/services/pmo/favorite/hooks"
import { useRestaurant } from "@shared/services/pmo/restaurant"

export interface RestaurantDetailsProps
  extends StackScreenProps<RestaurantsStackParamList, "RestaurantDetails"> {}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ route }) => {
  const { slug } = route.params
  const navigation = useNavigation()
  const { data: restaurant, error, isPending } = useRestaurant({ slug })

  // Exercise: Add a button that uses the `toggleFavorite` helper.

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
      {/*
          Exercise:
          - If the user is logged out: Render a button that says “Sign in to favorite this restaurant” and call the `signIn` method.
          - If the user is logged in: Render a button that says “Add to favorites” or “Remove from favorites”, depending on whether the restaurant is a favorite.
          - If a request is pending: Change the button text to “Saving…”.
          - If there’s an error: Render the error message.
        */}

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
