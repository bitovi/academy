import type { FC } from "react"
import { FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackScreenProps } from "@react-navigation/stack"

import type { RestaurantsStackParamList } from "../../App"
import Card from "../../design/Card"
import Typography from "../../design/Typography"
import Screen from "../../design/Screen"
import Button from "../../design/Button"

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

const StateList: FC = () => {
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
