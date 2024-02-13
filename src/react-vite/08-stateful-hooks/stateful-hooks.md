@page learn-react-vite/stateful-hooks Managing State in React
@parent learn-react-vite 8
@outline 3

@description Work with React's useState hook to manage a component's state.

@body

## Overview

## Objective: Introducing React hooks and useId

Learn about React hooks and use one!

### React hooks

React hooks (referred to as just hooks for the rest of this training) are
special functions that allow developers to “hook” into React functionality.
Hooks provide developers with many conveniences like sharing stateful logic
between components and simplifying what would be otherwise complex components.

Hooks can only be used in functional components. Almost anything that could be
done in a class component can be done with hooks. _The one thing that class
component can do that hooks cannot is implement error boundaries._

React imposes a few rules around the use of hooks: first, only call hooks from
"React functions," which is either a functional component or a custom hook. The
second rule is that all the hooks in a React function must be invoked in the
same order every time the function runs, so no hooks can occur after an `if`,
`loop`, or `return` statement. Typically this means all hooks are placed at the
top of the React function body.

Although not a requirement, a naming convention for hooks is imposed by the
community: hooks should be named by prefixing their functionality with "use." An
illustrative example is `useId` which allows developers to create unique IDs in
functional components.

### useId

Let's start with one of the newer hooks that React includes: `useId`. Since the
value of every `id` attribute in an HTML document must be unique, this hook is
useful in creating a unique identifier string that can be used as the value for
an `id` prop.

```jsx
const List: React.FC = () => {
  const id = useId();
  return (
    <label htmlFor={id}>Name:</label>
    <select id={id}><select>
  )
}
```

The value of `useId` is guaranteed to be unique within the component where it is
used; this ideal for linking related components together.

### Setup

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to include the State
and City dropdown lists.

@diff ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/08-stateful-hooks/01-problem/src/pages/RestaurantList/RestaurantList.tsx only

### Verify

These tests will pass when the solution has been implemented properly.

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx**:

@diff ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/08-stateful-hooks/01-problem/src/pages/RestaurantList/RestaurantList.test.tsx only

### Exercise

- Link `<label>` and `<select>` components together using id values provided by
  `useId` hooks.

<strong>Having issues with your local setup?</strong> You can use either
[StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/08-stateful-hooks/01-problem?file=src%2Fpages%2FRestaurantList%2FRestaurantList.tsx)
or
[CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/08-stateful-hooks/01-problem?file=src%2Fpages%2FRestaurantList%2FRestaurantList.tsx)
to do this exercise in an online code editor.

### Solution

<details>
<summary>Click to see the solution</summary>

@diff ../../../exercises/react-vite/08-stateful-hooks/01-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/08-stateful-hooks/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

</details>

## Objective: Manage component state using hooks

When users make choices that need to be maintained or that affect other parts of
the UI, we need to use `state`. That's a pretty abstract concept so let's look
at a concrete example from the Place My Order Restaurants tab.

There are two dropdown lists — "State" which has a list of U.S. states, and
another named "City" that displays a list of cities located in the selected
"State" item. Until the user makes a choice in the "State" dropdown the "City"
dropdown is disabled.

<img src="../../../static/img/react-vite/08-stateful-hooks/why-state-1.png" style="box-shadow:2px 2px 10px 3px rgb(0 0 0 / 70%);max-width:838px">

If "Wisconsin" is chosen in the "State" dropdown that value needs to persist
through component rendering and be available for use throughout the code:
getting the cities for Wisconsin, and enabling the "City" dropdown list. To
accomplish that the value "Wisconsin" is stored in React `state`.

<img src="../../../static/img/react-vite/08-stateful-hooks/why-state-2.png" style="box-shadow:2px 2px 10px 3px rgb(0 0 0 / 70%);max-width:839px">

### useState

We can store state that persists through component rendering with the `useState`
hook. You can set the initial state value when the component **first** renders
by providing the value as an argument to the hook. _If you do not provide a
value the initial state value will be `undefined`._

This example shows a `useState` hook being set with an initial value of an empty
string.

```jsx
const List: React.FC = () => {
  const [value, setValue] = useState("")
}
```

As you can see in the previous example, `useState` returns an array with two
elements: the first is the current state value of the hook, and the second is a
setter function that is used to update the state value. In the following code,
the value and setter are being used to update changes in a select component.

```jsx
const List: React.FC = () => {
  const [value, setValue] = useState("")
  return <select onChange={(evt) => setValue(evt.target.value)} value={value} /> 
}
```

Every time a `useState`'s setter is invoked with a new value, React compares the
new value with the current value. If the values are the same, nothing happens;
**if the values are different, React will rerender the component** so the new
state value can be used to update the component. In the example above, when the
user makes a selection, the `List` component is rendered again, and the select
is updated with the current value.

### Setup

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be the following:

@diff ../../../exercises/react-vite/08-stateful-hooks/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/08-stateful-hooks/02-problem/src/pages/RestaurantList/RestaurantList.tsx only

### Verify

These tests will pass when the solution has been implemented properly.

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to be the
following:

@diff ../../../exercises/react-vite/08-stateful-hooks/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.test.tsx only

### Exercise

- The selected **state** value should be managed by a `useState` hook.
- The selected **city** value should be managed by a `useState` hook.
- The City select should only include cities for the selected state.

<strong>Having issues with your local setup?</strong> You can use either
[StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/08-stateful-hooks/01-solution?file=src%2Fpages%2FRestaurantList%2FRestaurantList.tsx)
or
[CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/08-stateful-hooks/01-solution?file=src%2Fpages%2FRestaurantList%2FRestaurantList.tsx)
to do this exercise in an online code editor.

### Solution

<details>
<summary>Click to see the solution</summary>

@diff ../../../exercises/react-vite/08-stateful-hooks/02-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/08-stateful-hooks/02-solution/src/pages/RestaurantList/RestaurantList.tsx only

</details>
