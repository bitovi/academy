@page learn-react/optimization-hooks Optimization Hooks
@parent learn-react 9

@description Learn how to optimize your React apps with some helpful hooks.

@body

# Optimization Hooks

In addition to the core hooks exposed by React, namely `useState` and `useEffect`, there are several hooks aimed at optimizing your code for performance.

Specifically optimization through memoization. In a nutshell, memoization is the process of caching the values returned from long running functions, and returning the cached values when inputs are identical.

There are two hooks which deal with memoization, `useMemo` and `useCallback`, let's take a look at them below.

## useMemo

* Returns a memoized value.
* Recalculated synchronously based on declared dependencies.
* Used to optimize expensive calculations.

```html title="useMemo Example"
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<Hello firstName="Justin" lastName="Meyer"/>,document.getElementById('root'));

function Hello({ firstName, lastName }) {
  const name = React.useMemo(() => {
    // some expensive derived value
    return `${firstName} ${lastName}`;
  }, [ firstName, lastName ]);

  return (
    <div>{name}</div>
  );
}

</script>
```
@codepen

In the code above, we're utilizing `useMemo` to memoize a value derived from two props, `firstName` and `lastName`. Imagine that in order to get the full `name`, we need to perform some long-running or expensive operation. Normally, we would perform this operation every time the component renders, regardless of the `firstName`/`lastName` prop values.

When we memoize the value however, React keeps track of the inputs and outputs of this function, and caches values for all the possibilities it encounters. This means that if this component gets rendered with the same first and last name 100 times, we'll only need to perform the expensive operation once.

`useMemo` takes two arguments, the first is a function which performs the expensive operation and returns a value, the second is an array of dependencies. The dependency array determines which values, when changed, should cause the memoized value to be re-computed.

To sum it all up:

* When we need to do something expensive
  1. We wrap it in useMemo
  2. Specify when it should re-compute

### useMemo to cache a function call

Let's take a look at a more real world example, here we'll generate primes, but show only some of them...

Here's a look at it without `useMemo`:

```html
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<Hello bigJSONBlob={'{"hello": "world"}'}/>,document.getElementById('root'));

function Hello({ bigJSONBlob }) {
  const data = JSON.parse(bigJSONBlob);
  const lines = flatten(data);

  return (
    <div>{lines.map(line => <div key={line}>{line}</div>)}</div>
  );
}

function flatten(input) {
  return Object.keys(input).map(key => {
    if (typeof input[key] === 'object') {
      return [
        `${key}:`,
        ...flatten(input[key]).map(line => `  - ${line}`),
      ];
    }

    return [ `${key}: ${input[key]}` ];
  }).flat();
}

</script>
```
@codepen

This could get quite expensive for a large object, even the parsing could make a difference, so we memoize the whole value, only recalculating on `bigJSONBlob` changes

```html title="useMemo to cache a function call" subtitle="So we memoize the whole value, only recalculating on bigJSONBlob changes"
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<Hello bigJSONBlob={'{"hello": "world"}'}/>,document.getElementById('root'));

function Hello({ bigJSONBlob }) {
  const lines = React.useMemo(() => {
    const data = JSON.parse(bigJSONBlob);
    return flatten(data);
  }, [ bigJSONBlob ]);

  return (
    <div>{lines.map(line => <div key={line}>{line}</div>)}</div>
  );
}

function flatten(input) {
  return Object.keys(input).map(key => {
    if (typeof input[key] === 'object') {
      return [
        `${key}:`,
        ...flatten(input[key]).map(line => `  - ${line}`),
      ];
    }

    return [ `${key}: ${input[key]}` ];
  }).flat();
}

</script>
```
@highlight 4,only
@codepen

## useCallback

* A special case of useMemo that returns a function instead of a value.
* `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`
* Used to maintain referential equality between renders.

`useCallback` is particularly useful when defining event handlers. In such cases, we're not necessarily interested in memoizing a single value, but rather, a callback function. This is very common in react, as we're constantly using callbacks as props.

Below is a clickable `Hello` component which defines an un-memoized `handleClick` function.

```html title="useCallback" subtitle="a Thing with a click handler"
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<Hello firstName="Justin" lastName="Meyer"/>,document.getElementById('root'));

function Hello({ firstName, lastName }) {
  const handleClick = () => {
    console.log(`${firstName} ${lastName}`);
  };

  return (
    <button onClick={handleClick}>Hello</button>
  );
}

</script>
```
@codepen

Now below, we'll wrap `handleClick`'s logic in a `useCallback` so we can cache the results.

```html title="useCallback" subtitle="click handler gets memoized"
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script><script type="jsx">ReactDOM.render(<Hello firstName="Justin" lastName="Meyer"/>,document.getElementById('root'));

function Hello({ firstName, lastName }) {
  const handleClick = React.useCallback(() => {
    console.log(`${firstName} ${lastName}`);
  }, [ firstName, lastName ]);

  return (
    <button onClick={handleClick}>Hello</button>
  );
}

</script>
```
@codepen

## Exercise

Let's use our optimization hooks knowledge to make our Tic-Tac-Toe game a bit more performant!

Run the app locally with `npm start` and choose the `Optimization Hooks` exercise. Now head over to `src/exercises/8 - Optimization Hooks/components`. These are the files you'll be editing.

### The problem

✏️ Modify the `Board` component so that it's `handleSquareClick` function uses the `useCallback` hook.

### The solution

```jsx
import React, { useState, useCallback } from 'react';
import Square from '../../../app/components/Square';

function Board() {
  const [board, setBoard] = useState([ '', '', '', '', '', '', '', '', '' ]);
  const [isXTurn, setIsXTurn] = useState(true);

  const handleSquareClick = useCallback((squareIndex) => {
    if (board[squareIndex]) {
      return;
    }

    const newBoard = [ ...board ];
    newBoard[squareIndex] = isXTurn ? 'X' : 'O';

    setBoard(newBoard);
    setIsXTurn((value) => !value);
  }, [ board, isXTurn ])

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
@highlight 8,only

