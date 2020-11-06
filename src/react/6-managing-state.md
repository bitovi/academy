@page learn-react/manage-state Managing State
@parent learn-react 11

@description Manage component and application state with hooks

@body

## What is state?

In React, `state` is any data determining the presentation of your components. The value of a text box, whether or not a modal is open, and what page the app is currently showing are all potential examples of state.

Using functional components, the `useState()` hook provides a value and setter capable of holding any data type. (We will explain hooks in more detail in the coming lessons. For now, don't worry about what exactly a hook is.) This allows us to hold simple variables such as:

```js
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(true);
```

And even hold more complex data.

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

**Important:** When using objects or arrays, you must provide a new merged state when using the setter. The data created by `useState` is immutable and will always replace any internal state.

_For class based components see [this.setState()](https://reactjs.org/docs/state-and-lifecycle.html)_

## Scope of State

`useState` is scoped to the component it is declared in. For example, this simple component stores a simple string `savedText` and displays its value as the user makes changes to a text input.

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

Now imagine our layout requires a button to confirm the `savedText` change, but the button appears in a different part of the page! How will we modify the state in a different component?

Lucky for us, values and setters from `useState` are standard JavaScript variables and can be passed as `props`. We can create a 'Container' component to hold the state where both Display and Button components have access. _Consider the following structure:_

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

Let's create two state items in the `WrapperContaner`.

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

Using this data in the `DisplayComponent` is simple. Deconstruct the state variables from `props` and update the component to call `setUnsavedText` on changes.

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

Next, let's wire up that button. We'll define a `onButtonClick` callback to handle changes to the state variables. Pass the callback down to `ButtonComponent`.

```jsx
function WrapperContainer() {
  const [savedText, setSavedText] = useState('');
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

### Completed Example

```jsx
import React, { useState } from 'react';

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
```

## What data should be kept in React state?

There is no "right" answer for what data should be stored in state. Applications with simple API requirements may keep everything in state objects. Other apps may opt to store nearly everything in a separate global state management library.

Talk about managing network requests

## State or Context?

## External State Libraries

You don't need Redux.

Apollo and Relay are cool if you have a graph.

Talk about how Context can solve much of this problem.
