@page typescript/classes Classes
@parent typescript 3

@description Classes in Typescript

## Classes in Typescript

A class in JavaScript is a clean way to define prototype based functions. Classes allow us to take an object-oriented approach to building our JavaScript applications.

```javascript
//prototype way
function Avenger(name) {
  this.name = name;
}

Avenger.prototype.sayHi = function() {
  alert(this.name);
}

let ironMan = new Avenger("Tony");
ironMan.sayHi();
```


```typescript
//class way
class Avenger {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let ironMan = new Avenger("Tony");
ironMan.sayHi();
```
### Constructor

A constructor is a way to automatically declare members on a class.


```typescript
class Dinosaur {
  name: string;
  constructor(theName: string) {
    this.name = theName;
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
  move(distanceInFeet: number = 0) {
      console.log(`Animal moved ${distanceInFeet}m.`);
  }
}

class Velociraptor extends Dinosaur {
    talk() {
        console.log('screech');
    }
}

const blue = new Velociraptor();
blue.talk();
blue.move(10);
blue.talk();
```

### Statics

Static properties are able to be shared by all instances of the class.

```typescript
class Chatbot {
  static instances = 0;
  constructor() {
    Chatbot.instances++;
  }
}

var chat1 = new Chatbot();
var chat2 = new Chatbot();
console.log(Chatbot.instances); // 2
```


### Public modifier

```typescript
class Dinosaur {
    public name: string;
    constructor(theName: string) {
      this.name = theName;
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
    constructor(theName: string) { this.name = theName; }
}

class Trex extends Dinosaur {
    private type: string = 'carnivore';
    constructor() { super("Trex"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let dino = new Dinosaur("Buddy");
let trex = new Trex();
let employee = new Employee("Arnold");

dino = trex;
dino = employee; // Error: 'Animal' and 'Employee' are not compatible
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
