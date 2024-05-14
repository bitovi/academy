import Card from "../../design/Card"
import Screen from "../../design/Screen"
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
    </Screen>
  )
}

export default StateList
