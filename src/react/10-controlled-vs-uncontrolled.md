@page learn-react/controlled-vs-uncontrolled-components Controlled vs Uncontrolled Components
@parent learn-react 10

@description Learn how to handle inputs in React and the difference between controlled and uncontrolled components.

@body

# Controlled vs Uncontrolled Components!

```jsx  title="Inputs in React can be either controlled or uncontrolled" subtitle="Uncontrolled inputs are ones that don't explicitly define a value"
// Uncontrolled
function SearchBar() {
  return <input type="text" />;
}
```

```jsx  title="When we provide a value, we're controlling the input" subtitle="In this case, the user can't type anything"
// Controlled (sort of)
function SearchBar() {
  return <input type="text" value="hello" />;
}
```

```jsx  title="To allow the user to type we can use state" subtitle="The 'inputValue' in state, becomes the value of the input element"
// Controlled (with state)
import React, {useState}

function SearchBar() {
  const [inputValue, setInputValue] = useState("")
  return (
    <input
      type="text"
      value={inputValue}
    />
  )
}
```

```jsx  title="The state is updated when the text changes"
// Controlled (with state)
import React, {useState}

function SearchBar(){
  const [inputValue, setInputValue] = useState("")
  return (
    <input
      type="text"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  )
}
```

```jsx  title="This applies to all input types"
// Controlled (with state)
import React, {useState}

function SearchBar(){
  const [inputValue, setInputValue] = useState("")
  const [colorValue, setColorValue] = useState("")

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <input
        type="color"
        value={colorValue}
        onChange={e => setColorValueValue(e.target.value)}
      />
    </>
  )
}
```

```jsx 1:21 title="It's common to let a smart 'parent' component control the values"
// Controlled (with state)
import React, {useState}

function SearchBar({inputValue, onInputValueChange}){
  return (
    <input
      type="text"
      value={inputValue}
      onChange={e => onInputValueChange(e.target.value)}
    />
  )
}

function SmartParentComponent(){
  const [inputValue, setInputValue] = useState("")

  <SearchBar
    inputValue={inputValue}
    onInputValueChange={newValue => setInputValue(newValue)}
  />
}
```



## Exercise

Let's use our knowledge of controlled vs uncontrolled components to build an input component! (note this will not be apart of the tic-tac-toe game)

Run the app locally with `npm start` and choose the `Controlled vs Uncontrolled` exercise. Now head over to `src/exercises/a - Controlled vs Uncontrolled/components`. These are the files you'll be editing.

### The problem

You'll be modifying the `Search` component so that it is a controlled input. Specifically, try your hand at the following:

- Modify the `Search` component below so that it's value is controlled by state. 
- Modify the clear button so that, when clicked, it clears out the value of the input. 
- Make it so that the clear button is only visible when there is text in the input.

### The solution

#### Search

```jsx
import React, { useState } from 'react';

function Search() {
  const [value, setValue] = useState('');

  return (
    <div className="search-container">
      <input
        className="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <div className="clear" onClick={() => setValue('')}>
          X
        </div>
      )}
    </div>
  );
}

export default Search;
```
@highlight 4,10,11,13,14,only
