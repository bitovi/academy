@page learn-advanced-javascript/classes Classes
@parent learn-advanced-javascript 7
@description Learn about JavaScript classes

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

let raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
//Logs "Hi, my name is Owen"
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

let raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
//Logs "Hi, my name is Owen"
```
@codepen

## Static Methods

The `static` keywords defines methods directly on the class. For example:

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
//Logs "Hi, my name is Ian"
```
@codepen
@highlight 2-4

## Field Decorators

A few browsers (and Babel) support [field declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations). _Field declarations_ let you specify fields (properties)
and their initial value up front:

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

let raptorGuy = new ParkEmployee("Owen");
console.log( raptorGuy.age );
//Logs 36
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

class MathematicianParkEmployee extends ParkEmployee {
  mustGoFaster(){
    this.runningSpeed = this.runningSpeed * 2;
  }
}

const goldblum = new MathematicianParkEmployee(3);

console.log( goldblum.run() ) //logs "running at 3"

goldblum.mustGoFaster();

console.log( goldblum.run() ) //logs "running at 6"
```
@codepen
@highlight 10

The keyword [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) can be used to call functions on a class's (or object's) parent. This is how you call "base" methods.

```js
class ParkEmployee {
  constructor( runningSpeed ) {
    this.runningSpeed = runningSpeed;
  }
  run(){
    return "running at " + this.runningSpeed;
  }
}

class MathematicianParkEmployee extends ParkEmployee {

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

const goldblum = new MathematicianParkEmployee("ian", 3);

console.log( goldblum.run() ) //logs "ian running at 3"

goldblum.mustGoFaster();

console.log( goldblum.run() ) //logs "ian running at 6"
```
@highlight 14,18
@codepen

For a deep dive on the mechanics of class inheritance, checkout
[JavaScript.info's Class Inheritance guide](https://javascript.info/class-inheritance). It
goes into detail about how the `[[HomeObject]]` internal property is used to enable the `super`
keyword.
