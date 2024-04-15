@page learn-react/controlled-vs-uncontrolled Handling User Inputs and Forms
@parent learn-react 11
@outline 3

@description Use forms and inputs to collect information.

@body

## Overview

In this section, we will:

- Learn about controlled vs. uncontrolled inputs
- Work with change events
- Use TypeScript’s `Record` interface
- Set state using an updater function
- Updating reference types and rendering
- Learn about the `useId()` Hook

## Objective 1: Add checkboxes to order menu items

Now that we have our `RestaurantOrder` page, let’s start building the form for placing an order!

We’ll start with checkboxes to select menu items, with a message that warns users when no items are selected and a total that shows the sum of the selected items.

### Controlled vs. uncontrolled inputs

React has special handling for `<input>` components that allow developers to create “controlled” or “uncontrolled” inputs. An input is **uncontrolled** when its `value` (or `checked`) prop is not set, and it does not have a handler set for the `onChange` prop; an initial value may be set using the `defaultValue` prop.

An input is **controlled** when both its `value` (or `checked`) and `onChange` props have values set. The term “controlled” refers to the fact that the value of the input is controlled by React. Most of the time, we want our `<input>` components to be controlled with their value stored in a state variable.

**Note:** If an `<input>` only has the `value` or `onChange` prop set, React will log a warning to the console in development mode.

Let’s take a look at an example of a controlled input:

@sourceref ./controlled.tsx
@highlight 6-10, only

Controlled components aren’t allowed to have a value of `null` or `undefined`. To set an input with “no value,” use an empty string: `""`.

### Working with change events

In the previous example, the `<input>` prop `onChange` had its value set to a function known as an “event handler.”

@sourceref ./controlled.tsx
@highlight 7-8, only

When an event occurs, such as a user typing in an input field, an `event` object is passed to the event handler function. This event object contains various properties and methods that provide information about the event.

One such property is `target`, which is a reference to the DOM element that triggered the event. In the case of an input field, target would refer to the specific `<input>` element where the user is typing.

The property `event.target.value` is particularly important when dealing with input fields. The value property here holds the current content of the input field. It represents what the user has entered or selected. When you access `event.target.value` in your event handler function, you’re essentially retrieving the latest input provided by the user. This is commonly used to update the state of the component with the new input value, ensuring that the component’s state is in sync with what the user is entering.

For most input types, you’ll want to use `event.target.value` to get the value entered. But there are exceptions! For `<input type="checkbox">`, you’ll want to use `event.target.checked` instead:

```tsx
import { useState } from "react"

const TodoItem: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState(false)
  return (
    <label>
      <input
        checked={isCompleted}
        onChange={(event) => setIsCompleted(event.target.checked)}
        type="checkbox"
      />
      Completed
    </label>
  )
}
```

@highlight 7-8, only

### Using TypeScript’s `Record` interface

In our upcoming exercise, we want to store information in a JavaScript object. We also want to use TypeScript so we can constrain the types used as keys and values.

TypeScript provides a handy interface named `Record` that we can use. `Record` is a generic interface that requires two types: the first is the type of the keys, and the second is the type of the values.

For example, if we’re recording the items in a list that are selected, we might capture the item’s name and whether or not it’s selected like this:

@sourceref ./typescript-record-interface.tsx
@highlight 9, 12, only

We’ve explicitly defined the type of `useState` as a `Record<string, boolean>`; all the keys must be strings, and all the values must be booleans. Fortunately, JavaScript’s `object` implements the `Record` interface, so we can set the default value to an empty `object` instance. Now let’s see how we can use a `Record` to store state data.

### Setting state using an updater function

One challenge we face when using an `object` for state is that we probably need to merge the current state value with the new state value. Why? Imagine we have a state object that already has multiple keys and values, and we need to add a new key and value.

Well, we’re in luck! React already has a solution for this: the setter function returned by `useState` will accept an “updater function” that’s passed the “current” state value and should return the “next” state value.

@sourceref ./set-state-with-function.tsx
@highlight 14-15, 26, 39, only

In the example above, the `onChange` event handler calls `handleSelectedChange`, which accepts a name `string` and a `boolean`.

In turn, `handleSelectedChange` calls `setSelected` with an updater function as the argument. The updater function accepts the `currentSelectedItems` argument, which is the object with the currently-selected items _before_ our checkbox was checked.

We will dig into _how_ we create the `updatedSelectedItems` object in just a bit, but for now let’s take note that we create a new `updatedSelectedItems` object and return it from our updater function. This gives React the updated `selected` state and allows React to re-render the component.

### Updating reference types and rendering

Now let’s explain how the updater function works in the example above. The updater function **does not mutate** the current object, then return it; instead, it makes a new object and populates it with the contents of the current object.

This is an important detail because, after the updater function runs, React will compare the values of the current and next objects to determine if they are different. If they are **different**, React will re-render the `Selected` component; if they are the same, then React will do nothing.

The same rules apply when state is an array: create a new array, then update the contents of the new array.

