@page learn-react/props Passing Props
@parent learn-react 5
@outline 3

@description Learn how to provide data to a component through props.

@body

## Overview

In this section, we will:

- Understand what props are and how they work in React
- Define a component’s props using TypeScript interfaces
- Use props within a child component
- Pass props from a parent component to a child component

## Objective: Use props to make more maintainable components

We’ve taken a great step to make our code more readable and our app more maintainable by creating the `RestaurantList` component.

Let’s keep the good refactoring rolling by creating a `ListItem` component to house the JSX used to render each restaurant in the list.

### Using component props

In React, props (short for “properties”) are how we pass data from a parent component to a child component. Since function React components are fundamentally JavaScript functions, you can think of props like the arguments you pass to a function.

Also note that React component props are not the same as the "properties" that exist on a DOM element.

To receive props, function components must implement a React API that allows an optional argument of type `object` that’s named `props`.

The properties on the props object—individually called a “prop”—can include whatever data the child component needs to make the component work. The property values can be any type, including functions and other React components.

We’re using TypeScript in our project, so we can create an `interface` for props and use it in the definition of a function component.

Let’s create a `SubmitButton` component to see props in action:

```tsx
interface SubmitButtonProps {
  label: string
  onClick: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { label, onClick } = props
  return (
    <button onClick={onClick} type="submit">
      {label}
    </button>
  )
}
```

In this example, `SubmitButtonProps` is an interface that defines the types for `label` (a string) and `onClick` (a function). Our `SubmitButton` component then uses these props to display a button with a label and a click action.

The example above illustrates how props are passed to component as an argument.

However, more commonly (and for the rest of this course) you will see props destructured in the function parameters:

```tsx
interface SubmitButtonProps {
  label: string
  onClick: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>
}
```

@highlight 6 only

### Passing component props

Now, how do we use this `SubmitButton`? In [JSX syntax](intro-to-jsx.html) a component’s props look like an HTML tag’s "attributes" and accept a value.

- If a prop’s value type is a string then the prop value is set using quotes.
- Any other type of prop value is set using braces with the value inside.

In the example below, the `label` prop accepts a string. so the value is surrounded by double quotes. The `onClick` prop accepts a function, so the function value is surrounded by braces.

Here’s how to use our `SubmitButton`:

```tsx
const content = (
  <SubmitButton label="Activate" onClick={() => alert("Activated!")} />
)
```

In the example above, we’re setting the `label` prop to the string “Activate” and the `onClick` prop to a function that displays an alert.

### Reserved prop names

There are two prop names that you cannot use and are reserved by React:

- `children`: this prop is automatically provided by React to every component. We will see this prop in later examples.

- `key`: this prop is one you’ve seen before in the [Introduction to JSX module](intro-to-jsx.html#the-key-prop)! It’s not actually part of the component’s props in a traditional sense. Instead, it’s used by React itself to manage lists of elements and identify which items have changed, been added, or been removed.

### Setup

✏️ Create **src/pages/RestaurantList/ListItem.tsx** and update it to contain:

@sourceref ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/ListItem.tsx

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to import `ListItem`:

@diff ../../../exercises/react-vite/04-components/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/RestaurantList.tsx only

### Verify

These tests will pass when the solution has been implemented properly.

✏️ Create **src/pages/RestaurantList/ListItem.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/ListItem.test.tsx

### Exercise

- Update `ListItem` to accept props with restaurant data.
- Alter `ListItem` to return the JSX for a single item in `restaurants.data`, use props for the variable data.
- Refactor `RestaurantList` to use `ListItem` to render the items in `restaurants.data`.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/05-props/01-problem?file=src/pages/RestaurantList/ListItem.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/05-props/01-problem?file=src/pages/RestaurantList/ListItem.tsx) to do this exercise in an online code editor.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/ListItem.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/ListItem.tsx ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/ListItem.tsx only

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/05-props/01-solution?file=src/pages/RestaurantList/ListItem.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/05-props/01-solution?file=src/pages/RestaurantList/ListItem.tsx).

</details>

## Next steps

Next, let’s [learn about routing](./routing.html) to update the URL based on the view we’re looking at, and vice versa.
