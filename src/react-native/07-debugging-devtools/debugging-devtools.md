@page learn-react-native/debugging-devtools Debugging and DevTools
@parent learn-react-native 7
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- [resource](https://reactnative.dev/docs/debugging)

## Objective 1: React DevTools

We will be setting up React DevTools to help us inspect the UI:

**React DevTools**

<img alt="Screenshot of React DevTools inspecting a component tree. It shows a structured hierarchy of all the components in the view. There is also a Profiler tab." src="../../static/img/react-native/07-debugging-devtools/dev-tool-connected.png" style="max-width: 100%;"/>

### Concept TODO
TODO

### Setup 1

✏️ Run:

```shell
npm install react-devtools
```

✏️ Update **src/package.json** to be:

@diff ../../../exercises/react-native/06-custom-components/03-solution/package.json ../../../exercises/react-native/07-debugging/01-solution/package.json only

### Verify 1

While the application is running execute the command:

```shell
npm run devtools
```

This should open a separate window that looks like the following image:

<img alt="Screenshot of a window with options for React Native and React DOM. The React Native section suggests opening the in-app developer menu. A notification at the top states the server is waiting for React to connect." src="../../static/img/react-native/07-debugging-devtools/dev-tool-not-connected.png" style="max-width: 100%;"/>

At this point, the DevTool is not connected. To connect the DevTool to the application, run the following command to pull up the dev menu:

```shell
adb shell input keyevent 82
```

This will refresh the connection. 

## Objective 2: React Native Debugger

We will be setting up React Native Debugger to help us debug:

**React Native Debugger**

<img alt="Screenshot of the React Native JavaScript Inspector interface. It includes common DevTools tabs such as Console, Sources, Memory, and Profiler." src="../../static/img/react-native/07-debugging-devtools/react-native-debugger.png" style="max-width: 100%;"/>

### Concept TODO
TODO

### Setup 2

✏️ Update **src/package.json** to be:

@diff ../../../exercises/react-native/07-debugging/01-solution/package.json ../../../exercises/react-native/07-debugging/02-solution/package.json only

### Verify 2

Execute the command:

```shell
npm run debugger
```

The application should be running in Android Studio. Open the terminal and run the following command:

```shell
adb shell input keyevent 82
```

This will open up the dev menu. It should look like the following image:

<img alt="Screenshot of the emulator displaying the React Native Developer Menu. The screen lists various options like Reload, Open Debugger, Change Bundle Location, Show Element Inspector, Disable Fast Refresh, Show Perf Monitor, Settings, and Enable Sampling Profiler." src="../../static/img/react-native/07-debugging-devtools/in-app-dev-menu.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

Clicking on `Open Debugger` will open up a separate window for debugging.

## Next steps

Next, let’s learn about different ways to apply [learn-react-native/styling Styling] to React Native applications.