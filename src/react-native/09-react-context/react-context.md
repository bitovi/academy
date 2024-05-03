@page learn-react-native/react-context Using React Context
@parent learn-react-native 9
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Create a theme with shared values

TODO

### Sharing values across your app with React Context

TODO

### Setup 1

✏️ Create **src/design/theme/ThemeProvider.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/ThemeProvider.tsx

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/08-styling/01-solution/src/App.tsx ../../../exercises/react-native/09-react-context/01-problem/src/App.tsx only

✏️ Update **src/screens/StateList/components/ListItem/ListItem.tsx** to be:

@diff ../../../exercises/react-native/08-styling/01-solution/src/screens/StateList/components/ListItem/ListItem.tsx ../../../exercises/react-native/09-react-context/01-problem/src/screens/StateList/components/ListItem/ListItem.tsx only

### Verify 1

✏️ Create **src/design/theme/ThemeProvider.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/ThemeProvider.test.tsx

### Exercise 1

TODO

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/design/theme/ThemeProvider.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/01-problem/src/design/theme/ThemeProvider.tsx ../../../exercises/react-native/09-react-context/01-solution/src/design/theme/ThemeProvider.tsx only

✏️ Update **src/screens/StateList/components/ListItem/ListItem.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/01-problem/src/screens/StateList/components/ListItem/ListItem.tsx ../../../exercises/react-native/09-react-context/01-solution/src/screens/StateList/components/ListItem/ListItem.tsx only

</details>

## Next steps

TODO
