@page learn-rxjs/disable-pay-button Disable pay button
@parent learn-rxjs 8

@description Learn how to combine the latest values of two
RxJS observables with the combineLatest operator.

@body

## Video

Who has time to read? This video covers the content on this page. Watch fullscreen.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pjJPwtfDykk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The problem

In this section, we will:

- disable the Pay button until the card, expiry, and cvc are valid.

## How to solve this problem

- Create a `this.isCardInvalid$` property that publishes `true` if
  either `this.cardError$`, `this.expiryError$` or `this.cvcError$` are truthy.
- Create an `isCardInvalid` function that can be passed the
  `this.cardError$`, `this.expiryError$` and `this.cvcError$` observables
  and returns the `this.isCardInvalid$` observable.

## What you need to know

- The [combineLatest](https://rxjs.dev/api/index/function/combineLatest) static method combines several values into a single value:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { of, zip, timer, from, combineLatest } = rxjs;

    function sequentially(value, dueTime, period) {
      return zip(
        from(value),
        timer(dueTime, period),
        value => value
      );
    }

    const first = sequentially(["Justin", "Ramiya"], 0, 1000);
    const last = sequentially(["Shah", "Meyer"], 500, 1000);

    // first: ---Justin---RamiyaX
    // last:  ------Shah__---Meyer_X
    const fullName = combineLatest(
      first,
      last,
      (first, last) => { return first + " " + last; }
    );

    fullName.subscribe(console.log);
    // fullName: ---Justin Shah
    //             -Ramiya Shah
    //             -Ramiya MeyerX
  </script>
  ```

  @codepen
  @highlight 3,18-22

- `[property]="value"` can set an element property or attribute
  from another value:

  ```html
  <button [disabled]="value"></button>
  ```

## The Solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./8-disable-pay-button.html
@codepen
@highlight 13,114-123,162,195,only
</details>