```tsx
// Adding an item when state (`current`) is an array.
setSelectedOrders((current) => {
  const next = [...current, newOrder]
  return next
})

// Replacing an item when state (`current`) is an array.
setUpdatedRestaurant((current) => {
  const next = [
    ...current.filter((item) => item.id !== updatedRestaurant.id),
    updatedRestaurant,
  ]
  return next
})
```

OK, that was a lot. Let’s start making some code changes so we can select menu items for an order.

### Setup 1

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx only

### Verify 1

These tests will pass when the solution has been implemented properly.

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.test.tsx** to be:

@diff ../../../exercises/react-vite/10-nested-routes/02-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx only

### Exercise 1

- Call `useState()` and use the `OrderItems` interface to create an `items` state.
- Create a function for calling `setItems()` with the updated `items` state.
- Add the `checked` and `onChange` props to all the checkboxes.
- Update `subtotal` to use the `calculateTotal()` helper function.

Hint: The `items` state will look like this when populated:

```tsx
const items = {
  "Menu item 1 name": 1.23, // Menu item 1 price
  "Menu item 2 name": 4.56, // Menu item 2 price
}
```

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/01-problem?file=src/pages/RestaurantOrder/RestaurantOrder.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/01-problem?file=src/pages/RestaurantOrder/RestaurantOrder.tsx) to do this exercise in an online code editor.

### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/01-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/01-solution?file=src/pages/RestaurantOrder/RestaurantOrder.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/01-solution?file=src/pages/RestaurantOrder/RestaurantOrder.tsx).

</details>

## Objective 2: Create a reusable text field component

The order form is going to be made up of many input fields with labels. Rather than repeat multiple input components over and over, let’s compose that structure in a single component named `FormTextField`. Creating this component will involve using some of what we’ve learned from prior lessons.

### The `useId()` Hook

Since the value of every `id` attribute in an HTML document must be unique, this Hook is useful in creating a unique identifier string that can be used as the value for an `id` prop.

Let’s say you’re rendering a component that has a `label` that needs to be associated with an `input`:

```html
<label for="name"> Name </label> <input id="name" type="text" />
```

@highlight 1, 4

Every ID has to be unique in an HTML page, but `name` might clash with another element in a page. To avoid this issue in React, we can get a unique ID with `useId()`:

```tsx
import { useId } from "react"

const Form: React.FC = () => {
  const id = useId()

  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </>
  )
}
```

@highlight 1, 4, 7, 10

The value of `useId` is guaranteed to be unique within the component where it is used; this ideal for linking related components together.

### Setup 2

✏️ Create **src/components/FormTextField/FormTextField.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-problem/src/components/FormTextField/FormTextField.tsx

✏️ Create **src/components/FormTextField/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-problem/src/components/FormTextField/index.ts

### Verify 2

These tests will pass when the solution has been implemented properly.

✏️ Create **src/components/FormTextField/FormTextField.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-problem/src/components/FormTextField/FormTextField.test.tsx
@highlight 10-39, only

### Exercise 2

Let’s implement our `FormTextField` component and have it:

- Accept `label`, `onChange`, `type`, and `value` props
- Create a unique ID with `useId()`
- Associate the `<label>` and `<input>` elements with `htmlFor` and `id` props
- Add the `onChange`, `type`, and `value` props to the `<input>` element

Hint: The `onChange` prop type can be defined as `(data: string) => void`

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/02-problem?file=src/components/FormTextField/FormTextField.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/02-problem?file=src/components/FormTextField/FormTextField.tsx) to do this exercise in an online code editor.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/components/FormTextField/FormTextField.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-problem/src/components/FormTextField/FormTextField.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/components/FormTextField/FormTextField.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/02-solution?file=src/components/FormTextField/FormTextField.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/02-solution?file=src/components/FormTextField/FormTextField.tsx).

</details>

## Objective 3: Integrate `FormTextField` into `RestaurantOrder`

Finally we’ll update the form to incorporate the `FormTextField` component so users can create and submit an order to the restaurant. We need to fill the form with input fields and handle the submit button.

### Setup 3

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx only

### Verify 3

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.test.tsx.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/02-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-solution/src/pages/RestaurantOrder/RestaurantOrder.test.tsx only

### Exercise 3

- Create state variables and setters for `address`, `name`, and `phone`.
- Use `<FormTextField>` to create input fields for these three state variables.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/03-problem?file=src/pages/RestaurantOrder/RestaurantOrder.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/03-problem?file=src/pages/RestaurantOrder/RestaurantOrder.tsx) to do this exercise in an online code editor.

### Solution 3

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/pages/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-problem/src/pages/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-solution/src/pages/RestaurantOrder/RestaurantOrder.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/03-solution?file=src/pages/RestaurantOrder/RestaurantOrder.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/11-controlled-vs-uncontrolled/03-solution?file=src/pages/RestaurantOrder/RestaurantOrder.tsx).

</details>

## Next steps

Next, let’s learn how to [write tests with React Testing Library](./testing.html).
