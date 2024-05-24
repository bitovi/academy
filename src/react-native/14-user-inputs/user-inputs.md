@page learn-react-native/user-inputs Handling User Inputs
@parent learn-react-native 14
@outline 3

@description Use switch controls and inputs to collect information.

@body

## Overview

In this section, you will:

- Handle checkbox-like behavior with `<Switch>`.
- Use TypeScript’s `Record` interface.
- Set state using an updater function.
- Update reference types and rendering.
- Use the `TextInput` component.
- Label text inputs.
- Create unique IDs with the `useId()` Hook.

## Objective 1: Add switch controls to select menu items

Now let’s create a `RestaurantOrder` view for users to start selecting menu items!

We’ll start with switch controls to select menu items, with a message that warns users when no items are selected and a total that shows the sum of the selected items.

<div style="display: flex; flex-direction: row; gap: 2rem">
  <img alt="Screenshot of the top of the application restaurant order page." src="../static/img/react-native/14-user-input/01-solution-top.png" style="max-height: 640px; border: 4px solid black; border-radius: 25px;"/>
  <img alt="Screenshot of the bottom of the application restaurant order page." src="../static/img/react-native/14-user-input/01-solution-bottom.png" style="max-height: 640px; border: 4px solid black; border-radius: 25px;"/>
</div>

### Handling checkbox-like behavior with `<Switch>`

For boolean values, such as toggles, React Native provides the `Switch` component.
You handle changes using the `onValueChange` prop, which directly provides the new boolean value.

[If you’re familiar with web development, React Native does not have a direct equivalent to the HTML `<input type="checkbox">`.
Instead, you use the `<Switch>` component to achieve similar functionality.]

Let’s take a look at an example using `<Switch>`:

@sourceref ./switch.tsx
@highlight 5, 9-14, only

In the example above, you can see the `value` passed in is the `isEnabled` state.

