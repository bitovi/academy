import type { FC } from "react"
import { FlatList } from "react-native"
import type { StackScreenProps } from "@react-navigation/stack"

import type { RestaurantsStackParamList } from "../../App"
import Box from "../../design/Box"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import Button from "../../design/Button"
import Loading from "../../components/Loading"

type Props = StackScreenProps<RestaurantsStackParamList, "CityList">

const CityList: FC<Props> = ({ route }) => {
  const { state } = route.params
  const navigation = useNavigation()
  const { data: cities, error, isPending } = useCities(state.short || "")

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading cities: </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen>
      <FlatList
        data={cities}
        renderItem={({ item: cityItem }) => (
          <Button
            onPress={() =>
              navigation.navigate("RestaurantList", {
                state,
                city: cityItem,
              })
            }
          >
            {cityItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.name}
      />
    </Screen>
  )
}

export default CityList
