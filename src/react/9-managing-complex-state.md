@page learn-react/managing-complex-state Managing Complex State
@parent learn-react 9

@description Manage component and application state with hooks.

@body

## What is state?

In React, `props` are the "arguments" that are passed to our component. Alternatively, `state` can be conceptualized as the "internal variables" of our function. But what makes `state` different from normal internal variables? `state` is given superpowers! Anytime `state` is changed (similarly with props), the component magically re-renders itself.

Use `state` for internal variables, which when changed, should re-render the component. Examples include the value of a text box, whether or not a modal is open, and the current tab selection.

Using functional components, the `useState()` hook provides a value and setter capable of holding any data type. This allows us to hold simple variables such as:

```js
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(true);
```

In the example above, `count `starts at value 0 `setCount` is a function that allows us to update the count.
Similarly, `flag` takes on the starting value of `true`, but if we need to change that we must use the `setFlag` function.

`useState` can hold more complex data.

```js
const [ viewModel, setViewModel ] = useState({
    showModal: false,
    currentUser: {
        name: 'Mike Myers'
        id: 42
    },
    highlightItems: [1, 12, 15, 34, 66]
})
```

## Scope of State

`useState` is scoped to the component it is declared in. For example, this component stores a simple string `savedText` and displays its value as the user makes changes to a text input.

```jsx
import React, { useState } from 'react';

function DisplayComponent() {
  const [savedText, setSavedText] = useState('');

  function onSetText(event) {
    setSavedText(event.target.value);
  }

  return (
    <div>
      <h1>You entered: {savedText}</h1>
      <input type="text" value={savedText} onChange={onSetText} />
    </div>
  );
}
```

@highlight 4,6-8

Now imagine our layout requires a button to confirm the `savedText` change, but the button appears in a different part of the page! How will we modify the state in a different component?

Lucky for us, values and setters from `useState` are standard JavaScript variables and can be passed as `props`. We can create a `WrapperContainer` component to hold the state where both Display and Button components have access. _Consider the following structure:_

```jsx
function WrapperContainer() {
  //TODO: setup the state variables

  return (
    <div>
      <div className="layout-left">
        <DisplayComponent />
      </div>
      <div className="layout-right">
        <ButtonComponent />
      </div>
    </div>
  );
}

function DisplayComponent() {
  return (
    <div>
      <h1>You entered:</h1>
      <input type="text" />
    </div>
  );
}

function ButtonComponent() {
  return <button type="button">Set Message</button>;
}
```

@highlight 2,only

Let’s create two state items in the `WrapperContainer`.

- `savedText` as we defined in the earlier example will hold the set message.
- `unsavedText` will keep the inputs typed by the user until they are saved

Pass these and the `setUnsavedText` setter as `props` to the `DisplayComponent`.

```jsx
function WrapperContainer() {
  // define the savedText to be shown
  const [savedText, setSavedText] = useState('');
  // create a holder for unsaved text
  const [unsavedText, setUnsavedText] = useState('');

  return (
    <div>
      <div className="layout-left">
        <DisplayComponent
          unsavedText={unsavedText}
          setUnsavedText={setUnsavedText}
          savedText={savedText}
        />
      </div>
      <div className="layout-right">
        <ButtonComponent />
      </div>
    </div>
  );
}
```

@highlight 3,5,10-14

Using this data in the `DisplayComponent` is simple. Use the props to render the component and call `setUnsavedText` on changes.

```jsx
function DisplayComponent({ unsavedText, setUnsavedText, savedText }) {
  function onSetText(event) {
    //notice we use the passed in setter defined in the WrapperContainer
    setUnsavedText(event.target.value);
  }

  return (
    <div>
      <h1>You entered: {savedText}</h1>
      {/* Use unsavedText rather than savedText */}
      <input type="text" value={unsavedText} onChange={onSetText} />
    </div>
  );
}
```

@highlight 1,2-5,9,11

Next, let’s wire up that button. We’ll define an `onButtonClick` callback to handle changes to the state variables. Pass the callback down to `ButtonComponent`.

```jsx
function WrapperContainer() {
  // define the savedText to be shown
  const [savedText, setSavedText] = useState('');
  // create a holder for unsaved text
  const [unsavedText, setUnsavedText] = useState('');

  function onButtonClick() {
    // save the new savedText
    setSavedText(unsavedText);
    // reset the text input
    setUnsavedText('');
  }

  return (
    <div>
      <div className="layout-left">
        <DisplayComponent
          unsavedText={unsavedText}
          setUnsavedText={setUnsavedText}
          savedText={savedText}
        />
      </div>
      <div className="layout-right">
        <ButtonComponent onButtonClick={onButtonClick} />
      </div>
    </div>
  );
}
```

@highlight 7-12, 24

Lastly, update the `ButtonComponent` to use our new callback.

```jsx
function ButtonComponent({ onButtonClick }) {
  return (
    <button type="button" onClick={onButtonClick}>
      Set Message
    </button>
  );
}
```

@highlight 1,3

### Completed Example

<details>
<summary>Click to see the solution</summary>

```jsx
function WrapperContainer() {
  // define the savedText to be shown
  const [savedText, setSavedText] = React.useState('');
  // create a holder for unsaved text
  const [unsavedText, setUnsavedText] = React.useState('');

  function onButtonClick() {
    // save the new savedText
    setSavedText(unsavedText);
    // reset the text input
    setUnsavedText('');
  }

  return (
    <div>
      <div className="layout-left">
        <DisplayComponent
          unsavedText={unsavedText}
          setUnsavedText={setUnsavedText}
          savedText={savedText}
        />
      </div>
      <div className="layout-right">
        <ButtonComponent onButtonClick={onButtonClick} />
      </div>
    </div>
  );
}

function DisplayComponent({ unsavedText, setUnsavedText, savedText }) {
  function onSetText(event) {
    //notice we use the passed in setter defined in the WrapperContainer
    setUnsavedText(event.target.value);
  }

  return (
    <div>
      <h1>You entered: {savedText}</h1>
      {/* Use unsavedText rather than savedText */}
      <input type="text" value={unsavedText} onChange={onSetText} />
    </div>
  );
}

function ButtonComponent({ onButtonClick }) {
  return (
    <button type="button" onClick={onButtonClick}>
      Set Message
    </button>
  );
}

ReactDOM.render(<WrapperContainer />, document.getElementById('root'));
```

@codepen react
@highlight 2-5,7-12,17-21,24,30-34,38,40,47-49

</details>

## What data should be kept in React state?

There is no "right" answer for what data should be stored in state. Applications with simple API requirements may keep everything in state objects. Other apps may opt to store nearly everything in a separate global state management library such as Redux or Apollo.

The next lesson will discuss a purely React method of maintaining and exposing state accross your application.

## Next Steps

✏️ Head over to the [next lesson](context-hooks.html) to get a more detailed picture on how and when you can use context.
