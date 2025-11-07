@page learn-dom-jquery/functional-utilities Functional Utilities
@parent learn-dom-jquery 1
@description Create some of jQuery’s functional utility methods.

@body

## Overview

We will learn about:

- Extending objects by building `$.extend`
- Type checking by building `$.isArray` and `$.isArrayLike`
- Iterating objects and arrays by building `$.each`
- Binding functions to a particular context by building `$.proxy`

## Video

<iframe class="iframe-16-9" src="https://www.youtube.com/embed/ZyItGFJivaQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe class="iframe-4-3-plus-nav" src="https://docs.google.com/presentation/d/e/2PACX-1vQS1BOdGeK3-TEHbLt_mWjc7Z3TAd5dk6lFCDEvOy5cXLHzrYx7OsmVAP72vwDvTxJ_lLG0y5UqEUfc/embed?start=false&loop=false&delayms=3000" frameborder="0"allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Setup

Run the following example in CodePen:

```html
<div id="qunit"></div>
<div id="qunit-fixture"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css" />
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="//bitovi.github.io/academy/static/scripts/jquery-test.js"></script>
<script type="module">
  (function () {
    $ = function (selector) {};

    $.extend = function (target, object) {};

    // Static methods
    $.extend($, {
      isArray: function (obj) {},
      isArrayLike: function (obj) {},
      each: function (collection, cb) {},
      makeArray: function (arr) {},
      proxy: function (fn, context) {},
    });

    $.extend($.prototype, {
      // These will be added later.
    });
  })();
</script>
```

@codepen

Each exercise builds on the previous exercise. There is a completed solution
at the end of this page.

## Exercise: `$.extend( target, source ) -> target`

### The problem

[jQuery.extend](https://api.jquery.com/jquery.extend/) merges the contents of a `source`
object onto the `target` object.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.extend", function () {
  var target = { first: "Justin" },
    object = { last: "Meyer" };

  var result = $.extend(target, object);

  equal(result, target, "target and result are equal");
  deepEqual(
    result,
    { first: "Justin", last: "Meyer" },
    "properties added correctly"
  );
});
```

</details>

> **PRO TIP**: Use [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) in a modern app.

### What you need to know

- Loop through an object’s enumerable properties with a [for-in loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in):

  ```js
  var obj = { foo: "bar", zed: "ted" };
  for (var prop in obj) {
    console.log(prop); // Logs "foo" then "zed"
  }
  ```

  @codepen

- Read a property with a string using the `[]` [member operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors).

  ```js
  var obj = { foo: "bar" };
  var prop = "foo";
  console.log(obj[prop]); // Logs "bar"
  ```

  @codepen

- Assign a property with a string using the `[]` member operator:

  ```js
  var obj = {};
  var prop = "foo";
  obj[prop] = "bar";
  console.log(obj.prop); // Logs "bar"
  ```

  @codepen

- Use [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) to detect if an object has
  the specified property as it’s own property:

  ```js
  var obj = { foo: "bar" };
  console.log(obj.hasOwnProperty("foo")); // Logs true
  ```

  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
$.extend = function (target, object) {
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      target[prop] = object[prop];
    }
  }
  return target;
};
```

@highlight 2-7

</details>

## Exercise: `$.isArray( obj ) -> boolean`

### The problem

[jQuery.isArray](http://api.jquery.com/jquery.isarray/) determines whether the argument is an array.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.isArray", function () {
  equal($.isArray([]), true, "An array is an array");
  equal($.isArray(arguments), false, "Arguments are not an array");

  var iframe = document.createElement("iframe");
  document.body.appendChild(iframe);

  var IframeArray = iframe.contentWindow.Array;

  equal(
    $.isArray(new IframeArray()),
    true,
    "Arrays from other iframes are Arrays"
  );

  document.body.removeChild(iframe);
});
```

</details>

> **PRO TIP**: Use [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) in a modern app.

### What you need to know

- [Object.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) called on built-in types returns the object class name:

  ```js
  console.log(Object.prototype.toString.call(new Date()));
  // Logs "[object Date]"
  ```

  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },
```

