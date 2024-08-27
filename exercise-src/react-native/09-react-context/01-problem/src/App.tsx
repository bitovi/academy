import { SafeAreaView } from "react-native"

import ThemeProvider from "./design/theme/ThemeProvider"
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
