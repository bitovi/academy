import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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
  // Exercise: Implement StateList component
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
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