@highlight 2

</details>

## Exercise: `$.isArrayLike(obj) -> boolean`

### The problem

jQuery uses an internal `isArrayLike` method to detect if an object looks like an
array. A value is array-like if:

- it is an object.
- the object has a number length property:
  - the length property is 0, or
  - the length is greater than 0 and there is a `length - 1` property.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.isArrayLike", function () {
  equal($.isArrayLike([]), true, "An array is array like");
  equal($.isArrayLike(arguments), true, "Arguments is array like");
  equal($.isArrayLike({ length: 0 }), true, "length: 0 is array like");
  equal(
    $.isArrayLike({ length: 5, 4: undefined }),
    true,
    "length > 0 and has property is array like"
  );

  equal($.isArrayLike(null), false, "Null is not array like");
  equal($.isArrayLike({}), false, "Plain object is not array like");
  equal($.isArrayLike({ length: -1 }), false, "length: -1 is not array like");
});
```

</details>

### What you need to know

- The [in operator ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) returns `true` if the specified property is in the specified object or its prototype chain.
  ```js
  var obj = { foo: "bar" };
  console.log("foo" in obj); // Logs true
  ```
  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    isArrayLike: function(obj) {
      return obj &&
        typeof obj === "object" &&
        (   obj.length === 0 ||
            typeof obj.length === "number" &&
            obj.length > 0 &&
            obj.length - 1 in obj );
    },
```

@highlight 2-7

</details>

## Exercise: `$.each( obj , cb(index, value) ) -> obj`

### The problem

[jQuery.each](http://api.jquery.com/jquery.each/) loops through objects and
arrays, calling the `cb` callback for each value.

```js
import "https://unpkg.com/jquery@3/dist/jquery.js";

var collection = ["a", "b"];
$.each(collection, function (index, item) {
  console.log(item + " is at index " + index);
  // logs "a is at 0"
  //      "b is at 1"
});

collection = { foo: "bar", zed: "ted" };
res = $.each(collection, function (prop, value) {
  console.log("prop: " + prop + ", value: " + value);
  // logs "prop: foo, value: bar"
  //      "prop: zed, value: ted"
});
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.each", function () {
  expect(9);
  var collection = ["a", "b"];
  var res = $.each(collection, function (index, value) {
    if (index === 0) equal(value, "a");
    else if (index === 1) equal(value, "b");
    else ok(false, "called back with a bad index");
  });
  equal(collection, res);

  collection = { foo: "bar", zed: "ted" };
  res = $.each(collection, function (prop, value) {
    if (prop === "foo") equal(value, "bar");
    else if (prop === "zed") equal(value, "ted");
    else ok(false, "called back with a bad index");
  });
  equal(collection, res);

  collection = { 0: "a", 1: "b", length: 2 };
  res = $.each(collection, function (index, value) {
    if (index === 0) equal(value, "a");
    else if (index === 1) equal(value, "b");
    else ok(false, "called back with a bad index");
  });
  equal(collection, res);
});
```

</details>

> Use [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) on arrays in apps.

### What you need to know

- Use a [for statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement) to loop through something array-like:
  ```js
  var items = ["a", "b", "c"];
  for (var i = 0; i < items.length; i++) {
    console.log(items[i]); // logs "a", "b", "c"
  }
  ```

### The solution

<details>
<summary>Click to see the solution</summary>

```js
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
```

@highlight 2-17

</details>

## Exercise: `$.makeArray`

### The problem

[jQuery.makeArray](https://api.jquery.com/jQuery.makeArray/) converts an array-like object into a true JavaScript array. For example, it can make arrays of the following:

```js
$.makeArray(document.body.childNodes);

$.makeArray(document.getElementsByTagName("*"));

$.makeArray(arguments);

$.makeArray($("li"));
```

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.makeArray", function () {
  var childNodes = document.body.childNodes;

  ok(!$.isArray(childNodes), "node lists are not arrays");

  var childArray = $.makeArray(childNodes);

  ok($.isArray(childArray), "made an array");

  equal(childArray.length, childNodes.length, "lengths are the same");

  for (var i = 0; i < childArray.length; i++) {
    equal(childArray[i], childNodes[i], "array index " + i + " is equal.");
  }
});
```

</details>

### What you need to know

You already know everything you need to know. You can do it!

> In modern apps, use [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) instead of `jQuery.makeArray`.

### The solution

<details>
<summary>Click to see the solution</summary>

```js
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
```

@highlight 2-7

</details>

## Exercise: `$.proxy`

### The problem

[jQuery.proxy](https://api.jquery.com/jQuery.proxy/) takes a function and returns a new one that will always have a particular context.

The following logs `"undefined says woof"` instead of `"fido says woof"`:

```js
var dog = {
  nickname: "fido",
  speak: function () {
    console.log(this.nickname + " says woof");
  },
};

