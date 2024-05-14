@page learn-react-native/managing-state Managing State with useState
@parent learn-react-native 10
@outline 3

@description Work with React’s useState Hook to manage a component’s state.

@body

## Overview

In this section, you will:

- Get an overview of state management.
- Cover the fundamentals of React Hooks.
- Review the Rules of Hooks.
- Learn about the `useState` Hook.
- Create custom Hooks.

## Objective: Toggle between light and dark mode

We will be setting up the application to switch between light mode and dark mode:

<div style="display: flex; flex-direction: row; gap: 2rem">
  <img alt="Screenshot of the application when it is in light mode." src="../static/img/react-native/10-managing-state/lightMode.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>
  <img alt="Screenshot of the application when it is in dark mode." src="../static/img/react-native/10-managing-state/darkMode.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>
</div>

### Overview of state management

State in React Native is a crucial concept, as it represents the parts of an app that can change over time. Each component can have its state, allowing them to maintain and manage their data independently. When the state changes, React Native re-renders and update the native UI components if it needs to.

There are different types of state within an application:

- **Global State:** This refers to data that is shared between multiple components. In React Native, global state can be managed using Context API or state management libraries; this is covered in the previous lesson [learn-react-native/react-context].
- **Local State:** This is data we manage in the component that uses it. Local state is managed in React Native using the `useState` Hook.
- **UI State:** This is a subset of Local State, but is limited to minor UI effects, such as the visibility of a drawer or open section of an accordion.

### Intro to React Hooks

We’ve mentioned before that `useState` is a Hook for managing state, but what does that mean?

React Hooks (referred to as just Hooks for the rest of this training) are special functions that allow us to “hook” into React Native functionality. Hooks provide us with many conveniences like sharing stateful logic between components and simplifying what would be otherwise complex components.

We’ve already seen and used a Hook while building Place My Order! Do you remember this code from earlier?

@sourceref ./ThemeProvider.tsx
@highlight 4, 17, 25

The `useContext` and `useMemo` Hook from `react` allowed us to optimize the performance of our applications by efficiently managing context and memoizing expensive computations respectively.

### The Rules of Hooks

React Native imposes several rules around the use of Hooks:

- **First,** only call Hooks from React Native function components or your custom Hooks.

- **Second,** all the Hooks in a React Native function must be invoked in the same order every time the function runs, so no Hooks can occur after an `if`, `loop`, or `return` statement. Typically this means all Hooks are placed at the top of the React Native function body.

- **Third,** Hooks must be named by prefixing their functionality with `use` (e.g. `useContext`).

### The useState Hook

We can store the state that persists through component rendering with the `useState` Hook. You can set the initial state value when the component **first** renders by providing the value as an argument to the Hook. \_If you do not provide a value the initial state value will be `undefined`.

This example shows a `useState` Hook being set with an initial value of `""`:

@sourceref ./useState.tsx
@highlight 1, 5, only

As you can see in the previous example, `useState` returns an array with two elements: the first is the current state value of the Hook, and the second is a setter function that is used to update the state value.

In the following code, the value is being rendered and the setter is being used to keep track of which input value the user has typed:

@sourceref ./useState.tsx
@highlight 8, only

Every time a `useState`’s setter is invoked with a new value, React Native compares the new value with the current value. If the values are the same, nothing happens; **if the values are different, React Native will rerender the component** so the new state value can be used to update the component.

In the example above, when the user types, the `NameField` component is rendered again, and the `TextInput` is updated with the current value.

### What are custom Hooks?

React Native's Hooks API provides a powerful and flexible way to encapsulate and reuse functionality across our components. While React Native comes with a set of built-in Hooks, we can also create our own custom Hooks. This allows us to abstract component logic into reusable functions. Custom Hooks are particularly useful when we find ourselves repeating the same logic in multiple components.

Custom Hooks are JavaScript functions that can use other React Hooks and provide a way to share logic across multiple components. Like built-in Hooks, custom Hooks must adhere to React’s rules of Hooks. The naming convention for custom Hooks is to start with `use`, like `useCustomHook`.

### Why use custom Hooks?

Putting stateful logic into a custom Hook has numerous benefits:

