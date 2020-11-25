@page learn-react/context-hooks Context Hooks
@parent learn-react 10

@description Learn how to manage global app state with context hooks.

@body

## The Prop Drilling Problem

A single component can take as many props as you want to give it, but just like arguments in functions, it's a good idea to [limit this number](https://stackoverflow.com/questions/37695557/react-are-there-respectable-limits-to-number-of-props-on-react-components), as more props makes for [a more confusing component](https://martinfowler.com/bliki/CodeSmell.html).

However, this can be difficult to do when you have a lot of data to pass through your component tree. Consider the following hierarchy with a few "drilled props". Lets imagine that the `Theme`, `Domain` and `RootUrl` are decided within the `App` component, but are **only** needed within the `ButtonText` component. That is to say, `Dashboard` and `Button` have no business related to any of those props.

```code
──┬ App(Theme, Domain, RootUrl)
  └─┬ Dashboard(Theme, Domain, RootUrl)
    |─┬ Button(Theme, Domain, RootUrl)
    │ └── ButtonText(Theme, Domain, RootUrl)
    └─┬ Button(Theme, Domain, RootUrl)
      └── ButtonText(Theme, Domain, RootUrl)
```

Without concerning ourselves with what exactly each of the props does, we can see the problem. Every piece of global state must be propagated through the entire hierarchy. As a result, every component would look something like this:

```jsx
function Component1({ Theme, Domain, RootUrl }) {
  return <Component2 Theme={Theme} Domain={Domain} RootUrl={RootUrl}>
}
```

@highlight 1,2

It is possible to re-write it using the spread operator, but what you gain in conciseness, you lose in clarity and performance. **Avoid writing components like this!**

```jsx
function Component1(props) {
  return <Component2 {...props} >
}
```

@highlight 1,2

In this case, it doesn't matter if `Component1` even needs the `Theme` prop; it will always require it simply because `Component2` might require it. Initially, this was solved using libraries such as [Redux](https://redux.js.org/). These libraries would work by wrapping each component in a connector Higher-order Component (HoC) which would automatically pass in any required props. Today, we solve this problem using React's Context Providers and Consumers.

## What is Context?

One way to think about Contexts is an additional set of props which are passed transparently through React's internals instead of arguments. It involves three parts:

1. **The Context:** Think of the context like a box of things. The box needs to be available to all who want to use it.
2. **The Provider:** The provider puts things into the box. Whatever data it handles is only available to its children.
3. **The Consumer:** The consumer takes things out of the box. It can only access the providers which are above it in the component hierarchy.

## The Context API

### Writing a Context

Creating a Context is as easy as calling `createContext()` and supplying it a default value.

```jsx
import React, { createContext } from 'react';

const defaultValue = 'Unknown';
const UsernameContext = createContext(defaultValue);
```

@highlight 4

The default value is what the **Consumers** will get if they have no available **Provider**. This is often used more in testing than in production.

### Writing a Provider

The provider component is exposed by the context. It is always accessible via `ContextName.Provider` and requires a single prop named `value`. This prop will be the value which provided to all of its **Consumers**.

Any components we render inside of the provider will be able to access the information in the `value` prop, no matter how deeply nested they are in the component tree. This eliminates the need for prop drilling where a single prop would need to be passed down through multiple components.

```jsx
import React, { createContext } from 'react';

const defaultValue = 'Unknown';
const UsernameContext = createContext(defaultValue);

function App() {
  let [username, setUsername] = React.useState('No-name');

  return (
    <UsernameContext.Provider value={username}>
      <WhoAmI />
    </UsernameContext.Provider>
  );
}
```

@highlight 4,7,10

### Writing a Consumer

The consumer is similarly exposed by the context under `ContextName.Consumer`. It allows us to extract the value supplied to a producer above it using a callback.

```jsx
import React, { createContext } from 'react';

const defaultValue = 'Unknown';
const UsernameContext = createContext(defaultValue);

function App() {
  let [username, setUsername] = React.useState('No-name');

  return (
    <UsernameContext.Provider value={username}>
      <WhoAmI />
    </UsernameContext.Provider>
  );
}

function WhoAmI() {
  return (
    <UsernameContext.Consumer>
      {(value) => {
        return <span>{value}</span>;
      }}
    </UsernameContext.Consumer>
  );
}
```

