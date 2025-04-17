import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Button from "@shared/design/Button"
import Card from "@shared/design/Card"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"

const states = [
  {
    name: "Illinois",
    short: "IL",
  },
  {
    name: "Wisconsin",
    short: "WI",
  },
]

export interface StateListProps
  extends StackScreenProps<RestaurantsStackParamList, "StateList"> {}

// Exercise: Update the typing of `StateList` component, using the type `Props` made by the `StackScreenProps`.
const StateList: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Screen noScroll>
      <Card>
        <Typography variant="heading">Place My Order: Coming Soon!</Typography>
      </Card>
      <FlatList
        data={states}
        renderItem={({ item: stateItem }) => (
          <Button
            onPress={() => {
              // Exercise: Navigate to the CityList view.
            }}
          >
            {stateItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.short}
      />
    </Screen>
  )
}

export default StateList