**Reusability:** One of the primary reasons for creating custom Hooks is reusability. You might find yourself repeating the same logic in different components—for example, fetching data from an API, handling form input, or managing a subscription. By refactoring this logic into a custom Hook, you can easily reuse this functionality across multiple components, keeping your code DRY (Don’t Repeat Yourself).

**Separation of concerns:** Custom Hooks allow you to separate complex logic from the component logic. This makes your main component code cleaner and more focused on rendering UI, while the custom Hook handles the business logic or side effects. It aligns well with the principle of single responsibility, where a function or module should ideally do one thing only.

**Easier testing and maintenance:** Isolating logic into custom Hooks can make your code easier to test and maintain. Since Hooks are just JavaScript functions, they can be tested independently of any component. This isolation can lead to more robust and reliable code.

**Simplifying components:** If your component is becoming too large and difficult to understand, moving some logic to a custom Hook can simplify it. This not only improves readability but also makes it easier for other developers to grasp what the component is doing.

### How to create a custom Hook

To create a custom Hook, you start by defining a function that starts with `use`. This Hook can call other Hooks and return whatever value is necessary.

Let’s look at the provided Hook below that keeps track of a boolean state, and also provides a function for toggling that state:

@sourceref ./useToggle.tsx

In the example above, you can see that our `useToggle` Hook is a function that has an internal `useState` to keep track of the toggle’s on/off status. This Hook has a `handleToggle` function for changing its internal state. Lastly, we can see that the `useToggle` Hook returns an array with the `on` status and the `handleToggle` function.

### How to use a custom Hook

How would we use this Hook? Let’s take a look at this example:

@sourceref ./Toggle.tsx
@highlight 4, 7, 13-14, 16, only

In this component, we call our `useToggle` Hook with the initial state (`true`). Our Hook returns the `active` state and `toggleActive` function for changing the on/off state.

This is how we can create our custom `useToggle` Hook and call it in our components, just like React’s built-in Hooks!

### Setup

✏️ Update **src/design/theme/theme.ts** to be:

@diff ../../../exercises/react-native/09-react-context/03-solution/src/design/theme/theme.ts ../../../exercises/react-native/10-managing-state/01-problem/src/design/theme/theme.ts only

✏️ Update **src/design/theme/ThemeProvider.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/03-solution/src/design/theme/ThemeProvider.tsx ../../../exercises/react-native/10-managing-state/01-problem/src/design/theme/ThemeProvider.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/03-solution/src/screens/StateList/StateList.tsx ../../../exercises/react-native/10-managing-state/01-problem/src/screens/StateList/StateList.tsx only

### Verify

✏️ Update **src/design/theme/theme.test.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/03-solution/src/design/theme/ThemeProvider.test.tsx ../../../exercises/react-native/10-managing-state/01-problem/src/design/theme/ThemeProvider.test.tsx only

✏️ Update **src/screens/StateList/StateList.test.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/03-solution/src/screens/StateList/StateList.test.tsx ../../../exercises/react-native/10-managing-state/01-problem/src/screens/StateList/StateList.test.tsx only

### Exercise

✏️ Refactoring **src/design/theme/ThemeProvider.tsx**:

- Update `Context` to set default values for `mode` and `setMode`.
- Update `ThemeProvider` to use `useState`, so the user can switch between the 2 modes.
- Update `useTheme` to return 1 theme based on the `mode` that is stored in the context.
- Update `useThemeMode` to return `mode` and `setMode`.

✏️ Refactoring **src/screens/StateList/StateList.tsx**:

- Display the `Switch` component to allow users to toggle.
- Using the recently created `useThemeMode` Hook, combine it with the `Switch` component.

### Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/design/theme/ThemeProvider.tsx** to be:

@diff ../../../exercises/react-native/10-managing-state/01-problem/src/design/theme/ThemeProvider.tsx ../../../exercises/react-native/10-managing-state/01-solution/src/design/theme/ThemeProvider.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/10-managing-state/01-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/10-managing-state/01-solution/src/screens/StateList/StateList.tsx only

</details>

## Next steps

Next, we will learn how to switch screens with [learn-react-native/navigation].
