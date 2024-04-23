@page advanced-typescript/typing-systems Typing Systems
@parent advanced-typescript 1

@body

## Overview

Before jumping into some powerful TypeScript features, let’s step back for a second and look at types again. There will be no exercises in this section - allowing us to focus on updating our mental model of how TypeScript perceives types.

As previously discussed, types explain what you can and can’t do with a value. Given an object of the following type, we know what properties lie on it.

```ts
type ExampleType = {
  property1: string;
  proptery2: number;
};

type ExampleTypeTwo = {
  property3: string;
  property4: number;
};
```

And we know that if we have variables of those different types, they aren’t assignable to each other.

```ts
let a: ExampleType = {
  /** */
};
let b: ExampleTypeTwo = {
  /** */
};

a = b; // Error
```

However, what would happen if we have types with the same structure?

```ts
type First = {
  name: string;
};

type Second = {
  name: string;
};

let first: First = {
  /** */
};
let second: Second = {
  /** */
};

first = second; // ... is ok?!
```

Turns out, that TypeScript allows this. To understand why we need to look at how TypeScript evaluates and compares types.

## Nominal and Structural Typing

There are two main categories of typing systems when it comes to programming languages – nominal and structural. Nominal typing systems differentiate types based on their explicit name. This means that if a type has all the same properties within it, but is named differently, the two types are not equivalent. Take the following Swift example.

```swift
class Dog {
  let name: string
};

class Cat {
  let name: string
};
```

In this case, both `Cat` and `Dog` have only a `name` property of type `string`, but their names are different. Within a nominal typing system, a variable of type `Dog` could not be set to an instance of `Cat`.

```swift
var a = Dog(name: 'fido')
var b = Cat(name: 'kitty')

a = b // Error
```

Many popular programming languages like Swift (shown above) and C++ use nominal typing systems.

On the other hand, structural typing systems determine type equivalence (and difference) based solely on the properties the type has.

```ts
type Dog = { name: string };
type Cat = { name: string };

let a: Dog = { name: "fido" };
let b: Cat = { name: "kitty" };

a = b; // All good!
```

As you have probably figured out by now, TypeScript uses structural typing. It’s not alone though, many other languages like Haskell, OCaml, and Elm use structural typing as well. A good way to think of structural typing is through the application of the infamous duck test.

> If it walks like a duck and it quacks like a duck, then it must be a duck

The tradeoffs of these two systems are flexibility and type-safety. With structural typing there is a lot more flexibility as to what is accepted as a type; however, this can cause some issues like accidental type equivalence (as we’ve seen above). Nominal type systems avoid type equivalence issues, but the extra rigidity can make them harder to work with.

## TypeScript Types

A good mental model to have when thinking about TypeScript types is to imagine them as sets, where all the values in the sets share a similar structure (be it their entire shape or some sub-shape within it), the type declaration we write defines that shared structure. Let’s take a look at a concrete example. Take the declaration below.

```ts
type WithName = {
  name: string;
};
```

The WithName declaration defines the bare minimum requirements for TypeScript to consider something to be of type `WithName`. The `WithName` set includes all of the following and much more.

```ts
type NamedArrayLike = {
  [index: number]: string;
  name: string;
};

type Dog = {
  name: string;
  bark: () => void;
  walk: () => void;
};

type DifferentName = {
  name: string;
};

let withName: WithName = { name: "" };

const indexSignature: NamedArrayLike = { 0: "", 1: "", name: "" };
const dog: Dog = {
  bark: () => {},
  walk: () => {},
  name: "fido",
};
const differentName: DifferentName = { name: "different" };

// TypeScript is fine with all of these
withName = indexSignature;
withName = dog;
withName = differentName;
```

Anything that has a `name` property of type `string` is in that set.

## Trying to get the Best of Both Worlds

There are times when having some of the rigid type-safety of a nominally typed language would be helpful. Times when having a primitive type like string have special context in certain situations. Using TypeScript features there are some ways to provide some of the rigidity of nominal typing. Take an access token. A simple implementation could look something like this:

```ts
type AccessToken = string;
```

