@page learn-react/optimization-hooks Optimization Hooks
@parent learn-react 8

@description Learn how to optimize your React apps with `useMemo` and `useCallback`.

@body

# Optimization Hooks

In addition to the core hooks exposed by React, namely `useState` and `useEffect`, there are several hooks aimed at optimizing your code for performance.

Specifically, optimization through memoization. In a nutshell, memoization is the process of caching the values returned from long-running functions, and returning the cached values when inputs are identical to the previous run.

There are two hooks which deal with memoization, `useMemo` and `useCallback`, let's take a look at them below.

## useMemo

- Returns a memoized value.
- Recalculated synchronously based on declared dependencies.
- Used to optimize expensive calculations.

```jsx
function Hello({ firstName, lastName }) {
  const name = React.useMemo(() => {
    // some expensive derived value
    return `${firstName} ${lastName}`;
  }, [firstName, lastName]);

  return <div>{name}</div>;
}

ReactDOM.render(
  <Hello firstName="Justin" lastName="Meyer" />,
  document.getElementById('root'),
);
```

@highlight 2,5
@codepen react

In the code above, we're utilizing `useMemo` to memoize a value derived from two props, `firstName` and `lastName`. (Imagine that in order to get the full `name`, we need to perform some long-running or expensive operation.)

Normally, we would perform this operation every time the component renders, regardless of the `firstName`/`lastName` prop values. When we memoize the value however, React keeps track of the inputs and outputs of this function, and caches inputs and output for the last time it was run. This means that if this component gets rendered with the same first and last name 100 times in a row, we'll only need to perform the expensive operation once.

`useMemo` takes two arguments. The first is a function which performs the expensive operation and returns a value. The second is an array of dependencies. The dependency array determines which values, when changed, should cause the memoized value to be re-computed. All state values used in the function should be declared in the dependencies.

To sum it all up:

- When we need to do something expensive:
  1. We wrap it in `useMemo`.
  2. Specify when it should re-compute.

### useMemo to cache a function call

Let's take a look at a more real-world example. Here we'll parse a large JSON object, then flatten it into more easily printable lines.

Here's a look at it without `useMemo`:

```jsx
function Hello({ bigJSONBlob }) {
  const data = JSON.parse(bigJSONBlob);
  const lines = flatten(data);

  return (
    <div>
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}

function flatten(input) {
  return Object.keys(input)
    .map((key) => {
      if (typeof input[key] === 'object') {
        return [`${key}:`, ...flatten(input[key]).map((line) => `  - ${line}`)];
      }

      return [`${key}: ${input[key]}`];
    })
    .flat();
}

ReactDOM.render(
  <Hello bigJSONBlob={'{"hello": "world"}'} />,
  document.getElementById('root'),
);
```

@highlight 2,3,only
@codepen react

This could get quite expensive for a large object, even the parsing could make a difference, so we memoize the whole value, only recalculating on `bigJSONBlob` changes. It uses `===` to detect changes and not a deep object comparison.

```jsx
function Hello({ bigJSONBlob }) {
  const lines = React.useMemo(() => {
    const data = JSON.parse(bigJSONBlob);
    return flatten(data);
  }, [bigJSONBlob]);

  return (
    <div>
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}

function flatten(input) {
  return Object.keys(input)
    .map((key) => {
      if (typeof input[key] === 'object') {
        return [`${key}:`, ...flatten(input[key]).map((line) => `  - ${line}`)];
      }

      return [`${key}: ${input[key]}`];
    })
    .flat();
}

ReactDOM.render(
  <Hello bigJSONBlob={'{"hello": "world"}'} />,
  document.getElementById('root'),
);
```

@highlight 2-5,only
@codepen react

## useCallback

- A special case of useMemo that returns a function instead of a value.
- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`
- Used to maintain referential equality between renders.

[`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) is particularly useful when defining event handlers. In such cases, we're not necessarily interested in memoizing a single value, but rather in memoizing a callback function. This is very common in React, as we frequently use callbacks as props.

Below is a clickable `Hello` component which defines an un-memoized `handleClick` function.

```jsx
function Hello({ firstName, lastName }) {
  const handleClick = () => {
    console.log(`${firstName} ${lastName}`);
  };

  return <button onClick={handleClick}>Hello</button>;
}

ReactDOM.render(
  <Hello firstName="Justin" lastName="Meyer" />,
  document.getElementById('root'),
);
```

@highlight 2-4
@codepen react

Now below, we'll wrap `handleClick`'s logic in a `useCallback` so we can cache the results.

```jsx
function Hello({ firstName, lastName }) {
  const handleClick = React.useCallback(() => {
    console.log(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return <button onClick={handleClick}>Hello</button>;
}

ReactDOM.render(
  <Hello firstName="Justin" lastName="Meyer" />,
  document.getElementById('root'),
);
```

@highlight 2-4
@codepen react

## Exercise

Let's use our optimization hooks knowledge to make our Tic-Tac-Toe game a bit more performant!

### The problem

✏️ Modify the `Board` component so that it's `handleSquareClick` function uses the `useCallback` hook.

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
    setIsXTurn((value) => !value);
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

  const handleSquareClick = React.useCallback(
    (squareIndex) => {
      if (board[squareIndex]) {
        return;
      }

      const newBoard = [...board];
      newBoard[squareIndex] = isXTurn ? 'X' : 'O';

      setBoard(newBoard);
      setIsXTurn((value) => !value);
    },
    [board, isXTurn],
  );

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
@highlight 46,58,only
</details>

## Next Steps

✏️ Head over to the [next lesson](managing-complex-state.html) to get a more comprehensive example on how one can use state.
