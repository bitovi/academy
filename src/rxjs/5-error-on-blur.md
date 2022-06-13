@page learn-rxjs/error-on-blur Error on blur
@parent learn-rxjs 5

@description Learn how to perform the event reducer pattern with RxJS's scan operator.

@body

## Video

Who has time to read? This video covers the content on this page. Watch fullscreen.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3cM-IaOO048" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The problem

In this section, we will:

- Only show the cardNumber error if the user blurs the card number input. Once the user blurs,
  we will update the displayed cardNumber error, if there is one, on every future keystroke.
- Add class="is-error" to the input when it has an error.

## How to solve this problem

- Create a `this.userCardNumberBlurred$` `Subject` that emits when the `cardNumber` input is blurred.
- Create a `this.showCardError$` that emits true when the `cardNumber` error should be shown.
- Create a `showOnlyWhenBlurredOnce(error$, blurred$)` operator that returns
  the `showCardError$` observable from two source observables.  
  `showOnlyWhenBlurredOnce` should use the **event-reducer** pattern to
  promote the `error$` and `blurred$` into events and
  reduce those events into the `showCardError$` observable.

## What you need to know

- One of the most useful patterns in constructing streams is the **event-reducer**
  pattern. On a high-level it involves turning values into events, and using those
  events to update a stateful object.

  For example, we might have a `first` and a `last` stream:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { of, zip, timer, from, merge } = rxjs;
    const { delay, map, scan } = rxjs.operators;

    function sequentially(value, dueTime, period) {
      return zip(
        from(value),
        timer(dueTime, period),
        value => value
      );
    }

    const first = sequentially(["Justin", "Ramiya"], 0, 1000);
    const last = sequentially(["Shah", "Meyer"], 500, 1000);

    first.subscribe((v) => console.log("first", v));
    last.subscribe((v) => console.log("last", v));
    // first: -Justin---RamiyaX
    // last:  ----Shah__---Meyer_X
  </script>
  ```

  @codepen

  We can promote these to event-like objects with `map`:

  ```typescript
  const firstEvents = first.pipe(
    map((first) => {
      return { type: 'first', value: first };
    })
  );

  const lastEvents = last.pipe(
    map((last) => {
      return { type: 'last', value: last };
    })
  );
  // firstEvents: -{t:fst,v:Jus}---{t:fst,v:Ram}X
  // lastEvents:  ----{t:lst,v:Sha}---{t:lst,v:Myr}X
  ```

  Next, we can merge these into a single stream:

  ```js
  const merged = merge(firstEvents, lastEvents);
  // merged:  -{ type: "first", value: "Justin" }
  //          -{ type: "last",  value: "Shah" }
  //          -{ type: "first", value: "Ramiya" }
  //          -{ type: "last",  value: "Meyer" }X
  ```

  We can "reduce" (or `scan`) these events based on a previous
  state. The following copies the old state and updates it using the event
  data:

  ```js
  const state = merged.pipe(
    scan(
      (previous, event) => {
        switch (event.type) {
          case 'first':
            return { ...previous, first: event.value };
          case 'last':
            return { ...previous, last: event.value };
          default:
            return previous;
        }
      },
      { first: '', last: '' }
    )
  );
  // state:  -{ first: "Justin", last: "" }
  //         -{ first: "Justin", last: "Shah" }
  //         -{ first: "Ramiya", last: "Shah" }
  //         -{ first: "Ramiya", last: "Meyer" }X
  ```

  The following is an even more terse way of doing the same thing:

  ```js
  const state = merged.pipe(
    scan(
      (previous, event) => {
        return { ...previous, [event.type]: event.value };
      },
      { first: '', last: '' }
    )
  );
  ```

  Finally, we can map this state to another value:

  ```js
  const fullName = state.pipe(map((state) => state.first + ' ' + state.last));
  // fullName: -Justin
  //            -Justin Shah
  //            -Ramiya Shah
  //            -Ramiya MeyerX
  ```

  See it all together here:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
  <script type="typescript">
    const { of, zip, timer, from, merge } = rxjs;
    const { delay, map, scan } = rxjs.operators;

    function sequentially(value, dueTime, period) {
      return zip(
        from(value),
        timer(dueTime, period),
        value => value
      );
    }

    const first = sequentially(["Justin", "Ramiya"], 0, 1000);
    const last = sequentially(["Shah", "Meyer"], 500, 1000);

    const firstEvents = first.pipe(
      map((first) => {
        return { type: "first", value: first };
      })
    );

    const lastEvents = last.pipe(
      map((last) => {
        return { type: "last", value: last };
      })
    );

    const merged = merge(firstEvents,lastEvents);

    const state = merged.pipe(
      scan(
        (previous, event) => {
          switch (event.type) {
            case "first":
              return { ...previous, first: event.value };
            case "last":
              return { ...previous, last: event.value };
            default:
              return previous;
          }
        },
        { first: "", last: "" }
      )
    );

    const fullName = state.pipe(map(state => state.first + " " + state.last));

    fullName.subscribe((fullName) => console.log(fullName));
  </script>
  ```

  @codepen
  @highlight 29-47,only

  > NOTE: `fullName` can be derived more simply from `combine`. The reducer
  > pattern is used here for illustrative purposes. It is able to support a larger
  > set of stream transformations than `combine`.

- For a blur event, we should not save the last publish value
  so a `Subject` will work better than a `BehaviorSubject`.
- Use [a property binding](https://angular.io/guide/property-binding) to set a property or attribute on an element.  
  To add `my-class` to the `className` when `testValue` is truthy:

  ```html
  <div [class.my-class]="testValue"></div>
  ```

- [ngIf](https://angular.io/api/common/NgIf) is used to conditionally render
  an element. The following will show the `div` if `expression` is truthy:
  ```html
  <div *ngIf="expression">Show this</div>
  ```

## The Solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./5-error-on-blur.html
@codepen
@highlight 13-14,35-81,87,94-95,112,119,only
</details>
