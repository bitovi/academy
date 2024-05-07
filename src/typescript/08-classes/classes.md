@page learn-typescript/classes Classes
@parent learn-typescript 8
@outline 3

@description Learn how to use classes and inheritance in TypeScript, understand the `constructor` method, and use the `public`, `private`, `protected`, and `readonly` modifiers.

@body

## Overview

In this section, you will:

- Use classes in TypeScript.
- Use the `constructor` method.
- Manage `this` in classes.
- Implement inheritance in classes.
- Use the `public`, `private`, `protected`, and `readonly` modifiers.

## Objective 1: Create a class

### Classes in JavaScript

In ECMAScript 2015, [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are available as syntactic sugar over the existing prototype-based **constructor functions**. A class may look like:

@sourceref ./javascript-class.js

The `ParkEmployee` class can be instantiated with a `name` field, and contains a `sayHi()` method.

So when `raptorGuy.sayHi()` is called, since `ParkEmployee` was instantiated with `new ParkEmployee("Owen")` it logs `Hi, my name is Owen`.

For more information on JavaScript classes, check out the
[learn-advanced-javascript/classes Advanced JavaScript Classes Training].
The following sections will cover features TypeScript adds to JavaScript.

### Classes in TypeScript

Classes in TypeScript look like classes in JavaScript; however, there are additional features
that add type safety.

In the following TypeScript class example, the `name` field is defined on line 2. We’ll look at setting the `name` via the constructor next.

@sourceref ./typescript-class.ts
@highlight 2, only

The functionality is identical to the TypeScript class’s Javascript counterpart, however, the `name` field has been given a specific type: `string`. This ensures that the constructor will only accept a `string` value as input.

### Constructor

The constructor method is how to initialize a new object with fields. The constructor is called when we instantiate a new object from calling a class with the `new` keyword — it constructs and returns a new object for us with properties we gave it.

@sourceref ./class-constructor.ts
@highlight 3, only

When declaring fields, it’s also possible to instantiate a value on them.

@sourceref ./class-constructor-initialized.ts
@highlight 3, only

Using the constructor to set `public` fields is quite a common pattern, which is why TypeScript also provides a shorthand.

@sourceref ./constructor-short.ts
@highlight 2, only

> **Note:** We will see how to create `private` fields later.

### Static fields

When you need a property to be shared across multiple instances, you can use a **static** property. These are shared by all instances of the class as well as inheriting classes. Both fields and methods on a class can be static. Each instance accesses the static value through prepending the name of the class.

This example shows the use of a static property `cageInstances` to count the number of instances of `DinoCage`:

@sourceref ./statics.ts
@highlight 2,10

### This and arrow `=>` functions

If you’re familiar with ES6, you may know that using the arrow `=>` captures the context of `this` where it’s used. The functionality is the same in TypeScript.

```typescript
class DinoBuilder {
  dinoName = "Trex";
  yawn() {
    setTimeout(function () {
      console.info(`${this.dinoName} yawned.`);
    }, 50);
  }
}

const dino = new DinoBuilder();
dino.yawn();
// Logs “undefined yawned”
```

@highlight 4

For example, in the above code block there is no `=>`, thus the `yawn()` method can’t access the class `DinoBuilder`’s `dinoName` property; there’s no way it reaches `DinoBuilder`’s `this` context.
As a result, when the instance of `dino` invokes its `yawn()` method, what is logged is `undefined yawned`.

Let’s look at an example with an arrow function:

```typescript
class DinoBuilder {
  dinoName = "Trex";
  yawn() {
    setTimeout(() => {
      console.info(`${this.dinoName} yawned.`);
    }, 50);
  }
}

const dino = new DinoBuilder();
dino.yawn();
// Logs “Trex yawned”
```

@highlight 4

In the above example `setTimeout` instead uses `=>`.
Now the `yawn()` method can access `this` context of the `DinoBuilder` class, so the invoked `yawn()` method will now log `Trex yawned`.

```typescript
class DinoBuilder {
  dinoName = "Trex";
  roar() {
    console.info(`${this.dinoName} roared.`);
  }
}

const dino = new DinoBuilder();

setTimeout(dino.roar, 50);
// Logs “undefined roared”
```

@highlight 3

Like our first example of this section, there is no `=>` thus `roar()` has no access to `DinoBuilder`’s `this` context.

The `setTimeout(dino.roar, 50)` will output `undefined roared` as it has currently been implemented.

```typescript
class DinoBuilder {
  dinoName = "Trex";
  roar = () => {
    console.info(`${this.dinoName} roared.`);
  };
}

const dino = new DinoBuilder();

setTimeout(dino.roar, 50);
// Logs “Trex roared”
```

@highlight 3

While the syntax is a bit different from our second example, this still uses the power of arrow functions.

With the `=>`, the `roar` method reaches the `DinoBuilder`’s `this` context. So `roar` outputs `Trex roared`.

### Setup 1

✏️ Create **src/classes/dino.ts** and update it to be:

@sourceref ../../../exercises/typescript/08-classes/01-problem/src/classes/dino.ts

### Verify 1

✏️ Create **src/classes/dino.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/08-classes/01-problem/src/classes/dino.test.ts

### Exercise 1

In this exercise, we will take an old-school JavaScript class and convert it to a shiny new TypeScript class.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/08-classes/01-problem?file=src/classes/dino.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/08-classes/01-problem?file=src/classes/dino.ts) to do this exercise in an online code editor.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/classes/dino.ts** to be:

