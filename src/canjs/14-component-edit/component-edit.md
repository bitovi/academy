@page canjs-training/component-edit Component Edit
@parent canjs-training 14

@description Edit todo names (can-stache-bindings)

@body


## The problem

Make it possible to edit a `todos` name by
double-clicking its label which should reveal
a _focused_ input element.  If the user hits
the __enter__ key, the todo should be updated on the
server.  If the input loses focus, it should go
back to the default list view.

This functionality should be encapsulated by a `<todo-list {todos} />`
custom element.  It should accept a `todos` property that
is the list of todos that will be managed by the custom element.


## What you need to know

- [The can-stache-bindings presentation](https://drive.google.com/open?id=0Bx-kNqf-wxZeYUJ3ZVRxUlU2MjQ) on _data bindings_.

- The [https://canjs.com/doc/can-util/dom/attr/attr.special.focused.html focused] custom attribute can be used to specify when an element should be focused:

  ```html
  focused:from="shouldBeFocused()"
  ```

- Use [https://canjs.com/doc/can-stache-bindings.toChild.html key:from] to pass a value from the scope to a component:

  ```
  <some-component nameInComponent:from="nameInScope" />
  ```

- [https://canjs.com/doc/can-stache/keys/this.html this] can be used to get the current context in stache:

  ```html
  <div on:click="doSomethingWith(this)" />
  ```

## The solution

Create _components/todo-list/todo-list.stache_ as follows:

@sourceref ./todo-list.stache.html

Create _components/todo-list/todo-list.js_ as follows:

@sourceref ./todo-list.js

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 3,12,only