@highlight 16-22,only

### Updating the Context

As discussed before, Contexts are a lot like props. Their only difference is the method through which they are passed. To update them, we need to update the value that is passed into the **Provider**. Consider the following changes to make it possible:

```jsx
import React, { createContext } from 'react';

const defaultValue = {
  username: 'Unknown',
  setUsername: () => new Error('Not in provider'),
};
const UsernameContext = createContext(defaultValue);

function App() {
  let [username, setUsername] = React.useState('No-name');

  return (
    <UsernameContext.Provider
      value={{ username: username, setUsername: setUsername }}
    >
      <WhoAmI />
    </UsernameContext.Provider>
  );
}

function WhoAmI() {
  return (
    <UsernameContext.Consumer>
      {(value) => {
        return (
          <>
            <span>{value.username}</span>
            <button onClick={() => value.setUsername('Mike')}>
              My Name is Mike
            </button>
            <button onClick={() => value.setUsername('Kyle')}>
              My Name is Kyle
            </button>
          </>
        );
      }}
    </UsernameContext.Consumer>
  );
}
```

@highlight 3-6,14,27,28,31,only

We have made three changes to our code:

1. We have changed the shape of our context data from a String, to an Object. This was necessary to pass multiple properties within the same Context.
2. We included the `setUsername` function in the value of our Provider.
3. We added 2 buttons to call the `setUsername` function in the `WhoAmI` component.

## Context with Hooks

With the introduction of hooks, React also brought us the `useContext` hook. It allows us to consume Contexts without callbacks. In order to use it, pass the Context object to the `useContext` hook.

The above example could be re-written to use the `useContext` hook as follows:

```jsx
import React, { createContext, useContext } from 'react';

const defaultValue = {
  username: 'Unknown',
  setUsername: () => new Error('Not in provider'),
};
const UsernameContext = createContext(defaultValue);

function App() {
  let [username, setUsername] = React.useState('No-name');

  return (
    <UsernameContext.Provider
      value={{ username: username, setUsername: setUsername }}
    >
      <WhoAmI />
    </UsernameContext.Provider>
  );
}

function WhoAmI() {
  const value = useContext(UsernameContext);

  return (
    <>
      <span>{value.username}</span>
      <button onClick={() => value.setUsername('Mike')}>My Name is Mike</button>
      <button onClick={() => value.setUsername('Kyle')}>My Name is Kyle</button>
    </>
  );
}
```

@highlight 22,only

The method for consuming contexts has now shifted from callbacks from within JSX to simple, procedural function calls. This has the benefit of making the code flatter, and easier to read. Additionally, using multiple consumers becomes significantly cleaner.

#### Without Hooks:

```jsx
return (
  <FooContext.Consumer>
    {(foo) => (
      <BarContext.Consumer>
        {(bar) => (
          <BazContext.Consumer>
            {(baz) => (
              <span>
                {foo} {bar} {baz}
              </span>
            )}
          </BazContext.Consumer>
        )}
      </BarContext.Consumer>
    )}
  </FooContext.Consumer>
);
```

#### With Hooks

```jsx
const foo = useContext(FooContext);
const bar = useContext(BarContext);
const baz = useContext(BazContext);

return (
  <span>
    {foo} {bar} {baz}
  </span>
);
```

@highlight 1-3

Much better.

## Advanced Provider Patterns

The example above demonstrates the simplest use-case for context, but often times developers will organize their providers to abstract away a lot of the boilerplate. Exposing your Context object directly can also result in more complex code and even more complex maintenance, as the consuming code is accessing the data directly. By creating wrappers for the `Provider` component and `useContext` hook, you can control exactly what data each component is using, thereby reducing code complexity and simplifying maintenance.

Let us consider a more complex situation: Global styles. take a look at how we might refactor the `ThemeContext` so that it's wrapped in it's own custom component:

```jsx
import React, { createContext } from 'react';

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

@highlight 10-16,only

In the example above, we've taken away all of the `ThemeContext` logic and encapsulated it into it's own component `ThemeProvider`. This is a very common technique for organizing contexts in a scalable and reusable way.

We can take this a step further by exporting a custom hook `useTheme` from this file, which can then be used by nested components like `Button` to access the theme:

```jsx
import React, { createContext } from 'react';

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

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
```

@highlight 18-21,only

Now, we can refactor our `Layout` component to use this new provider. Notice how much cleaner it looks when we abstract away the context logic into it's own component (`ThemeProvider`)

```jsx
import React from 'react';
import ThemeProvider from './ThemeProvider';

