@page learn-typescript Learn TypeScript
@parent bit-academy 4
@description This course covers the basic essentials of TypeScript. At the end, you should be
ready to develop projects in TypeScript.


@body

## Before You Begin

<a href="https://join.slack.com/t/bitovi-community/shared_invite/enQtNTIzMTE5NzYxMjA3LWMwMzE4MjFkMTI5ZmZjNzllYjc2MzcxOWNmOTg3YjI4NjE0MGFkZGNkOTNlZjlkNDBhNTlmYTcwMzJlZDZjY2Y">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to TypeScript in the [Angular chat room](https://bitovi-community.slack.com/messages/CFD2J3HT3).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.


## <img src="./static/img/typescript/logo.svg" width="50%"/>

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

Angular and many other frameworks use TypeScript to take advantage of its typechecking magic. While TypeScript may mean a bit of a learning curve for new developers, this guide covers the basics of TypeScript and work through examples to learn to harness the power of TypeScript.

## Outline

- Why TypeScript - learn what TypeScript is and how to compile it.
- IDE Support - configure TypeScript and learn about different IDEs that help support TypeScript development.
- Types - understand basic types and how to enforce them.
  ```typescript
  let isCarnivore: boolean = true;
  ```
- Functions - how to annotate functions parameters and return values, different parameter types available, and how to bind `this`.
  ```typescript
  function add(x: number, y: number): number {
    return x + y;
  }
  ```
- Classes - using classes and inheritance in TypeScript, explaining the ``constructor`` method, and using public, private, protected, and readonly modifiers.
  ```typescript
  class ParkEmployee {
    name: string;
    constructor(name) { this.name = name; }
    sayHi() {
      console.log(`Hi, my name is ${this.name}`);
    }
  }
  ```
- Interfaces - writing Interfaces, setting optional properties, and the power of using interfaces in classes and functions.
  ```typescript
  interface Dinosaur {
    name: string;
    breed: string;
    height: number;
    location: string;
  }
  ```
- Generics - explaining what generics are, why they are useful, and how to create a linked list using generics in TypeScript.
  ```typescript
  class GenericCollection<T> {
    private list: T[];
    pushItem(thing:T) {
      this.list.push(thing);
    }
  }
  ```
