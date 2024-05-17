@page learn-react-native/google-maps Integrating Maps
@parent learn-react-native 18
@outline 3

@description Learn how to integrate Google Maps into your React Native application.

@body

## Overview

In this section, you will:

- Integrating Google Maps
- Configuring Gradle plugins
- Adding a map view
- Adding markers to a map

## Objective 1: Add Google Maps to Restaurant List page

<img alt="Screenshot of the restaurant view with the title “Green Bay, Wisconsin.” There are two tabs at the top, List and Map, with Map selected. The map below is centered on Green Bay. The bottom tab bar has icons for Place My Order and Settings." src="../static/img/react-native/18-maps/01-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### React Native Maps

In this section, we will be using the `react-native-maps` library to integrate Google Maps into our application. This library provides several React Native components such as maps, polygons, markers, and more that can be used to build maps on both iOS and Android. For the purpose of this training, we will focus on using the map and marker components. To use the Google Maps API, we will need to set up a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Secrets Gradle Plugin

We will be using the [`secrets-gradle-plugin`](https://github.com/google/secrets-gradle-plugin) to securely store our API key in our project.

#### Gradle

Gradle is a build automation tool that is used to compile and build the Android part of our React Native application. We can extend Gradle's functionality by using plugins. In this case, we will be using the `secrets-gradle-plugin` which allows us to securely store sensitive information such as API keys.

#### Android Manifest

The Android Manifest file is an XML file that contains important information about our application such as permissions, activities and services, configuration settings, and more.

### MapView

```tsx
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"

function Map() {
  return (
    <MapView
      style={{ minHeight: "100%", height: 500 }}
      provider={PROVIDER_GOOGLE}
      loadingEnabled
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    ></MapView>
  )
}
```

The `MapView` component is the main component that we will be using to render the map. Because we are using a React Native library, we will later be able to pass child components to the `MapView` component to render `Markers` and other map elements.

The component takes several props, but the most important ones are:

- `style`: The style of the map.
- `provider`: The map provider. In this case, we are using Google Maps.
- `loadingEnabled`: Whether to show a loading indicator while the map is loading.
- `initialRegion`: An object that contains coordinates for the initial map region. The object should contain `latitude`, `longitude`, `latitudeDelta`, and `longitudeDelta` properties. The `latitude` and `longitude` properties are the coordinates of the center of the map, and the `latitudeDelta` and `longitudeDelta` properties are the vertical and horizontal zoom levels of the map.

### Setup 1

✏️ Run:

```bash
npm install react-native-maps@1.15.1
```

✏️ Create **android/local.defaults.properties** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/android/local.defaults.properties

✏️ Create **android/secrets.properties** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/android/.secrets.properties.example

✏️ Update **GOOGLE_MAPS_API_KEY** in `secrets.properties` with your key.

✏️ Update **android/build.gradle** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/android/build.gradle ../../../exercises/react-native/18-maps/01-problem/android/build.gradle only

✏️ Update **android/app/build.gradle** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/android/app/build.gradle ../../../exercises/react-native/18-maps/01-problem/android/app/build.gradle only

✏️ Update **android/app/src/main/AndroidManifest.xml** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/android/app/src/main/AndroidManifest.xml ../../../exercises/react-native/18-maps/01-problem/android/app/src/main/AndroidManifest.xml only

✏️ Update **src/env.d.ts** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/src/env.d.ts ../../../exercises/react-native/18-maps/01-problem/src/env.d.ts only

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/RestaurantList.tsx only

✏️ Create **src/components/Tabs/Tabs.tsx** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/components/Tabs/Tabs.tsx

✏️ Create **src/components/Tabs/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/components/Tabs/index.ts

✏️ Create **src/screens/RestaurantList/components/Map/Map.tsx** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/Map.tsx

✏️ Create **src/screens/RestaurantList/components/Map/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/index.ts

### Verify 1

Navigate to the `Maps` tab of the `RestaurantsList` in your emulator and verify that the Map is rendering.

<img alt="Screenshot of how the application should look for the second solution." src="../static/img/react-native/18-maps/01-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### Exercise 1

- Implement Google Map's `MapView` for it to properly render when the `Map` tab is selected.

Hint: The `MapView` takes its own `style` prop. As a minimum it needs `minHeight` variable to render. If the view is too small, try adding another variable to increase its size.

```jsx
<MapView style={{ minHeight: "100%" }} />
```

### Solution 1

If you’ve implemented the solution correctly, the Map should be rendering in your application.

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantList/components/Map/Map.tsx** to be:

@diff ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/01-solution/src/screens/RestaurantList/components/Map/Map.tsx

</details>

## Objective 2: Add restaurant pins with tooltips to map

<img alt="Screenshot of the restaurant view with the title “Green Bay, Wisconsin.” The map is still centered on Green Bay and now has several locations marked with red pins. One of the markers is labeled Cheese Curd City, 230 W Kinzie Street. The bottom tab bar has icons for Place My Order and Settings." src="../static/img/react-native/18-maps/02-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

Now that we have a map, let’s add markers for each one of the restaurants. When we tap on them, we will navigate to the restaurant detail page, just like we do in the list view.

### Marker

The `Marker` component is used to render a pin on the map. It takes several props, but the most important ones are:

- `coordinate`: The coordinates of the marker.
- `onCalloutPress`: A function that is called when the callout view is pressed.
- `title`: The title of the callout view.
- `description`: A description displayed in the callout view.

The callout view is an info window that is displayed when the marker is tapped.

```tsx
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

function MapWithMarker({ initialRegion }) {
  return (
    <MapView
      style={{ minHeight: "100%", height: 500 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
    >
      <Marker
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        onCalloutPress={() => {
          console.log("Marker was pressed")
        }}
        title="Title of the Marker"
        description="A brief description"
      />
    </MapView>
  )
}
```

@highlight 10-20

### Setup 2

✏️ Update **src/screens/RestaurantList/components/Map/Map.tsx** to be:

@diff ../../../exercises/react-native/18-maps/01-solution/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/02-problem/src/screens/RestaurantList/components/Map/Map.tsx

### Verify 2

Navigate to the `Maps` tab of the `RestaurantsList` in your emulator and verify that the Map is rendering.

<img alt="Screenshot of the restaurant view with the title “Green Bay, Wisconsin.” The map is still centered on Green Bay and now has several locations marked with red pins. One of the markers is labeled Cheese Curd City, 230 W Kinzie Street. The bottom tab bar has icons for Place My Order and Settings." src="../static/img/react-native/18-maps/02-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### Exercise 2

- Using the `restaurants` property, create a `Marker` for each restaurant.
- Fill out the `coordinate`, `title`, and `description` properties on Marker.
- Use `onCallOutPress` to add `navigate` to the `RestaurantDetails` screen.

### Solution 2

If you’ve implemented the solution correctly, your Map should have Markers based on the coordinates of each Restaurant.

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantList/components/Map/Map.tsx** to be:

@diff ../../../exercises/react-native/18-maps/02-problem/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/02-solution/src/screens/RestaurantList/components/Map/Map.tsx

</details>

## Next steps

We've accomplished a lot for our React Native App, in order to polish it just a bit more let's get into some [Performance and Optimization](./performance-optimization) practices.
