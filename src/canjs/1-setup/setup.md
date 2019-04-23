@page learn-canjs/setup-canjs Setup CanJS
@parent learn-canjs 1

@description Learn to setup a basic CanJS application using StealJS as the module loader.

@body

## The problem

- Setup steal to load a basic CanJS application.  A basic CanJS application has:
  - A custom element defined by [Component](https://canjs.com/doc/can-component.html) and
    an instance of that custom element in the page's HTML. That component includes a:
    - A [DefineMap](https://canjs.com/doc/can-define/map/map.html) ViewModel and an instance of that ViewModel.
    - A [stache](https://canjs.com/doc/can-stache.html) view that is rendered with the instance of the ViewModel.
- In addition, this application should load the [can-todomvc-test](https://www.npmjs.com/package/can-todomvc-test) module version 5.0 and
  pass it the custom element’s `ViewModel` instance. You will need to declare the version explicitly as different versions of this guide depend on different versions of this package.

## What you need to know

- To create a new project with StealJS, run:

  ```
  npm init -y
  npm install steal@2 steal-tools@2 steal-css@1 --save-dev
  ```

- To host static files, install `http-server` and run it like:

  ```
  npm install http-server -g
  http-server -c-1
  ```

- If you load StealJS plugins, add them to your _package.json_ configuration like:

  ```
  "steal": {
    "plugins": [
      "steal-css"
    ]
  }
  ```

- Define a custom element with [Component](https://canjs.com/doc/can-component.html):

  ```js
  import {Component} from "can";

  Component.extend({
      tag: "todo-mvc",
      view: ...,
      ViewModel: {
         ...
      }
  });
  ```

- With CanJS configured as a steal plugin, you can load stache views like:

  ```js
  import view from "./path/to/template.stache";
  ```

  Note that `can` is the name of the StealJS plugin and needs to be configured as such.

- Add the custom element to your HTML page to see it in action:

  ```html
  <todo-mvc></todo-mvc>
  ```

- Use the following HTML that a designer might have provided:

  ```html
  <section id="todoapp">
      <header id="header">
          <h1>Todos</h1>
          <input id="new-todo" placeholder="What needs to be done?">
      </header>
      <section id="main" class="">
          <input id="toggle-all" type="checkbox">
          <label for="toggle-all">Mark all as complete</label>
          <ul id="todo-list">
              <li class="todo">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label>Do the dishes</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" type="text" value="Do the dishes">
              </li>
              <li class="todo completed">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label>Mow the lawn</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" type="text" value="Mow the lawn">
              </li>
              <li class="todo editing">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label>Pick up dry cleaning</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" type="text" value="Pick up dry cleaning">
              </li>
          </ul>
      </section>
      <footer id="footer" class="">
          <span id="todo-count">
              <strong>2</strong> items left
          </span>
          <ul id="filters">
              <li>
                  <a class="selected" href="#!">All</a>
              </li>
              <li>
                  <a href="#!active">Active</a>
              </li>
              <li>
                  <a href="#!completed">Completed</a>
              </li>
          </ul>
          <button id="clear-completed">
              Clear completed (1)
          </button>
      </footer>
  </section>
  ```

- Use [can-todomvc-test](https://www.npmjs.com/package/can-todomvc-test) to load the application’s
  styles and run its tests:

  ```js
  import test from "can-todomvc-test";
  test(appVM);
  ```



## The solution

Create a folder:

```cmd
mkdir todomvc
cd todomvc
```

Host it:

```
npm install http-server -g
http-server -c-1
```


Create a new project:

```cmd
npm init -y
```

Install `steal`, `steal-tools`, and CanJS’s core modules:

```cmd
npm install steal@2 steal-tools@2 steal-css@1 --save-dev
npm install can@5 steal-stache@4 --save
```



Add __steal.plugins__ to _package.json_:

@sourceref ./package.json
@highlight 17-21


Create the starting HTML page:

```html
<!-- index.html -->
<todo-mvc></todo-mvc>
<script src="./node_modules/steal/steal.js" main></script>
```

Create the application template:

@sourceref ./index.stache.html

Install the test harness:

```cmd
npm install can-todomvc-test@5 --save-dev
```

Create the main app

@sourceref ./index.js
