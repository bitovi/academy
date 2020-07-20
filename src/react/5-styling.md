@page learn-react/styling-in-react Styling in React
@parent learn-react 5

@description Learn the different ways to style React components

@body

## Different ways of styling components

### Inline styling

```jsx
function Thing({ isActive }) {
  return (
    <div style={{
      color: isActive ? 'black' : 'white',
      backgroundImage: `url(${imgUrl})`,
    }}>
      Hello World!
    </div>
  );
}
```

### Classes

```jsx
import './thing.css';

function Thing({ isActive }) {
  return (
    <div className="thing">
      Hello World!
    </div>
  );
}
```

```jsx
function Thing({ isActive }) {
  let className = 'thing';
  if (isActive) {
    className += ' thing-active';
  }

  return (
    <div className={className}>
      Hello World!
    </div>
  );
}
```

#### Classnames

```jsx title="External CSS" subtitle="use classnames"
import cx from 'classnames';
import './thing.css'

function Thing({ isActive }) {
  return (
    <div className={cx(
      'thing',
      isActive && 'thing-active',
    )}>
      Hello World!
    </div>
  );
}
```

### CSS Modules

```css 
.thing {
  border: 1em solid black;
}

.thing.active {
  border-color: red;
}
```

```css 
.Thing_thing_1FUOu {
  border: 1em solid black;
}

.Thing_thing_1FUOu.Thing_active_wBa2p {
  border-color: red;
}
```

```js
module.exports = {
  thing: 'Thing_thing_1FUOu',
  active: 'Thing_active_wBa2p',
}
```

```jsx 
import styles from './thing.module.css';

function Thing({ isActive }) {
  return (
    <div className={styles.thing}>
      Hello World!
    </div>
  );
}
```

### Styled Components

```jsx 
import styled from '@emotion/styled';

export const Button = styled.button`
  border: 1px solid darkblue;
  background: ${props => props.color || 'blue'};

  ${props => props.outline && css`
    border-color: ${props => props.color || 'blue'};
    background-color: darkblue;
  `}
`;
```

```jsx
import styled from '@emotion/styled';

export const Button = styled.button`
  border: 1px solid darkblue;
  background: ${props => props.color || 'blue'};

  ${props => props.outline && css`
    border-color: ${props => props.color || 'blue'};
    background-color: darkblue;
  `}
`;

function Thing() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button color="green">Green Button</Button>
      <Button outline>Outlined Button</Button>
    </div>
  );
}
```

## Exercise

Let's use our styling knowledge to make our tic-tac-toe game look amazing!

Run the app locally with `npm start` and choose the `Styling` exercise. Now head over to `src/exercises/5 - Styling/components`. These are the files you'll be editing.

### The problem

You have been provided a basic set of global styles in App.css. Your task is to convert these initial styles into each of the other styling types.
 * 1. Inline Styles
 * 2. Modular CSS
 * 3. Styled Components

### The solution

#### Inline Styles

`App.js`
```jsx
import React from 'react';

const boardStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '600px',
  height: '600px',
  boxShadow: '0px 3px 8px 0 rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
}

const squareStyles = {
  width: '200px',
  height: '200px',
  border: '1px solid black',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '6em',
}

const hintStyles = {
  background: '#9AE6B4',
}

function App() {
  return (
    <div style={boardStyles}>
      <div style={squareStyles}>O</div>
      <div style={squareStyles}>X</div>
      <div style={squareStyles}>O</div>
      <div style={{ ...squareStyles, ...hintStyles }}></div>
      <div style={squareStyles}>X</div>
      <div style={squareStyles}>X</div>
      <div style={squareStyles}></div>
      <div style={squareStyles}>O</div>
      <div style={squareStyles}>X</div>
    </div>
  );
}

export default App;
```

#### Modular CSS

`App.js`
```jsx
import React from 'react';
import cx from 'classnames';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.board}>
      <div className={styles.square}>O</div>
      <div className={styles.square}>X</div>
      <div className={styles.square}>O</div>
      <div className={cx(styles.square, styles.hint)}></div>
      <div className={styles.square}>X</div>
      <div className={styles.square}>X</div>
      <div className={styles.square}></div>
      <div className={styles.square}>O</div>
      <div className={styles.square}>X</div>
    </div>
  );
}

export default App;
```
`App.module.css`
```css
.board {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: 600px;
  height: 600px;
  box-shadow: 0px 3px 8px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.square {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6em;
}

.square:hover {
  cursor: pointer;
  background: #bbdefb !important;
}

.square.hint {
  background: #9AE6B4;
}
```

#### Styled Components

`App.js`
```jsx
import React from 'react';
import styled from '@emotion/styled';

export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  width: 600px;
  height: 600px;
  box-shadow: 0px 3px 8px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`

export const Square = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6em;

  :hover {
    cursor: pointer;
    background: #bbdefb !important;
  }

  ${props => props.hint && `
    background: #9AE6B4;
  `}
`

function App() {
  return (
    <Board>
      <Square>O</Square>
      <Square>X</Square>
      <Square>O</Square>
      <Square hint></Square>
      <Square>X</Square>
      <Square>X</Square>
      <Square></Square>
      <Square>O</Square>
      <Square>X</Square>
    </Board>
  );
}

export default App;
```