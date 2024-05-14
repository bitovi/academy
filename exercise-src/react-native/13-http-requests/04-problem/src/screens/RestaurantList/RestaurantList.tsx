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

  const navigateToDetails = (slug: string) => {
    navigation.navigate("RestaurantDetails")
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
