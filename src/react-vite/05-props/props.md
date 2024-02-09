@page learn-react-vite/props Passing Props
@parent learn-react-vite 5
@outline 3

@description Learn how to provide information to a component through props.

@body

## Overview

- Learn about passing data to components using props.
- When the `key` prop is necessary

## Objective 1: Use and set props

In this section we will:

- Define a component's props using an interface
- Use props to render a component
- Set props on a component

### Using component props

Since a functional component is just a JavaScript function, we can pass
arguments to it; however, functional components must implement a React API that
allows an optional argument of type `object` that's named "props".

The properties on the props object are undefined (with two exceptions we'll get
to later) and can be whatever is needed to make the component work. The property
values can be any type, including functions and other React components.

We're using TypeScript in our project so we can create an `interface` for props
and use it in the definition of a functional component:

<span style="color: red;font-weight:600;">I feel like good practice would be to
add comments to the interface property definitions, but that adds a lot more
static to the example so I'm not. Thoughts?</span>

```jsx
interface FancyButtonProps {
  label: string;
  onClick: () => void;
}

const FancyButton: React.FC<FancyButtonProps> = (props) => {
  // From now on, we will destructure props in the function
  // parameters, but we wanted to illustrate how props is
  // passed to a component as an argument.
  const { label, onClick } = props;
  return <button onClick={onClick}>{label}</button>;
}
```

### Setting component props

In [JSX syntax](intro-to-jsx.html) a component's props look like an HTML tag's
"attributes" and accept a value.

- If a prop's value type is a string then the prop value is set using quotes.
- Any other type of prop value is set using braces with the value inside. In the
  example below, the `label` prop accepts a string. so the value is surrounded
  by double quotes. The `onClick` prop accepts a function, so the function value
  is surrounded by braces.

```jsx
<FancyButton label="Activate" onClick={() => alert("Activated!")} />
```

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
- Alter `ListItem` to return the JSX for a single item in `restaurants.data`,
  use props for the variable data.
- Refactor `RestaurantList` to use `ListItem` to render the items in
  `restaurants.data`.

<strong>Having issues with your local setup?</strong> You can use either
[StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/05-props/01-problem?file=src%2Fpages%2FRestaurantList%2FListItem.tsx)
or
[CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/0props/01-problem?file=src%2Fpages%2FRestaurantList%2FListItem.tsx)
to do this exercise in an online code editor.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/ListItem.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/ListItem.tsx ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/ListItem.tsx only

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/05-props/01-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

</details>

## Objective 2: Understanding the key prop

In this section we will learn when to use the `key` prop and why.

### Concept: key uniquely identifies a component

Earlier we said property **names** on props were at the discretion of the
developer—what we didn't mention is that the name "key" has special meaning for
React. React defines "key" as an optional property whose value type is one of
`string`, `number`, or `bigint`.

TODO: key applies to arrays

TODO: what's a good key? not an index!

TODO: can apply to any component

TODO: key value is not passed to your component

You may have noticed that when the tests were run early a warning was printed
out to the console, "TBD"

### Setup

N/A

### Verify

TODO: test for key prop

### Exercise

- Eliminate the warning from React

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to include a key prop:

@diff ../../../exercises/react-vite/05-props/01-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/05-props/02-solution/src/pages/RestaurantList/RestaurantList.tsx only

</details>

## Next steps

TODO