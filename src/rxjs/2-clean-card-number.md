@page rxjs/clean-card-number Clean card number
@parent RxJS 2

@description Learn how to map an observable value to
another observable value.

@body

## The problem

In this section, we will:

- Create a `this.cardNumber` observable that contains the
  text of the `userCardNumber` input without spaces (`\s`) or dashes (`-`).
- Write out the value of the `this.cardNumber` observable.

## What you need to know

- RxJS has [operators](http://reactivex.io/documentation/operators.html)
  ([an older but better explanation](http://reactivex.io/rxjs/manual/overview.html#operators)) that are used to
  convert one observable to another observable.  In RxJS, you typically create your own operators
  by using operator generator functions like [map](https://rxjs-dev.firebaseapp.com/api/operators/map).

  Those operators are passed to [source.pipe(operator)](https://rxjs-dev.firebaseapp.com/api/index/function/pipe) to convert the source observable to a new observable.

  The following uses `map` to create a `mapToNumber` operator:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {Subject} = rxjs;
  const {map} = rxjs.operators;

  const mapToNumber = map( value => +value );

  const source = new Subject();
  const number = source.pipe( mapToNumber );

  number.subscribe( console.log );

  source.next(true); // logs 1
  source.next("2");  // logs 2
  </script>
  ```
  @codepen

- Use `cardNumber.replace(/[\s-]/g, "")` to clean the card number.
- Write out the `cardNumber` after the `userCardNumber` like:
  ```html
  CardNumber: {{ (cardNumber | async) }} <br/>
  ```


## The solution

@sourceref ./2-clean-card-number.html
@codepen
@highlight 14,16-20,41,48,only
