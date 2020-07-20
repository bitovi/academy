@page learn-react/props Props
@parent learn-react 4

@description Learn how to make components re-usable with props.

@body

## What are props?

Props are Reacts way to make components more re-usable.

You can think of props as similar to arguments you would pass into a function. For example, suppose we had an add method which added two numbers together, it might look something like this:

```js
function addOneAndSeven(){
    return 1 + 7
}
```

This is a perfectly good function, but notice that it always adds the same two numbers, in other words, it's only usable in one very specific case.

We can make this function more re-usable by allowing arguments to be passed into it:


```js
function addAndNumbers(num1, num2){
    return num1 + num2
}
```

The above function is now infinitely more re-usable because the user can specify the numbers, instead of just having them be hardcoded in.

This same logic also applies to React components. 

### Basic Props

Recall that React components are essentially just functions (or classes) which return some JSX. And like normal functions, we run into the same re-usabiity problems. 


```jsx
function ErrorMessage() {
  return <div className="error">There is an error</div>;
}
```

Take a look at the `ErrorMessage` component above. It returns a div with the text `"There was an error"`. This is fine, but suppose we wanted to display a more specific message. In this case it's not possible because the error message is hard-coded in.

We can solve this by modifying the `ErrorMessage` component so that it accepts props. 

```jsx
function ErrorMessage(props){
  return (
    <div className="error">{props.text}</div>
  )
}
```

In react, all functional components (and classes) receive a `props` object as their first argument (w/ classes this is the first argument in the constructor).

The props object contains any values which are passed into the component when it's rendered.

```jsx
<ErrorMessage text="The username or password is invalid" />
<ErrorMessage text="Error connecting to internet" />
```

Whenever the `ErrorMessage` component is rendered, we can now pass it a `text` prop which it will use as the displayed message.

Now, instead of having an unchangeable, hard-coded message, the component is more flexible and can be re-used in any scenario where it's necessary to display an error message to the user.


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

Here we would use a callback prop. We'll actually pass the component a callback function as one of it's props, which it will run whenever the button is clicked.

```jsx
function MyButton({handleClick}) {  // here we're destructuring the props object
    return (
        <button onClick={handleClick}>
            click me
        </button>
    )
}
```

Notice above that the `MyButton` component now accepts a `handleClick` prop (we're also destructuring the props object).

Now whenever the button is clicked it will run that custom action, making the button component a lot more re-usable.

```jsx
<MyButton handleClick={() => console.log('custom click action')}>
```

When we render the button, we'll pass in the `handleClick` prop just like the text from the `ErrorMessage` component. The only difference here is that because we're not passing a string prop, it needs to be inside `{ }` instead of `" "` (this applies for all non-string props).

A single component can take as many props as you want to give it, however just like arguments into functions it's a good idea to limit this number, as more props makes for a more confusing component.

### Try it out

```html
<div id="root"></div><script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script><script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script type="jsx">
    function MyButton({handleClick}) {  // here we're destructuring the props object
        return (
            <button onClick={handleClick}>
                click me
            </button>
        )
    }

    function ErrorMessage(props){
        return (
            <div className="error">{props.text}</div>
        )
    }

    function App(){
        return (
            <div>
                <ErrorMessage text="The username or password is invalid" />
                <MyButton handleClick={() => console.log('you clicked')} />
            </div>
        )
    }

    ReactDOM.render(<App />,document.getElementById('root'));
</script>
```
@codepen

## Exercise

Let's use our props knowledge to make the components in our tic-tac-toe app more re-usable.

Run the app locally with `npm start` and choose the `Props` exercise. Now head over to `src/exercises/4 - Props/components`. These are the files you'll be editing.

### The problem

In this section we will:
   - Modify the `Square` component so that accepts two props
      -  `onClick` - a callback which is executed when the user click on it
      -  `symbol` - a string indicating what symbol is in the square (X, O or nothing)
   -  Modify the `Board` component so it renders out all 9 squares given to it by it's `baord` props (`board` is an array of strings)
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
