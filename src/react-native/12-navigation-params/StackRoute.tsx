import { createStackNavigator } from "@react-navigation/stack"

export type ShopStackParamList = {
  Home: undefined
  UserProfile: {
    user: {
      firstName: string
      lastName: string
      email: string
    }
    theme: "dark" | "light"
  }
  Storefront: {
    user: {
      firstName: string
      lastName: string
      email: string
    }
    slug: string
    favorites: string[]
  }
}

const ShoppingStack = createStackNavigator<ShopStackParamList>()

const ShopApp = () => {
  return (
    <ShoppingStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
      }}
    >
      <ShoppingStack.Screen name="Home" component={Home} />
      <ShoppingStack.Screen name="UserProfile" component={UserProfile} />
      <ShoppingStack.Screen name="Storefront" component={Storefront} />
    </ShoppingStack.Navigator>
  )
}
