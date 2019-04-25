@page learn-angular/declarative-state Optional: Declarative State
@parent learn-angular 10b

@description Modify Restaurants component to derive state via RxJS streams

@body

## Overview

In this part, we will:

- Update the restaurant component so states, cities & restaurants are RxJS streams
- Trigger side effects of values produced by the streams through actions that occur as part of the stream
    - A side effect is something not directly controlled by the value that is emitted by the stream.
    - _e.g_ toggling a form control to be enabled / disabled 

**Note:** It'll help to have completed [Bitovi Academy's RxJS training](/learn-rxjs.html) before attempting
the following exercise, but it's not required. Read on if you're interested in why you might want to use declarative state. 

## Imperative vs Declarative state

To understand the difference between imperative and declarative styles of programming we first need to review the 
concept of state. State is essentially the "remembered information" of a program, _i.e_ the variables used as part of 
the program. Imperative & declarative state differ in how the program specifies the state.

The code we've written thus far has been in an imperative style, _i.e_ when events occur, code runs that changes
the state of the program accordingly. The program state is defined by actions that directly modify it. This model of 
programming is very familiar, although it can become quite difficult to trace the modifications to the state as an 
application grows in complexity.

@sourceref ./imperative.sample.html
@codepen

A declarative style of programming expresses the state in terms of how values should be generated. The state is defined
by which events it should react to and what actions will occur to produce values. This subtle distinction has 
some very useful implications.

@sourceref ./declarative.sample.html
@codepen

Declarative state, once you're familiar with it, is typically easier to follow. Understanding how a piece of the program's
state is generated only requires reading the state's definition. The actions that are part of the definition explain 
everything about how the state is created. In imperative code you'd need to read the code anywhere the state is modified.

Code using declarative state is often shorter than imperative code since you're not needing to write as much flow control logic.

Declarative state can be less error / side effect prone since it's typically more specific about how state is generated 
compared to imperative code which may modify state under conditions which may at first seem correct, but end up having 
unintended consequences. 

An additional benefit of Angular + RxJS is that imperative side effects (that we previously accomplished in a
subscription to an event, _e.g_ toggling a form control to be enabled / disabled) can now be done in an action taken during the generation 
of a value by a stream. Avoiding subscriptions removes the need to manage them in `onDestroy`.

## Exercise: Update states, cities & restaurants to be observables

### The Problem 

Convert the imperatively managed state in the restaurant component to declarative state. 

When you're finished the component members `state`, `cities` & `restaurants` will be of the types `Observable<Data<State>>`, 
`Observable<Data<City>>` and `Observable<Data<Restaurant>>` respectively. Each will be defined as a set of RxJS 
operators that produce the type from a response emitted by a service layer request or an event emitted by a form 
control (which in turn may make a request).

### What You Need To Know

- How to perform common RxJS operations like:
    - setting the initial value to be emitted
    - transforming a value emitted
    - emit values into a stream from another stream
    - take action based on a value as it emitted by a stream
    - multicasting emissions of a "cold" observable and handling late subscribers
 
 You've learnt all of the above as part of the earlier sections on this page! Completing the 
 [Bitovi Academy's RxJS training](/learn-rxjs.html) may help however. 
 
### How To Verify Your Solution Is Correct

Update the spec file __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec.ts
@highlight 3-4, 197, 202-204, 304, 350, 355-357, 368, 383, 388-390, 401, 417, 419, 421-431, 433-426, 441, 447, 462, 466-468, 473, 476, only

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 14-30, 37-42, 49-99, only

__src/app/restaurant/restaurant.component.html__

@sourceref ./restaurant.component.html
@highlight 7-10, 17-20, 26-28, only