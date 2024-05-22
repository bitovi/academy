import { ScrollView } from "react-native"

import Box from "../../design/Box"
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
