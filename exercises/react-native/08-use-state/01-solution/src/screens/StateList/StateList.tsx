import type { FC } from "react"
import ListItem from "./components/ListItem"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
import Card from "../../design/Card"
import { useThemeMode } from "../../design/theme"
import { Switch } from "react-native"

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

const StateList: FC = () => {
  const { mode, setMode } = useThemeMode()

  return (
    <Screen>
      <Card>
        <Typography variant="heading">
          Place My Order: Coming Soon To...
        </Typography>
      </Card>
      {states?.length > 0 ? (
        states.map((state) => <ListItem key={state.short} state={state} />)
      ) : (
        <Typography>No states found</Typography>
      )}
      <Card>
        <Typography variant="heading">
          Dark Mode
        </Typography>
        <Switch value={mode === "dark"} onChange={() => setMode(mode === "light" ? "dark" : "light")}/>
      </Card>
    </Screen>
  )
}

export default StateList
