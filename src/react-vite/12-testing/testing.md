@page learn-react/testing Testing in React
@parent learn-react 12
@outline 3

@description Write unit tests to verify components are functioning as expected.

@body

## Overview

In this section, we will:

- Introduce React Testing Library
- Render and verify a component in a test
- Use `@testing-library/user-event` to simulate user interactions

## Objective 1: Write a test for rendering a component and verifying the DOM structure

How do we know when our code is working correctly? How do we know it’s still working correctly in
the future after we make changes to it?

Testing helps by verifying that given certain inputs our code generates expected outputs. So far
we’ve copied existing tests to prove that we’ve completed the exercise correctly, now let’s dive in
and learn about how React testing is done.

The most basic test is to render a component and validate the DOM that is generated. That’s what
we’ll do in this first section.

### Introducing React Testing Library

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is a set of
tools that helps us write robust tests for our React applications. Unlike some other testing
libraries that focus on the internal state and implementation details of components, React Testing
Library emphasizes testing the behavior of components as experienced by the end-users. It works
with the DOM rendered by React components, allowing tests to cover a wide range of user interactions.

React Testing Library’s north star is:

> The more your tests resemble the way your software is used, the more confidence they can give you.

React Testing Library encourages tests that focus on how the user interacts with the application,
rather than the implementation details of the components.

### Rendering and verifying a component in a test

OK, you're convinced that React Testing Library is a good idea, how do you use it to create tests
for your React components?

Let's take a look at an example: say we want to test a component we created named `EmailInputField`
that renders a form field. We expect the component will generate HTML like this:

```html
<div class="form-field">
  <label htmlFor="inputId">Email:</label>
  <input id="inputId" type="email" value="test@example.com" />
</div>
```

We want to test `EmailInputField` to make sure it generates the DOM we expect. If you're already
familiar with testing frontend JavaScript code, the following pattern will probably be recognizable:
each test consists of arguments to the `it` function provided by Vite. The first argument is a short
description of what the test is verifying. The convention is that the description string takes "it"
as a prefix and proceeds from there, e.g. "[it] renders the correct label and value."

The second argument to `it` is a callback function that is called to run the test. Inside the
callback, invoke the React Testing Library function `render` and pass it a single argument, the JSX
for your component including props. After `render` completes, use `screen` to query the DOM and make
assertions about the result.

```tsx
it("renders the correct label and value", () => {
  render(<EmailInputField label="Email" value="test@example.com" />);
  const label = screen.getByText("Email:");
  expect(label).toBeInTheDocument();
});
```

In the test above, we validate that the label is correct. We use the `getByText` function to select
a single element whose `textContent` matches the string, "Email:". If you look closely you can see
that the `<label>` content in the HTML has a ":" (colon) at the end, but the `label` prop does not,
we can conclude that EmailInputField appends the colon — but **the purpose of the test isn't how
EmailInputField works, it's the DOM output that it returns**. After we get an element, we then use
`expect` and `toBeInTheDocument` to verify the element was rendered properly. Our test passes
because the generated DOM is what we expect the user will perceive.

We also want to validate the `<input>` element; let's update the test:

```tsx
it("renders the correct label and value", () => {
  render(<EmailInputField label="Email" value="test@example.com" />);
  const label = screen.getByText("Email:");
  expect(label).toBeInTheDocument();

  // Validate the input value.
  const input = screen.getByDisplayValue("test@example.com");
  expect(input).toBeInTheDocument();
});
```

