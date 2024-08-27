@page learn-react-native/offline-support Adding Offline Support
@parent learn-react-native 17
@outline 3

@description Learn device-first strategies for storing data and syncing it to a server.

@body

## Overview

In this section, you will:

- Listen for changes to the network connection state.
- Make an API call when the user signs in.
- Design offline-syncing behavior.
- Sync data between the device and server.

## Objective 1: Show the current connection status

Most mobile applications use a network connection for critical functionality.
It’s important to communicate to the user when their device is offline and some functionality in the application may be disabled because of their current connection status.

The way you communicate this info will depend on your application.
In ours, we’re going to add some text to the Settings view that shows the current connection status.

<img alt="Screenshot of the application settings page with the connection status." src="../static/img/react-native/17-offline-support/01-solution.png" style="border: 4px solid black; border-radius: 25px;" height="640"/>

### Listening for the network connection state

The `@react-native-community/netinfo` is an incredible useful package for detecting the network status of the device.

This package allows you to:

- Detect whether the device is connected to the internet.
- Determine the type of network connection (WiFi, cellular, etc.).
- React to changes in the network status, allowing the app to adapt accordingly.

### Getting the current connection state

The `useNetInfo` Hook provided by the package simplifies the process of accessing network state information in functional components.
This Hook returns an object containing details about the network status.

@sourceref ./isConnected.tsx
@highlight 1, 6, 10, only

### Setup 1

✏️ Install the new dependency:

```bash
npm install @react-native-community/netinfo@11
```

✏️ Create **@types/@react-native-community/netinfo/jest/netinfo-mock.d.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/01-problem/@types/@react-native-community/netinfo/jest/netinfo-mock.d.ts
@highlight 1

✏️ Update **jest-setup.ts** to be:

@diff ../../../exercises/react-native/16-security/01-solution/jest-setup.ts ../../../exercises/react-native/17-offline-support/01-problem/jest-setup.ts only

✏️ Terminate the existing dev server and start it again:

```bash
npm run start
```

✏️ Update **src/screens/Settings/Settings.tsx** to be:

@diff ../../../exercises/react-native/16-security/01-solution/src/screens/Settings/Settings.tsx ../../../exercises/react-native/17-offline-support/01-problem/src/screens/Settings/Settings.tsx only

### Verify 1

✏️ Update **src/screens/Settings/Settings.test.tsx** to be:

@diff ../../../exercises/react-native/16-security/01-solution/src/screens/Settings/Settings.test.tsx ../../../exercises/react-native/17-offline-support/01-problem/src/screens/Settings/Settings.test.tsx only

### Exercise 1

- Get the current connection state with the `useNetInfo()` Hook.
- Display the connection state in the Settings view.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/Settings/Settings.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/01-problem/src/screens/Settings/Settings.tsx ../../../exercises/react-native/17-offline-support/01-solution/src/screens/Settings/Settings.tsx only

</details>

## Objective 2: Store restaurant favorites on device

Now that you can detect when the device is online or offline, let’s build a feature that can work offline!

Let’s add the ability to “favorite” a restaurant.
In the `RestaurantDetails`, we’ll add an “Add to favorites” button when the user is signed in, and if they favorite a restaurant, we’ll change it to “Remove from favorites.”

For right now, we’ll write the code for adding and removing favorites in a way that will gracefully handle the user’s device being offline.
In the third objective, we’ll expand that to handle syncing when the device comes back online.

<div style="display: flex; flex-direction: row; gap: 2rem; flex-wrap: wrap;">
  <img alt="Screenshot of the application's Restaurant Details screen displaying the add favorite button." src="../static/img/react-native/17-offline-support/02-solution-addFavorites.png" style="border: 4px solid black; border-radius: 25px;" height="640"/>
  <img alt="Screenshot of the application's Restaurant Details screen displaying the remove favorite button." src="../static/img/react-native/17-offline-support/02-solution-removeFavorites.png" style="border: 4px solid black; border-radius: 25px;" height="640"/>
</div>

### Defining the “favorites” feature

There’s a lot that goes into building even a one or two-button feature like the “add to favorites” and “remove from favorites” feature that we’re about to build.

Let’s think through what we want in the restaurant details view:

- When the user is not signed in or they haven’t added the restaurant as a favorite, there should be an “Add to favorites” button.
- When the user has added the restaurant as a favorite, there should be a “Remove from favorites” button.
- When the “Add” button is clicked and the user is not signed in, they should be sent through the sign-in flow.
- When the “Add” or “Remove” buttons are clicked and the user is signed in, that change should immediately be saved in our Async Storage and sent to the API.
- If there’s a problem with the API call (the server is down, the device is offline, etc.), then the change should still be saved to Async Storage.

Features like this are great to build into Hooks because it makes the logic more easily testable and reusable.
Let’s look at the Hook code we are going to copy in the Setup step for this exercise.

### Creating a `useFavorite()` Hook

Our `useFavorite()` Hook will accept two arguments:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts
@highlight 8-11, only

