import type { JSX } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"

const state = { name: "Illinois", short: "IL" }

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon To...</Text>
        </View>
        <View>
          <Text>{state.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
