@page learn-typescript/interfaces Interfaces
@parent learn-typescript 9
@outline 3

@description Learn about creating and different applications of interface.

@body

## Overview

In this section, we will:

- Write interfaces
- Set optional properties
- Use the power of interfaces in classes and functions

## Objective: The Use of Interface

Interfaces are a powerful way to enforce types and document what our code provides. Interfaces used in classes allow "loose coupling" while providing a shape - multiple classes can use interfaces in many different ways. This section will cover how to write interfaces, setting optional properties, and the power of using interfaces in classes and functions.

### Interfaces in TypeScript

An interface in TypeScript is a way to define the shape an entity should adhere to. An interface defines the members - properties, methods, and events. It may be easy to think of it as the signature of an API. It’s worth noting that interfaces aren’t transpiled into our output JavaScript, they’re simply used for typechecking during the development process.

```typescript
//interface describing object
interface Dinosaur {
  name: string;
  breed: string;
  height: number;
  location: string;
}

//function with interface describing parameter
function trackDino(dino: Dinosaur) {
  console.log(dino.location);
}

let blue = {
  name: 'blue',
  breed: 'Velociraptor',
  height: 7,
  location: 'Section B'
};
trackDino(blue);
//Logs "Section B"
```
@codepen

### Optional properties

Some times all properties on an object don’t need to be required, using the ``?`` lets us tell the TypeScript compiler which properties aren’t required.

```typescript
interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}

function trackDino(dino: Dinosaur) {
  console.log(dino.location);
}

let blue = {name: 'blue', breed: 'Velociraptor', location: 'Section B'};
//works
trackDino(blue);
//Logs "Section B"
```
@highlight 4
@codepen

### Classes implementing interfaces

In the case that a class needs to follow an object structure, we can use interfaces to define that 'contract'.

```typescript
interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}


class ClonedDino implements Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
  roar(): void {
    console.log('roar');
  };
}
```
@codepen

### Interfaces in functions

Interfaces are incredibly useful in describing the shape of objects we want to use in multiple situations. The following functions both require a ``Dinosaur`` object shape we’ve defined in the ``Dinosaur`` interface.

```typescript
interface Dinosaur {
  name: string;
  breed: string;
  location: string;
}

let dinoA = {
  name: 'Blue',
  breed: 'Velociraptor',
  location: 'Section B'
};

let dinoB = {
  name: 'Sally',
  location: 'Section C'
};

function dinoCatcher(dinosaur: Dinosaur) {
  console.log(`Caught ${dinosaur.name} at ${dinosaur.location}`);
}

dinoCatcher(dinoA);
//works!
dinoCatcher(dinoB);
//Argument of type '{ name: string; location: string; }' is not assignable to parameter of type 'Dinosaur'.
//Property 'breed' is missing in type '{ name: string; location: string; }'.
```
@codepen

### Interfaces describing functions

We can also use interfaces to describe functions, basically creating reusable types for functions. On the left side in parenthesis we list the parameters, and to the right of the colon we state the return type.

```typescript
interface DinoDNAMixer {
  (dino1: string, dino2: string, spliceIdx: number): string;
}

let dinoMaker : DinoDNAMixer = function (dino1: string, dino2: string, spliceIdx: number): string {
  return dino1.substring(spliceIdx) + dino2.substring(spliceIdx);
}

let newDino = dinoMaker('CGGCAD', 'ACGCAA', 3);
console.log(newDino); //logs 'CADCAA'
```
@codepen

It’s possible to use the `type` keyword as an interface to describe a function.

```typescript
type DinoDNAMixer = (dino1: string, dino2: string, spliceIdx: number) => string;

interface DinoFactory {
  makeDino: DinoDNAMixer;
  factoryName: string;
}
```
@codepen

### Type assertion

We briefly mentioned type assertion when talk about types, but when dealing with interfaces it can be a great tool for making sure our code behaves in the way we expect.

For instance, consider the following code:

```typescript
interface Dinosaur {
  name: string;
  height: number;
}

var myObj = {} as Dinosaur;
myObj.name = 'Blue';
myObj.height = 6;
```
@codepen

When we create empty object literals in TypeScript, they are inferred to be objects with zero properties. To fix this, we can use type assertions to let the compiler explicitly know what we want from our object.

```typescript
var myObj = {};
myObj.name = 'Blue';
//property 'name' does not exist on type '{}'
myObj.height = 6;
//property 'height' does not exist on type '{}'
```
@codepen

### Exercise 1: Write Interfaces to Describe an Object

We’re going to write some interfaces to set up for the next problem. Edit the files `dino-park.ts` and `address.ts` to create an interface to define a ``DinoPark`` object shown below:

```javascript
let park = {
  name: '',
  image: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: ''
  }
}
```

Hint: the interface should have properties and types:

- ``name`` (string)
- ``image`` (string) (optional)
- ``address``
  - ``street`` (string)
  - ``city`` (string)
  - ``state``(string)
  - ``zip`` (string)

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update `dino-park.ts` to the following:

@sourceref ../../../exercises/typescript/09-interfaces/01-solution/src/dino-park.ts
@highlight 4-6

✏️ Update `address.ts` to the following:

@sourceref ../../../exercises/typescript/09-interfaces/01-solution/src/address.ts
@highlight 2-5

</details>

Make sure you have this solution implemented correctly before moving on to the next exercise.

### Exercise 2: Write a Function With a Parameter Described by Interface

In the `create-park-slug.ts` file edit the ``createParkSlug`` function to take a parameter that is the interface ```DinoPark``` created previously and returns a slug for the park by replacing any spaces with dashes. Ex. the park "Isla Sorna Park" should return the slug `Isla-Sorna-Park`.

### Verify Your Solution

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ Update `create-park-slug.ts` to the following:

@sourceref ../../../exercises/typescript/09-interfaces/01-solution/src/create-park-slug.ts
@highlight 3-4

</details>

## Next steps

Next, let’s take a look at [keyof and typeof](./keyof-typeof.html) to create new types from types.
