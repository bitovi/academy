@page learn-rxjs/request-payment Request payment
@parent learn-rxjs 9

@description

@body

## The problem

In this section, we will:

- Simulate making a 2 second AJAX request to create a payment when someone submits the form.
- Log `console.log("Asking for token with", card)` when the request is made.
- Log `console.log("payment complete!");` when the payment is complete.

## How to solve the problem

- Create a `appComponent.pay(event)` method that is called when the form is submitted.
- Create a `appComponent.paySubmitted$` `Subject` that emits when
  `pay` is called.
- Create a `card$` observable like:
  ```js
  const card$ = combineCard(this.cardNumber$, this.expiry$, this.cvc$);
  ```
  `card` should publish objects with the `cardNumber`, `expiry`, and `cvc`:
  ```js
  {
    cardNumber,
    expiry,
    cvc,
  };
  ```
- Create a `payments$` observable like:

  ```js
  const payments$ = paymentPromises(this.paySubmitted$, card$);
  ```

  `payments` publishes [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) when `this.paySubmitted` emits. Those
  promises resolve when the payment is complete.

  The `payments` observable
  will not be used in the template so we will need to
  subscribe to it as follows:

  ```js
  payments$.subscribe((paymentPromise) => {
    paymentPromise.then(() => {
      console.log('payment complete!');
    });
  });
  ```

- Log `console.log("Asking for token with", card)` when
  the request is made.

## What you need to know

- Use `(event)="method($event)"` to listen to an event in the
  template and call a method with the event.

  ```html
  <form (submit)="pay($event)"></form>
  ```

  Methods are on your component look like:

  ```typescript
  class AppComponent {
    pay() {

    }
  }
  ```

- Call [event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) to prevent an submit event from posting
  to a url.

- [withLatestFrom](https://rxjs.dev/api/operators/withLatestFrom) works like
  [combineLatest](https://rxjs.dev/api/index/function/combineLatest), but it
  only publishes when the source observable emits a value. It publishes an array
  with the last source value and sibling values.

  ```js
  source.pipe(withLatestFrom(siblingObservable1, siblingObservable2, ...));
  ```

  The following will log the latest random number whenever
  the page is clicked:

  ```html
  <div id="clickMe">Click Me</div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { fromEvent, interval } = rxjs;
    const { map, withLatestFrom } = rxjs.operators;

    const randomNumbers = interval(1000).pipe(map(() => Math.random()));

    const clicks = fromEvent(clickMe, "click");

    clicks
      .pipe(withLatestFrom(randomNumbers))
      .subscribe(([clickEvent, number]) => {
        console.log(number);
      });
  </script>
  ```

  @codepen

- Use the following to create a Promise that takes 2 seconds to resolve:
  ```js
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1000);
    }, 2000);
  });
  ```

## The solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./9-request-payment.html
@codepen
@highlight 14,122-145,150,202,221-229,232-235,only
</details>
