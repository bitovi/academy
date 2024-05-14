import { ScrollView } from "react-native"
import ListItem from "./components/ListItem"
import Box from "../../design/Box"
import Typography from "../../design/Typography"

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
        <Typography variant="heading">
          Place My Order: Coming Soon To...
        </Typography>
      </Box>
      {states?.length > 0 ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Typography>No states found</Typography>
      )}
    </ScrollView>
  )
}

export default StateList
