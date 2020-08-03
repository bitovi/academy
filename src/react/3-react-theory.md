@page learn-react/react-theory React Theory
@parent learn-react 3

@description Learn about the different types of components and how React's rendering system functions.

@body

## React Components

At its core, React helps developers break their views into discrete components. All components in React are similar, but there are two specific types of components that you'll encounter.

### Functional Components

Functional components are the simplest and easiest to write components in React, in a nutshell, they're just functions which return JSX.

```html
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<MyFuncComponent />,document.getElementById('root'));

function MyFuncComponent() {
  return <div>hello world</div>;
}

</script>
```
@codepen

As you can see in the functional component above, there's not much magic happening. We simply define a function and return JSX from it.

### Class Components

Class components are a bit more complex than functional ones. Class components are contained in a class and have a `render` method which returns JSX.

```html title="React has two types of components" subtitle="Class components"
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">

class MyClassComponent extends React.Component {
  render() {
    return <div>hello world</div>;
  }
}

ReactDOM.render(<MyClassComponent />,document.getElementById('root'));</script>
```
@codepen

### What's the Difference?

No matter which type of component you're working with, they can be used the same way:

```jsx title="Both types of components are rendered the same way"
function App() {
  return (
    <div>
      <MyFuncComponent />
      <MyClassComponent />
    </div>
  );
}
```

Aside from the syntax there's not much difference between the two.

Originally, class components were the most popular because they could keep track of state and respond to specific component lifecycle events. This wasn't possible in functional component until the release of the [React Hooks API](https://reactjs.org/docs/hooks-reference.html) in v16.

Now-a-days both class and functional components are used commonly in code-bases around the world, but there has been a shift to using functional components only, as the syntax for them is considered more readable and cleaner by many.

For the remainder of this training, we'll be using functional components exclusively.

## How does React work?

React is all about components. In fact, that's the whole point of the library, to help developers create re-usable components easily.

But what actually is a component?

In a nutshell, a component is a modular collection of inputs and side effects which returns JSX.

- **Values** - The values of a component are all of the values it's keeping track of. These include values that the component controls itself, called component state, and values which are given to the component, called props. 
- **Side Effects** - The side effects of a component are actions, generally in response to browser events like clicks, which cause the values (state/props) to update and the component to be re-rendered.

Often times the values and the side effects of a component are combined together. Let's take a simple counter component as an example:

```html
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<Counter />,document.getElementById('root'));

function Counter(){
    // a piece of state called `clickCount` is initialized to 0
    const [clickCount, setClickCount] = React.useState(0)

    return (
        <div>
            <button onClick={() => setClickCount(clickCount + 1)}>+1</button>
            Clicked {clickCount} times
        </div>
    )
}

</script>
```
@highlight 5,9-10,only
@codepen

We'll cover more of the specifics about how this works later on, but for now let's just go over what's happening at a high level.

The `Counter` component has a button which, when clicked, will increment a count value and display it to the user. This means that the user will always know how many times they've clicked the button. 

How many times the button has been clicked is a piece of component state, one of the **values** it keeps track of. The `clickCount` as we call it is a value that is unique to each instance of the Counter and is a piece of data which is displayed in the JSX.

What happens when the button gets clicked is part of the **side effects** of our component. In this case, when the **+1** button gets clicked we update the `clickCount` state, adding 1 to it (`setClickCount(clickCount + 1)`).

This pattern is very common in React components. We have a value (`clickCount`) which gets updated in response to some event. 

Whenever the state gets updated, because that state is being rendered out in the JSX, the component needs to get updated on the browser, the component's HTML needs to get re-rendered.

React will handle the process of re-rendering and updating the component in the background, but it's our job as developers to specify the values and side effects so React knows *when* the component should be updated.
