@page learn-react-native/google-maps Integrating Maps
@parent learn-react-native 18
@outline 2

@description Learn how to integrate Google Maps into your React Native application.

@body

## Overview

In this section, you will:

- Render Google Maps.
- Store secrets with Gradle.
- Configure the Android Manifest file.
- Add markers to a map.

## Objective 1: Add a map view

A list of restaurants is a good start, but showing them on a map would make it easier to visualize where they are.

Let’s start by adding a map to the application. We’ll add a `Tab` component to switch between the List and Map views.

<img alt="Screenshot of the restaurant view with the title “Green Bay, Wisconsin.” There are two tabs at the top, List and Map, with Map selected. The map below is centered on Green Bay. The bottom tab bar has icons for Place My Order and Settings." src="../static/img/react-native/18-maps/01-solution.png" style="border: 4px solid black; border-radius: 25px;" height="640"/>

### Rendering Google Maps

To use the Google Maps API, you will need to set up a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

In this section, we will be using the [`react-native-maps`](https://www.npmjs.com/package/react-native-maps) package to integrate Google Maps into our application.
This library provides several React Native components such as maps, polygons, markers, and more that can be used to build maps on both iOS and Android.
For the purpose of this course, we will focus on using the map and marker components.

```tsx
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"

function Map() {
  return (
    <MapView
      style={{ minHeight: "100%" }}
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

- `style`: The regular `style` prop applied to other compoennts.
- `provider`: The map provider. In this case, we are using Google Maps.
- `loadingEnabled`: Whether to show a loading indicator while the map is loading.
- `initialRegion`: An object that contains coordinates for the initial map region. The object should contain:
  - `latitude` and `longitude`: the coordinates of the center of the map.
  - `latitudeDelta` and `longitudeDelta`: the vertical and horizontal zoom levels of the map.

### Storing secrets with Gradle

Gradle is a powerful build system used in Android development.
It automates the building, testing, and deployment of your app.

In a React Native project, you’ll encounter two key Gradle files:

- `android/build.gradle` (project level): Located at the root of your android directory, it defines build configurations and dependencies that apply to all modules in your project.

- `android/app/build.gradle` (app level): Located in `android/app`, it specifies configurations for the app module, including dependencies, SDK versions, and build types.

Gradle allows you to define how your project is structured, manage dependencies, and configure the build process in a flexible and customizable way.

#### Using `secrets-gradle-plugin`

Managing sensitive information like API keys securely is critical in mobile app development.
The [`secrets-gradle-plugin`](https://github.com/google/secrets-gradle-plugin) helps you handle such secrets without exposing them in your source code.

In our application, we will add a dependency to the project-level Gradle file:

@sourceref ../../../exercises/react-native/18-maps/01-problem/android/build.gradle
@highlight 18, only

…then apply it in the app-level Gradle file:

@sourceref ../../../exercises/react-native/18-maps/01-problem/android/app/build.gradle
@highlight 4, only

### Configuring the Android Manifest file

The Android Manifest file is an XML file that contains important information about our application such as permissions, activities and services, configuration settings, and more.

The Android manifest file (`AndroidManifest.xml`) is a crucial part of any Android application.
It resides in the `android/app/src/main/` directory of your React Native project.
This XML file provides essential information to the Android operating system about your app, such as:

- **Package name:** Unique identifier for your app.
- **Components:** Declares components of your app (activities, services, broadcast receivers, and content providers).
- **Permissions:** Specifies permissions your app needs (e.g., internet access, camera usage).
- **App metadata:** Includes additional information like themes, icons, and minimum API levels.

In essence, the manifest file acts as a roadmap for the Android OS to understand and manage your app correctly.

@diff ../../../exercises/react-native/17-offline-support/03-solution/android/app/src/main/AndroidManifest.xml ../../../exercises/react-native/18-maps/01-problem/android/app/src/main/AndroidManifest.xml only

### Setup 1

✏️ Install the new dependency:

```bash
npm install react-native-maps@1
```

✏️ Update **.gitignore** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/.gitignore ../../../exercises/react-native/18-maps/01-problem/.gitignore only

✏️ Create **android/local.defaults.properties** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/android/local.defaults.properties

✏️ Duplicate **android/local.defaults.properties** to **android/secrets.properties** in your project.

It’s always a good idea to keep a `local.defaults.properties` file up to date (and committed to git) in your project, then include the actual secrets in your local `secrets.properties` file (and not committed to git).

✏️ Update **android/secrets.properties** to include your `GOOGLE_MAPS_API_KEY` key.

Replace the `INVALID_API_KEY` text that’s currently in the file with your key.

✏️ Update **android/build.gradle** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/android/build.gradle ../../../exercises/react-native/18-maps/01-problem/android/build.gradle only

✏️ Update **android/app/build.gradle** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/android/app/build.gradle ../../../exercises/react-native/18-maps/01-problem/android/app/build.gradle only

✏️ Update **android/app/src/main/AndroidManifest.xml** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/android/app/src/main/AndroidManifest.xml ../../../exercises/react-native/18-maps/01-problem/android/app/src/main/AndroidManifest.xml only

✏️ Terminate the existing dev server and start it again:

```bash
npm run start
```

✏️ Create **src/components/Tabs/Tabs.tsx** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/components/Tabs/Tabs.tsx
@highlight 16, only

✏️ Create **src/components/Tabs/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/components/Tabs/index.ts

✏️ Create **src/screens/RestaurantList/components/List/List.tsx** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/List/List.tsx
@highlight 12, only

✏️ Create **src/screens/RestaurantList/components/List/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/List/index.ts

✏️ Create **src/screens/RestaurantList/components/Map/Map.tsx** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/Map.tsx
@highlight 10, only

✏️ Create **src/screens/RestaurantList/components/Map/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/components/Map/index.ts

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/17-offline-support/03-solution/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/18-maps/01-problem/src/screens/RestaurantList/RestaurantList.tsx only

### Verify 1

Navigate to the `Maps` tab of the `RestaurantsList` in your emulator and verify that the Map is rendering.

<img alt="Screenshot of how the application should look for the second solution." src="../static/img/react-native/18-maps/01-solution.png" style="border: 4px solid black; border-radius: 25px;" height="640"/>

### Exercise 1

For this exercise, implement Google Map’s `MapView` for it to properly render when the `Map` tab is selected.

**Hint:** The `MapView` takes its own `style` prop.
As a minimum it needs `minHeight` variable to render.
If the view is too small, try adding another variable to increase its size.

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

## Objective 2: Add restaurant markers with tooltips to the map

Now that we have a map, let’s add markers for each one of the restaurants.
When we tap on them, we will navigate to the restaurant detail page, just like we do in the list view.

<img alt="Screenshot of the restaurant view with the title “Green Bay, Wisconsin.” The map is still centered on Green Bay and now has several locations marked with red pins. One of the markers is labeled Cheese Curd City, 230 W Kinzie Street. The bottom tab bar has icons for Place My Order and Settings." src="../static/img/react-native/18-maps/02-solution.png" style="border: 4px solid black; border-radius: 25px;" height="640"/>

### Adding markers to a map

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
      style={{ minHeight: "100%" }}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
    >
      <Marker
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        onCalloutPress={() => {
          console.info("Marker was pressed")
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

@diff ../../../exercises/react-native/18-maps/01-solution/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/02-problem/src/screens/RestaurantList/components/Map/Map.tsx only

### Verify 2

Navigate to the `Maps` tab of the `RestaurantsList` in your emulator and verify that the Map is rendering.

<img alt="Screenshot of the restaurant view with the title “Green Bay, Wisconsin.” The map is still centered on Green Bay and now has several locations marked with red pins. One of the markers is labeled Cheese Curd City, 230 W Kinzie Street. The bottom tab bar has icons for Place My Order and Settings." src="../static/img/react-native/18-maps/02-solution.png" style="border: 4px solid black; border-radius: 25px;" height="640"/>

### Exercise 2

- Using the `restaurants` prop, create a `Marker` for each restaurant.
- Fill out the `coordinate`, `title`, and `description` properties on Marker.
- Use `onCallOutPress` to add `navigate` to the `RestaurantDetails` screen.

### Solution 2

If you’ve implemented the solution correctly, your Map should have Markers based on the coordinates of each Restaurant.
Then, when you tap on a marker, it should show its info in a pop-up view.
Then, you can tap on the pop-up view to navigate to the restaurant details view.

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantList/components/Map/Map.tsx** to be:

@diff ../../../exercises/react-native/18-maps/02-problem/src/screens/RestaurantList/components/Map/Map.tsx ../../../exercises/react-native/18-maps/02-solution/src/screens/RestaurantList/components/Map/Map.tsx

</details>

## Next steps

We’ve accomplished a lot for our React Native App, in order to polish it just a bit more let’s get into some [Performance and Optimization](./performance-optimization) practices.
