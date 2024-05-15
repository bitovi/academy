@page learn-react-native/google-maps Integrating Maps
@parent learn-react-native 18
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Add Google Maps to Restaurant List page

TODO

### Concept TODO

TODO

### Setup 1

✏️ Run:

```bash
npm install react-native-maps@1.15.1
```

✏️ Create **android/local.properties** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/android/.local.properties.example

✏️ Update **GOOGLE_MAPS_API_KEY** with your key.

✏️ Update **android/build.gradle** to be:

@diff ../../../exercises/react-native/17-offline/01-solution/android/build.gradle ../../../exercises/react-native/18-maps/01-problem/android/build.gradle only

✏️ Update **android/app/build.gradle** to be:

@diff ../../../exercises/react-native/17-offline/01-solution/android/app/build.gradle ../../../exercises/react-native/18-maps/01-problem/android/app/build.gradle only

✏️ Update **android/app/src/main/AndroidManifest.xml** to be:

@diff ../../../exercises/react-native/17-offline/01-solution/android/app/src/main/AndroidManifest.xml ../../../exercises/react-native/18-maps/01-problem/android/app/src/main/AndroidManifest.xml only

✏️ Update **src/env.d.ts** to be:

@diff ../../../exercises/react-native/17-offline/01-solution/src/env.d.ts ../../../exercises/react-native/18-maps/01-problem/src/env.d.ts only

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/17-offline/01-solution/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/RestaurantList.tsx only

✏️ Create **src/components/Tabs/Tabs.tsx** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/components/Tabs/Tabs.tsx

✏️ Create **src/components/Tabs/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/components/Tabs/index.ts

✏️ Create **src/screens/RestaurantList/components/Map/Map.tsx** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/Map.tsx

✏️ Create **src/screens/RestaurantList/components/Map/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/index.ts

### Verify 1

TODO

### Exercise 1

- Implement Google Map's `MapView` for it to properly render when the `Map` tab is selected.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantList/components/Map/Map.tsx** to be:

@diff ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/01-solution/src/screens/RestaurantList/components/Map/Map.tsx

</details>

## Objective 2: Add restaurant pins with tooltips to map

TODO

### Concept TODO

TODO

### Setup 2

✏️ Update **src/screens/RestaurantList/components/Map/Map.tsx** to be:

@diff ../../../exercises/react-native/18-maps/01-solution/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/02-problem/src/screens/RestaurantList/components/Map/Map.tsx

### Verify 2

TODO

### Exercise 2

- Using the `restaurants` property, create a `Marker` for each restaurant.
- Fill out the `coordinate`, `title`, and `description` properties on Marker.
- Use `onCallOutPress` to add `navigate` to the `RestaurantDetails` screen.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantList/components/Map/Map.tsx** to be:

@diff ../../../exercises/react-native/18-maps/02-problem/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/02-solution/src/screens/RestaurantList/components/Map/Map.tsx

</details>

## Next steps

We've accomplished a lot for our React Native App, in order to polish it just a bit more let's get into some [Performance and Optimization](./performance-optimization) practices.
