@page canjs-training/render-todos Render Todos
@parent canjs-training 4

@description

@body



## Render a list of todos (can-stache)

### The problem

- Add a `todosList` property to the `AppViewModel` whose default
  value will be a `Todo.List` with the following data:

  ```js
  [
    { name: "mow lawn", complete: false, id: 5 },
    { name: "dishes", complete: true, id: 6 },
    { name: "learn canjs", complete: false, id: 7 }
  ]
  ```

- Write out an `<li>` for each todo in `todosList`, including:
  - write the todo’s name in the  `<label>`
  - add `completed` in the `<li>`’s `class` if the todo is `complete`.
  - check the todo’s checkbox if the todo is `complete`.

- Write out the number of items left and completed count in the “Clear completed” button.

### What you need to know

- [Stache Basics Presentation](https://drive.google.com/open?id=0Bx-kNqf-wxZeSjVJMTRJdXRXcWs)
- CanJS uses [stache](https://canjs.com/doc/can-stache.html) to render data in a template
  and keep it live. Templates can be loaded with [https://canjs.com/doc/steal-stache.html steal-stache].

  A [stache](https://canjs.com/doc/can-stache.html) template uses
  [can-stache.tags.escaped {{key}}] magic tags to insert data into
  the HTML output like:

  ```html
    {{something.name}}
  ```
- Use [can-stache.helpers.if {{#if(value)}}] to do `if/else` branching in `can-stache`.
- Use [can-stache.helpers.for-of {{#for(of)}}] to do looping in `can-stache`.

### The solution

Update _index.js_ to the following:

@sourceref ./index.js
@highlight 4,13-21,only

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 11-21,26,40,only
