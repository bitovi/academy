@page learn-react-vite/controlled-vs-uncontrolled Handling User Inputs and Forms
@parent learn-react-vite 11
@outline 3

@description Use forms and inputs to collect information.

@body

## Overview

## Objective 1: Add a form with controlled checkboxes

TODO

### Key concepts

- A controlled input requires value (checked) and onChange props.
- Update form data in state using the setState callback signature.

#### Controlled / uncontrolled inputs

React has special handling for `<input>` components that allow developers to
create "controlled" or "uncontrolled" inputs. An input is uncontrolled when its
`value` — or `checked` — prop is **not** set, and it does not have a handler set
for the `onChange` prop; an initial value may be set using the `defaultValue`
prop.

An input is controlled when both its `value`, or `checked`, and `onChange` props
have values set; the term controlled refers to the fact that the value of the
input is controlled by React. Most of the time `<input>` components are
controlled and their value is stored in a state variable. 

> If an `<input>` only has the `value` or `onChange` prop set React will log a
> warning to the console in development mode.

```jsx
const FancyInput: React.FC = () => {
  const [name, setName] = useState("")
  return (
    <label>Name: 
      <input onChange={(evt) => setName(evt.target.value)} type="text" value={name} />
    </label>
  )
}
```

Controlled components aren't allowed to have a value of `null` or `undefined`.
To set an input with "no value" use an empty string: `""`.

#### Set state using a function

We're adding a form to our application to capture a user's order. As the user
makes changes we want to store them in state to work with later on. The values
of each input will be stored as properties on an object. In the following
example the values from two different inputs are stored in a single state value.

Each input's onChange prop invokes a the `setData` function that accepts a
property name and a property value as parameters, these parameters will be used
to update the state object.

In the example below the `setData` function invokes `setFormData` with a
callback function as its argument. `setFormData` is the setter returned by
`useState`, all setters have a signature that allows a callback function to be
passed as its argument. The callback function has one parameter which is the
current value of state (named `current` in the example). Inside the callback a
new object is returned, this will be the new value of state; the contents of the
new state object are initially set by spreading the contents of the current
state object. Then the new value provided by an input is set on the new state
value object.

Properties on the `formData` state value are used to set the value for each
input in the form.

```jsx
const MyForm: React.FC = () => {
  const [formData, setFormData] = useState({first: "", last: ""});

  function setData(name: string, value: string){
    setFormData((current) => {
      return {
        ...current,
        [name]: value
      }
    })
  }

return (
    <form>
      <label>First Name:
        <input onChange={(evt) => setData("first", evt.target.value)} value={formData.first} />
      </label>
      <label>Last Name:
        <input onChange={(evt) => setData("last", evt.target.value)} value={formData.last} />
      </label>
    </form>
  )
}
```

TODO

### Setup

TODO

### Verify

TODO

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

</details>

## Objective 2: Submit the form and create custom input components

TODO

### Key concepts

- Form submission: submit button, onSubmit handler, and managing the submit
  event.
- Custom input components and onChange function props.

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

### Verify

TODO

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

</details>
