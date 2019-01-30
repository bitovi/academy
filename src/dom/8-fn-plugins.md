@page dom-jquery-training/fn-plugins Fn Plugins
@parent dom-jquery-training 8
@description Learn how `$.fn` supports creating plugins.

@body


## Overview

In this section, we will:

- Learn why adding properties to `$.fn` creates
  functions on jQuery collections.

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vREXUyrOD4QZr4jCHLaJoLceHH8jxVXSLwXnPVrkqi959816CqAYJ3O--gNgueasoNwbtyCnJd4EuC5/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Exercise: `$.fn`


### The problem

Make adding methods to `$.fn` add methods to
jQuery collections.  


For example, you should
make it so if someone adds `myPlugin` as follows:

```js
$.fn.myPlugin = function(){
    this //-> $[<li>,<li>]
}
```

`myPlugin` will now be available on collections:

```js
$("li").myPlugin();
```


Adding a method to `$.fn`

<details>
<summary>Click to see test code</summary>
```js
QUnit.test("$.fn", function(){
	expect(2);

	var div = document.createElement("div");

	$.fn.myPlugin = function(){
		QUnit.equal(this.length, 1);
		QUnit.equal(this[0], div);
	};

	$([div]).myPlugin();

});
```
</details>

Use the following CodePen to complete this exercise:

@sourceref ./7-events-part-2-end.html
@codepen
@highlight 77-78,only



### What you need to know

- `$.fn` is an alias for the collection's constructor's prototype.

### The solution

@sourceref ./8-fn-plugins-end.html
@codepen
@highlight 78,only
