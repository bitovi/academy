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
- `Record` helper in TypeScript.
- Store form data as a `Record` in state.
- Update form data in state using an updater function.
- Always create a new value for arrays and objects in state (don’t update the arrays and values).

#### Controlled and uncontrolled inputs

React has special handling for `<input>` components that allow developers to create "controlled" or
"uncontrolled" inputs. An input is **uncontrolled** when its `value` — or `checked` — prop is not
set, and it does not have a handler set for the `onChange` prop; an initial value may be set using
the `defaultValue` prop.

An input is **controlled** when both its `value`, or `checked`, and `onChange` props have values
set; the term "controlled" refers to the fact that the value of the input is controlled by React.
Most of the time `<input>` components are controlled and their value is stored in a state variable.

> If an `<input>` only has the `value` or `onChange` prop set React will log a warning to the
> console in development mode.

```jsx
const ControlledInput: React.FC = () => {
  const [name, setName] = useState("");
  return (
    <label>Name: 
      <input onChange={(event) => setName(event.target.value)} value={name} />
    </label>
  )
}
```

Controlled components aren't allowed to have a value of `null` or `undefined`. To set an input with
"no value" use an empty string: `""`.

#### Working with events

In the previous example the input prop `onChange` had its value set to a function known as an "event
handler."

```jsx
onChange={(event) => setName(event.target.value)}
```

The `onChange` prop requires a function that implements the `ChangeEventHandler` interface. When an
event handler is called it receives an argument named "event" which is a `SyntheticEvent` defined by
React. While a `SyntheticEvent` is similar to a native DOM `Event`, and has many of the same
properties, they are not identical.

A `ChangeEvent` — derived from `SyntheticEvent` — is the event argument provided to a
`ChangeEventHandler`. A `ChangeEvent` always has a property named `target` which references the
component that emitted the event. As you can see above it's possible to get the `target`'s new value
using its `value` property.

#### TypeScript's `Record` interface

In our upcoming exercise we want to store information in a JavaScript object. We also want to use
TypeScript so we can constrain the types used as keys and values. TypeScript provides a handy
interface named `Record` which we can use. `Record` is a generic interface that requires two types:
the first is the type of the keys and the second is the type of the values. For example, if we're
recording class attendance we might capture the student's name and whether or not they attended in
state like this:

```jsx
const [attendance, setAttendance] = useState<Record<string, boolean>>({});
```

We've explicitly defined the type of `useState` as a `Record<string, boolean>`; all the keys must be
strings and all the values must be booleans. Fortunately JavaScript's `object` implements the
`Record` interface so we can set the default value to an empty `object` instance. Now let's see how
we can use a `Record` to store state data.

#### Set state using a function

One challenge we face when using an `object` for state is that we probably need to merge the current
state value with the new state value. Why? Imagine we have a state object that already has multiple
keys and values, and we need to add a new key and value. Well, we're in luck! React already has a
solution for this: the set function returned by `useState` will accept a function, called an
**updater function** that's passed the "pending" state value and returns a "next" state value.

```jsx
const [value, setValue] = useState<Record<string, boolean>>({});
setValue((pending) => { /* Do something with the pending state value and return a next state value. */ });
```

In the example below the `onChange` event handler calls `handleAttendanceChange` which accepts a
name string and a boolean. In turn `handleAttendanceChange` calls `setAttendance` with an updater
function as its argument. In the updater function the contents of the next state object are
initially set by spreading the contents of the pending state object. Then the value provided by the
input is set on the next state value object.

```jsx
const Attendance: React.FC = () => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  function handleAttendanceChange(name: string, value: string | boolean){
    setAttendance((current) => {
      return {
        ...current,
        [name]: value
      }
    })
  }

  return (
    <form>
      {
        studentNames.map((studentName) => {
          return (
            <label>{studentName}:
              <input
                onChange={(event) => handleAttendanceChange(studentName, event.target.checked)}
                value={attendance[studentName]}
                type="checkbox"
              />
            </label>
          )
        })
      }
    </form>
  )
}
```

TODO: DO NOT MUTATE PENDING STATE!!!

### Setup

TODO

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
