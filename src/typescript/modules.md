@page typescript-training/modules Modules
@parent typescript-training 7

@description Modules

@hide 

## Modules

Modules are a way of grouping code to be executed within their own scope, opposed to a global scope. Modules give us a way to write DRY code, scope our variables, re-use parts of our code, are more easily tested, and mostly help us avoid writing applications full of that dreadful spaghetti code. In Typescript, modules are categorized into two types - internal(called namespaces) and external(just called modules).

### Exporting

To be able to use our declarations in other areas of our codebase, we can export them using the export keyword.

```javascript
export interface Dinosaur {
  name: string;
  location: string;
  teeth: number;
}
```

#### Export statements

We can also rename our declarations when exporting if need be

```javascript
interface Dinosaur {
  name: string;
  location: string;
  teeth: number;
}

export { Dinosaur as InGenDinosaur }
```

#### Default exports

Modules can export ONE default export using the keyword default.

Security.ts
```javascript
declare let s: Security;

export default s;
```

App.ts
```javascript
import s from "Security";

s.alert('the grid is down')
```

#### Re-exports


### Importing

```javascript
import { Dinosaur } from "./Dinosaur";

// or
import { Dinosaur as InGenDinosaur } from "./Dinosaur";
```
