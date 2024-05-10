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

export const StateList: FC = () => {
  // Exercise: Implement StateList component
}

const App: FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
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