While we would get the semantic benefits of the type alias, any string would be passable to something typed as an `AccessToken`

```ts
function get(token: AccessToken, path: string) {
  /** */
}
```

This is an instance where we’d like string to have some nominal safety. To accomplish this, we can use two tools we’re already familiar with – intersections and type assertions. The basic idea is to take some type and create an intersection with some unique object literal. Then, to assign a variable to that type we use type assertions.

```ts
type AccessToken = string & { readonly "": unique symbol };

function getAccessToken(token: string): AccessToken {
  return token as AccessToken;
}

// `userAccessToken` is type `AccessToken`
let userAccessToken = getAccessToken("");

// ERROR:
// Type 'string' is not assignable to type 'AccessToken'.
// Type 'string' is not assignable to type '{ readonly "": unique symbol; }'
userAccessToken = "a";
```

`{readonly "": unique symbol}` looks strange, so let’s break it down real quick. We’ve defined a `readonly` property called `""` whose type is `unique symbol`. The `unique symbol` type is a subset of `symbol` and can only be created using `Symbol` or `Symbol.for`. Since symbols are unique, this creates a unique type and intersecting it with `string` provides the functionality of `string` with the uniqueness of the symbol. Essentially adding a unique identifier to our type.

Now our `AccessToken` type has been successfully separated from string and can function as a unique type.

```ts
function get(token: AccessToken, path: string) {
  /** */
}

// ERROR:
// Argument of type 'string' is not assignable to parameter of type 'AccessToken'.
// Type 'string' is not assignable to type '{ readonly "": unique symbol; }'.
get("abcd", "/movies");

get(getAccessToken("abcd"), "/movies"); // works
```

