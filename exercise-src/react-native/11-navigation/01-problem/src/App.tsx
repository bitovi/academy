import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaView } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

import ThemeProvider, { useTheme } from "./design/theme/ThemeProvider"
import Settings from "./screens/Settings"
import StateList from "./screens/StateList"

const AppTabs = createBottomTabNavigator()
export const AppNavigator: React.FC = () => {
  const theme = useTheme()

  return (
    <AppTabs.Navigator
      initialRouteName="RestaurantsStack"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.palette.screen.main,
        },
        headerTitleStyle: {
          color: theme.palette.screen.contrast,
          ...theme.typography.title,
        },
        tabBarStyle: {
          backgroundColor: theme.palette.screen.main,
        },
        tabBarActiveTintColor: theme.palette.primary.strong,
        tabBarInactiveTintColor: theme.palette.screen.contrast,
        tabBarIcon: ({ focused, color }) => {
          //Exercise: Update the Icon component’s name property based on the route
          return <Icon name={icon} size={20} color={color} />
        },
      })}
    >
      {/* Exercise: Add the Screens for both the Restaurants and Setting tabs. */}
    </AppTabs.Navigator>
  )
}

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
