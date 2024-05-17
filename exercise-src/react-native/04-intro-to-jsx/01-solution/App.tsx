import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const state = { name: "Illinois", short: "IL" }

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
        </View>
        <View>
          <Text>{state.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
