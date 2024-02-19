@page learn-react/components Building Components
@parent learn-react 4
@outline 3

@description Learn about components, the core building blocks of every React application.

@body

## Overview

In this section, we will:

- Learn the basics of creating components in React
- Discover how components are structured
- Review how React components are (fundamentally) functions

## Objective: Create a React component

Our `App` component currently shows our restaurant list, but eventually we’ll want to show other page content.
Let’s prepare now by moving all of the JSX from `App` to a new component called `RestaurantList`.

In our Place My Order app, we want to:

- Create our first brand new React component (RestaurantList)
- Move the logic from our App component to our new RestaurantList component

### What are components?

So far, we have placed all of our JSX inside the `App` function. Notice two things about the `App` function:

1. The name starts with a capital letter
2. It returns something renderable (JSX)

```tsx
function App() {
  return (
    <main>
      Some page content
    </main>
  );
}
```

In React, we call this a component. When you create a component in React, you are creating building blocks that can be composed, reordered, and reused much like HTML elements.

React makes it relatively straightforward to create new components. Let’s learn to build our own.

### Component structure

Let’s start by creating a component from a commonly reused element, the button.

First, our component names must start with a capital letter, so we can call this `Button`. While it’s not required, the common practice is to use PascalCase when naming components so longer component names will look like `IconButton`.

Second, our component must return either `null` or something renderable, like JSX. The return value of our components is almost always JSX, though JavaScript primitives like `string` and `number` are also valid. Components cannot return complex types like arrays or objects.

```tsx
const Button: React.FC = () => {
  return (
    <button className="button primary">
      Activate me
    </button>
  );
}
```

Components are like small containers which can be reused throughout your application. The `Button` component above returns JSX and could then be rendered and reused by another component like `App` below.

```tsx
const App: React.FC = () => {
  return (
    <main>
      <Button />
      <Button />
      <Button />
    </main>
  );
}
```

### React components are functions

The JSX syntax allows function components to look like HTML, but underneath they are still functions. The return of each component is unique and you can use the same component multiple times.

You can think of components as fancy functions.

While you shouldn’t do the following, you could:

```tsx
const App: React.FC = () => {
  return (
    <main>
      {Button()}
      {Button()}
      {Button()}
    </main>
  );
}
```

Now you’re ready to create your first component.

### Setup

It’s best practice to create a new folder that will contain all of the related files for that component, including test and CSS files.

✏️ Create **src/pages/** (folder)

✏️ Create **src/pages/RestaurantList/** (folder)

✏️ Create **src/pages/RestaurantList/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/04-components/01-solution/src/pages/RestaurantList/index.ts

✏️ Create **src/pages/RestaurantList/RestaurantList.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/04-components/01-problem/src/pages/RestaurantList/RestaurantList.tsx

✏️ Update **src/App.tsx**

@diff ../../../exercises/react-vite/03-intro-to-jsx/02-solution/src/App.tsx ../../../exercises/react-vite/04-components/01-problem/src/App.tsx only

### Verify

✏️ Create **src/pages/RestaurantList/RestaurantList.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/04-components/01-solution/src/pages/RestaurantList/RestaurantList.test.tsx

✏️ Update **src/App.test.tsx** to be a simple smoke test:

@diff ../../../exercises/react-vite/03-intro-to-jsx/02-solution/src/App.test.tsx ../../../exercises/react-vite/04-components/01-solution/src/App.test.tsx only

### Exercise

- Move the logic in our `App` component to our new `RestaurantList` component.
- Update our `App` component to use our new `RestaurantList` component.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/04-components/01-problem?file=src/App.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/04-components/01-problem?file=src/App.tsx) to do this exercise in an online code editor.

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

Next we’ll learn to pass arguments to our components through props.