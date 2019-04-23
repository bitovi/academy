@page learn-canjs/setter-toggle Setter Toggle
@parent learn-canjs 15

@description Toggle all todos complete state (DefineMap setter)

@body



## The problem

Make the “toggle all” checkbox work.  It should be
unchecked if a single todo is unchecked and checked
if all todos are checked.

When the “toggle all” checkbox is changed, the
application should update every todo to match
the status of the “toggle all” checkbox.

The “toggle all” checkbox should be disabled if a
single todo is saving.

## What you need to know

- Using [https://canjs.com/doc/can-define.types.set.html setters] and [https://canjs.com/doc/can-define.types.get.html getters] a virtual property
can be simulated like:

  ```js
  DefineMap.extend({
      first: "string",
      last: "string",
      get fullName() {
          return this.first + " " + this.last;
      },
      set fullName(newValue) {
          const parts = newValue.split(" ");
          this.first = parts[0];
          this.last = parts[1];
      }
  })
  ```

## The solution

Update _models/todo.js_ to the following:

@sourceref ./todo.js
@highlight 31-41,only

Update _index.js_ to the following:

@sourceref ./index.js
@highlight 18-23,only

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 10-12,only
