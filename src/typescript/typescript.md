@page learn-typescript Learn TypeScript
@parent bit-academy 4
@description This course covers the basic essentials of TypeScript. At the end, you should be
ready to develop projects in TypeScript.

@body

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img alt="" src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other
Angular, React, CanJS and JavaScript problems.

Please ask questions related to TypeScript in the [TypeScript chat room](https://discord.gg/qxqgyGquk7).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

<img alt="TypeScript" src="./static/img/typescript/logo.svg" width="50%"/>

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

Many front-end frameworks use TypeScript to take advantage of its typechecking magic. While TypeScript may mean a bit of a learning curve for new developers, this guide covers the basics of TypeScript and work through examples to learn to harness the power of TypeScript.

## How to follow this course

This course will teach you about TypeScript concepts and have an environment for you to practice in. Running the tests will catch any problems if the code was not written correctly or as expected. Pay close attention to how you name and save the files.

The ✏️ icon will be used to indicate when commands need to be run or when files need to be created or updated.

If you have any issues or suggestions as you move through this training, we’d love for you to submit a <a href="https://github.com/bitovi/academy/issues/new">GitHub issue</a> for it! 💖

## Outline

### Why TypeScript?

Learn what TypeScript is and why it’s valuable on a project.

### IDE support

Learn about different IDEs that help support TypeScript development.

### Setting up your environment

Install prerequisites and create a new Node project with TypeScript.

### Exporting and importing

Export values from files and import them in other files.

```ts
export function constrain(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

@highlight 5-7

### Types

Understand basic types and how to enforce them.

```typescript
let isCarnivore: boolean;
```

### Functions

Annotate functions parameters and return values, use different parameter types, and bind `this`.

```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

### Classes

Learn how to use classes and inheritance in TypeScript, understand the `constructor` method, and use the `public`, `private`, `protected`, and `readonly` modifiers.

```typescript
class Human {
  constructor(
    public firstName: string,
    public lastName: string,
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

### Interfaces

Learn how to write Interfaces, set optional properties, and use interfaces in classes and functions.

```typescript
interface Dinosaur {
  name: string;
  breed: string;
  height: number;
  location: string;
}
```

### Using `keyof` and `typeof`

Learn how to use `keyof` and `typeof` to create new types from types and objects.

```typescript
type Dino = {
  name: string;
  type: "herbivore" | "carnivore";
  age: number;
};

type DinoKeys = keyof Dino; // "name" | "type" | "age"
```

@highlight 7

### Generics

Learn about what Generics are, why they are useful, and how to create a linked list using Generics in TypeScript.

```typescript
class GenericCollection<T> {
  private list: T[];
  pushItem(thing: T) {
    this.list.push(thing);
  }
}
```

### Utility Types

Use utility types provided by TypeScript.

```typescript
type Species = "Tyrannosaurus rex" | "Triceratops horridus" | null | undefined;

type NNSpecies = NonNullable<Species>;
```

@highlight 3

## Next steps

✏️ Head over to the [first lesson](learn-typescript/why-typescript.html) to learn about why TypeScript is valuable on projects.
