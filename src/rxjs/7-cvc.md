@page learn-rxjs/cvc CVC
@parent learn-rxjs 7

@description Apply what you’ve learned from previous sections to the `cvc` field.

@body

## The problem

In this section, we will do for `cvc` what was done for `cardNumber` and `expiry`.

## How to solve this problem

First:

- Write the `<input name="cvc"/>` value to a `BehaviorSubject` called `this.userCVC$`.
- Create a `this.cvc$` observable that is just a reference to `this.userCVC$`.
  _We are not going to worry about input cleanup for this field_.

Second:

- Display an error message if the user has not entered the cvc correctly.
- Create a `cvcError$` observable that represents this error. You can use this function
  to get the error from `userCVC`:
  ```typescript
  (cvc) => {
    if (!cvc) {
      return 'There is no CVC code';
    }
    if (cvc.length !== 3) {
      return 'The CVC must be at least 3 numbers';
    }
    if (isNaN(parseInt(cvc))) {
      return 'The CVC must be numbers';
    }
  };
  ```
- `cvcError$` should be displayed within the `<div class="message">` element.

Finally:

- Only show the `cvcError$` error if the user blurs the cvc input. Once the input blurs,
  we will update the displayed cvc error, if there is one, on every future keystroke.
- Add class="is-error" to the input when it has an error.
- Create a `userCVCBlurred$` `Subject` that emits when the `cvc` input is blurred.
- Create a `showCVCError$` that emits true when the `cvc` error should be shown.

## What you need to know

You already know everything you need to know. Apply what you learned from
`cardNumber$`, `cardError$` and `showCardError$` to `cvc$`, `cvcError$`, and `showCVCError$`.

## The Solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./7-cvc.html
@codepen
@highlight 102-112,122,142-149,166-167,180-182,only
</details>
