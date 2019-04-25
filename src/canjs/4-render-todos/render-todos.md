@page learn-canjs/render-todos Render Todos
@parent learn-canjs 4

@description Learn how to render a view.

@body

## The problem

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

## What you need to know

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSwcbjjwOyiYxruHZdLXg9k2mqzM2dkBtyJWfvVftUEwb3NHDHXU2VCtJVNVpmgBr4vaz85FENpCvag/embed?start=false&loop=false&delayms=3000" frameborder="0" width="640" height="509" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [Stache Basics Presentation](https://docs.google.com/presentation/d/13IX7PRiS2B4RdYXor8tMgb75FNjc9mq-mlzNX0dnlt0/edit?usp=sharing)
- CanJS uses [stache](https://canjs.com/doc/can-stache.html) to render data in a template
  and keep it live. Templates can be loaded with [https://canjs.com/doc/steal-stache.html steal-stache].

  A [stache](https://canjs.com/doc/can-stache.html) template uses
  [https://canjs.com/doc/can-stache.tags.escaped.html {{key}}] magic tags to insert data into
  the HTML output like:

  ```html
    {{something.name}}
  ```
- Use [https://canjs.com/doc/can-stache.helpers.if.html {{#if(value)}}] to do `if/else` branching in `can-stache`.
- Use [https://canjs.com/doc/can-stache.helpers.for-of.html {{#for(of)}}] to do looping in `can-stache`.

## The solution

Update _index.js_ to the following:

@sourceref ./index.js
@highlight 4,13-21,only

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 11-21,26,40,only
