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
