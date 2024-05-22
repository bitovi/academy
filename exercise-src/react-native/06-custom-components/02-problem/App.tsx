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

export interface ListItemProps {
  // Exercise: Update the `ListItemProps` type to enforce a `key` and `name` property of the appropriate primitive type.
}

export const ListItem: React.FC = () => {
  // Exercise: Update the `ListItem` component to use the `ListItemProps` as its input type and return the `name` property of the a `state` index.
}

export const StateList: React.FC = () => {
  // Exercise: Update the `StateList` component to use the `ListItem` component handle each state index.
  return (
    <ScrollView>
      <View>
        <Text>Place My Order: Coming Soon!</Text>
      </View>
      <View>
        {states?.length ? (
          states.map((state) => <Text key={state.short}>{state.name}</Text>)
        ) : (
          <Text>No states found</Text>
        )}
      </View>
    </ScrollView>
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StateList />
    </SafeAreaView>
  )
}

export default App
