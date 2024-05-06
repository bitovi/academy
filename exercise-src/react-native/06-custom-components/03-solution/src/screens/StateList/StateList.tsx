import type { FC } from "react"
import { ScrollView, Text, View } from "react-native"
import ListItem from "./components/ListItem"

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

const StateList: FC = () => {
  return (
    <ScrollView>
      <View>
        <Text>Place My Order: Coming Soon To...</Text>
      </View>
      {states?.length > 0 ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Text>No states found</Text>
      )}
    </ScrollView>
  )
}

export default StateList
