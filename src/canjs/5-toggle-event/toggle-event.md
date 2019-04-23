@page learn-canjs/toggle-event Toggle checkbox
@parent learn-canjs 5

@description Toggle a todo’s completed state (event bindings)

@body


## The problem

- Call `toggleComplete` when a todo’s checkbox is clicked upon.

## What you need to know

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTF0-60TwgAwVzRGMKxYnjWtb2dIr1t-x2w2nDmvbc82PU_TxuGD3D2b7FA2cbZ0hmMUZEol3oG7-89/embed?start=false&loop=false&delayms=3000" frameborder="0" width="640" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [The can-stache-bindings Presentation’s](https://docs.google.com/presentation/d/1xiu2fe_mIi37lNcAfTUnNXs-nSvLUDm8BADl_KJIC0g/edit?usp=sharing) up to and including _DOM Event Bindings_
- Use [https://canjs.com/doc/can-stache-bindings.event.html on:EVENT] to listen to an event on an element and call a method in `can-stache`.  For example, the following calls `doSomething()` when the `<div>` is clicked.

   ```html
   <div on:click="doSomething()"> ... </div>
   ```

## The solution

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 14-16,only
