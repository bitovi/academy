@page rxjs/show-paying Show paying
@parent RxJS 10

@description Learn how to flatten an observable
that emits observables.  Learn how to order observables.

@body

## The problem

In this section, we will:

- Change the button's text to __Paying__ while the
  `payments` promise is pending.

We will do this with:

-  A `this.paymentStatus` observable that emits paymentStatus objects:
   - `{status: "waiting"}` - when the form is waiting to be
     submitted.
   - `{status: "pending"}` - when the promise is pending.
   - `{status: "resolved", value}` - when the promise
     has resolved.  Includes the resolved value.
- A `paymentStatusObservable` operator that
  emits observables that emit paymentStatus objects.

## What you need to know

This is a tricky problem. A promise has state (if it's pending or resolved). We need
to convert this state to observables.  The pattern is to map the promises to an observable of
observables and then _flatten_ that observable with `mergeAll`.

- [concat](https://rxjs-dev.firebaseapp.com/api/index/function/concat) concatenates streams so events are produced in order.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {of, zip, timer, from, concat} = rxjs;

  function sequentially(value, dueTime, period){
      return zip(
          from(value),
          timer(dueTime, period),
          value => value
      )
  }

  const first = sequentially(["A", "B"], 0, 1000);
  const second = sequentially(["x", "y"], 500, 1000);

  // first:   ---A---BX
  // second:  -----x---y_X
  const letters = concat(first, last);

  fullName.subscribe(console.log);
  // letters: ---A---B-x---y
  </script>
  ```
  @codepen
- [startWith](https://rxjs-dev.firebaseapp.com/api/operators/startWith)
  returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {of, zip, timer, from} = rxjs;
  const {startWith} = rxjs.operators;

  function sequentially(value, dueTime, period){
      return zip(
          from(value),
          timer(dueTime, period),
          value => value
      )
  }

  const xAndY = sequentially(["X", "Y"], 0, 1000);
  // xAndY:   ---X---YX

  const letters = xAndY.pipe( startWith("A") );

  letters.subscribe(console.log);
  // letters: A-X---Y
  </script>
  ```
  @codepen

- [mergeAll](https://rxjs-dev.firebaseapp.com/api/operators/mergeAll) takes an observable that emits inner observables
  and emits what the inner observables emits.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {of, zip, timer, from} = rxjs;
  const {map, mergeAll} = rxjs.operators;

  function sequentially(value, dueTime, period){
      return zip(
          from(value),
          timer(dueTime, period),
          value => value
      )
  }

  const count = sequentially([1, 2], 0, 500);
  // count: 1--2X

  const observableOfObservables = count.pipe( map((count) => {
    return sequentially([10+count, 20+count],0,1000);
  }) );
  // spawned 1: 11----21X
  // spawned 1: --12----22X

  const numbers = observableOfObservables.pipe( mergeAll() );

  numbers.subscribe(console.log);
  // numbers: 11--12--21-22X
  </script>
  ```
  @codepen

- [of](https://rxjs-dev.firebaseapp.com/api/index/function/of) converts a value (or values)
  to a promise.
  ```typescript
  of(10, 20, 30)
  .subscribe(
    next => console.log('next:', next),
    err => console.log('error:', err),
    () => console.log('the end'),
  );
  // result:
  // 'next: 10'
  // 'next: 20'
  // 'next: 30'
  ```
- [from](https://rxjs-dev.firebaseapp.com/api/index/function/from) - converts an observable
  from a `Promise` or other values (like an iterable):

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {from} = rxjs;

  const promise = new Promise(function(resolve) {
      setTimeout(function() {
        resolve(1000);
      }, 2000);
  });

  var thousand = from(promise);

  thousand.subscribe(console.log);
  // thousand: 1000X
  </script>
  ```
  @codepen

- The static [pipe](https://rxjs-dev.firebaseapp.com/api/index/function/pipe) function can be used
  to combine operators:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {from, pipe, Subject} = rxjs;
  const {map, startWith} = rxjs.operators;

  const squareStartingWith2 = pipe(
    startWith(2),
    map( x => x*x )
  );

  const number = new Subject();

  const square = number.pipe(squareStartingWith2);

  square.subscribe( console.log ) //-> logs 4

  number.next(3)                  //-> logs 9
  </script>
  ```
  @codepen


## The solution

@sourceref ./10-show-paying.html
@codepen
@highlight 13-14,151-179,211,250-252,only
