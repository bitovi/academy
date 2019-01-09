<style>
    .highlight {background-color: #90FEFB;}
    .expand {height: 20px; background-color: red;}
</style>

This guide walks through building a slightly modified version of TodoMVC with CanJS's [can-core libraries]
and [can-fixture].


## Setup

The easiest way to get started is to clone the following JSBin:

The JSBin starts
with the static HTML and CSS a designer might turn over to a JS developer.

The JSBin also loads [can.all.js](https://github.com/canjs/canjs/blob/v3.0.0-pre.6/dist/global/can.all.js), which is a script that includes
CanJS all of CanJS core, ecosystem, legacy and infrastructure libraries.

Generally speaking, you should not use the global can script and instead
should import things directly.  Read [guides/setup] on how to setup CanJS
in a real app.

## Create and render the template

Put the markup in a template.  Change the `HTML` tab to the following:

```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 Start">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<input id="new-todo" placeholder="What needs to be done?"
               autofocus="">
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
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.6/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='11,68,only'/>

> NOTE: autofocus

To render this template, update the `JavaScript` tab to:

```js
var template = can.stache.from("todomvc-template");
var frag = template({});
document.body.appendChild(frag);
```
<div line-highlight='1-3,only'/>

## Create the todos type and get items left working

Update `JavaScript` to:

```js
var Todo = can.DefineMap.extend({
  id: "string",
  name: "string",
  complete: {type: "boolean", value: false}
});

Todo.List = can.DefineList.extend({
  "*": Todo,
  active: {
    get: function(){
      return this.filter({complete: false})
    }
  },
  complete: {
    get: function(){
      return this.filter({complete: true});
    }
  }
});

var todos = new Todo.List([
  { id: 5, name: "mow lawn", complete: false },
  { id: 6, name: "dishes", complete: true },
  { id: 7, name: "learn canjs", complete: false }
]);

var template = can.stache.from("todomvc-template");
var frag = template({todos: todos});
document.body.appendChild(frag);
```
<div line-highlight='1-25,28,only'/>

Update `HTML` to:

```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - Create and render the template">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<input id="new-todo" placeholder="What needs to be done?"
               autofocus="">
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<ul id="todo-list">
          {{#each todos}}
			<li class="todo {{#if complete}}completed{{/if}}">
				<div class="view">
					<input class="toggle" type="checkbox" {($checked)}="complete">
					<label>{{name}}</label>
					<button class="destroy"></button>
				</div>
				<input class="edit" type="text" value="{{name}}"/>
			</li>
          {{/each}}
		</ul>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todos.active.length}}</strong> items left
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
			Clear completed ({{todos.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.6/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='22-31,36,50,only'/>

Note:

 - completed
 - items left / clear completed changes automatically


## Get todos from the server

Update `JavaScript` to:

```js
var todoAlgebra = new can.set.Algebra(
  can.set.props.boolean("complete"),
  can.set.props.id("id"),
  can.set.props.sort("sort")
);

var todoStore = can.fixture.store([
  { name: "mow lawn", complete: false, id: 5 },
  { name: "dishes", complete: true, id: 6 },
  { name: "learn canjs", complete: false, id: 7 }
], todoAlgebra);

can.fixture("/api/todos/{id}", todoStore);
can.fixture.delay = 1000;


var Todo = can.DefineMap.extend({
  id: "string",
  name: "string",
  complete: {type: "boolean", value: false}
});

Todo.List = can.DefineList.extend({
  "*": Todo,
  active: {
    get: function(){
      return this.filter({complete: false})
    }
  },
  complete: {
    get: function(){
      return this.filter({complete: true});
    }
  }
});

can.connect.superMap({
  url: "/api/todos",
  Map: Todo,
  List: Todo.List,
  name: "todo",
  algebra: todoAlgebra
});

var template = can.stache.from("todomvc-template");
var frag = template({todosPromise: Todo.getList({})});
document.body.appendChild(frag);
```
<div line-highlight='1-15,37-43,46,only'/>

Update `HTML` to:

```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - Create the todos type and get items left working">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<input id="new-todo" placeholder="What needs to be done?"
               autofocus="">
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<ul id="todo-list">
          {{#each todosPromise.value}}
			<li class="todo {{#if complete}}completed{{/if}}">
				<div class="view">
					<input class="toggle" type="checkbox" {($checked)}="complete">
					<label>{{name}}</label>
					<button class="destroy"></button>
				</div>
				<input class="edit" type="text" value="{{name}}"/>
			</li>
          {{/each}}
		</ul>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todosPromise.value.active.length}}</strong> items left
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
			Clear completed ({{todosPromise.value.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.7/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='22,36,50,only'/>

Note:

- localStorage

## Destroy todos

Update `HTML` to:

```
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - Destroy todos">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<input id="new-todo" placeholder="What needs to be done?"
               autofocus="">
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<ul id="todo-list">
          {{#each todosPromise.value}}
			<li class="todo {{#if complete}}completed{{/if}}
                    {{#if isDestroying}}destroying{{/if}}">
				<div class="view">
					<input class="toggle" type="checkbox" {($checked)}="complete">
					<label>{{name}}</label>
					<button class="destroy" ($click)="destroy()"></button>
				</div>
				<input class="edit" type="text" value="{{name}}"/>
			</li>
          {{/each}}
		</ul>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todosPromise.value.active.length}}</strong> items left
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
			Clear completed ({{todosPromise.value.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.7/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='23-24,28,only'/>

TODO:

- make sure we get the right css

## Create todos

Update `JavaScript` to:

```js
var todoAlgebra = new can.set.Algebra(
  can.set.props.boolean("complete"),
  can.set.props.id("id"),
  can.set.props.sort("sort")
);


var todoStore = can.fixture.store([
  { name: "mow lawn", complete: false, id: 5 },
  { name: "dishes", complete: true, id: 6 },
  { name: "learn canjs", complete: false, id: 7 }
], todoAlgebra);

can.fixture("/api/todos/{id}", todoStore);
can.fixture.delay = 1000;


var Todo = can.DefineMap.extend({
  id: "string",
  name: "string",
  complete: {type: "boolean", value: false}
});

Todo.List = can.DefineList.extend({
  "*": Todo,
  active: {
    get: function(){
      return this.filter({complete: false})
    }
  },
  complete: {
    get: function(){
      return this.filter({complete: true});
    }
  }
});

can.connect.superMap({
  url: "/api/todos",
  Map: Todo,
  List: Todo.List,
  name: "todo",
  algebra: todoAlgebra
});

var TodoCreateVM = can.DefineMap.extend({
    todo: {Value: Todo},
    createTodo: function(){
        this.todo.save().then(function(){
            this.todo = new Todo();
        }.bind(this));
    }
});

can.Component.extend({
    tag: "todo-create",
    view: can.stache.from("todo-create-template"),
    ViewModel: TodoCreateVM
});

var template = can.stache.from("todomvc-template");
var frag = template({todosPromise: Todo.getList({})});
document.body.appendChild(frag);
```
<div line-highlight='46-59,only'/>

Update `HTML` to:

```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - Create todos">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type='text/stache' id='todo-create-template'>
<input id="new-todo" placeholder="What needs to be done?"
    autofocus=""
    {($value)}="todo.name"
    ($enter)="createTodo()"/>
</script>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<todo-create/>
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<ul id="todo-list">
          {{#each todosPromise.value}}
			<li class="todo {{#if complete}}completed{{/if}}
                    {{#if isDestroying}}destroying{{/if}}">
				<div class="view">
					<input class="toggle" type="checkbox" {($checked)}="complete">
					<label>{{name}}</label>
					<button class="destroy" ($click)="destroy()"></button>
				</div>
				<input class="edit" type="text" value="{{name}}"/>
			</li>
          {{/each}}
		</ul>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todosPromise.value.active.length}}</strong> items left
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
			Clear completed ({{todosPromise.value.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.7/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='11-16,18,22,only'/>

## List todos

Update `JavaScript` to:

```js
var todoAlgebra = new can.set.Algebra(
  can.set.props.boolean("complete"),
  can.set.props.id("id"),
  can.set.props.sort("sort")
);

var todoStore = can.fixture.store([
  { name: "mow lawn", complete: false, id: 5 },
  { name: "dishes", complete: true, id: 6 },
  { name: "learn canjs", complete: false, id: 7 }
], todoAlgebra);

can.fixture("/api/todos/{id}", todoStore);
can.fixture.delay = 1000;


var Todo = can.DefineMap.extend({
  id: "string",
  name: "string",
  complete: {type: "boolean", value: false}
});

Todo.List = can.DefineList.extend({
  "*": Todo,
  active: {
    get: function(){
      return this.filter({complete: false})
    }
  },
  complete: {
    get: function(){
      return this.filter({complete: true});
    }
  }
});

can.connect.superMap({
  url: "/api/todos",
  Map: Todo,
  List: Todo.List,
  name: "todo",
  algebra: todoAlgebra
});

var TodoCreateVM = can.DefineMap.extend({
    todo: {Value: Todo},
    createTodo: function(){
        this.todo.save().then(function(){
            this.todo = new Todo();
        }.bind(this));
    }
});

can.Component.extend({
    tag: "todo-create",
    view: can.stache.from("todo-create-template"),
    ViewModel: TodoCreateVM
});

var TodoListVM = can.DefineMap.extend({
    todos: Todo.List
});

can.Component.extend({
    tag: "todo-list",
    view: can.stache.from("todo-list-template"),
    ViewModel: TodoListVM
});

var template = can.stache.from("todomvc-template");
var frag = template({todosPromise: Todo.getList({})});
document.body.appendChild(frag);
```
<div line-highlight='60-68,only'/>

Update `HTML` to:

```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - List todos">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type='text/stache' id='todo-create-template'>
<input id="new-todo" placeholder="What needs to be done?"
    autofocus=""
    {($value)}="todo.name"
    ($enter)="createTodo()"/>
</script>

<script type='text/stache' id='todo-list-template'>
<ul id="todo-list">
  {{#each todos}}
    <li class="todo {{#if complete}}completed{{/if}}
      {{#if isDestroying}}destroying{{/if}}">
      <div class="view">
        <input class="toggle" type="checkbox" {($checked)}="complete">
        <label>{{name}}</label>
        <button class="destroy" ($click)="destroy()"></button>
      </div>
      <input class="edit" type="text" value="{{name}}"/>
    </li>
  {{/each}}
</ul>
</script>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<todo-create/>
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<todo-list {todos}="todosPromise.value"/>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todosPromise.value.active.length}}</strong> items left
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
			Clear completed ({{todosPromise.value.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.7/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='18-32,43,only'/>


## Edit todos

Update `JavaScript` to:

```js
var todoAlgebra = new can.set.Algebra(
  can.set.props.boolean("complete"),
  can.set.props.id("id"),
  can.set.props.sort("sort")
);

var todoStore = can.fixture.store([
  { name: "mow lawn", complete: false, id: 5 },
  { name: "dishes", complete: true, id: 6 },
  { name: "learn canjs", complete: false, id: 7 }
], todoAlgebra);

can.fixture("/api/todos/{id}", todoStore);
can.fixture.delay = 1000;


var Todo = can.DefineMap.extend({
  id: "string",
  name: "string",
  complete: {type: "boolean", value: false}
});

Todo.List = can.DefineList.extend({
  "*": Todo,
  active: {
    get: function(){
      return this.filter({complete: false})
    }
  },
  complete: {
    get: function(){
      return this.filter({complete: true});
    }
  }
});

can.connect.superMap({
  url: "/api/todos",
  Map: Todo,
  List: Todo.List,
  name: "todo",
  algebra: todoAlgebra
});

var TodoCreateVM = can.DefineMap.extend({
  todo: {Value: Todo},
  createTodo: function(){
    this.todo.save().then(function(){
      this.todo = new Todo();
    }.bind(this));
  }
});

can.Component.extend({
  tag: "todo-create",
  view: can.stache.from("todo-create-template"),
  ViewModel: TodoCreateVM
});

var TodoListVM = can.DefineMap.extend({
  todos: Todo.List,
  editing: Todo,
  backupName: "string",
  isEditing: function(todo){
    return todo === this.editing;
  },
  edit: function(todo){
    this.backupName = todo.name;
    this.editing = todo;
  },
  cancelEdit: function(){
    this.editing.name = this.backupName;
    this.editing = null;
  },
  updateName: function() {
    this.editing.save();
    this.editing = null;
  }
});

can.Component.extend({
  tag: "todo-list",
  view: can.stache.from("todo-list-template"),
  ViewModel: TodoListVM
});

var template = can.stache.from("todomvc-template");
var frag = template({todosPromise: Todo.getList({})});
document.body.appendChild(frag);
```
<div line-highlight='62-78,only'/>




Update `HTML` to:

```
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - List todos">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type='text/stache' id='todo-create-template'>
<input id="new-todo" placeholder="What needs to be done?"
    autofocus=""
    {($value)}="todo.name"
    ($enter)="createTodo()"/>
</script>

<script type='text/stache' id='todo-list-template'>
<ul id="todo-list">
  {{#each todos}}
    <li class="todo {{#if complete}}completed{{/if}}
      {{#if isDestroying}}destroying{{/if}}
      {{#if isEditing(.)}}editing{{/if}}">
      <div class="view">
        <input class="toggle" type="checkbox" {($checked)}="complete">
        <label ($dblclick)="edit(.)">{{name}}</label>
        <button class="destroy" ($click)="destroy()"></button>
      </div>
      <input class="edit" type="text"
        {($value)}="name"
        ($enter)="updateName()"
        ($blur)="cancelEdit()"/>
    </li>
  {{/each}}
</ul>
</script>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<todo-create/>
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<todo-list {todos}="todosPromise.value"/>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todosPromise.value.active.length}}</strong> items left
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
			Clear completed ({{todosPromise.value.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.9/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='23,26,29-32,only'/>

## Routing

Update `JavaScript` to:

```js
var todoAlgebra = new can.set.Algebra(
  can.set.props.boolean("complete"),
  can.set.props.id("id"),
  can.set.props.sort("sort")
);

var todoStore = can.fixture.store([
  { name: "mow lawn", complete: false, id: 5 },
  { name: "dishes", complete: true, id: 6 },
  { name: "learn canjs", complete: false, id: 7 }
], todoAlgebra);

can.fixture("/api/todos/{id}", todoStore);
can.fixture.delay = 1000;


var Todo = can.DefineMap.extend({
  id: "string",
  name: "string",
  complete: {type: "boolean", value: false}
});

Todo.List = can.DefineList.extend({
  "*": Todo,
  active: {
    get: function(){
      return this.filter({complete: false})
    }
  },
  complete: {
    get: function(){
      return this.filter({complete: true});
    }
  }
});

can.connect.superMap({
  url: "/api/todos",
  Map: Todo,
  List: Todo.List,
  name: "todo",
  algebra: todoAlgebra
});

var TodoCreateVM = can.DefineMap.extend({
  todo: {Value: Todo},
  createTodo: function(){
    this.todo.save().then(function(){
      this.todo = new Todo();
    }.bind(this));
  }
});

can.Component.extend({
  tag: "todo-create",
  view: can.stache.from("todo-create-template"),
  ViewModel: TodoCreateVM
});

var TodoListVM = can.DefineMap.extend({
  todos: Todo.List,
  editing: Todo,
  backupName: "string",
  isEditing: function(todo){
    return todo === this.editing;
  },
  edit: function(todo){
    this.backupName = todo.name;
    this.editing = todo;
  },
  cancelEdit: function(){
    this.editing.name = this.backupName;
    this.editing = null;
  },
  updateName: function() {
    this.editing.save();
    this.editing = null;
  }
});

can.Component.extend({
  tag: "todo-list",
  view: can.stache.from("todo-list-template"),
  ViewModel: TodoListVM
});

var AppVM = can.DefineMap.extend({seal: false},{
  filter: "string",
  route: "string",
  todosPromise: {
    get: function(){

      if(!this.filter) {
        return Todo.getList({});
      } else {
        return Todo.getList({complete: this.filter === "complete"});
      }
    }
  }
});

var template = can.stache.from("todomvc-template");

var vm = new AppVM();
can.route.map(vm);
can.route(":filter");
can.route.ready();

var frag = template(vm);
document.body.appendChild(frag);
```
<div line-highlight='87-109,only'/>

Update `HTML` to:

```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - Routing">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type='text/stache' id='todo-create-template'>
<input id="new-todo" placeholder="What needs to be done?"
    autofocus=""
    {($value)}="todo.name"
    ($enter)="createTodo()"/>
</script>

<script type='text/stache' id='todo-list-template'>
<ul id="todo-list">
  {{#each todos}}
    <li class="todo {{#if complete}}completed{{/if}}
      {{#if isDestroying}}destroying{{/if}}
      {{#if isEditing(.)}}editing{{/if}}">
      <div class="view">
        <input class="toggle" type="checkbox" {($checked)}="complete">
        <label ($dblclick)="edit(.)">{{name}}</label>
        <button class="destroy" ($click)="destroy()"></button>
      </div>
      <input class="edit" type="text"
        {($value)}="name"
        ($enter)="updateName()"
        ($blur)="cancelEdit()"/>
    </li>
  {{/each}}
</ul>
</script>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<todo-create/>
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox">
		<label for="toggle-all">Mark all as complete</label>
		<todo-list {todos}="todosPromise.value"/>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todosPromise.value.active.length}}</strong> items left
		</span>
		<ul id="filters">
			<li>
				<a href="{{routeUrl filter=undefined}}"
					{{#routeCurrent filter=undefined}}class='selected'{{/routeCurrent}}>All</a>
			</li>
			<li>
				<a href="{{routeUrl filter='active'}}"
					{{#routeCurrent filter='active'}}class='selected'{{/routeCurrent}}>Active</a>
			</li>
			<li>
				<a href="{{routeUrl filter='complete'}}"
					{{#routeCurrent filter='complete'}}class='selected'{{/routeCurrent}}>Completed</a>
			</li>
		</ul>
		<button id="clear-completed">
			Clear completed ({{todosPromise.value.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.8/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='55-56,59-60,63-64,only'/>


## Check all and clear completed

Update `JavaScript` to:

```js
var todoAlgebra = new can.set.Algebra(
  can.set.props.boolean("complete"),
  can.set.props.id("id"),
  can.set.props.sort("sort")
);

var todoStore = can.fixture.store([
  { name: "mow lawn", complete: false, id: 5 },
  { name: "dishes", complete: true, id: 6 },
  { name: "learn canjs", complete: false, id: 7 }
], todoAlgebra);

can.fixture("/api/todos/{id}", todoStore);
can.fixture.delay = 1000;


var Todo = can.DefineMap.extend({
  id: "string",
  name: "string",
  complete: {type: "boolean", value: false}
});

Todo.List = can.DefineList.extend({
  "*": Todo,
  active: {
    get: function(){
      return this.filter({complete: false})
    }
  },
  complete: {
    get: function(){
      return this.filter({complete: true});
    }
  },
  allComplete: {
    get: function(){
      return this.length === this.complete.length;
    }
  },
  saving: {
    get: function(){
      return this.filter(function(todo){
        return todo.isSaving();
      });
    }
  },
  updateCompleteTo: function(value){
    this.forEach(function(todo){
      todo.complete = value;
      todo.save();
    });
  },
  destroyComplete: function(){
    this.complete.forEach(function(todo){
      todo.destroy();
    });
  }
});

can.connect.superMap({
  url: "/api/todos",
  Map: Todo,
  List: Todo.List,
  name: "todo",
  algebra: todoAlgebra
});

var TodoCreateVM = can.DefineMap.extend({
  todo: {Value: Todo},
  createTodo: function(){
    this.todo.save().then(function(){
      this.todo = new Todo();
    }.bind(this));
  }
});

can.Component.extend({
  tag: "todo-create",
  view: can.stache.from("todo-create-template"),
  ViewModel: TodoCreateVM
});

var TodoListVM = can.DefineMap.extend({
  todos: Todo.List,
  editing: Todo,
  backupName: "string",
  isEditing: function(todo){
    return todo === this.editing;
  },
  edit: function(todo){
    this.backupName = todo.name;
    this.editing = todo;
  },
  cancelEdit: function(){
    this.editing.name = this.backupName;
    this.editing = null;
  },
  updateName: function() {
    this.editing.save();
    this.editing = null;
  }
});

can.Component.extend({
  tag: "todo-list",
  view: can.stache.from("todo-list-template"),
  ViewModel: TodoListVM
});

var AppVM = can.DefineMap.extend({seal: false},{
  filter: "string",
  route: "string",
  todosPromise: {
    get: function(){

      if(!this.filter) {
        return Todo.getList({});
      } else {
        return Todo.getList({complete: this.filter === "complete"});
      }
    }
  },
  todosList: {
    get: function(initialValue, resolve){
      this.todosPromise.then(resolve);
    }
  },
  allChecked: {
    get: function(){
      return this.todosList && this.todosList.allComplete;
    },
    set: function(newVal){
      this.todosList && this.todosList.updateCompleteTo(newVal);
    }
  }
});

var template = can.stache.from("todomvc-template");

var vm = new AppVM();
can.route.map(vm);
can.route(":filter");
can.route.ready();

var frag = template(vm);
document.body.appendChild(frag);
```
<div line-highlight='40-57,128-135,only'/>

Update `HTML` to:

```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoMVC Guide 3.0 - Routing">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>

<script type='text/stache' id='todo-create-template'>
<input id="new-todo" placeholder="What needs to be done?"
    autofocus=""
    {($value)}="todo.name"
    ($enter)="createTodo()"/>
</script>

<script type='text/stache' id='todo-list-template'>
<ul id="todo-list">
  {{#each todos}}
    <li class="todo {{#if ./complete}}completed{{/if}}
      {{#if isDestroying}}destroying{{/if}}
      {{#if isEditing(.)}}editing{{/if}}">
      <div class="view">
        <input class="toggle" type="checkbox" {($checked)}="complete">
        <label ($dblclick)="edit(.)">{{name}}</label>
        <button class="destroy" ($click)="destroy()"></button>
      </div>
      <input class="edit" type="text"
        {($value)}="name"
        ($enter)="updateName()"
        ($blur)="cancelEdit()"/>
    </li>
  {{/each}}
</ul>
</script>

<script type="text/stache" id="todomvc-template">
<section id="todoapp">
	<header id="header">
		<h1>todos</h1>
		<todo-create/>
	</header>
	<section id="main" class="">
		<input id="toggle-all" type="checkbox"
          {($checked)}="allChecked"
          {$disabled}="todos.value.saving.length"/>
		<label for="toggle-all">Mark all as complete</label>
		<todo-list {todos}="todosPromise.value"/>
	</section>
	<footer id="footer" class="">
		<span id="todo-count">
			<strong>{{todosPromise.value.active.length}}</strong> items left
		</span>
		<ul id="filters">
			<li>
				<a href="{{routeUrl filter=undefined}}"
					{{#routeCurrent filter=undefined}}class='selected'{{/routeCurrent}}>All</a>
			</li>
			<li>
				<a href="{{routeUrl filter='active'}}"
					{{#routeCurrent filter='active'}}class='selected'{{/routeCurrent}}>Active</a>
			</li>
			<li>
				<a href="{{routeUrl filter='complete'}}"
					{{#routeCurrent filter='complete'}}class='selected'{{/routeCurrent}}>Completed</a>
			</li>
		</ul>
		<button id="clear-completed"
            ($click)="todosPromise.value.destroyComplete()">
			Clear completed ({{todosPromise.value.complete.length}})
		</button>
	</footer>
</section>
</script>

<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://rawgit.com/canjs/canjs/v3.0.0-pre.9/dist/global/can.all.js"></script>
</body>

</html>
```
<div line-highlight='45-47,69-70,only'/>
