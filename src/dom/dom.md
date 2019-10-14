@page learn-dom-jquery DOM and jQuery
@parent bit-academy 2

@description Learn jQuery and the DOM APIs by building your own version of jQuery and
using it to make a basic tabs widget.


@body

## Before You Begin

<a href="https://www.bitovi.com/community/slack">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to jQuery and the DOM in the [JS and DOM chat room](https://bitovi-community.slack.com/messages/CFMMNSV5X).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

The end result of this training is to build a basic, [progressively enhanced](https://en.wikipedia.org/wiki/Progressive_enhancement), tabs widget that looks like:


<img src="./static/img/dog-tabs.png" width="50%"/>

We will be creating simple versions of many of jQuery's most useful methods:


```js
$ = function(selector) { /*...*/ };

$.extend($.prototype, {
	html: function(string) {    /*...*/ },
	val: function(value) {      /*...*/ },
	text: function(string) {    /*...*/ },
	find: function(el) {        /*...*/ },
	next: function() {          /*...*/ },
	prev: function() {          /*...*/ },
	parent: function() {        /*...*/ },
	children: function() {      /*...*/ },
	attr: function(attr, val) { /*...*/ },
	css: function(style, val) { /*...*/ },
	width: function() {         /*...*/ },
	hide: function() {          /*...*/ },
	show: function() {          /*...*/ }
});
```

Then we will write a tabs widget:

```js
$.fn.tabs = function(){ /*...*/ }
```

## Prerequisites

Creating jQuery requires meta programming
(functions that take functions that return functions).  We encourage participants to
finish the [learn-advanced-javascript] course before beginning this training.
