import type { FC } from "react"
import ListItem from "./components/ListItem"
import Screen from "../../design/Screen"
import Typography from "../../design/Typography"

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
      {states?.length > 0 ? (
        states.map((state) => <ListItem key={state.short} state={state} />)
      ) : (
        <Typography>No states found</Typography>
      )}
    </Screen>
  )
}

export default StateList
