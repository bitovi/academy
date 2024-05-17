import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaView } from "react-native"

import Analytics from "./screens/Analytics"
import Home from "./screens/Home"

const AppTabs = createBottomTabNavigator()

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <NavigationContainer>
        <AppTabs.Navigator initialRouteName="Home">
          <AppTabs.Screen component={Home} name="Home" />
          <AppTabs.Screen component={Analytics} name="Analytics" />
        </AppTabs.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
