@page learn-dom-jquery/finding-elements Finding Elements
@parent learn-dom-jquery 2
@description Learn how to create a basic jQuery constructor function that can find elements in the page
and manipulate them.

@body

## Overview

We will learn to:

- Find elements in the document
- Create the `$` function
- Create `text`/`html`/`val` functions
- Find elements from an element and create `collection.find`
- Create a `find` function

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/SB8bWiyedv4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vR_aHX8TbUJ8hqrD2OalxvG9kjjq1wweo8Sz3HaCAPdyILn4QWKJhdxOeA9-UOzQLMB6J5E7FRPbZ2J/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

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
      html: function (newHtml) {},
      val: function (newVal) {},
      text: function (newText) {},
      find: function (selector) {},
    });
  })();
</script>
```

@codepen
@highlight 9,71-74,only

Each exercise builds on the previous exercise. There is a completed solution
at the end of this page.

## Exercise: `new $(selector) -> collection`

### The problem

The `$` function creates instances of a jQuery collection of elements. We will change `$()`
to be able to work without `new` later. But for now, `$` will be treated as a
constructor function. It should return an instance of `$` with:

- A `length` property equaling the number of elements matched by the `selector`.
- Enumerated properties (ex: `"0"`, `"1"`, `"2"`, etc) whose value is a matched element.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("new $(selector)", function () {
  document.getElementById("qunit-fixture").innerHTML = `
		<ul id="contacts">
			<li class="contact"/>
			<li class="contact"/>
		</ul>`;

  var $contacts = new $("#contacts li.contact");
  equal($contacts.length, 2, "There are 2 contacts");

  equal($contacts[0].nodeName.toLowerCase(), "li", "got an li");
  equal($contacts[1].className, "contact", "got a .contact");

  ok($contacts instanceof $, "$ is an instance of my_jquery");
});
```

</details>

### What you need to know

- [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) returns a NodeList of elements matching the selector.

  ```html
  <ul class="dogs">
    <li>fido</li>
    <li>rover</li>
  </ul>
  <ul class="cats">
    <li>sparkles</li>
  </ul>
  <script type="module">
    var elements = document.querySelectorAll(".dogs li");
    console.log(elements); // logs [<li>, <li>]
  </script>
  ```

  @codepen

- The `[]` member operator can create enumerated properties:

  ```js
  var obj = {};
  obj["0"] = "x";
  obj["1"] = "y";
  ```

  @codepen

- `Array.prototype.push` implementation looks like:

  ```js
  Array.prototype.push = function () {
    var length = this.length || 0;
    for (var i = 0; i < arguments.length; i++) {
      this[length + i] = arguments[i];
    }
    this.length = length + arguments.length;
  };
  ```

  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
$ = function (selector) {
  var elements = document.querySelectorAll(selector);
  [].push.apply(this, elements);
};
```

@highlight 2-3

</details>

## Exercise: `collection.html( [newHtml] )`

### The problem

[collection.html](http://api.jquery.com/html/) either:

- gets the HTML contents of the first element in the set of matched elements.

  ```html
  <ul class="dogs">
    <li><b>f</b>ido</li>
    <li>rover</li>
  </ul>
  <ul class="cats">
    <li>sparkles</li>
  </ul>
  <script type="module">
    import "https://unpkg.com/jquery@3/dist/jquery.js";
    var dogs = $(".dogs li");
    console.log(dogs.html()); //logs "<b>f</b>ido"
  </script>
  ```

  @codepen

- sets the HTML contents of each element in the set of matched elements
  and returns the collection.
  ```html
  <ul class="dogs">
    <li>fido</li>
    <li>rover</li>
  </ul>
  <ul class="cats">
    <li>sparkles</li>
  </ul>
  <script type="module">
    import "https://unpkg.com/jquery@3/dist/jquery.js";
    var dogs = $(".dogs li");
    dogs.html("<b>rover</b>"); //-> dogs
  </script>
  ```
  @codepen

Many of jQuery's methods either get or set depending on the number of arguments.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.html", function () {
  new $("#qunit-fixture").html(`
		<ul id="contacts">
			<li class="contact"></li>
			<li class="contact"></li>
		</ul>`);
  new $(".contact").html("Hi There");

  equal(
    new $(".contact").html(),
    "Hi There",
    "First contact html set correctly"
  );
  equal(
    new $(".contact:nth-child(2)").html(),
    "Hi There",
    "Second contact html set correctly"
  );
});
```

</details>

### What you need to know

