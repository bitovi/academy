@page learn-react/react-theory React Theory
@parent learn-react 3

@description Learn how React's rendering system works and the different types of components.

@body

## React Components

At it's core, React helps developers break their views into discrete components. All components in React are similar, but there are two specific types of components that you'll encounter.

### Functional Components

Functional components are the simplest and easiest to write components in React, in a nutshell, they're basically functions which return JSX.

```jsx
import React from 'react';

function MyFuncComponent() {
  return <div>hello world</div>;
}
```

As you can see in the functional component above there's not much magic going on, we simply define a function and return JSX from it.

### Class Components

Class components are a bit more complex than functional ones. Class components are contained in a class and have a `render` method which returns JSX.

```jsx title="React has two types of components" subtitle="Class components"
import React from 'react';

class MyClassComponent extends React.Component {
  render() {
    return <div>hello world</div>;
  }
}
```

### What's the Difference?

No matter which type of component you're working with, they can be rendered the same way:

```jsx title="Both types of components are rendered the same way"
import React from 'react';

function App() {
  return (
    <div>
      <MyFuncComponent />
      <MyClassComponent />
    </div>
  );
}
```

For all intents and purposes, aside from the syntax there's not much difference between the two.

Originally however, class components were the most popular because they could keep track of state and respond to specific component lifecycle events. This wasn't possible in functional component until the release of the React Hooks API in v16.

Now-a-days both class and functional components are used commonly in codebases around the world, but there has been more of a shift to using functional components only as the syntax for them is considered more readable and cleaner by many.

For the remainder of this training, we'll be using functional components exclusively!

## How does React work?

At it's core, React is all about components. In fact, that's the whole point of the library, to help developers create re-usable components easily.

But what actually is a component?

In a nutshell, a component is a modular collection of functionality and state which returns JSX.

- **State** - The state of a component is all of the values or pieces of data that it's keeping track of. The state is generally displayed either directly or indirectly in the JSX. 
- **Functionality** - The functionality of a component is what it does in response to events. For example a button component might spawn a browser alert whenever it's clicked.

Often times the state and the functionality of a component are combined together. Let's take a simple counter component as an example:

```jsx
import React, {useState} from 'react'

function Counter(){
    // a piece of state called `clickCount` is initialized to 0
    const [clickCount, setClickCount] = useState(0)

    return (
        <div>
            <button onClick={() => setClickCount(clickCount + 1)}>+1</button>
            Clicked {clickCount} times
        </div>
    )
}
```
@highlight 3,7-8,only

We'll cover more of the specifics about how this works later on, but for now let's just go over what's happening at a high level.

The `Counter` component has a button which, when clicked, will increment a count value and display it to the user. This means that the user will always know how many times they've clicked the button. 

How many times the button has been clicked is part of the state of this component. The `clickCount` as we call it is a value that is unique to each instance of the Counter and is a piece of data which is displayed in the JSX.

What happens when the button gets clicked is part of the functionality of our component. In this case, when the **+1** button gets clicked we update the `clickCount` state, adding 1 to it (`setClickCount(clickCount + 1)`).

This pattern is very common in React components. We have a piece of state (`clickCount`) which gets updated in response to some event. 

The kicker here, is that whenever the state gets updated, because that state is being rendered out in the JSX, the component needs to get updated on the browser, the component's HTML needs to get re-rendered.

React will handle the process of re-rendering and updating the component in the background, but it's our job as developers to specify the state and functionality so React knows *when* the component should be updated (whenever the state updates).





## The problem




## How to solve this problem


## What you need to know


## The solution
