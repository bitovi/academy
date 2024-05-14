import { Switch } from "react-native"

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
  const { mode, setMode } = useThemeMode()

  return (
    <Screen>
      <Card>
        <Typography variant="heading">
          Place My Order: Coming Soon To...
        </Typography>
      </Card>
      {states?.length ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Typography>No states found</Typography>
      )}
      <Card>
        <Typography variant="heading">Dark Mode</Typography>
        <Switch
          value={mode === "dark"}
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
        />
      </Card>
    </Screen>
  )
}

export default StateList
