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

### What is navigation?

Navigation in React Native refers to the process of moving between different screens in our application. It helps users transition between various parts of your application through interactions like tapping on buttons, list rows, and other UI elements.

### Why is navigation important?

By introducing several screens in our application, it allows us to break down the user interface into smaller, more manageable parts. This makes our application easier to maintain and scale as it grows.

### Deep Linking

Although out of scope for this training, deep linking is a way to navigate to a specific screen or piece of content within your mobile application from an external source. For example, a user might click on a link in an email that opens a specific screen in your app. Deep linking is a powerful tool for user engagement and retention.

The React Navigation library used in this section supports deep linking and has a [guide](https://reactnavigation.org/docs/deep-linking/) on how to set up your application to be notified of incoming links.

### Navigation Lifecycle

Now that we have an understanding of how navigation works within a stack, let's take a look at the implications of navigation on the component lifecycle.

If we have a stack navigator with two screens, `ScreenA` and `ScreenB`, and navigate to `ScreenA`, then `ScreenA` will mount the component and render. If we then navigate to `ScreenB`, `ScreenA` will be unmounted and `ScreenB` will mount and render. What happens when we navigate back to `ScreenA`? `ScreenB` will unmount the component, but `ScreenA` will *not* remount. Because it stayed in the stack, it remained mounted the entier time.

### Bottom Tab Navigation

Tab navigation pattern is one of the most common navigation patterns used in both Android and iOS applications. It allows users to switch between different screens by tapping on tabs that are typically located at the bottom of the screen.

Often tabs in a mobile application are made up of more than just one screen. Tab navigation is often used in conjunction with stack navigation to allow for more complex navigation patterns. We will cover how to use React Navigation's stack navigation in the next section.

Here is an example of using tab-based navigation in React Native with React Navigation:

```tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function ScreenA() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen A</Text>
    </View>
  );
}

function ScreenB() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen A</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Screen A" component={ScreenA} />
        <Tab.Screen name="Screen B" component={ScreenB} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```
@highlight 3-4, 22, 26-31

Let's break down the code above:

### NavigationContainer

The `NavigationContainer` component is responsible for managing our app state and linking. This component handles the platform-specific (iOS, Android) navigation logic and provides functionality to: deep link, notify state changes, and handle back button presses.

### createBottomTabNavigator

The `createBottomTabNavigator` function creates a navigator that renders a tab bar at the bottom of the screen. The components returned from this function are the `Tab.Navigator` and `Tab.Screen` components which we use together to define our tab navigation.

The `Tab.Navigator` component takes `Tab.Screen` components as children. For each child, a tab button will be added to the tab bar at the bottom of the screen. The `Tab.Navigator` also has a set of props that can be used to customize the behavior of the tab bar. We can set the initial route with `initialRouteName`, specify the `backBehavior`, customize the styles through `screenOptions`, and more.

The `Tab.Screen` component takes a `name` prop that is used to identify the screen and a `component` prop that is used to render the screen. The `name` prop must be unique among all the screens in the navigator. Similar to the `Tab.Navigator`, we can pass an `options` prop to the `Tab.Screen` component to customize the title, label, icon, and other properties of the tab.

### Setup 1

✏️ Install the `@react-navigation/native` and `@react-navigation/bottom-tabs` package:

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
```

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

### Stacks

In mobile applications, navigation isn’t managed by the browser through URLs (like in web applications) but through navigation stacks. When a user navigates to a new screen, this screen is pushed onto the navigation stack. If the user navigates back, the current screen is popped off the stack, and the app returns to the previous screen.

*Note: A stack is a data structure that follows the Last In, First Out (LIFO) principle.*

React Native does not have a built-in global history stack similar to a web browser. Luckily, there is a library called React Navigation that provides a way to manage navigation in a stack-like manner.

### Stack vs Native Stack

The React Navigation library provides both a stack navigator as well as a native stack navigator. The native stack navigator uses the native APIs provided by the platform, `UINavigationController` on iOS and `Fragment` on Android. Because it is using the native APIs, it provides native performance and exposes native-specific features. Although the stack navigator is not as performant, it does provide several other benefits:

- Flexibility and Customization: The JS navigator offers more flexibility in customization. You can tweak animations, transitions, and behaviors directly in JavaScript, which can be advantageous if you need highly customized navigation flows that aren't easily achieved with native components.

- Simpler Setup and Debugging: Since JS navigators are implemented entirely in JavaScript, you don’t have to deal with native code, making setup, maintenance, and debugging generally simpler. This can speed up development, especially if your team specializes in JavaScript and does not have as much experience with native mobile development.

- Consistency Across Platforms: JS-based navigators can offer a more consistent look and feel across different platforms (Android and iOS), as the same JavaScript code controls the navigation on both platforms. This can be important for maintaining brand consistency or when you want to ensure the user experience is the same, regardless of the device.

### Performance

Both the stack navigator and tab navigator have an optional prop, `detachInactiveScreens`, that defaults to `true`. This boolean value indicates whether inactive screens (screens that are not currently visible) should be detached from the view hierarchy. This can improve performance by reducing the number of views that need to be rendered and maintained in memory.

### Stack Navigator

Let's take a look at an example of using a stack navigator in React Native with React Navigation.

```tsx
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="ScreenA"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="ScreenA"
        component={ScreenA}
        options={{
          title: 'Screen A',
        }}
      />
      <Stack.Screen
        name="ScreenB"
        component={ScreenB}
        options={{
          title: 'Screen B',
        }}
      />
      <Stack.Screen
        name="ScreenC"
        component={ScreenC}
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

### createStackNavigator

Similar to the `createBottomTabNavigator` function, the `createStackNavigator` function creates a navigator that renders a stack of screens. The components returned from this function are the `Stack.Navigator` and `Stack.Screen` components which we use together to define our stack navigation. Unlike the tab navigator, we do not need to wrap our stack navigator in a `NavigationContainer` component.

Just like the `Tab.Navigator`, the `Stack.Navigator` component takes `Stack.Screen` components as children.

The `initialRouteName` specified on the `Stack.Navigator` component is the name of the screen that should be displayed first when the navigator is rendered and it is also the first entry in the stack. When navigating to a new screen, such as `ScreenB`, `ScreenB` will be pushed onto the stack and become the active screen. Now, if we were to press the back button or use a gesture to navigate back, `ScreenB` would be popped off the stack and `ScreenA` would become the active screen again.

The `Stack.Navigator` also accepts a `screenOptions` prop that we can use to customize the appearance of the header. For example, if we would like to conditionally render a back button in the header, we could check the `navigation.canGoBack()` method inside of `screenOptions.header` and render a custom header with or without a back button.

Similar to the `Tab.Screen` component, we can customize the behavior of our `Stack.Screen` with an `options` prop. This prop allows us to customize the header title, card style, whether gestures are enabled, and more.

### Setup 2

✏️ Install the `@react-navigation/stack` package:

```bash
npm install @react-navigation/stack
```

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