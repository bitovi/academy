@page typescript/generics Generics
@parent typescript 7

@description Learn about what Generics are, why they are useful, and how to create a linked list using Generics in TypeScript.

@body


## Overview

Generics are a useful approach to writing abstract code that can be used in a variety of scenarios, or where this tutorial is concerned, with a variety of types. This section will cover more about what Generics are, why they are useful and how to create a linked list using Generics in TypeScript.  

## Generics

Generics are a way of writing abstract code that allows the determination of types to be handled when the code is used. Generics let us reuse code for different types and improve maintainability, as we don't have to duplicate the function for every type. A great example of the power of Generics is creating a linked list with type safety.

@sourceref ./7-1-basic.html
@codepen

Let's look at making a basic class to collect a list of things.

@sourceref ./7-2-collection.html
@codepen

The good - we can push any type to this list. The bad - we can push any type to this list.

@sourceref ./7-3-bad-collection.html
@codepen

myList now holds an assortment of types that won't be fun to iterate through and deal with. If we attempt to use a method like ``.length`` on a number, or ``.toPrecision(0)`` on a string we'll run into errors. Let's build a generic class instead.

@sourceref ./7-4-good-collection.html
@codepen

Now when we initialize this class we can specify a type to use.

@sourceref ./7-5-generic-collection.html
@codepen

Thanks to generics we're able to use the same class in multiple different scenarios with any type.

### Exercise 1

@sourceref ./7-exercise-1-start.html
@codepen

This function will return a random value. Rewrite it as a generic that can return a random string from a list of strings

```typescript
let dinosaurs: string[] = ['trex', 'velociraptor', 'triceratops', 'pterodactyl'];
let randomDino: string = randomThing(dinosaurs);
```

<details>
<summary>Solution</summary>

@sourceref ./7-exercise-1-solution.html
@codepen

</details>