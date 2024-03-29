@page learn-rxjs/clean-card-number Clean card number
@parent learn-rxjs 2

@description Learn how to map an observable value to
another observable value.

@body

## Video

Who has time to read? This video covers the content on this page. Watch fullscreen.

<iframe width="560" height="315" src="https://www.youtube.com/embed/lk77m-Dwjro" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The problem

In this section, we will:

- Write out the user entered card number without
  spaces or dashes.

## How to solve this problem

- Create a `this.cardNumber$` observable that contains the
  text of the `userCardNumber` input without spaces (`\s`) or dashes (`-`).
- Create a `cleanCardNumber` operator that maps the `this.userCardNumber$` to `this.cardNumber$`.
- Write out the value of the `this.cardNumber$` observable like:
  ```html
  CardNumber: {{ cardNumber$ | async }} <br />
  ```

## What you need to know

- RxJS has [operators](https://rxjs.dev/guide/operators)
  ([an older but better explanation](http://reactivex.io/rxjs/manual/overview.html#operators)) that are used to
  convert one observable to another observable. In RxJS, you typically create your own operators
  by using operator generator functions like [map](https://rxjs.dev/api/operators/map).

  Those operators are passed to [source.pipe(operator)](https://rxjs.dev/api/index/function/pipe) to convert the source observable to a new observable.

  The following uses `map` to create a `mapToNumber` operator:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { Subject } = rxjs;
    const { map } = rxjs.operators;

    const mapToNumber = map(value => +value);

    const source = new Subject();
    const number = source.pipe(mapToNumber);

    number.subscribe(console.log);

    source.next(true); // logs 1
    source.next("2");  // logs 2
  </script>
  ```

  @codepen

- Use `replace(/[\s-]/g, "")` method to clean the card number.
- Write out the `cardNumber$` after the `userCardNumber` like:
  ```html
  CardNumber: {{ cardNumber$ | async }} <br />
  ```

The debugging section will show how to verify the results in details.

## The solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./2-clean-card-number.html
@codepen
@highlight 14,16-20,44,51,only
</details>
