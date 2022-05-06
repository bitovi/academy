@page learn-rxjs/expiry Expiry
@parent learn-rxjs 6

@description Apply what you've learned from previous sections to the `expiry` field.

@body

## The problem

In this section, we will do for `expiry` what was done for `cardNumber`.

## How to solve this problem

First:

- Write the `<input name="expiry"/>` value to a `BehaviorSubject` called `this.userExpiry`.
- Create a `this.expiry` observable that is an array of two strings like `["10","20"]`.

Second:

- Display an error message if the user has not entered the expiry correctly.
- Create a `expiryError` observable that represents this error. You can use this function
  to get the error from `userExpiry`:
  ```typescript
  (expiry) => {
    if (!expiry) {
      return 'There is no expiry. Format  MM-YY';
    }
    if (
      expiry.length !== 2 ||
      expiry[0].length !== 2 ||
      expiry[1].length !== 2
    ) {
      return 'Expiry must be formatted like MM-YY';
    }
  };
  ```
- `expiryError` should be displayed within the `<div class="message">` element.

Finally:

- Only show the `expiryError` error if the user blurs the expiry input. Once the input blurs,
  we will update the displayed expiry error, if there is one, on every future keystroke.
- Add class="is-error" to the input when it has an error.
- Create a `userExpiryBlurred` `Subject` that emits when the `expiry` input is blurred.
- Create a `showExpiryError` that emits true when the `expiry` error should be shown.

## What you need to know

You already know everything you need to know. Apply what you learned from
`cardNumber`, `cardError` and `showCardError` to `expiry`, `expiryError`, and `showExpiryError`.

## The Solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./6-expiry.html
@codepen
@highlight 83-100,108,119-126,142-143,152-154,only
</details>
