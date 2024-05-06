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

const StateList: FC = () => {
  return (
    <ScrollView>
      <View>
        <Text>Place My Order: Coming Soon To...</Text>
      </View>
      {states?.length > 0 ? (
        states.map((state) => <Text key={state.short}>{state.name}</Text>)
      ) : (
        <Text>No states found</Text>
      )}
    </ScrollView>
  )
}

const App: FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <StateList />
    </SafeAreaView>
  )
}

export default App
