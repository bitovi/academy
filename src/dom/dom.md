@page learn-dom-jquery DOM and jQuery
@parent bit-academy 2

@description Learn jQuery and the DOM APIs by building your own version of jQuery and
using it to make a basic tabs widget. We strongly suggest finishing [learn-advanced-javascript] prior to starting this course.

@body

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4" style="display:flex;align-items:center">
<img alt="" src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to jQuery and the DOM in the [JS and DOM chat room](https://discord.gg/qxqgyGquk7).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

The end result of this training is to build a basic, [progressively enhanced](https://en.wikipedia.org/wiki/Progressive_enhancement) tabs widget that looks like:

<img src="./static/img/dog-tabs.png" width="50%"/>

We will be creating simple versions of many of jQuery’s most useful methods:

```js
$ = function (selector) {
  /*...*/
};

$.extend($.prototype, {
  html: function (string) {
    /*...*/
  },
  val: function (value) {
    /*...*/
  },
  text: function (string) {
    /*...*/
  },
  find: function (el) {
    /*...*/
  },
  next: function () {
    /*...*/
  },
  prev: function () {
    /*...*/
  },
  parent: function () {
    /*...*/
  },
  children: function () {
    /*...*/
  },
  attr: function (attr, val) {
    /*...*/
  },
  css: function (style, val) {
    /*...*/
  },
  width: function () {
    /*...*/
  },
  hide: function () {
    /*...*/
  },
  show: function () {
    /*...*/
  },
});
```

Then we will write a tabs widget:

```js
$.fn.tabs = function () {
  /*...*/
};
```

## Prerequisites

Creating jQuery requires meta programming
(functions that take functions that return functions). We encourage participants to
finish the [learn-advanced-javascript] course before beginning this training.

## Next steps

✏️ Head over to the [first lesson](learn-dom-jquery/functional-utilities.html) to get set up and start learning about functional utilities.
