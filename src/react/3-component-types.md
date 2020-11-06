@page learn-react/component-types Types of React Components
@parent learn-react 3

@description Learn about the two fundamental ways of writing React components and their differences.

@body

## Functional Components

Functional components are simple. It's exceedingly easy to write them in React. In a nutshell, they're just functions which return a React element (usually written in the form of JSX).

```jsx
function MyFuncComponent() {
  return <div>hello world</div>;
}

ReactDOM.render(<MyFuncComponent />, document.getElementById('root'));
```
@codepen react

As you can see in the functional component above, there's not much magic happening. We simply define a function and return JSX from it.

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
@codepen react

## What's the Difference?

No matter which type of component you're working with, they can be used the same way:

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

Aside from the syntax there, they are functionally equivalent.

Originally, class components were the most popular because they could keep track of state and respond to specific component lifecycle events. This wasn't possible in functional component until the release of the [React Hooks API](https://reactjs.org/docs/hooks-reference.html) in v16. Up until then, functional components were commonly referred to as _stateless components_.

Now both class and functional components are used commonly in code-bases around the world, but there has been a shift to using only functional components, as the syntax for them is more readable and cleaner.

For the remainder of this training, we will be using functional components exclusively.
