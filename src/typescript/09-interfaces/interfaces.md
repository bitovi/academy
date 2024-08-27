@page learn-typescript/interfaces Interfaces
@parent learn-typescript 9
@outline 3

@description Learn how to write Interfaces, set optional properties, and use interfaces in classes and functions.

@body

## Overview

In this section, you will:

- Write interfaces.
- Set optional properties.
- Use the power of interfaces in classes and functions.

## Objective 1: Define interfaces for objects

Interfaces are a powerful way to enforce types and document what our code provides. Interfaces used in classes allow "loose coupling" while providing a shape. Multiple classes can use interfaces in many different ways. This section will cover how to write interfaces, setting optional properties, and the power of using interfaces in classes and functions.

### Interfaces in TypeScript

An interface in TypeScript is a way to define the shape an entity should adhere to. An interface defines the members: properties, methods, and events. It may be easy to think of it as the signature of an API. It’s worth noting that interfaces aren’t transpiled into our output JavaScript; they’re only used for type-checking during the development process.

@sourceref ./interface.ts

### Interfaces in function parameters

Interfaces are incredibly useful in describing the shape of objects we want to use in multiple situations. The following functions both require a `Dinosaur` object shape we’ve defined in the `Dinosaur` interface.

@sourceref ./functions.ts
@highlight 18

### Optional properties

Sometimes all properties on an object don’t need to be required, so using the `?` tells the TypeScript compiler which properties aren’t required.

@sourceref ./optional.ts
@highlight 4

### Classes implementing interfaces

In the case that a class needs to follow an object structure, we can use interfaces to define that 'contract'.

@sourceref ./classes.ts
@highlight 1, 8

### Setup 1

✏️ Create **src/interfaces/address.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/interfaces/address.ts

✏️ Create **src/interfaces/dinoPark.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/interfaces/dinoPark.ts

### Verify 1

✏️ Create **src/interfaces/address.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/interfaces/address.test.ts

✏️ Create **src/interfaces/dinoPark.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/01-problem/src/interfaces/dinoPark.test.ts

### Exercise 1

We’re going to write some interfaces to set up for the next problem. Edit the files `address.ts` and `dinoPark.ts` to create an interface to define an `Address` and `DinoPark` object shown below:

```javascript
const address = {
  street: "",
  city: "",
  state: "",
  zip: "",
};

const park = {
  name: "",
  image: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
};
```

Hint: the interface should have properties and types:

- `name` (string)
- `image` (string) (optional)
- `address`
  - `street` (string)
  - `city` (string)
  - `state`(string)
  - `zip` (string)

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/01-problem?file=src/address.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/01-problem?file=src/address.ts) to do this exercise in an online code editor.

### Solution 1

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/interfaces/address.ts** to be:

@diff ../../../exercises/typescript/09-interfaces/01-problem/src/interfaces/address.ts ../../../exercises/typescript/09-interfaces/01-solution/src/interfaces/address.ts only

✏️ Update **src/interfaces/dinoPark.ts** to be:

@diff ../../../exercises/typescript/09-interfaces/01-problem/src/interfaces/dinoPark.ts ../../../exercises/typescript/09-interfaces/01-solution/src/interfaces/dinoPark.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/01-solution?file=src/interfaces/address.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/01-solution?file=src/interfaces/address.ts).

</details>

Make sure you have this solution implemented correctly before moving on to the next exercise.

## Objective 2: Define interfaces for functions

### Interfaces describing functions

We can also use interfaces to describe functions, basically creating reusable types for functions. On the left side (in parenthesis) we list the parameters, and to the right of the colon, we state the return type.

@sourceref ./describefuncs.ts
@highlight 1, 5

It’s possible to use the `type` keyword as an interface to describe a function.

@sourceref ./describefuncs-type.ts
@highlight 1, 3

### Setup 2

✏️ Create **src/interfaces/slug.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/02-problem/src/interfaces/slug.ts

### Verify 2

✏️ Create **src/interfaces/slug.test.ts** and update it to be:

@sourceref ../../../exercises/typescript/09-interfaces/02-problem/src/interfaces/slug.test.ts

### Exercise 2

In the `slug.ts` file, edit the `createParkSlug` function to take a parameter that is the interface `DinoPark` created previously and returns a slug for the park by replacing any spaces with dashes.
Example: the park `Isla Sorna Park` should return the slug `Isla-Sorna-Park`.

<strong>Have issues with your local setup?</strong> You can use either [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/02-problem?file=src/interfaces/slug.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/02-problem?file=src/interfaces/slug.ts) to do this exercise in an online code editor.

### Solution 2

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>

✏️ Update **src/interfaces/slug.ts** to be:

@diff ../../../exercises/typescript/09-interfaces/02-problem/src/interfaces/slug.ts ../../../exercises/typescript/09-interfaces/02-solution/src/interfaces/slug.ts only

<strong>Have issues with your local setup?</strong> See the solution in [StackBlitz](https://stackblitz.com/fork/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/02-solution?file=src/interfaces/slug.ts) or [CodeSandbox](https://codesandbox.io/p/devbox/github/bitovi/academy/tree/main/exercises/typescript/09-interfaces/02-solution?file=src/interfaces/slug.ts).

</details>

## Next steps

Next, let’s take a look at [keyof and typeof](./keyof-typeof.html) to create new types from types.
