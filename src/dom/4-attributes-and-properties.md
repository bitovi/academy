@page learn-dom-jquery/attributes-and-properties Attributes and Properties
@parent learn-dom-jquery 4
@description Learn about the attributes and properties on an element.
@body

## Overview

We will learn about:

- The difference between attributes and properties
- How to set and read styles on an element

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQQSSVUteY_8gHdxcxuVeGXX548wxO_i_BfxGiohaYTuR_lskKGFIg9rCc-zfP-KIvckvqn2UvAOJ0O/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Setup

Run the following example in CodePen:

@sourceref ./4-attributes-and-properties-begin.html
@codepen
@highlight 138-141,only

Each exercise builds on the previous exercise. There is a completed solution
at the end of this page.

## Exercise: `collection.attr( attrName [,value] )`

### The problem

[collection.attr](http://api.jquery.com/attr/) either:

- Gets the value of an attribute for the first element in the set of matched elements, or
- sets one or more attributes for every matched element.

```html
<a id="link-less">Bitovi</a>
<script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";

  $("a").attr("href", "https://bitovi.com");
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.attr", function () {
  equal($("#qunit-fixture").attr("id"), "qunit-fixture", "can read id");

  $("#qunit-fixture").html("<span></span><span></span>");

  $("#qunit-fixture span").attr("foo", "bar");

  equal(
    $("#qunit-fixture span")[0].getAttribute("foo"),
    "bar",
    "attribute set successfully"
  );
  equal(
    $("#qunit-fixture span")[1].getAttribute("foo"),
    "bar",
    "attribute set successfully"
  );

  $("#qunit-fixture span")[0].setAttribute("foo", "BAR");

  equal(
    $("#qunit-fixture span").attr("foo"),
    "BAR",
    "read the first item in the collection’s attr"
  );
});
```

</details>

### What you need to know

- [getAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) reads an attribute value
- [setAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) sets an attribute value

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    attr: function(attrName, value) {
      if (arguments.length == 2) {
        return $.each(this, function(i, element) {
          element.setAttribute(attrName, value);
        });
      } else {
        return this[0] && this[0].getAttribute(attrName);
      }
    },

```

@highlight 2-8

</details>

## Exercise: `collection.css( propertyName [,value] )`

### The problem

[collection.css](http://api.jquery.com/css/) either:

- Gets the value of a computed style property for the first element in the set of matched elements,
- or sets one or more CSS properties for every matched element.

```html
<div>Foo Bar</div>
<script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";

  $("div").css("backgroundColor", "green");
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.css", function () {
  $("#qunit-fixture").html("<span>Content</span><span>Second</span>");

  equal($("#qunit-fixture span").css("padding-left"), "20px");

  $("#qunit-fixture span").css("paddingLeft", "40px");

  equal(
    $("#qunit-fixture span").css("padding-left"),
    "40px",
    "first span set to 40px"
  );
  equal(
    $("#qunit-fixture span:nth-child(2)").css("padding-left"),
    "40px",
    "second span set to 40px"
  );
});
```

</details>

### What you need to know

- The [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property
  is used to set and get the inline style of an element.

  ```html
  <div id="theDiv">theDiv</div>
  <script type="module">
    theDiv.style.color = "red";

    console.log(theDiv.outerHTML);
    //logs "<div id="theDiv" style="color: red;">theDiv</div>"
  </script>
  ```

@codepen

- The [window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)
  returns an object containing the values of all CSS properties of an element.

  ```html
  <p id="theP">Hello</p>
  <style>
    p {
      color: green;
    }
  </style>
  <script type="module">
    let computedStyles = window.getComputedStyle(theP);
    console.log(computedStyles.getPropertyValue("color"));
    // logs "rgb(0, 128, 0)"
  </script>
  ```

  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
    css: function(cssPropName, value) {
      if (arguments.length == 2) {
        return $.each(this, function(i, element) {
          element.style[cssPropName] = value;
        });
      } else {
        return this[0] &&
          window.getComputedStyle(this[0])
            .getPropertyValue(cssPropName);
      }
    },
```

@highlight 2-10

</details>

## Bonus Exercise: `collection.addClass(className)` and `collection.removeClass(className)`

### The problem

[collection.addClass](https://api.jquery.com/addclass/) adds a class to each element’s `className`.
[collection.removeClass](https://api.jquery.com/removeclass/) removes a class to each element’s `className`.

The following changes the `<div>` from green to red after one second.

```html
<style>
  .red {
    background-color: red;
  }
  .green {
    background-color: green;
  }
</style>
<div class="red" id="hi">Hello</div>
<script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";

  setTimeout(function () {
    $("#hi").addClass("green").removeClass("red");
  }, 1000);
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.addClass and $.fn.removeClass", function () {
  var count = function (reg, str) {
    var c = 0;
    str.replace(reg, function () {
      c++;
    });
    return c;
  };

  var $divs = $("#qunit-fixture")
    .html('<div class="foo"></div><div class="foob"></div>')
    .children();

  $divs.addClass("foo");

  equal(1, count(/foo/, $divs[0].className), "only one foo");
  equal(1, count(/foo/, $divs[1].className), "only one foo");

  $divs.addClass("foob");

  equal(1, count(/foob/, $divs[0].className), "only one foo");
  equal(1, count(/foob/, $divs[1].className), "only one foo");

  $divs.removeClass("foob");
  equal(0, count(/foob/, $divs[0].className), "only one foo");
  equal(0, count(/foob/, $divs[1].className), "only one foo");

  $divs.removeClass("foo");
  equal(0, count(/foo/, $divs[0].className), "only one foo");
  equal(0, count(/foo/, $divs[1].className), "only one foo");
});
```

</details>

### What you need to know

- An element’s [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
  lets you add and remove class names on it.

  ```html
  <style>
    .red {
      background-color: red;
    }
    .green {
      background-color: green;
    }
  </style>
  <div class="red" id="hi">Hello</div>
  <script type="module">
    setTimeout(function () {
      hi.classList.add("green");
      hi.classList.remove("red");
    }, 1000);
  </script>
  ```

@codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
      addClass: function(className) {
        return $.each(this, function(i, element) {
          element.classList.add(className);
        });
      },
      removeClass: function(className) {
        return $.each(this, function(i, element) {
          element.classList.remove(className);
        });
      }
```

@highlight 2-9

</details>

## Complete Solution

<details>
<summary>Click to see completed solution</summary>

@sourceref ./4-attributes-and-properties-end.html
@codepen
@highlight 139-145,148-156,159-167,only

</details>
