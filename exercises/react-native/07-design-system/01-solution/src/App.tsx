import type { FC } from "react"
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import StateList from "./screens/StateList"
import ThemeProvider from "./design/theme/ThemeProvider"

const App: FC = () => {
  return (
    <ThemeProvider>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>Place My Order: Coming Soon To...</Text>
          </View>
          <StateList />
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default App
