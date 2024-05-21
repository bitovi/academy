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

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
        </View>
        <View>
          <Text>{states[0].name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
