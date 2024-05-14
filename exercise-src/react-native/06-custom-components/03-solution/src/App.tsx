import { SafeAreaView } from "react-native"

import StateList from "./screens/StateList"

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <StateList />
    </SafeAreaView>
  )
}

export default App
