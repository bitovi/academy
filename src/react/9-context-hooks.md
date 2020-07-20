@page learn-react/context-hooks Context Hooks
@parent learn-react 9

@description Learn how to manage global app state with context hooks.

@body


# React Context via Hooks

* "dependency injection"

## useContext

* Exposes data at a high level to be used at a lower level
* Avoids prop-drilling
* Used by custom hooks to simplify knowledge


```jsx title="Providing and Consuming a Theme with Context" subtitle="The theme data we're exposing"
// provider.js
import React, { useContext } from 'react';

const THEMES = {
  blue: {
    colors: {
      background: '#0000ff',
      foreground: '#ffff00',
    },
    sizes: {
      button: '1.25em',
    },
  },
  red: {
    colors: {
      background: '#ff0000',
      foreground: '#00ffff',
    },
    sizes: {
      button: '1.25em',
    },
  },
};
```

```jsx title="Providing and Consuming a Theme with Context" subtitle="Use the Button with the Provider"
// provider.js
import React, { useContext } from 'react';

const THEMES = {
  blue: {
    colors: {
      background: '#0000ff',
      foreground: '#ffff00',
    },
    sizes: {
      button: '1.25em',
    },
  },
  red: {
    colors: {
      background: '#ff0000',
      foreground: '#00ffff',
    },
    sizes: {
      button: '1.25em',
    },
  },
};

// consumer.js
import React from 'react';
import { useColor, useSize } from './provider'

export default function Layout() {
  return (
    <ThemeProvider theme="red">
      <div className="left">
        <Button label="Left Button" />
      </div>
    </ThemeProvider>
  );
}
```

**Providing and Consuming a Theme with Context**

```jsx title="Providing and Consuming a Theme with Context" subtitle="The Button Component, using custom hooks"
// provider.js
import React, { useContext } from 'react';

const THEMES = {
  blue: {
    colors: {
      background: '#0000ff',
      foreground: '#ffff00',
    },
    sizes: {
      button: '1.25em',
    },
  },
  red: {
    colors: {
      background: '#ff0000',
      foreground: '#00ffff',
    },
    sizes: {
      button: '1.25em',
    },
  },
};

// consumer.js
import React from 'react';
import { useColor, useSize } from './provider'

export default function Layout() {
  return (
    <ThemeProvider theme="red">
      <div className="left">
        <Button label="Left Button" />
      </div>
    </ThemeProvider>
  );
}

function Button({ label }) {
  const background = useColor('background');
  const color = useColor('foreground');
  const fontSize = useSize('button');

  return (
    <button style={{ background, color, fontSize }}>
      {label}
    </button>
  );
}
```

```jsx title="Providing and Consuming a Theme with Context" subtitle="Create a context and use it in our Provider"
// provider.js
import React, { useContext } from 'react';

const THEMES = {
  blue: {
    colors: {
      background: '#0000ff',
      foreground: '#ffff00',
    },
    sizes: {
      button: '1.25em',
    },
  },
  red: {
    colors: {
      background: '#ff0000',
      foreground: '#00ffff',
    },
    sizes: {
      button: '1.25em',
    },
  },
};

const ThemeContext = React.createContext();

export default function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={THEMES[theme]}>
      {children}
    </ThemeContext.Provider>
  );
}

// consumer.js
import React from 'react';
import { useColor, useSize } from './provider'

export default function Layout() {
  return (
    <ThemeProvider theme="red">
      <div className="left">
        <Button label="Left Button" />
      </div>
    </ThemeProvider>
  );
}

function Button({ label }) {
  const background = useColor('background');
  const color = useColor('foreground');
  const fontSize = useSize('button');

  return (
    <button style={{ background, color, fontSize }}>
      {label}
    </button>
  );
}
```

```jsx title="Providing and Consuming a Theme with Context" subtitle="Custom hooks to provide the needed values"
// provider.js
import React, { useContext } from 'react';

const THEMES = {
  blue: {
    colors: {
      background: '#0000ff',
      foreground: '#ffff00',
    },
    sizes: {
      button: '1.25em',
    },
  },
  red: {
    colors: {
      background: '#ff0000',
      foreground: '#00ffff',
    },
    sizes: {
      button: '1.25em',
    },
  },
};

const ThemeContext = React.createContext();

export default function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={THEMES[theme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColor(color) {
  const { colors } = useContext(ThemeContext);
  return colors[color];
};

export function useSize(size) {
  const { sizes } = useContext(ThemeContext);
  return sizes[size];
};

// consumer.js
import React from 'react';
import { useColor, useSize } from './provider'

export default function Layout() {
  return (
    <ThemeProvider theme="red">
      <div className="left">
        <Button label="Left Button" />
      </div>
    </ThemeProvider>
  );
}

function Button({ label }) {
  const background = useColor('background');
  const color = useColor('foreground');
  const fontSize = useSize('button');

  return (
    <button style={{ background, color, fontSize }}>
      {label}
    </button>
  );
}
```

```jsx title="Providing and Consuming a Theme with Context" subtitle="This is why it's better than a global module"
// provider.js
import React, { useContext } from 'react';

const THEMES = {
  blue: {
    colors: {
      background: '#0000ff',
      foreground: '#ffff00',
    },
    sizes: {
      button: '1.25em',
    },
  },
  red: {
    colors: {
      background: '#ff0000',
      foreground: '#00ffff',
    },
    sizes: {
      button: '1.25em',
    },
  },
};

const ThemeContext = React.createContext();

export default function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={THEMES[theme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColor(color) {
  const { colors } = useContext(ThemeContext);
  return colors[color];
};

export function useSize(size) {
  const { sizes } = useContext(ThemeContext);
  return sizes[size];
};

// consumer.js
import React from 'react';
import { useColor, useSize } from './provider'

export default function Layout() {
  return (
    <ThemeProvider theme="red">
      <div className="left">
        <Button label="Left Button" />
      </div>

      <ThemeProvider theme="blue">
        <div className="content">
          <Button label="Content Button" />
        </div>
      </ThemeProvider>
    </ThemeProvider>
  );
}

function Button({ label }) {
  const background = useColor('background');
  const color = useColor('foreground');
  const fontSize = useSize('button');

  return (
    <button style={{ background, color, fontSize }}>
      {label}
    </button>
  );
}
```


## Exercise

Let's use our context hook knowledge to make our tic-tac-toe use a style theme!

Run the app locally with `npm start` and choose the `Context Hooks` exercise. Now head over to `src/exercises/9 - Context Hooks/components`. These are the files you'll be editing.

### The problem

We want to add in the ability to use a style theme for our app.

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

