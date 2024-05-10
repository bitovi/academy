import type { FC } from "react"
import { Pressable, SafeAreaView } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/Ionicons"

import ThemeProvider, { useTheme } from "./design/theme/ThemeProvider"
import StateList from "./screens/StateList"
import Settings from "./screens/Settings"
import RestaurantDetails from "./screens/RestaurantDetails"
import RestaurantList from "./screens/RestaurantList"
import RestaurantOrder from "./screens/RestaurantOrder"
import CityList from "./screens/CityList"
import Box from "./design/Box"
import Typography from "./design/Typography"
import { createStackNavigator } from "@react-navigation/stack"
import DataMigration from "./services/DataMigration"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RestaurantsStackParamList {}
  }
}

export type RestaurantsStackParamList = {
  StateList: undefined
  CityList: {
    state: {
      name: string
      short: string
    }
  }
  RestaurantList: {
    state: {
      name: string
      short: string
    }
    city: {
      name: string
      state: string
    }
  }
  RestaurantDetails: {
    state: {
      name: string
      short: string
    }
    city: {
      name: string
      state: string
    }
    slug: string
  }
  OrderCreate: {
    slug: string
  }
}

const RestaurantsStack = createStackNavigator<RestaurantsStackParamList>()
const RestaurantsNavigator: FC = () => {
  return (
    <RestaurantsStack.Navigator
      initialRouteName="StateList"
      screenOptions={{
        header: ({ route, navigation }) => {
          if (!navigation.canGoBack()) return null

          return (
            <Pressable onPress={navigation.goBack}>
              <Box
                padding="m"
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Icon name="arrow-back" size={20} />
                <Typography variant="heading">
                  {/* @ts-ignore */}
                  {[route.params?.city?.name, route.params?.state?.name]
                    .filter(Boolean)
                    .join(", ")}
                </Typography>
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
      <RestaurantsStack.Screen name="OrderCreate" component={RestaurantOrder} />
    </RestaurantsStack.Navigator>
  )
}

const AppTabs = createBottomTabNavigator()
export const AppNavigator: FC = () => {
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

const App: FC = () => {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ThemeProvider>
        <DataMigration>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </DataMigration>
      </ThemeProvider>
    </SafeAreaView>
  )
}

export default App
