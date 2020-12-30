@page learn-react/controlled-vs-uncontrolled Controlled vs Uncontrolled
@parent learn-react 7

@description Learn how to handle inputs in React and the difference between controlled and uncontrolled components.

@body

## Introduction

One of the biggest mindset shifts for new developers learning React is the concept of a controlled vs uncontrolled component. This is something that is particularly important when building input components (text, checkbox, radio, etc).

There are two types of input components we can create in React; controlled inputs and uncontrolled inputs.

An uncontrolled input is one where we're not explicitly setting the value attribute. When a value attribute is not explicitly set, the input is ultimately controlled by the browser, and thus, out of the control of the React developer:

```jsx
// Uncontrolled
function SearchBar() {
  return <input type="text" />;
}

ReactDOM.render(<SearchBar />, document.getElementById('root'));
```

@highlight 3
@codepen react

The `SearchBar` above is considered uncontrolled because we're not explicitly giving it a value. The value of the input is now entirely determined by the browser & the user. We as developers have no say.

While this isn't necessarily a bad thing, it does make our lives as React developers more difficult. The reason being, at any given point in the lifecycle of this component, we don't know what the value of the input is. Assuming we'll want to use the value at some point, this becomes a problem. How do we access the input's value?

We can solve this problem by <b>explicitly</b> controlling the input (giving it a value).

```jsx
// Controlled (sort of)
function SearchBar() {
  return <input type="text" value="hello" />;
}

ReactDOM.render(<SearchBar />, document.getElementById('root'));
```

@highlight 3
@codepen react

The component above is now considered to be "controlled", at any given point we always know what the value is (`hello`), and we've taken control away from the browser.

Obviously this isn't a great solution though because the value will always be "hello". We can remedy this by involving state:

```jsx
// Controlled (with state)
function SearchBar() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

ReactDOM.render(<SearchBar />, document.getElementById('root'));
```

@highlight 2,8,9
@codepen react

We'll create a piece of state called `inputValue`, use that as the value of the input, and update it whenever the input changes.

The process outlined above is how most controlled inputs are structured. Whether it's a textbox, a color picker or a checkbox, we can use this same stateful strategy to construct it. By storing the value in state, we always have access to it, and we can even control what the value ends up being.

We can take this a step further, by controlling the component with props:

```jsx
// Controlled (with props)
function SearchBar({ inputValue, onInputValueChange }) {
  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => onInputValueChange(e.target.value)}
    />
  );
}

function SmartParentComponent() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <SearchBar
      inputValue={inputValue}
      onInputValueChange={(newValue) => setInputValue(newValue)}
    />
  );
}

ReactDOM.render(<SmartParentComponent />, document.getElementById('root'));
```

@highlight 2,6,7,13,17,18
@codepen react

Above we've defined both components, `SmartParentComponent` and `SearchBar`. The `SearchBar` component accepts two props: one for the value of the input, and another for updating the value of the input. Notice that there is no state here. This is a stateless (i.e. controlled) component.

The `SmartParentComponent` does have state however, it is keeping track of the input value and how to set the input value. These are then passed down into the `SearchBar` component, and used to control it.

This is another very common pattern. The idea is that we have a very simple, lightweight `SearchBar` component, which has no concept of state. Instead it is entirely controlled by props passed down from a smart, stateful parent.

## Exercise

Let's use our knowledge of controlled and uncontrolled components to build an input component! (Note: this will not be apart of the Tic-Tac-Toe game.)

### The problem

✏️ You'll be modifying the `Search` component so that it is a controlled input. Specifically, try your hand at the following:

- Modify the `Search` component below so that it's value is controlled by state.
- Modify the clear button so that, when clicked, it clears out the value of the input.
- Make it so that the clear button is only visible when there is text in the input.

```jsx
let searchContainer = {
  display: 'flex',
  width: '500px',
  border: '1px solid black',
  marginTop: '25px',
  height: '40px',
  fontSize: '2em',
  padding: '10px',
};

let search = {
  border: 0,
  outline: 'none',
  width: '100%',
  paddingRight: '10px',
  fontSize: '1em',
};

let clear = {
  marginRight: '10px',
  fontSize: '1em',
  cursor: 'pointer',
};

function Search() {
  return (
    <div style={searchContainer}>
      <input style={search} />
      <div style={clear}>X</div>
    </div>
  );
}

ReactDOM.render(<Search />, document.getElementById('root'));
```

@codepen react

### The solution

#### Search

```jsx
let searchContainer = {
  display: 'flex',
  width: '100%',
  border: '1px solid black',
  marginTop: '25px',
  height: '40px',
  fontSize: '2em',
  padding: '10px',
};

let search = {
  border: 0,
  outline: 'none',
  width: '100%',
  paddingRight: '10px',
  fontSize: '1em',
};

let clear = {
  marginRight: '10px',
  fontSize: '1em',
  cursor: 'pointer',
};

function Search() {
  const [value, setValue] = React.useState('');

  return (
    <div style={searchContainer}>
      <input
        style={search}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <div style={clear} onClick={() => setValue('')}>
          X
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<Search />, document.getElementById('root'));
```

@codepen react
@highlight 26,32,33,35,36,only

> A quick note on syntax like
>
> ```jsx
> {
>   value && (
>     <div style={clear} onClick={() => setValue('')}>
>       X
>     </div>
>   );
> }
> ```
>
> Because HTML simply gets converted to a `React.createElement` call, you can use javascript "short-circuiting" to conditionally render HTML. Consider the expression.
>
> ```jsx
> isBool && React.createElement('h1', null, 'Hello World');
> ```
>
> If `isBool` is true, then it will return the `React.createElement` expression, if `isBool` is false, then this whole expression will return `false` which `React` will ignore when putting elements into the DOM. In this way, it becomes a convenient shorthand for conditionally rendering HTML.

## Next Steps

✏️ Head over to the [next lesson](optimization-hooks.html) to get performance advice on how to speed up components.
