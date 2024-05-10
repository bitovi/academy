@page learn-react-native/navigation-params Storing State in Navigation Parameters
@parent learn-react-native 12
@outline 3

@description Maintain the React state with React Native Navigation Parameters

@body

## Overview

In this section, you will:

- Strongly type the navigation parameters of an application.
- Maintain and pass the state using route params through navigation.

## Objective 1: Intro to navigation parameters

Now that we've already successfully added navigation between our different screen components, our new goal is to pass information between each screen.

### Parameter list

The 

@sourceref ./Stack.tsx
@highlight 1, 5, only

### Setup 1

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/03-solution/src/App.tsx ../../../exercises/react-native/12-navigation-params/01-problem/src/App.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/03-solution/src/screens/StateList/StateList.tsx ../../../exercises/react-native/12-navigation-params/01-problem/src/screens/StateList/StateList.tsx only

### Verify 1

✏️ Update **src/screens/StateList/StateList.test.tsx** to be:

@diff ../../../exercises/react-native/11-navigation/03-solution/src/screens/StateList/StateList.test.tsx ../../../exercises/react-native/12-navigation-params/01-problem/src/screens/StateList/StateList.test.tsx only

### Exercise 1

- Update the typing of `StateList` component, using the type `Props` made by the `StackScreenProps`.
- Update the `navigation.navigate` to accept `stateItem` as a parameter.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/01-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/12-navigation-params/01-solution/src/screens/StateList/StateList.tsx only

</details>

## Objective 2: Implement city and restaurant params

### Setup 2

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/01-solution/src/App.tsx ../../../exercises/react-native/12-navigation-params/02-problem/src/App.tsx only

✏️ Update **src/screens/CityList/CityList.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/01-solution/src/screens/CityList/CityList.tsx ../../../exercises/react-native/12-navigation-params/02-problem/src/screens/CityList/CityList.tsx only

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/01-solution/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/12-navigation-params/02-problem/src/screens/RestaurantList/RestaurantList.tsx only

### Verify 2

✏️ Update **src/screens/CityList/CityList.test.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/01-solution/src/screens/CityList/CityList.test.tsx ../../../exercises/react-native/12-navigation-params/02-problem/src/screens/CityList/CityList.test.tsx only

✏️ Update **src/screens/RestaurantList/RestaurantList.test.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/01-solution/src/screens/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-native/12-navigation-params/02-problem/src/screens/RestaurantList/RestaurantList.test.tsx only

### Exercise 2

For both the `CityList` and `RestaurantList` components:

- Update the the typing of each component to use the given `Props`.
- Destructure the `route` of for each component, to fetch its stored state.
- Update the `navigation.navigate` to accept the necessary parameters.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/CityList/CityList.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/02-problem/src/screens/CityList/CityList.tsx ../../../exercises/react-native/12-navigation-params/02-solution/src/screens/CityList/CityList.tsx only

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/12-navigation-params/02-problem/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/12-navigation-params/02-solution/src/screens/RestaurantList/RestaurantList.tsx only

</details>

## Next steps

Next, we'll cover an essential part of nearly all web applications: [Making HTTP Requests](./making-http-requests.html).