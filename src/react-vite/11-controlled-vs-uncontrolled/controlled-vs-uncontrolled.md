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
- Form input events have a `target` property with current form values.
- Store form data as an object in state.
- Update form data in state using the setState callback signature.
- Always create a new value for arrays and objects in state (don’t update the arrays and values).
- `Record` helper in TypeScript.

#### Controlled and uncontrolled inputs

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
      <input onChange={(event) => setName(event.target.value)} type="text" value={name} />
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
        <input onChange={(event) => setData("first", event.target.value)} value={formData.first} />
      </label>
      <label>Last Name:
        <input onChange={(event) => setData("last", event.target.value)} value={formData.last} />
      </label>
    </form>
  )
}
```

TODO

### Setup

TODO

✏️ Create **src/services/order/interfaces.ts** and update it to be:

@sourceref ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-solution/src/services/order/interfaces.ts
@highlight 1-14

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx only

### Verify

TODO

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.test.tsx.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx only

### Exercise

TODO

- Add `newOrder` state so that when menu items are selected, the state will look like:

```
{
  items: {
    "Menu item 1 name": 1.23,// Menu item 1 price
    "Menu item 2 name": 4.56,// Menu item 2 price
  }
}
```

- Add the `onChange` listener to all the checkboxes.

- Add the `checked` prop to all the checkboxes.

- Update `subtotal` to use the `calculateTotal` helper function.

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx only

</details>

## Objective 2: Create a reusable text field component

TODO

### Key concepts

- Custom input components and onChange function props.

TODO: I think most of this exercise is stuff they’ve already done and not anything new? Maybe we just need reminders here, or not? I can figure this out when making the slides.

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

✏️ Create **src/components/FormTextField/FormTextField.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-problem/src/components/FormTextField/FormTextField.tsx
@highlight 1-9

✏️ Create **src/components/FormTextField/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/components/FormTextField/index.ts
@highlight 1

### Verify

TODO

✏️ Create **src/components/FormTextField/FormTextField.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/components/FormTextField/FormTextField.test.tsx
@highlight 10-39, only

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/components/FormTextField/FormTextField.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-problem/src/components/FormTextField/FormTextField.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/components/FormTextField/FormTextField.tsx only

</details>

## Objective 3: Integrate `FormTextField` into `RestaurantOrder` and submit the form

TODO

### Key concepts

TODO

- Form submission: submit button, onSubmit handler, and managing the submit
  event.
- `[key]: value` syntax to make reusable setter functions.

TODO: I’m not sure whether the submit button should be a part of the exercise. Maybe? For now I’d like to have the content to cover it, then figure out if we actually want it in the exercise after we see how it looks.

#### Concept 1

TODO

#### Concept 2

TODO

### Setup

TODO

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx only

### Verify

TODO

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.test.tsx.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx only

### Exercise

TODO

### Solution

<details>
<summary>Click to see the solution</summary>

TODO

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx only

</details>

## Next steps

TODO