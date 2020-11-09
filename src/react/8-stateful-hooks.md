@page learn-react/stateful-hooks Stateful Hooks
@parent learn-react 8

@description Learn how to use hooks in React to manage the state of a component.

@body

## What are stateful hooks?

Stateful hooks are React's way of managing all of the data that a functional component needs to keep track of. The most widely used stateful hook, `useState`, streamlines the process of both using and updating individual state values in a straightforward way.

Another stateful hook, `useRef`, gives component code access to the underlying DOM elements rendered from the JSX.

Let's take a look at each hook in turn and see what they can do.

## useState

When `useState` is called, it returns an array with two elements. The first element is the state value itself; this is the value you would render inside the JSX. The second element is a setter function, which when called, can be used to update the state and trigger a re-render.

```jsx
function Hello() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

ReactDOM.render(<Hello />, document.getElementById('root'));
```
@highlight 2,6,7,only
@codepen react

Above is a simple example of using state to control an `input` element. The value of the input is determined entirely by the `inputValue` state (not the browser), and whenever the input changes, the state is updated to match.

This process is similar no matter what component you're building. The basic flow is:

1. Get the value and setter
2. Use the value as needed
3. Call the setter to change the value and trigger an update

> **Important:** When using objects or arrays, you must provide a new state when using the setter, rather than changing the current values. The data created by `useState` is immutable and will always replace any manual changes.
>
> For example, using array methods like `.push()` or `.pop()` will lead to problems. Instead, use methods like `.concat()` and `.filter()` which create new arrays, and pass those values into the setter.
>
> ```jsx
> function Hello() {
>   const [values, setValues] = React.useState([]);
>
>   return (
>     <>
>       {values}
>       <button onChange={(e) => setValues(values.concat('click'))}>
>         Click me
>       </button>
>     </>
>   );
> }
>
> ReactDOM.render(<Hello />, document.getElementById('root'));
> ```
>
> _For class based components see [this.setState()](https://reactjs.org/docs/state-and-lifecycle.html)._

## useRef

Just like `useState`, `useRef` is a data store, keeping track of values the component is interested in. In this case however, `useRef` helps store DOM references instead of state data.

DOM references give your component access to the underlying DOM elements that your JSX creates. These references can then be used to make more specific changes to the DOM or provide access to external libraries. To get to the value of a ref, it is always located in the `.current` property. It's important to note that updating refs does not cause updates like modifying the state does.

Let's take a look at `useRef` in action:

```jsx
import React, { useRef, useEffect } from 'react';

function Hello() {
  const parent = useRef();
  const map = useRef();

  useEffect(() => {
    map.current = new google.maps.Map(parent.current, {});
  }, []);

  return <div ref={parent} />;
}
```

In the code above we're doing a couple things:

- Get refs for the parent and the map instances.
- Pass the parent ref to the `div` JSX element.
- Working inside a useEffect so we have access to `parent.current`, set the current map value.

## Exercise

Let's use our stateful hooks knowledge to make our Tic-Tac-Toe game more functional!

Run the app locally with `npm start` and choose the `Stateful Hooks` exercise. Now head over to `src/exercises/7 - Stateful Hooks/components`. These are the files you'll be editing.

### The problem

✏️ Modify the `Board` component so that it keeps track of the current state of the game and players using hooks.
- store the current board in state, represented as an array of strings (ex. `["", "x", "o" ...]`)
- store the current player in state, with a boolean called `isXTurn`
- Fill out the `handleSquareClick` function so that it updates the board and changes the current player when the user clicks a `Square`.

### The solution

```jsx
import React, { useState } from 'react';
import Square from '../../../app/components/Square';

function Board() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [isXTurn, setIsXTurn] = useState(true);

  function handleSquareClick(squareIndex) {
    if (board[squareIndex]) {
      return;
    }

    const newBoard = [...board];
    newBoard[squareIndex] = isXTurn ? 'X' : 'O';

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  return (
    <div className="board">
      {board.map((symbol, index) => (
        <Square
          key={index}
          symbol={symbol}
          onClick={() => handleSquareClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;
```
@highlight 5,6,9-17,only
