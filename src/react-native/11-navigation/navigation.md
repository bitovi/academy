@page learn-react-native/navigation Navigation in React Native
@parent learn-react-native 11
@outline 3

@description Learn how to use navigation to move between screens in a React Native app.

@body

## Overview

In this section, you will:

- Understand why routing is important
- Be introduced to deep linking
- Learn about stack-based routing
- Understand the navigation lifecycle
- Implement a bottom tab navigation pattern
- Learn about the difference between stack and native stack navigation
- Implement a stack navigation pattern

## Objective 1: Using React Native bottom tab navigation

As our application grows in complexity, more screens will be added. The React Navigation library provides a solution that allows us to move between these screens. In this section, we will cover both common navigation patterns used in both Android and iOS applications: tab navigation and stack navigation.

The first step is to install the React Navigation library. Run the following command in your terminal:

```bash
npm install @react-navigation/native
```

### What is routing?

Routing in React Native refers to the process of managing navigation between different screens in our application. It allows users to move between different parts of our application by clicking on links, buttons, or other interactive elements.

### Why is routing important?

By introducing several screens in our application, it allows us to break down the user interface into smaller, more manageable parts. This makes our application easier to maintain and scale as it grows.

### Deep Linking

Although out of scope for this training, deep linking is a way to navigate to a specific screen or piece of content within your mobile application from an external source. For example, a user might click on a link in an email that opens a specific screen in your app. Deep linking is a powerful tool for user engagement and retention.

