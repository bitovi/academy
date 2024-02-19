@page learn-react/components Building Components
@parent learn-react 4
@outline 3

@description Components are the core building blocks of any React application

@body

## Overview

So far, we have placed all of our JSX inside the App function. Notice two things about the App function:

1. Name starts with a capital letter
2. Returns something renderable (JSX)

```jsx
function App() {
  return (
    <div>
      Some page content
    </div>
  );
}
```

In React, we call this a component. When you create a component in React, you are creating building blocks that can be composed, reordered, and reused much like HTML elements.

React makes it relatively straightforward to create new components. Let's learn to build our own.

## Objective: Create a React component

### Component structure

Let's start by creating a component from a commonly reused element, the button.

First, our component names must start with a capital letter, so we can call this `Button`. While its not required, the common practice is to use PascalCase when naming components so longer component names will look like `IconButton`.

Second, our component must return either `null` or something renderable, like JSX. The return value of our components is almost always JSX, though JavaScript primitives like `string` and `number` are also valid. Components cannot return complex types like arrays or objects.

```jsx
function Button() {
  return (
    <div className="button primary">
      <button>click me</button>
    </div>
  );
}

ReactDOM.render(<Button />, document.getElementById('root'));
```

Components are like small containers which can be reused throughout your application. The `Button` component above returns JSX and could then be rendered and reused by another component like `App` below.

```jsx
function App() {
  return (
    <div>
      <Button />
      <Button />
      <Button />
    </div>
  );
}
```

### React components are just functions

The JSX syntax allows function components to look like HTML, but underneath they are still functions. The return of each component is unique and you can use the same component multiple times.

Components are just fancy functions. While you shouldn't do the following, you could.

```jsx
function App() {
  return (
    <div>
      {Button()}
      {Button()}
      {Button()}
    </div>
  );
}
```

Now you're ready to create your first component.

### Setup

It's best practice to create a new folder that will contain all of the related files for that component, including test and CSS files.

✏️ Create **src/pages** (folder)

✏️ Create **src/pages/RestaurantList/** (folder)

✏️ Create **src/pages/RestaurantList/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/04-components/01-solution/src/pages/RestaurantList/index.ts

✏️ Create **src/pages/RestaurantList/RestaurantList.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/04-components/01-problem/src/pages/RestaurantList/RestaurantList.tsx

### Verify

✏️ Create **src/pages/RestaurantList/RestaurantList.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/04-components/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx

✏️ Update **src/App.test.tsx** to be a simple smoke test:

@diff ../../../exercises/react-vite/03-intro-to-jsx/02-solution/src/App.test.tsx ../../../exercises/react-vite/04-components/01-solution/src/App.test.tsx only

### Exercise

Our `App` component can only show our home page content. Eventually, we'll want to show other page content. Prepare now by moving all of the JSX in `App` to a new component called `Home`.

Once the `Home` component is complete, add `<Home />` to the JSX response of `App`.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx**

@diff ../../../exercises/react-vite/04-components/01-problem/src/App.tsx ../../../exercises/react-vite/04-components/01-solution/src/App.tsx only

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx**

@diff ../../../exercises/react-vite/04-components/01-problem/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/04-components/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/04-components/01-solution?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/04-components/01-solution?file=src/App.tsx).

</details>

## Next steps

Next we'll learn to pass arguments to our components through props.