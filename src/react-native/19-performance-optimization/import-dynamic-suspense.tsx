import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { Suspense, lazy } from "react"
import { SafeAreaView } from "react-native"

import Loading from "./components/Loading"
import Home from "./screens/Home"

const Analytics = lazy(() => import("./screens/Analytics"))

const AppTabs = createBottomTabNavigator()

const AnalyticsLazyLoaded: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Analytics />
    </Suspense>
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <NavigationContainer>
        <AppTabs.Navigator initialRouteName="Home">
          <AppTabs.Screen component={Home} name="Home" />
          <AppTabs.Screen component={AnalyticsLazyLoaded} name="Analytics" />
        </AppTabs.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
