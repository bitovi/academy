import { StyleSheet, Switch, View } from "react-native"

import Card from "../../design/Card"
import Screen from "../../design/Screen"
import { useThemeMode } from "../../design/theme"
import Typography from "../../design/Typography"

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
  const { mode, setMode } = useThemeMode()

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

      <Card>
        <View style={styles.row}>
          <Typography variant="heading">Dark mode</Typography>
          <Switch
            onValueChange={(value) => setMode(value ? "dark" : "light")}
            value={mode === "dark"}
          />
        </View>
      </Card>
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
