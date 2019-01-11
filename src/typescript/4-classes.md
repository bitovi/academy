@page typescript/classes Classes
@parent typescript 3

@description Classes in Typescript

## Classes in Typescript

A class in JavaScript is a clean way to define prototype based functions. Classes allow us to take an object-oriented approach to building our JavaScript applications.

```javascript
//prototype way
function ParkEmployee(name) {
  this.name = name;
}

ParkEmployee.prototype.sayHi = function() {
  alert(this.name);
}

let raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
```


```typescript
//class way
class ParkEmployee {
  name: string;
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
```

### Constructor

A constructor is a way to automatically declare members on a class.


```typescript
class Dinosaur {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

It's quite a common pattern, which is why Typescript also provides a shorthand.

```typescript
class Dinosaur {
  constructor(public name: string) {
  }
}
```

### Inheritance

Inheritance is a way to extend functionality of existing classes.

```typescript
class Dinosaur {
  constructor(public name: string) {
  }
  move(distanceInFeet: number = 0) {
    console.log(`${this.name} moved ${distanceInFeet}m.`);
  }
}

class Velociraptor extends Dinosaur {
  talk() {
    console.log('screech');
  }
}

const blue = new Velociraptor('Blue');
blue.talk();//screech
blue.move(10);//Blue moved 10m.
blue.talk();//screech
```

### Statics

Static properties are able to be shared by all instances of the class.

```typescript
class PerimeterFence {
  static instances = 0;
  constructor() {
    PerimeterFence.instances++;
  }
}

var paddock1 = new PerimeterFence();
var paddock2 = new PerimeterFence();
console.log(PerimeterFence.instances); // 2
```


### Public modifier

```typescript
class Dinosaur {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  public walk(distanceInFeet: number) {
    console.log(`${this.name} walked ${distanceInFeet} feet.`);
  }
}

let myDino = new Dinosaur('Mildred');
myDino.walk(7) // Mildred walked 7 feet.
```

In Typescript all members are public by default, meaning they are publicly visible and accessible.

### Private modifier

Members marked private are unable to be accessed from outside their containing class.

```typescript
class Dinosaur {
  private name: string;
  constructor(name: string) { this.name = name; }
}

class Trex extends Dinosaur {
  private type: string = 'carnivore';
  constructor() { super("Trex"); }
}

class Employee {
  private name: string;
  constructor(name: string) { this.name = name; }
}

let dino = new Dinosaur("Buddy");
let trex = new Trex();
let employee = new Employee("Arnold");

dino = trex;
dino = employee; // Type 'Employee' is not assignable to type 'Dinosaur'. Types have separate declarations of a private property 'name'.
```

### Protected modifier

Protected modifiers are similar to private modifiers in that they can't be accessed but they CAN be accessed by deriving classes.

```typescript
class Dinosaur {
  public name: string;
  private dna: string;
  protected teethCount: number;
}

// EFFECT ON INSTANCES
var indominusRex = new Dinosaur();
indominusRex.name; // okay
indominusRex.dna; // ERROR : private
indominusRex.teethCount; // ERROR : protected

// EFFECT ON CHILD CLASSES
class geneticallyModifiedDinosaur extends Dinosaur {
  constructor() {
    super();
      this.name; // okay
      this.dna; // ERROR: private
      this.teethCount; // okay
  }
}
```

### Readonly modifier

```typescript
class Leoplurodon {
  readonly location: string;
  readonly numberOfFlippers: number = 4;
  readonly magic:boolean = true;
  constructor (theLocation: string) {
    this.location = theLocation;
  }
}
let firstStop = new Leoplurodon("On the way to Candy Mountain");
firstStop.location = "On a bridge"; // error! location is readonly.
```

### Exercise 1

Recreate this prototype using typescript classes.

```typescript
function Counter(initialValue:number) {
  this.value = initialValue;
}

Counter.prototype.increment = function() {
  this.value = this.value + 1;
  console.log('The new value is ' + this.value);
}

let myCounter = new Counter(5);
myCounter.increment();
//The new value is 6
```

<details>
<summary>Solution</summary>

```typescript
class Counter {
  value: number;

  constructor(value) {
    this.value = value;
  }

  increment() {
    this.value = this.value + 1;
    console.log(`The new value is ${this.value}`);
  }
}
let counter = new Counter(7);
counter.increment();
//The new value is 8
```
</details>

### Exercise 2

Create a new class that inherits from the ``Counter`` class and has a method that increases the value by a custom amount. 

<details>
<summary>Solution</summary>

```typescript
class CustomCounter extends Counter {
  add(customVal:number) {
    this.value = this.value + customVal;
    console.log(`The new value is ${this.value}`);
  }
}

const myCustomCounter = new CustomCounter(7);
myCustomCounter.increment();
//The new value is 8
myCustomCounter.add(12);
//The new value is 20
```
</details>