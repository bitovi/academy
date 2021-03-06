@page learn-typescript/interfaces Interfaces
@parent learn-typescript 6

@description Learn how to write Interfaces, set optional properties, and about the power of using interfaces in classes and functions

@body

## Overview

Interfaces are a powerful way to enforce types and document what our code provides. Interfaces used in classes allow "loose coupling" while providing a shape - multiple classes can use interfaces in many different ways. This section will cover how to write interfaces, setting optional properties, and the power of using interfaces in classes and functions. This section will cover:

- How to write interfaces,
- Setting optional properties, and
- The power of using interfaces in classes and functions.

## Interfaces in TypeScript

An interface in TypeScript is a way to define the shape an entity should adhere to. An interface defines the members - properties, methods, and events. It may be easy to think of it as the signature of an API. It's worth noting that interfaces aren't transpiled into our output JavaScript, they're simply used for typechecking during the development process.

@sourceref ./6-1-interface.ts
@codepen

## Optional Properties

Some times all properties on an object don't need to be required, using the ``?`` lets us tell the TypeScript compiler which properties aren't required.

@sourceref ./6-2-optional.ts
@highlight 5
@codepen

## Classes Implementing Interfaces

In the case that a class needs to follow an object structure, we can use interfaces to define that 'contract'.

@sourceref ./6-3-classes.ts
@codepen

## Interfaces in Functions

Interfaces are incredibly useful in describing the shape of objects we want to use in multiple situations. The following functions both require a ``Dinosaur`` object shape we've defined in the ``Dinosaur`` interface.

@sourceref ./6-3-2-functions.ts
@codepen

## Interfaces Describing Functions

We can also use interfaces to describe functions, basically creating reusable types for functions. On the left side in parenthesis we list the parameters, and to the right of the colon we state the return type.

@sourceref ./6-3-3-describefuncs.ts
@codepen

It's possible to use the `type` keyword as an interface to describe a function.

@sourceref ./6-3-4-describefuncs-type.ts
@codepen

## Type Assertion

We briefly mentioned type assertion when talk about types, but when dealing with interfaces it can be a great tool for making sure our code behaves in the way we expect.

For instance, consider the following code:

@sourceref ./6-4-type-assertion.ts
@codepen

When we create empty object literals in TypeScript, they are inferred to be objects with zero properties. To fix this, we can use type assertions to let the compiler explicitly know what we want from our object.

@sourceref ./6-4-2-type-assertion.ts
@codepen

## Exercise 1: Write Interfaces to Describe an Object

### The Problem

We're going to write some interfaces to set up for the next problem. Edit the files `5a-dino-park.ts` and `5a-address.ts` to create an interface to define a ``DinoPark`` object shown below:

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

### The Solution

<details>
<summary>Solution</summary>

✏️ Update `5a-dino-park.ts` to the following:

```typescript
import Address from "./5a-address";

interface DinoPark {
  name: string;
  image?: string;
  address: Address;
 }

export default DinoPark;
```

✏️ Update `5a-address.ts` to the following:

```typescript
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string
}

export default Address;
```

</details>

Make sure you have this solution implemented correctly before moving on to the next exercise.

## Exercise 2: Write a Function With a Parameter Described by Interface

### The Problem

In the `5b-create-park-slug.ts` file edit the ``createParkSlug`` function to take a parameter that is the interface ```DinoPark``` created previously and returns a slug for the park by replacing any spaces with dashes. Ex. the park "Isla Sorna Park" should return the slug `Isla-Sorna-Park`.

### Verify Your Solution

✏️ Run the following to verify your solution:

```shell
npm run 5-interfaces
```

### The Solution


<details>
<summary>Solution</summary>

✏️ Update `5b-create-park-slug.ts` to the following:

```typescript
import DinoPark from "./5a-dino-park";

export function createParkSlug(dinoPark: DinoPark) {
  return dinoPark.name.replace(/ /g, '-');
}
```

</details>
