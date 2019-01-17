@page typescript/interfaces Interfaces
@parent typescript 6

@description Interfaces in TypeScript

@body

## Interfaces in TypeScript

An interface in TypeScript is a way to define the syntax an entity should adhere to. An interface defines the members - properties, methods, and events. It may be easy to think of it as the signature of an API. It's worth noting that interfaces aren't transpiled into our output Javascript, they're simply used for typechecking during the development process.

@sourceref ./6-1-interface.html
@codepen

### Optional Properties

@sourceref ./6-2-optional.html
@codepen

### Classes Implementing Interfaces

In that a class needing to follow an object structure, we can use interfaces to define that 'contract'.

@sourceref ./6-3-classes.html
@codepen

### Type Assertion

We briefly mentioned type assertion when talk about types, but when dealing with interfaces it can be a great tool for making sure our code behaves in the way we expect.

For instance, consider the following code:

@sourceref ./6-4-type-assertion.html
@codepen

When we create object literals in TypeScript, they are inferred to be objects with zero properties. To fix this, we can use type assertions to let the compiler explicitly know what we want from our object.


@sourceref ./6-4-2-type-assertion.html
@codepen


### Describing Objects

If we have a function expecting a specific object, we can define what that object sould look like by specifying an interface for it:

@sourceref ./6-5-objects.html
@codepen

### Describing Functions

We can also use interfaces to describe what a function is expected to return. 

@sourceref ./6-6-functions.html
@codepen

### Exercise 1

Create an interface to define a restaurant class that had required properties of ``name``, ``image``, and ``address``, where image is optional and address has nested properties ``street``, ``city``, ``state``, and ``zip``.

<details>
<summary>Solution</summary>

```typescript

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
interface Restaurant {
  name: string;
  image?: Images;
  address: Address;
}
```
</details>

### Exercise 2

Create a function that takes a parameter that is the interface ```Restaurant``` created previously and returns a slug for the restaurant by replacing any spaces with dashes. 

<details>
<summary>Solution</summary>

```typescript
function createRestaurantSlug(restaurant: Restaurant) {
  return restaurant.name.replace(' ', '-');
}

let myRestaurant = {
  name: "Orange Bees", 
  address: {
    street: '123 Main',
    city: 'Sandusky',
    state: 'Ohio',
    zip: '12345'
  }
}
let newEaterie = createRestaurantSlug(myRestaurant);
//Orange-Bees
```
</details>