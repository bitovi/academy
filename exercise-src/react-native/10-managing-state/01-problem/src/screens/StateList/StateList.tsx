import type { FC } from "react"
import ListItem from "./components/ListItem"
import Card from "../../design/Card"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"
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
  return (
    <Screen>
      <Card>
        <Typography variant="heading">
          Place My Order: Coming Soon To...
        </Typography>
      </Card>
      {states?.length > 0 ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Typography>No states found</Typography>
      )}
    </Screen>
  )
}

export default StateList
