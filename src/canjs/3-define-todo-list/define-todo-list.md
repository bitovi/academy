@page learn-canjs/define-todo-list Define Todo List
@parent learn-canjs 3

@description Define Todo.List type (DefineList basics)

@body


## The problem

- Define a `Todo.List` type on the export of  _models/todo.js_, where:
  - It is a [https://canjs.com/doc/can-define/list/list.html DefineList] type.
  - The enumerable indexes are coerced into `Todo` types.
  - Its `.active` property returns a filtered `Todo.List` of the todos that are __not__ complete.
  - Its `.complete` property returns a filtered `Todo.List` of the todos that are complete.
  - Its `.allComplete` property true if all the todos are complete.

Example test code:

```js
QUnit.ok(Todo.List, "Defined a List");
const todos = new Todo.List([
  {complete: true},
  {},
  {complete: true}
]);
QUnit.ok(todos[0] instanceof Todo, "each item in a Todo.List is a Todo");
QUnit.equal(todos.active.length, 1);
QUnit.equal(todos.complete.length, 2);
QUnit.equal(todos.allComplete, false, "not allComplete");
todos[1].complete = true;
QUnit.equal(todos.allComplete, true, "allComplete");
```

## What you need to know

<iframe class="iframe-16-9-plus-nav" src="https://docs.google.com/presentation/d/e/2PACX-1vQTyb-tSlYyyzo8LF0fGOkxgtLHWnDhdIIXUiSScpDxJllG8QDdqS29gKnVBDYdDNPsPX2kYDA8pXth/embed?start=false&loop=false&delayms=3000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [DefineList Basics Presentation](https://docs.google.com/presentation/d/1l7QzPJRSvTJf014pSVlJCw_xyKTG7vitSB7OXtPZgfw/edit?usp=sharing)
- [https://canjs.com/doc/can-define/list/list.extend.html DefineList.extend] defines a new `ListType`.
- The [https://canjs.com/doc/can-define/list/list.prototype.wildcardItems.html #] property defines the behavior of items in a list like:

  ```js
  DefineList.extend({
      "#": {type: ItemType}
  })
  ```

- The [https://canjs.com/doc/can-define.types.get.html get] behavior defines observable computed properties like:

  ```js
  DefineMap.extend({
      propertyName: {
          get: function() {
              return this.otherProperty;
          }
      }
  })
  ```

- [https://canjs.com/doc/can-define/list/list.prototype.filter.html filter] can be used to filter a list into a new list:

  ```js
  list = new ListType([
    // ...
  ]);
  list.filter(function(item) {
      return test(item);
  })
  ```

## The solution

<details>
<summary>Click to see the solution</summary>

Update _models/todo.js_ to the following:

@sourceref ./todo.js
@highlight 2,16-31,only

</details>