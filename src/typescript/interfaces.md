@page typescript/interfaces Interfaces
@parent typescript 4

@description Interfaces in Typescript

## Interfaces in Typescript

An interface in Typescript is a way to define the syntax an entity should adhere to. An interface defines the members - properties, methods, and events.

```javascript
interface Dinosaur {
  name: string,
  breed: string,
  height: number,
  location: string,
  roar: () => {
    console.log('roar');
  }
}

function trackDino(dino: Dinosaur) {
  console.log(dino.location);
}

let blue = {name: blue, type: 'Velociraptor', location: 'Section B'};
trackDino(blue); // Section B
```

### Optional Properties

```javascript
interface Dinosaur {
  name: string,
  breed: string,
  height?: number,
  location: string,
  roar: () => {
    console.log('roar');
  }
}
```

### Classes Implementing Interfaces

In that a class needing to follow an object structure,


```javascript
interface Dinosaur {
  name: string,
  breed: string,
  height?: number,
  location: string,
  roar: () => {
    console.log('roar');
  }
}

class clonedDino implements Dinosaur {

}
```

### Extending Interfaces

In

### Excess Property Checking


//todo


### Type Assertion


//todo


### Describing Functions

```javascript
interface CatchDino {
  (name: string, location: string): boolean
}

let owensCatcher: CatchDino;
owensCatcher = function(name: string, location: string) {
  let dino = dinos.find(name, location);
  return dino;
}
```
