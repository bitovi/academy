@page learn-canjs/define-todo Define Todo Model
@parent learn-canjs 2

@description Learn how to create an observable type in CanJS.

@body



## The problem

- Define a `Todo` type as the export of  _models/todo.js_, where:
  - It is a [DefineMap](https://canjs.com/doc/can-define/map/map.html) type.
  - The id or name property values are coerced into a string.
  - Its `complete` property is a `Boolean` that defaults to `false`.
  - It has a `toggleComplete` method that flips `complete` to the opposite value.

Example test code:

```js
const todo = new Todo({id: 1, name: 2});
QUnit.equal(todo.id, "1", "id is a string");
QUnit.equal(todo.name, "2", "name is a string");
QUnit.equal(todo.complete, false, "complete defaults to false");
todo.toggleComplete();
QUnit.equal(todo.complete, true, "toggleComplete works");
```

## What you need to know

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSK5CTN9M9UGDSbkXFXG34lx2Pyf7N4sxUiV0so9Gwa6FRwB2SZ2MQZurZURE64INnMw-vqJGZB3EC8/embed?start=false&loop=false&delayms=3000" frameborder="0" width="640" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [DefineMap Basics Presentation](https://docs.google.com/presentation/d/1Y9G9aJMJgCzKMHROe4HuzRD_LY7UyGPbLOtl2TJAEqM/edit?usp=sharing)
- [https://canjs.com/doc/can-define/map/map.extend.html DefineMap.extend] defines a new `Type`.

  ```js
  import {DefineMap} from "can";

  const MyType = DefineMap.extend("MyType",{});

  var instance = new MyType();

  console.log( instance instanceof MyType ) //logs true
  ```
  @codepen
- The [https://canjs.com/doc/can-define.types.type.html type] behavior defines a property’s type like:

  ```js
  import {DefineMap} from "can";

  const Person = DefineMap.extend("Person",{
      age: {type: "number"}
  });

  console.log( new Person({age: "3"}).age ) //logs 3
  ```
  @codepen
  @highlight 3-5, 7

- The [https://canjs.com/doc/can-define.types.default.html default] behavior defines a property’s initial value like:

  ```js
  import {DefineMap} from "can";

  const Person = DefineMap.extend("Person",{
      age: {default: 3}
  });

  console.log( new Person().age ) //logs 3
  ```
  @codepen
  @highlight 4, 7

- Methods can be defined directly on the prototype like:

  ```js
  import {DefineMap} from "can";

  const Type = DefineMap.extend("Type",{
      methodName() {
          console.log("run method");
      }
  });

  var instance = new Type();
  instance.methodName() //logs "run method"
  ```
  @codepen
  @highlight 3-10

## The Solution

<details>
<summary>Click to see the solution</summary>

Create _models/todo.js_ as follows:

@sourceref ./todo.js
@highlight 2-16

</details>