@diff ../../../exercises/typescript/08-classes/01-problem/src/classes/dino.ts ../../../exercises/typescript/08-classes/01-solution/src/classes/dino.ts

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/08-classes/01-solution?file=src/classes/dino.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/08-classes/01-solution?file=src/classes/dino.ts).

</details>

## Objective 2: Extend a class

### Inheritance

Inheritance is a way to extend functionality of existing classes.
If the derived class contains its own constructor function, it MUST call a `super` method with parameters matching that of its parent class.

The `super` is a call to the parent `constructor` method to ensure the properties are set for the parent.
The following shows accessing the `move` method from the parent class and adding `run` and `talk` methods to the child class.

@sourceref ./inheritance.ts
@highlight 9,11

### The `public` modifier

In TypeScript, all fields are `public` by default, meaning they can be accessed from outside the class.

@sourceref ./public.ts
@highlight 2, 6, 12, 13

The highlighted property `name` can be accessed as the instance of `Dinosaur`. As explained above, by default all fields are `public`, so it will be accessible even without the `public` keyword.

However, in classes with many properties and methods or in cases where a specific coding style is required, it might be necessary to explicitly declare properties as `public`, just as we did with the `walk` method.

For the `Dinosaur` instance named `myDino`, both the `name` field and the `walk` method are accessible externally, so accessing `myDino.name` will return `"Mildred"`, and calling `myDino.walk(7)` will output `"Mildred walked 7 feet."`

### Setup 2

✏️ Create **src/classes/specialist.ts** and update it to be:

@sourceref ../../../exercises/typescript/08-classes/02-problem/src/classes/specialist.ts

### Verify 2

✏️ Create **src/classes/specialist.test.ts** should look like:

@sourceref ../../../exercises/typescript/08-classes/02-problem/src/classes/specialist.test.ts

### Exercise 2

In this exercise, we will write a new `Specialist` class.
This new `Specialist` class should:

- Inherit from `DinoKeeper`.
- Accept an additional `experience` public field that is a number.
- Have a `safetyQuote` method that returns `"Never turn your back to the cage. Trust me, I have ${experience} years of experience"`.

For example, you should be able to use `Specialist` as follows:

```typescript
const employee2 = new Specialist("Owen", 14);
employee2.sayHi(); // Owen says 'hi'
employee2.safetyQuote();
// Logs "Never turn your back to the cage. Trust me, I have 14 years of experience"
```

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/08-classes/02-problem?file=src/classes/specialist.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/08-classes/02-problem?file=src/classes/specialist.ts) to do this exercise in an online code editor.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/classes/specialist.ts** to be:

@diff ../../../exercises/typescript/08-classes/02-problem/src/classes/specialist.ts ../../../exercises/typescript/08-classes/02-solution/src/classes/specialist.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/08-classes/02-solution?file=src/classes/specialist.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/08-classes/02-solution?file=src/classes/specialist.ts).

</details>

## Objective 3: Additional assignment modifiers

### The `private` modifier

Fields marked `private` are unable to be accessed from outside their containing class.

@sourceref ./private.ts
@highlight 3, 14

### The `protected` modifier

The `protected` modifier is similar to the `private` modifier in that it makes properties that can’t be accessed from outside of the class. The main exception is that `protected` properties are accessible by classes that inherit from it.

The following example shows an inherited class that can access its parent `protected` property `teethCount`:

@sourceref ./protected.ts
@highlight 4, 11, 19

### The `readonly` modifier

The `readonly` modifier allows properties to be read, but not changed after initialization. That means that `readonly` fields can be accessed outside the class, but their value can’t be changed.

@sourceref ./readonly.ts
@highlight 2,10

## Next steps

Next on the chopping block is working with [learn-typescript/interfaces] in Typescript.
