@page typescript/generics Generics
@parent typescript 6

@description Generics

## Generics

Generics are a way of writing abstract code that allows the determination of types to be handled when the code is used. Generics let us reuse code for different types and improve maintainability.

```typescript
function identity<MyType>(arg: MyType): MyType {
    return arg;
}

let sampleFunc = identity<string>("this is my string");
```

Let's look at making a basic class to collect a list of things.

```typescript
class Collection {
  private list: any[];
  push(thing) {
    this.list.push(thing);
  }
}
```

The good - we can push any type to this list. The bad - we can push any type to this list.

```typescript
let myList = Collection();
myList.push('tacos');
myList.push(25);
myList.push({name: 'Blue', breed: 'Velociraptor', speed: 50})
```

myList now holds an assortment of types that won't be fun to iterate through and deal with. Let's build a generic class instead.

```typescript
class GenericCollection<T> {
  private list: T[];
  pushItem(thing:T) {
    this.list.push(thing);
  }
}
```

Now when we initialize this class we can specify a type to use.

```typescript

let myListOfStrings = new GenericCollection<string>();
myListOfStrings.pushItem('booop');
myListOfStrings.pushItem(5); //error Argument type of '5' is not assignable to parameter of type 'string'


let myListOfNumbers = new GenericCollection<number>();
myListOfNumbers.pushItem(5);
myListOfNumbers.pushItem('boop'); //error Argument type of '"boop"' is not assignable to parameter of type 'number'

interface Dinosaur {
  name: string;
  breed: string;
  teeth: number;
}

let myListOfDinosaurs = new GenericCollection<Dinosaur>();
let otherDino = {
  name: 'Blue',
  breed: 'Velociraptor',
  teeth: 100
}

myListOfDinosaurs.pushItem(otherDino);

myListOfDinosaurs.pushItem({name: 'Charlie'}); //error Argument type '{ name: string; }' is not assignable to parameter of type 'Dinosaur'.
```

Thanks to generics we're able to use the same class in multiple different scenarios with any type.

### Exercise 1

```typescript
function randomIntElem(theArray: number[]): number {
    let randomIndex = Math.floor(Math.random()*theArray.length);
    return theArray[randomIndex];
}
 
let numbers: number[] = [103, 458, 472, 458];
let randomNumber: number = randomIntElem(positions);
```

This function will return a random value. Rewrite it as a generic that can return a random string from a list of strings

```typescript
let dinosaurs: string[] = ['trex', 'velociraptor', 'triceratops', 'pterodactyl'];
let randomDino: string = randomThing(dinosaurs);
```


<details>
<summary>Solution</summary>
```typescript

function randomThing<T>(anArray: T[]): T {
  let randomIndex = Math.floor(Math.random()*anArray.length);
  return anArray[randomIndex];
}
let dinosaurs: string[] = ['trex', 'velociraptor', 'triceratops', 'pterodactyl'];
let randomDino: string = randomThing(dinosaurs);
```
</details>