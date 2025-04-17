import { SafeAreaView } from "react-native"

import ThemeProvider from "@shared/design/theme"
import StateList from "./screens/StateList"

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <StateList />
      </ThemeProvider>
    </SafeAreaView>
  )
}

export default App
