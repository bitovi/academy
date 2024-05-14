import { SafeAreaView } from "react-native"
import StateList from "./screens/StateList"
import ThemeProvider from "./design/theme/ThemeProvider"

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ThemeProvider>
        <StateList />
      </ThemeProvider>
    </SafeAreaView>
  )
}

export default App
