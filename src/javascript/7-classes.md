@page learn-advanced-javascript/classes Classes
@parent learn-advanced-javascript 7
@description Learn about JavaScript classes
@outline 3

@body

> __NOTE:__ This section is currently under development.  There are no exercises yet.

## Overview

In JavaScript, a class is a structured way to define what you saw in the previous section - prototype-based __constructor functions__. Before [ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015), you would create __constructor functions__ as follows:

```js
//prototype way
function ParkEmployee(name) {
  this.name = name;
}

ParkEmployee.prototype.sayHi = function() {
  console.log("Hi, my name is " + this.name);
}

const raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
// Logs "Hi, my name is Owen"
```
@codepen


In ECMAScript 2015, [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are available as syntactic sugar over the existing prototype-based __constructor functions__. You
can write the previous example with `class` as follows:

```js
class ParkEmployee {
  constructor(name){
    this.name = name;
  }
  sayHi(){
    console.log("Hi, my name is " + this.name);
  }
}

const raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
// Logs "Hi, my name is Owen"
```
@codepen

## Getters, Setters and Method Definitions

Classes initially only allowed
getters, setters and method definitions
in the body of the class.

Getters and setters can be used to simulate another
value:

```js
class ParkEmployee {
  constructor(first, last){
    this.first = first;
    this.last = last;
  }
  sayHi(){
    console.log("Hi, my name is " + this.fullName);
  }
  get fullName(){
    return this.first + " " + this.last;
  }
  set fullName(newVal){
    const parts = newVal.split(" ");
    this.first = parts[0];
    this.last = parts[1];
  }
}

const employee = new ParkEmployee("Ellie","Sattler");

employee.fullName = "John Hammond";

employee.sayHi();
// Logs "Hi, my name is John Hammond"
```
@codepen

Method definitions are functions written without
the `function` keyword. They look like the following:

```js
sayHi(){
  console.log("Hi, my name is " + this.fullName);
}
```

Classes __do not__ allow specifying functions and
values on the class prototype using any other syntax available in
[object literal notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer). For example,
the following are __not__ allowed:

```js
class ParkEmployee {
  // key: function
  sayHi: function(){
    console.log("Hi, my name is " + this.name);
  }

  // key: value
  name: null
}
```


## Static Methods

The `static` keywords defines methods directly on the class.
For example, the following creates a `ParkEmployee.mathematician()` method:

```js
class ParkEmployee {
  static mathematician(){
    return new ParkEmployee("Ian");
  }
  constructor(name){
    this.name = name;
  }
  sayHi(){
    console.log("Hi, my name is " + this.name);
  }
}

let goldblum = ParkEmployee.mathematician();
raptorGuy.sayHi();
// Logs "Hi, my name is Ian"
```
@codepen
@highlight 2-4

## Field Declarations

A few browsers (and Babel) support [field declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations). _Field declarations_ let you specify fields (properties) and their initial value up front.

The following declares that `ParkEmployee` instances will be created with `name` initialized to `undefined`
and `age` initialized to `36`:

```js
class ParkEmployee {
  name;
  age = 36;
  constructor(name){
    this.name = name;
  }
  sayHi(){
    console.log("Hi, my name is " + this.name);
  }
}

const raptorGuy = new ParkEmployee("Owen");
console.log( raptorGuy.age );
// Logs 36
```
@highlight 2-3
@codepen



## Sub Classing

Classes (and even constructor functions) can be extended with the `extends` keyword as follows:

```js
class ParkEmployee {
  constructor( runningSpeed ) {
    this.runningSpeed = runningSpeed;
  }
  run(){
    return "running at " + this.runningSpeed;
  }
}

class Mathematician extends ParkEmployee {
  mustGoFaster(){
    this.runningSpeed = this.runningSpeed * 2;
  }
}

const goldblum = new Mathematician(3);

console.log( goldblum.run() ) // Logs "running at 3"

goldblum.mustGoFaster();

console.log( goldblum.run() ) // Logs "running at 6"
```
@codepen
@highlight 10

The keyword [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) can be used to call functions on a class’s (or object’s) parent. This is how you call "base" methods.

```js
class ParkEmployee {
  constructor( runningSpeed ) {
    this.runningSpeed = runningSpeed;
  }
  run(){
    return "running at " + this.runningSpeed;
  }
}

class Mathematician extends ParkEmployee {

  // constructor MUST call `super` before accessing `this`
  constructor( name, runningSpeed ) {
    super(runningSpeed);
    this.name = name;
  }
  run(){
    return this.name + " " + super.run();
  }
  mustGoFaster(){
    this.runningSpeed = this.runningSpeed * 2;
  }
}

const goldblum = new Mathematician("ian", 3);

console.log( goldblum.run() ) // Logs "ian running at 3"

goldblum.mustGoFaster();

console.log( goldblum.run() ) // Logs "ian running at 6"
```
@highlight 14,18
@codepen

For a deep dive on the mechanics of class inheritance, checkout
[JavaScript.info's Class Inheritance guide](https://javascript.info/class-inheritance). It
goes into detail about how the `[[HomeObject]]` internal property is used to enable the `super`
keyword.

<img src="https://docs.google.com/drawings/d/e/2PACX-1vRw9Jbz-_KHQsYE_7YmfibHznMvgHlooBRgKrafsyzNzQcDs-xZy4GuYJWDcc09PM6uX30V4riPbKX-/pub?w=872&amp;h=327">
