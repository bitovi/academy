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
  // Exercise: Update the `ListItemProps` type to enforce a `name` prop of the appropriate primitive type.
}

export const ListItem: React.FC = () => {
  // Exercise: Update the `ListItem` component to use the `ListItemProps` and return the `<Text>` element.
}

export const StateList: React.FC = () => {
  // Exercise: Update the `StateList` component to use the `ListItem` component handle each state item.
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