The React Navigation library used in this section supports deep linking and has a [guide](https://reactnavigation.org/docs/deep-linking/) on how to set up your application to be notified of incoming links.

### Stacks

In a web application, routing is typically done through anchor tags. Whenever a user clicks on a link, the URL is pushed to the browser history stack. When the user presses the back button, the browser pops the last URL and navigates to the previously visited page.

*Note: A stack is a data structure that follows the Last In, First Out (LIFO) principle.*

React Native does not have a built-in global history stack similar to a web browser. Luckily, there is a library called React Navigation that provides a way to manage navigation in a stack-like manner.

### Navigation Lifecycle

Now that we have an understanding of how navigation works within a stack, let's take a look at the implications of navigation on the component lifecycle.

If we have a stack navigator with two screens, `ScreenA` and `ScreenB`, and navigate to `ScreenA`, then `ScreenA` will mount the component and render. If we then navigate to `ScreenB`, `ScreenA` will be unmounted and `ScreenB` will mount and render. What happens when we navigate back to `ScreenA`? `ScreenB` will unmount the component, but `ScreenA` will *not* remount. Because it stayed in the stack, it remained mounted the entier time.

### Bottom Tab Navigation

Tab navigation pattern is one of the most common navigation patterns used in both Android and iOS applications. It allows users to switch between different screens by tapping on tabs that are typically located at the bottom of the screen.

Often tabs in a mobile application are made up of more than just one screen. Tab navigation is often used in conjunction with stack navigation to allow for more complex navigation patterns. We will cover how to use React Navigation's stack navigation in the next section.

First, let's setup our application to use tab navigation in from React Navigation. To do this, we will install the `@react-navigation/bottom-tabs` package:

```bash
npm install @react-navigation/bottom-tabs
```

Here is an example of using tab-based navigation in React Native with React Navigation:

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```
@highlight 3-4, 22, 26-31

Let's break down the code above:

**NavigationContainer**

The `NavigationContainer` component is responsible for managing our app state and linking. This component handles the platform-specific (iOS, Android) navigation logic and provides functionality to: deep link, notify state changes, and handle back button presses.

**createBottomTabNavigator**

The `createBottomTabNavigator` function creates a navigator that renders a tab bar at the bottom of the screen. The components returned from this function are the `Tab.Navigator` and `Tab.Screen` components which we use together to define our tab navigation.

### Setup 1

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/10-managing-state/01-solution/src/App.tsx ../../../exercises/react-native/11-navigation/01-problem/src/App.tsx only

✏️ Create **src/screens/Settings/Settings.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/01-problem/src/screens/Settings/Settings.tsx

✏️ Create **src/screens/Settings/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/01-problem/src/screens/Settings/index.ts

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/10-managing-state/01-solution/src/screens/StateList/StateList.tsx ../../../exercises/react-native/11-navigation/01-problem/src/screens/StateList/StateList.tsx

### Verify 1

✏️ Create **src/screens/Settings/Settings.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/01-problem/src/screens/Settings/Settings.test.tsx

### Exercise 1

- For the `tabBarIcon` property on `AppTabs.Navigator` update the `Icon` component's name property to be based on the given route.
- Add a screen tab for Restaurants (for the `StateList` component) and for `Settings` component.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/01-problem/src/App.tsx ../../../exercises/react-native/11-navigation/01-solution/src/App.tsx only

</details>

## Objective 2: Using React Native stack navigation

Now that we've covered tab navigation, let's move on to stack navigation. As mentioned in the previous section, most applications use a combination of both tab and stack navigation to create a seamless user experience.

### Stack vs Native Stack

The React Navigation library provides both a stack navigator as well as a native stack navigator. The native stack navigator uses the native APIs provided by the platform, `UINavigationController` on iOS and `Fragment` on Android. Because it is using the native APIs, it provides native performance and exposes native-specific features. Although the stack navigator is not as performant, it is an easier-to-use, more customizable, JavaScript-based alternative.

### Performance

Both the stack navigator and tab navigator have an optional prop, `detachInactiveScreens`, that defaults to `true`. This boolean value indicates whether inactive screens (screens that are not currently visible) should be detached from the view hierarchy. This can improve performance by reducing the number of views that need to be rendered and maintained in memory.

### Stack Navigator

Let's take a look at an example of using a stack navigator in React Native with React Navigation:

```tsx
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Awesome app',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My profile',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
```
@highlight 1, 3, 7-36

Let's break down the code above:

**createStackNavigator**

Similar to the `createBottomTabNavigator` function, the `createStackNavigator` function creates a navigator that renders a stack of screens. The components returned from this function are the `Stack.Navigator` and `Stack.Screen` components which we use together to define our stack navigation. Unlike the tab navigator, we do not need to wrap our stack navigator in a `NavigationContainer` component.

### Setup 2

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/01-solution/src/App.tsx ../../../exercises/react-native/11-navigation/02-problem/src/App.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/01-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/11-navigation/02-problem/src/screens/StateList/StateList.tsx only

✏️ Create **src/screens/CityList/CityList.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/02-problem/src/screens/CityList/CityList.tsx

✏️ Create **src/screens/CityList/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/02-problem/src/screens/CityList/index.ts

### Verify 2

✏️ Create **src/screens/CityList/CityList.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/02-problem/src/screens/CityList/CityList.tsx

### Exercise 2

- Using `RestaurantsStack` implement a `Navigator` with two screens, one for `StateList` and one for `CityList`.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/02-problem/src/App.tsx ../../../exercises/react-native/11-navigation/02-solution/src/App.tsx only

</details>

## Objective 3: Add Restaurant List and Restaurant Details pages with links

### Setup 3

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/03-solution/src/App.tsx ../../../exercises/react-native/11-navigation/03-problem/src/App.tsx only

✏️ Create **src/components/RestaurantHeader/** (folder)

✏️ Create **src/components/RestaurantHeader/RestaurantHeader.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/components/RestaurantHeader/RestaurantHeader.tsx

✏️ Create **src/components/RestaurantHeader/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/components/RestaurantHeader/index.ts

✏️ Create **src/screens/RestaurantDetails/** (folder)

✏️ Create **src/screens/RestaurantDetails/RestaurantDetails.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx

✏️ Create **src/screens/RestaurantDetails/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/screens/RestaurantDetails/index.ts

✏️ Create **src/screens/RestaurantList/** (folder)

✏️ Create **src/screens/RestaurantList/RestaurantList.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/screens/RestaurantList/RestaurantList.tsx

✏️ Create **src/screens/RestaurantList/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/screens/RestaurantList/index.ts

### Verify 3

✏️ Create **src/components/RestaurantHeader/RestaurantHeader.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/components/RestaurantHeader/RestaurantHeader.test.tsx

✏️ Create **src/screens/RestaurantDetails/RestaurantDetails.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/screens/RestaurantDetails/RestaurantDetails.test.tsx

✏️ Create **src/screens/RestaurantList/RestaurantList.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/11-navigation/03-problem/src/screens/RestaurantList/RestaurantList.test.tsx


### Exercise 3

- Add `RestaurantList` and `RestaurantDetails` to the `StackNavigator`
- Use `navigation` in the `RestaurantList` component, to link `RestaurantList` to the `RestaurantDetails` screen.

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/03-problem/src/App.tsx ../../../exercises/react-native/11-navigation/03-solution/src/App.tsx only

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/03-problem/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/11-navigation/03-solution/src/screens/RestaurantList/RestaurantList.tsx only

</details>

## Next steps

Now that we understand how to use React Native Navigation, we'll supplement that knowledge by [storing state in Navigation Parameters](./storing-state.html).