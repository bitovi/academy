@page typescript/interfaces Interfaces
@parent typescript 6

@description Interfaces in TypeScript

@body

## Overview

WHY USER SHOULD RAD

## Interfaces in TypeScript

An interface in TypeScript is a way to define the shape an entity should adhere to. An interface defines the members - properties, methods, and events. It may be easy to think of it as the signature of an API. It's worth noting that interfaces aren't transpiled into our output JavaScript, they're simply used for typechecking during the development process.

@sourceref ./6-1-interface.html
@codepen

### Optional Properties

Some times all properties on an object don't need to be required, using the ``?`` lets us tell the TypeScript compiler which parties aren't required.

@sourceref ./6-2-optional.html 
@highlight 5
@codepen

### Classes Implementing Interfaces

In the case that a class needs to follow an object structure, we can use interfaces to define that 'contract'.

EXPLAIN MORE HERE - MIXING IN CLASSES VS. INTERFACES. WHY INTERFACES OVER CLASSES. LOOSE COUPLING
SHOW BENEFITS OF INTERFACE. SHOW FUNCTION TAKING INTERFACE

@sourceref ./6-3-classes.html
@codepen

### Interfaces in Functions

Interfaces are incredibly useful in describing the shape of objects we want to use in multiple situations. The following functions both require a ``Dinosaur`` object shape we've defined in the interface.

@sourceref ./6-3-2-functions.html
@codepen

### Type Assertion

We briefly mentioned type assertion when talk about types, but when dealing with interfaces it can be a great tool for making sure our code behaves in the way we expect.

For instance, consider the following code:

@sourceref ./6-4-type-assertion.html
@codepen

When we create object literals in TypeScript, they are inferred to be objects with zero properties. To fix this, we can use type assertions to let the compiler explicitly know what we want from our object.

BETTER EXAMPLE OF WHY TO CAST

@sourceref ./6-4-2-type-assertion.html
@codepen


### Describing Objects

If we have a function expecting a specific object, we can define what that object should look like by specifying an interface for it:

@sourceref ./6-5-objects.html
@codepen

### Describing Functions

We can also use interfaces to describe what a function is expected to return.

SHOW BETTER EXAMPLE. CAN FIXTURE? WHICH IS LIKE EXPRESS MIDDLEWARE, ADDS TWO NUMBERS AND RETURNS NUMBER

@sourceref ./6-6-functions.html
@codepen

### Exercise 1

Create an interface to define a ``DinoPark`` class that had required properties of ``name``, ``image``, and ``address``, where ``image`` is optional and ``address`` is an object with properties ``street``, ``city``, ``state``, and ``zip``.

GIVE EXAMPLE OBJECT, DEFINE WHICH TYPES, USE BULLET POINTS

<details>
<summary>Solution</summary>

```typescript

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
interface DinoPark {
  name: string;
  image?: Images;
  address: Address;
}
```

</details>

### Exercise 2

Create a function that takes a parameter that is the interface ```DinoPark``` created previously and returns a slug for the dinopark by replacing any spaces with dashes.

SHOW EXAMPLE OF TWO THINGS USING SAME INTERFACE. ADD TEST CODE(add this to bottom of working page)?

<details>
<summary>Solution</summary>

```typescript
function createParkSlug(dinoPark: DinoPark) {
  return dinoPark.name.replace(/ /g, '-');
}

let islaSornaPark = {
  name: "Isla Sorna Park", 
  address: {
    street: '123 Main',
    city: 'Sandusky',
    state: 'Ohio',
    zip: '12345'
  }
}
let islaSornaSlug = createParkSlug(islaSornaPark);
//Isla-Sorna-Park
```

</details>