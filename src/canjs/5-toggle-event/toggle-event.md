@page canjs-training/toggle-event Toggle checkbox
@parent canjs-training 5

@description

@body


## Toggle a todo’s completed state (event bindings)

### The problem

- Call `toggleComplete` when a todo’s checkbox is clicked upon.

### What you need to know

- [The can-stache-bindings Presentation’s](https://drive.google.com/open?id=0Bx-kNqf-wxZeYUJ3ZVRxUlU2MjQ) _DOM Event Bindings_
- Use [https://canjs.com/doc/can-stache-bindings.event.html on:EVENT] to listen to an event on an element and call a method in `can-stache`.  For example, the following calls `doSomething()` when the `<div>` is clicked.

   ```html
   <div on:click="doSomething()"> ... </div>
   ```

### The solution

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 14-16,only
