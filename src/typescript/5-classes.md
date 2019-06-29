@page learn-typescript/classes Classes
@parent learn-typescript 5

@description  Learn to use classes and inheritance in TypeScript, about the ``constructor`` method, and how to use public, private, protected, and readonly modifiers.

@body

## Overview

For those newer to Object-oriented programming, classes are special functions that help us abstract our code. Classes can define function expressions and function declarations. This section will cover:

- Using classes in TypeScript,
- The Constructor method,
- How to inherit classes,
- The use of public, private, protected, and readonly modifiers, and
- How to manage `this` in classes.

## Classes in TypeScript

In JavaScript, a class is a structured way to define what you may have seen before - prototype based constructor functions. This allows us to take an object-oriented approach to building our JavaScript applications. Since ECMAScript 2015, classes have been available, the difference with classes in TypeScript is the strictness of enforcing types on members.

The following shows creating a ParkEmployee constructor function with a ``sayHi`` method.

@sourceref ./5-1-javascript-prototype.html
@codepen

In the TypeScript class example, the ``name`` member is defined on line 4. We'll look at setting the name via the constructor next.

@sourceref ./5-2-typescript-class.html
@codepen
@highlight 4


## Constructor

The constructor method is how to initialize a new object with members. The constructor is called when we instantiate a new object from calling a class with the ``new`` keyword - it constructs and returns a new object for us with properties we gave it.

@sourceref ./5-3-class-constructor.html
@codepen
@highlight 4

When declaring members, it's also possible to instantiate a value on them.

@sourceref ./5-3-class-constructor-initialized.html
@codepen
@highlight 4

Using the constructor to set public members is quite a common pattern, which is why TypeScript also provides a shorthand.

@sourceref ./5-4-constructor-short.html
@codepen
@highlight 3

> __Note__ We will see how to create private members later.

## Inheritance

Inheritance is a way to extend functionality of existing classes. If the derived class contains its own constructor function, it MUST call a super method with params matching that of its parent class. Super is a call to the parent constructor method to ensure the properties are set for the parent. The following shows accessing the move method from the parent class and adding run and talk methods to the child class.

@sourceref ./5-5-inheritance.html
@codepen
@highlight 10,12

## Statics

When you need a property to be shared across multiple instances, you can use a __static__ property. These are shared by all instances of the class as well as inheriting classes. Both members and methods on a class can be static. Each instance accesses the static value through prepending the name of the class.

This example shows the use of a static property ``cageInstances`` to count the number of instances of ``DinoCage``:

@sourceref ./5-6-statics.html
@codepen
@highlight 3,11

This example shows a shared static property ``dinos`` to count the number of dinosaurs in cages across all instances:

@sourceref ./5-6-statics-advanced.html
@codepen

## Public modifier

In TypeScript all members are public by default, meaning they are publicly accessible.

@sourceref ./5-7-public.html
@codepen
@highlight 4

## Private modifier

Members marked private are unable to be accessed from outside their containing class.

@sourceref ./5-8-private.html
@codepen
@highlight 4,14

## Protected modifier

Protected modifiers are similar to private modifiers in that they can't be accessed but they CAN be accessed by deriving classes. The following example shows an inherited class that can access it's parent protected property ``teethCount``:

@sourceref ./5-9-protected.html
@codepen
@highlight 5, 20


## Readonly modifier

Readonly modifiers allow properties to be read, but not changed.

@sourceref ./5-10-readonly.html
@codepen
@highlight 3,11

## This and `=>` Functions

If you're familiar with ES6, you may know that using the fat arrow (=>) captures the context of `this` where it's used. The functionality is the same in TypeScript.


Wrong `this`:

```typescript
class DinoBuilder {
  name = 'Trex';
  yawn() {
    setTimeout(function() {
      console.log(`${this.name} yawned.`)
    }, 50);
  }
}

var dino = new DinoBuilder();
dino.yawn();
// Logs "undefined yawned"
```
@highlight 4

Right `this`:

```typescript
class DinoBuilder {
  name = 'Trex';
  yawn() {
    setTimeout(() => {
      console.log(`${this.name} yawned.`)
    }, 50);
  }
}

var dino = new DinoBuilder();
dino.yawn();
// Logs "Trex yawned"
```
@highlight 4

Wrong `this`:

```typescript
class DinoBuilder {
  name = 'Trex';
  roar() {
    console.log(`${this.name} roared.`)
  }
}

var dino = new DinoBuilder();

let fierce = dino.roar;
fierce();
// Logs "undefined roared"
```
@highlight 3


Right `this`:

```typescript
class DinoBuilder {
  name = 'Trex';
  roar = () => {
    console.log(`${this.name} roared.`)
  }
}

var dino = new DinoBuilder();
let fierce = dino.roar;
fierce();
// Logs "Trex roared"
```
@highlight 3

## Exercise 1

Edit the file `4a-classes-hello-dino.ts` to recreate the prototype using TypeScript classes.

```typescript
function DinoKeeper(name) {
  this.name = name;
}

DinoKeeper.prototype.sayHi = function() {
  return this.name + ' says "hi"';
}

let employee1 = new DinoKeeper("Joe");
employee1.sayHi();
//Joe says "hi"
```

Hint* When you run:

```bash
tsc 4a-classes-hello-dino.ts
```

Your code should output to look like the above prototype version! Delete the compiled js file before running the tests in the next step.


<details>
<summary>Solution</summary>

```typescript
class DinoKeeper {
  name: string;

  constructor(name:string) {
    this.name = name;
  }

  sayHi():string {
    return `${this.name} says "hi"`;
  }
}
let employee1 = new DinoKeeper("Joe");
employee1.sayHi();
//Logs "Joe says "hi""
```

</details>

## Exercise 2

Edit the file `4a-specialist.ts` to write a new ``Specialist`` class that inherits from the ``DinoKeeper``. This new class should be able to accept an additional ``experience`` public member that is a number, and have a ``safetyQuote`` method that returns("Never turn your back to the cage. Trust me, I have _${experience}_ years of experience")

```typescript
let employee2 = new Specialist("Owen", 14);
employee2.sayHi(); //Owen says 'hi'
employee2.safetyQuote();
//Logs "Never turn your back to the cage. Trust me, I have 14 years of experience"
```

```shell
npm run 4-classes
```

<details>
<summary>Solution</summary>

```typescript
class Specialist extends DinoKeeper {
  constructor(name: string, public experience: number) {
    super(name);
  }

  safetyQuote():string {
    return `Never turn your back to the cage.
    Trust me, I have ${this.experience} years of experience`;
  }
}

let employee2 = new Specialist("Owen", 14);
employee2.sayHi(); //Owen says 'hi'
employee2.safetyQuote();
//Logs "Never turn your back to the cage. Trust me, I have 14 years of experience"
```

</details>
