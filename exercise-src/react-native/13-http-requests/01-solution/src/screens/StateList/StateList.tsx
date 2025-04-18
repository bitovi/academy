import { useNavigation } from "@react-navigation/native"
import Loading from "@shared/components/Loading"
import Box from "@shared/design/Box"
import Button from "@shared/design/Button"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { useStates } from "@shared/services/pmo/restaurant"
import { FlatList } from "react-native"

const StateList: React.FC = () => {
  const navigation = useNavigation()
  const { data: states, error, isPending } = useStates()

  if (error) {
    return (
      <Screen>
        <Box padding="m">
          <Typography variant="heading">Error loading states: </Typography>
          <Typography variant="body">{error.message}</Typography>
        </Box>
      </Screen>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen noScroll>
      {states?.length ? (
        <FlatList
          data={states}
          renderItem={({ item: stateItem }) => (
            <Button
              onPress={() => {
                navigation.navigate("CityList", {
                  state: stateItem,
                })
              }}
            >
              {stateItem.name}
            </Button>
          )}
          keyExtractor={(item) => item.short}
        />
      ) : (
        <Typography>No states found</Typography>
      )}
    </Screen>
  )
}

export default StateList
