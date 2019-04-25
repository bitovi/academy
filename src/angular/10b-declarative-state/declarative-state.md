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

The code we've written thus far has been in an imperative style, i.e when an event occurs, we run code that changes
the state of the component accordingly. This model of programming is very familiar, although it can become quite difficult 
to trace the modifications to the state as an application grows in complexity.

A declarative style of programming expresses the state in terms of how it's generated from an event. Rather than reacting 
to an event and modifying the state, an event occurs and the state produces an updated value based on the actions that 
define it. This subtle distinction has some very useful implications.

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
@highlight 3-4, 195, 200-202, 303, 329, 334-336, 347, 357, 362, 367-369, 380, 391, 396, 398, 400-410, 412-415, 420, 426, 441, 445-447, 452, 455

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 14-30, 37-42, 49-99

__src/app/restaurant/restaurant.component.html__

@sourceref ./restaurant.component.html
@highlight 7-10, 17-20, 26-28