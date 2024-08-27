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

export const StateList: React.FC = () => {
  // Exercise: Update the `StateList` component to contain the logic that iterates over the `states` list.
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
        </View>
        <View>
          {/* Exercise: Use the new `StateList` component inside of the `App` component. */}
          {states?.length ? (
            states.map((state) => <Text key={state.short}>{state.name}</Text>)
          ) : (
            <Text>No states found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
