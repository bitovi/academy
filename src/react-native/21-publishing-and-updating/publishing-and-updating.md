@page learn-react-native/publishing-and-updating Publishing and Updating
@parent learn-react-native 21
@outline 3

@description Preparation for the steps to Publish and Update a production application on Stores.

@body

## Overview

In this section, you will:

- Generate an upload key.
- Configure Gradle to use the upload key.
- Sign your AAB with the upload key.
- Discuss OTA vs AAB updates.
- How to test new releases.

## Objective 1: Uploading AAB to Google Play Store

### Generating an upload key

As mentioned in the previous section, if we want to upload an AAB (Android App Bundle) to the Google Play Store, we need to generate an upload key and use it to sign the AAB. The React Native documentation provides [instructions for generating an upload key](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key) for both Windows and macOS.

### Configuring Gradle

Now that we’ve generated an upload key, we need to configure Gradle to use it. First thing we will do is move the upload key keystore file to the `android/app` directory of our project. Next, we will update the `~/.gradle/gradle.properties` or `android/gradle.properties` to add the following:

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore # Replace with the name of your keystore file
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias # Replace with the alias you set
MYAPP_UPLOAD_STORE_PASSWORD=your-keystore-password  # Replace with the keystore password you set
MYAPP_UPLOAD_KEY_PASSWORD=your-key-password  # Replace with the key password you set
```

Lastly, we will upadte the `android/app/build.gradle` file to add the following:

```gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

Now that we’ve generated an upload key and configured Gradle to use it, we can generate an AAB file and upload it to the Google Play Store.

Check out the [React Native Android guide](https://reactnative.dev/docs/signed-apk-android) for more information.

```bash
npx react-native build-android --mode="release"
```

## Objective 2: App updates and versioning

### Releasing updates

The two main ways to release updates to your app are to either upload a new AAB to the Google Play Store or to create a new OTA (over-the-air) update.

OTA updates allow us to update our app without requiring the user to install a new version from the app store. OTA updates are great for quick deployment for bug fixes or small changes. However, they are limited to JavaScript changes only. The overhead of implementing an OTA process is higher than simply uploading a new AAB to the app store.

Deploying a new AAB to the Google Play Store is more suited for updates beyond small bug fixes or changes. With a new AAB we can update native code. Users are familiar with the update process, so deploying a new AAB with a changelog can provide a better user experience when doing major updates.

Both OTA and AAB updates have their place in the app update process. It's up to you to decide whether one or the other, or a mix of both, is best for your app.

### Testing new releases

Both the Google Play Store and the Apple App Store allow you to test new releases before making them available to the public. This is a great way to ensure that your app is working as expected before releasing it to the public. To learn about testing new releases with the Google Play Store, check out [Internal Testing](https://play.google.com/console/about/internal-testing/). If you are releasing your app on the Apple App Store, you can use [TestFlight](https://developer.apple.com/testflight/).

## Next steps

Congrats, you’ve completed this Bitovi Academy training!
