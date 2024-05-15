@page learn-react-native/offline-support Adding Offline Support
@parent learn-react-native 17
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Learn to listen for connection state

<img alt="Screenshot of the application settings page with the connection status." src="../static/img/react-native/17-offline-support/01-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### Concept TODO

TODO

### Setup 1

✏️ Run:

```bash
npm install @react-native-community/netinfo@11
```

✏️ Update **jest-setup.ts** to be:

@diff ../../../exercises/react-native/16-security/01-solution/jest-setup.ts ../../../exercises/react-native/17-offline-support/01-problem/jest-setup.ts only

✏️ Update **src/screens/Settings/Settings.tsx** to be:

@diff ../../../exercises/react-native/16-security/01-solution/src/screens/Settings/Settings.tsx ../../../exercises/react-native/17-offline-support/01-problem/src/screens/Settings/Settings.tsx only

✏️ Create **src/services/pmo/favorite/favorite.tsx** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/01-solution/src/services/pmo/favorite/favorite.tsx

✏️ Create **src/services/pmo/favorite/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/01-solution/src/services/pmo/favorite/index.ts

### Verify 1

TODO

### Exercise 1

- Use NetInfo to determine connection state

- Display message on Settings when offline

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/Settings/Settings.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/01-problem/src/screens/Settings/Settings.tsx ../../../exercises/react-native/17-offline-support/01-solution/src/screens/Settings/Settings.tsx only

✏️ Update **src/services/pmo/favorite/favorite.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/01-problem/src/services/pmo/favorite/favorite.tsx ../../../exercises/react-native/17-offline-support/01-solution/src/services/pmo/favorite/favorite.tsx only

</details>

## Objective 2: Use local storage to store restaurant favorites

<div style="display: flex; flex-direction: row; gap: 2rem">
  <img alt="Screenshot of the application's Restaurant Details screen displaying the add favorite button." src="../static/img/react-native/17-offline-support/02-solution-addFavorites.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>
  <img alt="Screenshot of the application's Restaurant Details screen displaying the remove favorite button." src="../static/img/react-native/17-offline-support/02-solution-removeFavorites.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>
</div>

### Concept TODO

TODO

### Setup 2

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/01-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/17-offline-support/02-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx only

✏️ Create **src/services/pmo/favorite/hooks.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts

✏️ Create **src/services/pmo/favorite/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/index.ts

### Verify 2

✏️ Create **src/services/pmo/favorite/hooks.test.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.test.ts

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.test.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/01-solution/src/screens/RestaurantDetails/RestaurantDetails.test.tsx ../../../exercises/react-native/17-offline-support/02-problem/src/screens/RestaurantDetails/RestaurantDetails.test.tsx only

### Exercise 2

- Add offline-enabled favorite button to RestaurantDetails

- Toggle favorites in API, ignore no-network failures

- Toggle favorites locally

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/02-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/17-offline-support/02-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx only

✏️ Update **src/services/pmo/favorite/hooks.ts** to be:

@diff ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts ../../../exercises/react-native/17-offline-support/02-solution/src/services/pmo/favorite/hooks.ts only

</details>

## Objective 3: Sync offline data when connectivity changes

### Concept TODO

TODO

### Setup 3

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/02-solution/src/App.tsx ../../../exercises/react-native/17-offline-support/03-problem/src/App.tsx only

✏️ Update **src/services/pmo/favorite/hooks.ts** to be:

@diff ../../../exercises/react-native/17-offline-support/02-solution/src/services/pmo/favorite/hooks.ts ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/hooks.ts only

✏️ Update **src/services/pmo/favorite/favorite.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/02-solution/src/services/pmo/favorite/favorite.tsx ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/favorite.tsx only


### Verify 3

✏️ Update **src/services/pmo/favorite/hooks.test.ts** to be:

@diff ../../../exercises/react-native/17-offline-support/02-solution/src/services/pmo/favorite/hooks.test.ts ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/hooks.test.ts only


### Exercise 3

- Create connectivity event listener, sync favorites to api

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/pmo/favorite/favorite.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/favorite.tsx ../../../exercises/react-native/17-offline-support/03-solution/src/services/pmo/favorite/favorite.tsx only

</details>

## Next steps

Next, we will learn about [learn-react-native/google-maps] to our application.

