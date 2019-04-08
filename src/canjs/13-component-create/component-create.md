@page canjs-training/component-create Component Create
@parent canjs-training 13

@description

@body

## Create todos (can-component)

### The problem

Make it possible to create a todo, update the service layer
and show the todo in the list of todos.

This functionality should be encapsulated by a `<todo-create/>`
custom element.

### What you need to know

- [The can-component presentation](https://drive.google.com/open?id=0Bx-kNqf-wxZeMnlHZzB6ZERUSEk) up to and including how to _define a component_.
- A [Component](https://canjs.com/doc/can-component.html) combines a custom tag name, [stache](https://canjs.com/doc/can-stache.html) view and a [DefineMap](https://canjs.com/doc/can-define/map/map.html) ViewModel like:

  ```js
  import Component from "can-component";
  import view from "./template.stache";
  const ViewModel = DefineMap.extend({
    ...      
  });

  Component.extend({
      tag: "some-component",
      view: view,
      ViewModel: ViewModel
  });
  ```

- You can use `on:enter` to listen to when the user hits the __enter__ key.
- Listening to the `enter` event can be enabled by importing [https://canjs.com/doc/can-event-dom-enter/add-global/add-global.html can-event-dom-enter/add-global/add-global].
- The [https://canjs.com/doc/can-define.types.defaultConstructor.html default] behavior creates a default value by using `new Default` to initialize the value when
a `DefineMap` property is read for the first time.

  ```js
  const SubType = DefineMap.extend({})
  const Type = DefineMap.extend({
      property: {Default: SubType}
  })

  const map = new Type();
  map.property instanceof SubType //-> true
  ```

- Use [https://canjs.com/doc/can-view-import.html <can-import>] to import a module from a template like:

  ```html
  <can-import from="~/components/some-component/" />
  <some-component>
  ```



### The solution

Create _components/todo-create/todo-create.js_ as follows:

@sourceref ./todo-create.js

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 2,6,only
