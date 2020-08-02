@page learn-react/context-hooks Context Hooks
@parent learn-react 10

@description Learn how to manage global app state with context hooks.

@body

# React Context via Hooks

React's context api allows global app state to be shared among all of the components in a component tree. It's commonly used to store data that many components are interested in like the app's theme or the current user.

A context object can be created using `React.createContext()` which returns a `Provider` component that can wrap other components interested in the global state.

```jsx title="Providing and Consuming a Theme with Context" subtitle="Use the Button with the Provider"
import React, {createContext} from 'react';

const THEMES = {
  blue: { color: '#0000ff', fontSize: '1.25rem' },
  red: { color: '#7ea0ff', fontSize: '2rem' },
};

export const ThemeContext = createContext()

export default function Layout() {
  return (
    <ThemeContext.Provider value={THEMES.blue}>
        <Button label="Click Me!" />
    </ThemeContext.Provider>
  );
}
```

In the example above we're creating a new `ThemeContext` and then using the `Provider` it exposes to wrap a button component.

Any components we render inside of the provider will be able to access the information in the `value` prop, no matter how deeply nested they are in the component tree. This eliminates the need for prop drilling where a single `theme` prop would need to be passed down through multiple components.

The example above is fairly simple, and it's important to keep in mind that there are ways of organizing these Providers that allow for more functionality/data to be exposed. 

So now that we've set up the Provider, the question is, how do child components like `Button` access this theme for themselves?

## useContext

* Hook provided by React
* Takes a context object and exposes the value to a child component
* Used by custom hooks to simplify knowledge

`useContext` allows for child components nested at any level within a provider to access the value the provider *provides*.

In the example above, the provider's value is a theme object (`THEMES.blue`). The theme is something that our `Button` component might want to use to style itself, so let's take a look at how that would work:

```jsx
import React, {useContext} from 'react'
import ThemeContext from './Layout'

function Button({label}){
  const theme = useContext(ThemeContext)

  return (
    <div style={theme}>
      <button>{label}</button>
    </div>
  )
}
```

In the button component above we're doing a couple things of interest. First, we import `useContext` from React, and we also import `ThemeContext` from our `Layout` component file (see example in previous section).

Once inside the `Button` component, we'll call on the `useContext` hook to give us the theme value passed down from the `ThemeContext.Provider`. This hooks takes one argument, the `ThemeContext` itself.

Once we've gotten the theme from `useContext`, we can use it to appropriately style the `Button`.

## Advanced Provider Patterns

The example above demonstrates the simplest use-case for context/useContext, but often times developers will organize their providers to abstract away a lot of the boilerplate.

Let's take a look at how we might refactor the `ThemeContext` so that it's wrapped in it's own custom component:

```jsx
import React, {createContext} from 'react'

const THEMES = {
  blue: { color: '#0000ff', fontSize: '1.25rem' },
  red: { color: '#7ea0ff', fontSize: '2rem' },
};

const ThemeContext = React.createContext();

export default function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={THEMES[theme]}>
      {children}
    </ThemeContext.Provider>
  );
}
```

In the example above, we've taken away all of the `ThemeContext` logic and encapsulated it into it's own component `ThemeProvider`. This is a very common technique for organizing contexts in a scalable and re-usable way.

We can take this a step further by exporting a custom hook `useTheme` from this file, which can then be used by nested components like `Button` to access the theme:

```jsx
import React, {createContext} from 'react'

const THEMES = {
  blue: { color: '#0000ff', fontSize: '1.25rem' },
  red: { color: '#7ea0ff', fontSize: '2rem' },
};

const ThemeContext = React.createContext();

export default function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={THEMES[theme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(color) {
  const theme = useContext(ThemeContext);
  return theme
};
```
@highlight 18-21,only

Now, we can refactor our `Layout` component to use this new provider. Notice how much cleaner it looks when we abstract away the context logic into it's own component (`ThemeProvider`)

```jsx
import React from 'react';
import ThemeProvider from './ThemeProvider

export default function Layout() {
  return (
    <ThemeProvider theme="blue">
        <Button label="Click Me!" />
    </ThemeProvider>
  );
}
```

We can also refactor the way the `Button` component consumes the theme, by having it use the newly exposed `useTheme` custom hook.

```jsx
import React from 'react'
import {useTheme} from './ThemeProvider'

function Button({label}){
  const theme = useTheme()

  return (
    <div style={theme}>
      <button>{label}</button>
    </div>
  )
}
```
@highlight 2,5,only

## Exercise

Let's use our context hook knowledge to make our tic-tac-toe use a style theme!

Run the app locally with `npm start` and choose the `Context Hooks` exercise. Now head over to `src/exercises/9 - Context Hooks/components`. These are the files you'll be editing.

### The problem

✏️ Let's add in the ability to use a style theme for our app.

- `Game` Component  
  - Create a new piece of state called `theme`, which will store the current theme used by the app (`themes.light` by default).
  - Create a `ThemeContext` object using `React.createContext()`
  - Wrap the component tree in `<ThemeContext.Provider>` and  give it a value of the `theme` state.
  - Create and export a custom hook called `useTheme` (this should just return `useContext(ThemeContext)`).
  - (Optional )Add in a button which allows the user to switch between `themes.light` and `themes.dark`
- `Square` Component
  - Get the theme from the new `useTheme` hook in the `Game` component.

### The solution

#### Game
```jsx
import React, { useContext, useState } from 'react';
import Board from '../../../app/components/Board';
import { getHintForBoard, boardHasWinner, blankBoard, themes } from '../../../app/utils';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext)
}

function Game() {
  const [board, setBoard] = useState(blankBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [hintSquare, setHintSquare] = useState(-1);
  const [theme, setTheme] = useState(themes.light);

  const currentPlayer = isXTurn ? 'X' : 'O';

  function handleSquareClick(squareIndex) {
    if (!board[squareIndex]) {
      const newBoard = [...board];
      newBoard[squareIndex] = currentPlayer;

      if (boardHasWinner(newBoard)) {
        alert(`${currentPlayer} Wins!`);
        resetGame();
      } else {
        setBoard(newBoard);
        setIsXTurn(!isXTurn);
      }
      setHintSquare(-1);
    }
  }

  async function handleGetHint() {
    setHintSquare(await getHintForBoard(board, currentPlayer));
  }

  function handleToggleTheme() {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  }

  function resetGame() {
    setIsXTurn(true);
    setBoard(blankBoard);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Board
        board={board}
        onSquareClick={handleSquareClick}
        hintSquare={hintSquare}
      />

      <button onClick={handleGetHint}>Get Hint</button>
      <button onClick={handleToggleTheme}>Toggle Theme</button>
      current player: {currentPlayer}
    </ThemeContext.Provider>
  );
}

export default Game;
```
@highlight 5,7-9,15,39-41,49,59,only


#### Square
```jsx
import React from 'react';
import { useTheme } from './Game';

function Square({ onClick, symbol, displayAsHint, id }) {
  const theme = useTheme();

  return (
    <div
      id={id}
      className="square"
      onClick={onClick}
      style={{
        color: theme.text,
        background: displayAsHint ? '#9AE6B4' : theme.background,
      }}
    >
      {symbol}
    </div>
  );
}

export default Square;
```
@highlight 5,only

