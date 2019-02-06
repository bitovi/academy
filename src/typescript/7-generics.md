@page typescript/generics Generics
@parent typescript 7

@description Learn about what Generics are, why they are useful, and how to create a linked list using Generics in TypeScript.

@body


## Overview

In this part, we will:

- Understand the purpose and basics of generic functions
- Understand how to make generic classes
- Understand how to make recursive generic classes
- Create a TreeNode recursive generic class

## Basic Generics

Generics are a way of writing abstract code that allows the determination of types to be handled when the code is used. Generics let us reuse code for different types and improve maintainability. Lets see how with a small example.

Consider a function that wraps a value in an object:

```js
function wrapAsValue(value) {
    return {value: value};
}
```

Ideally, you'd want to use this function to wrap all sorts of values:

```js
let fourObj = wrapAsValue(4);  //-> {value: 4}
let hiObj = wrapAsValue("hi"); //-> {value: "hi"}
```

And you might want to pass those objects to other functions:

```js
function getDollars(obj: {value: number}){
    return "$"+obj.value.toFixed(2)
}

function getMessage(obj: {value: string}) {
    return obj.value + " world";
}

getDollars(fourObj); //-> "$4.00"
getMessage(hiObj);   //-> "hi world"
```

__But watch out!__  The following will __not__ error until _runtime_
 because strings do not have a `toFixed()` method.

```js
getDollars(hiObj);  
```

You don't see a compile time error because `hiObj` object looks like `{value: any}` to TypeScript.

Getting a compile time error can be solved in a variety of __inelegant__ ways:

- Way 1 - Define the type of the variables:
  ```typescript
  let fourObj: {value: number} = wrapAsValue(4);
  let hiObj:   {value: string} = wrapAsValue("hi");
  ```
- Way 2 - Write multiple functions:
  ```typescript
  function wrapStringAsValue(value: string) {
    return {value: value};
  }
  function wrapNumberAsValue(value: number) {
    return {value: value};
  }
  ```
- Way 3 - Overload `wrapAsValue` signatures:
  ```typescript
  function wrapAsValue(value: string): {value: string};
  function wrapAsValue(value: number): {value: number};
  function wrapAsValue(value: any) {
      return {value: value};
  }
  ```

With __generics__, this problem can be solved more simply:

```typescript
function wrapAsValue<MyType>(value: MyType): {value: MyType} {
    return {value: value};
}

let fourObj = wrapAsValue<number>(4);
let hiObj = wrapAsValue("hi");


function getDollars(obj: {value: number}){
    return "$"+obj.value.toFixed(2)
}

function getMessage(obj: {value: string}) {
    return obj.value + " world";
}

getDollars(fourObj);
getMessage(hiObj);
getDollars(hiObj);

```
@codepen
@highlight 1-6,only

The `<MyType>` part of the `wrapAsValue` definition is the __Generics__
part. This `<MyType>` allows us to capture the type the user provides, so that we can use that information later. In this case, we are using it to specify that the
return type is an object with a `MyType` `value`
property (`{value: MyType}`). This allows us to traffic that type information in one side of the function and out the other.

We can call generic functions in two ways:

- We can explicitly pass the type:
  ```typescript
   wrapAsValue<number>(4)
  ```
  Notice that `<number>` acts as a special set of arguments. Instead of
  arguments passed like `func(arg1, arg2, arg3)`, generic type arguments
  are passed like `func<Type1, Type2, Type3>`.

- The type can be inferred:
  ```typescript
  wrapAsValue("hi")
  ```
  Notice that we didn't explicitly pass the type n the angle brackets (`<>`). Instead,
  the compiler just looked at the value `"hi"` and set `MyType` to `string`.






## Generic Classes ##

Generic classes are quite common.  For example, [RxJS] subjects are a generic class that can publish values of a particular type:

