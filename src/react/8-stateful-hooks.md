@page learn-react/stateful-hooks Stateful Hooks
@parent learn-react 8

@description Learn how to hooks in React to manage the state of a component.

@body

## What are stateful hooks?

- Stores component state between renders
- Changes to the value of said state (with the setter) triggers re-renders.

Stateful hooks are Reacts way of managing all of the data that a functional component needs to keep track of. The most widely used stateful hook, `useState`, streamlines the process of both using and updating individual state values in a straightforward way.

Another stateful hook `useRef` gives component code access to the underlying DOM elements rendered out from the JSX.

Let's take a look at each hook in turn and see what they can do.

## useState

Let's start with `useState`.

When `useState` is called, it returns an array with two elements in it. The first element is the state value itself, this is the value you would render inside the JSX. The second element is a setter function, which, when called can be used to update the state and trigger a re-render.

```jsx
function Hello() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  );
}

ReactDOM.render(<Hello />, document.getElementById('root'));
```
@highlight 4,8,9,only
@codepen react

Above is a simple example of using state to control an input element. The value of the input is determined entirely by the `inputValue` state (not the browser), and whenever the input changes, the state is updated to match.

This process is similar no matter what component you're building. The basic flow goes as follows:

- Get the value and setter
- Use the value as needed
- Call the setter to change the value and trigger an update

## useRef

Just like `useState`, `useRef` is a data store, keeping track of values the component is interested in. In this case however, `useRef` helps store DOM references instead of state data.

DOM references give your component's code access to the underlying DOM element that your JSX is mapped to through a `.current` field. These references can then be used to make more specific changes to the DOM or maintain access to external libraries. It's important to note that updating refs doesn't cause updates like modifying the state does.

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

- Get refs for the parent and the map instance
- Pass the parent ref to the `div` JSX element
- Working inside a useEffect so we have access to `parent.current`, set the current map value

## Exercise

Let's use our stateful hooks knowledge to make our Tic-Tac-Toe game more functional!

Run the app locally with `npm start` and choose the `Stateful Hooks` exercise. Now head over to `src/exercises/7 - Stateful Hooks/components`. These are the files you'll be editing.

### The problem

✏️ Modify the `Board` component so that it keeps track of the current state of the game/players using hooks.

- store the current board in state
  - It should be represented as an array of strings (ex. `["", "x", "o" ...]`)
- store the current player in state
  - This can be a boolean called `isXTurn`
- Fill out the `handleSquareClick` function so that it updated the board and changes the current player when the user clicks a `Square`.

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
