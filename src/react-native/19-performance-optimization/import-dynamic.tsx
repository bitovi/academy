import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native"

import Home from "./screens/Home"

const Analytics: React.FC = () => {
  const [analyticsView, setAnalyticsView] = useState(null)

  useEffect(() => {
    async function loadView() {
      const analyticsModule = await import("./screens/Analytics")
      if (analyticsModule.default) {
        setAnalyticsView(analyticsModule.default)
      }
    }
    loadView()
  }, [])

  if (!analyticsView) {
    return <Loading />
  }

  return analyticsView
}

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
