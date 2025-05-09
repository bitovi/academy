import Box from "@shared/design/Box"
import Typography from "@shared/design/Typography"
import { ScrollView, Text, View } from "react-native"

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
      <View>
        <Text>Place My Order: Coming Soon!</Text>
      </View>
      <View>
        {states?.length ? (
          states.map((state) => (
            <ListItem key={state.short} name={state.name} />
          ))
        ) : (
          <Text>No states found</Text>
        )}
      </View>
    </ScrollView>
  )
}

export default StateList
