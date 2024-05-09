@page learn-react-native/navigation Navigation in React Native
@parent learn-react-native 11
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Using React Native bottom tab navigation

TODO

### Concept TODO

TODO

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

TODO

### Concept TODO

TODO

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