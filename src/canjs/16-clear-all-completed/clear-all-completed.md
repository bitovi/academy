@page canjs-training/clear-all-completed Clear All Completed
@parent canjs-training 16

@description Clear completed todo’s (event bindings)

@body


## The problem
Make the "Clear completed" button work. When the button is clicked, It should destroy each completed todo.

## What you need to know

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTF0-60TwgAwVzRGMKxYnjWtb2dIr1t-x2w2nDmvbc82PU_TxuGD3D2b7FA2cbZ0hmMUZEol3oG7-89/embed?start=false&loop=false&delayms=3000#slide=6" frameborder="0" width="640" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [The can-stache-bindings Presentation’s](https://docs.google.com/presentation/d/1xiu2fe_mIi37lNcAfTUnNXs-nSvLUDm8BADl_KJIC0g/edit?usp=sharing#slide=6) _DOM Event Bindings_
- Use [https://canjs.com/doc/can-stache-bindings.event.html on:EVENT] to listen to an event on an element and call a method in `can-stache`.  For example, the following calls `doSomething()` when the `<div>` is clicked.

   ```html
   <div on:click="doSomething()"> ... </div>
   ```

## The solution

Update _models/todo.js_ to the following:

@sourceref ./todo.js
@highlight 42-46,only

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 31-32,only
