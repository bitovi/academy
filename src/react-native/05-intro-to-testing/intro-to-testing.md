@page learn-react-native/intro-to-testing Introduction to Testing
@parent learn-react-native 5
@outline 3

@description Learn about testing solutions in React Native.

@body

## Overview

In this section, you will:

- Learn about React Native Testing Library.
- See the distinctions of testing for React Native components.
- Use userEvent from `@testing-library/react-native` to simulate user interactions

## Objective 1: Testing in React Native

How do we know when our code is working correctly? How do we know it’s still working correctly in the future after we make changes to it?

Testing helps by verifying that given certain inputs our code generates expected outputs. So far we’ve copied existing tests to prove that we’ve completed the exercise correctly, now let’s dive in and learn about how React Native testing is done.

### Introducing React Native Testing Library

[React Native Testing Library (RNTL)](https://callstack.github.io/react-native-testing-library/docs/getting-started) is a set of tools that helps us write robust tests for our React Native applications. Unlike some other testing libraries that focus on the internal state and implementation details of components, RNTL emphasizes testing the behavior of components as experienced by the end users.

In order to test components, it provides light utility functions using React Test Renderer. Most testing libraries use the DOM, but since React Native doesn't use the DOM, the React Test Renderer is necessary.

Akin to the original React Testing Library, RNTL's north star is:

> The more your tests resemble the way your software is used, the more confidence they can give you.

RNTL encourages tests that focus on how the user interacts with the application, rather than the implementation details of the components.

### Rendering and verifying a component in a test

OK, you’re convinced that RNTL is a good idea, how do you use it to create tests for your components?

Let’s take a look at an example.
Say we want to test a component we created named `EmailInputField`.

@sourceref ./EmailInputField.tsx
@highlight 20, only

We want to test `EmailInputField`. If you have experience with software testing, the following pattern will probably be recognizable: each test consists of arguments to the `it` function provided by Jest. The first argument is a short description of what the test is verifying. The convention is that the description string takes "it" as a prefix and proceeds from there, e.g. "[it] renders the correct label and value."

The second argument to `it` is a callback function that is called to run the test. Inside the callback, invoke the React Native Testing Library function `render` and pass it a single argument, the JSX for your component including props. After `render` completes, use `screen` to query the React Test Renderer and make assertions about the result.

@sourceref ./EmailInputField.test.1.tsx

In the test above, we validate that the label is correct. We use the `getByText` function to select a single element whose `textContent` matches the string, "Email:". If you look closely you can see that the `<Text nativeId="formLabel">` content in the component has a ":" (colon) at the end, but the `label` prop does not, we can conclude that `EmailInputField` appends the colon — but **the purpose of the test isn’t how `EmailInputField` works, it’s the screen output that it returns.**

In addition, we add `{exact: false}` as a second argument for `getByText`. This will ignore extra spaces created by the component from formatting and only match focus on matching the provided text.  

After we get an element, we then use `expect` and `toBeOnTheScreen` to verify the element was rendered properly. Our test passes because the generated screen is what we expect the user will perceive.

We also want to validate the `<input>` element; let’s update the test:

@diff ./EmailInputField.test.1.tsx ./EmailInputField.test.2.tsx only

We’ve used a different query to select the `<TextInput>` element: `getByDisplayValue`. It returns an input element whose value matches the provided string. RNTL uses React Testing Libraries Core API which has a [suite of "query" functions](https://testing-library.com/docs/queries/about) that select elements based on characteristics like: role, label text, placeholder text, text, display value, alt text, and title. Our test continues to pass because the input’s value in the screen matches what we expect.

## Objective 2: Write a test for handling user interactions

Most components can respond to events raised by user interaction, like clicking a button. How can we test code that responds to these interactions? We use another RNTL package named [user-event](https://callstack.github.io/react-native-testing-library/docs/user-event).

The `user-event` package allows your tests to interact with your component in a way that more closely matches what would happen with real user interactions, where a single user action can raise multiple events. For example, when a button is clicked, it can emit a focus event and then a click event. `user-event` also has some helpful functionality to prevent interactions that users would not realistically be able to do, such as not firing a click event from an element that’s hidden.

All of the methods provided by `user-event` return a Promise, so we want to prefix the test callback function with `async` and use `await` when a `user-event` method is called.

### Using `userEvent` to simulate user interactions

Referring back to the `EmailInputField` component:

@sourceref ./EmailInputField.tsx

We want to write a test to verify that what the user types is displayed as the `<TextInput>`’s value. The user-event library includes a method named `type` that we can use to send a sequence of key events to the `<TextInput>` element. The `type` method provides a good simulation of what happens when a user is typing. Before we use `type` in a test, we need to [initialize user events with the `setup` method](https://callstack.github.io/react-native-testing-library/docs/user-event#setup). Let’s look at the test:

```tsx
import { userEvent, render, screen } from "@testing-library/react-native"
import EmailInputField from "./EmailInputField"

it("renders label", async () => {
  const user = userEvent.setup()

  render(<EmailInputField label="Email" value="" />)

  const input = screen.getByLabelText("Email:")
  expect(input).toBeOnTheScreen()
  expect(input).toHaveDisplayValue("")

  await user.type("test@example.com")
  expect(input).toHaveDisplayValue("test@example.com")
})
```

There are some notable differences compared to the previous test:

- The userEvent module is imported.
- A `user` is created with the `userEvent.setup()` function.
- The callback function argument of `it` is prefaced with `async`.
- We need to `await` the `type` method to let it complete.

After `type` completes, we can make assertions about the current state of the input, including the current value, which should have been updated with the value of the single `type` argument.


As we continue on with future lessons, along with the future tests we use for verify exercises, we'll explain how we and why we go about our testing approach.


## Next steps

Next we will learn about [building custom components](./building-custom-components.html) to make our React Native application more modular.