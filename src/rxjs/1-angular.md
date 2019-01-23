@page rxjs/angular RxJS in Angular
@parent RxJS 1

@description Learn how to read and write observables in Angular.

@body

## The problem

In this section, we will:

- Create a CodePen setup with Angular and the HTML of our form.
- Write values to a [Subject](https://rxjs-dev.firebaseapp.com/guide/subject)
  and write out the value of the subject in the template.

We will do this by:

- Creating a `userCardNumber` `BehaviorSubject`.
- Writing the value of the `cardNumber` input to the `userCardNumber` `BehaviorSubject` on the `input` event.
- Writing the value of `cardNumber` out in the template under the `</form>`
  element like:
  ```html
  </form>
  UserCardNumber: {{ GET-CARD-NUMBER-HERE }} <br/>
  ```

## What you need to know

Click _"Run in your browser"_ at the bottom of the following
example to launch a CodePen with Angular and the HTML of
the credit card form. You will edit this CodePen for the
remainder of this tutorial.


@sourceref ./1-angular-start.html
@codepen
@highlight 12-59,only


Initialize a [BehaviorSubject](https://rxjs-dev.firebaseapp.com/api/index/class/BehaviorSubject) instance on a `class` like the following:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.min.js"></script>
<script type="typescript">
const {BehaviorSubject} = rxjs;

class AppComponent {  
  userCardNumber = new BehaviorSubject<String>();
}

var app = new AppComponent();
console.log(app.userCardNumber) // logs Observable
</script>
```
@codepen
@highlight 6

A `BehaviorSubject` is just like a `Subject` except that it
remembers its last value.  Any new subscribers will immediately
be sent the last value.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.min.js"></script>
<script type="typescript">
const {BehaviorSubject} = rxjs;

var subject = new BehaviorSubject<String>();

subject.next("THE PAST");

subject.subscribe((value) => console.log(value));
// logs "THE PAST"
</script>
```
@codepen
@highlight 9-10


Emit a value on a Subject by calling `subject.next()`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.min.js"></script>
<script type="typescript">
const {BehaviorSubject} = rxjs;

class AppComponent {  
  userCardNumber = new BehaviorSubject<String>();
}

var app = new AppComponent();

app.userCardNumber.subscribe(console.log); // logs undefined

app.userCardNumber.next("1111-2222-3333-4444"); //logs "1111-2222-3333-4444"
</script>
```
@codepen
@highlight 13

You can call `subject.next()` in the DOM as follows:

```html
 <input type="text" name="cardNumber" placeholder="Card Number"
        (input)="userCardNumber.next( $event.target.value )"/>
```
@highlight 2

Use `| async` to write out an observable's value in a template as follows:

```html
UserCardNumber: {{ (userCardNumber | async) }} <br/>
```

Read more about this technique [here](https://blog.angular-university.io/angular-reactive-templates/).


## The solution

@sourceref ./1-angular-solution.html
@codepen
@highlight 13,17-34,37,only
