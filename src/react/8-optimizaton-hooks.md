@page learn-react/optimization-hooks Optimization Hooks
@parent learn-react 8

@description Learn how to optimize your React apps with some helpful hooks.

@body

# Optimization Hooks

Optimization through Memoization


## useMemo


* Returns a memoized value.
* Recalculated synchronously based on declared dependencies.
* Used to optimize expensive calculations.

```jsx title="useMemo Example"
import React, { useMemo } from 'react';

function Hello({ firstName, lastName }) {
  const name = useMemo(() => {
    // some expensive derived value
    return `${firstName} ${lastName}`;
  }, [ firstName, lastName ]);
​
  return (
    <div>{name}</div>
  );
}
```

* We need to do something expensive
* so we wrap it in useMemo
* and specify when it should re-compute
* Not a particularly real-world use-case though


### useMemo to cache a function call

Generate primes, but show only some of them.

```jsx title="useMemo to cache a function call"
import React, { useMemo } from 'react';

function Hello({ bigJSONBlob }) {
  const data = JSON.parse(bigJSONBlob);
  const lines = flatten(data);

  return (
    <div>{lines.map(line => <div>{line}</div>)}</div>
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
```
This could get quite expensive for a large object, even the parsing could make a difference, so we memoize the whole value, only recalculating on bigJSONBlob changes

```jsx title="useMemo to cache a function call" subtitle="So we memoize the whole value, only recalculating on bigJSONBlob changes"
import React, { useMemo } from 'react';

function Hello({ bigJSONBlob }) {
  const lines = useMemo(() => {
    const data = JSON.parse(bigJSONBlob);
    return flatten(data);
  }, [ bigJSONBlob ]);

  return (
    <div>{lines.map(line => <div>{line}</div>)}</div>
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
```


## useCallback


* A special case of useMemo that returns a function instead of a value.
* `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`
* Used to maintain referential equality between renders.


```jsx title="useCallback" subtitle="a Thing with a click handler"
import React, { useCallback } from 'react';

function Hello({ firstName, lastName }) {
  const handleClick = () => {
    console.log(`${firstName} ${lastName}`);
  };

  return (
    <Thing onClick={handleClick}>Hello</Thing>
  );
}
```

```jsx title="useCallback" subtitle="click handler gets memoized"
import React, { useCallback } from 'react';

function Hello({ firstName, lastName }) {
  const handleClick = useCallback(() => {
    console.log(`${firstName} ${lastName}`);
  }, [ firstName, lastName ]);

  return (
    <Thing onClick={handleClick}>Hello</Thing>
  );
}
```

---
 
```jsx title="Pop Quiz"
import React from 'react';

// a click handler
function Hello1() {
  const handleClick = () => { /* do stuff */ };

  return (
    <div onClick={handleClick}>Hello</div>
  );
}

// a memoized click handler
function Hello2() {
  const handleClick = useCallback(() => { /* do stuff */ }, []);

  return (
    <div onClick={handleClick}>Hello</div>
  );
}
```

Which is more performant? Why?

```diff 3:9 title="Pop Quiz" subtitle="a click handler"
```
```diff 11:17 title="Pop Quiz" subtitle="a memoized click handler"
```
```diff 3:17 title="Pop Quiz" subtitle="Which is more performant? Why"
```

```jsx title="Pop Quiz Answer" subtitle="the memoized click handler"
import React, { useCallback } from 'react';

function Hello2() {
  const handleClick = useCallback(() => { /* do stuff */ }, []);

  return (
    <div onClick={handleClick}>Hello</div>
  );
}
```

```jsx title="Pop Quiz Answer" subtitle="the memoized click handler, rewritten"
import React, { useCallback } from 'react';

function Hello2() {
  const handleClickFn = () => { /* do stuff */ };
  const handleClick = useCallback(handleClickFn, []);

  return (
    <div onClick={handleClick}>Hello</div>
  );
}
```

```jsx title="Pop Quiz Answer" subtitle="which is almost the same as the original"
import React, { useCallback } from 'react';

function Hello1() {
  const handleClick = () => { /* do stuff */ };

  return (
    <div onClick={handleClick}>Hello</div>
  );
}

function Hello2() {
  const handleClickFn = () => { /* do stuff */ };
  const handleClick = useCallback(handleClickFn, []);

  return (
    <div onClick={handleClick}>Hello</div>
  );
}
```

```diff title="Pop Quiz Answer" subtitle="Now: which is more performant?"
```

```jsx title="Pop Quiz Answer" subtitle="if the child component depends on referencial identity"
import React, { useCallback } from 'react';

function Thing({ onClick }) {
  useEffect(() => {
    document.addEventListener('click', onClick)

    return () => document.removeEventListener('click', onClick)
  }, [ onClick ])

  return <div>Hello</div>;
});
```

```jsx title="Pop Quiz Answer" subtitle="Only then does this improve performance"
import React, { useCallback } from 'react';

function Thing({ onClick }) {
  useEffect(() => {
    document.addEventListener('click', onClick)

    return () => document.removeEventListener('click', onClick)
  }, [ onClick ])

  return <div>Hello</div>;
});

function Hello3() {
  const handleClick = useCallback(() => { /* do stuff */ }, []);

  return (
    <Thing onClick={handleClick}>Hello</Thing>
  );
}
```



## Exercise

Let's use our optimization hooks knowledge to make our tic-tac-toe game a bit more performant!

Run the app locally with `npm start` and choose the `Optimization Hooks` exercise. Now head over to `src/exercises/8 - Optimization Hooks/components`. These are the files you'll be editing.

### The problem

- Modify the `Board` component so that it's `handleSquareClick` function uses the `useCallback` hook.

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

