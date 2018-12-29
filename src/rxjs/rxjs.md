@page RxJS RxJS
@parent bit-u 5
@outline 2

@description Learn RxJS.


## Basics

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;

const observable = Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
console.log('just after subscribe');
</script>
```
@codepen

Now lets count those numbers:


```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;

const numberMaker = Observable.create(function (observer) {
	observer.next(1);
	observer.next(2);
	observer.next(3);
	setTimeout(() => {
		observer.next(4);
		observer.complete();
	}, 1000);
});

const numberSummer = Observable.create(function (observer) {
	var sum = 0;
	var subscription = numberMaker.subscribe({
		next: number => {
			sum += number;
			observer.next(sum);
		},
		error: err => observer.error(err),
		complete: () => observer.complete(),
	});
	return () => {
		subscription.unsubscribe();
	};
})

console.log('just before subscribe');
numberSummer.subscribe({
	next: x => console.log('got value ' + x),
	error: err => console.error('something wrong occurred: ' + err),
	complete: () => console.log('done'),
});
console.log('just after subscribe');
</script>
```
@codepen


## Hello world

connect to angular

## Observables vs Subjects

The following will log _'observable execution'_ each time `observable.subscribe`
  is called:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;

const observable = Observable.create(function (observer) {
  console.log("observable execution");
  observer.next(1);
  setTimeout(function(){
    observer.next(2);
    observer.complete();
  });
});

console.log('subscriptionA - start');
var subscriptionA = observable.subscribe({
  next: x => console.log('subscriptionA got value ' + x)
});
console.log('subscriptionA - end');

console.log('subscriptionB - start');
var subscriptionB = observable.subscribe({
  next: x => console.log('subscriptionB got value ' + x)
});
console.log('subscriptionB - end');
</script>
```
@codepen

The following subscriptions are called when `.next` is called.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const {Observable} = rxjs;

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);
subject.complete();
</script>
```
@codepen

## Reduce / combine

```
template: '<input (blur)="$elementBlur.emit(true)"  (value)="elementValue$.emit($event.element.value)"/>   '
```

## Credit card example

- how to read into observable


```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.js"/></script>
<script src="https://unpkg.com/@angular/core@6.0.5/bundles/core.umd.js"/></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.8.26/zone.min.js"></script>
<script src="https://unpkg.com/@angular/common@6.0.5/bundles/common.umd.js"></script>
<script src="https://unpkg.com/@angular/compiler@6.0.5/bundles/compiler.umd.js"></script>
<script src="https://unpkg.com/@angular/platform-browser@6.0.5/bundles/platform-browser.umd.js"></script>
<script src="https://unpkg.com/@angular/platform-browser-dynamic@6.0.5/bundles/platform-browser-dynamic.umd.js"></script>
<my-app></my-app>
<script type="typescript">
// app.js

const { Component, VERSION } = ng.core;
const {Subject, BehaviorSubject} = rxjs;
const {map, merge, scan} = rxjs.operators;


const cleanCardNumber = map( (card) => {
  if (card) {
    return card.replace(/[\s-]/g, "");
  }
});

const expiryParts = map( (expiry) => {
  if (expiry) {
    return expiry.split("-")
  }
});

const validateCard = map( (card)=> {
    if (!card) {
        return "There is no card"
    }
    if (card.length !== 16) {
        return "There should be 16 characters in a card";
    }
});

const validateExpiry = map( (expiry)=> {
    if (!expiry) {
        return "There is no expiry. Format  MM-YY";
    }
    if (expiry.length !== 2 || expiry[0].length !== 2 || expiry[1].length !== 2) {
        return "Expirty must be formatted like MM-YY";
    }
});


function showOnlyWhenBlurredOnce( errorObservable, blurredObservable ){
    const errorEvent = errorObservable.pipe(
        map((error) => {
            if (!error) {
                return {
                    type: "valid"
                }
            } else {
                return {
                    type: "invalid",
                    message: error
                }
            }
        })
    );

    const focusEvents = blurredObservable.pipe(
        map((isBlurred) => {
            if (isBlurred === undefined) {
                return {};
            }
            return isBlurred ? {
                type: "blurred"
            } : {
                type: "focused"
            };
        })
    );

    const valueState = scan( (previous, event) => {
        switch (event.type) {
            case "valid":
                return Object.assign({}, previous, {
                    isValid: true,
                    showCardError: false
                });
            case "invalid":
                return Object.assign({}, previous, {
                    isValid: false,
                    showCardError: previous.hasBeenBlurred
                });
            case "blurred":
                return Object.assign({}, previous, {
                    hasBeenBlurred: true,
                    showCardError: !previous.isValid
                });
            default:
                return previous;
        }
    }, {
        hasBeenBlurred: false,
        showCardError: false,
        isValid: false
    });
    var merged = errorEvent.pipe(merge(focusEvents));
    return merged.pipe( valueState ).pipe( map( state => state.showCardError ) );
}


