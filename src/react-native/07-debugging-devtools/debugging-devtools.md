@page learn-react-native/debugging-devtools Debugging and DevTools
@parent learn-react-native 7
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- [resource](https://reactnative.dev/docs/debugging)

## Objective: Devtools setup

We will be setting up dev tools to help us debug and inspect the UI:

**React Native Debugger**

<img alt="Screenshot of react native debugger." src="../../static/img/react-native/07-debugging-devtools/react-native-debugger
.png"/>

**React Devtool**

<img alt="Screenshot of a connected dev tool." src="../../static/img/react-native/07-debugging-devtools/dev-tool-connected.png"/>

### Concept TODO
TODO

### Setup

✏️ Update **src/package.json** to be:

@diff ../../../exercises/react-native/06-custom-components/03-solution/package.json ../../../exercises/react-native/07-debugging/01-solution/package.json only

Since we have a new package let's run the following command.

```shell
npm i
```

### Verify

**Verifying React Native Debugger**

Execute the command:

```shell
npm run debugger
```

The application should be running in Android Studio. Open the terminal and run the following command:

```shell
adb shell input keyevent 82
```

This will open up the dev menu. It should look like the following image:

<img alt="Screenshot of a connected dev tool." src="../../static/img/react-native/07-debugging-devtools/in-app-dev-menu.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

Clicking on `Open Debugger` will open up a separate window for debugging.

**Verifying React Devtool**

While the application is running execute the command:

```shell
npm run devtools
```

This should open a separate window that looks like the following image:

<img alt="Screenshot of a connected dev tool." src="../../static/img/react-native/07-debugging-devtools/dev-tool-not-connected.png"/>

At this point, the dev tool is not connected. To connect the dev tool to the application, run the following command to pull up the dev menu:

```shell
adb shell input keyevent 82
```

This will refresh the connection. 

## Next steps

Next, let’s learn about different ways to apply [learn-react-native/styling Styling] to React Native applications.