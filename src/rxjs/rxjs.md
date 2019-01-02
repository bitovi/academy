@page RxJS RxJS
@parent bit-u 5

@description Learn RxJS by creating a validating credit card form.

@body

## Overview

In this tutorial we will create the following validating credit card form:

<p data-height="373" data-theme-id="0" data-slug-hash="vvpNJz" data-default-tab="js,result" data-user="justinbmeyer" data-pen-title="Angular + RXJS" class="codepen">See the Pen <a href="https://codepen.io/justinbmeyer/pen/vvpNJz/">Angular + RXJS</a> by Justin Meyer (<a href="https://codepen.io/justinbmeyer">@justinbmeyer</a>) on <a href="https://codepen.io">CodePen</a>.</p>

This credit card form:

- Validates input as a user types, but _only_ once a user blurs an input element.
- Enables the __PAY__ button once the credit card information is valid.
- Disables the __PAY__ button and changes its text to __PAYING__ while payment is being processed.
- Logs a success message when payment has completed.
- Simulates a payment with a `Promise` that resolves in 2 seconds.

We will use [RxJS](https://rxjs-dev.firebaseapp.com/) and [Angular 6](https://v6.angular.io/docs)
for this example.  All code examples will be able to work in a [CodePen](https://codepen.io/justinbmeyer/pen/vvpNJz) so you just need a browser to complete this tutorial!

Each section of the guide is broken down into the following sections:

- __The problem__ — A description of what the section is trying to accomplish.
- __What you need to know__ — Information about CanJS that is useful for solving the problem.
- __The solution__ — The solution to the problem.

The following presentation shows how the observables are wired up.  This will
be a useful reference for understanding how the tutorial works:

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vS1c0TjlkqGDCI0-R_QUvmZ3oFFTcapVK8zLosgq94g3_w2rQPifGHwZy209xadXI0EchaaB60vCcqj/embed?start=false&loop=false&delayms=3000" frameborder="0" width="1280" height="749" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


## Outline

- Basics - Learn how to create observables
- RxJS in Angular - Read and write to observables in Angular
- Debugging - How to debug observables without messing up state
- Clean card number - How to use `map`
- Card error - Use `map` again
- Error on blur - Only show the card error when blurred - `merge`, `scan`
- Expiry - Read, validate, and show the error of the expiry
- CVC - Read, validate, and show the error of the CVC
- Disable pay button - Disable the pay button if any part of the card has an error - `combineLatest`
- Request payment - Make a request when the pay button is clicked
- Show paying - Update the pay button's text while payments are pending
- Disable the payment button while payments are pending






<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
