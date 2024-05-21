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
          {/* Exercise: Update the existing JSX to render the list of state names.
          Use `Array.map()` to iterate over the `states`.
          Make sure to use `key` inside the `.map()`. */}
          <Text>Illinois</Text>
          {/* Exercise: Render `<Text>No states found</Text>` if, hypothetically, there weren’t any states. */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
