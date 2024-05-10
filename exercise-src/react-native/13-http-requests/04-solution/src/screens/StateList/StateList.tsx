import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useStates } from "../../services/pmo/restaurant"
import Box from "../../design/Box"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import Button from "../../design/Button"
import Loading from "../../components/Loading"

const StateList: FC = () => {
  const navigation = useNavigation()
  const { data: states, error, isPending } = useStates()

  if (error) {
    return (
      <Box padding="s">
        <Typography variant="heading">Error loading states: </Typography>
        <Typography variant="body">{error.message}</Typography>
      </Box>
    )
  }

  if (isPending) {
    return <Loading />
  }

  return (
    <Screen>
      {states?.length > 0 ? (
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
