import { SafeAreaView } from "react-native"

import StateList from "./screens/StateList"

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StateList />
    </SafeAreaView>
  )
}

export default App
