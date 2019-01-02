@page rxjs/basics Basics
@parent RxJS 0

@description Learn RxJS.

@body


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