We've used a different query to select the `<input>` element: `getByDisplayValue`. It returns an
input element whose value matches the provided string. React Testing Library has a [suite of "query"
functions](https://testing-library.com/docs/queries/about) that select elements based on
characteristics like: role, label text, placeholder text, text, display value, alt text, and title.
Our test continues to pass because the input's value in the DOM matches what we expect.

Before we move on, let's consider the `type` prop — shouldn't we test to be sure it was applied
properly as the input's `type` attribute? The answer is maybe. `type="email"` doesn't affect the
appearance of the field in a browser, but it might affect how the user can enter input. For example,
a mobile device might display a special on-screen keyboard. For now, we'll hold off on writing tests
that check attribute values and see if there is another, more user-focused way to test this
behavior.

### Setup 1

✏️ Create **src/components/FormSelect/FormSelect.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/12-testing/01-solution/src/components/FormSelect/FormSelect.tsx

✏️ Create **src/components/FormSelect/index.ts** and update it to be:

@sourceref ../../../exercises/react-vite/12-testing/01-solution/src/components/FormSelect/index.ts

✏️ Update **src/pages/RestaurantList/RestaurantList.tsx** to be:

@diff ../../../exercises/react-vite/11-controlled-vs-uncontrolled/03-solution/src/pages/RestaurantList/RestaurantList.tsx ../../../exercises/react-vite/12-testing/01-solution/src/pages/RestaurantList/RestaurantList.tsx only

### Verify 1

✏️ Create **src/components/FormSelect/FormSelect.test.tsx** and update it to be:

@sourceref ../../../exercises/react-vite/12-testing/01-problem/src/components/FormSelect/FormSelect.test.tsx

### Exercise 1

- Call `render()` with the JSX for the component you want to test.
- Call `screen.getByText()` to get the `<label>` element.
- Use `.toBeInTheDocument()` to check whether an element is in the DOM.
- Call `screen.getByRole()` to get other elements.

Hint: Here’s the JSX you can use for the component:

```tsx
<FormSelect label="Test Label" onChange={() => { }} value="">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
</FormSelect>
```

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/01-problem?file=src/components/FormSelect/FormSelect.test.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/01-problem?file=src/components/FormSelect/FormSelect.test.tsx) to do this exercise in an online code editor.

### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/components/FormSelect/FormSelect.test.tsx** to be:

@diff ../../../exercises/react-vite/12-testing/01-problem/src/components/FormSelect/FormSelect.test.tsx ../../../exercises/react-vite/12-testing/01-solution/src/components/FormSelect/FormSelect.test.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/01-solution?file=src/components/FormSelect/FormSelect.test.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/01-solution?file=src/components/FormSelect/FormSelect.test.tsx).

</details>

## Objective 2: Write a test for handling user interactions

