@page learn-react-native/debugging-devtools Debugging and DevTools
@parent learn-react-native 7
@outline 3

@description Learn how to set up and use both DevTools and Debugger.

@body

## Overview

In this section, you will:

- Use React DevTools.
- Use React Native’s debugger.

## Objective 1: React DevTools

We will be setting up React DevTools to help us inspect the UI:

<img alt="Screenshot of React DevTools inspecting a component tree. It shows a structured hierarchy of all the components in the view. There is also a Profiler tab." src="../static/img/react-native/07-debugging-devtools/dev-tool-connected.png" style="max-width: 100%;"/>

### Using React DevTools

React DevTools is an extension that provides a powerful set of tools for inspecting and debugging React Native applications. It allows developers to inspect and manipulate the hierarchy of React Native components rendered in their mobile applications. With React DevTools, developers can easily identify component structures, inspect props and state, track component updates, and even modify component props in real-time, greatly enhancing the debugging and development process for React Native projects.

By examining the JSX code below, developers can gain insight into how React Native components are structured and composed. Comparing the JSX code with the React DevTools component tree allows developers to visualize how each JSX element corresponds to a component instance in the application, providing a deeper understanding of their React applications and aiding in debugging and optimization efforts.

```jsx
<App>
  <ScrollView>
    <View>
      <Text>Place My Order: Coming Soon!</Text>
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

✏️ Install the new dev dependency:

```shell
npm install --save-dev react-devtools@5
```

✏️ Update **src/package.json** to be:

@sourceref ../../../exercises/react-native/07-debugging/01-solution/package.json
@highlight 9, only

### Verify 1

While the application is running execute the command:

✏️ Run:

```shell
npm run devtools
```

This should open a separate window that looks like the following image:

<img alt="Screenshot of a window with options for React Native and React DOM. The React Native section suggests opening the in-app developer menu. A notification at the top states the server is waiting for React to connect." src="../static/img/react-native/07-debugging-devtools/dev-tool-not-connected.png" style="max-width: 100%;"/>

At this point, DevTools is not connected.
To connect DevTools to the application, go back to the terminal where you ran `npm run start` and press `r` to reload.

### Exercise 1

Explore the “Components” tab:

- Use the "Components" tab to explore the hierarchical structure of the React Native components in the application.
- Expand and collapse component trees to understand the component composition.
- Hover over individual components to highlight them.

Inspect props and state:

- Select a component from the component tree to inspect its props and state.
- View the current props and state values, and observe how they affect the component’s rendering.

Modify props:

- Experiment with modifying props directly from the DevTools panel.
- Change prop values and observe how they affect the component’s appearance or behavior in real-time.

## Objective 2: React Native’s debugger

We will be setting up React Native Debugger to help us debug:

<img alt="Screenshot of the React Native JavaScript Inspector interface. It includes common DevTools tabs such as Console, Sources, Memory, and Profiler." src="../static/img/react-native/07-debugging-devtools/react-native-debugger.png" style="max-width: 100%;"/>

### Using React Native’s debugger

React Native Debugger, is a feature in React Native that serves as a debugging tool for developers to step through the code, analyze props, and state more efficiently in their React Native applications. React Native Debugger provides valuable insights into the application's state and flow. React Native Debugger will enhance the debugging process for React Native projects, offering essential functionalities for identifying and resolving issues during development.

### Setup 2

✏️ Update **src/package.json** to be:

@diff ../../../exercises/react-native/07-debugging/01-solution/package.json ../../../exercises/react-native/07-debugging/02-solution/package.json only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/07-debugging/01-solution/src/screens/StateList/StateList.tsx ../../../exercises/react-native/07-debugging/02-solution/src/screens/StateList/StateList.tsx only

### Exercise 2

Execute the command:

✏️ Terminate your existing `npm run start` process and run:

```shell
npm run start
```

The application should be running in Android Studio. Open the terminal and run the following command:

// TODO

✏️ Run:

```shell
adb shell input keyevent 82
```

This will open up the dev menu. It should look like the following image:

<img alt="Screenshot of the emulator displaying the React Native Developer Menu. The screen lists various options like Reload, Open Debugger, Change Bundle Location, Show Element Inspector, Disable Fast Refresh, Show Perf Monitor, Settings, and Enable Sampling Profiler." src="../static/img/react-native/07-debugging-devtools/in-app-dev-menu.png" style="max-height: 420px; border: 4px solid black; border-radius: 25px;"/>

Clicking on "Open Debugger" will open up a separate window for debugging.

To see where the `debugger` is currently stopped, click on `StateList` under the “Call Stack” section in the right page of the “Sources” tab.

### Exercise 2

Exploring the debugger:

- View where the `console.info("Inside the StateList component.")` is being printed.
- Step through your code using the debugger controls (step into, step over, step out) to understand its execution flow.

## Next steps

Next, let’s learn about different ways to apply [learn-react-native/styling] to React Native applications.
