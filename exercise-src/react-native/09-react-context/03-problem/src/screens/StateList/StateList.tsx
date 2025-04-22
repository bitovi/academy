import Box from "@shared/design/Box"
import Card from "@shared/design/Card"
import Screen from "@shared/design/Screen"
import Typography from "@shared/design/Typography"
import { ScrollView } from "react-native"

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
    <ScrollView>
      <Box padding="s">
        <Typography variant="heading">Place My Order: Coming Soon!</Typography>
      </Box>
      {states?.length ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Typography>No states found</Typography>
      )}
    </ScrollView>
  )
}

export default StateList