```typescript
const cardNumber = new Subject<string>();

cardNumber.next("1234")
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
@codepen

The good - we can push any type to this list.  
The bad - we can push any type to this list.

```typescript
let myList = Collection();
myList.push(25);
myList.push('25');
```
@codepen


`myList` now holds an assortment of types and will be a likely source of
runtime errors.

Let's build a __generic__ `Collection` class instead.

```typescript
class GenericCollection<T> {
  private list: T[] = [];
  pushItem( thing:T ) {
    this.list.push(thing);
  }
}
```
@codepen

Now when we initialize this class we can specify a type to use.

```typescript
class GenericCollection<T> {
  private list: T[] = [];
  pushItem(thing:T) {
    this.list.push(thing);
  }
}

let myListOfStrings = new GenericCollection<string>();
myListOfStrings.pushItem('booop');
myListOfStrings.pushItem(5);
//error Argument type of '5' is not assignable to parameter of type 'string'


let myListOfNumbers = new GenericCollection<number>();
myListOfNumbers.pushItem(5);
myListOfNumbers.pushItem('boop');
//error Argument type of '"boop"' is not assignable to parameter of type 'number'

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

myListOfDinosaurs.pushItem({name: 'Charlie'});
//error Argument type '{ name: string; }' is not assignable to parameter of type 'Dinosaur'.
```
@codepen



## Recursive Generic Classes

A great example of the power of generics is creating a linked list with type safety.

The following is an example of a linked list for strings:

@sourceref ./7-0-linked-list.html
@codepen

Let's look at transforming this to use generics to use this list for more than just strings. First, we change our interface to take a generic type.

@sourceref ./7-0-1-interface.html
@codepen

The angle brackets with the T indicate that we have a type variable ``<T>``, and can take what the user provides between the brackets when using the interface. For example, a string:

@sourceref ./7-0-1-interface-string.html
@codepen
@highlight 13

Next we can refactor our class to take our new generic.

@sourceref ./7-0-2-new-class.html
@codepen
@highlight 12,13,14

Thanks to generics we're able to use the same ``LinkedList`` class in multiple different scenarios with any type.

## Exercise: `TreeNode`

### The Problem

Update the `6-tree-node.ts` file to create a recursive `TreeNode` class that can house a `value` and be used to create a tree structure of `left` and `right` nodes.

For example, we will be able to create a `TreeNode` with a root value and
comparison function as follows:

```typescript
function stringComparison(v1: string, v2: string): number {
	if(v1 > v2) {
		return 1;
	} else {
		return -1;
	}
};

let root = new TreeNode<string>("Jennifer", stringComparison);
```

Then we can add values to `root` like:

```typescript
root.add("Chasen");
```

This will add `Chasen` to a `left` `TreeNode` of `root` because
the `stringComparison` will return `1` (`Jennifer > Chasen`):

```typescript
root.left.value //-> "Chasen"
```

As we add other values, they will be added to either the right or left nodes
recursively:

```js
root.add("Tom");
root.add("Matthew");

root.right.value      //-> "Tom"
root.right.left.value //-> "Matthew"
```

Run the following to verify your solution:

```shell
npm run 6-generics
```


### The solution

<details>
<summary>Click to see the solution</summary>

```typescript
interface Comparison<T> {
    (v1:T,v2: T): number;
}

class TreeNode<T> {

	value: T;
	compare: Comparison<T>;
	left?: TreeNode<T>;
	right?: TreeNode<T>;

	constructor(val: T, compare: Comparison<T> ) {
		this.value = val;
		this.compare = compare;
	}

	add(val: T){
		if( this.compare(this.value, val) >= 1 ) {
			if(this.left == null) {
				this.left = new TreeNode(val, this.compare);
			} else {
				this.left.add(val);
			}

		} else {
			if(this.right == null) {
				this.right = new TreeNode(val, this.compare);
			} else {
				this.right.add(val);
			}
		}
	}
}

export default TreeNode;
```

</details>
