@page learn-rxjs/disable-while-pending Disable while pending
@parent learn-rxjs 11
@description Learn how to convert an observable to a multicast subject.

@body

## The problem

In this section, we will:

- Disable the payment button while the promise is pending (or the card is invalid).
- Make sure that submitting the form does not produce two requests.

## How to solve this problem

- Create a `this.disablePaymentButton` observable that combines `isCardInvalid` and `paymentStatus` using a `disablePaymentButton(isCardInvalid, paymentStatus)` function.
- Convert `this.paymentStatus` to a multicast `Subject`.

## What you need to know

Observables and their operators execute with every new subscription. This can cause problems
if that execution causes side effects. The following shows that the `square` mapping
runs twice, once for every subscription on the `squares` observable.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Subject } = rxjs;
  const { map } = rxjs.operators;

  const numbers = new Subject<number>();

  const square = map((x: number) => {
    console.log("mapping");
    return x * x;
  });

  const squares = numbers.pipe(square);

  squares.subscribe((value) => {
    console.log("squares1", value);
  });
  squares.subscribe((value) => {
    console.log("squares2", value);
  });

  numbers.next(2);
  // Logs: mapping
  //       squares1 4
  //       mapping
  //       squares2 4
</script>
```

@codepen

You can change this by converting the observable to a subject with:

```js
.pipe(share({ connector: () => new Subject() }))
```

The following shows this using this technique to run `square` only once
for all subscribers of `squares`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { Subject } = rxjs;
  const { map, share } = rxjs.operators;

  const numbers = new Subject<number>();

  const square = map((x: number) => {
    console.log("mapping");
    return x * x;
  });

  const squares = numbers.pipe(square).pipe(share({ connector: () => new Subject() }));

  squares.subscribe((value) => {
    console.log("squares1", value);
  });
  squares.subscribe((value) => {
    console.log("squares2", value);
  });

  numbers.next(2);
  // Logs: mapping
  //       squares1 4
  //       squares2 4
</script>
```

@codepen

Read more about this technique on [RxJS's documentation](https://rxjs.dev/guide/subject#multicasted-observables). Note that the `multicast` and `refCount` operators are [deprecated](https://rxjs.dev/deprecations/multicasting#multicast) in RxJS 7, and the [`share`](https://rxjs.dev/api/operators/share) operator used above is analogous to the functionality formerly provided by `multicast(() => new Subject()), refCount()`.

## Solution

@sourceref ./11-disable-while-pending.html
@codepen
@highlight 14,178-190,229,232-233,270-272,only
