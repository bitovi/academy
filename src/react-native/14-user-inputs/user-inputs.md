@page learn-react-native/user-inputs Handling User Inputs
@parent learn-react-native 14
@outline 3

@description TODO

@body

## Overview

In this section, you will:

- TODO

## Objective 1: Understand `value` and `onChange` data flow

TODO

### Concept TODO

TODO

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

✏️ Create **src/components/FormSwitch/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/01-problem/src/components/FormSwitch/FormSwitch.tsx

### Verify 1

✏️ Create **src/screens/RestaurantOrder/RestaurantOrder.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantOrder/RestaurantOrder.test.tsx

### Exercise 1

- Add `RestaurantOrder` to the `NavigatorStack`
- Link `RestaurantOrder` to `RestaurantDetails`
- List restaurant food items for both lunch and dinner menus with checkboxes using `FormSwitchField`
- Create `subtotal` based on selected items.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/App.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-problem/src/App.tsx ../../../exercises/react-native/14-user-input/01-solution/src/App.tsx only

✏️ Update **src/screens/RestaurantDetails/RestaurantDetails.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantDetails/RestaurantDetails.tsx ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantDetails/RestaurantDetails.tsx only

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-problem/src/screens/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantOrder/RestaurantOrder.tsx only

</details>

## Objective 2: Custom wrappers for consistency, accessibility

TODO

### Concept TODO

TODO

### Setup 2

✏️ Create **src/components/FormTextField/FormTextField.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/FormTextField.tsx

✏️ Create **src/components/FormTextField/index.ts** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/index.ts

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-native/14-user-input/02-problem/src/screens/RestaurantOrder/RestaurantOrder.tsx only

### Verify 2

✏️ Create **src/components/FormTextField/FormTextField.test.tsx** and update it to be:

@sourceref ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/FormTextField.tsx

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.test.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/01-solution/src/screens/RestaurantOrder/RestaurantOrder.test.tsx ../../../exercises/react-native/14-user-input/02-problem/src/screens/RestaurantOrder/RestaurantOrder.test.tsx only

### Exercise 2

- Create `Typography` for `label` and Update `TextInput` to work with `label`
- Use `name`, `address`, and `phone` fields to create `FormTextField` elements
- Store `state` for new `FormTextFields` in `RestaurantOrder`

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/components/FormTextField/FormTextField.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/02-problem/src/components/FormTextField/FormTextField.tsx ../../../exercises/react-native/14-user-input/02-solution/src/components/FormTextField/FormTextField.tsx only

✏️ Update **src/screens/RestaurantOrder/RestaurantOrder.tsx** to be:

@diff ../../../exercises/react-native/14-user-input/02-problem/src/screens/RestaurantOrder/RestaurantOrder.tsx ../../../exercises/react-native/14-user-input/02-solution/src/screens/RestaurantOrder/RestaurantOrder.tsx only

</details>

## Next steps

Next, in order to retain data to limit requests and migrating the same data, let's look into [Using AsyncStorage](./using-asyncstorage).