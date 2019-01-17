@page typescript/classes Classes
@parent typescript 5

@description Classes in TypeScript

@body

## Classes in TypeScript

A class in JavaScript is a structured way to define prototype based functions. Classes allow us to take an object-oriented approach to building our JavaScript applications that may seem more familiar than the JavaScript "prototype" way.

@sourceref ./5-1-javascript-prototype.html
@codepen

@sourceref ./5-2-typescript-class.html
@codepen

### Constructor

A constructor is a way to initialize members on a class.

@sourceref ./5-3-class-constructor.html
@codepen

It's quite a common pattern, which is why TypeScript also provides a shorthand.

@sourceref ./5-4-constructor-short.html
@codepen

### Inheritance

Inheritance is a way to extend functionality of existing classes. If the devired class contains it's own constructor function, it MUST call a super method with params matching that of it's parent class. Super is a call to the parent constructor method to ensure the properties are set for the parent. 

@sourceref ./5-5-inheritance.html
@codepen

### Statics

When you need a property to be shared across multiple instances, you can use static property. These are shared by all instances of the class as well as inheriting classes. Both members and methods on a class can be static. Each instance accesses the static value through prepending the name of the class.

@sourceref ./5-6-statics.html
@codepen


### Public modifier

In TypeScript all members are public by default, meaning they are publicly accessible.

@sourceref ./5-7-public.html
@codepen

### Private modifier

Members marked private are unable to be accessed from outside their containing class.

@sourceref ./5-8-private.html
@codepen

### Protected modifier

Protected modifiers are similar to private modifiers in that they can't be accessed but they CAN be accessed by deriving classes.

@sourceref ./5-9-protected.html
@codepen

### Readonly modifier

Readonly modifieds allow properties to be read, but not changed.

@sourceref ./5-10-readonly.html
@codepen

### Exercise 1

Recreate this prototype using TypeScript classes.

```typescript
function Counter(initialValue) {
  this.value = initialValue;
}

Counter.prototype.increment = function() {
  this.value = this.value + 1;
  console.log('The new value is ' + this.value);
}

let myCounter = new Counter(5);
myCounter.increment();
//The new value is 6
```

<details>
<summary>Solution</summary>

```typescript
class Counter {
  value: number;

  constructor(value) {
    this.value = value;
  }

  increment() {
    this.value = this.value + 1;
    console.log(`The new value is ${this.value}`);
  }
}
let counter = new Counter(7);
counter.increment();
//The new value is 8
```
</details>

### Exercise 2

Create a new class that inherits from the ``Counter`` class and has a method that increases the value by a custom amount. 

<details>
<summary>Solution</summary>

```typescript
class CustomCounter extends Counter {
  add(customVal:number) {
    this.value = this.value + customVal;
    console.log(`The new value is ${this.value}`);
  }
}

const myCustomCounter = new CustomCounter(7);
myCustomCounter.increment();
//The new value is 8
myCustomCounter.add(12);
//The new value is 20
```
</details>