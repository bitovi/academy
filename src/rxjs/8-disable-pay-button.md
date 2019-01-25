@page rxjs/disable-pay-button Disable pay button
@parent RxJS 8

@description

@body

## The problem

Let’s disable the Pay button until the card, expiry, and cvc are valid.

## What you need to know

- [combineLatest](https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest) can combine several values into a single value:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {of, zip, timer, from, combineLatest} = rxjs;

  function sequentially(value, dueTime, period){
      return zip(
          from(value),
          timer(dueTime, period),
          value => value
      )
  }

  const first = sequentially(["Justin", "Ramiya"], 0, 1000);
  const last = sequentially(["Shah", "Meyer"], 500, 1000);

  // first: ---Justin---RamiyaX
  // last:  ------Shah__---Meyer_X
  const fullName = combineLatest(first, last, (first, last) => { return   first +" "+ last; });

  fullName.subscribe(console.log);
  // fullName: ---Justin Shah
  //             -Ramiya Shah
  //             -Ramiya MeyerX
  </script>
  ```
  @codepen

- `[property]="value"` can set an element property or attribute
  from another value:

  ```html
  <button [disabled]="value">
  ```

## The solution

@sourceref ./8-disable-pay-button.html
@codepen
@highlight 13,112-116,147,179,only
