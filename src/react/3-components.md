@page learn-react/components What Are React Components
@parent learn-react 3

@description Learn about the two fundamental ways of writing React components and their differences.

@body

React is all about components. In fact the whole point of the library is to help developers easily create reusable components.

But what is a component?

In a nutshell, a component is function which takes in props and returns an element.

- **Values** - The values of a component are all of the values the component is keeping track of. They include _component state_, which are the values the component controls itself, and _props_, which are supplied to the component.
- **Side Effects** - The side effects of a component are the results of the operations which touch things outside of the component. This includes async operations, registering DOM event-handling and interaction with the browser. An easy way of knowing if something is a side-effect, try to think if it would work without accessing anything except the **values**.

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
