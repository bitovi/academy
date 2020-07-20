@page learn-react/stateful-hooks Stateful Hooks
@parent learn-react 7

@description Learn how to hooks in React to manage the state of a component.

@body
 
## What are stateful hooks?

* Store component state between renders.
* Changing the value (with the setter) triggers updates.
* Best Practice: Each should store a single value.
* useState // this is like your view-model


## useState

```jsx title="useState with Form Input"
import React, { useState } from 'react';

function Hello() {
  const [ value, setValue ] = useState('');

  return (
    <input
      value={value} 
      onChange={e => setValue(e.target.value)}
    />
  );
};
```

* Get the value and setter
* Use the value as needed
* Call the setter to change the value and trigger an update

* A data store, just like useState
* Does not cause updates, unlike useState
* Has a single property `current`
* Two Main Uses:
  * Easily expose dom elements
  * Maintain references to external libraries

## useRef

```jsx title="useRef"
import React, { useRef, useEffect } from 'react';

function Hello() {
  const parent = useRef();
  const map = useRef();

  useEffect(() => {
    map.current = new google.maps.Map(parent.current, {});
  }, []);

  return (
    <div ref={parent} />
  );
};
```

* Get refs for the parent and the map instance
* Pass the parent ref to the element
* Working inside a useEffect so we have access to parent.current
* Set the current map value


## Exercise

Let's use our stateful hooks knowledge to make our tic-tac-toe game more functional!

Run the app locally with `npm start` and choose the `Stateful Hooks` exercise. Now head over to `src/exercises/7 - Stateful Hooks/components`. These are the files you'll be editing.

### The problem

Modify the `Board` component so that it keeps track of the current state of the game/players using hooks.
- store the current board in state
  - It should be reprersented as an array of strings (ex. `["", "x", "o" ...]`)
- store the current player in state
  - This can be a boolean called `isXTurn`
- Fill out the `handleSquareClick` function so that it updated the board and changes the current player when the user clicks a `Square`.

### The solution

```jsx
import React, { useState } from 'react';
import Square from '../../../app/components/Square';

function Board() {
  const [board, setBoard] = useState([ '', '', '', '', '', '', '', '', '' ]);
  const [isXTurn, setIsXTurn] = useState(true);

  function handleSquareClick(squareIndex) {
    if (board[squareIndex]) {
      return;
    }

    const newBoard = [ ...board ];
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
