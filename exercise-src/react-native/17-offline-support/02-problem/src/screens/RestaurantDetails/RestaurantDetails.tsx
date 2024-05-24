import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useEffect } from "react"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import RestaurantHeader from "../../components/RestaurantHeader"
import Box from "../../design/Box"
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
  const { data: restaurant, error, isPending } = useRestaurant({ slug })

  // Exercise: Add a button that uses the `updateFavorites` helper.

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
          navigation.navigate("RestaurantOrder", { slug: slug })
        }}
      >
        Place My Order!
      </Button>
    </Screen>
  )
}

export default RestaurantDetails
