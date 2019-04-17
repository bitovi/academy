@page advanced-javascript-training/prototypes Prototypes
@parent advanced-javascript-training 6
@description Demystify .prototype and .\_proto\_! We'll cover what the "new" and "instanceof" operators are actually doing behind the scenes, and what prototype-based inheritance looks like in memory.

@body

## Overview

- Shared properties
- Methods/properties on a prototype
- Setting up the proto chain
- Object.create
- Exercise!

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/uu-Cgn_CSoE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQg_A0R1JaF1H6bKbU1FjadnGYrbty_1jRqVbwQ79y7A3LQxtRlx22GomawLcECzQWIIv5xHleyRh0r/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Exercise 1: new Operator

### The problem

Write the `new` operator as if it was implemented in JS as a function. For example,
instead of calling `new Person('name')`, we will call `NEW(Person,['name'])` as follows:

```js
function Person(name) {
	this.name = name;
}

Person.prototype.speak = function(){ console.log(‘Hello!’) }

// var person = new Person('name')
const person = NEW( Person, ['name'] );

person.speak();
```

`NEW(constructor, args)` will take:

- __constructor__ - a constructor function.
- __args__ - an array of arguments.



To get started, click the button at the bottom of the following:

```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
<script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
<script type="module">
function NEW(constructorFn, args){

}
</script>
<script>
QUnit.test('NEW works', function(){
    var Person = function(name){
        this.name = name;
    }

    Person.prototype.species = 'Homo Sapien';
    Person.prototype.speak = function(toWhom) {
        return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
    }
    var person = NEW(Person, ['Alexis']);

    equal(person.name, 'Alexis', 'new function called');
    var greet = 'Hello Justin. My name is Alexis.';
    equal(person.speak('Justin'), greet, 'method on prototype called');
});
</script>

```
@codepen
@highlight 5-7,only


### What you need to know

The `new` operator does three things:

1. Creates a new object.
2. Assigns the object's `__proto__` to the constructor function's `prototype`.
3. Calls the `constructorFn` constructor function with the object as `this`.  


Other things to know:

- You can use [Object.setPrototypeOf(obj, prototype)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) to set the `__proto__` property of an element.
- Use [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) to
  call a function (also constructor functions) with a `this` value and an array of arguments.


### The solution

```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
<script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
<script type="module">
function NEW(constructorFn, args){

	var obj = {};
	Object.setPrototypeOf(obj, constructorFn.prototype);

	// OPTION 2: __proto__
	// var obj = {};
	// obj.__proto__ = constructorFn.prototype;

	// OPTION 3: Object.create
	// var obj = Object.create(constructorFn.prototype);

	constructorFn.apply(obj, args);
	return obj;
}
</script>
<script>
QUnit.test('NEW works', function(){
    var Person = function(name){
        this.name = name;
    }

    Person.prototype.species = 'Homo Sapien';
    Person.prototype.speak = function(toWhom) {
        return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
    }
    var person = NEW(Person, ['Alexis']);

    equal(person.name, 'Alexis', 'new function called');
    var greet = 'Hello Justin. My name is Alexis.';
    equal(person.speak('Justin'), greet, 'method on prototype called');
});
</script>

```
@codepen
@highlight 5-19,only

## Exercise 2: instanceof Operator

### The problem

Write the [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator as if it was implemented in JS. For example, instead of calling `person instanceof Person`,
we will call it as `INSTANCEOF(person, Person)` as follows:

```js
var Person = function(name) {
	this.name = name;
}

var person = new Person( 'Alexis' );
INSTANCEOF( person, Person ) //-> true
```

To get started, click the button at the bottom of the following:

```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
<script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
<script type="module">
function INSTANCEOF(obj, constructorFn){

}
</script>
<script>
QUnit.test('INSTANCEOF works', function() {

	var Person = function(name){
		this.name = name;
	};

	Person.prototype.species = 'Homo Sapien';
	Person.prototype.speak = function(toWhom) {
		return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
	};

	var person = new Person('Alexis');
	QUnit.ok(INSTANCEOF(person, Person), 'person is an instanceof Person');
	QUnit.ok(INSTANCEOF(person, Object), 'person is an instanceof Object');
	QUnit.equal(INSTANCEOF(person, Array), false, 'person is not an instanceof Array');

	QUnit.equal(
		INSTANCEOF(Person.prototype, Person),
		Person.prototype instanceof Person,
		"Person.prototype is not an instance of Person")
});
</script>

```
@codepen
@highlight 5-7,only

### What you need to know

The [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
operator returns true if the prototype property of a constructor appears anywhere in the prototype chain of an object.  

A constructor function's prototype is not an instance of the constructor function:

```js
var Person = function(name) {
	this.name = name;
}

console.log( Person.prototype instanceof Person ) //logs: false
```

### The solution


```html
<div id="qunit"></div>
<link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
<script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
<script type="module">
function INSTANCEOF(obj, constructorFn){
	if( obj.__proto__ === constructorFn.prototype ) {
		return true;
	}
	const proto = Object.getPrototypeOf(obj)
	if( proto ) {
		return INSTANCEOF(proto, constructorFn);
	}
	return false;
}
</script>
<script>
QUnit.test('INSTANCEOF works', function() {

	var Person = function(name){
		this.name = name;
	};

	Person.prototype.species = 'Homo Sapien';
	Person.prototype.speak = function(toWhom) {
		return 'Hello ' + toWhom + '. My name is ' + this.name + '.';
	};

	var person = new Person('Alexis');
	QUnit.ok(INSTANCEOF(person, Person), 'person is an instanceof Person');
	QUnit.ok(INSTANCEOF(person, Object), 'person is an instanceof Object');
	QUnit.equal(INSTANCEOF(person, Array), false, 'person is not an instanceof Array');

	QUnit.equal(
		INSTANCEOF(Person.prototype, Person),
		Person.prototype instanceof Person,
		"Person.prototype is not an instance of Person")
});
</script>

```
@codepen
@highlight 5-14,only