- Use [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
  to set the html contents of an element.
- Use [arguments.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/length) to detect the number of arguments passed.

### The solution

<details>
<summary>Click to see the solution</summary>

```js
      html: function(newHtml) {
        if(arguments.length) {
          return $.each(this, function(i, element) {
            element.innerHTML = newHtml;
          });
        } else {
          return this[0].innerHTML;
        }
      },
```

@highlight 2-8

</details>

## Exercise: `collection.val( [newValue] )`

### The problem

[collection.val](http://api.jquery.com/val/) gets the current value of the first element in the set of matched elements or sets the value of every matched element.

```html
<input type="text" class="first" value="first" />
<input type="text" class="second" value="second" />
<script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";

  console.log($(".first").val()); //log "first"
  $(".second").val("SECOND");
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.val", function () {
  new $("#qunit-fixture").html(`
		<input type="text" class="age"/>
		<input type="text" class="age"/>`);

  equal(new $(".age").val(), "", "Input is initially empty");

  new $(".age").val("Hi There");

  equal(new $(".age").val(), "Hi There", "First .age value set correctly");

  equal(
    new $(".age:nth-child(2)").val(),
    "Hi There",
    "Second .age value set correctly"
  );
});
```

</details>

### What you need to know

- The `.value` property can be used to read and write an [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element's value.

### The solution

<details>
<summary>Click to see the solution</summary>

```js
      val: function(newVal) {
        if(arguments.length) {
          return $.each(this, function(i, element) {
            element.value = newVal;
          });
        } else {
          return this[0].value;
        }
      },
```

@highlight 2-8

</details>

## Exercise: `$(selector)`

### The problem

Lets remove the need to use `new` when using `$`.

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$(selector)", function () {
  document.getElementById("qunit-fixture").innerHTML = `
		<ul id="contacts">
			<li class="contact"/>
			<li class="contact"/>
		</ul>`;

  var $contacts = $("#contacts li.contact");
  equal($contacts.length, 2, "There are 2 contacts");

  equal($contacts[0].nodeName.toLowerCase(), "li", "got an li");
  equal($contacts[1].className, "contact", "got a .contact");

  ok($contacts instanceof $, "instanceof $ without new");
});
```

</details>

### What you need to know

- Use [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
  to tell if something is an instance of something else:

  ```js
  const Animal = function (name) {
    this.name = name;
  };
  const sponge = new Animal("bob");
  console.log(sponge instanceof Animal); //-> true
  ```

  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
$ = function (selector) {
  if (!(this instanceof $)) {
    return new $(selector);
  }
  var elements = document.querySelectorAll(selector);
  [].push.apply(this, elements);
};
```

@highlight 2-4

</details>

## Exercise: `collection.text( [newText] )`

### The problem

[collection.text](http://api.jquery.com/text/) get the combined text contents of each element in the set of matched elements, including their descendants, or sets the text contents of the matched elements.

```html
<ul class="dogs">
  <li>fido</li>
  <li>rover</li>
</ul>
<script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";
  var $ul = $(".dogs");
  console.log($ul.text()); //logs "\n\tfido\n\trover\n"

  var dogs = $(".dogs li");
  dogs.text("<b>rover</b>"); //-> dogs
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.text", function () {
  $("#qunit-fixture").html("Hi <span>there</span>.");

  equal($("#qunit-fixture").text(), "Hi there.", "The text is right");

  $("#qunit-fixture span").text("<input/>");

  equal($("#qunit-fixture input").length, 0, "there's no input");

  equal(
    $("#qunit-fixture span").text(),
    "<input/>",
    "The text is what we sent"
  );
});
```

</details>

### What you need to know

- [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
  can get and set the text content of an element.

For an _extra challenge_, don't use `textContent` and recursively collect
the `textContent`. For that, you'll need to know:

- Use [document.createTextNode](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)
  to create a text node.

- Text nodes have a [nodeType](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) of
  `3`. You can use `Node.TEXT_NODE` to get this value.

- Read [nodeValue](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
  to get the value of a [Text](https://developer.mozilla.org/en-US/docs/Web/API/Text) node.

- Use [appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) to add a text node to another element.

  ```js
  var textNode = document.createTextNode("My favorite element is <script>");

  console.log(textNode.nodeType === Node.TEXT_NODE);
  // logs true

  console.log(textNode.nodeValue);
  // logs "My favorite element is <script>"

  document.body.appendChild(textNode);
  ```

  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
      text: function(newText) {
        if (arguments.length) {
          return $.each(this, function(i, element) {
            element.textContent = newText;
          });
        } else {
          return this[0].textContent;
        }
      },
```

@highlight 2-8

</details>

<details>
<summary>Click to see the <i>extra challenge</i> solution</summary>

```js
var getText = function (childNodes) {
  var text = "";
  $.each(childNodes, function (i, child) {
    if (child.nodeType === 3) {
      text += child.nodeValue;
    } else {
      text += getText(child.childNodes);
    }
  });
  return text;
};
```

@highlight 1-11

```js
      text: function(newText) {
        if (arguments.length) {
          this.html("");
          return $.each(this, function(i, element) {
            const text = document.createTextNode(newText);
            element.appendChild( text );
          });
        } else {
          return getText(this[0]);
        }
      },
```

@highlight 2-10

</details>

## Exercise: `collection.find( selector )`

### The problem

[collection.find](https://api.jquery.com/find/) gets the descendants of each element in the current set of matched elements filtered by a selector.

```html
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">
    II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">
        B
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

  $("li.item-ii").find("li").css("border", "solid 1px red");
</script>
```

@codepen

<details>
<summary>Click to see test code</summary>

```js
QUnit.test("$.fn.find", function () {
  var $ul = $("#qunit-fixture")
    .html("<ul><li/><li/></ul><ul><li/><li/></ul>")
    .find("ul");

  equal($ul.length, 2, "got 2 uls");
  equal($ul.find("li").length, 4, "got four lis");
});
```

</details>

### What you need to know

- [Element.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll) can be used to find all elements that match a selector who are
  descendants of the element on which it was called
- The [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) can be used to push multiple items to an array.

  ```js
  const letters = ["a", "b"];
  const lettersToAdd = ["x", "y"];
  letters.push(...lettersToAdd);

  console.log(letters);
  // logs ["a","b","c","d"]
  ```

  @codepen

  This can be done with `Array.prototype.push.apply` in older browsers.

- You need to make `$()` accept an array of nodes similar to how jQuery does:

  ```html
  <div id="first">First</div>
  <span id="second">Second</div>
  <script type="module">
  import "https://unpkg.com/jquery@3/dist/jquery.js";

  $([first, second])
  	.css( "border", "solid 1px red" );
  </script>
  ```

  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
$ = function (selector) {
  if (!(this instanceof $)) {
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
```

@highlight 5-10

```js
      find: function(selector) {
        var elements = [];
        $.each(this, function(i, element){
            var result = element.querySelectorAll(selector);
            elements.push(...result);
            // Or elements.push.apply(elements, result);
        })
        return new $(elements);
      }
```

@highlight 2-8

</details>

## Bonus Exercise: Eliminate duplicate code in `.html`, `.val`, and `.text`

### The problem

Use meta programming techniques to reduce the duplicate code in the
`.html`, `.val`, and `.text` functions.

```js
      html: function(newHtml) {
        if(arguments.length) {
          return $.each(this, function(i, element) {
            element.innerHTML = newHtml;
          });
        } else {
          return this[0].innerHTML;
        }
      },
      val: function(newVal) {
        if(arguments.length) {
          return $.each(this, function(i, element) {
            element.value = newVal;
          });
        } else {
          return this[0].value;
        }
      },
      text: function(newText) {
        if (arguments.length) {
          return $.each(this, function(i, element) {
            element.textContent = newText;
          });
        } else {
          return this[0].textContent;
        }
      },
```

### What you need to know

- You can call a function that returns a function.
  ```js
  var makeLogger = function (text) {
    return function () {
      console.log(text);
    };
  };
  var logMe = makeLogger("me");
  logMe(); //logs "me"
  ```
  @codepen

### The solution

<details>
<summary>Click to see the solution</summary>

```js
function makeSimpleGetterSetter(prop) {
  return function (value) {
    if (arguments.length) {
      return $.each(this, function (i, element) {
        element[prop] = value;
      });
    } else {
      return this[0][prop];
    }
  };
}
```

@highlight 1-11

```js
      html: makeSimpleGetterSetter("innerHTML"),
      val: makeSimpleGetterSetter("value"),
      text: makeSimpleGetterSetter("textContent"),
```

@highlight 1-3

</details>

## Complete Solution

```html
<div id="qunit"></div>
<div id="qunit-fixture"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css" />
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>
<script src="//bitovi.github.io/academy/static/scripts/jquery-test.js"></script>
<script type="module">
  (function () {
    $ = function (selector) {
      if (!(this instanceof $)) {
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
      html: function (newHtml) {
        if (arguments.length) {
          return $.each(this, function (i, element) {
            element.innerHTML = newHtml;
          });
        } else {
          return this[0].innerHTML;
        }
      },
      val: function (newVal) {
        if (arguments.length) {
          return $.each(this, function (i, element) {
            element.value = newVal;
          });
        } else {
          return this[0].value;
        }
      },
      text: function (newText) {
        if (arguments.length) {
          return $.each(this, function (i, element) {
            element.textContent = newText;
          });
        } else {
          return this[0].textContent;
        }
      },
      find: function (selector) {
        var elements = [];
        $.each(this, function (i, element) {
          var result = element.querySelectorAll(selector);
          elements.push(...result);
          // Or elements.push.apply(elements, result);
        });
        return new $(elements);
      },
    });
  })();
</script>
```

@codepen
@highlight 9-18,82-88, 91-97,100-106,109-116,only
