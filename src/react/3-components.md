@page learn-react/components What are React Components
@parent learn-react 3

@description Learn about the two ways of writing React components and their differences.

@body

React is all about components. In fact the whole point of the library is to help developers easily create reusable components.

## Components

Earlier, we learned that React JSX is almost always the return value of our components. Components are like small containers which can be reused throughout your application. For example, you might build a `Button` component which renders all the JSX required for a button. Here's an example.

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

@codepen react

In the code above, we're defining a functional component (a function which returns JSX) called `Button`.

This component returns JSX and could then be rendered and reused by another component like `App` below.

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

Here the `App` component is rendering the `Button` component 3 times. Note that when you render custom components like this they don't need closing tags, instead they can be self-closing with a `/` tacked onto the end. You can also design them to have closing tags with extra elements rendered inside (see an explanation on JSX children [here](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)).

## Functional Components

Functional components are simple. They're just functions which return a React element, usually written in JSX.

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

## Multiples of the same component

It's important to note that when you have more than one of the same component, you will need a unique way to identify them. This is so that each component has a unique and stable identity, which helps React know to only re-render the component with that key, otherwise React will not know which component to update and will have to update them all.
An example of this is:
```jsx
function App() {
  return (
    <div>
      {
        [
          { title: "Lorem ipsum dolor sit amet." id: "18976a7c" },
          { title: "Lorem ipsum dolor sit amet." id: "20dd5af2" }
        ].map(elem)=>(<MyFuncComponent key={elem.id} />)
      }
    </div>
  );
}
```
>Note how we use a unique id instead of an interator value from the map function. This is important so that the key will remain the same despite the list changing. [https://reactjs.org/docs/lists-and-keys.html For more information on lists and keys in react click here to visit the official docs.]

## Exercise

In this exercise, we supply you with a single Tic-Tac-Toe cell component. And your job is to make a Board component that renders those Tic-Tac-Toe cells into a nice 3x3 grid. Bonus points if you update the cell component such that whenever a single cell is clicked, we `console.log` the string "Clicked", hint: take a look [here](intro-to-jsx.html#event-handling) for a refresher on event handling.

```jsx
const squareStyling = {
  width: '200px',
  height: '200px',
  border: '1px solid black',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '6em',
};

function Square() {
  return <div style={squareStyling}></div>;
}

function Board() {
  return <div>Nothing here yet</div>;
}

ReactDOM.render(<Board />, document.getElementById('root'));
```

@codepen react

#### Hover over the code above and select the run button in the upper right hand corner.

Go ahead and hover over the code above. You should see a run button in the top right hand corner. Once that is clicked you can change, and edit the code in Codepen. Give it a try!

## Solution
<details>
<summary>
Click to see the solution
</summary>

```jsx
const squareStyling = {
  width: '200px',
  height: '200px',
  border: '1px solid black',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '6em',
};

function Square() {
  return (
    <div style={squareStyling} onClick={() => console.log('Clicked')}></div>
  );
}

function Board() {
  return (
    <div style={{ display: 'flex', width: '600px', flexWrap: 'wrap' }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
        <Square key={el} />
      ))}
    </div>
  );
}

ReactDOM.render(<Board />, document.getElementById('root'));
```

@codepen react
@highlight 14, 20-24
</details>

## Next Steps

✏️ Head over to the [next lesson](props.html) to get a more detailed understanding of props.
