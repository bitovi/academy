@page learn-rxjs/show-paying Show paying
@parent learn-rxjs 10

@description Learn how to flatten an observable
that emits observables. Learn how to order observables.

@body

## The problem

In this section, we will:

- Change the button's text to **Paying** while the
  `payments` promise is pending and to **Pay** while
  waiting to pay or payment has completed.

## How to solve this problem

- Create a `this.paymentStatus` observable that emits **paymentStatus** objects:
  - `{ status: "waiting" }` - when the form is waiting to be
    submitted.
  - `{ status: "pending" }` - when the promise is pending.
  - `{ status: "resolved", value }` - when the promise
    has resolved. Includes the resolved value.
- To create `this.paymentStatus` we first will need to
  create a `paymentStatusObservables` observable from payments like:

  ```js
  const paymentStatusObservables = payments.pipe(toPaymentStatusObservable);
  ```

  The `toPaymentStatusObservable` operator will convert the promises in
  `payments` to Observables that publish **paymentStatus** objects. This means
  that `paymentStatusObservables` is an Observable of Observables of
  **paymentStatus** objects like: `Observable<Observable<PaymentStatus>>`.

  For example, when a payment promise is published from `payments`, `paymentStatusObservables` will publish an Observable that publishes:

  1. `{ status: "pending" }`, and then
  2. `{ status: "resolved", value }`.

  Then, when a new payment promise is published from `payments` again, `paymentStatusObservables` will publish an new Observable that publishes similar **paymentStatus** objects.

  Finally, `this.paymentStatus` will be a result of merging (or flattening)
  the observables emitted by `paymentStatusObservables`.

## What you need to know

This is a tricky problem. A promise has state (if it's pending or resolved). We need
to convert this state to observables. The pattern is to map the promises to an observable of
observables and then _flatten_ that observable with `mergeAll`.

- [from](https://rxjs.dev/api/index/function/from) - converts a
  `Promise` to an observable. The following `thousand` observable emits
  `1000` when `promise` resolves:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { from } = rxjs;

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(1000);
      }, 2000);
    });

    const thousand = from(promise);

    thousand.subscribe(console.log);
    // thousand: 1000X
  </script>
  ```

  @codepen

  > HINT: `from` and `map` can be used to convert the payment promises to
  > an observable that emits `{status: "resolved", value}`.

- [concat](https://rxjs.dev/api/index/function/concat) concatenates streams so events are produced in order.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { of, zip, timer, from, concat } = rxjs;

    function sequentially(value, dueTime, period) {
      return zip(
        from(value),
        timer(dueTime, period),
        value => value
      );
    }

    const first = sequentially(["A", "B"], 0, 1000);
    const second = sequentially(["x", "y"], 500, 1000);

    // first:   -A---BX
    // second:  ---x---y_X
    const letters = concat(first, second);

    fullName.subscribe(console.log);
    // letters: -A---B-x-yX
  </script>
  ```

  @codepen

  > HINT: `concat` can be used to make an observable emit a `{ status: "pending" }` > **paymentStatus** object before emitting the `{ status: "resolved", value }` **paymentStatus** object.

- [startWith](https://rxjs.dev/api/operators/startWith)
  returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.

  The following uses `startWith` to add `"A"` before the `"X"` and `"Y"`
  values are emitted.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { of, zip, timer, from } = rxjs;
    const { startWith } = rxjs.operators;

    function sequentially(value, dueTime, period) {
      return zip(
        from(value),
        timer(dueTime, period),
        value => value
      );
    }

    const xAndY = sequentially(["X", "Y"], 0, 1000);
    // xAndY:   ---X---YX

    const letters = xAndY.pipe(startWith("A"));

    letters.subscribe(console.log);
    // letters: A-X---Y
  </script>
  ```

  @codepen
  @highlight 17

  > HINT: `startWith` is used by `toPaymentStatusObservable` to make sure
  > a payment status of "waiting" is published first.

- [of](hhttps://rxjs.dev/api/index/function/of) converts a value (or values)
  to a observable.

  ```typescript
  of(10, 20, 30).subscribe((next) => console.log('next:', next));
  // result:
  // 'next: 10'
  // 'next: 20'
  // 'next: 30'
  ```

  > HINT: `of` can be used to convert plain **paymentStatus** objects into an observable
  > that emits the **paymentStatus** object.

- The static [pipe](https://rxjs.dev/api/index/function/pipe) function can be used
  to combine operators. The following makes a `squareStartingWith2` operator that ensures
  a `2` will be the first number squared and a `4` the first value emitted:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { from, pipe, Subject } = rxjs;
    const { map, startWith } = rxjs.operators;

    const squareStartingWith2 = pipe(
      startWith(2),
      map(x => x * x)
    );

    const number = new Subject();

    const square = number.pipe(squareStartingWith2);

    square.subscribe(console.log); //-> logs 4

    number.next(3);                //-> logs 9
  </script>
  ```

  @codepen

  > HINT: `pipe` can be used to combine:
  >
  > - a `map` operator that will take a payment promise and map that to an
  >   Observable of payment status objects.
  > - a `startWith` operator that ensures an Observable that emits `{ status: "waiting" }`
  >   is emitted first.

- [mergeAll](https://rxjs.dev/api/operators/mergeAll) takes an observable that emits inner observables
  and emits what the inner observables emits.

  In the following example, `observables` emits:

  1. An observable that emits numbers, then
  2. An observable that emits letters.

  `mergeAll` _flattens_ `observables` so that `values` emits
  the numbers and letters directly.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { of } = rxjs;
    const { mergeAll } = rxjs.operators;

    const numbers = of(1, 2, 3);
    const letters = of("a", "b", "c");

    const observables = of(numbers, letters);
    // observables: [1-2-3]-[a-b-c]X

    const values = observables.pipe(mergeAll());

    values.subscribe(console.log);
    // values: 1-2-3-a-b-cX
  </script>
  ```

  @codepen
  @highlight 12

- Read a value from an observable's last emitted value with the
  conditional operator (`?.`) like:
  ```html
  {{ (paymentStatus | async)?.status }}
  ```
- Use the ternary operator (` condition ? truthy : falsy`) in Angular like:
  ```html
  {{ status === "pending" ? "Paying" : "Pay" }}
  ```

## The Solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./10-show-paying.html
@codepen
@highlight 148-176,216,256-258,only
</details>
