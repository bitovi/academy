@page learn-canjs/connection Connection
@parent learn-canjs 9

@description Connect the Todo model to the service layer (can-connect)

@body


## The problem

- Decorate `Todo` with methods so it can get, create, updated, and delete todos at the `/api/todos` service.  Specifically:
  - `Todo.getList()` which calls `GET /api/todos`
  - `Todo.get({id: 5})` which calls `GET /api/todos/5`
  - `todo.save()` which calls `POST /api/todos` if `todo` doesn’t have an `id` or `PUT /api/todos/{id}` if the `todo` has an id.
  - `todo.destroy()` which calls `DELETE /api/todos/5`

## What you need to know

<iframe class="iframe-16-9-plus-nav" src="https://docs.google.com/presentation/d/e/2PACX-1vRrAKhe4VezwxYfJ1FJYPNPLNcrE8iu6xQPlxv3tzQbjIHaBmsUUmz-N3f2PFEmSjI4Z0lHPQWa5p3J/embed?start=false&loop=false&delayms=3000#slide=34" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [The can-connect Presentation](https://docs.google.com/presentation/d/1ZuxUR9HXKyGqqG9HUQBqwqSJRFG5PJsRMdzZ1-TGAos/edit?usp=sharing#slide=34) up to and including _Migrate 2 can-connect_.
- [https://canjs.com/doc/can-connect/can/base-map/base-map.html baseMap] can decorate a `DefineMap` with methods that connect it to a restful URL like:

  ```js
  baseMap({
    Map: Type,
    url: "URL",
    algebra: algebra
  })
  ```

## The solution

<details>
<summary>Click to see the solution</summary>

Update _models/todo.js_ to the following:

@sourceref ./todo.js
@highlight 2,33-37,only

</details>