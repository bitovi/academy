@page rxjs/debugging Debugging
@parent RxJS 3

@description Learn how to debug RxJS.

@body

## The problem

In this section, we will:

- Learn how to debug RxJS observables.
- Create a `log` helper that `console.log`s emitted values without causing side-effects.
- Use the `log` helper to log values emitted by `cardNumber`.



## What you need to know

RxJS can be tricky to debug. It seems like you should simply be able to
subscribe to an observable and output its values.

The problem with this is that:

1. Subscribing to an observable changes the state of the observable.
2. Observables (in contrast to Subjects) run their initialization code every time
   there is a new subscriber.

The following shows subscribing to the intermediate `number` value results in
extra `mapToNumber` calls:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Subject} = rxjs;
const {map} = rxjs.operators;

const mapToNumber = map( (value) => {
    console.log("mapToNumber");
    return +value;
} );
const square = map( value => value*value );

const source = new Subject();
const number = source.pipe( mapToNumber );

number.subscribe((value) => {
    console.log("number", value);
})

const squareNumber = number.pipe( square );

squareNumber.subscribe( (value) => {
    console.log("squareNumber", value);
} );

source.next(true); // logs mapToNumber
                   //      number 1
                   //      mapToNumber
                   //      squareNumber 1

source.next("2");  // logs mapToNumber
                   //      number 2
                   //      mapToNumber
                   //      squareNumber 4
</script>
```
@codepen

The [tap](https://rxjs-dev.firebaseapp.com/api/operators/tap) operator allows you
to perform a side-effect (such as logging) on every emission on a source observable.

The following uses tap to log number values:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Subject} = rxjs;
const {map, tap} = rxjs.operators;

const mapToNumber = map( (value) => {
    console.log("mapToNumber");
    return +value;
} );
const square = map( value => value*value );

const source = new Subject();
const number = source
    .pipe( mapToNumber )
    .pipe( tap( (value) => console.log("number", value) ) );

const squareNumber = number.pipe( square );

squareNumber.subscribe( (value) => {
    console.log("squareNumber", value);
} );

source.next(true); // logs mapToNumber
                   //      number 1
                   //      squareNumber 1

source.next("2");  // logs mapToNumber
                   //      number 2
                   //      squareNumber 4
</script>
```
@codepen

We can generalize this pattern with a `log` operator like:

```js
const log = function(name) {
    return tap(ev => console.log(name, ev))
}
```

`log` can be used as follows:

```typescript
const number = source
    .pipe( mapToNumber )
    .pipe( log("number", value) );
```



## The solution

@sourceref ./3-debugging.html
@codepen
@highlight 14,22-24,52-53,only
