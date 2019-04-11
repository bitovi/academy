@page RxJS RxJS
@parent bit-academy 6

@description Learn RxJS by creating a validating credit card form.

@body

## Before You Begin

<a href="https://join.slack.com/t/bitovi-community/shared_invite/enQtNTIzMTE5NzYxMjA3LWMwMzE4MjFkMTI5ZmZjNzllYjc2MzcxOWNmOTg3YjI4NjE0MGFkZGNkOTNlZjlkNDBhNTlmYTcwMzJlZDZjY2Y">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to RxJS and Angular in the [Angular Chat Room](https://bitovi-community.slack.com/messages/CFD2J3HT3).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.


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

## Outline

- [rxjs/basics] - Learn how to create observables
- [rxjs/angular] - Read and write to observables in Angular
- [rxjs/clean-card-number] - How to use `map`
- [rxjs/debugging] - How to debug observables without messing up state
- [rxjs/card-error] - Use `map` again
- [rxjs/error-on-blur] - Only show the card error when blurred - `merge`, `scan`
- [rxjs/expiry] - Read, validate, and show the error of the expiry
- [rxjs/cvc] - Read, validate, and show the error of the CVC
- [rxjs/disable-pay-button] - Disable the pay button if any part of the card has an error - `combineLatest`
- [rxjs/request-payment] - Make a request when the pay button is clicked
- [rxjs/show-paying] - Update the pay button's text while payments are pending
- [rxjs/disable-while-pending] - Disable the payment button while payments are pending

## Logic Flow

The following presentation shows how the observables are wired up.  This will
be a useful reference for understanding how the tutorial works:

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vS1c0TjlkqGDCI0-R_QUvmZ3oFFTcapVK8zLosgq94g3_w2rQPifGHwZy209xadXI0EchaaB60vCcqj/embed?start=false&loop=false&delayms=3000" frameborder="0" width="640" height="374" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>



<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


## Tips

- Open Developer Tools and stack CodePen vertically:   
  <img src="./static/img/codepen-stack.png" width="50%" alt="CodePen stacked" title="CodePen stacked"
    style="border: solid 1px #808080"/>
- Save your CodePen
- If you can't figure out what is breaking, use an [online diff checker](https://www.diffchecker.com/) to
  compare your code with the solution.  
  <img src="./static/img/diff-checker.png" width="50%" alt="Diff Checker" title="DiffChecker"
    style="border: solid 1px #808080"/>

## Prerequisites

- This guide makes a minor use of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).  A basic understanding of promises is required.
- This guide makes a minor use of TypeScript. TypeScript knowledge is _not_ required, but it
  might help to make sense of the solutions.  The [typescript] guide is more than sufficient
  background.
- This guide uses Angular. However, most of the Angular parts are explained. Angular experience is
  not required; however, experience in some other modern web framework __is__ required.