You’ll remember that the Rules of Hooks state that Hooks must always be called at the top level of a component, so this Hook makes these properties optional because, for example, you may not be signed in (and thus won’t have a `userId`).

### Determining if a restaurant is a favorite

The Hook will return a `true` or `false` value for `isFavorite`, depending on whether the restaurant is a favorite:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts
@highlight 13, 32-35, 110, only

### Getting favorites from storage

The Hook gets all the favorite restaurants from Async Storage:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts
@highlight 23-30, only

### Toggling a restaurant’s favorite status

The Hook returns a `toggleFavorite` function that can be called to toggle whether the restaurant is a favorite or not:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts
@highlight 15, 37, 42, 45, 112, only

### Updating the API with the changed favorite status

The Hook calls the API to update the favorite status for the restaurant:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts
@highlight 80-85, only

The API may return an `error`, and that’s ok!
The Hook can check if the API response was good and store the `_id` if it was.

If there was an issue with the API call (e.g. the server was down, the device was offline, etc.) then there won’t be an `_id` in our Async Storage and we’ll know that we need to submit that favorite to the API.

### Setup 2

✏️ Create **src/services/pmo/favorite/interfaces.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/interfaces.ts
@highlight 1, 9, 15, 21, only

✏️ Create **src/services/pmo/favorite/hooks.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.ts
@highlight 8-16, 108-113, only

✏️ Create **src/services/pmo/favorite/hooks.test.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/hooks.test.ts
@highlight 40, 62, only

✏️ Create **src/services/pmo/favorite/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/02-problem/src/services/pmo/favorite/index.ts

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/01-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/17-offline-support/02-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx only

### Verify 2

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.test.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/01-solution/src/screens/RestaurantDetails/RestaurantDetails.test.tsx ../../../exercises/react-native/17-offline-support/02-problem/src/screens/RestaurantDetails/RestaurantDetails.test.tsx only

### Exercise 2

In `RestaurantDetails`, add a button that uses the `toggleFavorite` helper:

- If the user is logged out: Render a button that says “Sign in to favorite this restaurant” and call the `signIn` method.
- If the user is logged in: Render a button that says “Add to favorites” or “Remove from favorites”, depending on whether the restaurant is a favorite.
- If a request is pending: Change the button text to “Saving…”.
- If there’s an error: Render the error message.

### Solution 2

If you’ve implemented the solution correctly, you will be able to sign in and out of your Google account within the application!

You can test the error message by tapping “Sign in” and dismissing the modal.

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/02-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/17-offline-support/02-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx only

</details>

## Objective 3: Sync offline data when connectivity changes

Our app can handle when the API calls fail and it’ll still store the favorites on device in Async Storage.
When the user’s device is offline, we can improve the app a lot by syncing the favorites to the API when the device comes back online.

### Designing the sync behavior

Here’s an overview of how we want our sync to work.

If a favorite is modified:

- By another device while our current device is offline, our device should fetch those changes when it comes back online.
- On our current device while it’s offline, that change should be synced back to the API as soon as the device comes online.
- In both places (in the API and on the device), the data with the last modified date should “win.”

### Fetching the favorites modified on the server

The Hook’s `syncWithServer` will first fetch the favorites from the server:

@sourceref ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/sync.ts
@highlight 12-19, only

### Updating favorites modified on the device

Next, the Hook will send any favorites that were modified while the device was offline to the API:

@sourceref ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/sync.ts
@highlight 81-95, only

### Updating storage with the changes

Last, the Hook will update Async Storage with all the changes that have accumulated through the sync process:

@sourceref ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/sync.ts
@highlight 97-111, only

### Setup 3

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/02-solution/src/App.tsx ../../../exercises/react-native/17-offline-support/03-problem/src/App.tsx only

✏️ Create **src/services/pmo/favorite/favorite.tsx** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/favorite.tsx
@highlight 9, only

✏️ Create **src/services/pmo/favorite/sync.ts** and update it to be:

@sourceref ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/sync.ts
@highlight 11, only

✏️ Update **src/services/pmo/favorite/index.ts** to be:

@diff ../../../exercises/react-native/17-offline-support/02-solution/src/services/pmo/favorite/index.ts ../../../exercises/react-native/17-offline-support/03-solution/src/services/pmo/favorite/index.ts only

### Verify 3

Use the `console` or debugger to check the `syncWithServer` function is called when signing in and out.

### Exercise 3

- Create a `FavoritesSync` component that does the following:
  - When the user is signed in and has a network connection, sync with the server.
- Add the `FavoritesSync` component to the `App` JSX.

**Hint:** Use all of the imports provided in the `favorite.tsx` file.

### Solution 3

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/services/pmo/favorite/favorite.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/03-problem/src/services/pmo/favorite/favorite.tsx ../../../exercises/react-native/17-offline-support/03-solution/src/services/pmo/favorite/favorite.tsx only

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/03-problem/src/App.tsx ../../../exercises/react-native/17-offline-support/03-solution/src/App.tsx only

</details>

## Next steps

Next, we will learn about [learn-react-native/google-maps] to our application.
