@page typescript/interfaces Interfaces
@parent typescript 4

@description Interfaces in Typescript

## Interfaces in Typescript

An interface in Typescript is a way to define the syntax an entity should adhere to. An interface defines the members - properties, methods, and events. It may be easy to think of it as the signature of an API. It's worth noting that interfaces aren't transpiled into our output Javascript, they're simply used for typechecking during the development process.

```typescript
interface Dinosaur {
  name: string;
  breed: string;
  height: number;
  location: string;
}

function trackDino(dino: Dinosaur) {
  console.log(dino.location);
}

let blue = {name: 'blue', breed: 'Velociraptor', height: 7, location: 'Section B'};
trackDino(blue); // Section B
```

### Optional Properties

```typescript
interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}
```

### Classes Implementing Interfaces

In that a class needing to follow an object structure, we can use interfaces to define that 'contract'.

```typescript
interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}


class clonedDino implements Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
  roar() {
    console.log('roar');
  };
}
```

### Type Assertion

We briefly mentioned type assertion when talk about types, but when dealing with interfaces it can be a great tool for making sure our code behaves in the way we expect.

For instance, consider the following code:

```typescript
var myObj = {};
myObj.name = 'Blue'; //property 'name' does not exist on type '{}'
myObj.height = 6; //property 'height' does not exist on type '{}'
```

When we create object literals in typescript, they are inferred to be objects with zero properties. To fix this, we can use type assertions to let the compiler explicitly know what we want from our object.

```typescript
interface Dinosaur {
  name: string;
  height: number;
}

var myObj = {} as Dinosaur;
myObj.name = 'Blue';
myObj.height = 6;
```

### Describing Objects

```typescript
interface DinoInfo {
  name:string;
  location:string;
}

function owensCatcher(info: DinoInfo) {
  console.log(`Owen caught ${info.name} at ${info.location}`);
}

owensCatcher({name: 'Blue', location: 'Section B'}); // Owen caught Blue at Section B
owensCatcher({name: 'Charlie'}); //property 'location' is missing //error
```

### Describing Functions

```typescript
interface MyCallback {
    (error: Error, response?: string): void;
}

function myFunc(callback: MyCallback) {
  callback(null, 'a response')
}

myFunc(() => {
    console.log('all good here')
});
```

### Partials

A common use case in apps is having a model that we may represent with an interface. 

```typescript
interface Location {
  latitude: number;
  longitude: number;
}
interface DinoModel {
  id: string;
  name: string;
  height: number;
  location: Location;
}
```

Consider the following add and update functions:

```typescript
class DinoPark {
  add(dino: DinoModel) {
    //creates new dino
  }
  updateLocation(dino: DinoModel) {
    //updates existing dino
  }
}
```

We may not need to pass an object with all the properties described in the ``DinoModel`` interface, we may just want the id and value we're updating. This is where partials come into play. Partials are a helper that describes all properties as optional. 


```typescript
class DinoPark {
  updateLocation(dino: Partial<DinoModel>) {
    //updates existing dino
  }
}

let IslaSornaPark = new DinoPark();
IslaSornaPark.updateLocation({id: '12a51', location: {latitude: 19.8968, longitude: 155.5828}}) 
//works!
```

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