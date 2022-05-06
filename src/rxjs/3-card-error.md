@page learn-rxjs/card-error Card error
@parent learn-rxjs 3

@description Map one observable to another observable again!

@body

## Video

Who has time to read? This video covers the content on this page. Watch fullscreen.

<iframe width="560" height="315" src="https://www.youtube.com/embed/tjMaxHnrYxw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The problem

In this section, we will:

- Display an error message if the user has not entered a card or the card number is not
  16 digits.

## How to solve this problem

- Create a `cardError` observable that represents this error.
- `cardError` should emit:
  - _"There is no card"_ if the `cardNumber` is falsy.
  - _"There should be 16 characters in a card"_ characters if the length of `cardNumber`
    is not 16 digits.
- `cardError` should be displayed within the `<div class="message">` element.

## What you need to know

You know everything you need to know already.

> HINT: Create a `validateCard` operator with `map`.

## The solution

@sourceref ./3-card-error.html
@codepen
@highlight 22-29,35,61,only
