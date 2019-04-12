@page rxjs-training/debugging Debugging
@parent rxjs-training 4

@description Learn how to debug RxJS.

@body

## The problem

In this section, we will:

- Learn how to debug RxJS observables.


## How to solve this problem

- Create a `log` helper that `console.log`s emitted values without causing side-effects.
- Use the `log` helper to log values emitted by `cardNumber`.



## What you need to know

RxJS can be tricky to debug. It seems like you should simply be able to
subscribe to an observable and output its values.

The problem with this is that:

1. Subscribing to an observable changes the state of the observable.
2. Observables (in contrast to Subjects) run their initialization code every time
   there is a new subscriber.

Many times you want to subscribe to an intermediate observable to see its
value.

The following example creates:

1. `randomNumbers` to emit random numbers.
2. `floats0to100` to emit the random numbers multiplied by 100.
3. `ints0to100` to emit the multiplied numbers rounded to the nearest integer.

If you `subscribe` to `floats0to100` to see its values, you will notice
that the `float` values do __not__ match the `int` values!!


```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;
const {map} = rxjs.operators;

let randomNumbers = Observable.create( (observer) => {
    observer.next( Math.random() );
    observer.next( Math.random() );
    observer.next( Math.random() );
});

// Operators
const toTimes100 = map( (value) => value * 100 );
const toRound = map( Math.round );

let floats0to100 = randomNumbers.pipe( toTimes100 );

//floats0to100.subscribe((value) => {
//    console.log("float", value);
//})

let ints0to100 = floats0to100.pipe( toRound );

ints0to100.subscribe((value) => {
    console.log("int", value);
})
</script>
```
@codepen


The [tap](https://rxjs-dev.firebaseapp.com/api/operators/tap) operator allows you
to perform a side-effect (such as logging) on every emission on a source observable.

The following uses tap to log `floats0to100` values so they match:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;
const {map, tap} = rxjs.operators;

let randomNumbers = Observable.create( (observer) => {
    observer.next( Math.random() );
    observer.next( Math.random() );
    observer.next( Math.random() );
});

// Operators
const toTimes100 = map( (value) => value * 100 );
const toRound = map( Math.round );

let floats0to100 = randomNumbers.pipe( toTimes100 )
    .pipe( tap( (value) => console.log("float", value) ) );

let ints0to100 = floats0to100.pipe( toRound );

ints0to100.subscribe((value) => {
    console.log("int", value);
});
</script>
```
@codepen
@highlight 17

We can generalize this pattern with a `log` operator like:

```js
const log = function(name) {
    return tap(value => console.log(name, value))
}
```

`log` can be used as follows:

```typescript
const number = source
    .pipe( mapToNumber )
    .pipe( log("number", value) );
```

> __NOTE:__ Notice that to log `number`, we call `.pipe( log(...) )`
> on the on what would be the `number` observable.

## The solution

@sourceref ./4-debugging.html
@codepen
@highlight 14,31-33,62,only
