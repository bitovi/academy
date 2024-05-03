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

<img alt="Screenshot of React DevTools inspecting a component tree. It shows a structured hierarchy of all the components in the view. There is also a Profiler tab." src="../../static/img/react-native/07-debugging-devtools/dev-tool-connected.png" style="max-width: 100%;"/>

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

### Exercise 1

- Explore Components:
  - Use the `Components` tab to explore the hierarchical structure of the React Native components in the application.
  - Expand and collapse component trees to understand the component composition.
  - Hover over individual components to highlight them in the browser.
- Inspect Props and State:
  - Select a component from the component tree to inspect its props and state.
  - View the current props and state values, and observe how they affect the component's rendering.
- Modify Props:
  - Experiment with modifying props directly from the DevTools panel.
  - Change prop values and observe how they affect the component's appearance or behavior in real-time.

## Objective 2: React Native Debugger

We will be setting up React Native Debugger to help us debug:

<img alt="Screenshot of the React Native JavaScript Inspector interface. It includes common DevTools tabs such as Console, Sources, Memory, and Profiler." src="../../static/img/react-native/07-debugging-devtools/react-native-debugger.png" style="max-width: 100%;"/>

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

### Exercise 2

- Add `console.log` Statements:
  - Within the `src/screens/StateList/StateList.tsx`, insert console.log statements to print information such as variable values, function calls, or component lifecycle events.
  - For example, you can log the values of props, states, or variables to understand their current state during runtime.
- Insert `debugger` Statement:
  - Identify a specific point in `src/screens/StateList/StateList.tsx` code where you want to pause execution and inspect the runtime environment.
  - Insert the `debugger` statement at that point to create a breakpoint. This will pause execution when reached and allow you to examine the state of your application.
  - Step through your code using the debugger controls (step into, step over, step out) to understand its execution flow.

## Next steps

Next, let’s learn about different ways to apply [learn-react-native/styling Styling] to React Native applications.