@@Component({
  selector: 'my-app',
  template: `
   <form (click)="pay($event)">

    <div class="message"
        *ngIf="(showCardError | async)">{{ (cardError | async) }}</div>

    <div class="message"
        *ngIf="(showExpiryError | async)">{{ (expiryError | async) }}</div>

    <div class="message"
        *ngIf="(showCVCError | async)">{{ (cvcError | async) }}</div>

    <input type="text" name="number" placeholder="Card Number"
        (input)="userCardNumber.next( $event.target.value )"
        (blur)="userCardNumberBlurred.next( true )"
        [class.is-error]="showCardError | async"/>

    <input type="text" name="expiry" placeholder="MM-YY"
        (input)="userExpiry.next( $event.target.value )"
        (blur)="userExpiryBlurred.next( true )"
        [class.is-error]="showExpiryError | async"/>

    <input type="text" name="cvc" placeholder="CVC"
        (input)="userCVC.next( $event.target.value )"
        (blur)="userCVCBlurred.next( true )"
        [class.is-error]="showCVCError | async"/>

    <button disabled:from="disablePaymentButton.value">
    </button>
   </form>
  `
})
class AppComponent {  
  userCardNumber = new BehaviorSubject<String>();
  userCardNumberBlurred = new Subject<Boolean>();

  userExpiry = new BehaviorSubject<Array>();
  userExpiryBlurred = new Subject<Boolean>();

  userCVC = new BehaviorSubject<String>();
  userCVCBlurred = new Subject<Boolean>();

  constructor() {
    this.cardNumber = this.userCardNumber.pipe(cleanCardNumber);
    this.cardError = this.cardNumber.pipe(validateCard);
    this.showCardError = showOnlyWhenBlurredOnce(this.cardError, this.userCardNumberBlurred);

    this.expiry = this.userExpiry.pipe(expiryParts);
    this.expiryError = this.expiry.pipe(validateExpiry);
    this.showExpiryError = showOnlyWhenBlurredOnce(this.expiryError, this.userExpiryBlurred);

    this.cvc = this.userCVC;
    this.cvcError = this.cvc.pipe(validateCVC);
    this.showCVCError = showOnlyWhenBlurredOnce(this.cvcError = this, this.userCVCBlurred);
  }
  pay(event){
    event.preventDefault();
  }
}

// main.js
const { BrowserModule } = ng.platformBrowser;
const { NgModule } = ng.core;
const { CommonModule } = ng.common;

@@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
class AppModule {}

const { platformBrowserDynamic } = ng.platformBrowserDynamic;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
</script>
<style>
@@import url('https://fonts.googleapis.com/css?family=Raleway:400,500');
body {
  background-color: rgba(8, 211, 67, 0.3);
  padding: 2%;
  font-family: 'Raleway', sans-serif;
  font-size: 1em;
}
input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  padding: 12px;
  border: 1px solid #ccc;
  outline-color: white;
  transition: background-color 0.5s ease;
  transition: outline-color 0.5s ease;
}
input[name=number] {
  border-bottom: 0;
}
input[name=expiry],
input[name=cvc] {
  width: 50%;
}
input[name=expiry] {
  float: left;
  border-right: 0;
}
input::placeholder {
  color: #999;
  font-weight: 400;
}
input:focus {
  background-color: rgba(130, 245, 249, 0.1);
  outline-color: #82f5f9;
}
input.is-error {
  background-color: rgba(250, 55, 55, 0.1);
}
input.is-error:focus {
  outline-color: #ffbdbd;
}
button {
  font-size: 1em;
  font-family: 'Raleway', sans-serif;
  background-color: #08d343;
  border: 0;
  box-shadow: 0px 1px 3px 1px rgba(51, 51, 51, 0.16);
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 30px;
  padding: 12px;
  text-transform: uppercase;
  width: 100%;
}
button:disabled {
  opacity: 0.4;
  background-color: #999999;
}
form {
  background-color: white;
  box-shadow: 0px 17px 22px 1px rgba(51, 51, 51, 0.16);
  padding: 40px;
  margin: 0 auto;
  max-width: 500px;
}
.message {
  margin-bottom: 20px;
  color: #fa3737;
}
</style>
```
@codepen
