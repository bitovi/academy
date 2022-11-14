@page learn-dom-jquery/tabs-widget Tabs Widget
@parent learn-dom-jquery 9
@description Create a tabs widget using your own version of jQuery.

@body

## Overview

In this part, we will:

- Create a `$.fn.tabs` widget.

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTsGjQN8ZT5ZuHfAl8ZgevZmxj0lvQRwlrUhDvnboSE4NbmSmqJb-4A_W5NifhvE6JxOi0z36mfh0t5/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Exercise: `$.fn.tabs`

### The problem

Create a [progressively enhanced](https://en.wikipedia.org/wiki/Progressive_enhancement) tabs
widget. It will be called like:

```js
$("#breeds, #tech").tabs();
```

Notice that `.tabs()` can be called on multiple elements. An independent tabs widget should be created
on each element in the collection. The elements in the collection should be `<ul>` elements with the
following structure:

```html
<ul id="tech">
  <li><a href="#canjs">CanJS</a></li>
  <li><a href="#stealjs">StealJS</a></li>
  <li><a href="#donejs">DoneJS</a></li>
</ul>
<div id="canjs">
  <a href="https://canjs.com">CanJS</a>
</div>
<div id="stealjs">
  <a href="https://stealjs.com">StealJS</a>
</div>
<div id="donejs">
  <a href="https://donejs.com">DoneJS</a>
</div>
```

The `<ul>` elements will have `<li>` children which serve as the **buttons**. Each `<li>`
must contain an `<a>` element. The `<a>` element's `href` attributes reference the
`id` of a **tab** element to show when the corresponding `<li>` **button** element is
clicked.

For example when this `<li>` is clicked:

```html
<li><a href="#stealjs">StealJS</a></li>
```

The following **tab** element should be shown:

```html
<div id="stealjs">
  <a href="https://stealjs.com">StealJS</a>
</div>
```

Finally:

- Each `<ul>` should have `tabs` added to its `className`.
- Each **tab** element should have `tab` added to its `className`.

The following CodePen can be used to complete the exercise.

@sourceref ./9-tabs-widget-begin.html
@codepen
@highlight 113-117,only

### What you need to know

- An [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (IFFE)
  can be used to prevent variables and functions from being added to the global scope:

  ```js
  (function () {
    function activate(li) {
      // DO STUFF
      return li;
    }

    $.fn.tabs = function () {
      // can use activate
      activate();
    };
  })();

  // can NOT use activate
  activate(); //-> throws an error
  ```

- The following jQuery functions will be useful:
  - `$("#selector")` - Get a collection of elements using a CSS selector.
  - `$([element])` - Create a jQuery collection from an array of elements.
  - `collection.children()` - Return a collection of all direct descendants of elements in the source collection.
  - `collection.find(selector)` - Using a CSS selector, find elements descended from elements in the source collection.
  - `collection.addClass(className)` - Add a class name to elements in the collection.
  - `collection.removeClass(className)` - Remove elements in the collection.
  - `collection.show()` - Show elements in the collection.
  - `collection.hide()` - Hide elements in the collection.
  - `collection.bind(event, handler)` - Listen to an event.
  - `$.each(collection, cb(i, value) )` - Loop through an array-like collection
    of elements.

## Completed Solution

<details>
<summary>Click to see completed solution</summary>

@sourceref ./9-tabs-widget-end.html
@codepen
@highlight 113-158,only

</details>
