@page learn-typescript/classes Classes
@parent learn-typescript 8
@outline 3

@description  Learn how to use classes and inheritance in TypeScript.

@body

## Overview

In this section, you will:

- Using classes in TypeScript.
- The Constructor method.
- How to manage `this` in classes.
- How to inherit classes.
- The use of public, private, protected, and readonly modifiers

## Objective 1: Create a class

### Classes in JavaScript

In ECMAScript 2015, [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are available as syntactic sugar over the existing prototype-based __constructor functions__. A class may look like:

@sourceref ./javascript-class.js
@codepen

The `ParkEmployee` class can be instantiated with a `name` field, and contains a `sayHi()` method. 

So when `raptorGuy.sayHi()` is called, since `ParkEmployee` was instantiated with `new ParkEmployee("Owen")` it logs `Hi, my name is Owen`.

For more information on JavaScript classes, check out the
[learn-advanced-javascript/classes Advanced JavaScript Classes Training]. The next sections will cover features TypeScript adds to JavaScript.

### Classes in TypeScript

Classes in TypeScript look like classes in JavaScript; however, there are additional features
that add type safety.

In the following TypeScript class example, the `name` field is defined on line 3. We’ll look at setting the `name` via the constructor next.

@sourceref ./typescript-class.ts
@codepen
@highlight 2

The functionality is identical to the TypeScript class's Javascript counterpart, however, the `name` field has been given a specific type: `string`. This ensures that the constructor will only accept a `string` value as input.

### Constructor

The constructor method is how to initialize a new object with fields. The constructor is called when we instantiate a new object from calling a class with the `new` keyword - it constructs and returns a new object for us with properties we gave it.

@sourceref ./class-constructor.ts
@codepen
@highlight 3, only

When declaring fields, it’s also possible to instantiate a value on them.

@sourceref ./class-constructor-initialized.ts
@codepen
@highlight 3, only

Using the constructor to set `public` fields is quite a common pattern, which is why TypeScript also provides a shorthand.

@sourceref ./constructor-short.ts
@codepen
@highlight 2, only

> __Note:__ We will see how to create `private` fields later.

### Statics

When you need a property to be shared across multiple instances, you can use a __static__ property. These are shared by all instances of the class as well as inheriting classes. Both fields and methods on a class can be static. Each instance accesses the static value through prepending the name of the class.

This example shows the use of a static property `cageInstances` to count the number of instances of `DinoCage`:

@sourceref ./statics.ts
@codepen
@highlight 2,10

### This and arrow `=>` functions

If you’re familiar with ES6, you may know that using the arrow `=>` captures the context of `this` where it’s used. The functionality is the same in TypeScript.


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
```
@highlight 4
@codepen

For example, in the above code block there is no `=>`, thus the `yawn()` method can't access the class `DinoBuilder`'s `dinoName` property; there's no way it reaches `DinoBuilder's` `this` context. 

As a result, when the instance of `dino` invokes its `yawn()` method what is logged is `undefined yawned`.


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
```
@highlight 4
@codepen

In the above example `setTimeout` instead uses `=>`. 

 Now the `yawn()` method can access `this` context of the `DinoBuilder` class. So the invoked `yawn()` method will now log `Trex yawned`

```typescript
class DinoBuilder {
  dinoName = 'Trex';
  roar() {
    console.log(`${this.dinoName} roared.`);
  }
}

var dino = new DinoBuilder();

setTimeout(dino.roar, 50);
```

@highlight 3
@codepen

Like our first example of this section, there is no `=>` thus `roar()` has no access to `DinoBuilder`'s `this` context.

The `setTimeout(dino.roar, 50)` will output `undefined roared` as it has currently been implemented.


```typescript
class DinoBuilder {
  dinoName = 'Trex';
  roar = () => {
    console.log(`${this.dinoName} roared.`);
  }
}

var dino = new DinoBuilder();

setTimeout(dino.roar, 50);
```
@highlight 3
@codepen

While the syntax is a bit different from our second example, this still uses the power of arrow functions. 

With the `=>`, the `roar` method reaches the `DinoBuilder`'s `this` context. So `roar` outputs `Trex roared`.

### Setup 1

✏️ Create **hello-dino.ts** and update it to be:

@sourceref ../../../exercises/typescript/08-classes/01-problem/src/classes/hello-dino.ts

### Verify 1

Create **hello-dino.test.ts** should look like:

@sourceref ../../../exercises/typescript/08-classes/01-problem/src/classes/hello-dino.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 1


In this exercise, we will take an old-school JavaScript class and convert it to a shiny new TypeScript class.


### Solution 1


<details>
<summary>Solution</summary>

✏️ Update  **hello-dino.ts** to look like:

@diff ../../../exercises/typescript/08-classes/01-problem/src/classes/hello-dino.ts ../../../exercises/typescript/08-classes/01-solution/src/classes/hello-dino.ts
@highlight 1-2, 4, 8-9,11, 16

</details>

## Objective 2: Extend a class

### Inheritance

Inheritance is a way to extend functionality of existing classes. If the derived class contains its own constructor function, it MUST call a `super` method with params matching that of its parent class. 

The `super` is a call to the parent constructor method to ensure the properties are set for the parent. The following shows accessing the move method from the parent class and adding run and talk methods to the child class.

@sourceref ./inheritance.ts
@codepen
@highlight 9,11

### Public modifier

In TypeScript, all fields are `public` by default, meaning they can be accessed from outside the class.

@sourceref ./public.ts
@codepen
@highlight 2, 6, 12, 13

The highlighted property `name` can be accessed as the instance of `Dinosaur`. As explained above, by default all fields are `public` by default, so even without the `public` keyword it will be accessible.

It is possible to can be explicit as we are being for the `walk` method, in a more populated class with many modifiers, or due to code style standards in a repo there are scenarios where using the `public` keyword is necessary.

For the instance of `Dinosaur`; `myDino`, both the `name` field and `walk` method are can be accessed externally, so `myDino.name` will return `Mildred` and `myDino.walk(7)` will return `Mildred walked 7 feet`.

### Setup 2

✏️ Create **specialist.ts** and update it to be:

@sourceref ../../../exercises/typescript/08-classes/02-problem/src/classes/specialist.ts

For example, you should be able to use `Specialist` as follows:

### Verify 2

Create **specialist.test.ts** should look like:

@sourceref ../../../exercises/typescript/08-classes/02-problem/src/classes/specialist.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 2

In this exercise, we will write a new `Specialist` class.
This new `Specialist` class should:
- Inherit from `DinoKeeper`.
- Accept an additional `experience` public field that is a number
- Have a `safetyQuote` method that returns `"Never turn your back to the cage. Trust me, I have ${experience} years of experience"`.

```typescript
let employee2 = new Specialist('Owen', 14);
employee2.sayHi(); //Owen says 'hi'
employee2.safetyQuote();
//Logs "Never turn your back to the cage. Trust me, I have 14 years of experience"
```

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update **specialist.ts** to look like:

@diff ../../../exercises/typescript/08-classes/02-problem/src/classes/specialist.ts ../../../exercises/typescript/08-classes/02-solution/src/classes/specialist.ts
@highlight 3-6, 8-11

</details>

## Objective 3: Additional assignment modifiers

### Private modifier

Fields marked `private` are unable to be accessed from outside their containing class.

@sourceref ./private.ts
@codepen
@highlight 3,13

### Protected modifier

`Protected` modifiers are similar to `private` modifiers in that they can’t be accessed from outside of the class. The main exception is that `protected` properties are also accessible by classes that inherit from it. 

The following example shows an inherited class that can access its parent `protected` property `teethCount`:

@sourceref ./protected.ts
@codepen
@highlight 4,19

### Readonly modifier

`Readonly` modifiers allow properties to be read, but not changed after initialization. `Readonly` fields can be accessed outside the class, but their value can’t be changed.

@sourceref ./readonly.ts
@codepen
@highlight 2,10

## Next Steps

Next on the chopping block is working with Interfaces in Typescript.