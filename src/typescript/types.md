@page typescript/types Types
@parent typescript 2

@description Basic Types.

## Basic Types

### Boolean

```javascript
let loading: boolean = true;
```

### Number

```javascript
let decimal: number = 7;
let hex: number = 0xF00D;
```

### String

```javascript
let name: string = 'Jennifer';
```

#### Quick tip - template strings

Strings that have embedded expressions.

```javascript
let myTemplateString: string = `I think ${ name } is pretty cool

Her favorite number is ${ decimal }.`;
```

### Array

```javascript
let list: number[] = [1, 2, 3];

let pets: Array<string> = ['Sake','Apollo','Butter']
```

### Tuple

```javascript
let sillyList: [number, string];

sillyList = [5, "boop"]; //typescript is happy

sillyList = ["boop", 5]; //will error
```

### Enum

Enums allow the aliasing of names to a list of numeric values. Like most indexing, enums start their first member at 0.

```javascript
enum Color { Red, Green, Blue }
let greenColor: Color = Color.Green
```

Enums can have their first value manually set, or manually set all values

```javascript
enum Month { January = 1, February, March, April, May, June }
let feb = Month[2];

enum Month { January = 1, March = 3, May = 5}
let may = Month[5];
```

### Any

Any describes a variable where we may not know the type.

```javascript
let my3rdPartyData: any = 5;
```

### Void

No type at all - commonly used with functions that don't return a value.

```javascript
function buttonClick(): void {
  console.log('I clicked a button');
}
```
### Null & Undefined

Null and Undefined are two separate types, and subtypes of all other types, meaning they can be assigned to another type like string or number unless the --strictNullChecks flag is used.

### Never

The never type represents a value that will never occur.

```javascript
function error(message: string): never {
    throw new Error(message);
}
```

### object

The object type represents all non-primitive types.

```javascript
// All primitive types
type Primitive =
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

// All non-primitive types
type NonPrimitive = object;

```

### Type assertions

Type assertions are a way to override the inferring of types. There are two different syntaxes, angle-brackets and as.

```javascript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

let otherValue: any = "this is a string";

let otherLength: number = (otherValue as string).length;
```
