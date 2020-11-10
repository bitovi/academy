@page learn-react/props Props: Component Arguments
@parent learn-react 4

@description Learn how to make components reusable with props.

@body

## Props Are Like Arguments

Props are the same as arguments you would pass into a function. For example, suppose we had an add method which adds two numbers together. It might look something like this:

```js
function addOneAndSeven() {
  return 1 + 7;
}
```

@highlight 2

This is a perfectly good function, but notice that it always adds the same two numbers. In other words, it's only usable in very specific cases.

We can make this function more reusable by allowing arguments to be passed in:

```js
function addNumbers(num1, num2) {
  return num1 + num2;
}
```

@highlight 2

The function is now infinitely more reusable because the caller can specify the numbers, instead of just having them be hardcoded.

This same principle applies to React components.

## Basic Props Usage

Recall that React components are just functions (or classes) which return an element. And like normal functions, we run into the same re-usability problems.

```jsx
function AddNumbers() {
  return <div>{1 + 7}</div>;
}
```

@highlight 2

Take a look at the `AddNumbers` component above. It returns a div with the result of adding `1 + 7`. This is fine, but suppose once again we wanted to specify which numbers it adds.

We can solve this by modifying the `AddNumbers` component so that it accepts props for `num1` and `num2`.

So we would change `AddNumbers` so that it would look like this.

```jsx
function AddNumbers({ num1, num2 }) {
  return <div>{num1 + num2}</div>;
}
```

@highlight 2

> In React, all functional components receive a `props` object as their first argument (class components get them in the constructor and at `this.props` in the methods).

We're also [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the props object, a convention used by much of the community and in the rest of this guide.

The props object contains any values which are passed into the component when it's rendered.

```jsx
<AddNumbers num1={1} num2={7} />
<AddNumbers num1={5} num2={-90} />
```

Whenever the `AddNumbers` component is rendered, we can now pass it `num1` & `num2` props which it will use to do the calculation.

Now, instead of having a hardcoded addition, the component is flexible and can be re-used in any scenario where it's necessary to display the result of adding two numbers.

## Prop Data Types

Props can be any data type or data structure. Anything you could pass into a JavaScript function can be passed into a component as a prop.

```jsx
<Component
  string="string props can be passed using quotation marks"
  interpolatedString={`The value is: ${value}`}
  array={[1, 2, 3]}
/>
```

Props that are static strings can be passed using quotation marks, while non-string props must be passed in a set of curly brackets; this includes interpolated strings.

## Callback Props

Just like normal functions, React components can accept props of any data type (even other components). One of the most useful types of props are callbacks. Callback props allow us to specify what a component will do when an action occurs inside of it.

```jsx
function MyButton() {
  return <button onClick={() => console.log('clicked')}>click me</button>;
}
```

@highlight 2

The button above calls `console.log('clicked')` whenever the user clicks it. But once again, we're running into a re-usability issue.

Suppose we wanted to perform an arbitrary action when the button is clicked instead of the hardcoded `console.log('clicked')`.

To accomplish that, we would use a callback prop. To do so, simply pass the component a callback function as one of its props and pass that function to the button as the onClick prop. Note that by convention, callback props should begin with `on` just like native DOM events:

```jsx
function MyButton({ onButtonClick }) {
  // here we're destructuring the props object
  return <button onClick={onButtonClick}>click me</button>;
}
```

@highlight 1,3

Notice above that the `MyButton` component now accepts an `onButtonClick` prop. Now whenever the button is clicked it will call the callback function, making the `MyButton` component more reusable.

```jsx
<MyButton onButtonClick={() => console.log('custom click action')}>
```

When we render the button, we'll pass in the `onButtonClick` prop just like the numbers from the `AddNumbers` component. Since we're not passing a string prop, it needs to be enclosed in curly brackets `{ }`.

## Try it out

Below is the `MyButton` component code in a working example:

```jsx
function MyButton({ onButtonClick }) {
  return <button onClick={onButtonClick}>click me</button>;
}

function AddNumbers({ num1, num2 }) {
  return <div>{num1 + num2}</div>;
}

function App() {
  return (
    <div>
      <AddNumbers num1={5} num2={10} />
      <MyButton onButtonClick={() => console.log('you clicked')} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

@highlight 1,2,5,6,12,13
@codepen react

## Exercise

Let's use our props knowledge to start building out the Tic-Tac-Toe app that we started in [learn-react/setting-up-environment].

The app itself has already been [scaffolded](https://github.com/bitovi/react-exercises). It includes 3 files, each of which comes together to make up the game:

- `Game.js` - This is the component which is responsible for running the game. It's the highest level component, and the most complex. This is where we'll do most of our state management.
- `Board.js` - This is a component which renders out the game board and all of the squares inside of it.
- `Square.js` - This component represents a single square on the Tic-Tac-Toe board. It can be blank or populated with a symbol such as X or O.

✏️ Clone the app from [GitHub](https://github.com/bitovi/react-exercises) and run it locally with `npm install && npm start` and choose the `Props` exercise. Now head over to `src/exercises/4 - Props/components`. These are the files you'll be editing for this exercise.

### The problem

The goal of this exercise is to get a `console.log()` to happen whenever the user clicks on a square. This will require you to work modify some of the props in the scaffolded code.

#### Hints

- Modify the `Square` component so that accepts two props:
  - `onClick` - a callback which is executed when the user click on it
  - `symbol` - a string indicating what symbol is in the square (X, O or nothing)
- Modify the `Board` component so it renders out all 9 squares given to it by its `board` props (`board` is an array of strings).
- Modify the `Game` component so it passes the correct props into `<Board />`.

### The solution

#### Square.js

```jsx
function Square({ onClick, symbol }) {
  return (
    <div className="square" onClick={onClick}>
      {symbol}
    </div>
  );
}
```

@highlight 1,3,4,only

#### Board.js

```jsx
function Board({ onSquareClick, board }) {
  return (
    <div className="board">
      {board.map((symbol, index) => (
        <Square
          key={index}
          symbol={symbol}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
```

@highlight 4-10,only

#### Game.js

```jsx
const blankBoard = ['', '', '', '', '', '', '', '', ''];

function Game() {
  const handleSquareClick = () => {
    console.log('You clicked a square');
  };

  const getHint = () => {
    console.log('Getting hint');
  };

  const toggleTheme = () => {
    console.log('You toggled the theme');
  };

  return (
    <>
      <Board board={blankBoard} onSquareClick={handleSquareClick} />
      <button onClick={getHint}>Get Hint</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
      current player: X
    </>
  );
}
```

@highlight 4-6,18,20,only
