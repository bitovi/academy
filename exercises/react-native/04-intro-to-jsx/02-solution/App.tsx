import type { JSX } from "react"
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

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon To...</Text>
        </View>
        <View>
          {states?.length > 0 ? (
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
