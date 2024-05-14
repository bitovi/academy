import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList } from "react-native"

import { RestaurantsStackParamList } from "../../App"
import Button from "../../design/Button"
import Card from "../../design/Card"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"

export interface State {
  name: string
  short: string
}

const states: State[] = [
  {
    name: "Illinois",
    short: "IL",
  },
  {
    name: "Wisconsin",
    short: "WI",
  },
]

type Props = StackScreenProps<RestaurantsStackParamList, "StateList">

const StateList: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Screen>
      <Card>
        <Typography variant="heading">
          Place My Order: Coming Soon To...
        </Typography>
      </Card>
      <FlatList
        data={states}
        renderItem={({ item: stateItem }) => (
          <Button
            onPress={() => {
              navigation.navigate("CityList")
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
