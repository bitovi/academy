import { StyleSheet, Switch, View } from "react-native"

import Card from "@shared/design/Card"
import Screen from "@shared/design/Screen"
import { useThemeMode } from "@shared/design/theme"
import Typography from "@shared/design/Typography"

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
