@page learn-angular/declarative-state Optional: Declarative State
@parent learn-angular 10b

@description Modify Restaurants component to derive state via RxJS streams

@body

## Overview

In this part, we will:

- Learn the differences between imperative and declarative state
- Learn some essential RxJS operators
- Update the restaurant component so states, cities & restaurants are RxJS streams
- Trigger side effects of values produced by the streams
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
relative to imperative code which may modify state under conditions which may at first seem correct, but end up having 
unintended consequences. 

An additional benefit of Angular + RxJS is that imperative side effects, like those that we previously accomplished in a
subscription to an event (_e.g_ toggling a form control to be enabled / disabled) can now be done in an action taken 
during the generation of a value by a stream. Avoiding subscriptions removes the need to manage them in `onDestroy`.

## Essential RxJS operators
RxJS operators are the actions that occur to generate values in a stream. There are dozens of operators that do things 
like transform values, filter values, combine streams, and much more. We'll just be touching on a small selection
of operators.

### Initializing A Stream
A common situation is working with streams that only produce a value after an event, for example when an HTTP request
completes or when a value changes in a form control. When using a stream like this in your components, you'll likely
want to have an initial "base state" that your view can use during the initial render. In RxJS this is handled by the 
`startWith` operator, which emits a value when the stream is first subscribed to.

@sourceref ./startWith.html
@codepen

### Transforming The Values Of A Stream
When values are emitted from a stream it's common to transform them in some way before they're used by your application. 
One operator used for this is the `map` operator, which takes an emitted value and returns a modified value that will
be passed to the subsequent operators in the stream.

@sourceref ./map.html
@codepen
 
### Emitting Values From Another Stream
When using a stream you may want to emit values from another stream as part of the original stream. RxJS offers a 
variety of ways to do this, but the one we'll demonstrate is the `flatMap` operator. Like the map operator it takes an
emitted value from a stream, but instead of returning a modified value it returns another stream whose emitted values
will be passed to the subsequent operators.

@sourceref ./flatMap.html
@codepen  

### Acting Imperatively On A Value In A Stream
Although streams are great, eventually they need to integrate with other code that doesnt know how to consume from 
streams. You'll either need to subscribe to the stream or add the `tap` operator to the stream. 

Streams don't start emitting values until they're subscribed to, so if whatever behaviour you want to occur
is the sole use of the stream, you'll need to subscribe (and unsubscribe when appropriate). However, if the stream 
already has a subscriber, the behaviour could be viewed as a "side effect" of the stream; something that isn't 
the consumer of the values, but an action that should occur whenever a value travels through the stream nonetheless. 
The most common example of this is logging the values moving through the stream. 

This is what the `tap` operator is used for, it takes the value moving through the stream, acts on it and returns 
nothing. The value passed to `tap` continues through the stream as normal.  

@sourceref ./tap.html
@codepen

### Handling Multiple Subscribers To A Stream 
An advanced topic when working with streams is how streams behave when they have multiple subscribers. To understand 
this you first need an understanding of "cold" vs "hot" observables.
 
A "cold" observable is one that creates a new producer of events whenever they receive a new subscriber. An example is 
observables returned from the Angular `HttpClient`. Whenever there's a new subscriber to that observable a new request 
is made.

A "hot" observable is one that doesn't create a new producer for every subscriber. Instead it shares a single producer 
among all the subscribers. An example of this could be an observable that listens for WebSocket events on an existing 
WebSocket connection. Whenever there's a new subscriber to the observable, a new listener is added, but a new connection 
isn't opened, the connection is being shared between the subscribers.

This distinction is clearly important, you wouldn't want to make separate requests for states in every place that 
you reference the states observable in the view. So to resolve that RxJS contains a variety of ways to make a 
"cold" observable "hot", and share the stream between subscribers. This is a particularly complex topic so we'll only be 
touching on a single way, the `shareReplay` operator.

The `shareReplay` operator essentially works by making the preceding portion of the stream "hot". Once the stream is 
subscribed to, `shareReplay` will share the results produced, preventing multiple instances of the stream from running. 
That's the "sharing" functionality of `shareReplay`, but it also performs the other important function of "replaying".

In our template we have code that looks like:
```html
<ng-container *ngIf="!states.isPending">
  <option value="">Choose a state</option>
  <option *ngFor="let state of states.value" value="{{state?.short}}"> {{state?.name}}</option>
</ng-container>
```
This code poses a problem since the `ngFor` doesn't get rendered until after `states.isPending === false`. If states was a
stream, `isPending` would only be false after the response from the HTTP request was produced. After that `ngFor` would 
be rendered, subscribe to `states`, and do... nothing. This is because the `ngFor` subscribed late, after the data it 
needed was already produced by the stream. `ngFor` missed it's chance to get that data.

What we need is for `ngFor` to get replayed the last value emitted by the stream once it subscribes. `shareReplay(1)`
will buffer the last emission of the preceding stream, and replay it for any late subscribers. Now when `ngFor` gets 
rendered and subscribes, it will receive the successful HTTP request and render the list of state options.

@sourceref ./shareReplay.html
@codepen

To go more in depth about this topic check out these articles:
- [Hot vs Cold Observables](https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339)
- [The Magic Of RxJS Sharing Operators](https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255)

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
@highlight 14-19, 21-30, 37, 40-42, 52-57, 59-76, 78-92, 96-99, only

__src/app/restaurant/restaurant.component.html__

@sourceref ./restaurant.component.html
@highlight 7-8, 10, 17-18, 20, 26-28, only