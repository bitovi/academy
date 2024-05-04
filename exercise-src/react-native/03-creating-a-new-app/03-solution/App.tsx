import type React from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