setTimeout(dog.speak, 500);
```

@codepen

`$.proxy` fixes this:

```js
import "https://unpkg.com/jquery@3/dist/jquery.js";

var dog = {
  nickname: "fido",
  speak: function () {
    console.log(this.nickname + " says woof");
  },
};

setTimeout($.proxy(dog.speak, dog), 500);
```

@codepen

`$.proxy` can pass arguments too:

```js
import "https://unpkg.com/jquery@3/dist/jquery.js";

var dog = {
  nickname: "fido",
  speak: function (word) {
    console.log(this.nickname + " says " + word);
  },
};

var dogSpeak = $.proxy(dog.speak, dog);
dogSpeak("ruff"); // Logs 'fido says ruff'
```

@codepen

<details>
<summary>Click to see the test code</summary>

```js
QUnit.test("$.proxy", function () {
  var dog = {
    name: "fido",
    speak: function (words) {
      return this.name + " says " + words;
    },
  };

  var speakProxy = $.proxy(dog.speak, dog);

  equal(speakProxy("woof!"), "fido says woof!");
});
```

</details>

> **PRO TIP**: Use [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) or [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `$.proxy`.

### What you need to know

- Use [Function.prototype.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) to call a function with a specified `this`
  and arguments:

  ```js
  var cat = { name: "sparky" };

  var dog = {
    name: "fido",
    speak() {
      console.log(this.name + "says woof");
    },
  };

  dog.speak.apply(cat, []); // Logs "sparky says woof"
  ```

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    proxy: function(fn, context) {
      return function() {
        return fn.apply(context, arguments);
      };
    },
```

@highlight 2-7

</details>

## Completed Solution

<details>
<summary>Click to see completed solution</summary>

```html
<div id="qunit"></div>
<div id="qunit-fixture"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css" />
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="//bitovi.github.io/academy/static/scripts/jquery-test.js"></script>
<script type="module">
  (function () {
    $ = function (selector) {};

    $.extend = function (target, object) {
      for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
          target[prop] = object[prop];
        }
      }
      return target;
    };

    // Static methods
    $.extend($, {
      isArray: function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      },
      isArrayLike: function (obj) {
        return (
          obj &&
          typeof obj === "object" &&
          (obj.length === 0 ||
            (typeof obj.length === "number" &&
              obj.length > 0 &&
              obj.length - 1 in obj))
        );
      },
      each: function (collection, cb) {
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
      makeArray: function (arr) {
        if ($.isArray(arr)) {
          return arr;
        }
        var array = [];
        $.each(arr, function (i, item) {
          array[i] = item;
        });
        return array;
      },
      proxy: function (fn, context) {
        return function () {
          return fn.apply(context, arguments);
        };
      },
    });

    $.extend($.prototype, {
      // These will be added later.
    });
  })();
</script>
```

@codepen

@highlight 11-16, 22, 25-32, 35-50, 53-60, 63-66

</details>
