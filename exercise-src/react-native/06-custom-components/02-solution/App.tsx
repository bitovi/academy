import type { FC } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"

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

export type ListItemProps = {
  key: string
  name: string
}

export const ListItem: FC<ListItemProps> = ({ name }) => {
  return <Text>{name}</Text>
}

export const StateList: FC = () => {
  return (
    <View>
      {states?.length > 0 ? (
        states.map((state) => <ListItem key={state.short} name={state.name} />)
      ) : (
        <Text>No states found</Text>
      )}
    </View>
  )
}

const App: FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
        </View>
        <StateList />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
