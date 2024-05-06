import type { FC } from "react"
import { View, Text } from "react-native"
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
  console.log('Hello World');
  debugger

  return (
    <View>
      {states?.length > 0 ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Text>No states found</Text>
      )}
    </View>
  )
}

export default StateList
