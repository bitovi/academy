@page typescript Typescript
@parent bit-u 3
@description HERE IS A DESCRIPTION

@body

THis is the start of the body.

Outline:

- What and why of typescript
  - Typing
  - Object Oriented Programming
  - Compilation
- IDE support
  - VS Code?
  - Webstorm
  - Atom

  - string
  - number
  - boolean
  - array
  - tuple
  - enum
  - any
  - void
  - undefined
  - null
  - never
  - object
  - Type Assertions
- Type Annotations
- Declaring Variables
- Classes
  - Inheritance
  - Public v. Private v. Protected
  - Static properties
  - Abstract Classes
  - Constructor Function
  - Interface
- Enums
- Advanced Types
  - Polymorphic 'this' types
  - Index types
  - Mapped types
  - Conditional types
    - Type inference?
    - Predefined conditional types
- Function
  - Optional params
  - Default params
  - Rest params
  - This (in the context of Typescript)
  - =>
  - Overloads
- Generics ???
  - Generic Type Variables
  - Generic Types
  - Generic Classes
  - Generic Constraints
    - Type parameters
    - Class types
- Module
  - exports





```typescript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```
@codepen
