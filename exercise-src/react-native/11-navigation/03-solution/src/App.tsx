import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from "react-native-vector-icons/Ionicons"

import Box from "@shared/design/Box"
import ThemeProvider, { useTheme } from "@shared/design/theme"
import Typography from "@shared/design/Typography"
import CityList from "./screens/CityList"
import RestaurantDetails from "./screens/RestaurantDetails"
import RestaurantList from "./screens/RestaurantList"
import Settings from "./screens/Settings"
import StateList from "./screens/StateList"

const RestaurantsStack = createStackNavigator()
const RestaurantsNavigator: React.FC = () => {
  return (
    <RestaurantsStack.Navigator
      initialRouteName="StateList"
      screenOptions={{
        header: ({ navigation }) => {
          if (!navigation.canGoBack()) return null

          return (
            <Pressable onPress={navigation.goBack}>
              <Box
                padding="m"
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Icon name="arrow-back" size={20} />
                <Typography variant="heading">Choose a location</Typography>
              </Box>
            </Pressable>
          )
        },
      }}
    >
      <RestaurantsStack.Screen name="StateList" component={StateList} />
      <RestaurantsStack.Screen name="CityList" component={CityList} />
      <RestaurantsStack.Screen
        name="RestaurantList"
        component={RestaurantList}
      />
      <RestaurantsStack.Screen
        name="RestaurantDetails"
        component={RestaurantDetails}
      />
    </RestaurantsStack.Navigator>
  )
}

const AppTabs = createBottomTabNavigator()
const AppNavigator: React.FC = () => {
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
          let icon = "settings"
          if (route.name === "Settings") {
            icon = focused ? "settings" : "settings-outline"
          } else if (route.name === "Restaurants") {
            icon = focused ? "restaurant" : "restaurant-outline"
          }

          return <Icon name={icon} size={20} color={color} />
        },
      })}
    >
      <AppTabs.Screen
        name="Restaurants"
        component={RestaurantsNavigator}
        options={{ title: "Place My Order" }}
      />
      <AppTabs.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </AppTabs.Navigator>
  )
}

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  )
}

export default App
