@page learn-react-native/intro-to-jsx Introduction to JSX
@parent learn-react-native 4
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Create a UI with JSX

Now that we have our project set up, let’s update our page to look like the design below:

<img alt="Screenshot of a mobile application interface text “Place My Order: Coming Soon To...” and “Illinois“." src="../../static/img/react-native/04-intro-to-jsx/01-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### Concept TODO

TODO

### Setup 1

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/04-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/01-problem/App.tsx only

### Verify 1

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-native/03-creating-a-new-app/04-solution/App.test.tsx ../../../exercises/react-native/04-intro-to-jsx/01-problem/App.test.tsx only

### Exercise 1

- Use JSX to dynamically display the state name from the object variable.

Hint: the state object will look like this:

```typescript
const state = { name: "Illinois", short: "IL" }
```

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:
@diff ../../../exercises/react-native/03-creating-a-new-app/04-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.tsx only

</details>

## Objective 2: Expressions and loops in JSX

Next, we want to render a list of states name in our application:

<img alt="Screenshot of a mobile application interface text “Place My Order: Coming Soon To...”, “Illinois“, and “Wisconsin“." src="../../static/img/react-native/04-intro-to-jsx/02-solution.png" style="max-height: 750px; border: 4px solid black; border-radius: 25px;"/>

### Concept TODO

TODO

### Setup 2

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/02-problem/App.tsx only

### Verify 2

✏️ Update **src/App.test.tsx** to be:

@diff ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.test.tsx ../../../exercises/react-native/04-intro-to-jsx/02-problem/App.test.tsx only

### Exercise 2

- Update the existing JSX to render the list of state names.
- Use `Array.map()` to iterate over the `states`.
- Make sure to use `key` inside the `.map()`.
- Render `<Text>No states found</Text>` if, hypothetically, there weren’t any states.

Hint: the states array will look like this:

```typescript
const states = [
  {
    name: "Illinois",
    short: "IL",
  },
  {
    name: "Wisconsin",
    short: "WI",
  },
]
```

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:
@diff ../../../exercises/react-native/04-intro-to-jsx/01-solution/App.tsx ../../../exercises/react-native/04-intro-to-jsx/02-solution/App.tsx only

</details>

## Next steps

Next, we will learn the [learn-react-native/intro-to-testing] React Native applications.
