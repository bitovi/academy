import type { FC } from "react"
import { SafeAreaView, ScrollView, View } from "react-native"
import StateList from "./screens/StateList"
import ThemeProvider from "./design/theme/ThemeProvider"
import Typography from "./design/Typography"

const App: FC = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView>
          <View>
            <Typography variant="heading">
              Place My Order: Coming Soon To...
            </Typography>
            <StateList />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default App
