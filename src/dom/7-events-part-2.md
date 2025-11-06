@page learn-dom-jquery/events-part-2 Events Part 2
@parent learn-dom-jquery 7
@description Learn about event propagation and event delegation.
@body

## Overview

In this part, we will:

- Learn about event propagation
- Learn about event delegation

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT8tm1B2yfrIZxSPMtKhMHf_nCGgUbwu6kmDgOQqp6sskZqqmCMUvDmeYRBsQ8o_RECYtIwhFBHB0UM/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Video

<iframe class="responsive-iframe-16-9" src="https://www.youtube.com/embed/qoW-EYuESZA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Propagation Demo

The following listens to `click` on a nested body, div, and
anchor element in both the `capture` and `bubble` phase
and logs which handler is being dispatched.

See what happens:

- when different propagation methods are called
- when the DOM is modified during event dispatching

@sourceref ./propagation.html
@codepen
@highlight 6-12,16-18,30-32,only

## Delegation Demo

The following shows using event delegation to listen to
when any anchor is clicked in the page.

@sourceref ./delegation-1.html
@codepen
@highlight 15-19,only

Notice that when the `<span>` within the `<a>` is is clicked,
nothing is logged. This is because the `event.target`
was the `<span>` and not an `<a>`.

@sourceref ./delegation-2.html
@codepen
@highlight 15-23,only

## Setup

Run the following example in CodePen:

@sourceref ./7-events-part-2-begin.html
@codepen
@highlight 196-199,only

Each exercise builds on the previous exercise. There is a completed solution at the end of this page.

## Exercise: `collection.is(selector) -> boolean`

### The problem

[collection.is](https://api.jquery.com/is/) checks the current matched set of elements against a selector.

```js
import "https://unpkg.com/jquery@3/dist/jquery.js";

var elements = $([
  document.createElement("div"),
  document.createElement("span"),
]);

console.log(elements.is("div")); //-> true
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.is", function () {
  expect(3);

  var elements = $([
    document.createElement("div"),
    document.createElement("span"),
  ]);

  ok(elements.is("div"), "is div");
  ok(elements.is("span"), "is span");
  ok(!elements.is("a"), "is a");
});
```

</details>

### What you need to know

- [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) returns if an
  element matches a selector:

  ```html
  <div id="hello">Hello World</div>
  <script type="module">
    console.log(hello.matches("div")); //-> true
  </script>
  ```

@codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    is: function(selector){
      var matched = false;
      $.each(this, function(i, element){
        if( this.matches( selector) ) {
          matched = true;
        }
      });
      return matched;
    },
```

@highlight 2-8

</details>

## Exercise: `collection.data(key [, value])`

### The problem

[collection.data](https://api.jquery.com/data/) stores arbitrary data associated with the matched elements or return the value at the named data store for the first element in the set of matched elements.

```html
<div id="hello">Hello World</div>
<script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";

  $("#hello").data("foo", "bar");

  console.log($("#hello").data("foo")); //-> "bar"
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.data", function () {
  $("#qunit-fixture").html('<div id="el">text</div>');

  $("#el").data("foo", "bar");

  equal($("#el").data("foo"), "bar", "got back bar");
});
```

</details>

### What you need to know

- Use [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
  to store data associated with an object in such a way that when the object is removed the data
  will be also be removed from the `WeakMap` and available for garbage collection.

  ```js
  var map = new WeakMap();

  (function () {
    var key = { name: "key" };
    var value = { name: "value" };
    map.set(key, value);
  })();
  setTimeout(function () {
    console.log(map);
    // In chrome, you can see the contents of the weakmap
    // and it will not have the key and value.
  }, 500);
  ```

@codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    data: (function(){
      var data = new WeakMap();
      return function(propName, value) {
        if (arguments.length == 2) {
          // set the data for every item in the collection
          return $.each(this, function(i, el) {
            var elData = data.get(el);
            if (!elData) {
              elData = {};
              data.set(el, elData);
            }
            elData[propName] = value;
          });
        } else {
          // return the data in the first value
          var el = this[0], elData = data.get(el);
          return elData && elData[propName];
        }
      };
    })(),
```

