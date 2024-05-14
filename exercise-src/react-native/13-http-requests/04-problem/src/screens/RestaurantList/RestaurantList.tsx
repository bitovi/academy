import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Loading from "../../components/Loading"
import Box from "../../design/Box"
import Button from "../../design/Button"
import Typography from "../../design/Typography"
import { useRestaurants } from "../../services/pmo/restaurant"

type Props = StackScreenProps<RestaurantsStackParamList, "RestaurantList">

const RestaurantList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation()

  return (
    <>
      <Box padding="s">
        <FlatList
          data={restaurants}
          renderItem={({ item: restaurant }) => (
            <Button onPress={() => navigation.navigate("RestaurantDetails")}>
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
