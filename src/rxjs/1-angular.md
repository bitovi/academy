@page learn-rxjs/angular RxJS in Angular
@parent learn-rxjs 1

@description Learn how to read and write observables in Angular.

@body

## Video

Who has time to read? This video covers the content on this page. Watch fullscreen.

<iframe width="560" height="315" src="https://www.youtube.com/embed/OAc-n1HK8ng" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The problem

In this section, we will:

- Create a CodePen setup with Angular and the HTML of our form.
- Write values to a [Subject](https://rxjs.dev/guide/subject)
  and write out the value of the subject in the template.

## How to solve this problem

- Create a `userCardNumber$` `BehaviorSubject`. In Angular, Observables have a `$` suffix by convention.
- Write the value of the `cardNumber` input to the `userCardNumber$` `BehaviorSubject` on the `input` event.
- Write the value of `cardNumber` out in the template under the `</form>`
  element like:
  ```html
  </form>
  UserCardNumber: {{ GET-CARD-NUMBER-HERE }} <br />
  ```

## What you need to know

Click _"Run in your browser"_ at the bottom of the following
example to launch a CodePen with Angular and the HTML of
the credit card form. You will edit this CodePen for the
remainder of this tutorial.

@sourceref ./1-angular-start.html
@codepen
@highlight 12-59,only

Initialize a [BehaviorSubject](https://rxjs.dev/api/index/class/BehaviorSubject) instance on a `class` like the following:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { BehaviorSubject } = rxjs;

  class AppComponent {
    userCardNumber$ = new BehaviorSubject<string>();
  }

  const app = new AppComponent();
  console.log(app.userCardNumber$) // logs Observable
</script>
```

@codepen
@highlight 6

A `BehaviorSubject` is just like a `Subject` except that it
remembers its last value. Any new subscribers will immediately
be sent the last value.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { BehaviorSubject } = rxjs;

  const subject = new BehaviorSubject<string>();

  subject.next("THE PAST");

  subject.subscribe((value) => console.log(value));
  // logs "THE PAST"
</script>
```

@codepen
@highlight 9-10

Emit a value on a Subject by calling `subject.next()`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.4.0/rxjs.umd.min.js"></script>
<script type="typescript">
  const { BehaviorSubject } = rxjs;

  class AppComponent {
    userCardNumber$ = new BehaviorSubject<string>();
  }

  const app = new AppComponent();

  app.userCardNumber$.subscribe(console.log); // logs undefined

  app.userCardNumber$.next("1111-2222-3333-4444"); // logs "1111-2222-3333-4444"
</script>
```

@codepen
@highlight 13

You can call `subject.next()` in the DOM as follows:

```html
<input
  type="text"
  name="cardNumber"
  placeholder="Card Number"
  (input)="userCardNumber$.next($event.target.value)"
/>
```

@highlight 5

Use `| async` to write out an observable's value in a template as follows:

```html
UserCardNumber: {{ userCardNumber$ | async }} <br />
```

Read more about this technique [here](https://angular.io/guide/observables-in-angular#async-pipe).

## The Solution

<details>
<summary>Click to see the solution</summary>
@sourceref ./1-angular-solution.html
@codepen
@highlight 13,17-37,40,only
</details>
