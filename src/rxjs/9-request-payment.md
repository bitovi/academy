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
- Create a `appComponent.paySubmitted` `Subject` that emits `true` when
  `pay` is called.
- Create a `card` observable like:
  ```js
  const card = combineCard(this.cardNumber, this.expiry, this.cvc);
  ```
  `card` should publish objects with the `cardNumber`, `expiry`, and `cvc`:
  ```js
  {
      cardNumber,
      expiry,
      cvc
  };
  ```
- Create a `payments` observable like:
  ```js
  const payments = paymentPromises(this.paySubmitted, card);
  ```
  `payments` publishes [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) when `this.paySubmitted` emits a value. Those
  promises resolve when the payment is complete.

  The `payments` observable
  will not be used in the template so we will need to
  subscribe to it as follows:
  ```js
  payments.subscribe( (paymentPromise)=> {
      paymentPromise.then(function(){
          console.log("payment complete!");
      });
  });
  ```
- Log `console.log("Asking for token with", card)` when
  the request is made.

## What you need to know

- Use `(event)="method($event)"` to listen to an event in the
  template and call a method with the event.
  ```html
  <form (submit)="pay($event)">
  ```
  Methods are on your component look like:
  ```typescript
  class AppComponent {
      pay(){

      }
  }
  ```
- Call [event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) to prevent an submit event from posting
  to a url.

- [withLatestFrom](https://rxjs-dev.firebaseapp.com/api/operators/withLatestFrom) works like
  [combineLatest](https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest), but it
  only publishes when the source observable emits a value. It publishes an array
  with the last source value and sibling values.

  ```js
  source.pipe( withLatestFrom(siblingObservable1, siblingObservable2, ...) )
  ```

  The following will log the latest random number whenever
  the page is clicked:

  ```html
  <div id="clickMe">Click Me</div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {fromEvent, interval} = rxjs;
  const {map, withLatestFrom} = rxjs.operators;

  let randomNumbers = interval(1000).pipe( map( () => Math.random() ) );

  let clicks = fromEvent(clickMe, "click");

  clicks.pipe( withLatestFrom(randomNumbers) )
    .subscribe( ( [clickEvent, number ] ) => {
      console.log(number);
    } );
  </script>
  ```
  @codepen

- Use the following to create a Promise that takes 2 seconds to resolve:
  ```js
  new Promise(function(resolve) {
      setTimeout(function() {
        resolve(1000);
      }, 2000);
  });
  ```

## The solution

@sourceref ./9-request-payment.html
@codepen
@highlight 14,118-139,144,188,206-214,216-219,only
