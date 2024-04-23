@page learn-typescript/classes Classes
@parent learn-typescript 8

@description  Learn to use classes and inheritance in TypeScript, about the `constructor` method, and how to use public, private, protected, and readonly modifiers.

@body

## Overview

For those newer to Object-oriented programming, classes are special functions that help us abstract our code. Classes can define function expressions and function declarations. This section will cover:

- Using classes in TypeScript,
- The Constructor method,
- How to inherit classes,
- The use of public, private, protected, and readonly modifiers, and
- How to manage `this` in classes.

## Classes in JavaScript

In ECMAScript 2015, [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are available as syntactic sugar over the existing prototype-based __constructor functions__. A
simple class might look like:

```js
class ParkEmployee {
  constructor(name){
    this.name = name;
  }
  sayHi() {
    console.log("Hi, my name is " + this.name);
  }
}

let raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
//Logs "Hi, my name is Owen"
```
@codepen

For more information on JavaScript classes, checkout the
[learn-advanced-javascript/classes Advanced JavaScript Classes Training]. The next sections will cover features TypeScript adds to JavaScript.

## Classes in TypeScript

Classes in TypeScript look just like classes in JavaScript; however, there are additional features
that add type safety.

In the following TypeScript class example, the `name` member is defined on line 3. We’ll look at setting the name via the constructor next.

@sourceref ./6-2-typescript-class.ts
@codepen
@highlight 3


## Constructor

The constructor method is how to initialize a new object with members. The constructor is called when we instantiate a new object from calling a class with the `new` keyword - it constructs and returns a new object for us with properties we gave it.

@sourceref ./6-3-class-constructor.ts
@codepen
@highlight 3

When declaring members, it’s also possible to instantiate a value on them.

@sourceref ./6-3-class-constructor-initialized.ts
@codepen
@highlight 3

Using the constructor to set public members is quite a common pattern, which is why TypeScript also provides a shorthand.

@sourceref ./6-4-constructor-short.ts
@codepen
@highlight 2

> __Note:__ We will see how to create private members later.

## Inheritance

Inheritance is a way to extend functionality of existing classes. If the derived class contains its own constructor function, it MUST call a super method with params matching that of its parent class. Super is a call to the parent constructor method to ensure the properties are set for the parent. The following shows accessing the move method from the parent class and adding run and talk methods to the child class.

@sourceref ./6-5-inheritance.ts
@codepen
@highlight 9,11

## Statics

When you need a property to be shared across multiple instances, you can use a __static__ property. These are shared by all instances of the class as well as inheriting classes. Both members and methods on a class can be static. Each instance accesses the static value through prepending the name of the class.

This example shows the use of a static property `cageInstances` to count the number of instances of `DinoCage`:

@sourceref ./6-6-statics.ts
@codepen
@highlight 2,10



## Public modifier

In TypeScript all members are public by default, meaning they are publicly accessible.

@sourceref ./6-7-public.ts
@codepen
@highlight 3

## Private modifier

Members marked private are unable to be accessed from outside their containing class.

@sourceref ./6-8-private.ts
@codepen
@highlight 3,13

## Protected modifier

Protected modifiers are similar to private modifiers in that they can’t be accessed but they CAN be accessed by deriving classes. The following example shows an inherited class that can access it’s parent protected property `teethCount`:

@sourceref ./6-9-protected.ts
@codepen
@highlight 4,19


## Readonly modifier

Readonly modifiers allow properties to be read, but not changed after initialization. Read-only members can be accessed outside the class, but their value can’t be changed.

@sourceref ./6-10-readonly.ts
@codepen
@highlight 2,10

## This and `=>` Functions

If you’re familiar with ES6, you may know that using the fat arrow (=>) captures the context of `this` where it’s used. The functionality is the same in TypeScript.


Wrong `this`:

```typescript
class DinoBuilder {
  dinoName = 'Trex';
  yawn() {
    setTimeout(function() {
      console.log(`${this.dinoName} yawned.`);
    }, 50);
  }
}

var dino = new DinoBuilder();
dino.yawn();
// Logs "undefined yawned"
```
@highlight 4
@codepen

Right `this`:

```typescript
class DinoBuilder {
  dinoName = 'Trex';
  yawn() {
    setTimeout(() => {
      console.log(`${this.dinoName} yawned.`);
    }, 50);
  }
}

var dino = new DinoBuilder();
dino.yawn();
// Logs "Trex yawned"
```
@highlight 4
@codepen

Wrong `this`:

```typescript
class DinoBuilder {
  dinoName = 'Trex';
  roar() {
    console.log(`${this.dinoName} roared.`);
  }
}

var dino = new DinoBuilder();

setTimeout(dino.roar, 50);
// Logs "undefined roared"
```
@highlight 3
@codepen

Right `this`:

```typescript
class DinoBuilder {
  dinoName = 'Trex';
  roar = () => {
    console.log(`${this.dinoName} roared.`);
  }
}

var dino = new DinoBuilder();

setTimeout(dino.roar, 50);
// Logs "Trex roared"
```
@highlight 3
@codepen

## Exercise: Create a Class

### The Problem

In this exercise, we will take an old-school JavaScript class and convert it to a
shiny new TypeScript class.

Edit the file `4a-classes-hello-dino.ts` to recreate the `DinoKeeper` using TypeScript classes.

```typescript
function DinoKeeper(name) {
  this.name = name;
}

DinoKeeper.prototype.sayHi = function() {
  return this.name + ' says "hi"';
}

let employee1 = new DinoKeeper('Joe');
employee1.sayHi();
//Joe says "hi"
```

### Hint

If you run:

```bash
tsc 4a-classes-hello-dino.ts
```

Your code should transpile to look like the above prototype version! __Delete__ the compiled js file before running the tests in the next step.

### Verify your solution

✏️ Run the following to verify your solution:

```shell
npm run 4a-classes
```

### The solution


<details>
<summary>Solution</summary>

✏️ Update `4a-classes-hello-dino.ts` to the following:

```typescript
class DinoKeeper {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHi(): string {
    return `${this.name} says "hi"`;
  }
}
let employee1 = new DinoKeeper('Joe');
employee1.sayHi();
//Logs "Joe says "hi""

export default DinoKeeper;
```

</details>
@highlight 1-2, 4, 8-9,11, 16

## Exercise: Extend a Class

### The Problem

Edit `4b-specialist.ts` to write a new `Specialist` class:

```ts
import DinoKeeper from "./4a-classes-hello-dino";

class Specialist {

}
export default Specialist;
```

`Specialist` should:

- Inherit from `DinoKeeper`. This new class should
- Accept an additional `experience` public member that is a number
- Have a `safetyQuote` method that returns `"Never turn your back to the cage. Trust me, I have ${experience} years of experience"`.

For example, you should be able to use `Specialist` as folows:

```typescript
let employee2 = new Specialist('Owen', 14);
employee2.sayHi(); //Owen says 'hi'
employee2.safetyQuote();
//Logs "Never turn your back to the cage. Trust me, I have 14 years of experience"
```

### Verify Your Solution

✏️ Run the following to verify the solution:

```shell
npm run 4b-classes
```

### The solution

<details>
<summary>Click to see the solution</summary>

✏️ Update `4b-specialist.ts` to the following:

```typescript
import DinoKeeper from "./4a-classes-hello-dino";

class Specialist extends DinoKeeper {
  constructor(name: string, public experience: number) {
    super(name);
  }

  safetyQuote() {
    return `Never turn your back to the cage.
    Trust me, I have ${this.experience} years of experience`;
  }
}
export default Specialist;
```

@highlight 3-6, 8-11

</details>
