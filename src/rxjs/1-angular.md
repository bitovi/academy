@page rxjs/angular RxJS in Angular
@parent RxJS 1

@description Learn how to read and write observables in Angular.

@body

## The Problem

In this section, we will:

- Create a codepen with an Angular "Hello World".
- Write values to a [Subject](https://rxjs-dev.firebaseapp.com/guide/subject)
  and write out the value of the subject in the template.

## What you need to know

The following creates a "Hello World" with Angular and RxJS


@sourceref ./1-angular-start.html
@codepen


The form HTML for the interface looks like:

```html
<form>
    <div class="message"></div>

    <input type="text" name="cardNumber" placeholder="Card Number"/>

    <input type="text" name="expiry" placeholder="MM-YY"/>

    <input type="text" name="cvc" placeholder="CVC"/>

    <button>
        PAY
    </button>
</form>
```


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


Emit a value on a Subject by calling `next()`:

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

You can call `next` in the DOM as follows:

```html
 <input type="text" name="cardNumber" placeholder="Card Number"
        (input)="userCardNumber.next( $event.target.value )"/>
```

Use `| async` to write out an observable's value in a template as follows:

```html
UserCardNumber: {{ (userCardNumber | async) }} <br/>
```

Read more about this technique [here](https://blog.angular-university.io/angular-reactive-templates/).


## The solution

@sourceref ./1-angular-solution.html
@codepen
@highlight 13,17-34,37,only
