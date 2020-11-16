@page learn-react/components What are React Components
@parent learn-react 3

@description Learn about the two ways of writing React components and their differences.

@body

React is all about components. In fact the whole point of the library is to help developers easily create reusable components.

But what is a component?

A component is a function which uses props and state to return an element.

- **Props** - The props of a component are the same as arguments to a function.
- **State** - The state is the values which the component controls.
- **Side Effects** - The side effects of a component are the results of operations which interact with things outside of the component. This includes things like async fetching, registering DOM event-handlers and using browser APIs.

## Functional Components

Functional components are simple. In a nutshell, they're just functions which return a React element, usually written in JSX.

```jsx
function MyFuncComponent() {
  return <div>hello world</div>;
}

ReactDOM.render(<MyFuncComponent />, document.getElementById('root'));
```

@highlight 2
@codepen react

As you can see in the functional component above, there's not much magic happening. We simply define a function and return JSX.

## Class Components

Class components are a bit more complex than functional ones. Class components are contained in a [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and have a `render` method which returns JSX.

```jsx
class MyClassComponent extends React.Component {
  render() {
    return <div>hello world</div>;
  }
}

ReactDOM.render(<MyClassComponent />, document.getElementById('root'));
```

@highlight 2-4
@codepen react

## What's the Difference?

The above `MyFuncComponent` and `MyClassComponent` produce the exact same result using the two different methods. No matter which type of component you're working with, they can be used the same way:

```jsx
function App() {
  return (
    <div>
      <MyFuncComponent />
      <MyClassComponent />
    </div>
  );
}
```

@highlight 4-5

Originally, class components were the most popular because they could keep track of state and respond to specific component lifecycle events. This wasn't possible in functional components until the release of the [React Hooks API](https://reactjs.org/docs/hooks-reference.html) in v16. Up until then, functional components were commonly referred to as _stateless components_.

Now both class and functional components are used commonly in codebases around the world, but there has been a shift to using only functional components, as the syntax for them is more readable and cleaner.

For the remainder of this training, we will be using functional components exclusively.
