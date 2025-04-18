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
  // Exercise: Update `StateList.tsx` to call `useState()` and use the `StateResponse` interface.

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
