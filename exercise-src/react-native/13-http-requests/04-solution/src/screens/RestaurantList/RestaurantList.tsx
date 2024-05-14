import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRestaurants } from "../../services/pmo/restaurant"
import Box from "../../design/Box"
import Loading from "../../components/Loading"
import Button from "../../design/Button"
import Typography from "../../design/Typography"
import type { StackScreenProps } from "@react-navigation/stack"
import type { RestaurantsStackParamList } from "../../App"

type Props = StackScreenProps<RestaurantsStackParamList, "RestaurantList">

const RestaurantList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation()

  const { state, city } = route.params
  const { data, error, isPending } = useRestaurants(state.short, city.name)

  const navigateToDetails = (slug: string) => {
    navigation.navigate("RestaurantDetails", {
      state,
      city,
      slug: slug,
    })
  }

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading restaurants: </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <>
      <Box padding="s">
        <FlatList
          data={data}
          renderItem={({ item: restaurant }) => (
            <Button onPress={() => navigateToDetails(restaurant.slug)}>
              {restaurant.name}
            </Button>
          )}
          keyExtractor={(item) => item._id}
        />
      </Box>
    </>
  )
}

export default RestaurantList