Then, the `onValueChange` prop takes a function that will be called with the new value when the switch is toggled.
This is usually what you need, although there is an [`onChange`](https://reactnative.dev/docs/switch#onchange) prop if you need your function to be called with an event object instead.

### Using TypeScript’s `Record` interface

In our upcoming exercise, we want to store information in a JavaScript object.
We also want to use TypeScript so we can constrain the types used as keys and values.

TypeScript provides a handy interface named `Record` that we can use.
`Record` is a generic interface that requires two types: the first is the type of the keys, and the second is the type of the values.

For example, if we’re recording the items in a list that are selected, we might capture the item’s name and whether or not it’s selected like this:

@sourceref ./typescript-record-interface.tsx
@highlight 10, 13, only

We’ve explicitly defined the type of `useState` as a `Record<string, boolean>`; all the keys must be strings, and all the values must be booleans.
Fortunately, JavaScript’s `object` implements the `Record` interface, so we can set the default value to an empty `object` instance.

Now let’s see how we can use a `Record` to store state data.

### Setting state using an updater function

One challenge we face when using an `object` for state is that we probably need to merge the current state value with the new state value.
Why?
Imagine we have a state object that already has multiple keys and values, and we need to add a new key and value.

Well, we’re in luck!
React already has a solution for this: the setter function returned by `useState` will accept an “updater function” that’s passed the “current” state value and should return the “next” state value.

@sourceref ./set-state-with-function.tsx
@highlight 15-16, 27, 37, only

In the example above, the `onChange` event handler calls `handleSelectedChange`, which accepts a name `string` and a `boolean`.

In turn, `handleSelectedChange` calls `setSelected` with an updater function as the argument.
The updater function accepts the `currentSelectedItems` argument, which is the object with the currently-selected items _before_ our checkbox was checked.

We will dig into _how_ we create the `updatedSelectedItems` object in just a bit, but for now let’s take note that we create a new `updatedSelectedItems` object and return it from our updater function.
This gives React the updated `selected` state and allows React to re-render the component.

### Updating reference types and rendering

Now let’s explain how the updater function works in the example above. The updater function **does not mutate** the current object, then return it; instead, it makes a new object and populates it with the contents of the current object.

This is an important detail because, after the updater function runs, React will compare the values of the current and next objects to determine if they are different. If they are **different**, React will re-render the `Selected` component; if they are the same, then React will do nothing.

The same rules apply when state is an array: create a new array, then update the contents of the new array.

Here’s how to add an item when state (`current`) is an array:

```tsx
setSelectedOrders((current) => {
  const next = [...current, newOrder]
  return next
})
```

Here’s how to replace an item when state (`current`) is an array:

```tsx
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

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/13-http-requests/04-solution/src/App.tsx ../../../exercises/react-native/14-user-input/01-problem/src/App.tsx only

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/13-http-requests/04-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx only

✏️ Create **src/screens/RestaurantOrder/RestaurantOrder.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantOrder/RestaurantOrder.tsx

✏️ Create **src/screens/RestaurantOrder/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantOrder/index.ts

✏️ Create **src/components/FormSwitch/FormSwitch.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/01-problem/src/components/FormSwitch/FormSwitch.tsx
@highlight 27-33, only

✏️ Create **src/components/FormSwitch/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/01-problem/src/components/FormSwitch/index.ts

### Verify 1

✏️ Create **src/screens/RestaurantOrder/RestaurantOrder.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantOrder/RestaurantOrder.test.tsx

### Exercise 1

- Add `RestaurantOrder` to the `NavigatorStack`.
- Add a link from the `RestaurantOrder` view to the `RestaurantDetails` view.
- Update `FormSwitch` to pass the required props to `Switch`.
- Call `useState()` and use the `OrderItems` interface to create an `items` state.
- Create a function for calling `setItems()` with the updated `items` state.
- Update `subtotal` to use the `calculateTotal()` helper function.
- List restaurant food items for both lunch and dinner menus with checkboxes using `FormSwitchField`.

Hint: The `items` state will look like this when populated:

```tsx
const items = {
  "Menu item 1 name": 1.23, // Menu item 1 price
  "Menu item 2 name": 4.56, // Menu item 2 price
}
```

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-problem/src/App.tsx ../../../exercises/react-native/14-user-input/01-solution/src/App.tsx only

✏️ Update **src/components/FormSwitch/FormSwitch.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-problem/src/components/FormSwitch/FormSwitch.tsx ../../../exercises/react-native/14-user-input/01-solution/src/components/FormSwitch/FormSwitch.tsx only

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx only

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantOrder/RestaurantOrder.tsx only

</details>

## Objective 2: Add text fields to collect user data

Next, we want to collect the user’s name, phone number, and address as part of the order.
To do this, we’ll use React Native’s `TextInput` component.

<div style="display: flex; flex-direction: row; gap: 2rem">
  <img alt="Screenshot of the top of the application restaurant order page." src="../static/img/react-native/14-user-input/02-solution-top.png" style="max-height: 640px; border: 4px solid black; border-radius: 25px;"/>
  <img alt="Screenshot of the bottom of the application restaurant order page." src="../static/img/react-native/14-user-input/02-solution-bottom.png" style="max-height: 640px; border: 4px solid black; border-radius: 25px;"/>
</div>

### Using the `TextInput` component

For entering text, React Native uses the `TextInput` component.
Changes in text input are managed using the `onChangeText` prop, which receives the new text directly.

Here’s how you can use `TextInput` in your application:

@sourceref text.tsx
@highlight 5, 10-13, only

In this example, the `onChangeText` prop is passed a function that calls `setText` to store the text as state in the component.

### Labelling text inputs

In the code above, we have a `<Text>` component in the view but it does not have a programmatic relationship with the `<TextInput>` itself.
This means that assistive technologies (such as screen readers) won’t know to announce the `Text` when the `TextInput` has focus.

To fix this, we can use the accessibility APIs:

@diff ./text.tsx ./text-accessible.tsx only

In the code above, we add the following props:

- `nativeID` on the `Text` to give it a unique ID.
- `accessibilityLabel` to indicate the `TextInput` is an input.
- `accessibilityLabelledBy` on the `TextInput` to associate it with the `Text` component.

These three props combined will make the input accessible to assistive technologies.

### Creating unique IDs with the `useId()` Hook

There’s one minor issue with the code we have above: the `nativeID` prop’s value is pretty generic (`"name"`) and might accidentally be used multiple times across multiple views, causing confusion about which component is the right one to refer to!

To solve this, we can use the `useId` Hook to generate a unique ID:

@diff ./text-accessible.tsx ./text-accessible-useId.tsx only

The value of `useId` is guaranteed to be unique within the component where it is used.
This is ideal for linking related components together, as is the case with `nativeID` and `accessibilityLabelledBy`.

### Setup 2

✏️ Create **src/components/FormTextField/FormTextField.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/FormTextField.tsx

✏️ Create **src/components/FormTextField/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/index.ts

✏️ Update **src/components/FormSwitch/FormSwitch.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/components/FormSwitch/FormSwitch.tsx ../../../exercises/react-native/14-user-input/02-problem/src/components/FormSwitch/FormSwitch.tsx only

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-native/14-user-input/02-problem/src/screens/RestaurantOrder/RestaurantOrder.tsx only

### Verify 2

✏️ Create **src/components/FormTextField/FormTextField.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/FormTextField.test.tsx

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.test.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantOrder/RestaurantOrder.test.tsx ../../../exercises/react-native/14-user-input/02-problem/src/screens/RestaurantOrder/RestaurantOrder.test.tsx only

### Exercise 2

Let’s fully implement our `FormTextField` component and have it:

- Create a unique ID with `useId()`.
- Use a `<Typography variant="label">` component with a `nativeID`.
- Associate the `<Typography>` and `<TextInput>` components with the correct props for accessibility.
- Add the `onChangeText` and `value` props to the `<TextInput>` component.

Additionally, Let's update the `FormSwitch` component to:

- Associate the `<Switch>` component with the correct props for accessibility.

Finally, let’s update the `RestaurantOrder` component to:

- Have state variables and setters for `address`, `phone`, and `name`.
- Use `<FormTextField>` to create text fields for these three state variables.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/components/FormTextField/FormTextField.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/FormTextField.tsx ../../../exercises/react-native/14-user-input/02-solution/src/components/FormTextField/FormTextField.tsx only

✏️ Update **src/components/FormSwitch/FormSwitch.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/02-problem/src/components/FormSwitch/FormSwitch.tsx ../../../exercises/react-native/14-user-input/02-solution/src/components/FormSwitch/FormSwitch.tsx only

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/02-problem/src/screens/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-native/14-user-input/02-solution/src/screens/RestaurantOrder/RestaurantOrder.tsx only

</details>

## Next steps

Next, in order to retain data to limit requests and migrating the same data, let’s look into [Using AsyncStorage](./using-asyncstorage).
