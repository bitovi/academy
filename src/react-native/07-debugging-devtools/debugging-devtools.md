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

<img alt="Screenshot of React DevTools inspecting a component tree. It shows a structured hierarchy of all the components in the view. There is also a Profiler tab." src="../static/img/react-native/07-debugging-devtools/dev-tool-connected.png" style="max-width: 100%;"/>

### What is React Devtools

React DevTools is an extension that provides a powerful set of tools for inspecting and debugging React Native applications. It allows developers to inspect and manipulate the hierarchy of React Native components rendered in their mobile applications. With React DevTools, developers can easily identify component structures, inspect props and state, track component updates, and even modify component properties in real-time, greatly enhancing the debugging and development process for React Native projects.

By examining the JSX code below, developers can gain insight into how React Native components are structured and composed. Comparing the JSX code with the React DevTools component tree allows developers to visualize how each JSX element corresponds to a component instance in the application, providing a deeper understanding of their React applications and aiding in debugging and optimization efforts.

```jsx
<App>
  <ScrollView>
    <View>
      <Text>Place My Order: Coming Soon To...</Text>
    </View>
    <StateList>
      <View>
        <ListItem>
          <Text>Illinois</Text>
        </ListItem>
        <ListItem>
          <Text>Wisconsin</Text>
        </ListItem>
      </View>
    </StateList>
  </ScrollView>
</App>
```

### Setup 1

✏️ Run:

```shell
npm install react-devtools@5 --save-dev
```

✏️ Update **src/package.json** to be:

@diff ../../../exercises/react-native/06-custom-components/03-solution/package.json ../../../exercises/react-native/07-debugging/01-solution/package.json only

### Verify 1

While the application is running execute the command:

✏️ Run:

```shell
npm run devtools
```

This should open a separate window that looks like the following image:

<img alt="Screenshot of a window with options for React Native and React DOM. The React Native section suggests opening the in-app developer menu. A notification at the top states the server is waiting for React to connect." src="../static/img/react-native/07-debugging-devtools/dev-tool-not-connected.png" style="max-width: 100%;"/>

At this point, the DevTool is not connected. To connect the DevTool to the application, run the following command to pull up the dev menu:

✏️ Run:

```shell
adb shell input keyevent 82
```

This will refresh the connection.

### Exercise 1

Explore Components:

- Use the "Components" tab to explore the hierarchical structure of the React Native components in the application.
- Expand and collapse component trees to understand the component composition.
- Hover over individual components to highlight them in the browser.

Inspect Props and State:

- Select a component from the component tree to inspect its props and state.
- View the current props and state values, and observe how they affect the component's rendering.

Modify Props:

- Experiment with modifying props directly from the DevTools panel.
- Change prop values and observe how they affect the component's appearance or behavior in real-time.

## Objective 2: React Native Debugger

We will be setting up React Native Debugger to help us debug:

<img alt="Screenshot of the React Native JavaScript Inspector interface. It includes common DevTools tabs such as Console, Sources, Memory, and Profiler." src="../static/img/react-native/07-debugging-devtools/react-native-debugger.png" style="max-width: 100%;"/>

### What is React Native Debugger

React Native Debugger, is a feature in React Native that serves as a debugging tool for developers to step through the code, analyze props, and state more efficiently in their React Native applications. React Native Debugger provides valuable insights into the application's state and flow. React Native Debugger will enhance the debugging process for React Native projects, offering essential functionalities for identifying and resolving issues during development.

### Setup 2

✏️ Update **src/package.json** to be:

@diff ../../../exercises/react-native/07-debugging/01-solution/package.json ../../../exercises/react-native/07-debugging/02-solution/package.json only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/07-debugging/01-solution/src/screens/StateList/StateList.tsx ../../../exercises/react-native/07-debugging/02-solution/src/screens/StateList/StateList.tsx only

### Exercise 2

Execute the command:

✏️ Run:

```shell
npm run debugger
```

The application should be running in Android Studio. Open the terminal and run the following command:

✏️ Run:

```shell
adb shell input keyevent 82
```

This will open up the dev menu. It should look like the following image:

<img alt="Screenshot of the emulator displaying the React Native Developer Menu. The screen lists various options like Reload, Open Debugger, Change Bundle Location, Show Element Inspector, Disable Fast Refresh, Show Perf Monitor, Settings, and Enable Sampling Profiler." src="../static/img/react-native/07-debugging-devtools/in-app-dev-menu.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

Clicking on "Open Debugger" will open up a separate window for debugging.

### Exercise 2

Exploring the debugger:

- View where the `console.log("Hello World)` is being printed.
- Step through your code using the debugger controls (step into, step over, step out) to understand its execution flow.

## Next steps

Next, let’s learn about different ways to apply [learn-react-native/styling] to React Native applications.