@highlight 1-20

</details>

## Exercise: `collection.on(eventType, selector, handler)`

### The problem

[collection.on](https://api.jquery.com/on/) attaches a delegate event listener.

```html
<ul id="root">
  <li>First</li>
  <li>Second</li>
</ul>
<script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";

  $("#root").on("click", "li", function () {
    console.log("clicked an li");
  });
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.on", function () {
  expect(3);

  var handler = function () {
    equal(this.nodeName.toLowerCase(), "li", "called back with an LI");
  };

  var $ul = $("#qunit-fixture")
    .html(
      `
    	<ul>
    		<li><span id="one"/></li>
    		<li><span id="two"/></li>
    	</ul>`
    )
    .children();

  $ul.on("click", "li", handler);

  clickIt($("#one")[0]);
  clickIt($("#two")[0]);

  $ul.html('<li><span id="three"></span></li>');
  clickIt($("#three")[0]);
});
```

</details>

### What you need to know

- Instead of binding the `handler`, you’ll need to bind a `delegator` that
  will conditionally call the `handler`.
- Use `.data` to store the `delegator` and `handler` in an object
  like `{delegator, handler}`. That object should be stored in a data structure that
  looks like:
  ```js
  $([element]).data("events"); //-> {
  //   click: { li: [ {delegator, handler} ] }
  // }
  ```

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    on: function(eventType, selector, handler) {
      // Create delegator function
      var delegator = function(ev) {
        var cur = ev.target;
        do {
          if ( $([ cur ]).is(selector) ) {
            handler.call(cur, ev);
          }
          cur = cur.parentNode;
        } while (cur && cur !== ev.currentTarget);
      };

      return $.each(this, function(i, element) {
        // store delegators by event and selector in
        // $.data
        var events = $([ element ]).data("events"), eventTypeEvents;
        if (!events) {
          $([ element ]).data("events", events = {});
        }
        if (!(eventTypeEvents = events[eventType])) {
          eventTypeEvents = events[eventType] = {};
        }
        if (!eventTypeEvents[selector]) {
          eventTypeEvents[selector] = [];
        }
        eventTypeEvents[selector].push({
          handler: handler,
          delegator: delegator
        });
        element.addEventListener(eventType, delegator, false);
      });
    },

```

@highlight 2-31

</details>

## Exercise: `collection.off(eventType, selector, handler)`

### The problem

[collection.off](https://api.jquery.com/off/) stops listening for a delegate listener.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.off", function () {
  expect(0);

  var handler = function () {
    equal(this.nodeName.toLowerCase(), "li", "called back with an LI");
  };

  var $ul = $("#qunit-fixture")
    .html(
      `
    	<ul>
    		<li><span id="one"/></li>
    		<li><span id="two"/></li>
    	</ul>`
    )
    .children();

  $ul.on("click", "li", handler);
  $ul.off("click", "li", handler);

  clickIt($("#three")[0]);
});
```

</details>

### What you need to know

- You will need to find the delegate for the handler passed to `.off()` and then
  call `.removeEventListener`.

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    off: function(eventType, selector, handler) {
      return $.each(this, function(i, element) {
        // Find the delegator object for the handler
        // and remove it.
        var events = $([ element ]).data("events");
        if (events[eventType] && events[eventType][selector]) {
          var delegates = events[eventType][selector], i = 0;
          while (i < delegates.length) {
            if (delegates[i].handler === handler) {
              element.removeEventListener(eventType, delegates[i].delegator, false);
              delegates.splice(i, 1);
            } else {
              i++;
            }
          }
        }
      });
    }
```

@highlight 2-17

</details>

## Completed solution

<details>
<summary>Click to see completed solution</summary>

@sourceref ./7-events-part-2-end.html
@codepen
@highlight 197-203,205-222,224-253,256-272, only

</details>
