@page learn-react-native/building Building React Native Apps
@parent learn-react-native 20
@outline 3

@description Learn how to build Android App Bundles (AAB).

@body

## Overview

In this section, you will:

- Cover EAS production builds
- Learn how to create a build
- Understand the difference between APK and AAB
- Learn about signing

## Objective 1: Creating a build

### EAS Production Build

EAS, or Expo Application Services, is a service provided by Expo to help streamline the process of building and deploying React Native applications. It is a cloud-based solution that allows us to create production builds, submit them to the app stores, and manage OTA (over-the-air) updates.

### Creating a Build

To create an Android build of our React Native app, we can run the `react-native build-android --mode=release` command to generate an Android App Bundle (AAB) file.

### APK vs AAB

An Android Package (APK) is the traditional format used to distribute and install Android apps. It is a zip file that contains all the necessary files for the app to run on an Android device. APKs can be directly installed onto devices or through app stores like Google Play. However, APKs are not optimized and contain all resources for every device configuration, leading to larger file sizes.

On the other hand, an Android App Bundle (AAB) is a publishing format that includes all the compiled code and resources of an app, but does not create a final APK. Instead, it allows the Google P,lay store to generate an APK for each different device configuration: different screen densities, CPU architectures, and languages. Users cannot directly install AABs and they must be uploaded to the Google Play Store for distribution. Because the Play Store generates optimized APKs for each device, AABs are smaller in size which results in faster downloads, reduced storage space, and better performance.

### Signing

Android requires that apps be signed with a certificate before they can be installed on a device. This is to ensure that the app has not been tampered with and that it is safe to run. The signing process involves generating a private key, instructions for which can be found in the [React Native documentation](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key).

Once the private key has been generated, you must update your Gradle variables and config before building the app using the `npx react-native build-android --mode="release"` command.

The signed AAB can be found under `android/app/build/outputs/bundle/release/app-release.aab` and can now be uploaded to the Google Play store.

### Getting build onto device

If you would like to test the release build on a device, you can run the `npm run android -- --mode="release"` command. However, this will only work if you followed the signing instructions that were mentioned earlier.

Keep in mind that when you sign an AAB locally it will change the signature of the app. The Google Sign-In API relies on the app's signature to verify the app's identity, so the newly signed app will not be able to use Google Sign-In API.

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
