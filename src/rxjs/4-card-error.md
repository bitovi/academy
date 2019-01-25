@page rxjs/card-error Card error
@parent RxJS 4

@description Map one observable to another observable again!

@body

## The problem

In this section, we will:

- Display an error message if the user has not entered a card or the card number is not
  16 digits.
- Create a `cardError` observable that represents this error.
- `cardError` should emit:
  - _"There is no card"_ if the `cardNumber` is falsy.
  - _"There should be 16 characters in a card_ characters if the length of `cardNumber`
    is not 16 digits.
- `cardError` should be displayed within the `<div class="message">` element.

## What you need to know

You know everything you need to know already.

> HINT: Create a `validateCard` operator with `map`.

## The solution

@sourceref ./4-card-error.html
@codepen
@highlight 26-33,40,63,only
