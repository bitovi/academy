@page rxjs/request-payment Request payment
@parent RxJS 9

@description

@body

## The problem

In this section, we will:

- Simulate making a 2 second AJAX request to create a payment when someone submits the form.  
- Create a `pay` method that is called when the form is submitted.
- Create a `paySubmitted` `Subject` that emits `true` when
  `pay` is called.
- Create a `card` observable that emits an object with the
  `cardNumber`, `expiry`, and `cvc`:
  ```js
  {
      cardNumber,
      expiry,
      cvc
  };
  ```
- Create a `payments` observable that emits promises. Those
  promises resolve when the payment is complete. The `payments`
  observable should combine the `paySubmitted` and `card`
  observables.

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

- Use the following to create a Promise that takes 2 seconds to resolve:
  ```js
  new Promise(function(resolve) {
      setTimeout(function() {
        resolve(1000);
      }, 2000);
  });
  ```

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

## The solution

@sourceref ./9-request-payment.html
@codepen
@highlight 128-149,154,198,216-224,226-229,only
