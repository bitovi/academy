@page advanced-javascript-training/closures Closures
@parent advanced-javascript-training 4
@description Join us as we cover closure scope in JavaScript!

@body

## Overview

- Pass by reference vs pass by value
- Basic closures
- Closure gotchas
- Self invoking, anonymous functions
- Exercise!

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y28w0TEV8g8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vS3Rvip0mm-RctR1rq2W8DlGh2dFiqr9FTbL70Q5dmkwjfMdWCd6p8tztldRm5ZRXoiJCbscDNUnb0P/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


## Exercise


### The problem

Build a tag library that creates elements of the following types in the least lines of code:  
`a`, `div`, `span`, `form`, `h1`, `h2`, `h3`, `h4`.

For example, you could use it like:

```js
var h1 = make.h1();
h1.innerHTML = 'Hello World';
document.body.appendChild(h1);

var a = make.a();
a.href= 'http://canjs.us';
a.innerHTML = 'CanJS';
document.body.appendChild(a);
```

Click the button at the bottom of the following to begin the exercise:

```html
<p>Welcome to the closures exercise! Open the JavaScript panel
    to implement the make functions. </p>
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>

<script type="module">
/* make util code here! */

const make = {};

make.h1 = function() {
	return document.createElement('h1');
};
make.a = function() {
	return document.createElement('a');
};

/* end make util code */

// Test code. There's no need to edit the following:
QUnit.test("make works", function(){
	var h1 = make.h1();
	h1.innerHTML = 'Hello World';
	document.body.appendChild(h1);
	var a = make.a();
	a.href= 'http://bitovi.com';
	a.innerHTML = 'Bitovi';
	document.body.appendChild(a);
	QUnit.equal(h1.nodeName, "H1", "h1 nodeName");
	QUnit.equal(a.nodeName,"A", "a nodeName");
	QUnit.ok(!/["']h1["']/.test(make.h1.toString()),
		"an 'h1' string is not hard coded in the function");

	[`a`, `div`, `span`, `form`, `h1`, `h2`, `h3`, `h4`].forEach(function(name){
		QUnit.equal(typeof make[name], "function", "make."+name+" exists");
	})
})
</script>
```
@codepen


### What you need to know

- Functions can return functions. For example, the following maps an array to an array
  of functions:
  ```js
  const numbers = [1,2,3,4];

  const squareFunctions = numbers.map( function(number){
    return function(){
      return number * number;
    }
  });

  console.log( squareFunctions[1]() ) //-> Logs 4
  ```
  @codepen
- `document.createElement('h1')` creates and returns an `<h1>` element.

### The solution

```html
<p>Welcome to the closures exercise! Open the JavaScript panel
    to implement the make functions. </p>
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>

<script type="module">
/* make util code here! */

const make = {};

[`a`, `div`, `span`, `form`, `h1`, `h2`, `h3`, `h4`].forEach(function(name){
	make[name] = function(){
		return document.createElement(name);
	}
});

/* end make util code */

// Test code. There's no need to edit the following:
QUnit.test("make works", function(){
	var h1 = make.h1();
	h1.innerHTML = 'Hello World';
	document.body.appendChild(h1);
	var a = make.a();
	a.href= 'http://bitovi.com';
	a.innerHTML = 'Bitovi';
	document.body.appendChild(a);
	QUnit.equal(h1.nodeName, "H1", "h1 nodeName");
	QUnit.equal(a.nodeName,"A", "a nodeName");
	QUnit.ok(!/["']h1["']/.test(make.h1.toString()),
		"an 'h1' string is not hard coded in the function");

	[`a`, `div`, `span`, `form`, `h1`, `h2`, `h3`, `h4`].forEach(function(name){
		QUnit.equal(typeof make[name], "function", "make."+name+" exists");
	})
})
</script>
```
@codepen
@highlight 12-16
