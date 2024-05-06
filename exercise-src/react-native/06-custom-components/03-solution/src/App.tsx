import type { FC } from "react"
import { SafeAreaView } from "react-native"
import StateList from "./screens/StateList"

const App: FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ScrollView>
        <View>
          <Text>Place My Order: Coming Soon!</Text>
        </View>
        <StateList />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
