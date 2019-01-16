@page dom-jquery-training/functional-utilities Functional Utilities
@parent dom-jquery-training 1
@description

@body

## Overview

We will learn about:

- Extending objects by building `$.extend`
- Type checking by building `$.isArray` and `$.isArrayLike`
- Iterating objects and arrays by building `$.each`
- Binding functions to a particular context by building `$.proxy`

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZyItGFJivaQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQS1BOdGeK3-TEHbLt_mWjc7Z3TAd5dk6lFCDEvOy5cXLHzrYx7OsmVAP72vwDvTxJ_lLG0y5UqEUfc/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Exercise: `$.extend`

### The problem

[jQuery.extend](https://api.jquery.com/jquery.extend/) merge the contents of of an object
onto another object.



## Exercise: `$.isArray`

## Exercise: `$.isArrayLike`

## Exercise: `$.each`

## Exercise: `$.makeArray`

## Exercise: `$.proxy`



## Solution

```html
<div id="qunit"></div>
<div id="qunit-fixture"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="//bitovi.github.io/university/static/scripts/jquery-test.js"></script>
<script type="module">
(function() {
  $ = function(selector) {};

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

  $.extend($.prototype, {
    // These will be added later.
  });

})();
</script>

```
@codepen
