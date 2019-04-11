@page canjs-training/connection Connection
@parent canjs-training 9

@description Connect the Todo model to the service layer (can-connect)

@body


## The problem

- Decorate `Todo` with methods so it can get, create, updated, and delete todos at the `/api/todos` service.  Specifically:
  - `Todo.getList()` which calls `GET /api/todos`
  - `Todo.get({id: 5})` which calls `GET /api/todos/5`
  - `todo.save()` which calls `POST /api/todos` if `todo` doesn’t have an `id` or `PUT /api/todos/{id}` if the `todo` has an id.
  - `todo.destroy()` which calls `DELETE /api/todos/5`

## What you need to know

- [The can-connect Presentation](https://drive.google.com/open?id=0Bx-kNqf-wxZebHFWMElNOVEwSlE) up to and including _Migrate 2 can-connect_.
- [https://canjs.com/doc/can-connect/can/base-map/base-map.html baseMap] can decorate a `DefineMap` with methods that connect it to a restful URL like:

  ```js
  baseMap({
    Map: Type,
    url: "URL",
    algebra: algebra
  })
  ```

## The solution


Update _models/todo.js_ to the following:

@sourceref ./todo.js
@highlight 2,33-37,only
