@page dom-jquery-training/traversing-elements Traversing Elements
@parent dom-jquery-training 3
@description Learn how to move from one element to the next and a bit of meta programming.


@body

## Overveiw

We will learn about:

- Creating next/prev/parent/children functions
- Re-factoring methods

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/fDjdaO2XtP0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRjiGAVqwMHNDiV1g0oWkCW5CZTvNXKGcmb1xJszsD7Z479EJTmRCXnzhjkuJj2fru_vOYxZw-sb7t1/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Setup

Run the following example in CodePen:

```html
<div id="qunit"></div>
<div id="qunit-fixture"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="//bitovi.github.io/academy/static/scripts/jquery-test.js"></script>
<script type="module">
(function() {
  $ = function(selector) {
    if ( !(this instanceof $) ) {
      return new $(selector);
    }
    var elements;
    if (typeof selector === "string") {
      elements = document.querySelectorAll(selector);
    } else if ($.isArrayLike(selector)) {
      elements = selector;
    }
    [].push.apply(this, elements);
  };

  $.extend = function(target, object) {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        target[prop] = object[prop];
      }
    }
    return target;
  };

  // Static methods
  $.extend($, {
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },
    isArrayLike: function(obj) {
      return obj &&
        typeof obj === "object" &&
        (   obj.length === 0 ||
            typeof obj.length === "number" &&
            obj.length > 0 &&
            obj.length - 1 in obj );

    },
    each: function(collection, cb) {
      if ($.isArrayLike(collection)) {
        for (var i = 0; i < collection.length; i++) {
          if (cb.call(this, i, collection[i]) === false) {
            break;
          }
        }
      } else {
        for (var prop in collection) {
          if (collection.hasOwnProperty(prop)) {
            if (cb.call(this, prop, collection[prop]) === false) {
              break;
            }
          }
        }
      }
      return collection;
    },
    makeArray: function(arr) {
      if ($.isArray(arr)) {
        return arr;
      }
      var array = [];
      $.each(arr, function(i, item) {
        array[i] = item;
      });
      return array;
    },
    proxy: function(fn, context) {
      return function() {
        return fn.apply(context, arguments);
      };
    }
  });

  function makeSimpleGetterSetter(prop) {
    return function(value){
      if(arguments.length) {
        return $.each(this, function(i, element) {
          element[prop] = value;
        });
      } else {
        return this[0][prop];
      }
    }
  }

  $.extend($.prototype, {
      html: makeSimpleGetterSetter("innerHTML"),
      val: makeSimpleGetterSetter("value"),
      text: makeSimpleGetterSetter("textContent"),
      find: function(selector) {
        var elements = [];
        $.each(this, function(i, element){
            var result = element.querySelectorAll(selector);
            elements.push(...result);
            // Or elements.push.apply(elements, result);
        })
        return new $(elements);
      },
      parent: function() { },
      next: function() { },
      prev: function() { },
      children: function() { }
  });

})();
</script>

```
@codepen
@highlight 104-107,only

Each exercise builds on the previous exercise.  There is a completed solution
at the end of this page.

## Exercise: `collection.parent() -> collection`

### The problem

