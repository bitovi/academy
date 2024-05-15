@page learn-react-native/offline-support Adding Offline Support
@parent learn-react-native 17
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Learn to listen for connection state

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

TODO

### Concept TODO

TODO

### Setup 2

TODO

### Verify 2

TODO

### Exercise 2

- Add offline-enabled favorite button to RestaurantDetails

- Toggle favorites in API, ignore no-network failures

- Toggle favorites locally

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

TODO

</details>

## Objective 3: Sync offline data when connectivity changes

TODO

### Concept TODO

TODO

### Setup 3

TODO

### Verify 3

TODO

### Exercise 3

- Create connectivity event listener, sync favorites to api

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

TODO

</details>

## Next steps

TODO
