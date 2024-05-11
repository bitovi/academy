@page learn-react-native/storing-state Storing State in Navigation Parameters
@parent learn-react-native 12
@outline 3

@description Maintain the React state with React Native Navigation Parameters

@body

## Overview

In this section, you will:

- Strongly type the navigation parameters of an application.
- Maintain and pass the state using route params through navigation.

## Objective 1: Intro to navigation parameters

Now that we've successfully implemented React Navigation in our application, we can navigate between screens easily. The only remaining issue is that we lack away to pass information, or state, between screens. So, our new goal for this section is passing state between screens using navigation parameters.

### Navigation Parameters

As mentioned in the previous section, since our React Native application isn't navigated through URLs, we aren't able to pass the parameters through a URL. Instead, we'll be using the Stack we've already made.

@sourceref ./StackRoute.tsx
@highlight 4-23, 25

Before we get into using `route` on each `Screen` of the `Navigator`, considering we're using TypeScript, we need to make an effort to make sure the properties for each component are properly typed. For this, we will create a type, `ShopStackParamList`.

For each screen we will type the expected properties that will be passed along each route. The `Home` in this case doesn't expect any parameters to be passed to it, so we leave it undefined. The `UserProfile` and `Storefront` contain a few properties.

Now, our `createStackNavigator` includes a type we've made `ShopStackParamList`. Because of this, now if we provide our screen components `Props` as route params, TypeScript will be able to able to identify what parameters are accessible from the components `route.params`.

While the `route` is accessible from the `Navigator`, is also accessible from the component that is being navigated to through props.

@sourceref ./RouteParams.tsx
@highlight 8, 11, 17, 21

To make sure the `Props` for our component match up to what we have for our `StackNavigator`, we can import the type we made and reference the `UserProfile` properties specifically.

As you can see, in the `UserProfile` component, we can access the `route.params` of the component if any are provided. We grab the `user`, and are able to use it's properties throughout the component. 

This includes passing the state of `user` through `navigation`. We can add `user`, and other properties as an object for the second argument of `navigation.navigate`. Thus on the `Storefront` screen, all of those params passed will be accessible within its component.

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