[collection.parent](https://api.jquery.com/parent/) gets the parent of each element in the current set of matched elements.

```html
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>
<script type="module">
import "https://unpkg.com/jquery@3/dist/jquery.js";

$( "li.item-a" ).parent().css( "border", "solid 1px red" );
</script>
```
@codepen


<details>
<summary>Click to see test code</summary>
```js
QUnit.test('$.fn.parent', function(){
	var $lis = $('#qunit-fixture')
		.html('<ul><li/><li/></ul><ul><li/><li/></ul>')
		.find('li:first-child');

	equal($lis.length, 2, 'got 2 uls');
	equal($lis.parent().length, 2, 'got 2 lis');
});
```
</details>

### What you need to know

- The [parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode) property
  returns an elements parent node.

### The solution

<details>
<summary>Click to see the solution</summary>
```js
      parent: function() {
        var parents = [];
        $.each(this, function(i, element){
          parents.push(element.parentNode)
        });
        return $(parents);
      },
```
</details>


## Exercise: `collection.next() -> collection`

### The problem

[collection.next](https://api.jquery.com/next/) gets the immediately following sibling of each element in the set of matched elements.


```html
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
<script type="module">
import "https://unpkg.com/jquery@3/dist/jquery.js";

$( "li.third-item" ).next().css( "border", "solid 1px red" );
</script>
```
@codepen


<details>
<summary>Click to see test code</summary>
```js
QUnit.test('$.fn.next', function(){
	var $lis = $('#qunit-fixture')
		.html('<ul> <li></li> <li></li> </ul> <ul> <li></li> <li></li> </ul>')
		.find('li:first-child');

	equal($lis.length, 2, 'got 2 lis');
	equal($lis.next().length, 2, 'got 2 lis');
	equal($lis.next().next().length, 0, 'got 0 lis');
});
```
</details>

### What you need to know

- [nextElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling)
  returns the element immediately following the specified one in its parent's children list, or `null` if the specified element is the last one in the list.

### The solution

<details>
<summary>Click to see the solution</summary>
```js
      next: function() {
        var nexts = [];
        $.each(this, function(i, element){
          if(element.nextElementSibling) {
            nexts.push( element.nextElementSibling );
          }
        });
        return $(nexts);
      },
```
</details>


## Exercise: `collection.prev() -> collection`

### The problem

[collection.prev](https://api.jquery.com/prev/) get the immediately preceding sibling of each element in the set of matched elements.

<details>
<summary>Click to see test code</summary>
```js
QUnit.test('$.fn.prev', function(){
	var $lis = $('#qunit-fixture')
		.html('<ul><li/><li/></ul><ul><li/><li/></ul>')
		.find('li:last-child');

	equal($lis.length, 2, 'got 2 uls');
	equal($lis.prev().length, 2, 'got 2 lis');
	equal($lis.prev().prev().length, 0, 'got 2 lis');
});
```
</details>

### What you need to know

- [previousElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling)
  returns the Element immediately prior to the specified one in its parent's children list, or `null` if the specified element is the first one in the list.

### The solution

<details>
<summary>Click to see the solution</summary>
```js
      prev: function() {
        var prevs = [];
        $.each(this, function(i, element){
          if(element.previousElementSibling) {
            prevs.push( element.previousElementSibling );
          }
        });
        return $(prevs);
      },
```
</details>

## Exercise: `collection.children() -> collection`

### The problem

[collection.children](https://api.jquery.com/children/) get the children of each element in the set of matched elements.

```html
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>
<script type="module">
import "https://unpkg.com/jquery@3/dist/jquery.js";

$( "ul.level-2" ).children().css( "border", "solid 1px red" );
</script>
```
@codepen

<details>
<summary>Click to see test code</summary>
```js
QUnit.test('$.fn.children', function(){
	var $ul = $('#qunit-fixture')
		.html('<ul><li/><li/></ul><ul><li/><li/></ul>')
		.children();

	equal($ul.length, 2, 'got 2 uls');
	equal($ul.children().length, 4, 'got four lis');
});
```
</details>

### What you need to know

- [children](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children) returns
  the child elements of the node upon which it was called.

### The solution

<details>
<summary>Click to see the solution</summary>
```js
      children: function() {
        var children = [];
        $.each(this, function(i, element){
          children.push(...element.children );
        });
        return $(children);
      },
```
</details>

## Exercise: eliminate duplicate code in `.find`, `.parent`, `.next`, `.prev`, and `.children`.

### The problem

Use meta programming techniques to reduce the duplicate code in the `.find`, `.parent`, `.next`, `.prev`, and `.children`
functions.

```js
      find: function(selector) {
        var elements = [];
        $.each(this, function(i, element){
            var result = element.querySelectorAll(selector);
            elements.push(...result);
            // Or elements.push.apply(elements, result);
        })
        return new $(elements);
      },
      parent: function() {
        var parents = [];
        $.each(this, function(i, element){
          parents.push(element.parentNode)
        });
        return $(parents);
      },
      next: function() {
        var nexts = [];
        $.each(this, function(i, element){
          if(element.nextElementSibling) {
            nexts.push( element.nextElementSibling );
          }
        });
        return $(nexts);
      },
      prev: function() {
        var prevs = [];
        $.each(this, function(i, element){
          if(element.previousElementSibling) {
            prevs.push( element.previousElementSibling );
          }
        });
        return $(prevs);
      },
      children: function() {
        var children = [];
        $.each(this, function(i, element){
          children.push(...element.children );
        });
        return $(children);
      },
```

Make a `makeTraverser(traverse)` function that takes a `traverse` function and
produces a function.  

The `traverse` function should be called for each element in
the source collection. When calling `traverse`, it's `this` should be each element.

The `traverse` functions should be able to return `null` and `element` or an array-like
object of `elements`.

### What you need to know

You know everything you need to know. You can do it!

### The solution

<details>
<summary>Click to see the solution</summary>

```js
  function makeTraverser(traverser) {
    return function() {
      var elements = [], args = arguments;
      $.each(this, function(i, element) {
        var els = traverser.apply(element, args);
        if ($.isArrayLike(els)) {
          elements.push.apply(elements, els);
        } else if (els) {
          elements.push(els);
        }
      });
      return $(elements);
    };
  }
```

```js
      find: makeTraverser(function(selector) {
        return this.querySelectorAll(selector);
      }),
      parent: makeTraverser(function() {
        return this.parentNode;
      }),
      next: makeTraverser(function() {
        return this.nextElementSibling;
      }),
      prev: makeTraverser(function() {
        return this.previousElementSibling;
      }),
      children: makeTraverser(function() {
        return this.children;
      })
```
</details>

## Completed Solution

@sourceref ./3-traversing-elements-end.html
@codepen
@highlight 122-136,only
