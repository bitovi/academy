@page learn-react-native/publishing-and-updating Publishing and Updating
@parent learn-react-native 21
@outline 3

@description Preparation for the steps to Publish and Update a production application on Stores.

@body

## Overview

In this section, you will learn the best practices of how to:

- Generate an upload key.
- Set up Gradle variables.
- Add signing config to your app’s Gradle config.
- Generate the release AAB.
- Test the release build of your app.

## Objective 1: Publishing the application to the Google Play Store

The [React Native docs on publishing to the Google Play Store](https://reactnative.dev/docs/signed-apk-android) are great for following the steps required to meet each requirement.

In this section, we will give you a brief overview of the “what” and “why” of these steps.

### Generating an upload key

An upload key is essential for signing your app on Android.
It acts as a digital signature that verifies the authenticity of your app and ensures it hasn’t been tampered with.
When you generate an upload key, you create a private key used to sign your app’s Android App Bundle (AAB), maintaining the integrity and security of your app on the Google Play Store.

### Setting up Gradle variables

To use your upload key for signing your app, Gradle needs configuration.
This involves defining key properties like the keystore file location, key alias, and passwords in a `gradle.properties` file.
This file securely manages sensitive information, making it easy to reference in your Gradle build scripts.

### Adding signing config to your app’s Gradle config

With your Gradle variables set up, the next step is to add the signing configuration to your app’s `build.gradle` file.
This step involves specifying the signing configuration in the Gradle build script, linking it to the previously defined variables.
This configuration instructs Gradle to use your upload key to sign the app during the build process.

### Generating the release AAB

As we went through in the previous module, generating a release Android App Bundle (AAB) is a crucial step in preparing your app for publication.

The release AAB is a compiled version of your app, including all necessary code and resources, optimized for distribution on the Google Play Store.
The AAB format allows Google Play to generate optimized APKs for various device configurations, reducing download sizes and improving performance.

### Testing the release build of your app

Before submitting your app to the Google Play Store, thoroughly testing the release build is essential.
This step ensures that your app performs well across different devices and configurations and that no critical bugs or issues affect the user experience.

Testing can be done on physical devices or using emulators to simulate different environments.
This helps identify and fix problems, verify that all features work as expected, and ensure your app meets quality standards.

## Objective 2: Updating and versioning the application

### Releasing updates

Releasing updates is a critical aspect of maintaining and improving your app.

Here are some best practices to follow when releasing updates:

- **Plan and document:** Before releasing an update, plan the changes and document them clearly. This includes listing bug fixes, new features, and any improvements.
- **Incremental updates:** Make updates incremental rather than large, sweeping changes. This makes it easier to manage and test each release.
- **Testing:** Thoroughly test each update before release. Use both automated tests and manual testing on various devices to ensure compatibility and performance.
- **Staged rollouts:** Consider using staged rollouts to release the update to a small percentage of users first. This allows you to catch any potential issues before the update reaches all users.
- **User communication:** Communicate with your users about the updates. Use clear and concise release notes to inform them of what has changed and any new features or fixes included in the update.
- **Monitor feedback:** After releasing an update, monitor user feedback closely. Be prepared to address any issues that arise quickly.

### Testing new releases

Before making updates available to the public, it’s essential to test them thoroughly. Both the Google Play Store and the Apple App Store offer tools for testing new releases:

- **Google Play Store:** Use [Internal Testing](https://play.google.com/console/about/internal-testing/) to release your app to a select group of users for testing. This helps identify issues in a controlled environment before a wider release.
- **Apple App Store:** Use [TestFlight](https://developer.apple.com/testflight/) to invite users to test your app. TestFlight allows you to gather valuable feedback and ensure that your app is functioning correctly on different devices and operating systems.

### Best practices

- **Semantic versioning:** Follow semantic versioning (e.g., 1.0.0) to clearly communicate the type and impact of updates. Use major version increments for significant changes, minor version increments for new features, and patch increments for bug fixes.
- **Changelogs:** Maintain detailed changelogs for each release. This practice helps users understand what changes have been made and provides transparency.
- **Automated testing:** Implement automated testing to catch issues early in the development process. Automated tests help ensure consistent quality and reduce the risk of introducing new bugs.

By following these best practices, you can effectively manage versioning and releases, ensuring a smooth and reliable experience for your app users.

## Next steps

Congrats, you’ve completed this Bitovi Academy training!
