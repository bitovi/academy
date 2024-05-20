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
  return (
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
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StateList />
    </SafeAreaView>
  )
}

export default App
