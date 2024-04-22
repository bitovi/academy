import type { FC } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import StateList from "./screens/StateList"

const App: FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon To...</Text>
        </View>
        <StateList />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
