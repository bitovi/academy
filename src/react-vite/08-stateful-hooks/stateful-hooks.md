@page learn-react-vite/stateful-hooks Managing State in React
@parent learn-react-vite 8
@outline 3

@description Work with React's useState hook to manage a component's state.

@body

## Overview

When users make choices that need to be maintained or that affect other parts of
the UI, we need to use "state." This lesson introduces React hooks that manage
component state.

## Objective: Manage component state using hooks

React provides hooks that simplify managing state in a component. We will use
some of these hooks to store the user's selections for state and city.

> Note: Hooks must always appear in the body of the component **before** any
> statements that might change the component's behavior. Place hooks at the top
> of a component's body.

### useState

We can store state that persists through component rendering with the `useState`
hook. You can set the initial state value when the component **first** renders
by providing the value as an argument to the hook. _If you do not provide a
value the initial state value will be `undefined`._

This example shows a `useState` hook being set with an initial value from an
`initialText` prop.

```jsx
const FancyInput: React.FC<Props> = ({ initialText }) => {
  const [value, setValue] = useState(initialText)
}
```

As you can see in the previous example, `useState` returns an array with two
elements: the first is the current value of the hook, and the second is a setter
function that is used to update the state value. In the following code, the
value and setter are being used to update changes to an input element.

```jsx
const FancyInput: React.FC<Props> = ({ initialText }) => {
  const [value, setValue] = useState(initialText)
  return <input onChange={(evt) => setValue(evt.target.value)} value={value} /> 
}
```

Every time a `useState`'s setter is invoked with a new value, React compares the
new value with the current value. If the values are the same, nothing happens;
**if the values are different, React will rerender the component** so the new
value can be used to update the component. In the example above, when the user
types or changes the value of the input, the `FancyInput` component is rendered
again, and the input is updated with the current value.

> Watch out! To determine if a state value has changed React compares value
> types like `object` and array by instance, not by their contents. Other types,
> like number, string, and boolean, are compared by their value.

### useId

One of the newer hooks that React includes is `useId`. Since the value of every
`id` attribute in an HTML document must be unique, this hook is useful in
creating a unique identifier string that can be used as the value of `id` props.

```jsx
const FancyInput: React.FC<Props> = ({ initialText }) => {
  const [value, setValue] = useState(initialText)
  const id = useId();
  return (
    <label htmlFor={id}>Name:</label>
    <input id={id} onChange={(evt) => setValue(evt.target.value)} value={value} />
  )
}
```

### Setup

<span style="color:red">I think we should add the code related to the state
object arrays, form, and the selects during setup. Then the exercise will
involve adding the hooks and wiring state and the setters up to the code.</span>

### Verify

These tests will pass when the solution has been implemented properly.

✏️ Update **src/pages/RestaurantList/RestaurantList.test.tsx** to import
`@testing-library/user-event`:

@sourceref ../../../exercises/react-vite/08-stateful-hooks/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx
@highlight 3, only

✏️ Add the following tests to
**src/pages/RestaurantList/RestaurantList.test.tsx**:

@sourceref ../../../exercises/react-vite/08-stateful-hooks/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx
@highlight 14-44, only

### Exercise

- The selected **state** value should be managed by a `useState` hook.
- The selected **city** value should be managed by a `useState` hook.
- Link associated elements together using id values provided by `useId` hooks.

<strong>Having issues with your local setup?</strong> You can use either
[StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/08-stateful-hooks/01-solution?file=src%2Fpages%2FRestaurantList%2FRestaurantList.tsx)
or
[CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/08-stateful-hooks/01-solution?file=src%2Fpages%2FRestaurantList%2FRestaurantList.tsx)
to do this exercise in an online code editor.

### Solution

<details>
<summary>Click to see the solution</summary>

<span style="color:red">See comment in setup. This current diff seems like a lot
of code for students to figure out in the amount of time available.</span>

@diff ../../../exercises/react-vite/07-styling-in-react/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/08-stateful-hooks/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

</details>