Most components can respond to events raised by user interaction, like clicking a button. How can we
test code that responds to these interactions? We use another React Testing Library package named
[user-event](https://testing-library.com/docs/user-event/intro).

`user-event` allows your tests to interact with your component in a browser-like manner, where a
 single user action can raise multiple events. For example, when a button is clicked, it can emit a
focus event and then a click event. `user-event` also has some helpful functionality to prevent
interactions that are not possible in a browser environment, such as not firing a click event from
an element that’s hidden.

All of the methods provided by `user-event` return a Promise, so we want to prefix the test callback
function with `async` and use `await` when a `user-event` method is called.

### Using `@testing-library/user-event` to simulate user interactions

Referring back to the HTML output by the `EmailInputField` component:

```html
<div class="form-field">
  <label htmlFor="inputId">Email:</label>
  <input id="inputId" type="email" value="test@example.com" />
</div>
```

We want to write a test to verify that what the user types is displayed as the `<input>`'s value.
The user-event library includes a method named `keyboard` that we can use to send a sequence of key
events to the `<input>` element. The `keyboard` method provides a good simulation of what happens
when a user is typing. Before we use `keyboard` in a test, we need to [initialize user events with
the `setup` method](https://testing-library.com/docs/user-event/setup#direct-apis). Let's look at
the test:

```tsx
import userEvent from "@testing-library/user-event";

it("captures email input", async () => {
  const user = userEvent.setup();

  render(<EmailInputField label="Email" value="" />);

  const input = screen.getByLabelText("Email:");
  expect(input).toBeInTheDocument();
  expect(input).toHaveDisplayValue(""); // Verify the beginning state: no value is set.

  await user.click(input);
  await user.keyboard("test@example.com");
  expect(input).toHaveDisplayValue("test@example.com");
});
```

There are some notable differences compared to the previous test:

- The userEvent module is imported.
- A `user` is created with the `userEvent.setup()` function.
- The callback function argument of `it` is prefaced with `async`.
- We need to `await` both the `click`, and `keyboard` methods to let them complete.
- The input element needs to have focus before we "type" input; rather than using the input
  element's `focus` method, we prefer the more performant `user.click()` method.

After `keyboard` completes, we can make assertions about the current state of the input, including
the current value, which should have been updated with the value of the single `keyboard` argument.

There is one final point to consider: testing the `type` attribute of the `<input>` element. We'd
prefer to follow React Testing Library's philosophy of testing the DOM generated by a component. To
put this into practice, we need some knowledge about different `<input>` type values, their effects
on the user experience, and why we might choose one over another. Let's review what MDN has to say
about the ["email" type
value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email):

> The input value is automatically validated to ensure that it's either empty or a
> properly-formatted email address (or list of addresses) before the form can be submitted. The
> :valid and :invalid CSS pseudo-classes are automatically applied as appropriate to visually denote
> whether the current value of the field is a valid email address or not.

This is a great reason for choosing the "email" type rather than the "text" type. The "email" type
prevents the user from entering an incorrectly formatted email address. This also helps guide our
thinking — rather than testing an attribute **value**, we can test the input's **behavior**. We'll
add another test to ensure incorrect email formats are flagged as invalid.

```tsx
it("flags an incorrectly formatted email address as invalid", async () => {
  const user = userEvent.setup();

  render(<EmailInputField label="Email" value="" />);

  const input = screen.getByLabelText("Email:");
  expect(input).toBeInTheDocument();

  await user.click(input);
  await user.keyboard("test");
  expect(input).toHaveDisplayValue("test");

  await user.tab();
  expect(input).not.toHaveFocus();
  expect(input).toBeInvalid();
});
```

Compared to the prior test, this one inputs a string that is not a valid email address and has three
additional lines at the end that move focus away from the `<input>` element, triggering the built-in
validation to be executed, and then asserts that the `<input>` has been [marked as
invalid](https://github.com/testing-library/jest-dom?tab=readme-ov-file#tobeinvalid).

### Verify 2

✏️ Update **src/components/FormSelect/FormSelect.test.tsx** to be:

@diff ../../../exercises/react-vite/12-testing/01-solution/src/components/FormSelect/FormSelect.test.tsx ../../../exercises/react-vite/12-testing/02-problem/src/components/FormSelect/FormSelect.test.tsx only

### Exercise 2

- Call `vi.fn()` to create a function you can observe.
- Call `userEvent.setup()` to set up the object for simulating user interactions.
- Call `await user.selectOptions()` to simulate selecting an option in a `<select>` element.
- Use `.toHaveBeenCalledWith()` to confirm whether the `onChange` handler is called.

<strong>Having issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/02-problem?file=src/components/FormSelect/FormSelect.test.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/02-problem?file=src/components/FormSelect/FormSelect.test.tsx) to do this exercise in an online code editor.

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/components/FormSelect/FormSelect.test.tsx** to be:

@diff ../../../exercises/react-vite/12-testing/02-problem/src/components/FormSelect/FormSelect.test.tsx ../../../exercises/react-vite/12-testing/02-solution/src/components/FormSelect/FormSelect.test.tsx only

<strong>Having issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/02-solution?file=src/components/FormSelect/FormSelect.test.tsx) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/react-vite/12-testing/02-solution?file=src/components/FormSelect/FormSelect.test.tsx).

</details>

## Next steps

Congrats, you’ve completed this Bitovi Academy training!
