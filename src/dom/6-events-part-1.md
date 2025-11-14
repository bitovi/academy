@page learn-dom-jquery/events-part-1 Events Part 1
@parent learn-dom-jquery 6

@description Learn the basics of DOM events.

@body

## Overview

In this part, we will:

- Learn how to listen to events on an element
- Explore the events the browser supports
- Implement `$.fn.bind` and `$.fn.unbind`

## Video

<iframe class="iframe-16-9" src="https://www.youtube.com/embed/qoW-EYuESZA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe class="iframe-4-3-plus-nav" src="https://docs.google.com/presentation/d/e/2PACX-1vQGzElV5YC_q8hOcumq38Xi4IeRDnK94gABK_KvFRGWSbdgeTMGtefBWUu1dfqiiKGY-_jejqONDiYe/embed?start=false&loop=false&delayms=3000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Setup

Run the following example in CodePen:

@sourceref ./6-events-part-1-begin.html
@codepen
@highlight 186-187,only

Each exercise builds on the previous exercise. There is a completed solution at the end of this page.

## Events List

The following lists most of the DOM's events and lets you see how they work - Be sure to run in Codepen for a demonstration!

@sourceref ./events.html
@codepen
@highlight 25,only

## mouseenter vs mouseout

The following shows why mouseenter is usually prefered over mouseover - Be sure to run in Codepen for a demonstration!

@sourceref ./mouse-enter-v-out.html
@codepen
@highlight 9,only

## Exercise: `collection.bind` and `collection.unbind`

### The problem

[collection.bind](http://api.jquery.com/bind/) adds an event handler to elements in the
collection. [collection.unbind](http://api.jquery.com/unbind/) removes an event handler to elements in the
collection.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.bind and $.fn.unbind", function () {
  expect(2);

  $("#qunit-fixture").html('<div id="el">text</div>');

  var handler = function (ev) {
    equal(this.nodeName.toLowerCase(), "div", "event called on div");
    equal(ev.type, "click", "click event");
  };

  $("#el").bind("click", handler);

  clickIt($("#el")[0]);

  $("#el").unbind("click", handler);

  clickIt($("#el")[0]);
});
```

</details>

### What you need to know

- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  adds an event listener to a target element:

  ```html
  <div>click me</div>
  <script type="module">
    document.body.addEventListener(
      "click",
      function (event) {
        console.log(event.target, "clicked");
      },
      false
    );
  </script>
  ```

@codepen

- [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
  removes an event listener to a target element. The following removes the `handler` event
  handler after the first click.

  ```html
  <div>click me and I log only once</div>
  <script type="module">
    function handler(event) {
      console.log(event.target, "clicked");
      document.body.removeEventListener("click", handler, false);
    }
    document.body.addEventListener("click", handler, false);
  </script>
  ```

  @codepen

## Complete solution

<details>
<summary>Click to see completed solution</summary>

@sourceref ./6-events-part-1-end.html
@codepen
@highlight 187-189,192-195,only

</details>
