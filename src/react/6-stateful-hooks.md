@page learn-react/stateful-hooks Stateful Hooks
@parent learn-react 6

@description Learn how to use React hooks to manage the state of a component.

@body

## What are stateful hooks?

Stateful hooks are React’s way of managing the data that a functional component needs to remember. The most widely used stateful hook, [`useState`](https://reactjs.org/docs/hooks-state.html), streamlines the process of both using and updating individual state values in a straightforward way.

Another stateful hook, `useRef`, gives component code access to the underlying DOM elements rendered from the JSX.

Let’s take a look at each hook and see what they can do.

## useState

[`useState`](https://reactjs.org/docs/hooks-state.html) accepts a single parameter and returns an array with two elements. The argument to `useState` is the default value of the `state` that you are creating. The first element of the return value is the state value itself; this is the value you would render inside the JSX. The second element is a setter function, which, when called, can be used to update the state value and trigger a re-render.

Here’s an example of a React component that uses state to power an input element.

```jsx
function Hello() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <input
      value={inputValue.toUpperCase()}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

ReactDOM.render(<Hello />, document.getElementById('root'));
```

@highlight 2,5
@codepen react

Above is a simple example of using state to control an `input` element. The starting value of `inputValue` is `""` because it is the argument to `React.useState`. If we were to call `setInputValue('hello')`, then `inputValue` would change to `hello` and the component would re-render.

Note also that the input box always displays the `uppercase` value of the text. This is because when we display the text value (when we pass the `value` prop to the `input`), we uppercase the string.

This process is similar no matter what component you’re building. The basic pattern is:

1. Get the value and setter from [`useState`](https://reactjs.org/docs/hooks-state.html).
2. Use the value as needed
3. Call the setter to change the value and trigger an update

> **Important:** When using objects or arrays, you must provide a new state object when using the setter, rather than changing the values within the object. The data created by `useState` is immutable and will always replace any manual changes.
>
> For example, using a state object that is an array, make sure never to use `.push()` or `.pop()` directly on it. Instead, use methods like `.concat()` and `.filter()` which create new arrays, and pass those values into the setter.
>
> ### Wrong
>
> ```jsx
> function Hello() {
>   const [values, setValues] = React.useState([]);
>
>   return (
>     <>
>       {values}
>       <button
>         onChange={(e) => {
>           values.push('click');
>           setValues(values);
>         }}
>       >
>         Click me
>       </button>
>     </>
>   );
> }
>
> ReactDOM.render(<Hello />, document.getElementById('root'));
> ```
>
> @highlight 9

> ### Right
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
> @highlight 7

## useRef

Just like `useState`, `useRef` is a data store, keeping track of values the component is interested in. In this case however, `useRef` helps store DOM references instead of state data.

DOM references give your component access to the underlying DOM elements that your JSX creates. These references can then be used to make more specific changes to the DOM or provide access to external libraries. To get to the value of a ref, it is always located in the `.current` property. It’s important to note that updating refs does not cause updates like modifying the state does.

Let’s take a look at `useRef` in action:

```jsx
function Hello() {
  const nameRef = React.useRef();

  return (
    <>
      <label>
        Name:
        <input placeholder="name" type="text" ref={nameRef} />
      </label>
      <button onClick={() => nameRef.current.focus()}>Focus Name Input</button>
    </>
  );
}
ReactDOM.render(<Hello />, document.getElementById('root'));
```

@highlight 2,8,10
@codepen react

In the code above we’re doing a couple things:

- Creating a ref that will reference the input field.
- Use that input ref so that button onClick handler to `.focus()` on the underlying DOM element.

This strategy is useful when you need to interface with older libraries that require you have the reference to the actual DOM element instance.

## Exercise

Let’s use our stateful hooks knowledge to make our Tic-Tac-Toe game more functional!

### The problem

✏️ Modify the `Board` component so that it keeps track of the current state of the game and players using hooks.

- store the current board in state, represented as an array of strings (ex. `["", "x", "o" ...]`)
- store the current player in state, with a boolean called `isXTurn`
- Fill out the `handleSquareClick` function so that it updates the board and changes the current player when the user clicks a `Square`.

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
  color: 'black',
};

const boardStyling = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '600px',
  height: '600px',
  boxShadow: '0px 3px 8px 0 rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
};

function Square({ onClick, symbol, id }) {
  return (
    <div id={id} onClick={onClick} style={squareStyling}>
      {symbol}
    </div>
  );
}

function Board() {
  const board = ['', '', '', '', '', '', '', '', ''];
  // store the board in state
  // store the current player in state

  function handleSquareClick(square) {
    // update the board
    // update the current player
  }

  return (
    <div style={boardStyling}>
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

ReactDOM.render(<Board />, document.getElementById('root'));
```

@codepen react

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
  color: 'black',
};

const boardStyling = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '600px',
  height: '600px',
  boxShadow: '0px 3px 8px 0 rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
};

function Square({ onClick, symbol, id }) {
  return (
    <div id={id} onClick={onClick} style={squareStyling}>
      {symbol}
    </div>
  );
}

function Board() {
  const [board, setBoard] = React.useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [isXTurn, setIsXTurn] = React.useState(true);

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
    <div style={boardStyling}>
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

ReactDOM.render(<Board />, document.getElementById('root'));
```

@codepen react
@highlight 33,44,46-56,only

</details>

## Next Steps

✏️ Head over to the [next lesson](controlled-vs-uncontrolled.html) to learn how React manages browser inputs.
