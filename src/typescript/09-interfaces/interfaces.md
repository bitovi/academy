@page learn-typescript/interfaces Interfaces
@parent learn-typescript 9
@outline 3

@description Learn how to write Interfaces, set optional properties, and about the power of using interfaces in classes and functions.

@body

## Overview

In this section, we will:

- Write interfaces
- Set optional properties
- Use the power of interfaces in classes and functions

## Objective: The use of an interface for objects

Interfaces are a powerful way to enforce types and document what our code provides. Interfaces used in classes allow "loose coupling" while providing a shape. Multiple classes can use interfaces in many different ways. This section will cover how to write interfaces, setting optional properties, and the power of using interfaces in classes and functions.

### Interfaces in TypeScript

An interface in TypeScript is a way to define the shape an entity should adhere to. An interface defines the members: properties, methods, and events. It may be easy to think of it as the signature of an API. It’s worth noting that interfaces aren’t transpired into our output JavaScript; they’re only used for type-checking during the development process.

@sourceref ./9-1-interface.ts
@codepen

### Setup 1

✏️ Create **src/interfaces/address.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/address.ts

### Verify 1

✏️ Create **src/interfaces/address.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/address.test.ts

### Exercise 1

We’re going to write some interfaces to set up for the next problem. Edit the file `address.ts` to create an interface to define an ``Address`` object shown below:

```javascript
 const address = {
    street: '',
    city: '',
    state: '',
    zip: ''
  }
```

Hint: the interface should have properties and types:
  - ``street`` (string)
  - ``city`` (string)
  - ``state``(string)
  - ``zip`` (string)

### Solution 1

<details>
<summary>Click to see the solution</summary>

✏️ Update `address.ts` to the following:

@sourceref ../../../exercises/typescript/09-interfaces/01-solution/src/address.ts
@highlight 2-5

</details>

Make sure you have this solution implemented correctly before moving on to the next exercise.

### Optional properties

Sometimes all properties on an object don’t need to be required, so using the ``?`` tells the TypeScript compiler which properties aren’t required.

@sourceref ./9-2-optional.ts
@highlight 4
@codepen

### Setup 2

✏️ Create **src/interfaces/dino-park.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/dino-park.ts

### Verify 2

✏️ Create **src/interfaces/dino-park.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/dino-park.test.ts

### Exercise 2

We’re going to write some interfaces to set up for the next problem. Edit the files `dino-park.ts` to create an interface to define a ``DinoPark`` object shown below:

```javascript
cost park = {
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
- ``address`` (Address)

### Solution 2

<details>
<summary>Click to see the solution</summary>

✏️ Update `dino-park.ts` to the following:

@sourceref ../../../exercises/typescript/09-interfaces/01-solution/src/dino-park.ts
@highlight 4-6

</details>

Make sure you have this solution implemented correctly before moving on to the next exercise.

### Classes implementing interfaces

In the case that a class needs to follow an object structure, we can use interfaces to define that 'contract'.

@sourceref ./9-3-classes.ts
@codepen

### Type assertion

We briefly mentioned type assertion when talking about types, but when dealing with interfaces, it can be a great tool for making sure our code behaves in the way we expect.

For instance, consider the following code:

@sourceref ./9-4-1-type-assertion.ts
@codepen

When we create empty object literals in TypeScript, they are inferred to be objects with zero properties. To fix this, we can use type assertions to let the compiler explicitly know what we want from our object.

@sourceref ./9-4-2-type-assertion.ts
@codepen

## Objective: The use of an interface for functions

### Interfaces in functions

Interfaces are incredibly useful in describing the shape of objects we want to use in multiple situations. The following functions both require a ``Dinosaur`` object shape we’ve defined in the ``Dinosaur`` interface.

@sourceref ./9-5-1-functions.ts
@codepen

### Interfaces describing functions

We can also use interfaces to describe functions, basically creating reusable types for functions. On the left side (in parenthesis) we list the parameters, and to the right of the colon, we state the return type.

@sourceref ./9-5-2-describefuncs.ts
@codepen

It’s possible to use the `type` keyword as an interface to describe a function.

@sourceref ./9-5-3-describefuncs-type.ts
@codepen

### Setup 3

✏️ Create **src/interfaces/create-park-slug.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/create-park-slug.ts

### Verify 3

✏️ Create **src/interfaces/create-park-slug.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/create-park-slug.test.ts

✏️ Run the following to verify your solution:

```shell
npm run test
```

### Exercise 3

In the `create-park-slug.ts` file edit the ``createParkSlug`` function to take a parameter that is the interface ```DinoPark``` created previously and returns a slug for the park by replacing any spaces with dashes. Ex. the park "Isla Sorna Park" should return the slug `Isla-Sorna-Park`.

### Solution 3

<details>
<summary>Click to see the solution</summary>

✏️ Update `create-park-slug.ts` to the following:

@sourceref ../../../exercises/typescript/09-interfaces/01-solution/src/create-park-slug.ts
@highlight 3-4

</details>

## Next steps

Next, let’s take a look at [keyof and typeof](./keyof-typeof.html) to create new types from types.
