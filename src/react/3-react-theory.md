@page learn-react/react-theory React Theory
@parent learn-react 3

@description Learn how React's rendering system works and the different types of components.

@body

## The problem


```jsx title="JSX can be put into components for reusability" subtitle="MyButton could now be re-used"
  import React from 'react'

  function MyButton(){
    return (
      <div className="button primary">
          <button>click me</button>
      </div>
    )
  }

  function App(){
    return (
      <MyButton />
      <MyButton />
      <MyButton />
    )
  }
```

```jsx title="JSX can be put into components for reusability" subtitle="You can even pass it data (props)"
  import React from 'react'

  function MyButton(props){
    return (
      <div className="button primary">
          <button>{props.text}</button>
      </div>
    )
  }

  function App(){
    return (
      <MyButton text="click me"/>
      <MyButton text="submit"/>
      <MyButton text="delete"/>
    )
  }
```

```jsx title="Often times components are packaged up into modules" subtitle="MyButton.js"
import React from 'react';

function MyButton(props) {
  return (
    <div className="button primary">
      <button>{props.text}</button>
    </div>
  );
}

export default MyButton;
```

```jsxx title="And then imported somewhere else" subtitle="App.jsx"
  import React from 'react'
  import MyButton from './MyButton'

  function App(){
    return (
      <MyButton text="click me"/>
      <MyButton text="submit"/>
      <MyButton text="delete"/>
    )
  }

  export default App
```







React is most commonly used in combination with JSX (JavaScript + HTML). JSX is a "Syntactic Sugar", basically a syntax for describing HTML like views in JavaScript. 


## How to solve this problem


## What you need to know


## The solution
