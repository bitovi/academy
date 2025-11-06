@page learn-advanced-javascript/context Context
@parent learn-advanced-javascript 5
@description What is "this"? Learn about context and build your very own `.` operator!

@body

## Overview

- Rules for setting context
- proto & prototype: A visual representation
- Exercise!

## Video

<iframe class="responsive-iframe-16-9" src="https://www.youtube.com/embed/xIk-xrutg1A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides


<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRDWpyoIigNDi3gzxIA4iSGtla5SCvbTVNk9b3sBmbWW1fWrPaWNq5K5PTPPwGdNX9ZicPmWtU-tCJM/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


## Exercise: DOT operator

### The problem

Write the __DOT__ (`.`) operator as if it was implemented in JS as a function.

For example, the following uses the `DOT` operator to read properties from `person`:


```js
var Person = function(name) {
	this.name = name;
}
Person.prototype.isPerson = true;

var person = new Person('Smith');
DOT(person, 'name');        //person.name
DOT(person, 'isPerson');    //person.isPerson
```

To solve this problem, __DOT__ should read from the proto chain. While it can be implemented
as simple as the following:

```js
const DOT = function(obj, property){
	return obj[property];
}
```

You should instead only use the `[]` property accessor when you know the object has
that direct property.

To get started, click the button at the bottom of the following:

```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>

<script type="module">
/* start DOT code here */
function DOT(object, property) {

}
/* end DOT code */

// Test code. There’s no need to edit the following:
QUnit.test("DOT works", function(){
	var Person = function(name){
		this.name = name;
	}

	Person.prototype.species = 'Homo Sapien';
	Person.prototype.speak =function(toWhom) {
		return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
	}

	var person = new Person('Alexis');
	var species = DOT(person, 'species');
	var toString = DOT(person, 'toString');

	QUnit.equal(species, 'Homo Sapien', 'property accessed');
	QUnit.equal(toString, Object.prototype.toString,
		'Object.prototype.toString accessed');
	QUnit.equal(DOT(person, 'foobar'), undefined, 'property not found');

});
</script>

```
@codepen
@highlight 7-9,only


### What you need to know

- The `DOT` function will take an object and a property name as a string.
- [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) returns if an object has a direct property:
  ```js
  var obj = {foo: "bar"};
  console.log( obj.hasOwnProperty("foo") ) // Logs: true
  ```
  @codepen

- [Object.getPrototypeOf(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) returns the `__proto__` value of the passed obj.  This is the
  recommended way of reading the `__proto__` property.
  ```js
  var date = new Date()
  console.log( Object.getPrototypeOf(date) === Date.prototype ) // Logs: true
  ```
  @codepen

- Recursive functions call themselves to answer a sub-problem:
  ```js
  function factorial(number){
    if (number === 0) {
      return 1;
    } else {
      return number * factorial(number-1);
    }
  }
  console.log( factorial(4) ) // Logs: 24
  ```
  @codepen

### The solution

```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.12.0.css">
<script src="//code.jquery.com/qunit/qunit-1.12.0.js"></script>

<script type="module">
/* start DOT code here */
function DOT(object, property) {
	if( Object.prototype.hasOwnProperty.call(object, property) ) {
		return object[property];
	}
	var proto = Object.getPrototypeOf(object);
	if( proto ) {
		return DOT(proto, property);
	}
}
/* end DOT code */

// Test code. There’s no need to edit the following:
QUnit.test("DOT works", function(){
	var Person = function(name){
		this.name = name;
	}

	Person.prototype.species = 'Homo Sapien';
	Person.prototype.speak =function(toWhom) {
		return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
	}

	var person = new Person('Alexis');
	var species = DOT(person, 'species');

	QUnit.equal(species, 'Homo Sapien', 'property accessed');
	QUnit.equal(DOT(person, 'foobar'), undefined, 'property not found');
});
</script>

```
@codepen
@highlight 7-15,only

## Exercise: DOTCALL operator

### The problem

Write the dot (`.`) `[[call]]` operator as if it was implemented in JS.

For example, instead of calling `person.speak("Hi")`, we will call it as
`DOTCALL(person,"speak",["Hi"])` as follows:

```js
const Person = function(name) {
	this.name = name;
}

Person.prototype.speak = function(message){
  console.log(message + ' ' + this.name);
}
var person = new Person('Smith');

DOTCALL(person,"speak",["Hi"])  //person.speak("Hi")
```

`DOTCALL( obj, prop, args )` will take:

- __obj__ - the context of the function to call.
- __prop__ - the property name to lookup.
- __args__ - an array of arguments to pass to the function.

To get started, click the __Run in your browser__ button at the bottom of the following code sample:

```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
<script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
<script type="module">
// The DOT operator will be useful
function DOT(object, property) {
    if( Object.prototype.hasOwnProperty.call(object, property) ) {
        return object[property];
    }
    var proto = Object.getPrototypeOf(object);
    if( proto ) {
        return DOT(proto, property);
    }
}

function DOTCALL(obj, prop, args){

}
</script>
<script>
QUnit.test('DOTCALL works', function() {

	var Person = function(name){
		this.name = name;
	};
	Person.prototype.species = 'Homo Sapien';
	Person.prototype.speak = function(toWhom) {
		return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
	};

	var person = new Person('Alexis');
	var speak = DOTCALL(person, 'speak', ['Justin']);

	var greet = 'Hello Justin. My name is Alexis.';
	equal(speak, greet, 'method called with argument');
});
</script>

```
@codepen
@highlight 16-18,only


### What you need to know

- Use [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) to
  call a function (also constructor functions) with a `this` value and an array of arguments.
- If the call operator (`()`) is used on a value that is not a function,
  an error is thrown. For this example, throw:
  ```js
  throw new Error("${prop} is not a function");
  ```
  where `prop` is the name of the property that is being called.


### The solution


```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
<script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
<script type="module">
// The DOT operator will be useful
function DOT(object, property) {
    if( Object.prototype.hasOwnProperty.call(object, property) ) {
        return object[property];
    }
    var proto = Object.getPrototypeOf(object);
    if( proto ) {
        return DOT(proto, property);
    }
}

function DOTCALL(obj, prop, args){
	var fn = DOT(obj, prop);
	if(typeof fn === "function") {
		return fn.apply(obj, args);
	} else {
		throw new Error(prop+" is not a function");
	}
}
</script>
<script>
QUnit.test('DOTCALL works', function() {

	var Person = function(name){
		this.name = name;
	};
	Person.prototype.species = 'Homo Sapien';
	Person.prototype.speak = function(toWhom) {
		return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
	};

	var person = new Person('Alexis');
	var speak = DOTCALL(person, 'speak', ['Justin']);

	var greet = 'Hello Justin. My name is Alexis.';
	equal(speak, greet, 'method called with argument');
});
</script>

```
@codepen
@highlight 16-23,only
