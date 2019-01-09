@page rxjs/error-on-blur Error on blur
@parent RxJS 5

@description Learn how to perform the reducer pattern.

@body

## The problem

In this section, we will:

- Only show the cardNumber error if the user blurs the card number input. Once the user blurs,
  we will update the displayed cardNumber error, if there is one, on every future keystroke.
- Add class="is-error" to the input when it has an error.

We will do this with:

- A `userCardNumberBlurred` `Subject` that emits when the `cardNumber` input is blurred.
- A `showCardError` that emits true when the `cardNumber` error should be shown.
- A `showOnlyWhenBlurredOnce(errorObservable, blurredObservable)` function that returns
  the `showCardError` observable from two source observables.



## What you need to know

- One of the most useful patterns in constructing streams is the event-reducer
  pattern. On a high-level it involves making streams events, and using those
  events to update a stateful object.

  For example, we might have a `first` and a `last` stream:

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
  <script type="typescript">
  const {of, zip, timer, from, merge} = rxjs;
  const {delay, map, scan} = rxjs.operators;

  function sequentially(value, dueTime, period){
      return zip(
          from(value),
          timer(dueTime, period),
          value => value
      )
  }

  const first = sequentially(["Justin", "Ramiya"], 0, 1000);
  const last = sequentially(["Shah", "Meyer"], 500, 1000);

  first.subscribe( v => console.log("f", v));
  last.subscribe( v => console.log("l", v))
  // first: ---Justin---RamiyaX
  // last:  ------Shah__---Meyer_X
  </script>
  ```
  @codepen

  We can promote these to event-like objects with `map`:

  ```typescript
  const firstEvents = first.pipe( map( (first) => {
      return {type: "first", value: first};
  } ) );

  const lastEvents = last.pipe( map( (last) => {
      return {type: "last", value: last}
  } ) );
  // firstEvents: ---{t:"f"}---{t:"f"}X
  // lastEvents:  ------{t:"l"}---{t:"l"}X
  ```

  Next, we can merge these into a single stream:

  ```js
  const merged = merge(firstEvents,lastEvents)
  // merged: ---{t:"f"}-{t:"l"}-{t:"f"}-{t:"l"}X
  ```

  We can "reduce" (or `scan`) these events based on a previous
  state. The following copies the old state and updates it using the event
  data:

  ```js
  const state = merged.pipe( scan( (previous, event) => {
    return {...previous, [event.type]: event.value};
  }, {first: "", last: ""} ) );
  // state: ---{first:"Justin", last:""}
  //          -{first:"Justin", last:"Shah"}
  //          -{first:"Ramiya", last:"Shah"}
  //          -{first:"Ramiya", last:"Meyer"}X
  ```

  The following is a more common structure for the reducer pattern:

  ```js
  const state = merged.pipe( scan( (previous, event) => {
      switch( event.type ) {
        case "first":
          return { ...previous, first: event.value };
        case "last":
          return { ...previous, last: event.value };
        default:
          return previous;
      }
  }, {first: "", last: ""}) );
  ```

  Finally, we can map this state to another value:

  ```js
  const fullName = state.map( (state) => state.first +" "+ state.last );
  // fullName: ---Justin
  //             -Justin Shah
  //             -Ramiya Shah
  //             -Ramiya MeyerX
  ```

  > NOTE: `fullName` can be derived more simply from `combine`. The reducer
  > pattern is used here for illustrative purposes. It is able to support a larger
  > set of stream transformations than `combine`.

- Subject v BehaviorSubject
- [class.-isError] trick
- promote to event, merge, reduce (scan)


## The solution

@sourceref ./5-error-on-blur.html
@codepen
@highlight 13-14,35-93,101,105-106,122,128,only
