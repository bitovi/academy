@page learn-react/manage-state Managing State
@parent learn-react 11

@description Manage component and application state with hooks

@body

## What is state? ##

In React, `state` is any data determining the presention of your components. The value of a text box, whether or not a modal is open, and what page the app is currently showing are all potential examples of state.

Using functional components, the `useState()` hook provides a value and setter capable of holding any native data type. This allows us to hold simple variables such as:

```
const [ count, setCount ] = useState(0)
const [ flag, setFlag ] = useState(true)
```

And even hold more complex data.

```
const [ viewModel, setViewModel ] = useState(
    {
        showModal: false,
        currentUser: {
            name: 'Mike Myers'
            id: 42
        },
        highlightItems: [1, 12, 15, 34, 66]
    }
)
```

**Important:** When using objects or arrays, you must provide a new merged state when using the setter. `useState` is immutable and will always replace any internal state.

*For class based components see [this.setState()](https://reactjs.org/docs/state-and-lifecycle.html)*

## Scope of State ##

`useState` is scoped to the component it is declared in. For example, this simple component stores a simple string `displayText` and diplays its value as the user makes changes to a text input.

```
import React, { useState } from 'react'

function DisplayComponent() {
    const [ displayText, setDisplayText ] = useState('')

    function onSetText(event) {
        setDisplayText(event.target.value)
    }

    return (
        <div>
            <h1>You entered: {displayText}</h1>
            <input type="text" value={displayText} onChange={onSetText}/>
        </div>
    )
}
```

Now imagine our layout requires a button to confirm the `displayText` change, but the button appears in a different part of the page! How will we modify the state in a different component?

Lucky for us, values and setters from `useState` are standard javascript variables and can be passed as `props`. We can create a 'Container' component to hold the state where both Display and Button components have access. *Consider the following structure:*

```
function WrapperContainer() {
    //TODO: setup the state variables
    return (
        <div>
            <div className="layout-left">
                <DisplayComponent/>
            </div>
            <div className="layout-right">
                <ButtonComponent/>
            </div>
        </div>
    )
}

function DisplayComponent(props) {
    return (
        <div>
            <h1>You entered:</h1>
            <input type="text"/>
        </div>
    )
}

function ButtonComponent(props) {
    return (
        <button type="button">
            Set Message
        </button>
    )
}
```

Let's create two state items in the `WrapperContaner`. 

 - `displayText` as we defined in the earlier example will hold the set message.
 - `heldText` will keep the inputs typed by the user until they are saved

Pass these and the `setHeldText` setter as `props` to the `DisplayComponent`. 

```
function WrapperContainer() {
    // define the displayText to be shown
    const [ displayText, setDisplayText ] = useState('')
    // create a holder for unsaved text
    const [ heldText, setHeldText ] = useState('')

    return (
        <div>
            <div className="layout-left">
                <DisplayComponent 
                    heldText={heldText} 
                    setHeldText={setHeldText}
                    displayText={displayText}/>
            </div>
            <div className="layout-right">
                <ButtonComponent/>
            </div>
        </div>
    )
}
```

Using this data in the `DisplayComponent` is simple. Deconstruct the state variables from `props` and update the component to call `setHeldText` on changes. 

```
function DisplayComponent(props) {
    const { heldText, setHeldText, displayText } = props

    function onSetText(event) {
        //notice we use the passed in setter defined in the WrapperContainer
        setHeldText(event.target.value)
    }

    return (
        <div>
            <h1>You entered: {displayText}</h1>
            {/* Use heldText rather than displayText */}
            <input type="text" value={heldText} onChange={onSetText}/>
        </div>
    )
}
```

Next, let's wire up that button. We'll define a `onButtonClick` callback to handle changes to the state variables. Pass the callback down to `ButtonComponent`.

```
function WrapperContainer() {
    const [ displayText, setDisplayText ] = useState('')
    const [ heldText, setHeldText ] = useState('')

    function onButtonClick() {
        // save the new displayText
        setDisplayText(heldText)
        // reset the text input
        setHeldText('')
    }

    return (
        <div>
            <div className="layout-left">
                <DisplayComponent 
                    heldText={heldText} 
                    setHeldText={setHeldText}
                    displayText={displayText}/>
            </div>
            <div className="layout-right">
                <ButtonComponent onButtonClick={onButtonClick}/>
            </div>
        </div>
    )
}
```

Lastly, update the `ButtonComponent` to use our new callback.

```
function ButtonComponent(props) {
    const { onButtonClick } = props
    return (
        <button type="button" onClick={onButtonClick}>
            Set Message
        </button>
    )
}
```


### Completed Example ###
```
import React, { useState } from 'react'

function WrapperContainer() {
    // define the displayText to be shown
    const [ displayText, setDisplayText ] = useState('')
    // create a holder for unsaved text
    const [ heldText, setHeldText ] = useState('')

    function onButtonClick() {
        // save the new displayText
        setDisplayText(heldText)
        // reset the text input
        setHeldText('')
    }

    return (
        <div>
            <div className="layout-left">
                <DisplayComponent 
                    heldText={heldText} 
                    setHeldText={setHeldText}
                    displayText={displayText}/>
            </div>
            <div className="layout-right">
                <ButtonComponent onButtonClick={onButtonClick}/>
            </div>
        </div>
    )
}

function DisplayComponent(props) {
    const { heldText, setHeldText, displayText } = props

    function onSetText(event) {
        //notice we use the passed in setter defined in the WrapperContainer
        setHeldText(event.target.value)
    }

    return (
        <div>
            <h1>You entered: {displayText}</h1>
            {/* Use heldText rather than displayText */}
            <input type="text" value={heldText} onChange={onSetText}/>
        </div>
    )
}

function ButtonComponent(props) {
    const { onButtonClick } = props
    return (
        <button type="button" onClick={onButtonClick}>
            Set Message
        </button>
    )
}


```

## What data should be kept in React state? ##

There is no "right" answer for what data should be stored in state. Applications with simple API requirements may keep everything in state objects. Other apps may opt to store nearly everything in a seperate global state managment library. 

Talk about managing network requests


## State or Context? ##


## External State Libraries ##

You don't need Redux. 

Apollo and Relay are cool if you have a graph. 

Talk about how Context can solve much of this problem.