export default function Layout() {
  return (
    <ThemeProvider theme="blue">
      <Button label="Click Me!" />
    </ThemeProvider>
  );
}
```

@highlight 6,8,only

We can also refactor the way the `Button` component consumes the theme, by having it use the newly exposed `useTheme` custom hook.

```jsx
import React from 'react';
import { useTheme } from './ThemeProvider';

function Button({ label }) {
  const theme = useTheme();

  return (
    <div style={theme}>
      <button>{label}</button>
    </div>
  );
}
```

@highlight 2,5

## Exercise

Let's use our context hook knowledge to make our Tic-Tac-Toe use a style theme!

### The problem

✏️ Let's add in the ability to use a style theme for our app.

- `Game` Component
  - Create a new piece of state called `theme`, which will store the current theme used by the app (`themes.light` by default).
  - Create a `ThemeContext` object using `React.createContext()`
  - Wrap the component tree in `<ThemeContext.Provider>` and give it a value of the `theme` state.
  - Create and export a custom hook called `useTheme`.
  - (Optional) Add in a button which allows the user to switch between `themes.light` and `themes.dark`
- `Square` Component
  - Get the theme from the new `useTheme` hook in the `Game` component.

Here's the starter code

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

function boardHasWinner(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningCombo = winningCombos.find((combo) => {
    return (
      board[combo[0]] !== '' &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    );
  });
  return !!winningCombo;
}

function Square({ onClick, symbol, id }) {
  const theme = {}; // Get this from a custom hook

  return (
    <div
      id={id}
      style={Object.assign({}, squareStyling, {
        color: theme.text,
        backgroundColor: theme.background,
      })}
      onClick={onClick}
    >
      {symbol}
    </div>
  );
}

function Board({ board, handleSquareClick }) {
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

// Create a context for your theme
// Provide a theme (light or dark) to the children of this component
// Export a custom hook that returns the current theme
// Consume the custom hook in Square.js
// Create a state and button that allows the user to switch between themes

const blankBoard = ['', '', '', '', '', '', '', '', ''];

function Game() {
  const [board, setBoard] = React.useState(blankBoard);
  const [isXTurn, setIsXTurn] = React.useState(true);

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
    }
  }

  function resetGame() {
    setIsXTurn(true);
    setBoard(blankBoard);
  }

  return (
    <>
      <Board board={board} handleSquareClick={handleSquareClick} />
      <button onClick={() => {}}>Toggle Theme</button>
      current player: {currentPlayer}
    </>
  );
}

ReactDOM.render(<Game />, document.getElementById('root'));
```

@codepen react

### The solution

#### Game

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

function boardHasWinner(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningCombo = winningCombos.find((combo) => {
    return (
      board[combo[0]] !== '' &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    );
  });
  return !!winningCombo;
}

const themes = {
  light: {
    text: '#4A5568',
    background: '#EDF2F7',
  },
  dark: {
    text: '#EDF2F7',
    background: '#4A5568',
  },
};
const ThemeContext = React.createContext();

function useTheme() {
  return React.useContext(ThemeContext);
}

function Square({ onClick, symbol, id }) {
  const theme = useTheme();

  return (
    <div
      id={id}
      style={Object.assign({}, squareStyling, {
        color: theme.text,
        backgroundColor: theme.background,
      })}
      onClick={onClick}
    >
      {symbol}
    </div>
  );
}

function Board({ board, handleSquareClick }) {
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

const blankBoard = ['', '', '', '', '', '', '', '', ''];

function Game() {
  const [board, setBoard] = React.useState(blankBoard);
  const [isXTurn, setIsXTurn] = React.useState(true);
  const [theme, setTheme] = React.useState(themes.light);

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
    }
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
      <Board board={board} handleSquareClick={handleSquareClick} />
      <button onClick={handleToggleTheme}>Toggle Theme</button>
      current player: {currentPlayer}
    </ThemeContext.Provider>
  );
}

ReactDOM.render(<Game />, document.getElementById('root'));
```

@codepen react
@highlight 46-55,56,58-60,63,98,117-119,127,131 only
