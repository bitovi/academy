import { useNavigation } from "@react-navigation/native"
import { FlatList } from "react-native"

import Loading from "../../components/Loading"
import Box from "../../design/Box"
import Button from "../../design/Button"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import { useStates } from "../../services/pmo/restaurant"

const StateList: React.FC = () => {
  const navigation = useNavigation()
  // Exercise: Update `StateList.tsx` to call `useState()` and use the `StateResponse` interface.

  return (
    <Screen>
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
