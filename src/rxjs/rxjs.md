@page learn-rxjs Learn RxJS
@parent bit-academy 6

@description Learn RxJS by creating a validating credit card form.

@body

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img alt="" src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to RxJS and Angular in the [Angular Chat Room](https://discord.gg/Qv26e4uq5z).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Video

Who has time to read? This video covers the content on this page. Watch fullscreen.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3uPT-gcxs0E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Overview

In this tutorial we will create the following validating credit card form:

<p data-height="373" data-theme-id="0" data-slug-hash="vvpNJz" data-default-tab="js,result" data-user="justinbmeyer" data-pen-title="Angular + RXJS" class="codepen">See the Pen <a href="https://codepen.io/justinbmeyer/pen/vvpNJz/">Angular + RXJS</a> by Justin Meyer (<a href="https://codepen.io/justinbmeyer">@justinbmeyer</a>) on <a href="https://codepen.io">CodePen</a>.</p>

This credit card form:

- Validates input as a user types, but _only_ once a user blurs an input element.
- Enables the **PAY** button once the credit card information is valid.
- Disables the **PAY** button and changes its text to **PAYING** while payment is being processed.
- Logs a success message when payment has completed.
- Simulates a payment with a `Promise` that resolves in 2 seconds.

We will use [RxJS 7.4](https://rxjs.dev) and [Angular 12](https://v12.angular.io/docs)
for this example. All code examples will be able to work in a [CodePen](https://codepen.io/justinbmeyer/pen/vvpNJz) so you just need a browser to complete this tutorial!

Each section of the guide is broken down into the following sections:

- **The problem** — A description of what the section is trying to accomplish.
- **What you need to know** — Information that is useful for solving the problem.
- **The solution** — The solution to the problem.

## Outline

- [learn-rxjs/basics] - Learn how to create observables
- [learn-rxjs/angular] - Read and write to observables in Angular
- [learn-rxjs/clean-card-number] - How to use `map`
- [learn-rxjs/card-error] - Use `map` again
- [learn-rxjs/debugging] - How to debug observables without messing up state
- [learn-rxjs/error-on-blur] - Only show the card error when blurred - `merge`, `scan`
- [learn-rxjs/expiry] - Read, validate, and show the error of the expiry
- [learn-rxjs/cvc] - Read, validate, and show the error of the CVC
- [learn-rxjs/disable-pay-button] - Disable the pay button if any part of the card has an error - `combineLatest`
- [learn-rxjs/request-payment] - Make a request when the pay button is clicked
- [learn-rxjs/show-paying] - Update the pay button’s text while payments are pending
- [learn-rxjs/disable-while-pending] - Disable the payment button while payments are pending

## Logic Flow

The following presentation shows how the observables are wired up. This will
be a useful reference for understanding how the tutorial works:

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vS1c0TjlkqGDCI0-R_QUvmZ3oFFTcapVK8zLosgq94g3_w2rQPifGHwZy209xadXI0EchaaB60vCcqj/embed?start=false&loop=false&delayms=3000" frameborder="0" width="640" height="374" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Tips

- Open Developer Tools and stack CodePen vertically:

  <img src="./static/img/codepen-stack.png" width="50%" alt="CodePen stacked" alt="CodePen stacked" style="border: solid 1px #808080" />

- Save your CodePen
- If you can’t figure out what is breaking, use an [online diff checker](https://www.diffchecker.com/) to
  compare your code with the solution.

  <img src="./static/img/diff-checker.png" width="50%" alt="Diff Checker" alt="DiffChecker" style="border: solid 1px #808080" />

## Prerequisites

- This guide makes a minor use of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). A basic understanding of promises is required.
- This guide makes a minor use of TypeScript. TypeScript knowledge is _not_ required, but it
  might help to make sense of the solutions. The [learn-typescript] guide is more than sufficient
  background.
- This guide uses Angular. However, most of the Angular parts are explained. Angular experience is
  not required; however, experience in some other modern web framework **is** required.

## Next steps

Head over to the [first lesson](learn-rxjs/basics.html) and learn about observables.

