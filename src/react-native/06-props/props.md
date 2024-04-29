@page learn-react-native/props Passing Props
@parent learn-react-native 6

@description Learn how to provide information to a component through props.

@body

## Overview

- Learn about passing data to components using props.

## Objective 1: Use and set props

In this section, we will:

- Understand what props are and how they work in React
- Define a component’s props using TypeScript interfaces
- Use props within a child component
- Pass props from a parent component to a child component

### Using component props

In React, props (short for “properties”) are how we pass data from a parent
component to a child component. Since functional React components are “just”
JavaScript functions, you can think of props like the arguments you pass to
a function.

To receive props, functional components must implement a React API that
allows an optional argument of type `object` that’s named "props".

The properties on the props object—individually called a “prop”—can include
whatever data the child component needs to make
the component work. The property values can be any type, including functions and
other React components.

We're using TypeScript in our project so we can create an `interface` for props
and use it in the definition of a functional component. Let’s create a `SubmitButton`
component to see props in action:

```jsx
interface SubmitButtonProps {
  label: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { label, onClick } = props;
  return <button onClick={onClick} type="submit">{label}</button>;
}
```

In this example, `SubmitButtonProps` is an interface that defines the types for
`label` (a string) and `onClick` (a function). Our `SubmitButton` component then
uses these props to display a button with a label and a click action.

The example above illustrates how props are passed to component as an argument.
However, more commonly (and for the rest of this course) you will see props
destructured in the function parameters:

```jsx
interface SubmitButtonProps {
  label: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
}
```
@highlight 6 only

### Passing component props

Now, how do we use this `SubmitButton`?
In [JSX syntax](intro-to-jsx.html) a component’s props look like an HTML tag’s
"attributes" and accept a value.

- If a prop's value type is a string then the prop value is set using quotes.
- Any other type of prop value is set using braces with the value inside.

In the
  example below, the `label` prop accepts a string. so the value is surrounded
  by double quotes. The `onClick` prop accepts a function, so the function value
  is surrounded by braces.

Here’s how to use our `SubmitButton`:

```jsx
<SubmitButton
  label="Activate"
  onClick={() => alert("Activated!")}
/>
```

In the example above, we’re setting the `label` prop to the string “Activate” and the
`onClick` prop to a function that displays an alert.

### Reserved prop names

There are two prop names that you cannot use and are reserved by React:

- `children`: this prop is automatically provided by React to every component. We will see this prop in later examples.

- `key`: this prop is one you’ve seen in a previous section! It’s not actually part of the component’s props in a traditional sense. Instead, it’s used by React itself to manage lists of elements and identify which items have changed, been added, or been removed.

### Setup

✏️ Create **src/pages/RestaurantList/ListItem.tsx** and update it to contain:

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to import `ListItem`:

### Exercise

- Update `ListItem` to accept props with restaurant data.
- Alter `ListItem` to return the JSX for a single item in `restaurants.data`,
  use props for the variable data.
- Refactor `RestaurantList` to use `ListItem` to render the items in
  `restaurants.data`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/ListItem.tsx** to be:

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

</details>
