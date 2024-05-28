@page learn-react-native/building Building React Native Apps
@parent learn-react-native 20
@outline 3

@description Learn how to build Android App Bundle (AAB) files.

@body

## Overview

In this section, you will:

- Learn about the differences between APK and AAB files.
- Build an AAB file.

## Objective 1: Create an Android App Bundle (AAB)

When developing Android applications, understanding the different formats used for packaging and distributing your app is crucial.
Two primary formats you’ll encounter are the Android App Bundle (AAB) and the Android Package (APK).

Each serves distinct purposes and offers unique benefits.
Let’s dive into what these formats are and why they matter.

### What is an APK?

An Android Package (APK) is the traditional file format used to distribute and install applications on Android devices.
Essentially, an APK is a compressed archive that contains all the necessary components for an app to run, including the compiled code, resources, assets, and manifest file.
When you download an app from the Google Play Store or another source, it typically comes in the form of an APK.

Key features of an APK:

- **Direct installation:** APK files can be installed directly onto Android devices, either through the Play Store or by sideloading.
- **Universal packaging:** An APK contains all resources and code required for every possible device configuration, such as different screen sizes, densities, and CPU architectures.
- **Larger file size:** Because it includes resources for all configurations, an APK file can be quite large and may include unnecessary data for a particular device.

### What is an AAB?

An Android App Bundle (AAB) is a more modern and efficient format introduced by Google.
Unlike an APK, an AAB is not a final package that can be installed on a device.
Instead, it contains all the compiled code and resources of an app, but in a way that allows Google Play to generate optimized APKs specifically tailored for each device configuration.

Key features of an AAB:

- **Optimized distribution:** When you upload an AAB to the Google Play Store, the Play Store automatically generates and serves optimized APKs for each user’s device. This means the downloaded app will only contain the resources needed for that specific device, resulting in smaller download sizes and improved performance.
- **Mandatory for Play Store:** Starting in 2021, Google Play requires new apps to be published using the AAB format.
- **Efficient updates:** By using AAB, incremental updates can be more efficient as only the necessary changes are downloaded, reducing the update size.

### Building an AAB

AAB files can be built by using this command provided by React Native:

```shell
react-native build-android --mode=release
```

The AAB will be in this location:

```
android/app/build/outputs/bundle/release/app-release.aab
```

You are able to create an AAB with or without signing it. However, if you want to upload the AAB to the Google Play store, you must sign it using an upload key keystore.

### Setup 1

✏️ Update **package.json** to be:

@diff ../../../exercises/react-native/19-performance/01-solution/package.json ../../../exercises/react-native/20-building/01-solution/package.json only

### Verify 1

The build logs will look something like this (but much, much longer):

```
npm run android:build

> PlaceMyOrder@0.0.1 android:build
> react-native build-android --mode=release

info Building the app...

> Task :app:createBundleReleaseJsAndAssets
debug Reading Metro config from /Users/bitovi/PlaceMyOrder/metro.config.js
warning: the transform cache was reset.
                Welcome to Metro v0.80.9
              Fast - Scalable - Integrated

# Many lines later…

> Task :react-native-gesture-handler:compileReleaseKotlin
w: file:///Users/bitovi/PlaceMyOrder/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/RNGestureHandlerPackage.kt:69:42 'constructor ReactModuleInfo(String!, String!, Boolean, Boolean, Boolean, Boolean, Boolean)' is deprecated. Deprecated in Java
w: file:///Users/bitovi/PlaceMyOrder/node_modules/react-native-gesture-handler/android/src/main/java/com/swmansion/gesturehandler/core/FlingGestureHandler.kt:25:26 Parameter 'event' is never used

> Task :react-native-screens:compileReleaseJavaWithJavac
Note: /Users/bitovi/PlaceMyOrder/node_modules/react-native-screens/android/src/paper/java/com/swmansion/rnscreens/NativeScreensModuleSpec.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

BUILD SUCCESSFUL in 30s
216 actionable tasks: 211 executed, 5 up-to-date
```

@highlight 1, 24, only

### Exercise 1

✏️ Run the script to generate the AAB file:

```shell
npm run android:build
```

### Solution 1

After the build runs successfully, you can find the AAB in your project:

```
android/app/build/outputs/bundle/release/app-release.aab
```

Since the `aab` file is really a `zip` in disguise, change the filename to `app-release.zip` and open it.
What can you find?

## Next steps

Next, we will learn about [learn-react-native/publishing-and-updating].
