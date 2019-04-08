@page canjs-training/clear-all-completed Clear All Completed
@parent canjs-training 16

@description

@body



## Clear completed todo’s (event bindings)

### The problem
Make the "Clear completed" button work. When the button is clicked, It should destroy each completed todo.

### What you need to know

- [The can-stache-bindings Presentation’s](https://drive.google.com/open?id=0Bx-kNqf-wxZeYUJ3ZVRxUlU2MjQ) _DOM Event Bindings_
- Use [https://canjs.com/doc/can-stache-bindings.event.html on:EVENT] to listen to an event on an element and call a method in `can-stache`.  For example, the following calls `doSomething()` when the `<div>` is clicked.

   ```html
   <div on:click="doSomething()"> ... </div>
   ```

### The solution

Update _models/todo.js_ to the following:

@sourceref ./todo.js
@highlight 42-46,only

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 31-32,only
