@page learn-react/react-theory React Theory
@parent learn-react 3

@description Learn about the different types of components and how React's rendering system functions.

@body

## React Components

At its core, React helps developers break their views into discrete components. All components in React behave the same, but there are two specific types of components that you'll encounter.

### Functional Components

Functional components are the simplest and easiest to write components in React, in a nutshell, they're just functions which return a React element (usually written in the form of JSX).

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

Class components are a bit more complex than functional ones. Class components are contained in a [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and have a `render` method which returns JSX.

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

Aside from the syntax there, they are functionally equivalent.

Originally, class components were the most popular because they could keep track of state and respond to specific component lifecycle events. This wasn't possible in functional component until the release of the [React Hooks API](https://reactjs.org/docs/hooks-reference.html) in v16. Up until then, functional components were commonly referred to as *stateless components*.

Now-a-days both class and functional components are used commonly in code-bases around the world, but there has been a shift to using functional components only, as the syntax for them is considered more readable and cleaner by many.

For the remainder of this training, we will be using functional components exclusively.

## How does React work?

React is all about components. In fact the whole point of the library is to help developers easily create re-usable components.

But what is a component?

In a nutshell, a component is function which takes in values and returns an element and may produce side-effects.

- **Values** - The values of a component are all of the values the component is keeping track of. They include *component state*, which are the values the component controls itself and *props* which are supplied to the component. 
- **Side Effects** - The side effects of a component are the results of the operations which touch things outside of the component. This includes async operations, registering DOM event-handling and interaction with the browser. An easy way of knowing if something is a side-effect, try to think if it would work without accessing anything except the **values**.

Often times the values and the side effects of a component are used together. Let's take a simple counter component to explain:

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

The number of times the button has been clicked is a piece of component state. In other words, it is one of the **values** the component keeps track of. The `clickCount` value is independant of any other instance of the Counter.

What happens when the button gets clicked is part of the **side effects** of our component. In this case, when the **+1** button gets clicked we update the `clickCount` state, adding 1 to it (`setClickCount(clickCount + 1)`).

This pattern is very common in React components. We have a value (`clickCount`) which gets updated in response to some event. 

Whenever the state gets updated, because that state is being rendered out in the JSX, the component needs to get updated on the browser, the component's HTML needs to get re-rendered.

React will handle the process of re-rendering and updating the component in the background, but it's our job as developers to specify the values and side effects so React knows *when* the component should be updated.
