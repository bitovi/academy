@page learn-react-native/building Building React Native Apps
@parent learn-react-native 20
@outline 3

@description Learn how to build Android App Bundles (AAB).

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Creating a build

TODO

### Concept TODO

<!-- Link to provide steps for signing and building -->

https://reactnative.dev/docs/signed-apk-android

### Setup 1

✏️ Update **package.json** to be:

@diff ../../../exercises/react-native/19-performance/01-solution/package.json ../../../exercises/react-native/20-building/01-solution/package.json only

### Exercise 1

✏️ Run to generate AAB file:

```bash
npm run android:build
```

### Solution 1

If there is a successful build, the file **android/app/build/outputs/bundle/release/app-release.aab** will be created.

TODO: What happens if there isn’t a successful build? 😅

TODO: Can the AAB be run in the emulator? If so, we should instruct them to do that.

## Objective 2: Setup signing

<!-- Notes for content -->

Warning? TODO: What is this about?

The Android docs say to start with namespace and applicationId the same. Once you publish an android app, however, you cannot change the applicationId; subsequent updates must use the same value. This used to be tied to the package.json name, but is not anymore.

https://developer.android.com/build/configure-app-module

<!-- Notes for content -->

### Concept TODO

TODO

Since we are distributing our app on the Google Play Store, we don't need to sign the app ourselves. Google Play App Signing allows Google to manage the signing key for us.

## Next steps

Next, we will learn about [learn-react-native/publishing-and-updating].
