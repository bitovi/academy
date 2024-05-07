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
- Learn about the useState Hook.
- Create custom Hooks.

## Objective: Toggle between light and dark mode

We will be setting up the application to switch between light mode and dark mode:
<div style="display: flex; flex-direction: row; gap: 2rem">
  <img alt="Screenshot of the application when it is in light mode." src="../../static/img/react-native/10-managing-state/lightMode.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>
  <img alt="Screenshot of the application when it is in dark mode." src="../../static/img/react-native/10-managing-state/darkMode.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>
</div>

### Concept TODO

TODO

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

TODO

### Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/10-managing-state/01-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/10-managing-state/01-solution/src/screens/StateList/StateList.tsx only

✏️ Update **src/design/theme/ThemeProvider.tsx** to be:

@diff ../../../exercises/react-native/10-managing-state/01-problem/src/design/theme/ThemeProvider.tsx ../../../exercises/react-native/10-managing-state/01-solution/src/design/theme/ThemeProvider.tsx only

</details>

## Next steps

TODO