This solution isn’t perfect, but it does give us enough rigidity to accomplish our initial goals. There are many workarounds to this problem. TypeScript provides a [sandbox](https://www.typescriptlang.org/play?#code/PTAEHUAsFMDtQIagA4IE4BcCWBjArgDbqgYCey0oAZtNAQM6gFYDWlWGA5I3vdFYVBZ4AWwD29DAFgAUCFA4xAE2gAjBH3oAaEjFKI0lBEpVKhsDGNAAVctADKONFmQZEsM6uiKR0WfIQANwQsIlUCSioxNHdSMVhKAHdIXEhQXwRYRji8BUyFePosSTgMAlJ-MENy0HjdaCwYoJCw0I4KmUrQAAV0bAQCAB5bCgA+WS7rBDZGJDIKdzNFWEDoTFmCAlqqIQxGZDQxCkwsaHouy1rXLHiB2oT6ADoJmWEMNaoEHEp7bBw2GIAb1koCESgAXKBYHgRF40ABuEFQhC+SGSZywADmiJkoKc0AQ7yUAEEMGiMBjsUi8MglIToCSyaB0cIqbjmXhVCIOO80JC8B5+MIGaAAD7MimsnEAXxe8x+fwBAFVafTemgUaAALw9PpYAaDX64AGjHFdABKBKU8XKwzs406cjAUxm7lqqgAVt43JkzCJpmddvtDsdsIHDMYALQ20jPR3y0BG-5rABihxExO6AEltaBLcYY4bFWtTS95JbFGglIMANLQUj0NNiEQ6EbQB1dADCEfesxIdlAyVSoF4gYwMCYxTcYh2ByOazDjCo6a6dYbTZEi1AmKwq0Y4+gm4PoGCBDwlBnNjsca6ABkp4OUjg0mwGwVfNR0+DZAmAHJBLBMUJG5YF6TFAx1AAiSBm2gSCxVASDJGNNZ6Hg8VIIQVQxDwDB0MQ5YMC+PCzSdGwJ3oSAEAWS9jzpIjqGiR9hwJZ9tlAAA9IRGASBkGW-V4LA+L5KDA6As1gKJQGBdlsDKaByUpHFQTwNACEUqUkQQAAPawOAiAB+DSsRlF5lkkZFAkA4D4gkqJIQraJq3-KygOweIxO0XVwLssRRlzGTQRg1FpJIfSFMQgAJWDIJ0VT1MQ4B4OlLQtOw3DIUBML5MhSDiXSvC4rU3LgCwnC8NAFKkUI4jMuyiJcs7eIiJwQqR2KxKata5LUvZZDkzQeg6rkhrEKTAE0KKhLIOAfqJtKzYetkaVSPkbpjTtCgdDXegOzI7sCV7RB+wWVR9GQY1WXqZloGnWcQwXU5GB2rpl2bK8KEeUAAFF6D4Cx9U2fR8gGAgxESSNmAsqIYmgbSKWIq75S6YQYf9dz4Dezc5mvOUB3GtZ7GiDBukMKzoESXN1v+IsULQHRINgFE4IQyCaXohlSUg0tHXkAB5bkME26BtvrXayzAA76T7BMztAQxxCsrFrr4O6UAek5AxesisY+6Avt+-7+iB47wjEf5IYfGHQDhhHWqRuwUck6J0ZAz93pxz68YWAm0D03wAFlbuMQkkB1AWOFpgaGaZ3xudWsBvu0nAzxUYWdEtRXoCVWAQL2+QpaOz2khgQxYnV+dMH0YQ9e4CvQyerohzY61YE4adVjU6jBw4NJM7EVYc5Am8ZATaLfBc6yMc83Mk5TvA08ntyQM8hngrgnmuiTu2hbbHQA8JZ8h-ifPJZ7QNi8fNYjFgc6NbIcxa+DSvFy6dB2FgefTCEHYD30Ae1hEGQD3ccoAD4YCPrneII8EwABFSCx1wDPHU28NStUGEvGyoEEDgS8tBGKrM5qoXjhLUAv54i-kIGECIwtT6gELhfE6lA5Zwy-ldaEmwtwChUFQYUZhdZIFVl0S8c4G5nC+kqPgAgtjJDgKAHIoAqKrGOqeLA9E3bPm8CwGB+NixoFvGIMQLAaSWnoIQNwOpfYIW4UKBIZhxQcIIDiBMAA1AYaj6RKFMeY3M5DYCUM2FhGhvsDFGJMWccxm8yKWgwKpWAbZaGkNQcRfcE5DCxLQPAU8553bYz1iPFQKd37UAFPbOo4EMC+wAEKkCzLAgAFGoyE0JYRrAAJSQlJs2Yo0Ao4AlCcY5A3iCAYB5gmX2pjkCFEoDqGJcSEnykvBU6ptTYFRPkBJSQmRvgJLbHQhhMsBzNzSMUN0wgtmfwvDsJARS-o6CYmIT03om692OuZCkeBWpMQEJ-DGI9bmMF9k1TY3o3aBQlHTIaiY9EAG0AC6pl4wDmBREMpsAszvE3DqTZRFLkLLsJeIFYgQVovWWAS0ABHPAjQGSJN5mfQ6jCEzHIKCsBcGwthHAxncURj0zgXCsIYKlNKzDxHEd7SgxIcDfD+lgcI0AxK+VzJS6lhhqyKudmS8ixRdn2lITnZgbBagHhiPKLy1gUj0DbKAa0gZYBiDcOkuJx0EiJAuAOVQuFzAlGMOkTILhCDS2ujw4QHA3a0UtU7IoKhjo-LRV9AAmjhPI8AYwjj4Nqq1RyYDwByF0JRlB7VZhEMgZgOAOAWtORkux9xH45BiNYewTVJKARHvISAGAMDICGiARIfbHhmqcC4MomRMSPGiJiYA1ocD0GAFRDw2EjHAFwm0MgkYzWPA7SIAgQA) where instead of using `{ readonly "": unique symbol }` they use `{ __brand: "some unique string" }` and there is a Github [thread](https://github.com/Microsoft/TypeScript/issues/202) over 300 comments long on different ways to provide this kind of functionality. If you have the time it’s worth the read to see all the unique workarounds, along with some gotchas that could arise.

Now that we’ve had the chance to update our mental model a bit, it’s time to put it to work in the section where we look at how we can make generics even more powerful by constraining them!
