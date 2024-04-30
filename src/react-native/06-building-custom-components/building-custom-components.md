@page learn-react-native/building-custom-components Building Custom Components
@parent learn-react-native 6
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Creating a custom component

TODO

### Concept TODO

TODO

### Setup 1

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/02-solution/App.tsx ../../../exercises/react-native/06-custom-components/01-problem/App.tsx only

### Verify 1

✏️ Update **App.test.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/02-solution/App.test.tsx ../../../exercises/react-native/06-custom-components/01-problem/App.test.tsx only

### Exercise 1

- Update the `StateList` component to contain the logic that iterates over the `states` list.
- Use the new `StateList` component inside of the `App` component.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/01-problem/App.tsx ../../../exercises/react-native/06-custom-components/01-solution/App.tsx only

</details>

## Objective 2: Passing props

TODO

### Concept TODO

TODO

### Setup 2

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/01-solution/App.tsx ../../../exercises/react-native/06-custom-components/02-problem/App.tsx only

### Verify 2

✏️ Update **App.test.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/01-solution/App.test.tsx ../../../exercises/react-native/06-custom-components/02-problem/App.test.tsx only

### Exercise 2

- Update the `ListItemProps` type to enforce a `key` and `name` property of the appropriate primitive type.
- Update the `ListItem` component to use the `ListItemProps` as its input type and return the `name` property of the a `state` index.
- Update the `StateList` component to use the `ListItem` component handle each state index.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/02-problem/App.tsx ../../../exercises/react-native/06-custom-components/02-solution/App.tsx only


</details>

## Objective 3: Organizing code: Modlets pattern

TODO

### Concept TODO

TODO

### Setup 3

It’s best practice to create a new folder that will contain all of the related files for each component, including test files.

✏️ Update **index.js** to be:

@diff ../../../exercises/react-native/06-custom-components/02-solution/index.js ../../../exercises/react-native/06-custom-components/03-problem/index.js only

✏️ Create **src/** (folder)

✏️ Move **App.tsx** to **src/App.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/App.tsx

✏️ Create **src/screens/StateList** (folder)

✏️ Create **src/screens/StateList/StateList.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/StateList.tsx

✏️ Create **src/screens/StateList/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/index.ts

✏️ Create **src/screens/StateList/components/ListItem** (folder)

✏️ Create **src/screens/StateList/components/ListItem/ListItem.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/ListItem.tsx

✏️ Create **src/screens/StateList/components/ListItem/index.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/index.ts

### Verify 3

✏️ Move **App.test.tsx** to **src/App.test.tsx** and update it to be:

@diff ../../../exercises/react-native/06-custom-components/02-solution/App.test.tsx ../../../exercises/react-native/06-custom-components/03-problem/src/App.test.tsx only

✏️ Create **src/screens/StateList/StateList.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/StateList.test.tsx

✏️ Create **src/screens/StateList/components/ListItem/ListItem.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/ListItem.test.tsx

### Exercise 3

- Move the `StateList` and `ListItem` component logic into the correct file.
- Make sure to properly update each `import` and to reference every component's essential files.

### Solution 3

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/03-problem/src/App.tsx ../../../exercises/react-native/06-custom-components/03-solution/src/App.tsx only

✏️ Update **src/screens/StateList/StateList.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/StateList.tsx ../../../exercises/react-native/06-custom-components/03-solution/src/screens/StateList/StateList.tsx only

✏️ Update **src/screens/StateList/components/ListItem/ListItem.tsx** to be:

@diff ../../../exercises/react-native/06-custom-components/03-problem/src/screens/StateList/components/ListItem/ListItem.tsx ../../../exercises/react-native/06-custom-components/03-solution/src/screens/StateList/components/ListItem/ListItem.tsx only

</details>

## Next steps

Next we will learn about debugging by using React Devtools [react-native/debugging-devtools].