import { useNavigation } from "@react-navigation/native"
import Button from "@shared/design/Button"
import Card from "@shared/design/Card"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { FlatList } from "react-native"

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
          <Button onPress={() => console.warn(`${stateItem.name}`)}>
            {stateItem.name}
          </Button>
        )}
        keyExtractor={(item) => item.short}
      />
    </Screen>
  )
}

export default StateList
