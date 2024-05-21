import { SafeAreaView, ScrollView, Text, View } from "react-native"

const state = { name: "Illinois", short: "IL" }

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
