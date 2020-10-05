@page learn-react/props Props
@parent learn-react 4

@description Learn how to make components reusable with props.

@body

## What are props?

Props are React's way to make components more reusable.

Think of props as similar to arguments you would pass into a function. For example, suppose we had an add method which added two numbers together, it might look something like this:

```js
function addOneAndSeven(){
    return 1 + 7
}
```

This is a perfectly good function, but notice that it always adds the same two numbers, in other words, it's only usable in one very specific case.

We can make this function more re-usable by allowing arguments to be passed into it:


```js
function addNumbers(num1, num2){
    return num1 + num2
}
```

The above function is now infinitely more re-usable because the user can specify the numbers, instead of just having them be hardcoded in.

This same need also applies to React components. 

### Basic Props

Recall that React components are essentially just functions (or classes) which return some JSX. And like normal functions, we run into the same re-usability problems. 


```jsx
function AddNumbers() {
  return <div>{1 + 7}</div>;
}
```

Take a look at the `AddNumbers` component above. It returns a div with the result of adding `1 + 7`. This is fine, but suppose once again we wanted to specify which numbers it adds.

We can solve this by modifying the `AddNumbers` component so that it accepts props. 

```jsx
function AddNumbers(props){
  return (
    <div>{props.num1 + props.num2}</div>
  )
}
```

In React, all functional components (and classes) receive a `props` object as their first argument (w/ classes this is the first argument in the constructor).

The props object contains any values which are passed into the component when it's rendered.

```jsx
<AddNumbers num1={1} num2={7} />
<AddNumbers num1={5} num2={-90} />
```

Whenever the `AddNumbers` component is rendered, we can now pass it `num1` & `num2` props which it will use to do the calculation.

Now, instead of having an unchangeable, hard-coded addition, the component is more flexible and can be re-used in any scenario where it's necessary to display the result of adding two numbers.

#### Prop Data Types

Props can be any data type or data structure. Anything you could pass into a JavaScript function can be passed into a component as a prop.

```js
<Component 
  stringProp="string props can be passed using quotation marks"
  interpolatedStringProp={`The value is: ${value}`}
  nonStringProp={[1, 2, 3]}
>
```

Props that are strings can be passed using quotation marks, while non-string props must be passed in a set of curly brackets, this includes interpolated strings.

### Callback Props

Just like normal function arguments, React components can accept props of any data type (even other components).

One of the most useful types of props are callbacks. Callback props allow the programmer to specify what a component will do when an action occurs inside of it.

```jsx
function MyButton() {
  return (
    <button onClick={() => console.log('clicked')}>
        click me
    </button>
  )
}
```

The button above runs a simple function whenever the user clicks it. But once again, we're running into a re-usability issue.

Suppose we wanted to perform a custom action when the button is clicked instead of the hard-coded `console.log('clicked')`.

Here we would use a callback prop. We'll actually pass the component a callback function as one of its props, which it will run whenever the button is clicked. Note that by convention, these custom callback props should begin with `on` just like native DOM events:

```jsx
function MyButton({onButtonClick}) {  // here we're destructuring the props object
    return (
        <button onClick={onButtonClick}>
            click me
        </button>
    )
}
```
@highlight 1

Notice above that the `MyButton` component now accepts a `onButtonClick` prop (we're also destructuring the props object).

Now whenever the button is clicked it will run that custom action, making the button component a lot more re-usable.

```jsx
<MyButton onButtonClick={() => console.log('custom click action')}>
```

When we render the button, we'll pass in the `onButtonClick` prop just like the text from the `ErrorMessage` component. The only difference here is that because we're not passing a string prop, it needs to be inside `{ }` instead of `" "` (this applies for all non-string props).

A single component can take as many props as you want to give it, however just like arguments into functions it's a good idea to [limit this number](https://stackoverflow.com/questions/37695557/react-are-there-respectable-limits-to-number-of-props-on-react-components), as more props makes for a more confusing component.

### Try it out

Below is the `MyButton` component code combined together into a working example:

```html
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script type="jsx">



    function MyButton({onButtonClick}) {  // here we're destructuring the props object
        return (
            <button onClick={onButtonClick}>
                click me
            </button>
        )
    }

    function AddNumbers(props){
        return (
            <div>{props.num1 + props.num2}</div>
        )
    }

    function App(){
        return (
            <div>
                <AddNumbers num1={5} num2={10} />
                <MyButton onButtonClick={() => console.log('you clicked')} />
            </div>
        )
    }

    ReactDOM.render(<App />,document.getElementById('root'));
</script>
```
@codepen

## Exercise

Let's use our props knowledge to start building out our Tic-Tac-Toe app.

The app itself has already been scaffolded [here](https://github.com/bitovi/react-exercises). It includes 3 files each of which comes together to make up the game:

- `Game.js` - This is the component which is responsible for running the game. It's the highest level component, and the most complex. It's in this file where we'll do most of our state management.
- `Board.js` - This is a component which renders out the game board and all of the squares that make it up.
- `Square.js` - This component represents a single square on the Tic-Tac-Toe board, it can be blank or populated with a symbol (X/O).

✏️ Clone or fork the app from [github](https://github.com/bitovi/react-exercises) and run it locally with `npm install && npm start` and choose the `Props` exercise. Now head over to `src/exercises/4 - Props/components`. These are the files you'll be editing for this exercise.

### The problem

The goal of this exercise is to get a `console.log()` to happen whenever the user clicks on a square. This will require you to work modify some of the props in the scaffolded code.

#### Hints

 - Modify the `Square` component so that accepts two props
    -  `onClick` - a callback which is executed when the user click on it
    -  `symbol` - a string indicating what symbol is in the square (X, O or nothing)
 -  Modify the `Board` component so it renders out all 9 squares given to it by its `board` props (`board` is an array of strings)
 -  Modify the `Game` component so it passes the correct props into `<Board />`

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
