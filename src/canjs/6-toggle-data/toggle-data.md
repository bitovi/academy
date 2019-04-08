@page canjs-training/toggle-data Toggle checkbox
@parent canjs-training 6

@description

@body



## Toggle a todo’s completed state (data bindings)

### The problem

- Update a todo’s `complete` property when the checkbox’s `checked` property changes with [https://canjs.com/doc/can-stache-bindings.twoWay.html two-way bindings].

### What you need to know

- [The can-stache-bindings Presentation’s](https://drive.google.com/open?id=0Bx-kNqf-wxZeYUJ3ZVRxUlU2MjQ) _DOM Data Bindings_
- Use [https://canjs.com/doc/can-stache-bindings.twoWay.html value:bind] to setup a two-way binding in `can-stache`.  For example, the following keeps `todo.name` and the input’s `value` in sync:

   ```html
   <input  value:bind="todo.name" />
   ```

### The solution

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 14-15,only
