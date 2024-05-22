import { StyleSheet, Switch, View } from "react-native"

import Card from "../../design/Card"
import Screen from "../../design/Screen"
import { useThemeMode } from "../../design/theme"
import Typography from "../../design/Typography"

import ListItem from "./components/ListItem"

export type State = {
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

const StateList: React.FC = () => {
  // Exercise: Display the Switch component to allow users to toggle.

  return (
    <Screen>
      <Card>
        <Typography variant="heading">Place My Order: Coming Soon!</Typography>
      </Card>
      {states?.length ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Typography>No states found</Typography>
      )}
      {/* Exercise: Using the recently created `useThemeMode` Hook, combine it with the `Switch` component. */}
    </Screen>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export default StateList
