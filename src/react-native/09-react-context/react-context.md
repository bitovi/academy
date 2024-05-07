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

## Objective 2: Begin creating a design system to unify your application

TODO

### Setup 2

✏️ Create **src/design/Box/Box.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Box/Box.tsx

✏️ Create **src/design/Box/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Box/index.ts

✏️ Create **src/design/Typography/Typography.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/Typography.tsx

✏️ Create **src/design/Typography/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/index.ts

### Verify 2

✏️ Create **src/design/Box/Box.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Box/Box.test.tsx

✏️ Create **src/design/Typography/Typography.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/Typography.test.tsx

### Exercise 2

TODO

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/design/Typography/Typography.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/02-problem/src/design/Typography/Typography.tsx ../../../exercises/react-native/09-react-context/02-solution/src/design/Typography/Typography.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/02-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/09-react-context/02-solution/src/screens/StateList/StateList.tsx only

</details>

## Objective 3: Expand your design system

TODO

### Setup 3

✏️ Create **src/design/Button/Button.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Button/Button.tsx

✏️ Create **src/design/Button/Button.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Button/Button.test.tsx

✏️ Create **src/design/Button/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Button/index.ts

✏️ Create **src/design/Card/Card.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Card/Card.tsx

✏️ Create **src/design/Card/Card.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Card/Card.test.tsx

✏️ Create **src/design/Card/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Card/index.ts

✏️ Create **src/design/Screen/Screen.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Screen/Screen.tsx

✏️ Create **src/design/Screen/Screen.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Screen/Screen.test.tsx

✏️ Create **src/design/Screen/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/09-react-context/03-problem/src/design/Box/index.ts

### Exercise 3

TODO

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/09-react-context/03-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/09-react-context/03-solution/src/screens/StateList/StateList.tsx only

</details>

## Next steps

TODO
