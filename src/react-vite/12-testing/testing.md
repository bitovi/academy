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

OK, you're convinced that testing-library is a good idea, how do you use it to create tests for your
React components?

Let's take a look at an example: say we want to test a component we created named `EmailInputField`
that renders a form field. We expect that the component will generate HTML that looks like this:

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
as a prefix and proceeds from there, e.g. "[it] renders the correct label and value"

The second argument to `it` is a callback function that is called to run the test. Inside the
callback, invoke the testing-library function `render` and pass it a single argument, the JSX for
your component including props. After `render` completes, use `screen` to query the DOM and make
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

Before we move on let's consider the `type` prop — shouldn't we test to be sure it was applied
properly as the input's `type` attribute? The answer is, maybe. `type="email"` doesn't affect the
appearance of the field in a browser, but it might affect how the user can enter input. For example,
a mobile device might display a special on-screen keyboard. For now we'll hold off on writing tests
that check attribute values and see if there is another, more user-focused way, to test this
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

Most components have ways to respond to events raised by user interaction, like clicking a button,
how can we test code that responds to these interactions? We use another library provided by React
Testing Library named [user-event](https://testing-library.com/docs/user-event/intro).

`user-event` allows you to interact with your component in a browser-like manner — some of its
methods may raise more than one event. For example, when a button is "clicked" it emits both a focus
event then a click event. It also has some helpful functionality to prevent interactions that are
not possible in a browser environment such as, not firing a click event from an element that’s
hidden.

- The user-event library simulates user interactions - not events
- Tests must be marked as `async` to work with user-event

### Using `@testing-library/user-event` to simulate user interactions

Referring back to the rendered HTML output by the `EmailInputField` component:

```html
<div class="form-field">
  <label htmlFor="inputId">Email:</label>
  <input id="inputId" type="email" value="test@example.com" />
</div>
```

We want to write a test to verify that what the user types is displayed as the `<input>`'s value.
The user-event library includes a method named `keyboard`, that we can use to send a sequence of key
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
  // Verify the beginning state: no value is set.
  expect(input).toHaveDisplayValue("");

  await user.click(input);
  await user.keyboard("test@example.com");
  expect(input).toHaveDisplayValue("test@example.com");
});
```

There are some notable differences compared to the previous test:

- The userEvent module is imported.
- A `user` is created with the `userEvent.setup()` function.
- The callback function in `it` is prefaced with `async`.
- We need to `await` the `keyboard` method to let it complete.
- We have to focus the input field before we "type" input, rather than using the input's `focus`
  method we prefer the more performant `user.click` method.

After `keyboard` completes we can make assertions about the current state of the input including the
current value which should have been updated with the `keyboard` argument.

TODO: input validation

---

Consider the following example:

```tsx
import userEvent from "@testing-library/user-event";

it("toggles pickup options when clicked", async () => {
  const user = userEvent.setup();
  render(<PickupOptions />);

  expect(screen.queryByText("In-store Options")).not.toBeInTheDocument();

  await user.click(screen.getByText("Store"));
  expect(screen.getByText("In-store Options")).toBeInTheDocument();
});
```

One difference between this example and the previous one is that the callback function is now
preceded by `async` because some of of the test code will `await` an action. Failing to set a test
callback function as `async` or use `await` with user-event methods is a common reason why tests do
not function properly or provide the results developers expect.

Before the component is rendered the `userEvent` module has its `setup` function invoked to get a
`user` that can interact with the component. The `user` has a variety of functions to simulate
common user actions such as clicking or typing.

After calling `render` we verify that the component has initially rendered the proper DOM structure.
Since the element is not expected the `queryByText` method is appropriate to use here, this method
will return null if the element doesn’t exist. We use `expect` with the `not` property to confirm
that the DOM does not contain the element. In most cases prefer using the testing library's API
methods rather than, for example, asserting on whether or not the result of `queryByText` is null.

Now that we know the proper initial DOM was rendered let’s use `user.click()` to click on an
element. We pass the element to be clicked to the `click` function as its argument. Once the call to
click resolves the DOM can be queried again to see the effect. Assuming the component code made the
right changes the call to `getByText("In-store Options")` should return the element so it exists in
the document.

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
