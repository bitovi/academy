@page learn-react-native/performance-optimization Performance and Optimization
@parent learn-react-native 19
@outline 3

@description Improve the application’s launch time by implementing lazy loading.

@body

## Overview

In this section, you will:

- Make smaller JavaScript bundles with code splitting.
- Use React’s `lazy` and `Suspense` APIs to implement lazy loading.
- Learn when it’s best to use dynamic imports.

## Objective 1: Lazy load the `Map` view

In a previous section, we added a `Map` view that has a large dependency: the `react-native-maps` package.
Large packages have a negative impact on the application’s startup time, but there’s a solution: lazy loading!

Let’s lazy load the `Map` view in our app so it launches faster.

### JavaScript bundle size

A “bundle” (file) is created with all of the JavaScript code when the application is built, along with any additional assets (like images).
As more code is added to the application, the size of this JavaScript bundle will increase.

The larger bundle can lead to longer startup times for the application because the bundle must be loaded, parsed, and ran before the app can be used.
This longer launch time translates into a worse user experience as more code is added.
Our app should improve as we add features without sacrificing launch time!

### Making smaller JavaScript bundles

Currently, our existing imports are “static” `import` declarations that are defined at the top of the file:

@sourceref ./import-static.tsx
@highlight 5-6, only

We can split our code into multiple bundles by using the dynamic `import()` syntax from JavaScript.

@sourceref ./import-dynamic.tsx
@highlight 13, only

Now with the dynamic import in place, the `Analytics` view in the code above will be split into a separate JavaScript bundle.
This means that any of its code (including the code it imports) will be in a separate bundle.
This will keep the main app bundle smaller over time as the `Analytics` view grows in size.

### Using React’s `lazy` and `Suspense` APIs

This dynamic `import()` code takes a lot of lines to implement this one improvement:

@diff ./import-static.tsx ./import-dynamic.tsx only

If we had to write this for every single component that we wanted to import dynamically, we would have a lot of boilerplate repeated over and over.

Thankfully, React provides two APIs to simplify dynamic imports:

@diff ./import-static.tsx ./import-dynamic-suspense.tsx only

In the code above, we’ve replaced the static `import` with a dynamic `import()` within `lazy`.

When the Analytics tab is tapped on, React Native will load the `component` passed to `Screen`.
Then, the `<Suspense>` component will render `<Loading>` while the Analytics module is being imported.
When the module has loaded, the `<Analytics>` component will be displayed.

### Selectively using dynamic imports

You might wonder if it’s a good idea to use dynamic `import()` statements everywhere.

Surprisingly, the answer is **no!**
The benefit of dynamic imports is that the bundle is split up into separate files, but this comes with a small cost.

Each time a bundle is loaded, the JavaScript has to be parsed and ran.
This takes a little bit of time for each bundle, so it’s best to only split your bundle in a few key places in your application.
This can be in views where there is a large dependency (like our Maps view), or between tabs in the app (like we’ve shown above).

### Setup 1

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/18-maps/02-solution/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/19-performance/01-problem/src/screens/RestaurantList/RestaurantList.tsx only

### Verify 1

Watch the output of the `npm start` command while it’s running.

When you’ve completed this exercise, you’ll notice that there’s a new bundle loaded when you go to the Map view:

```
BUILD SUCCESSFUL in 7s
199 actionable tasks: 15 executed, 184 up-to-date
info Connecting to the development server...
info Starting the app on "emulator-5554"...
Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=com.placemyorder/.MainActivity }
 BUNDLE  ./index.js

 LOG  Running "PlaceMyOrder" with {"rootTag":11}
 BUNDLE  src/screens/RestaurantList/components/Map/index.ts
```

@highlight 9

### Exercise 1

Inside of `RestaurantList.tsx`:

- Change the static Map `import` statement to a dynamic `import()`.
- Use `<Suspense>` to load the Map tab on the screen.

### Solution 1

If you’ve implemented the solution correctly, you will see the new `BUNDLE` line logged while the server is running.

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-native/19-performance/01-problem/src/screens/RestaurantList/RestaurantList.tsx ../../../exercises/react-native/19-performance/01-solution/src/screens/RestaurantList/RestaurantList.tsx only

</details>

## Next steps

Now we’ve got a complete and performant application. Let’s finish out our work by learning about [Building React Native Apps](./building).
